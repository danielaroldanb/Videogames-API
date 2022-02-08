// /* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
// const session = require('supertest-session');
// const app = require('../../src/app.js');
// const { Videogame, conn } = require('../../src/db.js');

// const agent = session(app);


// describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   // beforeEach(() => Videogame.sync({ force: false }));

//   describe('GET /videogames and GET /videogame', () => {
//     it(' get videogeames, should return status 200', async () => await agent.get('/videogames').expect(200));
//     it('Search by name, should return status 200',async () => await agent.get('/videogames?name=sonic').expect(200));
//     it('Get by ID, should return status 200',async () => await agent.get('/videogame/1').expect(200));
//   });
// });
