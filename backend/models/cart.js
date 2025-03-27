const mongoose = require('mongoose');


const cartItemsSchema = new mongoose.Schema({
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
   }]

});

const Cart = mongoose.model('Cart', cartItemsSchema)
module.exports = Cart;
