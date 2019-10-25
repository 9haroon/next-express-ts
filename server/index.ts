import express, { Request, Response } from 'express'
import next from 'next'
import Server from 'next'
import api from './api'
import bodyParser from 'body-parser';
import { ENVIRONMENT, PORT } from './util';

class NextServer {
  private app: any;
  private handle: any;
  
  constructor() {
    const dev = ENVIRONMENT !== 'production';
    this.app = next({ dev });
    this.handle = this.app.getRequestHandler();
  }

  init() {
    this.app.prepare()
    .then(() => {
      const server = express();
      server.use(bodyParser.json());
      server.use('/api', api);

      server.get('/p/:id', (req: Request, res: Response) => {
        const actualPage = '/post'
        const queryParams = { id: req.params.id }
        this.app.render(req, res, actualPage, queryParams)
      })

      server.get('*', (req: Request, res: Response) => {
        return this.handle(req, res);
      })

      server.listen(process.env.PORT || 3000, () => {
        console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
      })
    })
    .catch((ex:any) => {
      console.error(ex.stack);
      process.exit(1);
    })
  }
}

new NextServer().init();
