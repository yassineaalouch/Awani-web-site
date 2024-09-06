import mongooseConnect from "@/lib/mongoose";
import { Properties } from "@/models/properties";

export default async function handle(req,res){
    const {method}= req;
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // Extraire le token "Bearer ..."

    if (authHeader && authHeader.startsWith('Bearer ')&&token === process.env.NEXT_PUBLIC_API_KEY_PROTECTION) {
    await mongooseConnect();

    if(method === 'GET'){
        res.json(await Properties.find());
    }

    if(method === 'POST'){
        const {name,values} =req.body;
        const propertyDoc = await Properties.create({name,values});
        res.json(propertyDoc);
    }

    if(method === 'PUT'){
        const {name,values,_id} =req.body;
        const propertyDoc = await Properties.updateOne({_id},{name,values});
        res.json(propertyDoc);
    }
    if(method === 'DELETE'){
        const {_id} =req.body;
        const propertyDoc = await Properties.deleteOne({_id});
        res.json(propertyDoc);
    }}
} 