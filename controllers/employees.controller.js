const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employee = await Employee.findOne().skip(rand).populate('department');
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.getById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('department');
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.postEmployee = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName, lastName, department });
    await newEmployee.save()
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;

    const updatedElement = {};
    firstName ? updatedElement.firstName = firstName : null;
    lastName ? updatedElement.lastName = lastName : null;
    department ? updatedElement.department = department : null;

    const employee = await Employee.findById(req.params.id);
    if (employee) {
      await Employee.updateOne({ _id: req.params.id }, { $set: updatedElement })
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: error });
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}