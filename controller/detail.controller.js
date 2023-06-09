require("dotenv").config();
const response = require("../helpers/response.helper");
const db = require("../models");
const Detail = db.detail;
const User = db.user;

//add detail if email already exist in user

exports.addDetail = async (req, res) => {
  const {
    name,
    user_id,
    phone,
    // email,
    website,
    address,
    latitude,
    longitude,
    state,
    city,
    type,
    opening_time,
    closing_time,
    total_beds,
    available_beds,
    specifications,
    functionalities
  } = req.body;

  const existingDetail = await Detail.findOne({
    where: {
      user_id: user_id
    }
  });

  if (existingDetail) {
    return response.responseHelper(
      res,
      false,
      "already added details",
      "This detail has already been added"
    );
  }

  // Check required fields
  if (
    !name ||
    !phone ||
    !latitude ||
    !longitude ||
    !state ||
    !city ||
    !opening_time ||
    !closing_time ||
    !type
  ) {
    return response.responseHelper(
      res,
      false,
      "Failed to add",
      "Please fill in all the required fields"
    );
  }

  // Check phone number length
  if (phone.length !== 10) {
    return response.responseHelper(
      res,
      false,
      "Failed to add",
      "Phone number must be 10 characters long."
    );
  }

  // Check longitude range
  if (longitude < -180 || longitude > 180) {
    return response.responseHelper(
      res,
      false,
      "Invalid longitude",
      "Longitude must be between -180 and 180 degrees."
    );
  }

  // Check latitude range
  if (latitude < -90 || latitude > 90) {
    return response.responseHelper(
      res,
      false,
      "Invalid latitude",
      "Latitude must be between -90 and 90 degrees."
    );
  }

  if (opening_time >= closing_time) {
    return response.responseHelper(
      res,
      false,
      "Invalid time",
      "Opening time must be less than closing time."
    );
  }

  try {
    const existingUser = await User.findOne({
      where: {
        id: user_id,
      }
    });

    if (!existingUser) {
      return response.responseHelper(
        res,
        false,
        "User does not exist",
        "The provided user ID does not exist"
      );
    }

    const detail = await Detail.create({
      name,
      user_id,
      phone,
      website,
      latitude,
      longitude,
      address,
      state,
      city,
      type,
      opening_time,
      closing_time,
      total_beds,
      available_beds,
      specifications,
      functionalities
    });

    return response.responseHelper(
      res,
      true,
      { detail },
      "Details added successfully"
    );
  } catch (error) {
    console.log(error);
    return response.responseHelper(
      res,
      false,
      "Error",
      "Something went wrong"
    );
  }
};



exports.fetchSingleDetail = async (req, res) => {
  // Implementation for fetching a single detail
  const userId = req.params.id

  try{
    const detail = await Detail.findOne({
      where: {
        user_id: userId,
      }
    })

    if(detail){
      return response.responseHelper(
        res,
        true,
        detail,
        "Fetched sucessfully"
      )
    }
  }catch(error){
    console.log(error)
    return response.responseHelper(res, false, "Error", "Something wend wrong")
  }
};

exports.fetchDetails = async (req, res) => {
  //const user_id = req.body.user_id

  // let page_no = req.body.page_no - 1;
  // console.log(page_no);

  // let max = 10;
  // let start = page_no * max;

  try {
    const detail = await Detail.findAndCountAll({
      // where:{
      //   user_id: user_id,
      // },
      // limit: max,
      // offset: start,
    });

    if (detail) {
      // const totalPages = Math.ceil(detail.count / max);
      return response.responseHelper(
        res,
        true,
        {
          // current_page: Number(page_no) + 1,
          // max: max,
          // total_pages: totalPages,
          // count: detail.count,
         count: 1,
          //  data: detail.rows,
  
        },
        "Fetch details successful"
      );
    }
  } catch (error) {
    console.log(error);
    return response.responseHelper(
      res,
      false,
      "Error",
      "Something really  went wrong"
    );
  }
};


exports.updateDetail = async (req, res) => {
  const user_id = req.body.user_id;
  const opening_time = req.body.opening_time;
  const closing_time = req.body.closing_time;
  const total_beds = req.body.total_beds;
  const available_beds = req.body.available_beds;

  try {
    const detail = await Detail.findOne({
      where: {
        user_id: user_id
      }
    });

    if (!detail) {
      return response.responseHelper(res, false, "Error", "This Detail does not exist.");
    }

    // Perform the update operation
    await Detail.update(
      {
        opening_time: opening_time,
        closing_time: closing_time,
        total_beds: total_beds,
        available_beds: available_beds
      },
      {
        where: {
          user_id: user_id
        }
      }
    );

    // Fetch the updated detail
    const updatedDetail = await Detail.findOne({
      where: {
        user_id: user_id
      }
    });

    return response.responseHelper(res, true, updatedDetail, "Updated successfully");
  } catch (error) {
    console.log(error);
    return response.responseHelper(res, false, "Error", "Something went wrong");
  }
};
