import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { SECRET } from './config'

function getUserId(request) {
    const token = request.request && request.request.headers.authorization || request.connection && request.connection.context.Authorization
    if (!token) {
        return
    } else {
        const decode = jwt.verify(token.replace('Bearer ', ''), SECRET)
        return decode.uid
    }
}

function signToken(content) {
    return jwt.sign(content, SECRET, { expiresIn: '7d' })
}

async function encrypt(plaintext) {
    return await bcrypt.hash(plaintext, 10)
}

async function compare(plaintext, ciphertext) {
    return await bcrypt.compare(plaintext, ciphertext)
}

export { getUserId, signToken, encrypt, compare }