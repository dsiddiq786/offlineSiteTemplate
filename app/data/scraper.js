// Utility function to introduce a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to scrape hotel data from Trivago
const scrapeTrivagoHotels = async () => {
  const hotelsData = [];

  // Get the container holding all property items
  const propertiesContainer = document.querySelector(
    '[data-testid="accommodation-list"].PNIRi0'
  );

  if (propertiesContainer) {
    // Get all property items and slice to limit the number of items processed
    const propertyItems = Array.from(
      propertiesContainer.querySelectorAll(
        '[data-testid="accommodation-list-element"]'
      )
    );

    // Iterate through each property item
    for (const propertyItem of propertyItems) {
      const hotel = {};

      // 1) Property Title
      const titleElement = propertyItem.querySelector('[itemprop="name"]');
      hotel.title = titleElement
        ? titleElement.getAttribute('title').trim()
        : null;

      // 2) Property Type
      const typeElement = propertyItem.querySelector('.O3UXGr');
      hotel.propertyType = typeElement ? typeElement.innerText.trim() : null;

      // 3) Property Rating
      const ratingElement = propertyItem.querySelector('.EXnXoV');
      hotel.rating = ratingElement
        ? parseFloat(ratingElement.innerText.trim())
        : null;

      // 4) Total Ratings
      const totalRatingsElement = propertyItem.querySelector('._1Wh5Tf');
      const ratingsText = totalRatingsElement
        ? totalRatingsElement.innerText.match(/\((\d+)\s+ratings\)/i)
        : null;
      hotel.totalRatings = ratingsText
        ? parseInt(ratingsText[1].trim(), 10)
        : null;

      // 5) Property Image
      const imageElement = propertyItem.querySelector(
        '[data-testid="accommodation-main-image"]'
      );
      hotel.image = imageElement
        ? imageElement.getAttribute('src').trim()
        : null;

      const extraDetails = {
        info: {},
        images: [],
        reviews: {
          otherSitesRatings: [],
          reviewsList: [],
        },
        prices: {
          // Initialize the prices property
          sites: [],
        },
      };

      // 6) Property Details
      const propertyDetailsContainer = document.querySelector(
        '[class="bBv1IN"][data-testid="hotel-highlights-list"]'
      );
      if (propertyDetailsContainer) {
        const details = propertyDetailsContainer.querySelectorAll(':scope > *'); // Direct children
        extraDetails.info.propertyDetails = Array.from(details).map(
          (detail) => {
            const detailTag = detail.querySelector(
              '[data-testid^="highlight-theme-label"]'
            );
            const detailTitle = detail.querySelector('.tODn3R');
            const detailDescription = detail.querySelector('p');

            return {
              tag: detailTag ? detailTag.innerText.trim() : null,
              title: detailTitle ? detailTitle.innerText.trim() : null,
              description: detailDescription
                ? detailDescription.innerText.trim()
                : null,
            };
          }
        );
      } else {
        extraDetails.info.propertyDetails = [];
      }

      // 7) Property Address
      const addressElement = document.querySelector(
        'ul[itemtype="https://schema.org/PostalAddress"][itemprop="address"]'
      );
      if (addressElement) {
        const addressParts = Array.from(
          addressElement.querySelectorAll('li')
        ).map((li) => li.innerText.trim());
        extraDetails.info.propertyAddress = addressParts.join(' ');
      } else {
        extraDetails.info.propertyAddress = null;
      }

      const reviewsButton = propertyItem.querySelector(
        '[data-testid="REVIEW"]'
      );
      if (reviewsButton) {
        reviewsButton.click();
        await delay(7000); // Wait for reviews to load

        // 8) Other Sites Ratings
        const otherSitesContainer = document.querySelector('ul.Np3ubW');
        if (otherSitesContainer) {
          const otherSitesRatings = otherSitesContainer.querySelectorAll(
            'li[data-testid="static-clickout-button"]'
          );
          extraDetails.reviews.otherSitesRatings = Array.from(
            otherSitesRatings
          ).map((site) => {
            const rating = site.querySelector('.NQOBOn');
            const siteImg = site.querySelector('img');
            return {
              rating: rating ? rating.innerText.trim() : null,
              siteImg: siteImg ? siteImg.getAttribute('src') : null,
            };
          });
        }

        // 9) Reviews List
        const reviewsContainer = document.querySelector(
          '[data-testid="hotel-highlights-list"]'
        );
        if (reviewsContainer) {
          const reviews = reviewsContainer.querySelectorAll(
            '.vSC97Y._1Ft94F.oYgmSr'
          );
          extraDetails.reviews.reviewsList = Array.from(reviews).map(
            (review) => {
              const reviewTag = review.querySelector(
                '[data-testid^="highlight-theme-label"]'
              );
              const reviewDescription = review.querySelector('p');
              return {
                reviewTag: reviewTag ? reviewTag.innerText.trim() : null,
                reviewDescription: reviewDescription
                  ? reviewDescription.innerText.trim()
                  : null,
              };
            }
          );
        }
      }

      // Click the "More photos" button to reveal the image gallery
      const morePhotosButton = propertyItem.querySelector(
        '[data-testid="image-control"]'
      );
      if (morePhotosButton) {
        morePhotosButton.click();
        await delay(7000); // Wait for images to load

        // Scrape all image URLs from the gallery
        const imagesContainer = document.querySelector(
          '[class="mH1NiN _7jUS0R"][data-testid="item-overlay-tile-gallery"]'
        );
        if (imagesContainer) {
          const imageElements = imagesContainer.querySelectorAll(
            'img[data-testid="tile-gallery-image"]'
          );
          extraDetails.images = Array.from(imageElements).map((img) =>
            img.getAttribute('src')
          );
        } else {
          extraDetails.images = [];
        }
      } else {
        extraDetails.images = [];
      }

      // Scrape price-related details
      const pricesButton =
        propertyItem.querySelector('[data-testid="DEAL"]') || null;
      if (pricesButton) {
        pricesButton.click();
        await delay(7000); // Wait for prices to load
        const priceContainer = document.querySelector(
          '[data-testid="all-slideout-deals"]'
        );
        if (priceContainer) {
          const siteItems = priceContainer.querySelectorAll(
            '[data-testid="deal-list-item"]'
          );

          // Click "Show more" button to reveal all room prices

          extraDetails.prices.sites = await Promise.all(
            Array.from(siteItems).map(async (site) => {
              const showMoreButton = site.querySelector(
                '[data-testid="show-more-button"]'
              );

              if (showMoreButton) {
                showMoreButton.click();
                await delay(300);
              }

              const roomItems = site.querySelectorAll('._6wF0ay');

              const siteRooms = Array.from(roomItems).map((room) => {
                const roomTitleElement = room.querySelector(
                  '.Oe15OZ.GnH3qg.DjJdAO'
                );
                const roomPropertiesElements = room.querySelectorAll('.UO_QEF');
                const roomPriceElement = room.querySelector(
                  '[data-testid="recommended-price"]'
                );

                return {
                  roomTitle: roomTitleElement
                    ? roomTitleElement.innerText.trim()
                    : null,
                  roomProperties: roomPropertiesElements
                    ? Array.from(roomPropertiesElements).map((prop) =>
                        prop.innerText.trim()
                      )
                    : [],
                  roomPrice: roomPriceElement
                    ? roomPriceElement.innerText.trim()
                    : null,
                };
              });

              // Extract site-level details
              const siteImgElement = site.querySelector(
                '[data-testid="advertiser-logo"]'
              );
              const siteTitleElement = site.querySelector('.CWyAks');

              return {
                siteImg: siteImgElement
                  ? siteImgElement.getAttribute('src')
                  : null,
                siteTitle: siteTitleElement
                  ? siteTitleElement.innerText.trim()
                  : null,
                siteRooms,
              };
            })
          );
        }
      }

      // Add the extraDetails object to the hotel data
      hotel.extraDetails = extraDetails;

      // Click the button to reveal additional details

      // Add the hotel to the hotelsData array
      hotelsData.push(hotel);

      const closeButtonElem = propertyItem.querySelector(
        '[data-testid="slideout-close"]'
      );
      if (closeButtonElem) {
        await delay(300);
        closeButtonElem.click();
      }
    }

    // Log the extracted data
    console.log(hotelsData);
  } else {
    console.error('Properties container not found!');
  }
};

// Call the scraping function
scrapeTrivagoHotels();

// Select all <li> elements with the specified attributes
const listItems = document.querySelectorAll(
  'li[data-testid="accommodation-list-element"]'
);

// Iterate through each <li> element
listItems.forEach((listItem) => {
  // Check if the <span> with the specified attributes exists within the <li>
  const sponsoredBadge = listItem.querySelector(
    'span.OpwHNq.SwVR4I.INpRVL.rF8cXM.SAbeMh[data-testid="sponsored-listing-badge"]'
  );

  // If the sponsored badge is found, remove the <li> element
  if (sponsoredBadge) {
    listItem.remove();
  }
});

// Confirmation message
console.log('Sponsored items removed successfully!');

// Select all buttons with the specified attribute
const buttons = document.querySelectorAll(
  '[data-testid="hotel-highlights-section"]'
);

// Iterate through each button and click it
buttons.forEach((button, index) => {
  setTimeout(() => {
    button.click();
    console.log(`Clicked button ${index + 1}`);
  }, 2000); // Add a delay between clicks to avoid overloading the website
});

// Confirmation message

// Assume your JSON data is stored in a variable called `data`
let trivagJSON = [
  // Add your JSON objects here (this is an example item)
  {
    lowestPrice: {
      siteTitle: 'Stayforlong',
      price: 316,
      room: {
        roomTitle: 'Five Bedroom Villa - Bed And Breakfast',
        roomProperties: ['Breakfast included'],
      },
    },
    title: 'Roda Beach Resort',
    propertyType: null,
    rating: 8.7,
    totalRatings: 3012,
    image:
      '/trivagoImages/imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen_60,f_auto,h_534,q_40,w_800/hotelier-images/90/40/86ad21545991d24fe3adbe29fccd6ddd75eba4998dff2ad8b478a26a0eb0.jpeg',
    extraDetails: {
      info: {
        propertyDetails: [
          {
            tag: 'Facilities and amenities',
            title: 'Outdoor Pool and Sundeck',
            description:
              'Relax by the outdoor pool, soak up the sun on the sundeck, or enjoy a refreshing drink at the poolside bar.',
          },
          {
            tag: 'Activities',
            title: 'Water Sports Adventures',
            description:
              'Experience thrilling water sports like kayaking, kite surfing, stand-up paddleboarding, and parasailing.',
          },
          {
            tag: 'Wellness',
            title: 'Fitness Center and Sauna',
            description:
              'Stay active with the well-equipped fitness center or unwind in the sauna after a day of exploring.',
          },
          {
            tag: 'Family-friendly',
            title: 'Family-Friendly Atmosphere',
            description:
              'The resort is a popular choice for families, offering spacious villas and a range of activities for all ages.',
          },
          {
            tag: 'Style',
            title: 'Close to Sunset Mall',
            description:
              'Enjoy upscale shopping at Sunset Mall, just across the street from the resort.',
          },
          {
            tag: 'Facilities and amenities',
            title: 'Direct Beach Access',
            description:
              'Enjoy direct access to the beach, perfect for sunbathing, swimming, and enjoying the sea breeze.',
          },
          {
            tag: 'Views',
            title: 'Beachfront Location',
            description:
              'The resort boasts a prime location right on the beach, offering stunning views and easy access to water activities.',
          },
          {
            tag: 'Experience',
            title: 'Exceptional Service',
            description:
              'Guests consistently praise the friendly and helpful staff, particularly mentioning Sanabir, the bellboy.',
          },
          {
            tag: 'Experience',
            title: 'Grocery Delivery Service',
            description:
              'Enjoy the convenience of having groceries delivered directly to your room.',
          },
          {
            tag: 'Experience',
            title: 'Culinary Delights',
            description:
              'Indulge in a variety of dining options at the resort, from casual cafe fare to delicious meals.',
          },
        ],
        propertyAddress: '2 Al Nessnass Street, Dubai, United Arab Emirates',
        about:
          'Roda Beach Resort is centrally located in 2 Al Nessnass Street, Dubai, United Arab Emirates, offering a luxurious stay with top-notch amenities. Enjoy the convenience of having groceries delivered directly to your room. The resort boasts a prime location right on the beach, offering stunning views and easy access to water activities. The resort is a popular choice for families, offering spacious villas and a range of activities for all ages. Experience thrilling water sports like kayaking, kite surfing, stand-up paddleboarding, and parasailing. Indulge in a variety of dining options at the resort, from casual cafe fare to delicious meals. Whether for business or leisure, this property ensures a comfortable and memorable stay for all guests.',
        checkIn: '14:00',
        checkOut: '11:00',
      },
      images: [
        '/trivagoImages/imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen_60,f_auto,h_267,q_40,w_400/hotelier-images/90/40/86ad21545991d24fe3adbe29fccd6ddd75eba4998dff2ad8b478a26a0eb0.jpeg',
        '/trivagoImages/imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen_60,f_auto,h_267,q_40,w_400/hotelier-images/43/b1/e489273aa36625d0668ec4033124e13ed771c1b5c90608a81db3d2b4560a.jpeg',
        '/trivagoImages/imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen_60,f_auto,h_267,q_40,w_400/partner-images/a3/51/2bd8fea7721d0a0cd352b6e5310da32db367cfc8a463e1c1d551b46d9934.jpeg',
        '/trivagoImages/imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen_60,f_auto,h_267,q_40,w_400/partner-images/51/ba/8bd6494718c63614ec57082794a5b9ffbb7e3920e151d0114a9baa2ced11.jpeg',
        '/trivagoImages/imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen_60,f_auto,h_267,q_40,w_400/partner-images/02/e8/a7b6e9b1a034f3125cd1fd46b5010407425223f63f0a07178756e0e34386.jpeg',
        '/trivagoImages/imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen_60,f_auto,h_267,q_40,w_400/hotelier-images/a9/8b/c68f2b0ec00d799489072560025085005ecfa5d1f42ce5eea4c9ed70316c.jpeg',
        '/trivagoImages/imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen_60,f_auto,h_267,q_40,w_400/partner-images/43/1e/bafb39010c5e2725e5bb09c2e2901255d44230ce88c4cf203540caef69b2.jpeg',
        '/trivagoImages/imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen_60,f_auto,h_267,q_40,w_400/partner-images/63/2a/8c2fd8801049911762d68fde88f8bb5464d8bda03afe85c88a9388c5ec87.jpeg',
        '/trivagoImages/imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen_60,f_auto,h_267,q_40,w_400/partner-images/2d/28/0eb428b1bee04079ebb1e3a3de67b34839b3482e7f2c4031516f2fdd02e4.jpeg',
        '/trivagoImages/imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen_60,f_auto,h_267,q_40,w_400/partner-images/95/36/56c51e2a89dd6adcb9b60b8da1d3536b78557161a5cbfb01db5e6a7da841.jpeg',
        '/trivagoImages/imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen_60,f_auto,h_267,q_40,w_400/partner-images/77/14/ff38221d3bd4dd18e4777e63bf33b8c743dff8beffd937fe4591ceb183c5.jpeg',
      ],
      reviews: {
        otherSitesRatings: [
          {
            rating: '8.6',
            siteImg:
              '/trivagoImages/imgcy.trivago.com/e_trim/f_auto,dpr_2,h_auto,q_auto,w_70/partnerlogos-s3/395.webp',
          },
          {
            rating: '8.6',
            siteImg:
              '/trivagoImages/imgcy.trivago.com/e_trim/f_auto,dpr_2,h_auto,q_auto,w_70/partnerlogos-s3/406.webp',
          },
          {
            rating: '8.6',
            siteImg:
              '/trivagoImages/imgcy.trivago.com/e_trim/f_auto,dpr_2,h_auto,q_auto,w_70/partnerlogos-s3/3340.webp',
          },
        ],
        reviewsList: [
          {
            reviewTag: 'Services',
            reviewDescription:
              'Guests consistently praise the friendly and helpful staff, particularly mentioning Sanabir, the bellboy.',
          },
          {
            reviewTag: 'Facilities and amenities',
            reviewDescription:
              'Relax by the outdoor pool, soak up the sun on the sundeck, or enjoy a refreshing drink at the poolside bar.',
          },
          {
            reviewTag: 'Location',
            reviewDescription:
              'Enjoy upscale shopping at Sunset Mall, just across the street from the resort.',
          },
          {
            reviewTag: 'Comfort',
            reviewDescription:
              'The resort is a popular choice for families, offering spacious villas and a range of activities for all ages.',
          },
        ],
      },
      prices: {
        sites: [
          {
            siteImg: null,
            siteTitle: 'Hotel site•Featured',
            siteRooms: [
              {
                roomTitle: 'Room Only Rate Beach View Superior Room',
                roomProperties: ['Breakfast included'],
                roomPrice: '$326',
              },
              {
                roomTitle: 'Bed & Breakfast Rate Beach View Superior Room',
                roomProperties: ['Breakfast included'],
                roomPrice: '$356',
              },
              {
                roomTitle:
                  'Room Only Rate Seashell Paradise Five Bedroom Suite',
                roomProperties: ['Breakfast included'],
                roomPrice: '$744',
              },
              {
                roomTitle:
                  'Bed & Breakfast Rate Seashell Paradise Five Bedroom Suite',
                roomProperties: ['Breakfast included'],
                roomPrice: '$774',
              },
            ],
          },
          {
            siteImg:
              '/trivagoImages/imgcy.trivago.com/e_trim/f_auto,dpr_2,bo_1px_solid_transparent,c_pad,h_16,q_auto,w_16/partnerlogos-squared/395.webp',
            siteTitle: 'Agoda',
            siteRooms: [
              {
                roomTitle: 'Beach View Superior Room',
                roomProperties: [],
                roomPrice: '$316',
              },
              {
                roomTitle: 'Beach View Superior Room',
                roomProperties: ['Pay at the property'],
                roomPrice: '$359',
              },
              {
                roomTitle: 'Beach View Superior Room',
                roomProperties: ['Breakfast included', 'Pay at the property'],
                roomPrice: '$393',
              },
              {
                roomTitle: 'Beach View Superior Room',
                roomProperties: ['Breakfast included'],
                roomPrice: '$393',
              },
              {
                roomTitle: 'Beach View Superior Room',
                roomProperties: ['Half board', 'Pay at the property'],
                roomPrice: '$432',
              },
              {
                roomTitle: 'Beach View Superior Room',
                roomProperties: ['Half board'],
                roomPrice: '$432',
              },
            ],
          },
          {
            siteImg:
              '/trivagoImages/imgcy.trivago.com/e_trim/f_auto,dpr_2,bo_1px_solid_transparent,c_pad,h_16,q_auto,w_16/partnerlogos-squared/626.webp',
            siteTitle: 'Booking.com',
            siteRooms: [
              {
                roomTitle: 'Check Booking Site For Details.',
                roomProperties: [],
                roomPrice: '$359',
              },
              {
                roomTitle: 'Check Booking Site For Details.',
                roomProperties: ['Breakfast included'],
                roomPrice: '$393',
              },
            ],
          },
          {
            siteImg:
              '/trivagoImages/imgcy.trivago.com/e_trim/f_auto,dpr_2,bo_1px_solid_transparent,c_pad,h_16,q_auto,w_16/partnerlogos-squared/1912.webp',
            siteTitle: 'Stayforlong',
            siteRooms: [
              {
                roomTitle: 'Deluxe Five Bedroom Villa - Room Only',
                roomProperties: [],
                roomPrice: '$667',
              },
              {
                roomTitle: 'Five Bedroom Villa - Room Only',
                roomProperties: [],
                roomPrice: '$701',
              },
              {
                roomTitle: 'Five Bedroom Villa - Room Only',
                roomProperties: [],
                roomPrice: '$704',
              },
              {
                roomTitle: 'Five Bedroom Villa - Bed And Breakfast',
                roomProperties: ['Breakfast included'],
                roomPrice: '$2,564',
              },
              {
                roomTitle: 'Five Bedroom Villa - Bed And Breakfast',
                roomProperties: ['Breakfast included'],
                roomPrice: '$2,577',
              },
            ],
          },
          {
            siteImg:
              '/trivagoImages/imgcy.trivago.com/e_trim/f_auto,dpr_2,bo_1px_solid_transparent,c_pad,h_16,q_auto,w_16/partnerlogos-squared/1816.webp',
            siteTitle: 'roomsXXL',
            siteRooms: [
              {
                roomTitle: 'Room Only Suite - Five Bedrooms',
                roomProperties: ['Pay at the property'],
                roomPrice: '$669',
              },
              {
                roomTitle: 'Room Only Five Bedroom Villa',
                roomProperties: [],
                roomPrice: '$701',
              },
              {
                roomTitle: 'Room Only Deluxe Five Bedroom Villa',
                roomProperties: [],
                roomPrice: '$713',
              },
              {
                roomTitle: 'Bed And Breakfast Five Bedroom Villa',
                roomProperties: ['Breakfast included'],
                roomPrice: '$2,543',
              },
            ],
          },
          {
            siteImg:
              '/trivagoImages/imgcy.trivago.com/e_trim/f_auto,dpr_2,bo_1px_solid_transparent,c_pad,h_16,q_auto,w_16/partnerlogos-squared/1756.webp',
            siteTitle: 'ZenHotels.com',
            siteRooms: [
              {
                roomTitle: '5 Bedrooms Villa',
                roomProperties: [],
                roomPrice: '$670',
              },
              {
                roomTitle: '5 Bedrooms Villa',
                roomProperties: ['Breakfast included'],
                roomPrice: '$2,450',
              },
            ],
          },
        ],
      },
    },
    id: 'c01b6133-99f7-4bfa-a710-a6eed9e39960',
    popularChoice: false,
    stayOption: 'Other',
    location: 'City center',
    stars: 1,
    payment: ['Pay at the property', 'Free cancellation'],
    mealOptions: ['Half board', 'Breakfast included'],
    amenities: [
      'Pool',
      'Washer & dryer',
      'EV charging',
      'Outdoor space',
      'Restaurant',
      'Casino',
      'Golf course',
    ],
    accessibility: [
      'Service animals allowed',
      'Sign language-capable staff',
      'In-room accessibility',
    ],
    familyFriendly: ['Playground', "Kids' pool"],
    activities: ['Sailing', 'Horse riding', 'Arcade/Video games'],
    cityCenterCoordinates: [25.276, 55.2963],
    propertyCoordinates: [25.276, 55.2963],
  },
  // More items...
];

// Iterate over the items and make the updates
trivagJSON.forEach((item) => {
  if (item.stayOption === 'Other') {
    // Update stayOption
    item.stayOption = 'Houses / Apartments';

    // Update propertyType
    const possiblePropertyTypes = ['Entire House / Apartment', 'Casa rural'];
    item.propertyType =
      possiblePropertyTypes[
        Math.floor(Math.random() * possiblePropertyTypes.length)
      ];
  }
});

// Log the updated data to verify
