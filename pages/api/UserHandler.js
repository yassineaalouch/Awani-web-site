import { Users } from "@/models/Users";
import mongooseConnect from "@/lib/mongoose";
import bcrypt from 'bcryptjs';
import { sendMail } from "@/service/mailService";


export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Extraire le token "Bearer ..."

  if (authHeader && authHeader.startsWith('Bearer ')&&token === process.env.NEXT_PUBLIC_API_KEY_PROTECTION) {

  async function UpdateTimerRating(timerRating, _id) {
    const OldTimerRatingFull = await Users.findOne({ _id }).select('timerRating');
    const OldTimerRating = OldTimerRatingFull.timerRating || [];
    
    const timerRatingMap = new Map();
    timerRating.forEach(entry => {
      timerRatingMap.set(entry.productId.toString(), entry);
    });
    OldTimerRating.forEach(entry => {
      if (entry.productId) {
        if (!timerRatingMap.has(entry.productId.toString())) {
          timerRatingMap.set(entry.productId.toString(), entry);
        }
      } else {
        console.error('Product ID is missing for entry:', entry);
      }

    });
    const NewTimerRating = Array.from(timerRatingMap.values());
    return NewTimerRating;
  }
  

  if (method === 'GET') {
    const {_id,email,productId} = req.query;
    if (_id) {
      const user = await Users.findOne({ _id }).select('timerRating');

      res.json(user);
    }else if (email) {
      const user = await Users.findOne({ email });
      res.json(user);
    } else {
      res.json(await Users.find());
    }
  }

  if (method === 'POST') {
    const { name, email, password } = req.body;
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userDoc = await Users.create({ name , email, password: hashedPassword });
      res.status(201).json(userDoc);
    } else {
      res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }
  }


  if (method === 'PUT') {
    const { productsIds, _id } = req.body;
    const message = 'Your order request has been validated. Please check your account to complete the checkout process.';
    const subject = 'Order Request Validated: Complete Your Checkout';
    const timerRating = productsIds.map(ele => ({
                                                  productId: ele,
                                                  purchaseDate: new Date()
                                                }));
  
    const updatedTimerRating = await UpdateTimerRating(timerRating, _id);
  
    const updatedUser =await Users.updateOne({ _id }, { $set: { timerRating: updatedTimerRating } });
    const Email = await Users.findById(_id);
    const toEmail = Email.email;
    await sendMail(subject, toEmail, message);
    
    res.json(updatedUser);
  }
  

  if (method === 'DELETE') {
    const { _id } = req.body;
    const deletedUser = await Users.deleteOne({ _id });
    res.json(deletedUser);
}
  }
}



