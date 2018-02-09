import { user, action } from './schemas';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = mongoose.model('user', new Schema(user))
const actionModel = mongoose.model('action', new Schema(action))

export { actionModel, userModel }