import mongooseConnect from "@/lib/mongoose";
import { TipTap } from "@/models/tiptap";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        const admins = await TipTap.find();
        res.json(admins);
    }

    if (method === 'POST') {
        const { description } = req.body;
        try {
            const admin = await TipTap.create({ description });
            res.json(admin);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    if (method === 'PUT') {
        const { description, descriptionID } = req.body;
        try {
            const admin = await TipTap.findOneAndUpdate({ descriptionID }, { description }, { new: true });
            res.json(admin);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    if (method === 'DELETE') {
        const { email } = req.body;
        try {
            const admin = await TipTap.findOneAndDelete({ email });
            res.json(admin);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
