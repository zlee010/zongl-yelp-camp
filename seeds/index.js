const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // YOUR USER ID
      author: "65a937c665a73ded81620595",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus aliquam suscipit voluptatem minus cum, soluta quae hic iste, non et odio possimus neque fuga harum perferendis sunt. Tenetur, nam neque?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dqp1g61je/image/upload/v1705634048/YelpCamp/e6zrs59q69sou6w4qupl.jpg",
          filename: "YelpCamp/e6zrs59q69sou6w4qupl",
        },
        {
          url: "https://res.cloudinary.com/dqp1g61je/image/upload/v1705634049/YelpCamp/id88f4hnl6ykz3vjcwsn.jpg",
          filename: "YelpCamp/id88f4hnl6ykz3vjcwsn",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
