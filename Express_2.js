import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  foodname: {
    type: String,
    required: true,
    unique:true
  },
  foodprice: {
    type: Number,
    required: true
  },
  image: String
});

export const Food = mongoose.model("Admin", foodSchema);


