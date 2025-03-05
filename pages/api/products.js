
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import mongooseConnect from "@/lib/mongoose"
export default async function handle(req, res) {
    const { method } = req;
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // Extraire le token "Bearer ..."

    if (authHeader && authHeader.startsWith('Bearer ') && token === process.env.NEXT_PUBLIC_API_KEY_PROTECTION) {
        await mongooseConnect();
        if (method === 'GET') {
            if (req.query?.id) {
                if (req.query?.rating === 'rating') {
                    res.json(await Product.findOne({ _id: req.query.id }).select('IdOfRatingUsers'));
                } else {
                    res.json(await Product.findOne({ _id: req.query.id }));
                }
            }
            if (req.query?.page) {
                if (req.query?.page === 'dashbord') {
                    const product = await Product.find().populate({
                        path: 'category',
                        model: 'Category'
                    })
                    res.json(product);
                }
            }

            if (req.query.role === "statistics") {
                res.json(await Product.countDocuments());
            }

            const { page = 1, limit = 25, category, price, rating } = req.query;
            const query = {};
            if (category && category !== 'All') {
                const categoryDocument = await Category.findOne({ name: category });
                query.category = categoryDocument ? categoryDocument._id : null;
            }

            if (price) {
                query.price = { $lte: price }; // Filter by price less than or equal to specified value
            }
            if (rating) {
                query.rating = { $gte: rating }; // Filter by rating greater than or equal to specified value
            }
            // Fetch products with applied filters and pagination
            console.log('query', query);

            const products = await Product.find(query)
                .populate('category')
                .skip((page - 1) * limit)
                .limit(Number(limit));
            // Calculate total number of products and total pages
            const totalProducts = await Product.countDocuments(query);
            const totalPages = Math.ceil(totalProducts / limit);

            // Send response with products and pagination details
            return res.status(200).json({ products, totalPages });
        }







        if (method === 'POST') {
            const { title, description, price, promotionsOrDiscounts, buyingPrice, discountPrice, images, comments, category, properties, purchasePrice, supplier, stockQuantity, dimensions, countryOfProduction, deliveryTime, SKU, barcode, careInstructions, expirationDate, recyclingInformation, returnAndWarrantyConditions } = req.body;
            const productDoc = await Product.create({
                title, description, price, buyingPrice, discountPrice, images, promotionsOrDiscounts, comments, category: category || null, properties: properties || null, purchasePrice, supplier, stockQuantity, stockQuantity, dimensions, countryOfProduction, deliveryTime, SKU, barcode, careInstructions, expirationDate, recyclingInformation, returnAndWarrantyConditions
            })
            res.json(productDoc);
        }

        if (method === 'PUT') {
            const { title, description, price, promotionsOrDiscounts, buyingPrice, discountPrice, images, comments, category, properties, purchasePrice, supplier, stockQuantity, dimensions, countryOfProduction, deliveryTime, SKU, barcode, careInstructions, expirationDate, recyclingInformation, returnAndWarrantyConditions, _id } = req.body;
            await Product.updateOne({ _id }, { title, description, promotionsOrDiscounts, comments, price, buyingPrice, discountPrice, images, category: category || null, properties: properties || null, purchasePrice, supplier, stockQuantity, stockQuantity, dimensions, countryOfProduction, deliveryTime, SKU, barcode, careInstructions, expirationDate, recyclingInformation, returnAndWarrantyConditions });
            res.json(true);
        }

        if (method === 'DELETE') {
            if (req.query?.id) {
                await Product.deleteOne({ _id: req.query?.id });
                res.json(true);
            }
        }
    }
}