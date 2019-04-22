/*require the dev-dependencies*/
let chai = require('chai');
let chaiHttp = require('chai-http');
let index = require('../../index');
let should = chai.should();

chai.use(chaiHttp);

describe('### Htpp POST operations to get records', () => {
    it("should response successful filtered data", (done) => {
        let body =
        {
            "startDate": "2016-09-27",
            "endDate": "2016-09-27",
            "minCount": 2700,
            "maxCount": 2700
        };
        chai.request(index)
            .post('/records')
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('code').eql(0);
                res.body.should.have.property('msg').eql("Success");
                res.body.should.have.property('records');
                res.body.records.should.be.a('array');
                done();
            });
    });

    /** GET unvalidated field requests */
    it("should response error because of the semantic error", (done) => {
        /** minCount > maxCount */
        let body =
        {
            "startDate": "2016-09-27",
            "endDate": "2016-09-27",
            "minCount": 6000,
            "maxCount": 5000
        };
        chai.request(index)
            .post('/records')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('code').eql(1);
                res.body.should.have.property('msg').eql("Error");
                res.body.should.have.property('errors');
                res.body.errors.should.be.a('array');
                done();
            });
    });

    it("should response error because of unvalidated data", (done) => {
        /** startDate and minCount are ridiculouis fields */
        let body =
        {
            "startDate": "xxxx-09-27",
            "endDate": "2016-09-27",
            "minCount": "xyz",
            "maxCount": 5000
        };
        chai.request(index)
            .post('/records')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('code').eql(1);
                res.body.should.have.property('msg').eql("Error");
                res.body.should.have.property('errors');
                res.body.errors.should.be.a('array');
                done();
            });
    });
});