var express = require('express');
var path = require('path');
app = express();




/**
 * Twitch API
 * 
 */

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const TwitchApi = require('twitch-api');

const twitch = new TwitchApi({
    clientId: '4vanrv34kq4ot0f3qh84ng3qz2m9o7',
    clientSecret: '1ab8qau7spg5lriibkwno3ulm2xbeg',
    // redirectUri: 'http://localhost:3000/twitchApi'
    // scopes: [user_read,channel_read,channel_commercial]
  });

app.get('/games', (req, res) => {
  twitch.getTopGames({limit:100},function(err, body){
    if (err){
      console.log(err);
    } else {
      res.json(body)
    }
  })
})

app.get('/streams/:name', (req, res) => {
  const name = req.params.name
  console.log(name)
    twitch.getStreams({game:name, limit:100},function(err, body){
      if(err){
        console.log(err);
      }else{
        res.json(body)
      }
    })
})

app.get('/videos/:channel', (req, res) =>{
  twitch.getChannelVideos ({channel:name, limit:100},function(err,body){
    if (err) {
      console.log(err);
    }else{
      res.json(body)
    }
  })
})




app.use(express.static(__dirname));
app.use(function(req, res) { 
	res.sendFile(__dirname + '/index.html'); 
});


var port = process.env.PORT || 3000;
app.listen(port);
console.log('server started on '+ port);