
const redis = require('redis');
const { createClient } = redis;

let redisClient;
let pubClient;
let subClient;
const redisConnection = () => {
    try {
         redisClient = redis.createClient();
         pubClient = createClient({ url: "redis://localhost:6379" });
         subClient = pubClient.duplicate();

        redisClient.connect();
        pubClient.connect();
        subClient.connect();
        redisClient.on('connect', ()=> {
            console.log('connected redis');
        })

    } catch (error) {
        console.log('redis connection error',error);
    }
}

// async function getredisClient(){
//     return redisClient;
// }


module.exports ={
    redisConnection,
    redisClient,
    pubClient,
    subClient
};
