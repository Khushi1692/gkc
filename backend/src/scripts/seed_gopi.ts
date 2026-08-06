import mongoose from "mongoose";
import { config } from "../config/config";
import { Category } from "../models/category.models";
import { Product } from "../models/product.models";
import { Branch } from "../models/branch.models";

async function seed() {
  try {
    console.log("Connecting to:", config.mongodb.uri);
    await mongoose.connect(config.mongodb.uri);

    // Clear existing data for a clean seed
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Branch.deleteMany({});

    console.log("Creating Categories...");
    const categories: any = {
      plates: await Category.create({ name: "PLATES TO SHARE", description: "Perfect for sharing with friends and family", isActive: true }),
      snacks: await Category.create({ name: "STREET FOOD SNACKS", description: "Classic street food from Gujarat", isActive: true }),
      pavBhaji: await Category.create({ name: "GKC SPECIAL PAV BHAJI", description: "Our signature sizzling Pav Bhaji", isActive: true }),
      pulav: await Category.create({ name: "GKC TAVA PULAV", description: "Spiced and aromatic Tava Pulav", isActive: true }),
      indoChinese: await Category.create({ name: "INDO CHINESE SPECIAL", description: "Fusion flavors from East and West", isActive: true }),
      kids: await Category.create({ name: "KIDS SPECIAL", description: "Mild and fun flavors for our younger guests", isActive: true }),
      extras: await Category.create({ name: "EXTRA", description: "Add a little extra to your meal", isActive: true }),
    };

    const productsToCreate = [
      // Plates To Share
      { 
        name: "Pani Puri (10 Pieces)", basePrice: 12.00, categoryId: categories.plates._id, 
        description: "Crispy puris filled with spicy, tangy pani, mashed potatoes, and chutneys for a refreshing burst of flavor in every bite.",
        image: "/products/pani_puri.png"
      },
      { 
        name: "Pani Puri (25 Pieces)", basePrice: 20.00, categoryId: categories.plates._id, 
        description: "Our larger portion of crispy puris with spicy, tangy pani — perfect for sharing the true street food experience.",
        image: "/products/pani_puri.png"
      },
      { 
        name: "Pani Puri (50 Pieces)", basePrice: 30.00, categoryId: categories.plates._id, 
        description: "The ultimate party pack of crispy puris and tangy herb water for a complete GKC street-side experience.",
        image: "/products/pani_puri.png"
      },
      { 
        name: "Dahi Puri (8 Pieces)", basePrice: 12.00, categoryId: categories.plates._id, 
        description: "Crispy puris filled with potatoes, topped with chilled yogurt, tangy chutneys, and sev for a sweet and spicy burst.",
        image: "/products/dahi_puri.png"
      },
      { 
        name: "Sev Puri (8 Pieces)", basePrice: 12.00, categoryId: categories.plates._id, 
        description: "Crunchy puris layered with potatoes, onions, chutneys, and a generous topping of sev for a perfect street-style snack.",
        image: "/products/sev_puri.png"
      },
      { 
        name: "Papadi Chaat", basePrice: 12.00, categoryId: categories.plates._id, 
        description: "Crispy papdi topped with yogurt, chutneys, potatoes, and spices, creating a delicious mix of sweet, tangy, and crunchy flavors.",
        image: "https://images.unsplash.com/photo-1626776876729-babd0f0a53b4?w=800&auto=format"
      },
      { 
        name: "Bhel Puri", basePrice: 12.00, categoryId: categories.plates._id, 
        description: "A light and crunchy mix of puffed rice, chutneys, vegetables, and sev, offering a refreshing and tangy taste.",
        image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&auto=format"
      },
      { 
        name: "South Special Masala Puri", basePrice: 14.00, categoryId: categories.plates._id, 
        description: "Soft puris soaked in spicy gravy, topped with onions, sev, and fresh herbs for a flavorful South Indian twist.",
        image: "https://images.unsplash.com/photo-1644830113203-7b56839be9b3?w=800&auto=format"
      },
      { 
        name: "South Special Ragda Samosa Chaat", basePrice: 15.00, categoryId: categories.plates._id, 
        description: "Crushed samosa topped with warm ragda (white peas curry), chutneys, and spices for a rich and hearty chaat experience.",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format"
      },
      { 
        name: "Veggie Samosa (2 Pieces)", basePrice: 13.00, categoryId: categories.plates._id, 
        description: "Golden-fried pastry stuffed with a spiced vegetable filling, crispy on the outside and flavorful inside.",
        image: "https://images.unsplash.com/photo-1601050690397-3d564590cf40?w=800&auto=format"
      },
      { 
        name: "Samosa Chaat", basePrice: 12.00, categoryId: categories.plates._id, 
        description: "Crushed samosa served with chickpea curry, yogurt, chutneys, and spices for a bold and comforting dish.",
        image: "https://images.unsplash.com/photo-1639352136015-89f4f4699507?w=800&auto=format"
      },
      { 
        name: "Indian Style Pizza", basePrice: 12.00, categoryId: categories.plates._id, 
        description: "A unique fusion pizza loaded with Indian spices, veggies, and desi flavors on a crispy base.",
        image: "https://images.unsplash.com/photo-1593504049359-7b7d92c7185c?w=800&auto=format"
      },
      { 
        name: "Spicy Panner Pizza", basePrice: 15.00, categoryId: categories.plates._id, 
        description: "Delicious pizza topped with spicy marinated paneer, fresh veggies, and melted cheese for a rich and flavorful bite.",
        image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=800&auto=format"
      },

      // Street Food Snacks
      { name: "Dabeli", basePrice: 8.50, categoryId: categories.snacks._id },
      { name: "Vadapav", basePrice: 8.50, categoryId: categories.snacks._id },
      { name: "Bombay Style Vadapav", basePrice: 8.50, categoryId: categories.snacks._id },
      { name: "Schezwan Vadapav", basePrice: 10.50, categoryId: categories.snacks._id },
      { name: "Samosa Pav", basePrice: 8.50, categoryId: categories.snacks._id },
      { name: "Bread Pakora", basePrice: 10.00, categoryId: categories.snacks._id },
      { name: "Vada Balls (2 Pieces)", basePrice: 10.00, categoryId: categories.snacks._id },
      { name: "Frankie", basePrice: 12.00, categoryId: categories.snacks._id },
      { name: "Schezwan Frankie", basePrice: 14.50, categoryId: categories.snacks._id },
      { name: "Noodles Frankie", basePrice: 15.00, categoryId: categories.snacks._id },
      { name: "Panner Frankie", basePrice: 15.00, categoryId: categories.snacks._id },
      { name: "Manchurian Frankie", basePrice: 15.00, categoryId: categories.snacks._id },
      { name: "Chocolate Cheese Sandwich", basePrice: 9.00, categoryId: categories.snacks._id },
      { name: "Pineapple & Chocolate Sandwich", basePrice: 12.00, categoryId: categories.snacks._id },
      { name: "Cheese Allo-Matter Sandwich", basePrice: 13.00, categoryId: categories.snacks._id },
      { name: "Cheese Veg Allo-Matter Sandwich", basePrice: 16.00, categoryId: categories.snacks._id },
      { name: "Cheese Vegetable Sandwich", basePrice: 15.00, categoryId: categories.snacks._id },
      { name: "Panner Angara Sandwich", basePrice: 18.00, categoryId: categories.snacks._id },

      // Pav Bhaji
      { name: "GKC Pav Bhaji", basePrice: 15.00, categoryId: categories.pavBhaji._id },
      { name: "Black Pav Bhaji", basePrice: 16.00, categoryId: categories.pavBhaji._id },
      { name: "Cheese Pav Bhaji", basePrice: 18.00, categoryId: categories.pavBhaji._id },

      // Tava Pulav
      { name: "GKC Tava Pulav", basePrice: 15.00, categoryId: categories.pulav._id },
      { name: "GKC Special Tava Pulav", basePrice: 17.00, categoryId: categories.pulav._id },
      { name: "Maa Anjani's Black Tava Pulav", basePrice: 17.00, categoryId: categories.pulav._id },

      // Indo Chinese
      { name: "Hot & Sour Soup", basePrice: 7.00, categoryId: categories.indoChinese._id },
      { name: "Manchow Soup", basePrice: 8.00, categoryId: categories.indoChinese._id },
      { name: "Dry Manchurian", basePrice: 16.00, categoryId: categories.indoChinese._id },
      { name: "Gravy Manchurian", basePrice: 16.00, categoryId: categories.indoChinese._id },
      { name: "Hakka Noodles", basePrice: 16.00, categoryId: categories.indoChinese._id },
      { name: "Schezwan Hakka Noodles", basePrice: 18.00, categoryId: categories.indoChinese._id },
      { name: "Fried Rice", basePrice: 16.00, categoryId: categories.indoChinese._id },
      { name: "Schezwan Fried Rice", basePrice: 17.00, categoryId: categories.indoChinese._id },
      { name: "Chilli Panner", basePrice: 17.00, categoryId: categories.indoChinese._id },
      { name: "Schezwan Chilli Panner", basePrice: 19.00, categoryId: categories.indoChinese._id },
      { name: "VEG. Masala Maggi", basePrice: 14.00, categoryId: categories.indoChinese._id },

      // Kids Special
      { name: "Cheese Tomato Sandwich", basePrice: 10.00, categoryId: categories.kids._id },
      { name: "Chowmin", basePrice: 13.00, categoryId: categories.kids._id },
      { name: "Cheese Sandwich", basePrice: 7.00, categoryId: categories.kids._id },
      { name: "Cheese Pav", basePrice: 5.00, categoryId: categories.kids._id },
      { name: "Chocolate Pav", basePrice: 6.00, categoryId: categories.kids._id },
      { name: "Jam Pav", basePrice: 5.00, categoryId: categories.kids._id },
      { name: "Kids Pizza", basePrice: 10.00, categoryId: categories.kids._id },

      // Extra
      { name: "Rice (V)", basePrice: 5.00, categoryId: categories.extras._id },
      { name: "Cheese", basePrice: 3.00, categoryId: categories.extras._id },
      { name: "Pav", basePrice: 2.50, categoryId: categories.extras._id },
      { name: "Onion Salad", basePrice: 4.00, categoryId: categories.extras._id },
      { name: "Sauce", basePrice: 2.00, categoryId: categories.extras._id },
      { name: "Plain Yoghurt", basePrice: 4.00, categoryId: categories.extras._id },
      { name: "Garlic Chutney (V)", basePrice: 2.50, categoryId: categories.extras._id },
      { name: "Schezwan (V)", basePrice: 3.00, categoryId: categories.extras._id },
    ];

    console.log("Creating Products...");
    const createdProducts = await Product.insertMany(
      productsToCreate.map(p => ({
        ...p,
        description: (p as any).description || `Authentic GKC ${p.name}`,
        image: (p as any).image || "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&auto=format",
        isActive: true,
        customizations: []
      }))
    );

    console.log("Creating Branch (Clayton)...");
    await Branch.create({
      name: "Gopi ka Chatka - Clayton",
      email: "clayton@gopikachatka.com",
      phone: "+61 415 974 125",
      address: "Clayton South, VIC-3168, Australia",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.884805513835!2d145.1203073!3d-37.9331215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad668346ae2c0c9%3A0x20d2bcae8822407c!2sGopi%20Ka%20Chatka%20Clayton!5e0!3m2!1sen!2sin!4v1774770829000!5m2!1sen!2sin",
      location: { type: "Point", coordinates: [145.1203073, -37.9331215] },
      code: "CLY01",
      isActive: true,
      operatingHours: [
        { day: "monday", open: "12:00", close: "22:00", isClosed: false },
        { day: "tuesday", open: "12:00", close: "22:00", isClosed: false },
        { day: "wednesday", open: "12:00", close: "22:00", isClosed: false },
        { day: "thursday", open: "12:00", close: "22:00", isClosed: false },
        { day: "friday", open: "12:00", close: "23:00", isClosed: false },
        { day: "saturday", open: "12:00", close: "23:00", isClosed: false },
        { day: "sunday", open: "12:00", close: "22:00", isClosed: false },
      ],
      menu: Object.values(categories).map((cat: any) => ({
        categoryId: cat._id,
        products: createdProducts
          .filter(p => p.categoryId.toString() === cat._id.toString())
          .map(p => ({
            productId: p._id,
            price: p.basePrice,
            isAvailable: true
          }))
      })),
      printer: {
        enabled: false,
        mqtt: {
          cmdTopic: "branches/CLY01/commands",
          statusTopic: "branches/CLY01/status",
          heartbeatTopic: "branches/CLY01/heartbeat"
        }
      }
    });

    console.log("Seeding complete with all menu items!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
