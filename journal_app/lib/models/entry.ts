import mongoose, { Schema,Document } from "mongoose";

export interface DbEntry extends Document{
title:string,
descripton:string
publishDate:Date
}

const EntrySchema:Schema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String:required:true},
    publishDate:{type:Date.now(),required:true}
})
const Entry=mongoose.models.Entry|| mongoose.model<DbEntry>('Entry',EntrySchema)

export default Entry