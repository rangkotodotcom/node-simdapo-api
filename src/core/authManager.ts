import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { getAuthUrl } from './envConfig';

export interface AuthConfig {
    clientId: string;
    clientSecret: string;
}

const TOKEN_FILE_PATH = path.join(__dirname, '../../.token.json');

interface TokenData {
    accessToken: string;
    expiresAt: number; // timestamp in ms
}

let retryCount = 0;
const MAX_RETRY = 3;

function isTokenValid(tokenData: TokenData): boolean {
    return Date.now() < tokenData.expiresAt;
}

function readTokenFromFile(): TokenData | null {
    try {
        const data = fs.readFileSync(TOKEN_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch {
        return null;
    }
}

function saveTokenToFile(token: string, expiresIn: number) {
    const expiresAt = Date.now() + expiresIn * 1000;
    const data: TokenData = { accessToken: token, expiresAt };
    fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(data));
}

/**
 * Ambil token dari file jika valid, atau autentikasi ulang
 */
export async function getToken(authConfig: AuthConfig): Promise<string> {
    const cached = readTokenFromFile();

    if (cached && isTokenValid(cached)) {
        return cached.accessToken;
    }

    return await authenticate(authConfig);
}

/**
 * Request token baru & simpan ke file
 */
export async function authenticate(authConfig: AuthConfig): Promise<string> {
    try {
        const url = getAuthUrl();

        const response = await axios.post(url, {
            client_id: authConfig.clientId,
            client_secret: authConfig.clientSecret,
            grant_type: 'client_credentials'
        });

        const accessToken = response.data.access_token;
        const expiresIn = response.data.expires_in || 3600;

        if (!accessToken) {
            throw new Error('Authentication failed: No token returned');
        }

        saveTokenToFile(accessToken, expiresIn);
        retryCount = 0;

        return accessToken;
    } catch (error) {
        retryCount++;
        throw new Error('Authentication failed');
    }
}

export function shouldRetry401(): boolean {
    return retryCount < MAX_RETRY;
}
