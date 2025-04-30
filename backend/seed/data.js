import {MenuItem} from "../models/menuModel.js"; // Adjust path as needed

const menuItems = [
  // Appetizers
  {
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    price: 4.99,
    category: 'Appetizers',
    image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/03/samosa-recipe-500x500.jpg',
    ingredients: ['Potatoes', 'Peas', 'Spices', 'Pastry'],
    isVeg: true,
    isGlutenFree: false,
  },
  {
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese grilled with spices',
    price: 6.99,
    category: 'Appetizers',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/05/paneer-tikka-recipe-1.jpg',
    ingredients: ['Paneer', 'Yogurt', 'Spices', 'Bell Peppers'],
    isVeg: true,
    isGlutenFree: true,
  },
  {
    name: 'Vegetable Pakora',
    description: 'Mixed vegetables fried in chickpea batter',
    price: 5.29,
    category: 'Appetizers',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/vegetable-pakora-recipe-1.jpg',
    ingredients: ['Vegetables', 'Chickpea Flour', 'Spices'],
    isVeg: true,
    isGlutenFree: true,
  },
  {
    name: 'Chicken 65',
    description: 'Spicy fried chicken bites with curry leaves',
    price: 7.49,
    category: 'Appetizers',
    image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/06/chicken-65-recipe-500x500.jpg',
    ingredients: ['Chicken', 'Spices', 'Curry Leaves'],
    isVeg: false,
    isGlutenFree: false,
  },
  {
    name: 'Dahi Vada',
    description: 'Lentil dumplings soaked in spiced yogurt',
    price: 4.79,
    category: 'Appetizers',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/05/dahi-vada-recipe-1.jpg',
    ingredients: ['Lentils', 'Yogurt', 'Spices'],
    isVeg: true,
    isGlutenFree: true,
  },

  // Main Courses
  {
    name: 'Butter Chicken',
    description: 'Tender chicken in creamy tomato sauce',
    price: 12.99,
    category: 'Main Courses',
    image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/06/butter-chicken-recipe-500x500.jpg',
    ingredients: ['Chicken', 'Tomatoes', 'Butter', 'Cream', 'Spices'],
    isVeg: false,
    isGlutenFree: true,
  },
  {
    name: 'Palak Paneer',
    description: 'Cottage cheese cubes in spinach gravy',
    price: 10.99,
    category: 'Main Courses',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/palak-paneer-recipe-1.jpg',
    ingredients: ['Paneer', 'Spinach', 'Spices', 'Cream'],
    isVeg: true,
    isGlutenFree: true,
  },
  {
    name: 'Chana Masala',
    description: 'Spiced chickpea curry with tangy flavors',
    price: 9.49,
    category: 'Main Courses',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/chana-masala-recipe-1.jpg',
    ingredients: ['Chickpeas', 'Tomatoes', 'Spices', 'Cilantro'],
    isVeg: true,
    isGlutenFree: true,
  },
  {
    name: 'Chicken Biryani',
    description: 'Fragrant rice layered with spiced chicken',
    price: 13.49,
    category: 'Main Courses',
    image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/06/chicken-biryani-recipe-500x500.jpg',
    ingredients: ['Chicken', 'Rice', 'Spices', 'Saffron'],
    isVeg: false,
    isGlutenFree: true,
  },
  {
    name: 'Dal Tadka',
    description: 'Yellow lentils tempered with spices',
    price: 8.99,
    category: 'Main Courses',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/dal-tadka-recipe-1.jpg',
    ingredients: ['Lentils', 'Spices', 'Ghee', 'Cilantro'],
    isVeg: true,
    isGlutenFree: true,
  },

  // Desserts
  {
    name: 'Gulab Jamun',
    description: 'Sweet milk dumplings in rose syrup',
    price: 4.99,
    category: 'Desserts',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/gulab-jamun-recipe-1.jpg',
    ingredients: ['Milk Solids', 'Sugar', 'Rose Water'],
    isVeg: true,
    isGlutenFree: false,
  },
  {
    name: 'Rasgulla',
    description: 'Spongy cheese balls in sugar syrup',
    price: 4.49,
    category: 'Desserts',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/rasgulla-recipe-1.jpg',
    ingredients: ['Paneer', 'Sugar', 'Cardamom'],
    isVeg: true,
    isGlutenFree: true,
  },
  {
    name: 'Jalebi',
    description: 'Crispy spirals soaked in sugar syrup',
    price: 4.29,
    category: 'Desserts',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/jalebi-recipe-1.jpg',
    ingredients: ['Flour', 'Sugar', 'Saffron'],
    isVeg: true,
    isGlutenFree: false,
  },
  {
    name: 'Kheer',
    description: 'Creamy rice pudding with nuts and saffron',
    price: 3.99,
    category: 'Desserts',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/rice-kheer-recipe-1.jpg',
    ingredients: ['Rice', 'Milk', 'Sugar', 'Nuts', 'Saffron'],
    isVeg: true,
    isGlutenFree: true,
  },
  {
    name: 'Ras Malai',
    description: 'Cheese dumplings in creamy milk syrup',
    price: 5.29,
    category: 'Desserts',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/rasmalai-recipe-1.jpg',
    ingredients: ['Paneer', 'Milk', 'Sugar', 'Saffron'],
    isVeg: true,
    isGlutenFree: true,
  },

  // Drinks
  {
    name: 'Mango Lassi',
    description: 'Creamy yogurt drink with mango puree',
    price: 3.99,
    category: 'Drinks',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/mango-lassi-recipe-1.jpg',
    ingredients: ['Yogurt', 'Mango', 'Sugar', 'Cardamom'],
    isVeg: true,
    isGlutenFree: true,
  },
  {
    name: 'Masala Chai',
    description: 'Spiced Indian tea with milk',
    price: 2.99,
    category: 'Drinks',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/masala-chai-recipe-1.jpg',
    ingredients: ['Tea', 'Milk', 'Spices', 'Sugar'],
    isVeg: true,
    isGlutenFree: true,
  },
  {
    name: 'Nimbu Pani',
    description: 'Refreshing Indian lemonade with mint',
    price: 2.49,
    category: 'Drinks',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/nimbu-pani-recipe-1.jpg',
    ingredients: ['Lemon', 'Sugar', 'Mint', 'Water'],
    isVeg: true,
    isGlutenFree: true,
  },
  {
    name: 'Thandai',
    description: 'Cool milk drink with nuts and spices',
    price: 4.29,
    category: 'Drinks',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/thandai-recipe-1.jpg',
    ingredients: ['Milk', 'Nuts', 'Spices', 'Sugar'],
    isVeg: true,
    isGlutenFree: true,
  },
  {
    name: 'Coconut Water',
    description: 'Fresh coconut water with a hint of lime',
    price: 3.99,
    category: 'Drinks',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/coconut-water-recipe-1.jpg',
    ingredients: ['Coconut Water', 'Lime'],
    isVeg: true,
    isGlutenFree: true,
  },

  // Breads
  {
    name: 'Naan',
    description: 'Soft leavened flatbread baked in a tandoor',
    price: 2.99,
    category: 'Breads',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/naan-recipe-1.jpg',
    ingredients: ['Flour', 'Yeast', 'Milk', 'Ghee'],
    isVeg: true,
    isGlutenFree: false,
  },
]


export const seedMenuItems = async () => {
  try {
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');
    await MenuItem.insertMany(menuItems);
    console.log('Inserted new menu items');
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

