import { IDatabase, IMain } from 'pg-promise'
import * as pgPromise from 'pg-promise'

const config = {
    host: 'localhost',
    port: 5432,
    database: 'vorc',
    password: 'narek',
    user: 'postgres'
};

export enum PGTypeEnum {
    TEXT = "TEXT",
    INT = "INT"
}

export enum PGModifierEnum {
    NONE = '',
    NOT_NULL = "NOT NULL",
    PRIMARY_KEY = "PRIMARY KEY",
    UNIQUE = "UNIQUE"
}

abstract class PGType {
    protected value: any;
    constructor(value: any) {
        this.value = value;
    }

    abstract get(): any;
}

export class PGText extends PGType {
    constructor(value: string) {
        super(value);
    }

    public get(): any {
        return ("'" + this.value + "'");
    }
}

export class PGInt extends PGType {
    constructor(value: number) {
        super(value);
    }

    public get(): any {
        return this.value;
    }
}

export type PGTableInfo = {
    name: string,
    type: PGTypeEnum,
    modifiers: Array<PGModifierEnum>
};

export abstract class PGTableModel {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    public getName(): string {
        return this.name;
    }
    public abstract get(): PGTableInfo[];
}

export type PGInsertInfo = {
    key: string,
    value: PGType
};

export class Postgres {
    private db:IDatabase<any>;

    constructor() {        
        const pgp: IMain = pgPromise({});
        this.db = pgp(config);
        this.db.connect().then((data) => {
            console.log('Postgres connection success');
        }).catch((err) => {
            console.log('Postgres connection failed! ' + err);
        })
    }

    public createTableFromModel(model: PGTableModel) {
        this.createTable(model.getName(), model.get());
    }

    public createTable(name: string, columnInfos: PGTableInfo[]) {
        let sql: string = 'CREATE Table IF NOT EXISTS ' + name + '(';
        sql += 'ID SERIAL PRIMARY KEY NOT NULL, ';
        let i: number = 0;
        for (const column of columnInfos) {
            sql += column.name.toUpperCase() + ' ' + column.type.toUpperCase() + ' ' + column.modifiers.toString().replace(',', ' ').toUpperCase();
            if (columnInfos.length - 1 !== i) {
              sql += ', ';
            }
            ++i;
        }
        sql += ');'
        this.db.none(sql);
    }

    public insertInto(tableName: string, insertInfos: PGInsertInfo[]) {
        let keys: string = ' (';
        let values: string = ' VALUES (';
        let sql: string = 'INSERT INTO ' + tableName.toUpperCase();
        let i: number = 0;
        for (const insert of insertInfos) {
            keys += insert.key.toUpperCase();
            values += insert.value.get();
            if (insertInfos.length - 1 !== i) {
                keys += ', ';
                values += ', ';
            }
            ++i;
        }
        keys += ') ';
        values += ');'
        sql += keys + values;
        return this.db.none(sql);
    }

    public selectAll(tableName: string) {
        let sql: string = 'SELECT * FROM ' + tableName + ';';
        this.db.query(sql).then((data) => {
            console.log('SELECT query data: ' + JSON.stringify(data));
            return data;
        }); 
    }

    public selectAllWhere(tableName: string, condition: string, callback: (json: Array<any>) => void) {
        this.selectWhere(tableName, '*', condition, callback);
    }

    public selectWhere(tableName: string, keys: string, condition: string, callback: (json: Array<any>) => void) {
        let sql: string = 'SELECT ' + keys + ' FROM ' + tableName + ' WHERE ' + condition + ';';
        this.db.query(sql).then((data) => {
            if (!data || 0 === data.length) {
                callback(null);
            } else {
                console.log('SELECT query data: ' + JSON.stringify(data));
                callback(JSON.parse(JSON.stringify(data)));
            }
        }); 
    }
}

export let PGInstance = new Postgres();