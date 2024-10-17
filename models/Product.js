import {Schema,model, models} from "mongoose"

const ProductSchema = new Schema({

title: { type: String, required: true },
images: [{ type: String }],
description: { type: String},
price: { type: Number, required: true },
discountPrice: { type: Number},
category: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
comments:{type:Boolean,default:true},
purchasePrice: { type: Number},
stockQuantity: { type: Number},
dimensions: {
    length: { type: Number},
    width: { type: Number}, 
    height: { type: Number}
  },
deliveryTime: { type: String},
countryOfProduction: { type: String},
SKU: { type: String}, 
barcode: { type: String},
rating: { type: Number},
careInstructions: { type: String},
expirationDate: { type: Date},
recyclingInformation: { type: String},
returnAndWarrantyConditions: { type: String},
ratingDistribution :{
  cinque: {type:Number},
  quatre: {type:Number},
  trois: {type:Number},
  deux: {type:Number},
  un: {type:Number}, 
},

// exist but need more modifecation
supplier: { type: String},

properties:[ 
  {
    property:{type:String},
    valuesWanted:[{value:{type:String},label:{type:String}}], 
    valuesInterval:[{value:{type:String},label:{type:String}}] 
  }
],

promotionsOrDiscounts: [{
  titre:String,
  percentage:Number,
  quantity:String,
}],
// doesn't exist
customerRating:[{ type: Number }],
materials: [{ type: String }],
allergens: [{ type: String}],
certificatesAndLabels: [{ type: String}],

// used for some things else

IdOfRatingUsers: [{type:Schema.Types.ObjectId,ref:'Users'}],
complementaryProducts: [{type: Schema.Types.ObjectId, ref: 'Product'}],
productFAQ: [{type:Schema.Types.ObjectId,ref:'ProductFAQ'}],
},
{
  timestamps: true 
}
);
 
export const Product = models.Product || model('Product',ProductSchema);