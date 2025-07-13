// Express server for Tea House website with MongoDB API
const express = require('express');
const cors = require('cors');
const path = require('path');
const { TeaHouseMongoDB } = require('./mongodb-database.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Database instance
const db = new TeaHouseMongoDB();

// Connect to database on server start
async function initializeServer() {
  try {
    await db.connect();
    await db.initializeDatabase();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

// API Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.getAllProducts();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get featured products
app.get('/api/products/featured', async (req, res) => {
  try {
    const products = await db.getFeaturedProducts();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await db.getProductById(req.params.id);
    if (product) {
      res.json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await db.getAllReviews();
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get featured reviews
app.get('/api/reviews/featured', async (req, res) => {
  try {
    const reviews = await db.getFeaturedReviews();
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add new review
app.post('/api/reviews', async (req, res) => {
  try {
    const { customer_name, customer_title, rating, comment } = req.body;
    
    if (!customer_name || !rating || !comment) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }
    
    const result = await db.addReview({
      customer_name,
      customer_title,
      rating: parseInt(rating),
      comment,
      is_featured: false
    });
    
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Newsletter subscription
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email is required' 
      });
    }
    
    const result = await db.subscribeToNewsletter(email);
    res.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!',
      data: result 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all subscribers
app.get('/api/subscribers', async (req, res) => {
  try {
    const subscribers = await db.getAllSubscribers();
    res.json({ success: true, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and message are required' 
      });
    }
    
    const result = await db.submitContactForm({
      name,
      email,
      subject: subject || 'General Inquiry',
      message
    });
    
    res.json({ 
      success: true, 
      message: 'Message sent successfully!',
      data: result 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all customers
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await db.getAllCustomers();
    res.json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get customer by ID
app.get('/api/customers/:id', async (req, res) => {
  try {
    const customer = await db.getCustomerById(req.params.id);
    if (customer) {
      res.json({ success: true, data: customer });
    } else {
      res.status(404).json({ success: false, error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get customer by email
app.get('/api/customers/email/:email', async (req, res) => {
  try {
    const customer = await db.getCustomerByEmail(req.params.email);
    if (customer) {
      res.json({ success: true, data: customer });
    } else {
      res.status(404).json({ success: false, error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create customer
app.post('/api/customers', async (req, res) => {
  try {
    const customerData = req.body;
    
    if (!customerData.name || !customerData.email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name and email are required' 
      });
    }
    
    const result = await db.createCustomer(customerData);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update customer
app.put('/api/customers/:id', async (req, res) => {
  try {
    const updateData = req.body;
    const result = await db.updateCustomer(req.params.id, updateData);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    
    if (!orderData.customer_id || !orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Customer ID and items are required' 
      });
    }
    
    const result = await db.createOrder(orderData);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Quick buy - Create order with customer info
app.post('/api/buy-now', async (req, res) => {
  try {
    const { product_name, product_price, customer_name, customer_email, customer_phone, customer_address } = req.body;
    
    if (!product_name || !product_price || !customer_name || !customer_email || !customer_address) {
      return res.status(400).json({ 
        success: false, 
        error: 'Product details and customer information (including address) are required' 
      });
    }
    
    // Convert string address to proper format
    const addressObject = {
      street: customer_address,
      city: '',
      state: '',
      zip_code: '',
      country: 'Bangladesh'
    };

    // First create or get customer
    let customer = await db.getCustomerByEmail(customer_email);
    if (!customer) {
      customer = await db.createCustomer({
        name: customer_name,
        email: customer_email,
        phone: customer_phone || '',
        address: addressObject
      });
    } else {
      // Update existing customer's address if provided
      await db.updateCustomer(customer._id, {
        address: addressObject,
        phone: customer_phone || customer.phone
      });
    }
    
    // Create order
    const orderData = {
      customer_id: customer._id,
      items: [{
        product_name: product_name,
        quantity: 1,
        price: parseFloat(product_price),
        total: parseFloat(product_price)
      }],
      total_amount: parseFloat(product_price),
      status: 'pending',
      shipping_address: addressObject,
      payment_method: 'online'
    };
    
    const result = await db.createOrder(orderData);
    
    res.json({ 
      success: true, 
      message: 'Order placed successfully!',
      data: {
        order_id: result._id,
        customer: customer,
        order: result
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await db.getAllOrders();
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await db.getOrderById(req.params.id);
    if (order) {
      res.json({ success: true, data: order });
    } else {
      res.status(404).json({ success: false, error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update order status
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ 
        success: false, 
        error: 'Status is required' 
      });
    }
    
    const result = await db.updateOrderStatus(req.params.id, status);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Tea House API is running!',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Tea House server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  await initializeServer();
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await db.disconnect();
  process.exit(0);
}); 