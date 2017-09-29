// npm imports
import { Router } from 'express'
import { Request, Response, NextFunction, Send } from 'express'
import * as bcrypt from 'bcrypt'; 
import {sign} from 'jsonwebtoken'
// Server imports
import { PGInstance } from '../postgres/postgres'
import * as pg from '../postgres/postgres'
import * as models from '../models/models'


export class AppRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    public getRouter() {
        return this.router;
    }

    private initRoutes() {
        this.initRegisterRoute();
        this.initLoginRoute();
    }

    private initRegisterRoute() {
        this.router.post('/register', (req: Request, res: Response, next: NextFunction) => {
            console.log('Server: register: User: ' + JSON.stringify(req.body));
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                        res.json(this.makeResponse(false,  'Error: Could not register the user', err));                    
                        return;
                    }

                    const password: string = hash;
                    let inserts = new Array<pg.PGInsertInfo>(); 
                    inserts = [{
                        key: 'name',
                        value: new pg.PGText(req.body.name)
                    }, {
                        key: 'username',
                        value: new pg.PGText(req.body.username)
                    }, {
                        key: 'email',
                        value: new pg.PGText(req.body.email)
                    }, {
                        key: 'password',
                        value: new pg.PGText(password)
                    }];
                    PGInstance.insertInto("customers", inserts).then(data => {
                        console.log('Customer registered:');
                        res.json(this.makeResponse(true, 'User registered', null))
                    }).catch(error => {
                        console.log('ERROR:', error); // print the error; 
                        if (error) {               
                            res.json(this.makeResponse(false,  'Error: Could not register the user', error));
                            //throw error;
                        }
                    });;                 
                });
            });
        });
    }

    private initLoginRoute() {
        this.router.post('/auth', (req: Request, res: Response, next: NextFunction) => {
            const username = req.body.username;
            const password = req.body.password;
            console.log('********************************');
            models.CustomerModel.getByUsername(username, (customer: models.Customer) => {
                if (!customer) {
                    console.log('AppRouter.initLoginRoute.getByUsername: Error: customer not found');
                    res.json(this.makeResponse(false, 'User does not exists', 'Error: Wrong username'));
                    return;
                }
                models.CustomerModel.comparePasswords(customer, password, (success: boolean, err: any) => {
                    if (err || !success) {
                        res.json(this.makeResponse(false, 'User does not exists', 'Error: Wrong password'));
                        return;
                    }
                    const token: string = sign(customer, 'VORC', { expiresIn: 604800 });
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: customer
                    });
                });
            });

        });
    }

    private makeResponse(success: boolean, message: string, err: any): any {
        return {
            success: success, 
            msg: message,
            error: err
        }
    }
}