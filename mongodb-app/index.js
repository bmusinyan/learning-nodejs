const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/brian", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    data: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);
async function createCourse() {    
    const course = new Course({
        name: 'Node.js course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

// createCourse();

/*
async function getCourses() {
    // get all courses
    // const result = await Course.find();

    // 1. Comparison operators
    // eq, ne, gt, gte, lt, lte, in, nin

    // 2. Logica operators: or, and
    // 3. Filterin can be done using RegEx

    // appying filters
    const result = await Course
        .find({ author: 'Mosh', isPublished: true })
        
        // .find({ price: { $gte: 10, $lte: 20 } })
        // .find({ price: { $in: [10, 15, 20] } })
        
        // .find()
        // .or([ { author: 'Mosh' }, { isPublished: true } ])
        // .and([ { author: 'Mosh' }, { isPublished: true } ])
        
        .limit(10)
        // value 1 means ASC, -1 is DES
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })

    console.log(result);
}
*/

async function getCourses() {
    const pageNumber = 1;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    
    console.log(courses);
}

getCourses();