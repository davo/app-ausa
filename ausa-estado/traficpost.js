var tt = require('twit')

var info = new tt({
    consumer_key: ''
  , consumer_secret: ''
  , access_token: ''
  , access_token_secret: ''
})

module.post = function(twit, cb){
    info.post('statuses/update', { status: twit }, function(err, data, res) {
        if (err)
            cb(data)
        //console.log("twit" + data)
        cb(data)
    })
}