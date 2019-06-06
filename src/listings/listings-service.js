//this is the file to store ListingsService object and put methods on the object that stores the transactions

const ListingsService = {
    getAllArticles(knex) {
        return knex.select('*').from('rehearsalspace_listings')
    },
    insertListing(knex, newListing) {
        return knex
            .insert(newListing)
            .into('rehearsalspace_listings')
            .returning('*')
            .then(rows => {
                return rows[0]
            })

    },
    getById(knex, id) {
        return knex.from('rehearsalspace_listings')
            .select('*')
            .where('id', id).first()
    },
    deleteListing(knex, id) {
        return knex('rehearsalspace_listings')
            .where({ id })
            .delete()
    },
    updateListing(knex, id, newListingFields) {
        return knex('reahearsalspace_listings')
            .where({ id })
            .update(newListingFields)
    }
}
module.exports = ListingsService