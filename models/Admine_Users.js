import { Schema, model, models } from "mongoose";

const AdminUsersSchema = new Schema({
  email: { type: String, required: true, unique: true },
  getOrderEmail:{type:Boolean,default:true},

},
{
  timestamps: true 
});

export const AdminUsers = models.AdminUsers || model('AdminUsers', AdminUsersSchema);
