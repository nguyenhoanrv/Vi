const jwt = require('jsonwebtoken')
const { resolve } = require('path/posix')

const generateToken = (user,secretSignature,tokenLife) => {
    return new Promise((resolve,reject) => {
        const userData = {
            id: user.id,
            username : user.username,
            email : user.email
        }
        jwt.sign(
            {data:userData},
            secretSignature,
            {
                algorithm : "HS256",
                expiresIn: tokenLife,
            },
            (error,token) => {
                if(error)
                    return reject(error)
                resolve(token)
            }
        )})
}
const verifyToken = (token,secretKey) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token,secretKey,(error,decode) => {
            if(error)
                return reject(error)
            resolve(decode)
        })
    })
}
module.exports = {
    generateToken : generateToken,
    verifyToken : verifyToken
}