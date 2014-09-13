'use strict';

var server = require('../../server'),
	port = server.port,
	chai = require('chai'),
	chaihttp = require('chai-http'),
	expect = chai.expect,
	id;

chai.use(chaihttp);

describe('The link-sharing API', function() {

	it('Adds new links', function(done) {
		chai.request('http://localhost:' + port)
		.post('/api/001')
		.req(function(req) {
			req.send({"linkBody": "test.com"});
		})
		.res(function(res) {
			expect(res).to.have.status(200);
			expect(res.body.linkBody).to.eql('test.com');
			expect(res.body).to.have.property('_id');
			id = res.body._id;
			done();
		});
	});

	it('Displays stored links', function(done) {
		chai.request('http://localhost:' + port)
		.get('/api/001')
		.res(function(res) {
			expect(res).to.have.status(200);
			expect(Array.isArray(res.body)).to.be.true;
			expect(res.body[0]).to.have.property('linkBody');
			done();
		});
	});

	it('Updates links', function(done) {
		chai.request('http://localhost:' + port)
		.put('/api/001/' + id)
		.req(function(req) {
			req.send({"linkBody": "newtest.com"})
		})
		.res(function(res) {
			expect(res).to.have.status(202);
			expect(res.body.linkBody).to.eql('newtest.com');
			done();
		});
	});

	it('Deletes links', function(done) {
		chai.request('http://localhost:' + port)
		.del('/api/001/' + id)
		.res(function(res) {
			expect(res).to.have.status(200);
			expect(res.body.message).to.eql('deleted');
			done();
		});
	});

});