const mongoose = require('mongoose')
const { stringify } = require('querystring')

const goalschema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'users',
    },
    text:{
        type: String,
        required:[true, 'please add a value']
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model('goal',goalschema)
