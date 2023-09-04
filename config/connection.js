const async = require('hbs/lib/async');
const mongoose = require('mongoose');

const state = {
    db: null
}

const connect = async (done) => {

    const dbname = 'shopping';
    const url = `mongodb://127.0.0.1:27017/${dbname}`;

    try {

        await mongoose.connect(url,
            { useNewUrlParser: true, useUnifiedTopology: true, })
            .then((connection) => {
                console.log("connected to mongodb");
            })



            .catch((error) => {

                throw new Error(error);

            });

        const base = mongoose.connection.db;

        state.db = base;
        done();




    }

    catch (err) {

        done(err);
    }


}

const get = () => {
    return state.db;
}


module.exports = { connect, get }