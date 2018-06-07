var botgram = require('botgram');
var request = require('request');
var bot = new botgram(Key from Telegram);

const Zomato = require('zomato.js');
const z = new Zomato(API-Key from Zomato);



bot.location(function (msg, reply, next) {
  reply.text("Hello "+msg.from.firstname+" , Preparing your suggestions : ");
    var lat=msg.latitude;
    var lon=msg.longitude;

    z.search({
    lat: lat,
    lon: lon,
    count: 5
    })
      .then(function(data) {
        for(var i=0;i<data.restaurants.length;i++){
            z.restaurant({
            res_id: data.restaurants[i].id
            })
              .then(function(data2) {
                var namer = data2.name;
                var locr = data2.location.address;
                var actr = data2.average_cost_for_two;
                var menur = data2.menu_url;
                reply.text("Name : "+namer+"\n"+"Cost for two : "+actr+"\n"+"Address : "+locr+"\n"+"Menu : "+menur+"\n");
              })
              .catch(function(err) {
                console.error(err);
              });
        }
      })
      .catch(function(err) {
        console.error(err);
      });
});