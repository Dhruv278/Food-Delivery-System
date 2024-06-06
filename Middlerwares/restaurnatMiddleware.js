const ErrorHandler = require('../errorHandling/ErrorFormate');
const catchAsync=require('../errorHandling/catchError');
const jwt=require('jsonwebtoken');
const User=require('../Schema/userSchema');
const Restaurant = require('../Schema/restaurantSchema');
const { restart } = require('nodemon');




exports.checkRestaurantOwner=catchAsync(async(req,res,next)=>{
    const {token}=req.cookies
   

    if(!token){
        return next(new ErrorHandler('Login first to access this resource',401));

    }

    const decoded=jwt.verify(token,process.env.JWTSECRET);
    req.user=await User.findById(decoded.id);
    const resId=req.params.resId;
    const restaurant=await Restaurant.findById(resId);

    if(!restaurant)return next(new ErrorHandler('Enter valid restaurant id',500));
   
    // checking owner's Id 
    if(restaurant.owner.toString()!==req.user.id.toString())return next(new ErrorHandler('You are not allowed to perform this action',500))
    
    req.restaurant=restaurant;
    next();
})

