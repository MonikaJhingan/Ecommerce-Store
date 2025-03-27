const Cart = require('../models/cart');

//Adding Item to cart

const addItemToCart = async (req, res) => {
  try {
    const { userId, itemId, quantity, price } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      const newCart = new Cart({
        userId,
        items: [{ itemId, quantity, price }],
      });
      await newCart.save();
      return res.status(201).json(newCart);
    }
    //if acrt exists add the item to it
    cart.items.push({ itemId, quantity, price });
    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addItemToCart,
};
