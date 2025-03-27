const DiscountCode = require('../models/discount');
const Order = require('../models/order');

//Contoller to generate a disacount code for every nth order
const generateDiscountCode = async (req, res) => {
  try {
    //Count the total no of orders placed
    const totalOrders = await Order.countDocuments(); //Get total no of discount orders

    //Define the nth order condition
    const nthOrder = 5;

    //Check if the total orders are divisible by nth order
    if (totalOrders % nthOrder === 0) {
      const discountCode = `DISCOUNT${totalOrders}`;

      //Create a new discount Record in the database
      const newDiscountCode = new DiscountCode({
        discountCode,
        orderCountThreshold: nthOrder,
      });
      await newDiscountCode.save();
      return res.status(201).json({ message: `Discount code ${discountCode} generated.` });
    }   
       return res.status(200).json({ message: `No discount generated yet` });
   
  } catch (error) {
    return res.status(500).json({ message: `error.message` });
  }
};

//Controller to validate Discount Code during checkout

const validateDiscountCode = async (req, res) => {
  try {
    const { discountCode, userId } = req.body;

    //Find the Discount Code in database
    const validDiscountCode = await DiscountCode.findOne({
      discountCode,
      isUsed: false,
    });
    if (!validDiscountCode) {
      return res.status(400).json({ message: 'Invalid/ Already Used discount Code' });
    }
    //Apply discount code if it exists
    const discountAmoount = 0.1;
    return res.status(200).json({ message: 'Discount Code applied successfully', discountAmoount });
  } catch (error) {
    return res.status(500).json({ message: 'Error Message' });
  }
};

module.exports = {
  generateDiscountCode,
  validateDiscountCode,
};
