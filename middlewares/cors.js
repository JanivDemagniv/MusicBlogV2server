const cors = require('cors')

const corsMiddleWare = cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5173']
});

module.exports = corsMiddleWare;