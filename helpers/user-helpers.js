const db = require('../config/connection')
const collections = require('../config/collections');
const bcrypt = require('bcrypt');
const async = require('hbs/lib/async');

const doSignUp = (userData) => {

    return new Promise(async (resolve, reject) => {

        userData.password = await bcrypt.hash(userData.password, 10);
        db.get().collection(collections.USER).insertOne(userData).then((data) => {
            resolve(data.insertedId.toString())
        })
    })



}

const doLogin = (userData) => {

    return new Promise(async (resolve, reject) => {
        let loginStatus = false;
        let response = {};

        let user = await db.get().collection(collections.USER).findOne({ email: userData.email })

        if (user) {
            bcrypt.compare(userData.password, user.password).then((status) => {
                if (status) {
                    console.log('login success');
                    response.user = user;
                    response.status = true;
                    resolve(response)
                }
                else {
                    console.log('login failed')
                    resolve({ status: false })
                }
            })
        } else {
            console.log('failed to find user while login');
            resolve({ status: false })
        }

    })


}

module.exports = { doSignUp, doLogin }