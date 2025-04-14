// import { models } from './../../node_modules/mongoose/types/index.d';
import mongoose from "mongoose";
// import { boolean, string } from "zod";
// const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
    {
       id:{type:String ,required :true}, 
       name:{type:String ,required :true},
       image:String ,
       bio:String,
       threads:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Threads',
       }] ,
       onboarded:{ type:Boolean ,default:false},
       communities:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"community"
        }
       ]
    }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;