const UserModule = require("../Models/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModule.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "exist alredy using mail,plz login", success: false });
    }
    const userModel = new UserModule({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "Signup Success", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal error", success: false });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModule.findOne({ email });
    if (!user) {
      return res
        .status(409)
        .json({ message: "Auth faild email", success: false });
    }
    const isPassEul= await bcrypt.compare(password,user.password)
    if (!isPassEul) {
        return res
          .status(409)
          .json({ message: "Auth faild password", success: false });
      }
      const JWTtoken=JWT.sign(
        {email:user.email,_id:user._id},
        process.env.JWT_SCRET,
        {expiresIn: '24h'}
      )
      res.status(200)
      .json({
        message:"Login Sucess",
        success:true,
        JWTtoken,
        email,
        user:user.name
      })
    
  } catch (error) {
    res.status(500).json({ message: "Internal error", success: false });
  }
};

module.exports = {
  signup,
  login,
};
