import Product from "./src/models/product.model.js"
import { uploadOnCloudinary } from "./src/utils/cloudinary.js"

const products = [
    {
      "name": "Smartphone X",
      "description": "High-performance smartphone with advanced features.",
      "category": ["Electronics"],
      "price": 799,
      "discount": 50,
      "image": "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600",
      "quantity": 100,
      "size": ["5.5 inch", "6.2 inch"],
      "color": "Black",
      "rating": 4.5
    },
    {
      "name": "Laptop Pro",
      "description": "Powerful laptop for professional use.",
      "category": ["Electronics"],
      "price": 1299,
      "image": "https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg?auto=compress&cs=tinysrgb&w=600",
      "quantity": 50,
      "size": ["13 inch", "15 inch"],
      "color": "Silver",
      "rating": 4.7
    },
    {
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones for immersive audio experience.",
      "category": ["Electronics"],
      "price": 199,
      "image": "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=600",
      "quantity": 200,
      "color": "Black",
      "rating": 4.8
    },
    {
      "name": "Gaming Console",
      "description": "Next-generation gaming console for immersive gaming experience.",
      "category": ["Electronics"],
      "price": 399,
      "image": "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=600",
      "quantity": 80,
      "color": "White",
      "rating": 4.9
    },
    {
      "name": "Tablet Mini",
      "description": "Compact and lightweight tablet for on-the-go productivity.",
      "category": ["Electronics"],
      "price": 299,
      "image": "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=600",
      "quantity": 100,
      "size": ["8 inch", "10 inch"],
      "color": "Space Gray",
      "rating": 4.4
    },
    {
      "name": "Smart Home Speaker",
      "description": "Voice-controlled smart speaker for home entertainment.",
      "category": ["Electronics"],
      "price": 129,
      "image": "https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg?auto=compress&cs=tinysrgb&w=600",
      "quantity": 150,
      "color": "Charcoal",
      "rating": 4.5
    },
    {
      "name": "Fitness Tracker",
      "description": "Advanced fitness tracker to monitor health and workouts.",
      "category": ["Electronics"],
      "price": 79,
      "image": "https://images.pexels.com/photos/3927387/pexels-photo-3927387.jpeg?auto=compress&cs=tinysrgb&w=600",
      "quantity": 300,
      "color": "Black",
      "rating": 4.6
    },
    {
      "name": "Portable Power Bank",
      "description": "Compact and portable power bank for charging devices on-the-go.",
      "category": ["Electronics"],
      "price": 49,
      "image": "https://images.pexels.com/photos/11031423/pexels-photo-11031423.png?auto=compress&cs=tinysrgb&w=600",
      "quantity": 200,
      "color": "White",
      "rating": 4.5
    },
    {
      "name": "Classic Sunglasses",
      "description": "Stylish sunglasses for a timeless look.",
      "category": ["Fashion"],
      "price": 79,
      "image": "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=600",
      "quantity": 150,
      "color": "Tortoise",
      "rating": 4.6
    },
    {
      "name": "Leather Handbag",
      "description": "High-quality leather handbag for everyday use.",
      "category": ["Fashion"],
      "price": 299,
      "image": "https://images.pexels.com/photos/8365688/pexels-photo-8365688.jpeg?auto=compress&cs=tinysrgb&w=600",
      "quantity": 100,
      "color": "Brown",
      "rating": 4.7
    },
    {
      "name": "Formal Dress",
      "description": "Elegant formal dress for special occasions.",
      "category": ["Fashion"],
      "price": 399,
      "image": "https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-a-man-in-a-blue-suit-adjusting-his-tie.jpeg?auto=compress&cs=tinysrgb&w=600",
      "quantity": 80,
      "color": "Navy Blue",
      "rating": 4.9
    },
    {
      "name": "Men's Suit",
      "description": "Tailored men's suit for a sophisticated look.",
      "category": ["Fashion"],
      "price": 599,
      "image": "https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=600",
      "quantity": 60,
      "color": "Charcoal",
      "rating": 4.7
    },
    {
      "name": "Casual Sneakers",
      "description": "Comfortable sneakers for everyday wear.",
      "category": ["Fashion"],
      "price": 129,
      "image": "https://images.pexels.com/photos/1537671/pexels-photo-1537671.jpeg?auto=compress&cs=tinysrgb&w=600",
      "quantity": 200,
      "color": "White",
      "rating": 4.5
    },
    {
      "name": "Printed Scarf",
      "description": "Fashionable scarf with vibrant prints.",
      "category": ["Fashion"],
      "price": 29,
      "image": "https://images.pexels.com/photos/14900849/pexels-photo-14900849.jpeg?auto=compress&cs=tinysrgb&w=600",
      "quantity": 250,
      "color": "Multicolor",
      "rating": 4
    }
  ]

  async function seedProducts() {
    console.log("Seeding products...");
    const productPromises = products.map(async (product) => {
        product.price = 1000 + Math.floor(Math.random() * 1000);
        product.discount = product.discount ? product.price * (product.discount / 100) : 0;
        product.quantity = 100 + Math.floor(Math.random() * 100);
        
        try {
            const uploadedImageUrl = await uploadOnCloudinary(product.image);
            product.image = uploadedImageUrl.url;
            const newProduct = new Product(product);
            await newProduct.save();
            console.log(`Created product: ${product.name}`);
        } catch (err) {
            console.error(`Error creating product: ${product.name}`, err);
        }
    });

    await Promise.all(productPromises);
}

export default seedProducts