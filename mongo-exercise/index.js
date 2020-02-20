const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mongo-exercises", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
    tags: [ String ],
    data: { type: Date, default: Date.now },
    name: { type: String, required: true },
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function updateCourse(id) {
    // Approach #1: Query first
    // findById()
    // Modify its properties
    // save()
    /*
    const course = await Course.findById(id);
    if (!course) {
        console.log("Could not find a course with provided ID");
        return;
    }

    course.isPublished = true;
    course.author = 'Another author';

    const result = await course.save();
    console.log(result);    
    */

    // Approach #2: Update first
    // Update directly
    // Optionally: get the updated document
    
    // this does not return the updated course, just lets you know how
    // many records where successfully updated
    // const result = await Course.update({ _id: id }, {
    //     $set: {
    //         author: 'Mosh',
    //         isPublished: false
    //     }
    // });

    // if we need the original course back before updating
    // const result = await Course.findByIdAndUpdate(id, {
    //     $set: {
    //         author: 'Mosh',
    //         isPublished: false
    //     }
    // });

    //if we need updated course info
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jack',
            isPublished: true
        }
    }, {
        new: true
    });

    console.log(result);
}

// this does not work because findById works with ObjectId types, not strings
// these values were inserted as strings
// updateCourse('5e4cb7f87cf7154dc8e77975');


// removin a course
async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    const course = await Course.findByIdAndDelete(id);

    console.log(course);
}

// removeCourse('5e4cb7f87cf7154dc8e77974');