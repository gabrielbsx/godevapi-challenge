declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HUBSPOT_API_KEY: string
      GOOGLE_PRIVATE_KEY_FILE: string
    }
  }
}

export {}
