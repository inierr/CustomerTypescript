import { CustomerDB } from '../db-functions/customerDB';
import dotenv from 'dotenv';

dotenv.config();

const { PGPORT, PGHOST, PGDATABASE, PGUSER, PGPASS } = process.env;

const config = {
    database: PGDATABASE || 'postgres',
    host: PGHOST || 'localhost',
    port: parseInt(PGPORT || '5432'),
    user: PGUSER || 'postgres',
    pass: PGPASS || 'postgres'
}

export async function getCustomerApi(req: any, res: any) {
    const search = req.param('search') || '';
    const page = parseInt(req.param('page')) || 1;
    const pageSize = parseInt(req.param('pageSize')) || 20;

    const customerDB = new CustomerDB(config);

    if (!/^[a-zA-Z0-9 _-]*$/.test(search)) {
        return res
            .status(404)
            .json({ message: 'Nothing here' });
    }

    const customers = await customerDB.getCustomers(search, page, pageSize);
    const { count } = await customerDB.getCustomerRowCount(search);

    const payload = {
        numberOfItems: parseInt(count),
        currentPage: page,
        pageSize: pageSize,
        items: customers
    }

    return res
        .status(200)
        .json(payload);
}

export async function getCustomerCodeApi(req: any, res: any) {
    const { customerCode } = req.params;
    const customerDB = new CustomerDB(config);

    if (!/^[a-zA-Z0-9 _-]*$/.test(customerCode)) {
        return res
            .status(404)
            .json({ message: 'Nothing here' });
    }

    const customer  = await customerDB.getCustomerCode(customerCode);

    if (customer.length != 1) {
        return res
            .status(404)
            .send();
    }

    return res
        .status(200)
        .json(customer[0]);
}

export async function addCustomerApi(req: any, res: any) {
    const { customerCode, customerName, customerAddress } = req.body;
    const customerDB = new CustomerDB(config);

        // check if empty
    if (!customerCode || !customerName || !customerAddress) {
        const parameters: any[] = [];

        if (!customerCode) {
            parameters.push({ customerCode: 'is undefined or empty' });
        }

        if (!customerName) {
            parameters.push({ customerName: 'is undefined or empty' });
        }

        if (!customerAddress) {
            parameters.push({ customerAddress: 'is undefined or empty' });
        }

        return res
            .status(400)
            .json({
                message: 'Parameters below should not be empty',
                parameters
            });
    }

        // check if no escaping characters
    if (!/^[a-zA-Z0-9 _-]+$/.test(customerCode) || !/^[a-zA-Z0-9 _-]+$/.test(customerName) || !/^[a-zA-Z0-9 _-]+$/.test(customerAddress)) {
        return res
            .status(400)
            .json({
                message: 'There should be no escaping characters'
            });
    }

    const existingCode = await customerDB.getCustomerCode(customerCode);

    if (existingCode.length > 0) {
        return res
            .status(400)
            .json({
                message: 'Customer Code is already taken.'
            });
    }

    await customerDB.addCustomer(customerCode, customerName, customerAddress);

    return res
        .status(201)
        .json({
            customerCode,
            customerName,
            customerAddress
        });
}

export async function updateCustomerApi(req: any, res: any) {
    const { customerCode } = req.params;
    const { customerName, customerAddress } = req.body;
    const customerDB = new CustomerDB(config);

    if (!customerCode || !customerName || !customerAddress) {
        const paramaters: any[] = [];

        if (!customerCode) {
            paramaters.push({ customerCode: 'is undefined or empty' });
        }

        if (!customerName) {
            paramaters.push({ customerName: 'is undefined or empty' });
        }

        if (!customerAddress) {
            paramaters.push({ customerAddress: 'is undefined or empty' });
        }

        return res
            .status(400)
            .json({
                message: 'Parameters must not be undefined or empty',
                paramaters
            });
    }

    // check if no escaping characters
    if (!/^[a-zA-Z0-9 _-]+$/.test(customerCode) || !/^[a-zA-Z0-9 _-]+$/.test(customerName) || !/^[a-zA-Z0-9 _-]+$/.test(customerAddress)) {
        return res
            .status(400)
            .json({
                message: 'There should be no escaping characters'
            });
    }

    const existingCode = await customerDB.getCustomerCode(customerCode);

    if (existingCode.length != 1) {
        return res
            .status(400)
            .json({
                message: 'There is no customer code'
            });
    }

    await customerDB.updateCustomer(customerCode, customerName, customerAddress);

    return res
        .status(204)
        .send();
}

export async function deleteCustomerApi(req: any, res: any) {
    const { customerCode } = req.params;
    const customerDB = new CustomerDB(config);

    if (!customerCode) {
        return res
            .status(400)
            .json({
                message: 'Customer Code does not exist'
            });
    }

    if (!/^[a-zA-Z0-9 _-]+$/.test(customerCode)) {
        return res
            .status(400)
            .json({
                message: 'There should be no escaping characters'
            });
    }

    const existingCode = await customerDB.getCustomerCode(customerCode);

    if (existingCode.length != 1) {
        return res
            .status(400)
            .json({
                message: 'There is no customer code.'
            });
    }

    await customerDB.deleteCustomer(customerCode);

    return res
        .status(204)
        .send();
}
