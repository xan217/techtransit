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
app.get('/courses/name/:name?/offset/:extraparams?', async (req, res) => {

    const base_request = `https://test.mytablemesa.com/`;
    let api_url = '';
    
    const name = req.params.name;    
    const offset = req.params.extraparams;

    //ENDPOINT provided depending the pagination
    if(offset == 0)
        api_url = base_request+`api/courses?orderBy=popularity+desc&expand=provider&name=${name}`;
    else
        api_url = base_request+`/api/courses?limit=25&offset=${offset}&orderBy=popularity%20desc&expand=provider&customPageId=0`;

    //Request
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();

    //Return JSON parsed data
    res.json(json);
});

//listen
app.listen(3000);