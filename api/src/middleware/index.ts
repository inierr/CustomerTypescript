import * as express from 'express';
import * as errorHandling from './errorHandling';

export const register = (app: express.Application) => {
    errorHandling.register(app);
}