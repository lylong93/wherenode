// import newsapi from './news';
// import userapi from './user';
// import actionapi from './action';
const newsapi = require('./news');
const actionapi = require('./action');
const userapi = require('./user');
const router = require('koa-router')();

const multer = require('koa-multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        var fileformat = (file.originalname).split('.');
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileformat[fileformat.length - 1]);
    }
});
const upload = multer({ storage: storage })
const SUCCESS = 0;
const ERR = 1;
// 获取新闻
router.get('/api/news/:page/:elite', async(ctx, next) => {
    const params = ctx.params;
    const data = await newsapi.get(params);
    const body = {
        code: data != 'err' ? SUCCESS : ERR,
        data,
    }
    ctx.body = body;
});

router.get('/', async(ctx, next) => {
    console.log('ok')
    ctx.body = body;
});
// 注册
router.post('/user/rejister', async(ctx) => {
    const body = ctx.request.body
    await userapi.register(body)
        .then((data) => {
            ctx.body = data
        })
        .catch((err) => {
            ctx.body = err
        })
})
// 登录
router.post('/user/login', async(ctx) => {
    const body = ctx.request.body
    ctx.session.views = Math.random();
    await userapi.login(body)
        .then((data) => {
            ctx.body = data
        })
        .catch((err) => {
            ctx.body = err
        })
})
// 退出
router.get('/user/logout', async(ctx) => {
    console.log(ctx.session)
    ctx.session = null;
    console.log(ctx.session)
    ctx.body = 'ok'
})
// 发布活动
router.post('/action/publish', upload.single('avatar'), async(ctx) => {
    const body = ctx.req.body
    const filename = ctx.req.file.filename
    const host = ctx.req.headers.host
    const file = `${host}/${filename}`

    body.bgurl = file
    await actionapi.publish(body)
        .then((data) => {
            ctx.body = data
        })
        .catch((err) => {
            ctx.body = err
        })
})
// 获取活动
router.get('/action/getaction/:skip', async(ctx) => {
    const params = ctx.params;
    const skip = params.skip;
    await actionapi.getaction(skip)
        .then((data) => {
            ctx.body = data
        })
        .catch((err) => {
            ctx.body = err
        })
})
module.exports = router