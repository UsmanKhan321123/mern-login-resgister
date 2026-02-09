// import jwt from "jsonwebtoken"
// import User from "../models/userModel.js"
// let protect =async (req,res,next)=>{
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
//     try {
//     token = req.headers.authorization.split(" ")[1];
//     let decoded = jwt.verify(token,process.env.JWT_SECRET)
//     req.user = await User.findById(decoded.id).select("-passowrd")
//     return next()
//   }
//   catch (error) {
//   console.log(error);
//   res.status(401).json({message : "Token is not authorized"})
//  }
//  } 
//  res.status(401).json{message: "Token not verified"}
// }

import jwt from  "jsonwebtoken"
import User from "../models/userModel.js"
let protect = async (req,res,next)=>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
    try {
      token = req.headers.authorization.split(" ")[1]  // (for postman based)
      // token = req.cookies.token     (for cookie based )
      let decoded = jwt.verify(token,process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password")
      return next()
    } catch (error) {
      console.log(error);
      return res.status(401).json({message : "Token not verified"})
    }
  }
  return res.status(401).json({message : "Token is not available in the req"})
}
export default protect;