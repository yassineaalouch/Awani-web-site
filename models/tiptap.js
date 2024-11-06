import { Schema, model, models } from "mongoose";

const TipTapSchema = new Schema({

    description: { type: String }

},
    {
        timestamps: true
    });

export const TipTap = models.TipTap || model('TipTap', TipTapSchema);
