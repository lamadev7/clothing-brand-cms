require('dotenv').config();

import express from 'express';
import payload from 'payload';
import config from './config';

const app = express();

app.get('/', (_, res) => {
  res.redirect('/admin')
});

const start = async () => {
  await payload.init({
    secret: config.PAYLOAD_SECRET,
    express: app,
    email: {
      transportOptions: {
        host: config.SMTP_HOST,
        auth: {
          user: config.SMTP_USER,
          pass: config.SMTP_PASS,
        },
        port: Number(config.SMTP_HOST),
        secure: false,
        requireTLS: true,
      },
      fromName: 'VERSE11',
      fromAddress: 'lamaparbat70@gmail.com',

    },
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  });

  app.listen(config.PORT);
}

start();
