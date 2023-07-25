declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HUBSPOT_API_KEY: string
    }
  }
}

export {}
