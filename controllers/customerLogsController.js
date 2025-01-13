const Location = require('../models/location');
const Customer = require('../models/Customer');
const CustomerLog = require('../models/customerLogs');

class CustomerLogsController {
  static async getCustomerLogs(req, res, next) {
    try {
      const { locationId, startDate, endDate } = req.body;
      
   
      const start = new Date(startDate);
      const end = new Date(endDate);
      

      const location = await Location.findById(locationId);
      
      if (!location) {
        const error = new Error('Location not found');
        error.status = 404;
        throw error;
      }
      
     
      const customers = await Customer.find({ locationId });
      
      if (!customers.length) {
        const error = new Error('No customers found for the given location');
        error.status = 404;
        throw error;
      }
      
    
      const customerIds = customers.map(customer => customer._id);
      
      
      const customerLogs = await CustomerLog.find({
        customerId: { $in: customerIds },
        date: {
          $gte: start,
          $lte: end
        }
      }).lean();
      

      const groupedLogs = customers.map(customer => ({
        customerId: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        logs: customerLogs.filter(log => 
          log.customerId.toString() === customer._id.toString()
        )
      })).filter(customer => customer.logs.length > 0);
      
     
      res.status(200).json({
        locationId,
        locationName: location.name,
        dateRange: {
          start: startDate,
          end: endDate
        },
        totalCustomers: groupedLogs.length,
        totalLogs: customerLogs.length,
        customers: groupedLogs
      });
      
    } catch (error) {
      next(error); 
    }
  }
}

module.exports = CustomerLogsController;