const mongoose=require('mongoose');

const AgentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:false
    },
    contact_number:{
        type:String,
        required:true
    },
    current_location:{
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
    reviews:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
          },
          rating:{
              type:Number,
              min: 1, 
              max: 5
          },
          comment:{
              type:String
          }
      

    }]
})

const Agent=mongoose.model('Agent',AgentSchema);

module.exports = Agent