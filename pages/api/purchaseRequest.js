import mongooseConnect from "@/lib/mongoose";
import { AdminUsers } from "@/models/Admine_Users";
import { purchaseRequest } from "@/models/purchaseRequest";
import { sendMail } from "@/service/mailService";

export default async function handle(req,res){
    const {method}= req;
    await mongooseConnect();

    if(method === 'GET'){
        const {userId} = req.query;
        if(userId){
            res.json(await purchaseRequest.find({userId}));
        }
        else{
            res.json(await purchaseRequest.find());
        }
    }
 
    if(method === 'POST'){
        const {firstName,userId,lastName,email,phone,address,city,postalCode,country,cart} =req.body;
        const finalePrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);
        const subject =`New Order ${finalePrice}$`
        const message =`New Order ${finalePrice}$ country: ${country} city ${city} address ${address}`
        const adminEmailLis = await AdminUsers.find({},{email:1,getOrderEmail:1,_id:0})        

        const toEmail = adminEmailLis.filter((ele)=>ele.getOrderEmail === true).map((ele)=>(ele.email)).join(', ') || 'pasDeEmail@gmail.com'
        await sendMail(subject,toEmail, message);
        const purchaseRequestDoc = await purchaseRequest.create({firstName,lastName,userId,email,phone,address,city,postalCode,country,cart,finalePrice});
        res.json(purchaseRequestDoc);
    }

    if(method === 'PUT'){
        const {status,_id} =req.body;
        console.log('status',status)
        const purchaseRequestDoc = await purchaseRequest.updateOne({_id},{status});
        res.json(purchaseRequestDoc);
    }
                                    
    if(method === 'DELETE'){
        const {_id} =req.body;
        const purchaseRequestDoc = await purchaseRequest.deleteOne({_id});
        res.json(purchaseRequestDoc);
    }
} 