const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createUniqueSlug=require('./../utils/slug')

const MenuItemSchema = new Schema({
  itemName: {
    type: String,
    required: [true, 'Enter item name']
  },
  itemPrice: {
    type: Number,
    required: [true, 'Please enter price of the item'],
    max: [10000, 'Cannot set price more than 10000 for a particular item, contact admin'],
    min: [0, 'Cannot set price in negative']
  },
  slug: {
    type: String,
    unique: [true, "Slug must be a unique identity"]
  }
});
MenuItemSchema.pre('save', async function (next) {
    try {
      if (!this.slug) {
        const restaurantId = this.parent().id; // Get the ID of the parent restaurant
        const uniqueSlug = createUniqueSlug(restaurantId, this.itemName);
        this.slug = uniqueSlug;
      }
      next();
    } catch (error) {
      next(error);
    }
  });
  
const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter restaurant name'],
    minlength: [2, 'Restaurant name must be longer than 2 characters'],
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
  },
  city: {
    type: String,
    required: [true, 'Please enter city']
  },
  location: {
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
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'online'
  },
  menuItems: [MenuItemSchema],
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
});




// Create models
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
const MenuItems=mongoose.model('MenuItems',MenuItemSchema);

module.exports = Restaurant