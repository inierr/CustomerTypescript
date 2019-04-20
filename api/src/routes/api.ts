import * as express from 'express';
import * as customer from '../controllers/customers';

export const register = (app: express.Application) => {
    app.get('/api/customer', customer.getCustomerApi);
    app.get('/api/customer/:customerCode', customer.getCustomerCodeApi)
    app.post('/api/customer', customer.addCustomerApi);
    app.put('/api/customer/:customerCode', customer.updateCustomerApi);
    app.delete('/api/customer/:customerCode', customer.deleteCustomerApi);
}