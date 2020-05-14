const expect = require('chai').expect;
const mongoose = require('mongoose');

const Product = require('../product.model');

describe('Product', () => {
  const args = ['name', 'client'];

  it('should throw an error if args are not a strings', () => {
    const cases = [{}, []];

    for (let element of cases) {
      const product = new Product({ name: element, client: element });
      product.validate(err => {
        args.forEach(arg => {
          expect(err.errors[arg]).to.exist;
        })
      });
    }
  });

  it('should not throw an error if args have proper format', () => {
    const product = new Product({ name: 'Lorem', client: 'Ipsum' });

    product.validate(err => {
      expect(err).to.not.exist;
    });
  });
});