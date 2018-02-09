// import { userModel } from '../models'
var { userModel } = require('../models');
module.exports = function login(body) {
    const { name, pwd } = body
    return new Promise(function(resolve, reject) {
        if (!name || !pwd) {
            reject({ err: 3, msg: '参数错误' })
        }
        userModel.findOne({ name: name, pwd: pwd })
            .then((doc) => {
                if (!doc) {
                    reject({ err: 1, msg: '用户或密码错误' })
                }
                resolve({ err: 0, data: doc })
            })
            .catch((err) => {
                reject({ err: 2, msg: '出错了' })
            })
    })
}