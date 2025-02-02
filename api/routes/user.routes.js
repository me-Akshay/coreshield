const express=require('express')
const router=express.Router()
const userController=require('../controllers/user.controller')
const authMiddleware=require('../middlewares/auth.middleware')

//register

router.post('/register',userController.registerUser);


//login

router.post('/login',userController.loginUser);

//logout

router.get('/logout',authMiddleware.authUser,userController.logoutUser);

//protected profile

router.get('/profile',authMiddleware.authUser,userController.getUserProfile)

module.exports=router