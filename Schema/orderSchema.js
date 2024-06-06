const mongoose=require('mongoose');


const orderSchema=mongoose.Schema({
    buyerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Restaurant'
    },
    deliveryAgent:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Agent"
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        enum : ['pending','accepted',"rejected",'preparing','dispatched','delivered'],
        default: 'pending'
    },
    quantity:{
        type:Number,
        required:[true,'Please enter the quantity of pizza']
    },
    totalPayment:{
        type:Number,
        required:true
    },
    item:{
        itemName:{
            type:String,
            required:true
        },
        itemPrice:{
            type:Number,
            required:true
        },
        slug:{
            type:String,
            require:true
        }
        
    },
    ratings:{
        type:Number
    },

    delivery_location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',

        },
        coordinates: {
            type: [Number],
            required: true,
            index:"2dsphere"
        },
    },
})



orderSchema.index({ location: '2dsphere' });




const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
