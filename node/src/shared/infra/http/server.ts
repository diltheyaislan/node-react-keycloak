import 'reflect-metadata';
import 'dotenv/config';

import fs from 'fs';

import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import https from 'https';

import cors from 'cors';
import { errors } from 'celebrate';
import { QueryFailedError } from 'typeorm';
import 'express-async-errors';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import Keycloak from '@shared/infra/keycloak';
import '@shared/container';
import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(Keycloak.middleware());

app.use(Keycloak.getInstance().middleware({
  logout: '/logout'
}));

app.use('/api', routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  if (err instanceof QueryFailedError) {
    switch ((<any>err).code) {
      case '22P02':
        return response
          .status(406)
          .json({ status: 'error', message: locale.validation.invalidUUID });
    }
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    messsage: locale.app.errors.internalServer,
  });
});

const appPort = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3333;

if (process.env.APP_ENV === 'production') {
  const privateKeyPath = process.env.SSL_PRIVATE_KEY || '';
  const certificatePath = process.env.SSL_CERTIFICATE || '';

  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  const certificate = fs.readFileSync(certificatePath, 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(appPort, () => {
    console.log(`HTTPS Server started on port ${appPort}!`);
  });
} else {
  // const httpServer = http.createServer(app);
  // httpServer.listen(appPort, () => {
  //  console.log(`HTTP Server started on port ${appPort}!`);
  // });

  app.listen(appPort, function () {
    console.log(`Started at port ${appPort}`);
  });
}
