import pgPromise, { IDatabase } from 'pg-promise';

interface IConfig {
    database: string;
    host: string;
    port: number;
    user: string;
    pass: string
}

interface ICustomerDB {
    getCustomerRowCount(search: string): Promise<{}>;
    getCustomers(search: string, page: number, pageSize: number): Promise<{}>;
    getCustomerCode(code: string): Promise<{}>;
    addCustomer(customerCode: string, customerName: string, customerAddress: string): Promise<void>;
    updateCustomer(customerCode: string, customerName: string, customerAddress: string): Promise<void>;
    deleteCustomer(customerCode: string): Promise<void>;
}

export class CustomerDB implements ICustomerDB {
    private db: IDatabase<{}>;

    constructor(config: IConfig) {
        const pgp = pgPromise();
        this.db = pgp(config);
    }

    public async getCustomerRowCount(search: string) {
        return await this.db.one(`
            SELECT 
                COUNT(*) 
            FROM 
                cms_customer
            WHERE
                upper(cust_code) like upper('%${search}%') OR
                upper(cust_name) like upper('%${search}%')
        `);
    }

    public async getCustomers(search: string, page: number, pageSize: number) {
        return await this.db.any(`
            SELECT 
                cust_code as "customerCode",
                cust_name as "customerName",
                cust_addr as "customerAddress"
            FROM
                cms_customer
            WHERE
                upper(cust_code) like upper('%${search}%') OR
                upper(cust_name) like upper('%${search}%')
            ORDER BY
                cust_name
            LIMIT 
                ${pageSize}
            OFFSET
                ${(page - 1) * pageSize};
        `);
    }

    public async getCustomerCode(customerCode: string) {
        return await this.db.any(`
            SELECT
                cust_code as "customerCode",
                cust_name as "customerName",
                cust_addr as "customerAddress",
                cust_bu as "customerBu"
            FROM
                cms_customer
            WHERE
                cust_code=$[customerCode]`,
            { customerCode }
        );
    }

    public async addCustomer(customerCode: string, customerName: string, customerAddress: string) {
        const customerBu = 'NA';

        return await this.db.none(`
            INSERT INTO
                cms_customer(cust_code, cust_name, cust_addr, cust_bu)
            VALUES
                ($[customerCode], $[customerName], $[customerAddress], $[customerBu])`,
            { customerCode, customerName, customerAddress, customerBu }
        );
    }

    public async updateCustomer(customerCode: string, customerName: string, customerAddress: string) {
        return await this.db.none(`
            UPDATE 
                cms_customer
            SET 
                cust_name=$[customerName],
                cust_addr=$[customerAddress]
            WHERE
                upper(cust_code)=upper($[customerCode])`,
            { customerName, customerAddress, customerCode }
        );
    }

    public async deleteCustomer(customerCode: string) {
        return await this.db.none(`
            DELETE FROM 
                cms_customer
            WHERE
                upper(cust_code)=upper($[customerCode])`,
            { customerCode }
        );
    }
}