require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Location = require('../models/location');
const Customer = require('../models/Customer');
const CustomerLog = require('../models/customerLogs');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/opiniion-test-task', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const LOG_TYPES = ['VISIT', 'PURCHASE', 'FEEDBACK', 'COMPLAINT', 'INQUIRY', 'SUPPORT', 'RETURN', 'CONSULTATION'];

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateLogsForCustomer = async (customerId, minLogs = 1, maxLogs = 5) => {
  const numLogs = Math.floor(Math.random() * (maxLogs - minLogs + 1)) + minLogs;
  const logs = [];

  for (let i = 0; i < numLogs; i++) {
    const logDate = getRandomDate(new Date('2024-01-01'), new Date('2024-01-31'));
    logs.push({
      customerId,
      type: getRandomItem(LOG_TYPES),
      text: faker.lorem.sentence(),
      date: logDate
    });
  }

  return logs;
};

async function seedDatabase() {
  try {
    await Promise.all([
      Location.deleteMany({}),
      Customer.deleteMany({}),
      CustomerLog.deleteMany({})
    ]);

    console.log('Existing data cleared');

    const locations = [];
    for (let i = 0; i < 5; i++) {
      const location = await Location.create({
        name: `${faker.location.city()} Branch`,
        createdDate: getRandomDate(new Date('2023-01-01'), new Date('2023-12-31'))
      });
      locations.push(location);
    }

    console.log('Created 5 locations');

    const customers = [];
    for (const location of locations) {
      for (let i = 0; i < 5; i++) {
        const customer = await Customer.create({
          locationId: location._id,
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          createdDate: getRandomDate(new Date('2023-01-01'), new Date('2024-01-31'))
        });
        customers.push(customer);
      }
    }

    console.log('Created 25 customers');

    let totalLogs = 0;
    for (const customer of customers) {
      const logs = await generateLogsForCustomer(customer._id, 2, 6);
      await CustomerLog.insertMany(logs);
      totalLogs += logs.length;
    }

    console.log(`Created ${totalLogs} customer logs`);

    const sampleLocation = locations[0];
    console.log('\nSample IDs for testing:');
    console.log(`Location ID: ${sampleLocation._id}`);
    console.log(`Sample date range: 2024-01-01 to 2024-01-31`);

    console.log('\nDatabase seeding completed:');
    console.log(`- ${locations.length} locations`);
    console.log(`- ${customers.length} customers`);
    console.log(`- ${totalLogs} customer logs`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();