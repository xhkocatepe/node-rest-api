let mongoose = require("mongoose");
const RecordModel = require('../models/record');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let index = require('../../index');
let should = chai.should();

chai.use(chaiHttp);

describe('### GET Records', () => {
    it("should body includes contents", (done) => {
        let body =
        {
            "startDate": "2016-09-27",
            "endDate"  : "2016-09-27",
            "minCount" : 2700,
            "maxCount" : 2700
        };
        chai.request(index)
            .post('/records')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('code').eql(1);
                res.body.should.have.property('errors');
                res.body.errors.should.be.a('array');
                // res.body.errors.should.have.property('field');
                // res.body.errors.pages.should.have.property('kind').eql('required');
            done();
            });
    });
});