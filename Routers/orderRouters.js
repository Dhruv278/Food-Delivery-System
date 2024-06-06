const express=require('express');
const router=express.Router();
const orderController=require('./../Controllers/orderController')
const authMiddlerware=require('../Middlerwares/authMiddleware');
const restaurantMiddleware=require('../Middlerwares/restaurnatMiddleware')


router.post('/create',authMiddlerware.isAuthenticatedUser,orderController.createOrder);
router.get('/getMyOrders',authMiddlerware.isAuthenticatedUser,orderController.getMyOrders);
router.post('/:resId/changeOrderStatus/:orderId',authMiddlerware.isAuthenticatedUser,restaurantMiddleware.checkRestaurantOwner,orderController.updateOrderStatus);
module.exports=router