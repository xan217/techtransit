//Required Modules
const express = require('express');
const app = express();
const fetch = require('node-fetch')
const bodyparser = require('body-parser');

//Application uses to handle the requests
app.use(bodyparser.json());
app.use(express.static("public"));

//ROUTES
//Connection to the external server to retrieve the course list
app.get('/courses', async (req, res) => {

    //ENDPOINT provided
    const api_url = `https://test.mytablemesa.com/api/courses?orderBy=popularity+desc&expand=provider&name=`;

    //Request
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();

    //Return JSON parsed data
    res.json(json);
});

//listen
app.listen(3000);