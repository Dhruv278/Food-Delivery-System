const express=require('express');
const router=express.Router();
const deliveryAgentController=require('./../Controllers/DeliveryAgentController')
const authMiddlerware=require('../Middlerwares/authMiddleware');

router.use(authMiddlerware.isAuthenticatedUser)
router.post('/create',deliveryAgentController.createDeliveryAgent);
router.put('/updateCurrentLocation/:id',deliveryAgentController.changeCurrentLocationOfDeliveryAgent)
router.get('/toggleStatus/:id',deliveryAgentController.toggleStatus);
router.post('/addReview/:agentId',deliveryAgentController.addReview);

module.exports=router;