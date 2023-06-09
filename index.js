const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(cors());
app.use(express.json())

const allowedOrigins = ['http://localhost:3000'];

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Replace "*" with the appropriate origin(s) or use a whitelist
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.use(cors({
    origin(origin, callback) {
        //allow requests with no origin
        //(like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.get('/', (req, res) => {
    res.send('Hello World!')
  })


//Auth Routes
const auth = require("./routes/auth.routes")
app.use("/auth", auth)

// hospital details Routes
const detail = require("./routes/detail.routes")
app.use("/detail", detail)


//db sequelize
const db = require("./models/index")
// db.sequelize.sync({
//   force: true,
// });

const CONFIG = require("./config/config")

//server
const PORT = CONFIG.port

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);