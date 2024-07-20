/// <reference types="react-scripts" />

interface ImportMetaEnv {
    readonly VITE_CLERK_PUBLISHABLE_KEY: string;
    // Agrega aquí otras variables de entorno que necesites definir
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }