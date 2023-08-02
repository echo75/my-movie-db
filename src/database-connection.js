const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const Cat = mongoose.model('Cat', { name: String, date: Date })

const kitty = new Cat({ name: 'Maja', date: Date.now() })
kitty.save().then(() => console.log('Cat Maja saved to database'))
