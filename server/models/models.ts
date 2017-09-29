import { PGTableModel } from '../postgres/postgres'
import * as PG from '../postgres/postgres'
import * as bcrypt from 'bcrypt'; 

export type Customer = {
    name: string,
    username: string,
    email: string,
    password: string
}

export class CustomerModel extends PGTableModel {
    constructor() {
        super('customers');
    }

    public get(): PG.PGTableInfo[] {
        return [{
                name: 'name',
                type: PG.PGTypeEnum.TEXT,
                modifiers: [PG.PGModifierEnum.NOT_NULL] 
            }, {
                name: 'username',
                type: PG.PGTypeEnum.TEXT,
                modifiers: [PG.PGModifierEnum.NOT_NULL, PG.PGModifierEnum.UNIQUE]
            },{
                name: 'email',
                type: PG.PGTypeEnum.TEXT,
                modifiers: [PG.PGModifierEnum.NOT_NULL, PG.PGModifierEnum.UNIQUE]
            },{
                name: 'password',
                type: PG.PGTypeEnum.TEXT,
                modifiers: [PG.PGModifierEnum.NOT_NULL] 
            }];
    }

    public static getByUsername(username: string, callback: (Customer) => void) {
        const cond = "USERNAME = '" + username + "'";
        PG.PGInstance.selectAllWhere('customers', cond, (data: Array<any>) => {
            console.log('models.getByUsername: data: ' + data);
            if (null === data) {
                callback(null);
                return;
            }
            console.info('SELECT WHERE result: ' + data[0].password);
            callback(data[0]);
        });
    }

    public static comparePasswords(
        shopOwner: Customer, 
        password: string, 
        callback: (success: boolean, error: any) => void
    ) {
        bcrypt.compare(password, shopOwner.password).then((success: boolean) => {
            callback(success, null);
        }).catch((err: any) => {
            callback(false, err);
        });
    }
}

export class ServiceModel extends PGTableModel {
    constructor() {
        super('services');
    }

    public get(): PG.PGTableInfo[] {
        return [{
                name: 'name',
                type: PG.PGTypeEnum.TEXT,
                modifiers: [PG.PGModifierEnum.NONE]
            }, {
                name: 'description',
                type: PG.PGTypeEnum.TEXT,
                modifiers: [PG.PGModifierEnum.NONE]
            },{
                name: 'phone',
                type: PG.PGTypeEnum.TEXT,
                modifiers: [PG.PGModifierEnum.NONE]
            },{
                name: 'address',
                type: PG.PGTypeEnum.TEXT,
                modifiers: [PG.PGModifierEnum.NONE]
            }];
    }
}