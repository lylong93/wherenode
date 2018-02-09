// import { actionModel } from '../models'
var { actionModel } = require('../models');
module.exports = function login(skip) {
    return new Promise(function(resolve, reject) {
        var query = actionModel.find()
        const index = Number(skip)
        query.skip(index)
            .limit(1)
            .then((doc) => {
                if (doc.length === 0) {
                    resolve({ err: 1 })
                }
                resolve({ err: 0, data: doc })
            })
            .catch((err) => {
                reject({ err: 2, msg: '出错了' })
            })
    })
}