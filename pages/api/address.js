import mongooseConnect from "@/lib/mongoose";
import { Address } from "@/models/address";
export default async function handle(req,res){
    const {method}= req;
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // Extraire le token "Bearer ..."

    if (authHeader && authHeader.startsWith('Bearer ')&&token === process.env.NEXT_PUBLIC_API_KEY_PROTECTION) {
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
}else{
    res.status(401).json({ message: 'khask API_Key am3lm ',message2:'khod api code mn hna free: https://shorturl.at/kOOgx' });}
} 