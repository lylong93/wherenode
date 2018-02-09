// import router from './router';
const router = require('./router');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const serve = require('koa-static');

const app = new Koa();
// socket
const http = require('http').Server(app.callback());
const io = require('socket.io')(http);
io.on('connection', function(socket) {
    console.log('a user connected');
});

// mongodb
const mongoose = require('mongoose');
const url = 'mongodb://localhost/where';
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