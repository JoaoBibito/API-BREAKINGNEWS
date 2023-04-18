import mongoose from "mongoose"

const NewsScrema = new mongoose.Schema({
  title:{
    type:String,
    require:true
  },
  text:{
    type:String,
    required:true
  },
  banner:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  likes:{
    type:Array,
    required:true
  },
  comments:{
    type:Array,
    required:true
  }
})

const News=mongoose.model("News",NewsScrema)
export default News