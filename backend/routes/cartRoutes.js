const express=require('express');


const {addItemToCart}=require('../controller/cartcontroller')
const router=express.Router();



//POST route to add an item to cart
router.post('/add item',addItemToCart);

module.exports=router;