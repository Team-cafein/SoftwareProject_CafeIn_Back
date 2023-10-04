/*

const OpenAI = require('openai')
const {Configuration, OpenAIApi} = OpenAI
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-61MEulc6s1BeLM2RoTdq7Wyg",
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 4000,
        temperature: 0,
    });
    console.log(response.data)
    if (response.data) {
        if (response.data.choices) {
            res.json({
                message: response.data.choices[0].text
            })
        }
    }
})

app.listen(port, () => {
    console.log('Example app port: ' + port);
})
*/

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const {Configuration, OpenAIApi} = require("openai");

const config = new Configuration({
    apiKey: "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",
})

const openai = new OpenAIApi(config);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/", async(req,res)=>{
    const {prompt} = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 512,
        temperature: 0,
    });
    
    res.send(completion.data.choices[0].text);
})

const port = 8080;
app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
})