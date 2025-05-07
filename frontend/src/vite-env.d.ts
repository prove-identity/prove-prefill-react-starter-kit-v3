/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_BASE_API_URL: string;
    readonly VITE_APP_ENV: 'sandbox' | 'production';
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}