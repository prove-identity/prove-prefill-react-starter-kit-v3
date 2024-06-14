/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_APP_TITLE: string
    readonly REACT_APP_ENV: string;
    readonly REACT_APP_BASE_API_URL: string;
    readonly REACT_APP_CONTINUE_AUTH_URL_PROD: string;
    readonly REACT_APP_CONTINUE_AUTH_URL_SANDBOX: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }