const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt-nodejs');
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    /*lastName: {
        type: String
    }, */
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    tel : {
        type: Number,
        required: true
    },
    password: {
        type: String
    },
    image:{
        type: String
    },
    role: {
        type: String,
        required: true
    }
});
//on save hook, encrypt password
userSchema.pre('save',function(next){
    const user=this;
    bcrypt.genSalt(10,function(err,salt){
        if(err){return next(err);}
        bcrypt.hash(user.password,salt,null,function(err,hash){
            if(err){return next(err);}
            user.password=hash;
            next();
        })
    })
})
userSchema.methods.comparePassword=function(candidatePassword,callback){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err){return callback(err);}
        callback(null,isMatch);
    })
}
module.exports = mongoose.model('User', userSchema);