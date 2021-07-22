const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 200; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '60f1b780c887690e84662a40',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor provident nisi perspiciatis, voluptatem placeat tempore quod, veritatis repellat repellendus obcaecati quas voluptate dolorem, est veniam quos blanditiis voluptas eius sed!',
			price,
			geometry: {
				coordinates: [
					cities[random1000].longitude,
					cities[random1000].latitude,
				],
				type: 'Point',
			},
			images: [
				{
					url: 'https://res.cloudinary.com/doi3pisej/image/upload/v1626709723/YelpCamp/uwucp7yqagftbiyqex12.jpg',
					filename: 'YelpCamp/uwucp7yqagftbiyqex12',
				},
				{
					url: 'https://res.cloudinary.com/doi3pisej/image/upload/v1626709726/YelpCamp/lxtozdztsrhhdchisali.jpg',
					filename: 'YelpCamp/lxtozdztsrhhdchisali',
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
