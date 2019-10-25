import express, { Request, Response } from 'express'
import next from 'next'
import api from './api'
import bodyParser from 'body-parser';


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use('/api', api);

  server.get('/p/:id', (req: Request, res: Response) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req: Request, res: Response) => {
    return handle(req, res);
  })

  server.listen(process.env.PORT || 3000, () => {
    console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
  })
})
.catch((ex:any) => {
  console.error(ex.stack);
  process.exit(1);
})