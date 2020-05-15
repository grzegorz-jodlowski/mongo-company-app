const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const Department = require('../../models/department.model');

describe('GET /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();

    const testDepTwo = new Department({ _id: '5d9f1159f81ce8d1ef2bee48', name: 'Department #2' });
    await testDepTwo.save();
  });

  after(async () => {
    await Department.deleteMany();
  });

  it('/ should return all departments', () => {

  });

  it('/:id should return one department by :id ', () => {

  });

  it('/random should return one random department', () => {

  });

});