import mongooseConnect from "@/lib/mongoose";
import { Address } from "@/models/address";
export default async function handle(req,res){
    const {method}= req;
    await mongooseConnect();

    if(method === 'GET'){
        const {userId} = req.query;
        if(userId){
            res.json(await Address.find({userId}));
        }
    }
 
    if(method === 'POST'){
        const {firstName,userId,lastName,email,phone,address,city,postalCode,country} = req.body;
        const addressDoc = await Address.create({firstName,lastName,userId,email,phone,address,city,postalCode,country});
        res.json(addressDoc);
    }

    if(method === 'PUT'){
        const {firstName,userId,lastName,email,phone,address,city,postalCode,country,_id} = req.body;
        const addressDoc = await Address.updateOne({_id},{firstName,lastName,userId,email,phone,address,city,postalCode,country});
        res.json(addressDoc);
    }
                                    
    if(method === 'DELETE'){
        const {_id} =req.body;
        const addressDoc = await Address.deleteOne({_id});
        res.json(addressDoc);
    }
} 