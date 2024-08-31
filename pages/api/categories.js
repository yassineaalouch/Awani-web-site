import mongooseConnect from "@/lib/mongoose";
import {Category} from "@/models/Category";

export default async function handle(req,res){
    const {method}= req;
    await mongooseConnect();


    
    
    if(method === 'GET'){
        res.json(await Category.find().populate('children').populate('parent'));
    }
    
    if(method === 'POST'){
        const {name,parentCategory} =req.body;
        if(parentCategory){
            let parentC = await Category.findById({_id:parentCategory})
            const categoryDoc = await Category.create({name , grad:parentC.grad+1||0,parent:parentCategory||null});
            await Category.updateOne({_id:parentCategory},{ $push: { children: categoryDoc._id } })
            res.json(categoryDoc);
            
        }else{
            const categoryDoc = await Category.create({name , grad:0,parent:parentCategory||null});
            res.json(categoryDoc);
        }
    }


    async function updateFunctionPut(category,gradNew){
        if(category.children.length>0){
            for(let childId of category.children){
                const category = await Category.findById({_id:childId})
                await Category.updateOne({_id:childId},{$set:{grad:gradNew}})
                let gradNewNew = gradNew+1
                updateFunctionPut(category,gradNewNew)
            }
        }else{
            return;
        }
    }


    if(method === 'PUT'){
        const {name,parentCategory,_id} =req.body;
        const child = await Category.findById({_id})
        if(child.parent&&parentCategory){
            if(child.parent!=parentCategory){
                await Category.updateOne({_id:child.parent},{ $pull: { children: child._id } })
                await Category.updateOne({_id:parentCategory},{ $push: { children:_id }})
                const parentC = await Category.findById({_id:parentCategory})
                const categoryDoc = await Category.updateOne({_id},{name , grad:parentC.grad+1,parent:parentCategory});
                const category = await Category.findById({_id})
                updateFunctionPut(category,parentC.grad+2)
                res.json(categoryDoc);
            }else{
                const categoryDoc = await Category.updateOne({_id},{$set:{name}});
                res.json(categoryDoc);
            }
        }else if(child.parent&&!parentCategory){
            await Category.updateOne({_id:child.parent},{ $pull: { children: child._id } })
            const categoryDoc = await Category.updateOne({_id},{name,grad:0,parent:null});
            const category = await Category.findById({_id})
            updateFunctionPut(category,1)
            res.json(categoryDoc);
        }else if(!child.parent&&parentCategory){
            await Category.updateOne({_id:parentCategory},{ $push: { children:_id }})
            const parentC = await Category.findById({_id:parentCategory})
            const categoryDoc = await Category.updateOne({_id},{name , grad:parentC.grad+1,parent:parentCategory});
            const category = await Category.findById({_id})
            updateFunctionPut(category,parentC.grad+2)
            res.json(categoryDoc);
        }else if(!child.parent&&!parentCategory){
            const categoryDoc = await Category.updateOne({_id},{$set:{name}});
            res.json(categoryDoc);
        }
    }
    
    if(method === 'DELETE'){
        const {_id} =req.body;
        const child = await Category.findById({_id})
        if(child.parent){
            await Category.updateOne({_id:child.parent},{ $pull: { children: child._id } })
            if(child.children.length > 0){
                for(let childId of child.children){
                    await Category.updateOne({_id:child.parent},{$push:{children:childId}})
                    await Category.updateOne({_id:childId},{$set:{parent:child.parent}})
                }
            }
        }else {
            if(child.children.length > 0){
                for(let childId of child.children){
                    await Category.updateOne({_id:childId},{$set:{parent:null}})
                }
            }
        }
        updateFunction(child)
        const categoryDoc = await Category.deleteOne({_id});
        res.json(categoryDoc);
    }
} 

async function updateFunction(child) {
    if(child.children.length>0){
        for(let childId of child.children){
            const category = await Category.findById({_id:childId})
            await Category.updateOne({_id:childId},{$set:{grad:category.grad-1}})
            updateFunction(category)
        }
    }else{
        return;
    }
}








// import mongooseConnect from "@/lib/mongoose";
// import { Category } from "@/models/Category";

// export default async function handle(req, res) {
    //     const { method } = req;
    //     await mongooseConnect();
    
    //     // Fonction récursive pour mettre à jour les enfants d'une catégorie supprimée
//     async function updateChildren(category, newParentId, newGrad) {
//         if (!category.children || category.children.length === 0) {
//             return;
//         }

//         for (let childId of category.children) {
//             // Mise à jour du parent et du grad de chaque enfant
//             await Category.updateOne(
//                 { _id: childId },
//                 { $set: { parent: newParentId, grad: newGrad } }
//             );
//             // Récupérer la sous-catégorie mise à jour
//             const childCategory = await Category.findById(childId);
//             // Appel récursif pour traiter les enfants de l'enfant actuel
//             await updateChildren(childCategory, newParentId, newGrad + 1);
//         }
//     }

//     if (method === 'GET') {
//         res.json(await Category.find().populate('children').populate('parent'));
//     }

//     if (method === 'POST') {
//         const { name, parentCategory } = req.body;
//         if (parentCategory) {
//             const parentC = await Category.findById(parentCategory);
//             const categoryDoc = await Category.create({ name, grad: (parentC.grad + 1) || 0, parent: parentCategory });
//             await Category.updateOne({ _id: parentCategory }, { $push: { children: categoryDoc._id } });
//             res.json(categoryDoc);
//         } else {
//             const categoryDoc = await Category.create({ name, grad: 0, parent: null });
//             res.json(categoryDoc);
//         }
//     }

//     if (method === 'PUT') {
//         const { name, parentCategory, _id } = req.body;
//         const child = await Category.findById(_id);

//         if (child.parent && parentCategory) {
//             if (child.parent.toString() !== parentCategory) {
//                 // Supprimer l'enfant de l'ancien parent
//                 await Category.updateOne({ _id: child.parent }, { $pull: { children: child._id } });
//                 // Ajouter l'enfant au nouveau parent
//                 await Category.updateOne({ _id: parentCategory }, { $push: { children: _id } });
//                 const parentC = await Category.findById(parentCategory);
//                 const categoryDoc = await Category.updateOne({ _id }, { name, grad: parentC.grad + 1, parent: parentCategory });
//                 res.json(categoryDoc);
//             } else {
//                 const categoryDoc = await Category.updateOne({ _id }, { $set: { name } });
//                 res.json(categoryDoc);
//             }
//         } else if (child.parent && !parentCategory) {
//             await Category.updateOne({ _id: child.parent }, { $pull: { children: child._id } });
//             const categoryDoc = await Category.updateOne({ _id }, { name, grad: 0, parent: null });
//             res.json(categoryDoc);
//         } else if (!child.parent && parentCategory) {
//             await Category.updateOne({ _id: parentCategory }, { $push: { children: _id } });
//             const parentC = await Category.findById(parentCategory);
//             const categoryDoc = await Category.updateOne({ _id }, { name, grad: parentC.grad + 1, parent: parentCategory });
//             res.json(categoryDoc);
//         } else if (!child.parent && !parentCategory) {
//             const categoryDoc = await Category.updateOne({ _id }, { $set: { name } });
//             res.json(categoryDoc);
//         }
//     }

//     if (method === 'DELETE') {
//         const { _id } = req.body;
//         const categoryToDelete = await Category.findById(_id);
        
//         if (categoryToDelete.parent != null) {
//             await Category.updateOne({ _id: categoryToDelete.parent }, { $pull: { children: _id } });
//             for(let child of categoryToDelete.children){
//                 await Category.updateOne({ _id: categoryToDelete.parent }, { $push: { children:child } });
//             }

//         }
//         await updateChildren(categoryToDelete, categoryToDelete.parent, categoryToDelete.grad);
//         const categoryDoc = await Category.deleteOne({ _id });
//         res.json(categoryDoc);
//     }
// }
