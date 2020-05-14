const mongoose = require('mongoose');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

const Employee = require('../employee.model');

let fakeDB;

describe('Employee crud', () => {
  before(async () => {

    try {
      fakeDB = new MongoMemoryServer();

      const uri = await fakeDB.getConnectionString();

      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    } catch (err) {
      console.log(err);
    }
  });

  after(async () => {
    await mongoose.disconnect();
    await fakeDB.stop();
  });

  const employeeOne = { firstName: 'John', lastName: 'Doe', department: 'Department #1' };
  const employeeTwo = { firstName: 'Amanda', lastName: 'Poe', department: 'Department #2' };

  describe('Reading data', () => {
    before(async () => {
      const firstDbEmployee = new Employee(employeeOne);
      await firstDbEmployee.save();

      const secondDbEmployee = new Employee(employeeTwo);
      await secondDbEmployee.save();
    });

    after(async () => {
      await Employee.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find({});
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const employee = await Employee.findOne(employeeOne);
      expect(employee.firstName).to.be.equal(employeeOne.firstName);
      expect(employee.lastName).to.be.equal(employeeOne.lastName);
      expect(employee.department).to.be.equal(employeeOne.department);
    });
  });

  describe('Creating data', () => {
    after(async () => {
      await Employee.deleteMany();
    });

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee(employeeOne);
      await employee.save();
      expect(employee.isNew).to.be.false;
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const firstDbEmployee = new Employee(employeeOne);
      await firstDbEmployee.save();

      const secondDbEmployee = new Employee(employeeTwo);
      await secondDbEmployee.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: employeeOne.firstName }, { $set: { firstName: 'Alex' } });
      const updatedEmployee = await Employee.findOne({ firstName: 'Alex' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: employeeOne.firstName });
      employee.firstName = 'Alex';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: 'Alex' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!', lastName: 'Updated!', department: 'Updated!' } });
      const employees = await Employee.find({ firstName: 'Updated!', lastName: 'Updated!', department: 'Updated!' });
      expect(employees.length).to.be.equal(2);
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const firstDbEmployee = new Employee(employeeOne);
      await firstDbEmployee.save();

      const secondDbEmployee = new Employee(employeeTwo);
      await secondDbEmployee.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: employeeOne.firstName });
      const deletedEmployee = await Employee.findOne({ firstName: employeeOne.firstName });
      expect(deletedEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: employeeOne.firstName });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: employeeOne.firstName });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });
  });
});