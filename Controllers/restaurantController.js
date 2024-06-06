const User = require('./../Schema/userSchema');
const sendToken = require('../utils/jwtToken');
const ErrorHandler = require('../errorHandling/ErrorFormate')
const catchAsync = require('../errorHandling/catchError');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Restaurant = require('../Schema/restaurantSchema');
const APIFeatures = require('../utils/apiFeatures');
const createUniqueSlug = require('../utils/slug');

exports.addRestaurant = catchAsync(async (req, res, next) => {
    const restaurant = await Restaurant.create({
        name: req.body.name,
        city: req.body.city.toLowerCase(),
        location: {
            coordinates: req.body.location
        },
        menuItems: req.body.menuItems,
        owner: req.body.owner
    })

    res.status(200).json({
        status: true,
        restaurant
    })
})


exports.deleteRestaurant = catchAsync(async (req, res, next) => {
    const resId = req.params.resId;
    const restaurant = await Restaurant.findByIdAndDelete(resId);
    if (!restaurant) return next(new ErrorHandler('Invalid restaurant id', 500))
    res.status(200).json({
        status:"success"
})
})



exports.getMyAllRestaurants = catchAsync(async (req, res, next) => {
    const city = req.user.city;
    const resPerPage = 8;
    const restraurantCount = await Restaurant.countDocuments({ city, status: 'online' });

    if (restraurantCount === 0) return next(new ErrorHandler('No online restaurant found in your city', 404));

    // Apply filter search and doing serverside pagination
    const apiFeatures = new APIFeatures(Restaurant.find({
        city,
        status: 'online'
    },
        '-menuItems.slug'), req.query)
        .search()
        .filter()
        .pagination(resPerPage)




    let restaurants = await apiFeatures.query;
    let filterRestaurantCount = restaurants.length;

    res.status(200).json({
        success: true,
        totalRestaurants: restraurantCount,
        totalRestaurantsPerPage: filterRestaurantCount,
        data: {
            restaurants
        }
    })



})


exports.toggleRestaurantStatus = catchAsync(async (req, res, next) => {
    const restaurant = req.restaurant;

    restaurant.status = restaurant.status === 'online' ? 'offline' : 'online';
    await restaurant.save();

    res.status(200).json({
        status: 'success',
        restaurant
    })
})




exports.getMenu = catchAsync(async (req, res, next) => {
    const resId = req.params.resId;
    const restaurant = await Restaurant.findById(resId);

    if (!restaurant) return next(new ErrorHandler('No restaurnt found with given id', 500));

    res.status(200).json({
        status: "success",
        menu: restaurant.menuItems
    })
})



exports.addMenuItem = catchAsync(async (req, res, next) => {
    const newItem = {
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice,

    }
    const restaurant = req.restaurant;
    const newItemSlug = createUniqueSlug(restaurant.id, newItem.itemName);
    const item = restaurant.menuItems.filter(item => item.slug === newItemSlug);


    if (item.length != 0) return next(new ErrorHandler('Item is already there in the Menu', 500));

    restaurant.menuItems.push(newItem);
    await restaurant.save({ validateBeforeSave: true });

    res.status(200).json({
        status: 'success',
        menu: restaurant.menuItems
    })


})


exports.updateMuenuItems = catchAsync(async (req, res, next) => {
    const updatedItem = {
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice,
        slug: createUniqueSlug(req.restaurant.id, req.body.itemName)
    }
    const restaurant = req.restaurant;
    const oldSlug = req.params.slug;
    restaurant.menuItems.forEach((item, index) => {
        if (item.slug.toString() === oldSlug.toString()) {
            restaurant.menuItems[index] = updatedItem;
        }

    });

    await restaurant.save();
    return res.status(200).json({
        status: "success",
        menu: restaurant.menuItems
    })
})


exports.deleteItem = catchAsync(async (req, res, next) => {
    const itemSlug = req.params.slug;
    const restaurant = req.restaurant;
    restaurant.menuItems = restaurant.menuItems.filter(item => item.slug.toString() !== itemSlug.toString());
    await restaurant.save();

    res.status(200).json({
        status: "success",
        menu: restaurant.menuItems
    })
})

exports.addReview=catchAsync(async(req,res,next)=>{
    const user=req.user;
    const restaurantId=req.params.restaurantId;
    const {rating,comment}=req.body;

    const restaurant=await Restaurant.findById(restaurantId);

    if(!restaurant)return next(new ErrorHandler("no restaurant found",404));
    let updated=false;
    restaurant.reviews.forEach(review=>{

        if(review.user.toString()===user._id.toString()){
            updated=true;
            review.rating=rating;
            review.comment=comment;
        }
    })
    if(!updated){
        restaurant.reviews.push({
            user:user._id,
            rating,
            comment
        })
    }
   await restaurant.save();

   return res.status(200).json({
    status:"success",
    reviews:restaurant.reviews
   })
})