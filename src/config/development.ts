
export default {
    PORT: process.env.PORT,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_PORT: process.env.SMTP_PORT,
    BASE_URI: process.env.DEV_BASE_URI,
    DATABASE_URI: process.env.DATABASE_URI,
    CLIENT_URI: process.env.DEV_CLIENT_URI,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    CLIENT_PAYMENT_FAILED_PAGE: process.env.CLIENT_PAYMENT_FAILED_PAGE,
    CLIENT_PAYMENT_SUCCESS_PAGE: process.env.CLIENT_PAYMENT_SUCCESS_PAGE,
}