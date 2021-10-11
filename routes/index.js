var express = require('express');
var router = express.Router();

const axios = require('axios');
const { response } = require('express');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hue/info', function(req, res, next) {

 // call phillips api
  var r = asyncCall().then(val => {
    // got value here
    res.send(val)
}).catch(e => {
    // error
    console.log(e);
});;
  

});

router.get('/hue/positive', function(req, res, next) {

  var body = {
    hue: 50000,
    on: true,
    bri: 200
}

  // call phillips api
   var r = asyncPositive(body).then(val => {
     // got value here
     res.send(val)
 }).catch(e => {
     // error
     console.log(e);
 });;
   
 
 });

async function asyncCall() {
  const result = await callLights();
  return result.data;
} 

async function asyncPositive(body) {
  const result = await callPositive(body);
  return result.data;
} 


function callLights() {
  return axios.get('http://192.168.1.165/api/Vcs6ggxZeH9eGjQ26Rd9K6IBkOFeJpvR135sO1j6/lights');
}

function callPositive(body) {
  return axios.put('http://192.168.1.165/api/Vcs6ggxZeH9eGjQ26Rd9K6IBkOFeJpvR135sO1j6/lights/1/state',body);
}

module.exports = router;
