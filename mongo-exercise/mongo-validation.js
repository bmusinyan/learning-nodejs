const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mongo-exercises", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
    // tags: [ String ],
    // sync validation
    // tags: {
    //     type: Array,
    //     validate: {
    //         validator: function(v) {
    //             return v && v.length > 0;
    //         },
    //         message: 'A course should have at least one tag.'
    //     }
    // },
    // async validation
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 3000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    data: { type: Date, default: Date.now },
    name: { 
        type: String, 
        minlength: 5,
        maxlength: 50,
        // match: /pattern/,
        required: true 
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        trim: true, // mongoose will trim the string before inserting
        lowercase: true, // mongoose will convert the string to lowercase
        // uppercase: true, // mongoose will convert the string to uppercase
    },
    author: String,
    isPublished: Boolean,
    price: {
        type: Number,
        min: 5,
        max: 50,
        get: v => Math.round(v), // gets from db and rounds 
        set: v => Math.round(v), // rounds first and inserts
        required: function() { return this.isPublished; }
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular course',
        author: 'Mosh',
        category: 'web',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 15.8
    });

    try {
        const result = await course.save();
        console.log(result);
    }
    catch(ex) {
        console.log("Error", ex.message);
    }
}

createCourse();