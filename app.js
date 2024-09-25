const express = require('express');
const connectToDb = require('./DB/dbServices');

const chalk = require('chalk');
const { handleError } = require('./utils/handleError');
const loggerService = require('./logger/loggerServices');
const router = require('./router/router');
const corsMiddleWare = require('./middlewares/cors');

const app = express();
const PORT = 8181

app.use(corsMiddleWare)
app.use(express.json());
app.use(loggerService());

app.use(router);

app.use((err, req, res, next) => {
    console.log(err);
    handleError(res, 500, 'internal error server');
});

app.listen(PORT, () => {
    console.log(chalk.yellow('app is listening to port ' + PORT));
    connectToDb();
})