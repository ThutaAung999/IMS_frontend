import { z } from 'zod';

// Define the Zod schema for product validation
/*
const productSchema = z.object({
    name: z.string().nonempty("Name is required"),
    brand: z.string().nonempty("Brand is required"),
    category: z.string().nonempty("Category is required"),
    price: z.number().min(1, "Price must be at least 1").nonnegative("Price must be a positive number"),
    description: z.string().nonempty("Description is required"),
    image: z.instanceof(File).refine(file => file.size > 0, "Image is required"),
});
*/


const productSchema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    brand: z.string().nonempty({ message: "Brand is required" }),
    category: z.string().nonempty({ message: "Category is required" }),
    price: z.number().min(1, "Price must be at least 1").nonnegative("Price must be a positive number"),
    description: z.string().nonempty({ message: "Description is required" }),
    image: z.instanceof(File).refine(file => file.size > 0, "Image is required"),
});

export default productSchema;

