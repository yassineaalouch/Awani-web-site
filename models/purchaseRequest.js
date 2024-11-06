import { Schema, model, models } from "mongoose"

const purchaseRequestSchema = new Schema({
    userId: { type: Schema.Types.ObjectId },
    firstName: { type: String, require: false },
    lastName: { type: String, require: false },
    email: { type: String, require: false },
    phone: { type: String, require: false },
    address: { type: String, require: false },
    city: { type: String, require: false },
    postalCode: { type: String, require: false },
    country: { type: String, require: false },
    status: { type: String, require: false, default: 'New Order' },
    comesFromOutSide: { type: Boolean, default: false },
    cart: [{
        id: { type: String },
        title: { type: String },
        price: { type: Number },
        productProperties: {
            type: Map,
            of: String // Les valeurs sont des chaînes, mais tu peux changer le type selon tes besoins
        },
        image: { type: String },
        totalPrice: { type: String },
        quantity: { type: String }
    }],
    finalePrice: { type: Number }
},
    {
        timestamps: true
    }
);

export const purchaseRequest = models.purchaseRequest || model('purchaseRequest', purchaseRequestSchema);
