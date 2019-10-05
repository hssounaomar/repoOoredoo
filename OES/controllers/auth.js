const User=require('../models/User');
const jwt=require('jwt-simple');
const config=require('config');
function tokenForUser(user){
    const timestamp = new Date().getTime();
   
    return jwt.encode({sub:user.id,iat:timestamp},config.get('jwtSecret'));
}
exports.signin=function(req,res,next){
    //User has already had their email and password
    //we just need to give them a token
    console.log('inside Sigin',req.user)
    res.send({token:tokenForUser(req.user),success:true,err:null,user:req.user});
}
exports.signup=function(req,res,next){
    const email=req.body.email;
    const password=req.body.password;
    const tel=req.body.tel;
    const role=req.body.role;
    const firstName=req.body.firstName;
if(!email || !password){
    return res.status(422).send({'error':'You must provide email ans password'})
}
User.findOne({email:email},function(err,user){
    if(err) return next(err)
    if(user){
        return res.status(422).send({error:'email is in use'});
    }
    const newUser=new User({
        email,password,tel,role,firstName
    })
    newUser.save(function(err){
        if(err) return next(err)
        res.json({token:tokenForUser(newUser)})
    })
})
}