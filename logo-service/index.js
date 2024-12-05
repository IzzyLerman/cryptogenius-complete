
const express = require('express');
const app = express()
const fs = require('node:fs')
const path = require('path');
const axios = require("axios");

const dotenv = require('dotenv')
dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.use(express.json())

const PORT = process.env.LOGO_PORT

app.listen(
    PORT,
    () => {
        console.log(`Logo service live on http://localhost:${PORT}`)
    }
)

app.get('/logo', (req, res) => {
    res.status(200).send({
         'logo': 'None',
         'status' : 'OK'
        })
})

app.get('/logo/:symbol', (req, res) => {
    const path = `./../logos/64/${req.params.symbol}.png`;
    try {
        if (fs.existsSync(path)) {
            res.status(200).send({
                'logo' : `logos/64/${req.params.symbol}.png`,
                'status' : 'OK'
            })
        }else{
            res.status(400).send({
                'logo' : 'Not Found',
                'status' : 'BAD'
            })
        }   
    } catch (err) {
        console.error(err);
        res.status(400).send({
            'logo' : 'Error',
            'status' : 'BAD'
        })
    }
})
