import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import mongooseDelete from 'mongoose-delete';

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true,
});

photoSchema.plugin(mongoosePaginate);
photoSchema.plugin(mongooseDelete, {
    overrideMethods: true
});

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;