import { IConfig } from './interfaces';

export function config(): IConfig {
  return {
    refresh_cookie: process.env.REFRESH_COOKIE || 'default_refresh_cookie',
    cookie_secret: process.env.COOKIE_SECRET || 'default_cookie_secret',
    testing: process.env.TESTING === 'true',
    refresh_time: parseInt(process.env.JWT_REFRESH_TIME, 10) || 3600, // default 3600 seconds (1 hour)
    api_url: process.env.API_URL || 'http://localhost:3000',
    rabbitmq_url: process.env.RABBITMQ_URL || 'rabbitmq:5672',
    authQueue: process.env.RABBITMQ_AUTH_QUEUE || 'default_auth_queue',
    userQueue: process.env.RABBITMQ_USER_QUEUE || 'default_user_queue',
    paymentQueue: process.env.RABBITMQ_PAYMENT_QUEUE || 'default_payment_queue',
    bookingQueue: process.env.RABBITMQ_BOOKING_QUEUE || 'default_booking_queue',
  };
}
