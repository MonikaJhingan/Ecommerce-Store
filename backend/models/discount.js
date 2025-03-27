const mongoose = require('mongoose');


const discountCodeSchema = new mongoose.Schema({
   
   discountCode: {
      type: String,
      required: true,
      unique: true
   },

   orderCountThreshold: {
      type: Number,
      required: true
   },
   isUsed: {
      type: Boolean,
      default: false
   },


});

const DiscountCode = mongoose.model('DiscountCode', discountCodeSchema)
module.exports = DiscountCode;
