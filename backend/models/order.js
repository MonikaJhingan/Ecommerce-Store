const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   items: [{
      itemId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Item',
         required: true
      },
      quantity: {
         type: Number,
         required: true,
         min: 1
      },
      price: {
         type: Number,
         required: true
      }
   }],
   totalAmount: {
      type: Number,
      required: true

   },
   discountCode: {
      type: String,

   },
   discountAmount: {
      type: Number,
      default: 0,

   },
   orderDate: {
      type: Date,
      deafult: Date.now

   }

});

const Order = mongoose.model('Order', orderSchema)
module.exports = Order;
