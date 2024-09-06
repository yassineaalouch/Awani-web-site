import { sendMail } from "@/service/mailService";
import { UsersEmails } from "@/models/usersemail";
import mongooseConnect from "@/lib/mongoose";
import {BlackList } from "@/models/BlackList";

const handler = async (req, res) => {
  try {
    const { method } = req;
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // Extraire le token "Bearer ..."

    if (authHeader && authHeader.startsWith('Bearer ')&&token === process.env.NEXT_PUBLIC_API_KEY_PROTECTION) {
    await mongooseConnect();
    const toEmail =process.env.NODEMAILER_EMAIL

    if (method === "POST") {
      const {email,company_Name,telephone,subject,message} = req.body;
      const blackListEmails = await BlackList.find({}, { email: 1, _id: 0 });
      const Black_List = blackListEmails.map((ele)=>(ele.email))
          if(!Black_List.includes(email)){
            await UsersEmails.create({email:email,company_name:company_Name,phone_number:telephone,subject:subject,destination:toEmail,message:message});
            await sendMail(subject,toEmail, message);
          }
          res.status(200).end();

    } else if (method === "GET") {
      const emails = await UsersEmails.find();
      res.status(200).json(emails);


    } else if (method === "DELETE") { 
        const {id} = req.body;
        if(id){
          const emailDoc = await UsersEmails.deleteOne({_id:id});
          res.json(emailDoc);
        }


    } else if (method === "PUT") { 
      const {id} = req.body;
      if(id){
        const emailDoc = await UsersEmails.updateOne({_id:id},{ $set: { isChecked:true} } );
        res.json(emailDoc);
      }
  }else {
      res.setHeader("Allow", ["POST", "GET","DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }}
  } catch (err) {
    res.status(400).json({
      error_code: "api_one",
      message: err.message,
    });
  }
};

export default handler;
