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
       .find({ isPublished: true })
       .or([ { price: { $gte: 15 } }, { name: /.*by.*/i } ])
       .select();

    console.log(courses);
}

getCourses();