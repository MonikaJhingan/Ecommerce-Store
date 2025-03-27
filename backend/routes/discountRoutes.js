const express=require('express');


const {generateDiscountCode}=require('../controller/discountController');
const router=express.Router();



//POST route for generate Discount Code
router.post('/generate',generateDiscountCode);



module.exports=router;