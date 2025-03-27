const Order = require('../models/order');
const Cart = require('../models/cart');
const DiscountCode = require('../models/discount');

//Controller To handle the checkout Process

const checkout = async (req, res) => {
  try {
    const { userId, cartId, discountCode } = req.body;
    const cart = await Cart.findOne({ _id: cartId, userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not Found' });
    }
    let discountAmount = 0;
    //Check if the discount code is provided
    if (discountCode) {
      //find discount code in the database
      const discount = await DiscountCode.findOne({
        discountCode,
        isUsed: false,
      });
      if (!discount) {
        return res
          .status(400)
          .json({ mesage: 'Invalid or used discount code' });
      }
      const orderCount = await Order.countDocuments({ userId });
      if ((orderCount + 1) % discount.orderCountThreshold === 0) {
        //Apply 10% discount to the cart total

        discountAmount =
          0.1 *
          cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
        discountUsed = true;
        await discount.save();
      } else {
        return res
          .status(400)
          .json({ message: 'Discount code not available for this order' });
      }
    }

    //Calculate the total ampount after applying discount (idfany)
    const totalAmount =
      cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ) - discountAmount;

    //Create new order with total calculated amount,items, discount information

    const order = new Order({
      userId,
      items: cart.items,
      totalAmount,
      discountCode: discountCode || null, //Store the discount if applied
      discountAmount,
    });
    await order.save(); //Save the new order to the data base
    res.status(201).json(order); //Send the created order as response
  } catch (error) {
    res.status(500).json({ message: error.message }); //if an error occurs, return a server error
  }
};

module.exports = {
  checkout,
};
