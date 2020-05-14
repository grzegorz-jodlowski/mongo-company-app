const expect = require('chai').expect;
const mongoose = require('mongoose');

const Employee = require('../employee.model');

after(() => {
  mongoose.models = {};
});

describe('Employee', () => {
  const args = ['firstName', 'lastName', 'department'];

  it('should throw an error if no args', () => {
    const employee = new Employee({});

    employee.validate(err => {
      args.forEach(arg => {
        expect(err.errors[arg]).to.exist;
      })
    });
  });

  it('should throw an error if args are not a strings', () => {
    const cases = [{}, []];

    for (let element of cases) {
      const employee = new Employee({ firstName: element, lastName: element, department: element });
      employee.validate(err => {
        args.forEach(arg => {
          expect(err.errors[arg]).to.exist;
        })
      });
    }
  });

  it('should not throw an error if args have proper format', () => {
    const employee = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Marketing' });

    employee.validate(err => {
      expect(err).to.not.exist;
    });
  });
});