// MongoDB Database for Tea House
const { MongoClient } = require('mongodb');

// MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'tea_house_db';

class TeaHouseMongoDB {
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
      return true;
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error);
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
      // Initialize collections with sample data
      const collections = ['products', 'reviews', 'customers', 'orders', 'subscribers', 'contact_messages'];
      
      for (const collectionName of collections) {
        const collection = this.db.collection(collectionName);
        const count = await collection.countDocuments();
        
        if (count === 0) {
          console.log(`📝 Initializing ${collectionName} collection...`);
          
          switch (collectionName) {
            case 'products':
              await collection.insertMany([
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
              ]);
              break;
              
            case 'reviews':
              await collection.insertMany([
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
              ]);
              break;
          }
        }
      }
      
      console.log('✅ MongoDB database initialized with sample data!');
    } catch (error) {
      console.error('❌ Error initializing MongoDB:', error);
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
    const newReview = {
      ...reviewData,
      created_at: new Date()
    };
    
    const result = await collection.insertOne(newReview);
    return { insertedId: result.insertedId };
  }

  // Customer operations
  async createCustomer(customerData) {
    const collection = this.db.collection('customers');
    const newCustomer = {
      ...customerData,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const result = await collection.insertOne(newCustomer);
    return { ...newCustomer, _id: result.insertedId };
  }

  async getAllCustomers() {
    const collection = this.db.collection('customers');
    return await collection.find({}).sort({ created_at: -1 }).toArray();
  }

  async getCustomerById(id) {
    const collection = this.db.collection('customers');
    return await collection.findOne({ _id: id });
  }

  async getCustomerByEmail(email) {
    const collection = this.db.collection('customers');
    return await collection.findOne({ email: email });
  }

  async updateCustomer(customerId, updateData) {
    const collection = this.db.collection('customers');
    const updateResult = {
      ...updateData,
      updated_at: new Date()
    };
    
    const result = await collection.updateOne(
      { _id: customerId },
      { $set: updateResult }
    );
    
    if (result.matchedCount === 0) {
      throw new Error('Customer not found');
    }
    
    return await collection.findOne({ _id: customerId });
  }

  // Order operations
  async createOrder(orderData) {
    const collection = this.db.collection('orders');
    const newOrder = {
      ...orderData,
      order_date: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const result = await collection.insertOne(newOrder);
    return { ...newOrder, _id: result.insertedId };
  }

  async getOrdersByCustomer(customerId) {
    const collection = this.db.collection('orders');
    return await collection.find({ customer_id: customerId }).toArray();
  }

  async getAllOrders() {
    const collection = this.db.collection('orders');
    return await collection.find({}).sort({ order_date: -1 }).toArray();
  }

  async getOrderById(id) {
    const collection = this.db.collection('orders');
    return await collection.findOne({ _id: id });
  }

  async updateOrderStatus(id, status) {
    const collection = this.db.collection('orders');
    const result = await collection.updateOne(
      { _id: id },
      { 
        $set: { 
          status: status,
          updated_at: new Date()
        }
      }
    );
    
    if (result.modifiedCount > 0) {
      return await this.getOrderById(id);
    }
    return null;
  }

  // Newsletter subscription
  async subscribeToNewsletter(email) {
    const collection = this.db.collection('subscribers');
    
    // Check if already subscribed
    const existing = await collection.findOne({ email: email });
    if (existing) {
      throw new Error('Email already subscribed');
    }
    
    const newSubscriber = {
      email: email,
      subscribed_at: new Date(),
      is_active: true
    };
    
    const result = await collection.insertOne(newSubscriber);
    return { ...newSubscriber, _id: result.insertedId };
  }

  async getAllSubscribers() {
    const collection = this.db.collection('subscribers');
    return await collection.find({}).toArray();
  }

  // Contact form
  async submitContactForm(contactData) {
    const collection = this.db.collection('contact_messages');
    const newMessage = {
      ...contactData,
      created_at: new Date(),
      status: 'new'
    };
    
    const result = await collection.insertOne(newMessage);
    return { ...newMessage, _id: result.insertedId };
  }

  async getAllContactMessages() {
    const collection = this.db.collection('contact_messages');
    return await collection.find({}).sort({ created_at: -1 }).toArray();
  }
}

module.exports = { TeaHouseMongoDB }; 