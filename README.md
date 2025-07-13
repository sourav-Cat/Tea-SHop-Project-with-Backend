# 🍵 Tea House Website with MongoDB Database

A beautiful tea house website with a complete MongoDB database backend for managing products, customers, orders, reviews, and more.

## ✨ Features

- **Beautiful Responsive Design** - Modern UI with Tailwind CSS
- **MongoDB Database** - Complete data management system
- **RESTful API** - Full CRUD operations for all data
- **Interactive Components** - Modal, reviews, navigation
- **E-commerce Ready** - Products, orders, customers management

## 🗄️ Database Collections

| Collection | Description |
|------------|-------------|
| `products` | Tea products with prices, descriptions, stock |
| `customers` | Customer information and addresses |
| `orders` | Order history and status tracking |
| `reviews` | Customer reviews and testimonials |
| `subscribers` | Newsletter subscription list |
| `contact_messages` | Contact form submissions |

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB** (v5 or higher)

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   ```bash
   # On Windows
   mongod
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

4. **Setup the database**
   ```bash
   npm run setup
   ```

5. **Start the server**
   ```bash
   npm start
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product by ID

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/featured` - Get featured reviews
- `POST /api/reviews` - Add new review

### Customers
- `POST /api/customers` - Create new customer

### Orders
- `POST /api/orders` - Create new order

### Newsletter
- `POST /api/subscribe` - Subscribe to newsletter

### Contact
- `POST /api/contact` - Submit contact form

### Health Check
- `GET /api/health` - Check API status

## 🛠️ Development

### Run in development mode
```bash
npm run dev
```

### Database Operations

The database class provides these methods:

```javascript
const { TeaHouseDB } = require('./database.js');
const db = new TeaHouseDB();

// Connect to database
await db.connect();

// Get all products
const products = await db.getAllProducts();

// Get featured products
const featured = await db.getFeaturedProducts();

// Add a review
await db.addReview({
  customer_name: "John Doe",
  customer_title: "Tea Lover",
  rating: 5,
  comment: "Amazing tea!"
});

// Subscribe to newsletter
await db.subscribeToNewsletter("user@example.com");

// Disconnect
await db.disconnect();
```

## 📁 Project Structure

```
tea-house-website/
├── index.html              # Main website file
├── database.js             # MongoDB database configuration
├── server.js               # Express server with API endpoints
├── setup-database.js       # Database initialization script
├── package.json            # Node.js dependencies
├── README.md               # This file
├── images/                 # Website images
│   ├── tea-1.png
│   ├── tea-2.png
│   ├── tea-3.png
│   ├── tea-4.png
│   └── ...
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🎨 Customization

### Adding New Products

1. **Via API:**
   ```bash
   curl -X POST http://localhost:3000/api/products \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Green Tea",
       "description": "Fresh green tea with antioxidants",
       "price": 5.99,
       "category": "Green Tea",
       "stock_quantity": 75
     }'
   ```

2. **Via Database:**
   ```javascript
   await db.db.collection('products').insertOne({
     name: "Green Tea",
     description: "Fresh green tea with antioxidants",
     price: 5.99,
     image_url: "images/green-tea.png",
     category: "Green Tea",
     stock_quantity: 75,
     is_featured: true,
     created_at: new Date(),
     updated_at: new Date()
   });
   ```

### Modifying Website Content

Edit `index.html` to change:
- Product information
- Reviews and testimonials
- Contact details
- Styling and layout

## 🔧 Configuration

### Database Connection

Edit `database.js` to change MongoDB connection:

```javascript
const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'tea_house_db';
```

### Server Port

Edit `server.js` to change port:

```javascript
const PORT = process.env.PORT || 3000;
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

1. **Make sure MongoDB is running:**
   ```bash
   # Check MongoDB status
   sudo systemctl status mongod
   
   # Start MongoDB if not running
   sudo systemctl start mongod
   ```

2. **Check MongoDB connection:**
   ```bash
   # Connect to MongoDB shell
   mongosh
   ```

### Port Already in Use

If port 3000 is busy, change it in `server.js`:
```javascript
const PORT = process.env.PORT || 3001;
```

### Database Setup Fails

1. **Check MongoDB installation:**
   ```bash
   mongod --version
   ```

2. **Run setup manually:**
   ```bash
   node setup-database.js
   ```

## 📝 License

MIT License - feel free to use this project for your own tea house website!

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you need help with:
- Database setup
- API integration
- Website customization
- Deployment

Feel free to ask questions or report issues!

---

**Enjoy your tea house website! 🍵✨** 