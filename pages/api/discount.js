import mongooseConnect from "@/lib/mongoose";
import { Discount } from "@/models/discount";

export default async function handle(req,res){
    const {method}= req;
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // Extraire le token "Bearer ..."

    if (authHeader && authHeader.startsWith('Bearer ')&&token === process.env.NEXT_PUBLIC_API_KEY_PROTECTION) {
    await mongooseConnect();

    if(method === 'GET'){
        res.json(await Discount.find());
    }

    if(method === 'POST'){
        const {titre,quantity,price} =req.body;
        const discountDoc = await Discount.create({titre,quantity,price});
        res.json(discountDoc);
    }

    if(method === 'PUT'){
        const {titre,quantity,price,_id} =req.body;
        const discountDoc = await Discount.updateOne({_id},{titre,quantity,price});
        res.json(discountDoc);
    }
    if(method === 'DELETE'){
        const {_id} =req.body;
        const discountDoc = await Discount.deleteOne({_id});
        res.json(discountDoc);
    }
} 
}