// Simple File-based Database for Tea House (No MongoDB required)
const fs = require('fs');
const path = require('path');

// Database file path
const DB_FILE = path.join(__dirname, 'database.json');

// Initialize database file if it doesn't exist
function initializeDatabaseFile() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      products: [
        {
          id: 1,
          name: "Milk Tea",
          description: "Smooth and creamy milk tea with rich flavor and perfect sweetness balance.",
          price: 4.99,
          image_url: "images/tea-1.png",
          category: "Milk Tea",
          stock_quantity: 100,
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          name: "Black Tea",
          description: "Strong and bold black tea with natural antioxidants and refreshing taste.",
          price: 3.99,
          image_url: "images/tea-2.png",
          category: "Black Tea",
          stock_quantity: 150,
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          name: "Lemon Tea",
          description: "Refreshing lemon tea with citrus zest and natural vitamin C boost.",
          price: 4.49,
          image_url: "images/tea-3.png",
          category: "Herbal Tea",
          stock_quantity: 80,
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 4,
          name: "Orange Tea",
          description: "Sweet and tangy orange tea with natural fruit essence and aroma.",
          price: 4.79,
          image_url: "images/tea-4.png",
          category: "Fruit Tea",
          stock_quantity: 90,
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      reviews: [
        {
          id: 1,
          customer_name: "Nusrat Faria",
          customer_title: "Tea Enthusiast",
          rating: 5,
          comment: "We are providing the best and suitable tea services for the people who are interested to quality tea. The taste and aroma are simply amazing!",
          is_featured: true,
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          customer_name: "Ahmed Khan",
          customer_title: "Business Owner",
          rating: 5,
          comment: "The tea quality is exceptional and the service is outstanding. I love their premium tea collection!",
          is_featured: true,
          created_at: new Date().toISOString()
        },
        {
          id: 3,
          customer_name: "Sarah Johnson",
          customer_title: "Tea Connoisseur",
          rating: 5,
          comment: "Best tea house in the city! Their traditional tea preparation methods are simply perfect.",
          is_featured: true,
          created_at: new Date().toISOString()
        }
      ],
      subscribers: [],
      contact_messages: [],
      customers: [],
      orders: []
    };
    
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    console.log('✅ Database file created with sample data!');
  }
}

// Read database
function readDatabase() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error reading database:', error);
    return null;
  }
}

// Write database
function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('❌ Error writing database:', error);
    return false;
  }
}

// Generate new ID
function generateId(collection) {
  const db = readDatabase();
  const items = db[collection] || [];
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
}

// Database operations class
class TeaHouseDB {
  constructor() {
    initializeDatabaseFile();
  }

  async connect() {
    console.log('✅ Connected to file-based database!');
    return true;
  }

  async disconnect() {
    console.log('🔌 Disconnected from file-based database');
  }

  async initializeDatabase() {
    console.log('✅ Database already initialized!');
  }

  // Product operations
  async getAllProducts() {
    const db = readDatabase();
    return db.products || [];
  }

  async getFeaturedProducts() {
    const db = readDatabase();
    return (db.products || []).filter(product => product.is_featured);
  }

  async getProductById(id) {
    const db = readDatabase();
    return (db.products || []).find(product => product.id == id);
  }

  // Review operations
  async getAllReviews() {
    const db = readDatabase();
    return (db.reviews || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  async getFeaturedReviews() {
    const db = readDatabase();
    return (db.reviews || []).filter(review => review.is_featured);
  }

  async addReview(reviewData) {
    const db = readDatabase();
    const newReview = {
      id: generateId('reviews'),
      ...reviewData,
      created_at: new Date().toISOString()
    };
    
    db.reviews.push(newReview);
    writeDatabase(db);
    return { insertedId: newReview.id };
  }

  // Customer operations
  async createCustomer(customerData) {
    const db = readDatabase();
    const newCustomer = {
      id: generateId('customers'),
      ...customerData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    db.customers.push(newCustomer);
    writeDatabase(db);
    return { insertedId: newCustomer.id };
  }

  async getCustomerByEmail(email) {
    const db = readDatabase();
    return (db.customers || []).find(customer => customer.email === email);
  }

  // Order operations
  async createOrder(orderData) {
    const db = readDatabase();
    const newOrder = {
      id: generateId('orders'),
      ...orderData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    db.orders.push(newOrder);
    writeDatabase(db);
    return { insertedId: newOrder.id };
  }

  async getOrdersByCustomer(customerId) {
    const db = readDatabase();
    return (db.orders || []).filter(order => order.customer_id == customerId);
  }

  async getAllOrders() {
    const db = readDatabase();
    return (db.orders || []).sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
  }

  async getOrderById(id) {
    const db = readDatabase();
    return (db.orders || []).find(order => order.id == id);
  }

  async updateOrderStatus(id, status) {
    const db = readDatabase();
    const orderIndex = (db.orders || []).findIndex(order => order.id == id);
    
    if (orderIndex !== -1) {
      db.orders[orderIndex].status = status;
      db.orders[orderIndex].updated_at = new Date().toISOString();
      writeDatabase(db);
      return db.orders[orderIndex];
    }
    return null;
  }

  // Newsletter subscription
  async subscribeToNewsletter(email) {
    const db = readDatabase();
    const existing = (db.subscribers || []).find(sub => sub.email === email);
    
    if (existing) {
      // Update existing subscription
      existing.is_active = true;
      existing.subscribed_at = new Date().toISOString();
      writeDatabase(db);
      return { modifiedCount: 1 };
    } else {
      // Add new subscription
      const newSubscriber = {
        id: generateId('subscribers'),
        email: email,
        is_active: true,
        subscribed_at: new Date().toISOString()
      };
      
      db.subscribers.push(newSubscriber);
      writeDatabase(db);
      return { insertedId: newSubscriber.id };
    }
  }

  // Contact form
  async submitContactForm(contactData) {
    const db = readDatabase();
    const newMessage = {
      id: generateId('contact_messages'),
      ...contactData,
      status: 'new',
      created_at: new Date().toISOString()
    };
    
    db.contact_messages.push(newMessage);
    writeDatabase(db);
    return { insertedId: newMessage.id };
  }

  // Get all subscribers (for admin purposes)
  async getAllSubscribers() {
    const db = readDatabase();
    return db.subscribers || [];
  }

  // Get all contact messages (for admin purposes)
  async getAllContactMessages() {
    const db = readDatabase();
    return db.contact_messages || [];
  }
}

module.exports = { TeaHouseDB }; 