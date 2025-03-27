const express=require('express');


const {checkout}=require('../controller/orderController');
const router=express.Router();



//POST route for checkout
router.post('/checkout',checkout);



module.exports=router;