import {Schema,model, models} from "mongoose"

const addressSchema = new Schema({
    userId:{type:Schema.Types.ObjectId},
    firstName: {type: String, require:false},
    lastName: {type: String, require:false},
    email: {type: String, require:false},
    phone:  {type: String, require:false},
    address: {type: String, require:false},
    city: {type: String, require:false},
    postalCode: {type: String, require:false},
    country: {type: String, require:false},
},
{
    timestamps: true 
}
);

export const Address = models.Address || model('Address',addressSchema);
 