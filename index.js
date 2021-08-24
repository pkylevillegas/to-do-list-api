const express = require('express');
const dotenv = require('dotenv');
const db = require('./src/models')
const jwt = require('jsonwebtoken');

// Import routes
const userRoute = require('./src/routes/user.routes');
const loginRoute = require('./src/routes/login.routes');
const taskRoute = require('./src/routes/task.routes');

var app = express();

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

// console.log(require("crypto").randomBytes(64).toString("hex"));
//commentt
//comment ulit
dotenv.config();

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch((err) => {
        console.error('Unable to connect to the database', err);
});

if(process.env.ALLOW_SYNC === "true"){
    db.sequelize
    .sync({ alter: true })
    .then(() => 
        console.log('Done adding/updating database based on Models')
    );
}


app.use((req, res, next) => {
    console.log(req.url);
    console.log('Request has been sent!' + req.url);
    next();
})

app.get('/', (req, res) => {
    res.json({message: "Hello World!"});
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    // verify if token is valid
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(user, err);
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes
app.use(`${process.env.API_VERSION}/login`, loginRoute);
app.use(`${process.env.API_VERSION}/user`, userRoute);
app.use(`${process.env.API_VERSION}/task`, taskRoute);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});