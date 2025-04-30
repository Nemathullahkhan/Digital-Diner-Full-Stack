import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizers', 'Main Courses', 'Desserts', 'Drinks', 'Breads','Rice Dishes','Side Dishes']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  ingredients: {
    type: [String],
    default: []
  },
  isVeg: {
    type: Boolean,
    default: false
  },
  isGlutenFree: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);