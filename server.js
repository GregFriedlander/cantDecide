var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

app.use(bodyParser.json());
// app.use(session({secret: "SuperduperSecret"}));
app.use(express.static(path.join(__dirname, 'public', 'dist')));

const yelp = require('yelp-fusion');
const client = yelp.client('t6FEIonojfLfmLpHnx-EqMVVstP_ZR0SGkmOWz-LKz8JdNWrUov7zZ8FiIqL3KxmkHSe9kPtSU_QA_hcz4MoO9XgkppCl9yPQid_RE7XlHmBVHkHKcADZ0nLh4zmWnYx');

// app.get('/test', function(req, res){
//     client.businessMatch('lookup', {
//         name: 'Pannikin Coffee & Tea',
//         address1: '510 N Coast Hwy 101',
//         address2: 'Encinitas, CA 92024',
//         city: 'Encinitas',
//         state: 'CA',
//         country: 'US'
//       }).then(response => {
//         console.log(response.jsonBody.businesses[0].name);
//         // res.json(response.jsonBody.businesses[0].name);
//         res.json(response.jsonBody.businesses[0]);
//       }).catch(e => {
//         console.log(e);
//       });
// })

// app.get('/searchArea/:area', function(req,res){
//     'use strict';
//     client.search({
//         location: req.params.area,
//         limit: '5',
//         category: 'bowling',
//       }).then(response => {
//         console.log(response.jsonBody.businesses);
//         res.json(response.jsonBody.businesses)
//       }).catch(e => {
//         console.log(e);
//       });
// })

app.get('/randomPick/:term/:city/:radius/:price/:mood', function(req,res){
    'use strice';
    var rate = '';
    if(req.params.mood == 'safe'){
        rate = 3.9;
    }
    else if(req.params.mood == 'medium'){
        rate = 2.2;
    }
    else{
        rate = 1.9;
    }
    console.log('rate = ', rate);
    var i = Math.floor(Math.random() * 51);
    var newList = [];
    // console.log('i = ', i);
    client.search({
        term: req.params.term,
        location: req.params.city,
        limit: '50',
        range: req.params.radius,
        sort_by: 'distance',
        price: req.params.price,
      }).then(response => {
          for(var x = 0; x < response.jsonBody.businesses.length; x++){
              if(response.jsonBody.businesses[x].rating > rate){
                  newList.push(response.jsonBody.businesses[x]);
              }
              else{
                  continue;
              }
          }
        // console.log(response.jsonBody.businesses);
        // res.json(response.jsonBody.businesses)
        var z = Math.floor(Math.random() * newList.length);
        
        console.log('newList[z] =', newList[z]);
        res.json(newList[z])
      }).catch(e => {
        console.log(e);
      });
})



app.listen(8000, function(){
	console.log("on port 8000");
})