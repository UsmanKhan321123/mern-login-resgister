import express, { application } from "express"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

let userRouter = express.Router()


userRouter.post("/register", async (req, res) => {

  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) return res.status(400).json({
      message: "Please fill all the fields properly"
    })

    const user = await User.findOne({ email })
    if (user) return res.status(400).json({
      message: "user with this email already exist"
    })

    let newUser = await User.create({ username, email, password })
    res.status(200).json({
      message: "User created Successfully",
      username: newUser.username,
      userID: newUser._id,
      email: newUser.email
    })

  } catch (error) {
    res.status(500).json({
      message: "Server is not responding"
    })
  }
})

// login

userRouter.post("/login", async (req, res, next) => {
  
  let { email, password } = req.body
  if (!email || !password) return res.status(400).json({
    message: 'Please fill the details carefully'
  })
  
  let user = await User.findOne({ email })
  if (!user || await !(user.matchPassword(password))) return res.json({ message: "please enter the valid credentials" })
    let token = generateToken(user._id)
    res.cookie("token",token,{
      // httpOnly :true,
      // sameSite : "Strict",
      
    })
  res.json({
    message: "User login Successfully",
    username: user.username,
    userID: user._id,
    email: user.email,
    token
  })

})

userRouter.get("/me",protect,async (req,res,next)=>{
res.status(200).json(req.user)
})


let generateToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn : "30m"})
}

export default userRouter