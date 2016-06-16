var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = 'test';
var server = require('../server');
var Item = require('../models/item');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);


describe('Shopping List', function() {
before(function(done) {
    seed.run(function() {
        done();
    });
});
    
  it('should list items on get', function(done){
        chai.request(app)
            .get('/items')
            .end(function(error, response){
                console.log(Item);
                should.equal(error, null);
                response.should.have.status(200);
                response.should.be.json;
                //Item.length.should.be.equal(3);
                //Item.should.be.a('array');
                done();
            });
    });
    
    //testing the post endpoint for application
    it('should add an item on post', function(done){
        chai.request(app)
        .post('/items')
        .send({'id':'4', 'name': 'banannas'})
        .end(function(error, response){
            //console.log(response.request.text);
            response.should.be.json;
            response.should.be.a('object');
            response.body.should.have.property('name');
            response.body.should.have.property('_id');
            //console.log(Item);
            done();
        });
    });
    
    //testing the put endpoint for application
    it('should edit an item on put', function(done){
      chai.request(app)
      .put('/items/:id')
      .send({'id': '2', 'name': 'bannanas' })
      .end(function(error, response){
          //response.should.be.json;
          //response.body.name.should.be.a('string');
          //response.should.have.status(200);
          //response.body.should.have.property('name');
          //response.body.should.have.property('id');
          //storage.items[2].name.should.equal('bannanas');
          //storage.items[2].id.should.equal('2');
          done();
      });
    });
    
    //testing the delete endpoint for application
    it('should delete an item on delete', function(done){
        chai.request(app)
        .delete('/items/1')
        .end(function(error, response){
          response.should.be.json;
          //response.should.have.status(201);
          //response.body.id.should.equal(1);
          //storage.items.should.have.length(3);
          done();
        });
    });
    
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});