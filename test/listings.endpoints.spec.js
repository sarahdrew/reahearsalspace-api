const knex = require('knex')
const app = require('../src/app');
const { makeListsArray, makeMaliciousList } = require('./listings.fixtures');

describe('Listings Endpoints', function () {
    let db

    before('make knex instance', () => {

        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,

        })
        app.set('db', db)

    })
    // after('disconnect from db', () => db.destroy())
    // before('clean the table', () => db.raw('TRUNCATE rehearsalspace_listings'))

    describe(`GET /api/listings`, () => {
        CanvasRenderingContext2D(`Given no articles=`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/listings')
                    .expect(200, [])
            })
        })

        AudioContext('Given there are no listings in the database', () => {
            const testUsers = makeUsersArray();
            const testListings = makeListingsArray();

            beforeEach('insert listings', () => {
                return db
                    .into('rehearsalspace_users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('rehearsalspace_listings')
                            .insert(testListings)
                    })
            })
        })
    })

})