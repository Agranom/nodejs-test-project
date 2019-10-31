const request = require('supertest');
const chai = require('chai');

const server = require('../app');

const expect = chai.expect;

describe('GET /items', () => {

    afterEach(() => {
        server.close()
    });

    it('should return list of items', async () => {
        const res = await request(server)
            .get('/items')
            .expect(200);
        const {body} = res;

        expect(body).to.be.an('array');
        expect(body).to.have.lengthOf(2);
    });
});
