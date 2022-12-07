import * as dotenv from 'dotenv';
dotenv.config();
const env = process.env.NODE_ENV || 'sandbox';
console.log(`🔥🔥🔥 => ENV`, env);

const rabbitURL_options = {
  development: 'amqp://localhost:5672',
  sandbox: 'amqp://localhost:5672',
  test: 'amqp://localhost:5672',
  docker: 'amqp://rabbitmq:5672',
  stage: 'amqp://localhost:5672',
  live: 'amqp://localhost:5672',
};

const mongo_options = {
  development: {},
  sandbox: {
    URL: `mongodb+srv://hiep:hiep@cluster0.gddz1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    PORT: `27017`,
    DATABASE_NAME: `mydb`,
    USERNAME: `root`,
    PASSWORD: `babyruby`,
  },
  test: {
    URL: `mongodb+srv://hiep:hiep@cluster0.gddz1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    PORT: `27017`,
    DATABASE_NAME: `mydb`,
    USERNAME: `root`,
    PASSWORD: `babyruby`,
  },
  docker: {},
  stage: {},
  live: {},
};

const postgres_options = {
  development: {},
  sandbox: {
    HOST: `localhost`,
    PORT: 5432,
    USERNAME: `admin`,
    PASSWORD: `admin`,
    DB: `dev`,
  },
  test: {
    HOST: `localhost`,
    PORT: 5432,
    USERNAME: `admin`,
    PASSWORD: `admin`,
    DB: `dev`,
  },
  docker: {},
  stage: {},
  live: {},
};

const mail_options = {
  development: {},
  sandbox: {
    HOST: `smtp.gmail.com`,
    USER: `hiepdh18@gmail.com`,
    PASSWORD: `fnyrnlqrqjgjifvr`,
    FROM: `hiepdh18@admin.com`,
  },
  test: {
    HOST: `smtp.gmail.com`,
    USER: `hiepdh18@gmail.com`,
    PASSWORD: `fnyrnlqrqjgjifvr`,
    FROM: `hiepdh18@admin.com`,
  },
  docker: {},
  stage: {},
  live: {},
};

const auth0_options = {
  development: {},
  sandbox: {
    DOMAIN: `https://owle.us.auth0.com/`,
    CLIENT_ID: `vbl9JP3XcoAOQxGxYmn0zCFEu39ZwHog`,
    CLIENT_SECRET: `CbpVot0GWjuLFdLkm2YcTm1DkHnFghz3YJx0obs2Q4zIKbNO7vKI2GOPi15D7nOj`,
    // CLIENT_SECRET: `FnUakIY3xRgqb5q8ai89HhqU_MBg-5jimF_Zav2QZuejQ9rB63-hhol-sWQpMZbe`,
    AUDIENCE: `https://owle.us.auth0.com/api/v2/`,
    REDIRECT_URI: `http://localhost:3001/callback`,
    REDIRECT_LOGOUT_URI: `http://localhost:3001`,
    SCOPE: 'openid profile offline_access',
  },
  test: {
    DOMAIN: `https://owle.us.auth0.com/`,
    CLIENT_ID: `vbl9JP3XcoAOQxGxYmn0zCFEu39ZwHog`,
    CLIENT_SECRET: `FnUakIY3xRgqb5q8ai89HhqU_MBg-5jimF_Zav2QZuejQ9rB63-hhol-sWQpMZbe`,
    AUDIENCE: `https://owle.us.auth0.com/api/v2/`,
    REDIRECT_URI: `http://localhost:3001/callback`,
    REDIRECT_LOGOUT_URI: `http://localhost:3001`,
    SCOPE: 'openid profile offline_access',
  },
  docker: {},
  stage: {},
  live: {},
};

export const MAIL_HOST = `smtp.gmail.com`;
export const MAIL_USER = `hiepdh18@gmail.com`;
export const MAIL_PASSWORD = `fnyrnlqrqjgjifvr`;
export const MAIL_FROM = `hiepdh18@admin.com`;
export const WS_PORT = ``;

export const RABBIT_URL = rabbitURL_options[env];
export const MONGO = mongo_options[env];
export const POSTGRES = postgres_options[env];
export const AUTH0 = auth0_options[env];
export const MAIL = mail_options[env];
