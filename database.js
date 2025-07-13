// MongoDB Database Configuration for Tea House
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb'); // Added missing import for ObjectId

// Database connection string - Using MongoDB Atlas (cloud)
// You can replace this with your own MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://teahouse:teahouse123@cluster0.mongodb.net/tea_house_db?retryWrites=true&w=majority';
const DB_NAME = 'tea_house_db';

// For local MongoDB (if you install it later), use:
// const MONGODB_URI = 'mongodb://localhost:27017';

// Database collections schema
const collections = {
  products: {
    name: 'products',
    schema: {
      name: String,
      description: String,
      price: Number,
      image_url: String,
      category: String,
      stock_quantity: Number,
      is_featured: Boolean,
      created_at: Date,
      updated_at: Date
    }
  },
  customers: {
    name: 'customers',
    schema: {
      name: String,
      email: String,
      phone: String,
      address: {
        street: String,
        city: String,
        state: String,
        zip_code: String,
        country: String
      },
      created_at: Date,
      updated_at: Date
    }
  },
  orders: {
    name: 'orders',
    schema: {
      customer_id: ObjectId,
      items: [{
        product_id: ObjectId,
        name: String,
        price: Number,
        quantity: Number
      }],
      total_amount: Number,
      status: String, // 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
      shipping_address: {
        street: String,
        city: String,
        state: String,
        zip_code: String,
        country: String
      },
      payment_status: String, // 'pending', 'paid', 'failed'
      created_at: Date,
      updated_at: Date
    }
  },
  reviews: {
    name: 'reviews',
    schema: {
      customer_name: String,
      customer_title: String,
      rating: Number, // 1-5 stars
      comment: String,
      product_id: ObjectId, // optional, for product-specific reviews
      is_featured: Boolean,
      created_at: Date
    }
  },
  subscribers: {
    name: 'subscribers',
    schema: {
      email: String,
      is_active: Boolean,
      subscribed_at: Date,
      unsubscribed_at: Date
    }
  },
  contact_messages: {
    name: 'contact_messages',
    schema: {
      name: String,
      email: String,
      subject: String,
      message: String,
      status: String, // 'new', 'read', 'replied'
      created_at: Date
    }
  }
};

// Sample data for initialization
const sampleData = {
  products: [
    {
      name: "Milk Tea",
      description: "Smooth and creamy milk tea with rich flavor and perfect sweetness balance.",
      price: 4.99,
      image_url: "images/tea-1.png",
      category: "Milk Tea",
      stock_quantity: 100,
      is_featured: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Black Tea",
      description: "Strong and bold black tea with natural antioxidants and refreshing taste.",
      price: 3.99,
      image_url: "images/tea-2.png",
      category: "Black Tea",
      stock_quantity: 150,
      is_featured: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Lemon Tea",
      description: "Refreshing lemon tea with citrus zest and natural vitamin C boost.",
      price: 4.49,
      image_url: "images/tea-3.png",
      category: "Herbal Tea",
      stock_quantity: 80,
      is_featured: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Orange Tea",
      description: "Sweet and tangy orange tea with natural fruit essence and aroma.",
      price: 4.79,
      image_url: "images/tea-4.png",
      category: "Fruit Tea",
      stock_quantity: 90,
      is_featured: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  reviews: [
    {
      customer_name: "Nusrat Faria",
      customer_title: "Tea Enthusiast",
      rating: 5,
      comment: "We are providing the best and suitable tea services for the people who are interested to quality tea. The taste and aroma are simply amazing!",
      is_featured: true,
      created_at: new Date()
    },
    {
      customer_name: "Ahmed Khan",
      customer_title: "Business Owner",
      rating: 5,
      comment: "The tea quality is exceptional and the service is outstanding. I love their premium tea collection!",
      is_featured: true,
      created_at: new Date()
    },
    {
      customer_name: "Sarah Johnson",
      customer_title: "Tea Connoisseur",
      rating: 5,
      comment: "Best tea house in the city! Their traditional tea preparation methods are simply perfect.",
      is_featured: true,
      created_at: new Date()
    }
  ]
};

// Database connection and operations
class TeaHouseDB {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(MONGODB_URI);
      await this.client.connect();
      this.db = this.client.db(DB_NAME);
      console.log('✅ Connected to MongoDB successfully!');
      return this.db;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }

  async initializeDatabase() {
    try {
      // Create collections
      for (const [key, collection] of Object.entries(collections)) {
        await this.db.createCollection(collection.name);
        console.log(`📁 Created collection: ${collection.name}`);
      }

      // Insert sample data
      await this.insertSampleData();
      console.log('✅ Database initialized with sample data!');
    } catch (error) {
      console.error('❌ Database initialization error:', error);
      throw error;
    }
  }

  async insertSampleData() {
    try {
      // Insert products
      const productsCollection = this.db.collection('products');
      await productsCollection.insertMany(sampleData.products);
      console.log(`📦 Inserted ${sampleData.products.length} products`);

      // Insert reviews
      const reviewsCollection = this.db.collection('reviews');
      await reviewsCollection.insertMany(sampleData.reviews);
      console.log(`⭐ Inserted ${sampleData.reviews.length} reviews`);
    } catch (error) {
      console.error('❌ Sample data insertion error:', error);
      throw error;
    }
  }

  // Product operations
  async getAllProducts() {
    const collection = this.db.collection('products');
    return await collection.find({}).toArray();
  }

  async getFeaturedProducts() {
    const collection = this.db.collection('products');
    return await collection.find({ is_featured: true }).toArray();
  }

  async getProductById(id) {
    const collection = this.db.collection('products');
    return await collection.findOne({ _id: id });
  }

  // Review operations
  async getAllReviews() {
    const collection = this.db.collection('reviews');
    return await collection.find({}).sort({ created_at: -1 }).toArray();
  }

  async getFeaturedReviews() {
    const collection = this.db.collection('reviews');
    return await collection.find({ is_featured: true }).toArray();
  }

  async addReview(reviewData) {
    const collection = this.db.collection('reviews');
    reviewData.created_at = new Date();
    return await collection.insertOne(reviewData);
  }

  // Customer operations
  async createCustomer(customerData) {
    const collection = this.db.collection('customers');
    customerData.created_at = new Date();
    customerData.updated_at = new Date();
    return await collection.insertOne(customerData);
  }

  async getCustomerByEmail(email) {
    const collection = this.db.collection('customers');
    return await collection.findOne({ email: email });
  }

  // Order operations
  async createOrder(orderData) {
    const collection = this.db.collection('orders');
    orderData.created_at = new Date();
    orderData.updated_at = new Date();
    return await collection.insertOne(orderData);
  }

  async getOrdersByCustomer(customerId) {
    const collection = this.db.collection('orders');
    return await collection.find({ customer_id: customerId }).sort({ created_at: -1 }).toArray();
  }

  // Newsletter subscription
  async subscribeToNewsletter(email) {
    const collection = this.db.collection('subscribers');
    const existing = await collection.findOne({ email: email });
    
    if (existing) {
      return await collection.updateOne(
        { email: email },
        { $set: { is_active: true, subscribed_at: new Date() } }
      );
    } else {
      return await collection.insertOne({
        email: email,
        is_active: true,
        subscribed_at: new Date()
      });
    }
  }

  // Contact form
  async submitContactForm(contactData) {
    const collection = this.db.collection('contact_messages');
    contactData.created_at = new Date();
    contactData.status = 'new';
    return await collection.insertOne(contactData);
  }
}

module.exports = { TeaHouseDB, collections, sampleData }; 