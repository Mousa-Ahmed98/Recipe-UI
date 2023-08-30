/**
 * deleting this when having a real api
 */

import { Recipe } from '../models/recipe.model';
import { Category } from '../models/category.model';

const mainCategory: Category = {
  id: 0,
  name : "main"
}

export const recipes: Recipe[] = [
  {
    id: 0,
    name: 'Shrimp and Pepper Stir-Fry',
    image: 'https://www.allrecipes.com/thmb/eUA5eDqv6NQPIMflBeGBQJsK6mg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7643060_Shrimp-and-Pepper-Stir-Fry_France-C_4x3-35b3f38fa5234d158c691a510abcc982.jpg',
    category: mainCategory,
    ingredients: [
      '1/2 cup chicken broth', 
      '1/4 cup low-sodium soy sauce', 
      '1 tablespoon brown sugar', 
      '1/2 teaspoon garlic powder'
    ],
    steps: [
      'Whisk together chicken broth, soy sauce, rice wine vinegar, brown sugar, cornstarch, garlic powder, and crushed red pepper in a small bowl; set aside. ', 
      'Heat 1 tablespoon oil in a large wok or skillet over high heat. Add red pepper, yellow pepper, red onion, snow peas, and green onion, and saute until vegetables are crisp-tender, 3 to 4 minutes. Remove vegetables to a large bowl.', 
      'Lower heat to medium-high and add remaining 1 tablespoon oil. Cook shrimp for 2 minutes, flipping over halfway through. Return vegetables to the wok. Stir sauce and pour over shrimp and vegetables; stir constantly until sauce comes to a simmer and thickens, about 1 to 2 minutes. '
    ],
  },
  {
    id: 1,
    name: 'Creamy Lemon Parmesan Chicken',
    image: 'https://www.allrecipes.com/thmb/GTNhudSlJ-VKqzV8xtYPrOwF2mI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7555287-creamy-lemon-parmesan-chicken-mfs-4x3-93ed9e84aa0a43fa894e00b43aea1066.jpg',
    category: mainCategory,
    ingredients: ['Cheese', 'bacon', 'Flour', 'Seasonings'],
    steps: ['one', 'two', 'three', 'four'],
  },
  {
    id: 2,
    name: 'Pesto Pasta with Chicken',
    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7732447.jpg&q=60&c=sc&orient=true&poi=auto&h=512',
    category: mainCategory,
    ingredients: ['Cheese', 'bacon', 'Flour', 'Seasonings'],
    steps: ['one', 'two', 'three', 'four'],
  },
  {
    id: 3,
    name: 'Mango Daiquiri',
    image: 'https://www.allrecipes.com/thmb/9OIt_Jtg1JdsEwAbLtEgpNIVt6g=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7570310_Mango-Daiquiri_Yoly_4x3-092bf6159e334aaaa2af7797577e81b3.jpg',
    category: mainCategory,
    ingredients: ['Cheese', 'bacon', 'Flour', 'Seasonings'],
    steps: ['one', 'two', 'three', 'four'],
  },
  {
    id: 4,
    name: 'Tortilla Scrambled Egg and Cheese',
    image: 'https://www.allrecipes.com/thmb/hBGLNI9wkGAhEvY4YSLsYjuEFMo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7563309_Tortilla-Scrambled-Egg-and-Cheese_Yoly_4x3-389efa131ef34c1998e42019ff5c5019.jpg',
    category: mainCategory,
    ingredients: ['Cheese', 'bacon', 'Flour', 'Seasonings'],
    steps: ['one', 'two', 'three', 'four'],
  },
  {
    id: 5,
    name: 'Creamy Lemon Parmesan Chicken',
    image: 'https://www.allrecipes.com/thmb/GTNhudSlJ-VKqzV8xtYPrOwF2mI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7555287-creamy-lemon-parmesan-chicken-mfs-4x3-93ed9e84aa0a43fa894e00b43aea1066.jpg',
    category: mainCategory,
    ingredients: ['Cheese', 'bacon', 'Flour', 'Seasonings'],
    steps: ['one', 'two', 'three', 'four'],
  },
  {
    id: 6,
    name: 'Pesto Pasta with Chicken',
    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7732447.jpg&q=60&c=sc&orient=true&poi=auto&h=512',
    category: mainCategory,
    ingredients: ['Cheese', 'bacon', 'Flour', 'Seasonings'],
    steps: ['one', 'two', 'three', 'four'],
  },
  {
    id: 7,
    name: 'Mango Daiquiri',
    image: 'https://www.allrecipes.com/thmb/9OIt_Jtg1JdsEwAbLtEgpNIVt6g=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7570310_Mango-Daiquiri_Yoly_4x3-092bf6159e334aaaa2af7797577e81b3.jpg',
    category: mainCategory,
    ingredients: ['Cheese', 'bacon', 'Flour', 'Seasonings'],
    steps: ['one', 'two', 'three', 'four'],
  },
  {
    id: 8,
    name: 'Tortilla Scrambled Egg and Cheese',
    image: 'https://www.allrecipes.com/thmb/hBGLNI9wkGAhEvY4YSLsYjuEFMo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7563309_Tortilla-Scrambled-Egg-and-Cheese_Yoly_4x3-389efa131ef34c1998e42019ff5c5019.jpg',
    category: mainCategory,
    ingredients: ['Cheese', 'bacon', 'Flour', 'Seasonings'],
    steps: ['one', 'two', 'three', 'four'],
  },
  {
    id: 9,
    name: 'Creamy Lemon Parmesan Chicken',
    image: 'https://www.allrecipes.com/thmb/GTNhudSlJ-VKqzV8xtYPrOwF2mI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7555287-creamy-lemon-parmesan-chicken-mfs-4x3-93ed9e84aa0a43fa894e00b43aea1066.jpg',
    category: mainCategory,
    ingredients: ['Cheese', 'bacon', 'Flour', 'Seasonings'],
    steps: ['one', 'two', 'three', 'four'],
  },
  {
    id: 10,
    name: 'Pesto Pasta with Chicken',
    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7732447.jpg&q=60&c=sc&orient=true&poi=auto&h=512',
    category: mainCategory,
    ingredients: ['Cheese', 'bacon', 'Flour', 'Seasonings'],
    steps: ['one', 'two', 'three', 'four'],
  },
  {
    id: 11,
    name: 'Mango Daiquiri',
    image: 'https://www.allrecipes.com/thmb/9OIt_Jtg1JdsEwAbLtEgpNIVt6g=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7570310_Mango-Daiquiri_Yoly_4x3-092bf6159e334aaaa2af7797577e81b3.jpg',
    category: mainCategory,
    ingredients: ['Cheese', 'bacon', 'Flour', 'Seasonings'],
    steps: ['one', 'two', 'three', 'four'],
  },
  {
    id: 12,
    name: 'Tortilla Scrambled Egg and Cheese',
    image: 'https://www.allrecipes.com/thmb/hBGLNI9wkGAhEvY4YSLsYjuEFMo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7563309_Tortilla-Scrambled-Egg-and-Cheese_Yoly_4x3-389efa131ef34c1998e42019ff5c5019.jpg',
    category: mainCategory,
    ingredients: ['Cheese', 'bacon', 'Flour', 'Seasonings'],
    steps: ['one', 'two', 'three', 'four'],
  }
];