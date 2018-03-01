// import router from './router';
const router = require('./router');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const serve = require('koa-static');

const app = new Koa();

//mongodb
const mongoose = require('mongoose');
//线上
const url = 'mongodb://127.0.0.1:27017/where';
//开发环境
if (process.env.NODE_ENV = 'development') {
    const url = 'mongodb://localhost/where';
}

mongoose.Promise = global.Promise;
mongoose.connect(url, { useMongoClient: true })
    .then(() => {
        console.log('mongoDB OK')
    })
    .catch((err) => {
        console.log(err)
    })

// session
app.keys = ['where'];
const CONFIG = {
    key: 'where',
    maxAge: 3600000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
}

app.use(session(CONFIG, app))

app.use(bodyParser())
app.use(router.routes());
app.use(serve(__dirname + '/uploads'));

app.listen(3000);
console.log('server in  3000...');