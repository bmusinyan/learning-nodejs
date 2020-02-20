const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mongo-exercises", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
    tags: [ String ],
    data: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    const courses = await Course
        // .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
        .find({ isPublished: true })
        .or([ { tags: 'backend' }, { tags: 'frontend' } ])
        .sort({ price: -1 })
        // .sort('-price')
        .select({ price: 1, name: 1, author: 1 });
        // .select('price name author')

    console.log(courses);
}

getCourses();