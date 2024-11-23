import { app } from "./app.js";
import { connectDb } from "./db/connection.js";

const port = 8000;

connectDb()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch((err) => {
    console.log("Mongo Db connection Failure :",err )
})