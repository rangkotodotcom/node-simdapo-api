type Env = 'development' | 'staging' | 'production';
const MAIN_DOMAIN = process.env.SIMDAPO_MAIN_DOMAIN;

const BASE_URLS: Record<Env, string> = {
    development: `http://${MAIN_DOMAIN}`,
    staging: `https://staging-simdapo.${MAIN_DOMAIN}`,
    production: `https://simdapo.${MAIN_DOMAIN}`
};

export function getBaseURL(): string {
    const env = (process.env.SIMDAPO_MODE as Env) || 'production';
    return BASE_URLS[env] || BASE_URLS.production;
}

export function getAuthUrl(): string {
    return getBaseURL() + '/oauth/token';
}

export function getApiUrl(): string {
    return getBaseURL() + '/api/public';
}
