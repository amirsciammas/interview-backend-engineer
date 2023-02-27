import express from 'express'
import { routes } from './routers/index'
import dotenv from 'dotenv';

dotenv.config();
const port = parseInt(process.env.PORT as string) || 3000

const app = express();
app.use(express.json({ limit: '100mb' }))

// routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`)
})

export default app;