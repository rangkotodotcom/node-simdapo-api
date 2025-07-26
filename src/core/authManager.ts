import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { getAuthUrl } from './envConfig';

export interface AuthConfig {
    clientId: string;
    clientSecret: string;
}

const TOKEN_FILE_PATH = path.join(process.cwd(), 'json', 'simdapo.token.json');
const TOKEN_DIR = path.dirname(TOKEN_FILE_PATH);

if (!fs.existsSync(TOKEN_DIR)) {
    fs.mkdirSync(TOKEN_DIR, { recursive: true });
}

interface TokenData {
    accessToken: string;
    expiresAt: number; // timestamp in ms
}

let retryCount = 0;
const MAX_RETRY = 3;
let currentTokenPromise: Promise<string> | null = null;

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

    if (!currentTokenPromise) {
        currentTokenPromise = attemptAuthenticate(authConfig).finally(() => {
            currentTokenPromise = null;
        });
    }

    return currentTokenPromise;
}

/**
 * Fungsi autentikasi dengan retry
 */
async function attemptAuthenticate(authConfig: AuthConfig): Promise<string> {
    while (retryCount < MAX_RETRY) {
        try {
            return await authenticate(authConfig);
        } catch (err) {
            retryCount++;
            console.warn(`Authentication failed (attempt ${retryCount}):`, (err as Error).message);
        }
    }

    throw {
        req_id: null,
        srv_id: null,
        status: false,
        code: 500,
        content: null,
        errors: null,
        message: 'Authentication failed after max retries'
    };
}

/**
 * Request token baru & simpan ke file
 */
export async function authenticate(authConfig: AuthConfig): Promise<string> {
    const url = getAuthUrl();

    const response = await axios.post(url, {
        client_id: authConfig.clientId,
        client_secret: authConfig.clientSecret,
        grant_type: 'client_credentials'
    });

    const accessToken = response.data.access_token;
    const expiresIn = response.data.expires_in || 3600;

    if (!accessToken) {
        throw {
            req_id: null,
            srv_id: null,
            status: false,
            code: 500,
            content: null,
            errors: null,
            message: 'No token returned from auth server'
        };
    }

    saveTokenToFile(accessToken, expiresIn);
    retryCount = 0;

    return accessToken;
}

export function shouldRetry401(): boolean {
    return retryCount < MAX_RETRY;
}