const { Restaurant } = require('../models/restaurant.model');

const createRestaurant = async (restaurantData) => {
  try {
    const newRestaurant = new Restaurant(restaurantData);
    const savedRestaurant = await newRestaurant.save();
    return savedRestaurant;
  }
  catch (error) {
    throw error;
  }
}

const readRestaurant = async (restaurantName) => {
  try {
    const foundRestaurant = await Restaurant.findOne({ name: restaurantName });
    return foundRestaurant;
  }
  catch (error) {
    throw error;
  }
};

const readAllRestaurants = async () => {
  try {
    const allRestaurants = await Restaurant.find();
    return allRestaurants;
  }
  catch (error) {
    throw error;
  }
}

const readRestaurantByCuisine = async (cuisineName) => {
  try {
    const foundRestaurants = await Restaurant.find({ cuisine: cuisineName });
    return foundRestaurants;
  }
  catch (error) {
    throw error;
  }
}

const updateRestaurantByID = async (restaurantID, updatedData) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantID, updatedData, { new: true })
    return updatedRestaurant;
  }
  catch (error) {
    throw error;
  }
}

const deleteRestaurant = async (restaurantID) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantID);
    return deletedRestaurant;
  }
  catch (error) {
    throw error;
  }
}

const searchRestaurantsByLocation = async (targetLocation) => {
  try {
    const foundRestaurants = await Restaurant.find({ city: targetLocation });
    return foundRestaurants;
  }
  catch (error) {
    throw error;
  }
}

const filterRestaurantsByRating = async (ratingFilter) => {
  try {
    const filteredRestaurants = await Restaurant.find({ averageRating: { $gte: ratingFilter } })
    return filteredRestaurants;
  }
  catch (error) {
    throw error;
  }
}

const addDishToMenu = async (restaurantID, newDish) => {
  try {
    const foundRestaurant = await Restaurant.findById(restaurantID);

    if (!foundRestaurant) {
      throw new Error('Restaurant not found')
    }

    foundRestaurant.menu.push(newDish);
    await foundRestaurant.save();
    return foundRestaurant;
  }
  catch (error) {
    throw error;
  }
}

const removeDishFromMenu = async (restaurantID, dishName) => {
  try {
    const foundRestaurant = await Restaurant.findById(restaurantID);

    if (foundRestaurant) {
      foundRestaurant.menu = foundRestaurant.menu.filter((dish) => dish.name !== dishName);
      await foundRestaurant.save();
      return foundRestaurant;
    }
    else {
      throw new Error('Restaurant not found.')
    }
  }
  catch (error) {
    throw error;
  }
}

const addRestaurantReviewAndRating = async (restaurantID, reviewObj) => {
  try {
    const foundRestaurant = await Restaurant.findById(restaurantID);

    if (!foundRestaurant) {
      throw new Error('Restaurant not found');
    }
    foundRestaurant.reviews.push(reviewObj);
    const restaurantWithUpdatedReviews = await foundRestaurant.save();
    return restaurantWithUpdatedReviews;
  }
  catch (error) {
    throw error;
  }
}

const getUserReviewsForRestaurant = async (restaurantID) => {
  try {
    const foundRestaurant = await Restaurant.findById(restaurantID);

    if (foundRestaurant) {
      const restaurantWithPopulatedDetails = await foundRestaurant.populate('reviews.user');
      console.log(restaurantWithPopulatedDetails);
      const allReviews = restaurantWithPopulatedDetails.reviews.map((review) => {
        return ({
          rating: review.rating,
          review: review.reviewText,
          name: review.user.name,
          userName: review.user.userName,
        })
      })
      return allReviews;
    }
    else {
      throw new Error('Restaurant not found.')
    }
  }
  catch (error) {
    throw error;
  }
}

module.exports = { createRestaurant, readRestaurant, readAllRestaurants, readRestaurantByCuisine, updateRestaurantByID, deleteRestaurant, searchRestaurantsByLocation, filterRestaurantsByRating, addDishToMenu, removeDishFromMenu, addRestaurantReviewAndRating, getUserReviewsForRestaurant };