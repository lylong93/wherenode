import { actionModel } from '../models'

export default function login(body) {
    const { title, time, address, main, bgurl } = body
    return new Promise(function(resolve, reject) {
        if (!title || !time || !address | !main) {
            reject({ err: 3, msg: '参数错误' })
        }
        const newAction = new actionModel({
            title,
            time,
            address,
            main,
            bgurl
        })
        newAction.save()
            .then((doc) => {

                resolve({ err: 0, msg: '发布成功' })
            })
            .catch((err) => {

                reject({ err: 2, msg: '出错了' })
            })
    })
}