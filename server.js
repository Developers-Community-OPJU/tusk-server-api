const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
// const config = require('config')

// CONFIGURING CONFIG JWTPRIVATEKEY
// if(!config.get("jwtPrivateKey")){
//   console.log("FATAL ERROR : jwtPrivateKey is not defined");
//   process.exit(1);
// }

// CONFIGURING MONODB WITH MONGOOSE
const mongoose = require("mongoose");
const url = "mongodb://localhost/tusk_db";
// const url = "mongodb://DCO-DB-DEV:dcodbdev@dc-event-api-shard-00-00.nfp9e.mongodb.net:27017,dc-event-api-shard-00-01.nfp9e.mongodb.net:27017,dc-event-api-shard-00-02.nfp9e.mongodb.net:27017/dco_db?ssl=true&replicaSet=atlas-148vpq-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => { console.log("Connected to MongoDB Server..") })
  .catch(() => { console.log("Sorry,MongoDb Connection Failed! ") })


app.use(morgan('tiny'));
app.use(cors());

// CONFIGURING BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ROUTES
const task = require('./routes/task')




app.use('/api/task', task);




// establishing the server on the port 3000
const port = process.env.PORT || 3000;
const IP = process.env.IP;
app.listen(port, IP, () => {
  console.log(`Server Started on the port :: ${port} - ${IP}`);
});