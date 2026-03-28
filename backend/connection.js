const mongoose = require('mongoose');
const url = 'mongodb+srv://mmm:mmm@cluster0.gvyon.mongodb.net/mydb734?appName=Cluster0';
mongoose.connect(url).then((result) => {
    console.log('connected to database');
}).catch((err) => {
    console.error('error connecting to database:', err);
});

module.exports = mongoose;