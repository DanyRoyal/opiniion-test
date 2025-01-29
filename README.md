# Customer Management API

A robust REST API built with Node.js, Express, and MongoDB for managing customer interactions across multiple locations.

## 🌟 Features

- **Location Management**: Track multiple business locations
- **Customer Tracking**: Manage customer profiles and their associated locations
- **Activity Logging**: Record and retrieve customer interactions and activities
- **Data Analytics**: Group and analyze customer activities by location and date range
- **RESTful Architecture**: Clean and standardized API endpoints
- **Error Handling**: Comprehensive error handling and validation
- **MongoDB Integration**: Efficient data storage and retrieval with Mongoose

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Testing**: Jest (planned)
- **Documentation**: Swagger/OpenAPI (planned)

## 📁 Project Structure

```
customer-management-api/
├── config/
│   └── config.js           # Configuration variables
├── controllers/
│   ├── customerLogsController.js
│   └── locationController.js
├── middleware/
│   ├── errorHandler.js
│   └── validators.js
├── models/
│   ├── customer.js
│   ├── CustomerLog.js
│   └── location.js
├── routes/
│   ├── customerLogs.js
│   └── locations.js
├── scripts/
│   └── seed.js            # Database seeding script
├── .env
├── .gitignore
├── app.js                 # Application entry point
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/danyroyal/opiniion-test.git
cd opiniion-test
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
MONGODB_URI=mongodb://localhost:27017/opiniion-test-task
PORT=3000
```

4. Seed the database with sample data
```bash
node mock/seed.js
```

5. Start the server
```bash
npm start
```

## 📦 API Endpoints

### Locations

#### Get all locations
```http
GET /api/locations
```

Response:
```json
{
    "count": 5,
    "locations": [
        {
            "_id": "65b1234567890abcdef12345",
            "name": "Downtown Branch",
            "createdDate": "2023-05-15T10:30:00.000Z"
        }
    ]
}
```

### Customer Logs

#### Get customer logs by location
```http
POST /api/customerLogs
```

Request Body:
```json
{
    "locationId": "65b1234567890abcdef12345",
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
}
```

Response:
```json
{
    "locationId": "65b1234567890abcdef12345",
    "locationName": "Downtown Branch",
    "dateRange": {
        "start": "2024-01-01",
        "end": "2024-01-31"
    },
    "totalCustomers": 3,
    "totalLogs": 12,
    "customers": [...]
}
```

## 💾 Database Schema

### Location
```javascript
{
    name: String,
    createdDate: Date
}
```

### Customer
```javascript
{
    locationId: ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    createdDate: Date
}
```

### CustomerLog
```javascript
{
    customerId: ObjectId,
    type: String,
    text: String,
    date: Date
}
```

## 🧪 Testing

```bash
# Run tests (coming soon)
npm test
```

## 📈 Future Enhancements

- [ ] User authentication and authorization
- [ ] Request rate limiting
- [ ] API documentation with Swagger
- [ ] Comprehensive test coverage
- [ ] Docker containerization
- [ ] Pagination for large datasets
- [ ] Advanced filtering and search capabilities
- [ ] Audit logging
- [ ] Real-time notifications


5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 👥 Authors

- **Muhammad Danial** - *Initial work* - (https://github.com/danyroyal)

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the robust database
- All contributors who help to improve this project# opiniion-test
