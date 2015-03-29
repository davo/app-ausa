var redis = require("redis"),
    client1 = redis.createClient(),
    client2 = redis.createClient(),
    msg_count = 0;

client1.on("subscribe", function (channel, count) {
    client2.publish("realtime", "I am sending a message.");
});

client1.on("message", function (channel, message) {
    console.log("client1 channel " + channel + ": " + message);
    msg_count += 1;
    if (msg_count === 3) {
        client1.unsubscribe();
        client1.end();
    }
});

client1.incr("did a thing");
client1.subscribe("realtime");