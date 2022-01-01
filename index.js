const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const ObjectId = require('mongodb').ObjectId
const fileUpload = require('express-fileupload')
const port = process.env.PORT || 5000;


//midelware
app.use(cors());
app.use(express.json());
app.use(fileUpload());



//DB Connection
const uri = `mongodb://${process.env.MONGDB_USERNAM}:${process.env.MONGDB_USERPAS}@cluster0-shard-00-00.x6o4r.mongodb.net:27017,cluster0-shard-00-01.x6o4r.mongodb.net:27017,cluster0-shard-00-02.x6o4r.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-kup6pw-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const main = async () => {
    try {
        await client.connect();
        const database = client.db("heroRider");
        const usersDataCollection = database.collection("usersData");
        /* const productsDataCollection = database.collection("productsData");
        const ordersDataCollection = database.collection("ordersData");
        const reviewsDataCollection = database.collection("reviewsData");
        const blogsDataCollection = database.collection("blogsData"); */


        //UserData, Use Role
        app.put('/usersdata', async (req, res) => {
            /* image data convert to base64 */
            const profilePicData = req.files.profilePic.data.toString('base64')
            const nidData = req.files.nid.data.toString('base64')
            const drivingLicenceData = req.files.drivingLicence.data.toString('base64')

            /* make an object with all user data */
            const userInfo = { ...req.body, profilePic: profilePicData, nid: nidData, drivingLicence: drivingLicenceData }
           
            /* insert to db and send res */
            const result = await usersDataCollection.insertOne(userInfo)
            res.send(result)
        })

    }

    finally {

    }
}

main().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello from backend')
})

app.listen(port, () => {
    console.log(`listening Port:${port}`)
})