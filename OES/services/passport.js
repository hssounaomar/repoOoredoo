const passport =require('passport');
const User =require('../models/User');
const config=require('config');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const LocalStrategy=require('passport-local');
//create localstrategy
const localOptions={usernameField:'email'};
const localLogin=new LocalStrategy(localOptions,function(email,password,done){
//Verify this username and password, call done with the user
//if it is the correct username and password
//otherwise call done with false
User.findOne({email:email},function(err,user){
    if(err){return done(err)}
    if(!user){return done(null,false)}
    //compare passwords - is 'password' equal to user.password?
    user.comparePassword(password,function(err,isMatch){
        if(err){return done(err)}
        if(!isMatch){return done(null,false)}
        return done(null,user);
    })
})
})
//Setup options for JWT Strategy

const JwtOptions={
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:config.get('jwtSecret')
};


//Create Jwt strategy
const JwtLogin=new JwtStrategy(JwtOptions,function(payload,done){
    //see if the user ID in the payload exists in our database
    //If it does, call 'done' with that other
    //otherwise, call done without a user object
    User.findById(payload.sub,function(err,user){
        if(err){return done(err,false);}
        if(user){
            return done(null,user);
        }else{
            done(null,false);
        }
    })
})
//Tell passport to use this strategy
passport.use(JwtLogin);
passport.use(localLogin);