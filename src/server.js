import 'dotenv/config';
import app from './app.js';
import { initializeStore } from './store.js';
const port=Number(process.env.PORT||5000);
initializeStore();
const server=app.listen(port,()=>console.log(JSON.stringify({level:'info',event:'server_started',port,time:new Date().toISOString()})));
const shutdown=()=>server.close(()=>process.exit(0));
process.on('SIGINT',shutdown); process.on('SIGTERM',shutdown);
