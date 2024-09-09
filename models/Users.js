import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  emailVerified: { type: Boolean, default: true },
  timerRating:[
    {
      productId:{type:Schema.Types.ObjectId,ref:'Products'},
      purchaseDate:{type:Date}
    }
  ] ,
  role:{type:String,default:"user"},
  googleId: { type: String, unique: true, sparse: true },
  facebookId: { type: String, unique: true, sparse: true },
  resetTokenExpiry :{type:Date,required:false},
  resetToken  :{type:String,required:false}
}, {
  timestamps: true 
});

export const Users = models.Users || model('Users', UserSchema);

  