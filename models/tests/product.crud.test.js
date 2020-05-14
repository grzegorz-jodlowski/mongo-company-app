const mongoose = require('mongoose');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

const Product = require('../product.model');

let fakeDB;

describe('Product crud', () => {
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

  const productOne = { name: 'table', client: 'John Doe' };
  const productTwo = { name: 'chair', client: 'Amanda Poe' };

  describe('Reading data', () => {
    before(async () => {
      const firstDbProduct = new Product(productOne);
      await firstDbProduct.save();

      const secondDbProduct = new Product(productTwo);
      await secondDbProduct.save();
    });

    after(async () => {
      await Product.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const products = await Product.find({});
      const expectedLength = 2;
      expect(products.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const product = await Product.findOne(productOne);
      expect(product.name).to.be.equal(productOne.name);
      expect(product.client).to.be.equal(productOne.client);
    });
  });

  describe('Creating data', () => {
    after(async () => {
      await Product.deleteMany();
    });

    it('should insert new document with "insertOne" method', async () => {
      const product = new Product(productOne);
      await product.save();
      expect(product.isNew).to.be.false;
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const firstDbProduct = new Product(productOne);
      await firstDbProduct.save();

      const secondDbProduct = new Product(productTwo);
      await secondDbProduct.save();
    });

    afterEach(async () => {
      await Product.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Product.updateOne({ name: productOne.name }, { $set: { name: 'sofa' } });
      const updatedProduct = await Product.findOne({ name: 'sofa' });
      expect(updatedProduct).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const product = await Product.findOne({ name: productOne.name });
      product.name = 'sofa';
      await product.save();

      const updatedProduct = await Product.findOne({ name: 'sofa' });
      expect(updatedProduct).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Product.updateMany({}, { $set: { name: 'Updated!', client: 'Updated!' } });
      const products = await Product.find({ name: 'Updated!', client: 'Updated!' });
      expect(products.length).to.be.equal(2);
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const firstDbProduct = new Product(productOne);
      await firstDbProduct.save();

      const secondDbProduct = new Product(productTwo);
      await secondDbProduct.save();
    });

    afterEach(async () => {
      await Product.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Product.deleteOne({ name: productOne.name });
      const deletedProduct = await Product.findOne({ name: productOne.name });
      expect(deletedProduct).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const product = await Product.findOne({ name: productOne.name });
      await product.remove();
      const removedProduct = await Product.findOne({ name: productOne.name });
      expect(removedProduct).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Product.deleteMany();
      const products = await Product.find();
      expect(products.length).to.be.equal(0);
    });
  });
});