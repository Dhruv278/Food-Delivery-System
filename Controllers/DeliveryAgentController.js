const Agent = require("../Schema/deliveryAgentSchema");
const catchAsync = require("../errorHandling/catchError");
const ErrorHandler=require('../errorHandling/ErrorFormate')
 exports.findAvailableDeliveryAgents = async (restaurantLocation) => {
    try {
        const availableAgents = await Agent.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: restaurantLocation
                    },
                    distanceField: "dist.calculated",
                    maxDistance: 5000, // 5 km 
                    query: { isAvailable: true },
                    spherical: true
                }
            }
        ]);
        return availableAgents;
    } catch (error) {
        console.error("Error finding delivery agents:", error);
        throw error;
    }
};


exports.toggleDeliveryAgentStatus=async (id)=>{
    const agent=await Agent.findById(id);
    agent.isAvailable=!agent.isAvailable;

    await agent.save();
    
}

exports.toggleStatus=catchAsync(async(req,res,next)=>{
    const id=req.params.id;
    const agent=await Agent.findById(id);
    if(!id)return next(new ErrorHandler("No Agent Found",400));

    await this.toggleDeliveryAgentStatus(agent._id);

    return res.status(200).json({
        status:"success",
        
    })
})

exports.createDeliveryAgent=catchAsync(async(req,res,next)=>{
    const {name,email,currentLocation,contact_number}=req.body;

    const newAgent=await Agent.create({
        name,
        email,
        current_location:{
            coordinates:currentLocation
        },
        contact_number
    })

    res.status(200).json({
        status:"success",
        newAgent
    })


})


exports.changeCurrentLocationOfDeliveryAgent=catchAsync(async(req,res,next)=>{
    const id=req.params.id;
    if(id !== req.user._id)return next(new ErrorHandler("You are not allow to perform this action"));
    const {currentLocation}=req.body;
    
    const updatedAgent=await Agent.findByIdAndUpdate(id,{
       
        current_location:{
            coordinates:currentLocation
        },
       
    })
    if(!updatedAgent)return next(new ErrorHandler("No Agent found with this id",404));
    res.status(200).json({
        status:"success",
        updatedAgent
    })
})

exports.addReview=catchAsync(async(req,res,next)=>{
    const user=req.user;
    const agentId=req.params.agentId;
    const {rating,comment}=req.body;

    const agent=await Agent.findById(agentId);

    if(!agent)return next(new ErrorHandler("no agent found",404));
    let updated=false;
    agent.reviews.forEach(review=>{

        if(review.user.toString()===user._id.toString()){
            updated=true;
            review.rating=rating;
            review.comment=comment;
        }
    })
    if(!updated){
        agent.reviews.push({
            user:user._id,
            rating,
            comment
        })
    }
   await agent.save();

   return res.status(200).json({
    status:"success",
    reviews:agent.reviews
   })
})