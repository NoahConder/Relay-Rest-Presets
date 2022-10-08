const express = require('express')
const app = express();
const multer = require("multer");
const bodyParser = require('body-parser');
let upload = multer();
const axios = require("axios");
const { URLSearchParams } = require('url');
const encodedParams = new URLSearchParams();

require('dotenv').config()
// Import our .ENV credentials
const project = process.env.SIGNALWIRE_PROJECT;
const token = process.env.SIGNALWIRE_TOKEN;
const space = process.env.SIGNALWIRE_SPACE;

const auth = Buffer.from(project + ":" + token).toString('base64')


console.log(auth)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);

app.use(upload.array());

app.get("/", function (req, res){

     res.render(__dirname+"/public/html/index.ejs");
 });

app.get("/presets", function (req, res){

     res.render(__dirname+"/public/html/presets.ejs");
 });


app.post("/presets_handle",  function (req, res) {
    let box = req.body.laml_box_cox
    let voice_mode = ''
    let name = req.body.name
    let number = req.body.sig_phone
    let selection = req.body.mode_select
    let error_res;
    if (selection === 'voice') {
        voice_mode = selection
    } else if (selection === 'fax') {
        voice_mode = selection
    } else {
        voice_mode = 'voice'
    }
    console.log(selection)
    if (name === '') {
        error_res = "Please enter a name for your bin!"
        res.render(__dirname+ "/public/html/error.ejs",{'error_res':error_res});
    } else if (number === '') {
        error_res = "Please enter a valid SignalWire number!"
        res.render(__dirname + "/public/html/error.ejs", {'error_res':error_res});
    } else {
        {
            const response_number = {

                  method: 'GET',
                  url: `https://${space}/api/relay/rest/phone_numbers?filter_number=${number}`,
                  headers: {
                    Accept: 'application/json',
                    Authorization: `Basic ${auth}`
                  }
                };
            axios(response_number)
              .then(function (response) {
                  let number_id = response.data.data[0].id
                  console.log(number_id)
                  console.log(box)
                  console.log(name)
            encodedParams.set('Name', `${name}`);
            encodedParams.set('Contents', `${box}`);

            const options = {
                method: 'POST',
                url: `https://${space}/api/laml/2010-04-01/Accounts/sid/LamlBins`,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${auth}`
                },
                data: encodedParams,
            };

            axios.request(options)
                .then(function (bin_response) {
                    let bin_url = bin_response.data.request_url
                    let call_url = ''
                    let message_url = ''
                    if (selection === 'voice') {
                        call_url = bin_url
                    } else if (selection === 'fax') {
                        call_url = bin_url
                    } else {
                        message_url = bin_url
                    }
                    const apply_phone = {
                      method: 'PUT',
                      url: `https://${space}/api/relay/rest/phone_numbers/${number_id}`,
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${auth}`
                      },
                      data: {
                        call_receive_mode: `${voice_mode}`,
                        call_request_url: `${call_url}`,
                        message_request_url: `${message_url}`
                      }
                    };
                    axios.request(apply_phone)
                      .then(function (response_applied) {
                        res.render(__dirname+"/public/html/sent.ejs",{'bin_url':bin_url});
                        console.log(response_applied.data);
                      })
                      .catch(function (error) {
                        console.error(error);
                      });

                      })
                      .catch(function (error) {
                        console.error(error);
                      });
                    });

        }
    }
 });

app.listen(8080);

console.log("http://localhost:8080");
