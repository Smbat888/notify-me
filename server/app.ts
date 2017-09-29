// npm imports
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
// Server imports
import { AppRouter } from './routes/AppRouter';
import { PGInstance } from './postgres/postgres'; 
import * as models from './models/models'; 

class App {
  public express: express.Application;
  public appRouter: AppRouter;

  constructor () {
    this.express = express();
    this.appRouter = new AppRouter();
    this.initializeDatabase();
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use('/', this.appRouter.getRouter())
  }

  private initializeDatabase() {
    PGInstance.createTableFromModel(new models.CustomerModel());
    PGInstance.createTableFromModel(new models.ServiceModel());
  }
}

export default new App().express