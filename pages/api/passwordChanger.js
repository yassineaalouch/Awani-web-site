import { Users } from "@/models/Users";
import mongooseConnect from "@/lib/mongoose";
import bcrypt from 'bcryptjs';

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    
    if(method === 'PUT'){
        const {password,_id} =req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userDoc = await Users.updateOne({_id},{$set:{password: hashedPassword }});
        res.status(201).json(userDoc);
    }
} 