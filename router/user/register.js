const { userModel } = require('../models');
// const bcrypt = require('bcryptjs');
// import models from '../models'

module.exports = function register(body) {
    const { name, pwd } = body
    return new Promise(function(resolve, reject) {
        if (!name | !pwd) {
            reject({ err: 3, msg: '参数错误' })
        }
        userModel.findOne({ name: name })
            .then((doc) => {
                if (doc) {
                    reject({ err: 1, msg: '该用户存在' })
                } else {
                    save()
                }
            })
            .catch((err) => {
                reject({ err: 2, msg: '出错了' })
            })
        const save = () => {
            console.log('save')

            const newUser = new userModel({
                name,
                pwd,
            })
            newUser.save()
                .then((doc) => {
                    resolve({ err: 0, msg: '注册成功' })
                })
                .catch((err) => {
                    reject({ err: 2, msg: '出错了' })
                })
        }
    })

}