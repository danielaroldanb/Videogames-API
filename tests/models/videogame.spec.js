// const { Videogame,Genre,Platforms, conn } = require('../../src/db.js');
// const { expect } = require('chai');

// describe('Videogame model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Videogame.sync({ force: false }));


//     describe('name', () => {
//       it('should throw an error if name is null', (done) => {
//         Videogame.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('should work when its a valid name', () => {
//         Videogame.create({ name: 'Super Mario Bros' });
//       });


//       it("it should work if a description is entered",()=>{
//         Videogame.create({description:"It is a strategy game that tests the mental agility of the participants to solve general culture questions"})
//       })

//     });
//   });
// });
