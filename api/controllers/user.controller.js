const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');
const userService = require('../services/user.service');


//register

module.exports.registerUser=async(req,res,next)=>{

    console.log("inside register ")
    console.log("hit")
    const { fullname, email, password, roles } = req.body
        
    // Check existing user
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await userModel.hashPassword(password)

    // Create user with roles
    const newUser = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        roles
    })

    const token = newUser.generateAuthToken()
    res.status(201).json({ token, newUser });


}
//login

module.exports.loginUser=async(req,res,next)=>{

    const { email, password } = req.body;

    //find user in db
    const user = await userModel.findOne({ email }).select('+password'); 

    if(!user){
      return res.status(401).json({message:"Invalid email or password"});
    }


    //compare password

    const isMatch= await user.comparePassword(password);

    if(!isMatch){
      return res.status(401).json({message:"Invalid email or password"});
    }

    const token = user.generateAuthToken();

    //store the token in cookie
    res.cookie('token',token)

    res.status(200).json({ token, user }); //jo variable name pass kiya ho wahi as a key serve krne lgta hai

}


//logout

module.exports.logoutUser=async(req,res,next)=>{
    const token = req.cookies.token || req.headers.Authorization?.split(' ')[1];
    //add the token into blacklist
    const blacklistedToken = await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}

//protected profile route

module.exports.getUserProfile=async(req,res,next)=>{
     //As we will reach here after we are authenticated our user detail will be inside request only
    res.status(200).json(req.user);
}
