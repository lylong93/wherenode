const user = {
    'name': {
        type: String,
        unique: true
    },
    'pwd': {
        type: String,
    }
}

const action = {
    'title': {
        type: String,
    },
    'time': {
        type: String,
    },
    'address': {
        type: String,
    },
    'main': {
        type: String,
    },
    'bgurl': {
        type: String,
    }
}
module.exports = {
    user,
    action
}