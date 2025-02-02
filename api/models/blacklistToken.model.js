
//we will use the concept of blacklist token in jwt for logout

//store the token in blacklist through which we logout and next time during accessing
//protected route if my token is part of blacklistToken then we will not authorise user to acces that route

//we are storing the token in DB , so to avoid unnecessary space we will use the concept of TTL(Time To Live) 
//in which token will be deleted from the blacklist after a certain time period

const mongoose = require('mongoose');

//schema of blacklistToken

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hour TTL
    }
});


const blacklistTokenModel = mongoose.model('blacklistToken', blacklistTokenSchema);

module.exports=blacklistTokenModel



