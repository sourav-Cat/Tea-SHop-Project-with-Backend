// Setup script for Tea House MongoDB Database
const { TeaHouseDB } = require('./database.js');

async function setupDatabase() {
  const db = new TeaHouseDB();
  
  try {
    console.log('🚀 Starting Tea House Database Setup...\n');
    
    // Connect to MongoDB
    await db.connect();
    
    // Initialize database with collections and sample data
    await db.initializeDatabase();
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📊 Database Collections:');
    console.log('   • products - Tea products with prices and descriptions');
    console.log('   • customers - Customer information and addresses');
    console.log('   • orders - Order history and status tracking');
    console.log('   • reviews - Customer reviews and testimonials');
    console.log('   • subscribers - Newsletter subscription list');
    console.log('   • contact_messages - Contact form submissions');
    
    console.log('\n📦 Sample Data Loaded:');
    console.log('   • 4 Featured Tea Products');
    console.log('   • 3 Customer Reviews');
    
    console.log('\n🔗 Connection Details:');
    console.log('   • Database: tea_house_db');
    console.log('   • URI: mongodb://localhost:27017');
    
  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    console.log('\n💡 Make sure MongoDB is running on your system.');
    console.log('   Install MongoDB: https://docs.mongodb.com/manual/installation/');
  } finally {
    await db.disconnect();
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase }; 