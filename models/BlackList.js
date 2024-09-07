import { Schema, model, models } from "mongoose";

const BlackListSchema = new Schema({
  email: { type: String, required: true, unique: true },
},
{
  timestamps: true 
});

export const BlackList = models.BlackList || model('BlackList', BlackListSchema);
