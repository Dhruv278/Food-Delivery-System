function createUniqueSlug(restaurantId, itemName) {
    const uniquePart = restaurantId.toString() + '-' + itemName.toLowerCase().replace(/\s+/g, '-');
    // You can also hash this uniquePart for a more secure and shorter slug
    return uniquePart;
  }

module.exports=createUniqueSlug;