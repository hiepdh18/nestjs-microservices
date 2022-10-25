import * as dotenv from 'dotenv';
dotenv.config();
const env = process.env.PROD_ENV || 'sandbox';
console.log(`🔥🔥🔥 => env`, env);

export const services = {
  userService: 'USER_SERVICE',
  authService: 'AUTH_SERVICE',
};

export const queues = {
  authQueue: 'auth_queue',
  userQueue: 'user_queue',
};

export const DEFAULT_USER_NAME = 'user';
export const REQUEST_ID = 'requestId';
export const SESSION_USER = 'sessionUser';
export const EMM_NAMESPACE = 'emm-namespace';

const rabbitURL_options = {
  sandbox: 'amqp://localhost:5672',
  test: 'amqp://rabbitmq:5672',
  live: 'amqp://localhost:5672',
  stage: 'amqp://localhost:5672',
};

export const rabbitURL = rabbitURL_options[env];
