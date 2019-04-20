import * as express from 'express';

export const register = (app: express.Application) => {
    app.use(() => (request: any, response: any, next: any) => {
        console.log('LOGGED');
        next();
    });
}