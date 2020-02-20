const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/playground", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
	name: String,
	bio: String,
	website: String
});

const Author = mongoose.model('Author', authorSchema);

// const Course = mongoose.model('Course', new mongoose.Schema({
// 	name: String,
// 	author: {
// 		type: authorSchema,
// 		required: true // if you don't want to allow this sub-doc to be deleted
// 	}
// }));

// with multiple authers
const Course = mongoose.model('Course', new mongoose.Schema({
	name: String,
	authors: [ authorSchema ]
}));

async function createCourse(name, authors) {
	const course = new Course({
		name, 
		authors
	}); 
  
	const result = await course.save();
	console.log(result);
}
// async function createCourse(name, author) {
// 	const course = new Course({
// 		name, 
// 		author
// 	}); 
  
// 	const result = await course.save();
// 	console.log(result);
// }

async function listCourses() { 
	const courses = await Course.find();
	console.log(courses);
}

async function updateAuthor(courseId) {
	// updating sub doc by querying first
	// const course = await Course.findById(courseId);
	// course.author.name = 'Brian Musinyan';
	// course.save();

	// directly updating sub document
	const course = await Course.updateOne({ _id: courseId }, {
		$set: {
			'author.name': 'Brian Jan'
		}
		// use $unset to remove a property
		// $unset: {
			// 'author.name': '',
			// removes the whole sub-doc
			// 'author': ''
		// }
	});
}

async function addAuthor(courseId, author) {
	const course = await Course.findById(courseId);
	course.authors.push(author);
	course.save();
}

// addAuthor('5e4da5dff52dc934dcc9490f', new Author({ name: 'Amy' }));

async function removeAuthor(courseId, authorId) {
	const course = await Course.findById(courseId);
	const author = course.authors.id(authorId);
	author.remove();
	course.save();
}

removeAuthor('5e4da5dff52dc934dcc9490f', '5e4da71203ec7d3068e694c7');

// updateAuthor('5e4d9c48f05f413204e76c76');

// createCourse('Node Course', new Author({ name: 'Mosh' }));

// add multiple authors
// createCourse('Node Course', [ 
// 	new Author({ name: 'Mosh' }),
// 	new Author({ name: 'Brian' }),
// ]);


