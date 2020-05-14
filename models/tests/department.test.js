const expect = require('chai').expect;
const mongoose = require('mongoose');

const Department = require('../department.model');

describe('Department', () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({});

    dep.validate(err => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];

    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "name" length is lower than 5 and greater than 20', () => {
    const cases = ['a', 'aaaa', 'aaaaa aaaaa aaaaa aaaaa'];

    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should not throw an error if "name" has proper format', () => {
    const cases = ['Management', 'Marketing'];

    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });
});