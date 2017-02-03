process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server/index.js');

chai.use(chaiHttp);


describe('GET /api/survey/:surveyID', function() {
  it('should return a 200 status', function(done) {
    chai.request(server)
    .get('/api/survey/1')
    .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json; // jshint ignore:line
    done();
    });
  });
  it('should return the user survey', function(done) {
    chai.request(server)
    .get('/api/survey/1')
    .end(function(err, res) {
    res.should.be.a('object')
    done();
    });
  });
  it('should add a survey when post is executed', function(done) {
    chai.request(server)
    .post('/api/survey/')
    .send({
      name: 'what is your favorite color',
      selections: [
        {
          id: 1,
          text: 'red'
        },
        {
          id: 2,
          text: 'blue'
        },
        {
          id: 3,
          text: 'pink'
        },
        {
          id: 4,
          text: 'black'
        }
      ]
    })
    .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json; // jshint ignore:line
    done();
    });
  });
});
