declare namespace NodeJs {
  export type ProcessEnv = {
    PORT: number;
    NODE_ENV: string;
    DATABASE_URL: string;
    BCRYPT_SALT_ROUNDS: number;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES_IN: string;
  };
}
