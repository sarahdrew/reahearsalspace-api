const path = require('path');
const express = require('express')
const xss = require('xss')
const ListingsService = require('./listings-service');
const JwtMiddleware = require('../middleware/jwt-auth');

const listingsRouter = express.Router();
const jsonParser = express.json();

const serializeListing = listing => ({
    id: listing.id,
    location: listing.location,
    size: listing.size,
    description: listing.description,
    amenities: listing.amenities,
})

listingsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        ListingsService.getAllListings(knexInstance)
            .then(listings => {

                res.json(listings.map(serializeListing))
            })
            .catch(next)
    })
    .post(jsonParser, JwtMiddleware.requireAuth, (req, res, next) => {
        const { location, size, description, amenities } = req.body
        const newListing = { location, size, description }
        console.log(newListing);

        const amenityList = [];
        for (const amenity in amenities) {
            if (amenities.hasOwnProperty(amenity)) {
                const hasAmenity = amenities[amenity];
                if (hasAmenity) {
                    amenityList.push(amenity);
                }
            }
        }

        newListing.amenities = amenityList.join(',');

        for (const [key, value] of Object.entries(newListing))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing ${key} in request body` }
                })


        ListingsService.insertListing(
            req.app.get('db'),
            newListing
        )
            .then(listing => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${listing.id}`))
                    .json(serializeListing(listing))

            })
            .catch(next)
    })

listingsRouter
    .route('/:listing_id')
    .all((req, res, next) => {
        ListingsService.getById(
            req.app.get('db'),
            req.params.listing_id
        )
            .then(listing => {
                if (!listing) {
                    return res.status(404).json({
                        error: { message: `Listing doesn't exist` }
                    })
                }
                res.listing = listing
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeListing(res.listing))
    })
    .delete((req, res, next) => {
        ListingsService.deleteListing(
            req.app.get('db'),
            req.params.listing_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { location, size, description } = req.body
        const listingToUpdate = { location, size, description }

        const numberOfValues = Object.values(listingToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'location', 'size', or 'description.' `
                }
            })

        ListingsService.updateListing(
            req.app.get('db'),
            req.params.listing_id,
            listingToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
module.exports = listingsRouter