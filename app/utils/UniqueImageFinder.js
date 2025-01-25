export default function ExtractUniqueImages(items) {
  const imageSet = new Set();

  items.forEach((item) => {
    // // Add the 'image' property
    // if (item.image) {
    //   imageSet.add(item.image);
    // }

    // // Add all images in the 'images' array
    // if (item.extraDetails?.images) {
    //   item.extraDetails.images.forEach((img) => imageSet.add(img));
    // }

    // Add all site images ('siteImg') from the 'prices.sites' array
    if (item.extraDetails?.prices?.sites) {
      item.extraDetails.prices.sites.forEach((site) => {
        if (site.siteImg) {
          imageSet.add(site.siteImg);
        }
      });
    }

    // Add all site images ('siteImg') from the 'reviews.otherSitesRatings' array
    if (item.extraDetails?.reviews?.otherSitesRatings) {
      item.extraDetails.reviews.otherSitesRatings.forEach((rating) => {
        if (rating.siteImg) {
          imageSet.add(rating.siteImg);
        }
      });
    }
  });

  return Array.from(imageSet); // Convert the Set to an array
}
