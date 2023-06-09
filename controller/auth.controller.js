require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const config = require("../config/auth.config")
const { v4: uuidv4 } = require("uuid")
const CONFIG = require("../config/config")
const response = require("../helpers/response.helper")

const db = require("../models")
const User = db.user
const Detail = db.detail

generateLoginData = (user) => {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.secret,
      {
        expiresIn: 2592000, // 30 days
      }
    )
  
    var data = {
      accessToken: token,
    }
    return data
}
  
exports.loginUser = async (req, res) => {
  let email = req.body.email
  const password = req.body.password
  let type = req.body.type
  

  if(
    email == null || email==="" ||
    type == null || type=='0' ||
    password == null || password ===""
  ){
    return response.responseHelper(
      res,
      false,
      "All fields required",
      "Login failed"
    )
  }

  try{
    var user = await User.findOne({
      where:{
        email: email,
        type: type,
      }
    })
    if(!user){
      return response.responseHelper(
        res,
        false,
        "Invalid email or user type",
        "Login failed"
      )
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password)

    if(!passwordIsValid){
      return response.responseHelper(
        res, 
        false,
        "Wrong Password",
        "Login failed"
      )
    }

    return response.responseHelper(
      res,
      true,
      {
        user: user,
        token: generateLoginData(user)
      },
      "Login sucessful"
    )
    }catch(err){
      console.log(err.message);
      return response.responseHelper(
        res,
        false,
        "Something went wrong",
        "Login failed"
      )
  }
}

exports.registerUser = async (req, res) => {
    const email = req.body.email
    const type = req.body.type
    const password = req.body.password
  
    if (
      email == null ||
      email === "" ||
      type == null ||
      type == 0 ||
      password == null ||
      password === ""
    ) {
      return response.responseHelper(
        res,
        false,
        "All fields are required",
        "Failed to Add User"
      )
    }
  
    if (password.length < 8) {
      return response.responseHelper(
        res,
        false,
        "Password Length should be larger than of equal to 8",
        "Failed to Add User"
      )
    }
  
    try {
      let result = await User.findOne({
        where: {
          email: email,
        },
      })
      if (result) {
        return response.responseHelper(
          res,
          false,
          "This email is already in use, register with a new email",
          "Failed to Add User"
        )
      } else {
        let user = await User.create({
          email,
          type,
          password: bcrypt.hashSync(password, 10),
        })
        if (user) {
          return response.responseHelper(
            res,
            true,
            {
              user: user,
              token: generateLoginData(user),
            },
            "Add user successful"
          )
        }
      }
    } catch (error) {
      console.log(error)
      return response.responseHelper(res, false, "Error", "Something went wrong")
    }
  }

exports.getUsers = async (req, res) => {
  try{
    var users = await User.findAll()

    return response.responseHelper(
      res,
      true,
      {
        users: users,
      },
      "Users found"
    )
  }catch(err){
    console.log(err.message)
    return response.responseHelper(
      res,
      false,
      "Something went wrong",
      "Login failed"
    )
  }
}

exports.DeleteUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return response.responseHelper(
        res,
        false,
        "Error",
        "This User does not exist"
      );
    }

    // Start a transaction to ensure data consistency
    //const transaction = await sequelize.transaction();

    try {
      // Delete the associated details
      await Detail.destroy({
        where: {
          user_id: userId,
        },
        // transaction,
      });

      // Delete the user
      await User.destroy({
        where: {
          id: userId,
        },
        // transaction,
      });

      // Commit the transaction
      // await transaction.commit();

      return response.responseHelper(res, true, user, "Deleted user successfully");
    } catch (error) {
      // Rollback the transaction if an error occurs
      // await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.log(error);
    return response.responseHelper(res, false, "Error", "Something went wrong");
  }
};


