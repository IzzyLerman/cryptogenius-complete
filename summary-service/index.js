
const express = require('express');
const app = express()
const fs = require('node:fs')
const path = require('path');
const axios = require("axios");


const OpenAI = require('openai');
const dotenv = require('dotenv')
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
const PORT = process.env.SUMMARY_PORT
app.use(express.json())



app.listen(
    PORT,
    () => {
        console.log(`Summary service live on http://localhost:${PORT}`)
    }
)

app.get('/summary', (req, res) => {
    res.status(200).send({
         'summary': 'None',
         'status' : 'OK'
        })
})

app.get('/summary/:symbol&:name', async (req, res) => {
    const name = req.params.name
    const symbol = req.params.symbol

    try {

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {"role": "user", "content": `You will write a concise, one paragraph summary of this cryptocurrency: ${name} (${symbol}). In the first paragraph, describe 
                any unique features the coin has, and it's market relevance, and its brief history. MAKE SURE IT IS ONE PARAGRAPH TOTAL.`}
            ]
        });

        res.status(200).send({
            'summary' : completion.choices[0].message.content,
            'status' : 'OK'
        })

    } catch (err) {
        console.error(err);
        res.status(400).send({
            'summary' : 'None',
            'status' : 'BAD'
        })
    }
})
