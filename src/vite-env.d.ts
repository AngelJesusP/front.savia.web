/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly UPLOAD_DIRECT: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}