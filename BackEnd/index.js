import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";

const MongoClient = mongodb.MongoClient;
const mongo_password = process.env['MONGO_PASSWORD'];
const uri = `mongodb+srv://hernandezhernandez48:${mongo_password}@cluster0.vojt3hx.mongodb.net/?retryWrites=true&w=majority`

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

MongoClient.connect(
    uri,
    {
        maxPoolSize:  50,
        wtimeoutMS: 2500,
        userNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack)
}).then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () =>{
        console.log(`listening on port ${port}`)
    } )
})
