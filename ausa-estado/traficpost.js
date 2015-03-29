var tt = require('twit')

var info = new tt({
    consumer_key: ''
  , consumer_secret: ''
  , access_token: ''
  , access_token_secret: ''
})

var publishtwit = function(twit){
    info.post('statuses/update', { status: twit }, function(err, data, res) {
        if (!err) {
            console.log("twit" + data)
            console.log(err)
            //console.log(res)
        } else {
            console.log(err)
            //console.log(res)
        }
    })
}