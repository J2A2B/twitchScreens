const express = require('express');
const app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const TwitchApi = require('twitch-api');
const twitch = new TwitchApi({
    clientId: '4vanrv34kq4ot0f3qh84ng3qz2m9o7',
    clientSecret: '1ab8qau7spg5lriibkwno3ulm2xbeg',
    redirectUri: 'http://localhost/twitchApi'
    // scopes: [user_read,channel_read,channel_commercial]
  });

app.get('/games', (req, res) => {
  //res.send("coucou")
    twitch.getTopGames(function(err, body){
    if (err){
      console.log(err);
    } else {
      res.json(body)
    }
})
})

app.get('/streams', (req, res) => {
    twitch.getStreams(function(err, body){
      if(err){
        console.log(err);
      }else{
        res.json(body)
      }
    })
})

// app.get('/screenOne/:channel', (req, res) => {
//   //res.send("coucou")
//     twitch.getChannel(function(err, body){
//     if (err){
//       console.log(err);
//     } else {
//       res.json(body)
//     }
// })
// })

app.listen(3000, () => {
  console.log('listening on 3000')
})