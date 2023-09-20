const express = require('express');
const restaurantsRouter = express.Router();
const { createRestaurant, readRestaurant, readAllRestaurants, readRestaurantByCuisine, updateRestaurantByID, deleteRestaurant, searchRestaurantsByLocation, filterRestaurantsByRating, addDishToMenu, removeDishFromMenu, addRestaurantReviewAndRating, getUserReviewsForRestaurant } = require('../functions/restaurant.functions');

restaurantsRouter.post('/', async (req, res) => {
  const restaurantDetails = req.body;

  try {
    const newRestaurant = await createRestaurant(restaurantDetails);
    if (newRestaurant) {
      res.status(201).json({ message: "Restaurant created.", restaurant: newRestaurant })
    } else {
      res.status(400).json({ message: "Couldn't add new restaurant." })
    }
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

restaurantsRouter.get('/', async (req, res) => {
  try {
    const foundRestaurants = await readAllRestaurants();
    if (foundRestaurants) {
      res.status(200).json({ message: "Found all restaurants.", restaurants: foundRestaurants })
    } else {
      res.status(404).json({ message: "Couldn't fetch restaurants." })
    }
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

restaurantsRouter.get('/search', async (req, res) => {
  const { location } = req.query;
  console.log(req.query, location);
  try {
    const foundRestaurants = await searchRestaurantsByLocation(location);

    if (foundRestaurants) {
      res.status(200).json({ message: "Restaurants found.", restaurants: foundRestaurants })
    } else {
      res.status(404).json({ message: "Couldn't find the restaurant" })
    }
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

restaurantsRouter.get('/cuisine/:cuisineType', async (req, res) => {
  const { cuisineType } = req.params;
  try {
    const foundRestaurants = await readRestaurantByCuisine(cuisineType);
    if (foundRestaurants) {
      res.status(200).json({ message: 'Restaurants found acc to cuisine.', restaurant: foundRestaurants })
    } else {
      res.status(404).json({ message: "Couldn't find restaurants." })
    }
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

restaurantsRouter.get('/:restaurantName', async (req, res) => {
  const { restaurantName } = req.params;
  try {
    const foundRestaurant = await readRestaurant(restaurantName);
    if (foundRestaurant) {
      res.status(200).json({ message: 'Restaurant found.', restaurant: foundRestaurant })
    }
    else {
      res.status(404).json({ message: "Couldn't find the restaurant." })
    }
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

restaurantsRouter.post('/:restaurantID', async (req, res) => {
  const { restaurantID } = req.params;
  const updatedData = req.body;

  try {
    const updatedRestaurant = await updateRestaurantByID(restaurantID, updatedData);
    if (updatedRestaurant) {
      res.status(201).json({ message: 'Restaurant updated.', restaurant: updatedRestaurant })
    } else {
      res.status(404).json({ message: "Couldn't find the restaurant" })
    }
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

restaurantsRouter.delete('/:restaurantID', async (req, res) => {
  const { restaurantID } = req.params;

  try {
    const deletedRestaurant = await deleteRestaurant(restaurantID);
    if (deletedRestaurant) {
      res.status(200).json({ message: 'Restaurant deleted.', restaurant: deletedRestaurant })
    } else {
      res.status(404).json({ message: "Couldn't find the restaurant to be deleted" })
    }
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

restaurantsRouter.get('/rating/:minRating', async (req, res) => {
  const minRating = parseFloat(req.params.minRating);
  try {
    const foundRestaurants = await filterRestaurantsByRating(minRating);

    if (foundRestaurants) {
      res.status(200).json({ message: "Restaurants found.", restaurants: foundRestaurants })
    } else {
      res.status(404).json({ message: "Couldn't find any restaurant" })
    }
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

restaurantsRouter.post('/:restaurantID/menu', async (req, res) => {
  const { restaurantID } = req.params;
  const newDish = req.body;

  try {
    const updatedRestaurant = await addDishToMenu(restaurantID, newDish);

    if (updatedRestaurant) {
      res.status(200).json({ message: "New Dish added.", restaurant: updatedRestaurant })
    } else {
      res.status(404).json({ message: "Couldn't find the restaurant" })
    }
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

restaurantsRouter.delete('/:restaurantID/menu/:dishName', async (req, res) => {
  const { restaurantID, dishName } = req.params;
  try {
    const updatedRestaurant = await removeDishFromMenu(restaurantID, dishName);
    if (updatedRestaurant) {
      res.status(201).json({ message: "Dish removed successfully.", restaurant: updatedRestaurant })
    } else {
      res.status(404).json({ message: "Couldn't find the restaurant" })
    }
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

restaurantsRouter.post('/:restaurantID/reviews', async (req, res) => {
  const { restaurantID } = req.params;
  const reviewObj = req.body

  try {
    const updatedRestaurant = await addRestaurantReviewAndRating(restaurantID, reviewObj);
    if (updatedRestaurant) {
      res.status(201).json({ message: "Review added successfully.", restaurant: updatedRestaurant })
    } else {
      res.status(404).json({ message: "Couldn't find the restaurant" })
    }
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

restaurantsRouter.get('/:restaurantID/reviews', async (req, res) => {
  const { restaurantID } = req.params;
  try {
    const allReviews = await getUserReviewsForRestaurant(restaurantID);
    if (allReviews) {
      res.status(200).json({ message: "Reviews fetched successfully.", reviews: allReviews })
    } else {
      res.status(404).json({ message: "Couldn't find the restaurant" })
    }
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

module.exports = restaurantsRouter;