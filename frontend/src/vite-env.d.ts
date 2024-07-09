/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_APP_BASE_API_URL: string;
    readonly REACT_APP_ENV: 'sandbox' | 'production';
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}