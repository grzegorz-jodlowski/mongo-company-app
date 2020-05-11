const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (error) {
    res.status(500).json({ message: 'OK' });
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const randomProduct = await Product.findOne().skip(rand);

    if (randomProduct) {
      res.json(randomProduct)
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.postProduct = async (req, res) => {
  try {
    const { name, client } = req.body;

    const newProduct = new Product({ name, client });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: error });
  }

}

exports.updateProduct = async (req, res) => {
  try {
    const { name, client } = req.body;

    const updatedElement = {};
    name ? updatedElement.name = name : null;
    client ? updatedElement.client = client : null;

    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.updateOne({ _id: req.params.id }, { $set: updatedElement });
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'OK' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
