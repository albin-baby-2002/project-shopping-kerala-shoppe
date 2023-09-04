
const db = require('../config/connection')
const collections = require('../config/collections');
const async = require('hbs/lib/async');

const addProduct = async (product, callback) => {


    try {

        const dbase = await db.get();

        console.log("product name : /n" + collections.PRODUCT);

        if (!dbase.collection(collections.PRODUCT)) {
            await dbase.createCollection(collections.PRODUCT)
        }

        await dbase.collection(collections.PRODUCT).insertOne(product).then((result) => {

            callback(result.insertedId.toString());
        })

            .catch((err) => {
                throw new Error(err)
            })
    }
    catch (err) {
        console.log("error while adding products : " + err);
    }

}

const getAllProducts = () => {

    return new Promise(async (resolve, reject) => {
        let products = await db.get().collection(collections.PRODUCT).find().toArray()

        if (products) {
            resolve(products)
        } else {
            reject(new Error("failed to get all product data from the database"))
        }
    })
}



module.exports = { addProduct, getAllProducts }