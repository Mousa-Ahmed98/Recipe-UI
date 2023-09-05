/**
 * deleting this when having a real api
 */

import { Ingredient, Recipe, Step } from '../models/add-recipe.module';
import { Category } from '../models/category.model';

const mainCategory: Category = {
  id: 0,
  name : "main"
}

export const recipes: Recipe[] = [
  {
    name: 'Shrimp and Pepper Stir-Fry',
    imageURL: 'https://www.allrecipes.com/thmb/eUA5eDqv6NQPIMflBeGBQJsK6mg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7643060_Shrimp-and-Pepper-Stir-Fry_France-C_4x3-35b3f38fa5234d158c691a510abcc982.jpg',
    categoryId: 0,
    ingredients: [
      new Ingredient("1/2 cup chicken broth"),
      new Ingredient("1/4 cup low-sodium soy sauce"),
      new Ingredient("1 tablespoon brown sugar"),
      new Ingredient("1/2 teaspoon garlic powder"),
    ],
    steps: [
      new Step("Whisk together chicken broth, soy sauce, rice wine vinegar, brown sugar, cornstarch, garlic powder, and crushed red pepper in a small bowl; set aside. "),
      new Step("Heat 1 tablespoon oil in a large wok or skillet over high heat. Add red pepper, yellow pepper, red onion, snow peas, and green onion, and saute until vegetables are crisp-tender, 3 to 4 minutes. Remove vegetables to a large bowl."),
      new Step("Lower heat to medium-high and add remaining 1 tablespoon oil. Cook shrimp for 2 minutes, flipping over halfway through. Return vegetables to the wok. Stir sauce and pour over shrimp and vegetables; stir constantly until sauce comes to a simmer and thickens, about 1 to 2 minutes."),
    ],id: 0,
  },
  {
    name: 'Creamy Lemon Parmesan Chicken',
    imageURL: 'https://www.allrecipes.com/thmb/GTNhudSlJ-VKqzV8xtYPrOwF2mI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7555287-creamy-lemon-parmesan-chicken-mfs-4x3-93ed9e84aa0a43fa894e00b43aea1066.jpg',
    categoryId: 0,
    ingredients: [
      new Ingredient("1/2 cup chicken broth"),
      new Ingredient("1/4 cup low-sodium soy sauce"),
      new Ingredient("1 tablespoon brown sugar"),
      new Ingredient("1/2 teaspoon garlic powder"),
    ],
    steps: [
      new Step("Whisk together chicken broth, soy sauce, rice wine vinegar, brown sugar, cornstarch, garlic powder, and crushed red pepper in a small bowl; set aside. "),
      new Step("Heat 1 tablespoon oil in a large wok or skillet over high heat. Add red pepper, yellow pepper, red onion, snow peas, and green onion, and saute until vegetables are crisp-tender, 3 to 4 minutes. Remove vegetables to a large bowl."),
      new Step("Lower heat to medium-high and add remaining 1 tablespoon oil. Cook shrimp for 2 minutes, flipping over halfway through. Return vegetables to the wok. Stir sauce and pour over shrimp and vegetables; stir constantly until sauce comes to a simmer and thickens, about 1 to 2 minutes."),
    ],
  id: 1,
  },{
    name: 'Shrimp and Pepper Stir-Fry',
    imageURL: 'https://www.allrecipes.com/thmb/eUA5eDqv6NQPIMflBeGBQJsK6mg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7643060_Shrimp-and-Pepper-Stir-Fry_France-C_4x3-35b3f38fa5234d158c691a510abcc982.jpg',
    categoryId: 0,
    ingredients: [
      new Ingredient("1/2 cup chicken broth"),
      new Ingredient("1/4 cup low-sodium soy sauce"),
      new Ingredient("1 tablespoon brown sugar"),
      new Ingredient("1/2 teaspoon garlic powder"),
    ],
    steps: [
      new Step("Whisk together chicken broth, soy sauce, rice wine vinegar, brown sugar, cornstarch, garlic powder, and crushed red pepper in a small bowl; set aside. "),
      new Step("Heat 1 tablespoon oil in a large wok or skillet over high heat. Add red pepper, yellow pepper, red onion, snow peas, and green onion, and saute until vegetables are crisp-tender, 3 to 4 minutes. Remove vegetables to a large bowl."),
      new Step("Lower heat to medium-high and add remaining 1 tablespoon oil. Cook shrimp for 2 minutes, flipping over halfway through. Return vegetables to the wok. Stir sauce and pour over shrimp and vegetables; stir constantly until sauce comes to a simmer and thickens, about 1 to 2 minutes."),
    ],
    id: 2,
  },
  {
    name: 'Shrimp and Pepper Stir-Fry',
    imageURL: 'https://www.allrecipes.com/thmb/eUA5eDqv6NQPIMflBeGBQJsK6mg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7643060_Shrimp-and-Pepper-Stir-Fry_France-C_4x3-35b3f38fa5234d158c691a510abcc982.jpg',
    categoryId: 0,
    ingredients: [
      new Ingredient("1/2 cup chicken broth"),
      new Ingredient("1/4 cup low-sodium soy sauce"),
      new Ingredient("1 tablespoon brown sugar"),
      new Ingredient("1/2 teaspoon garlic powder"),
    ],
    steps: [
      new Step("Whisk together chicken broth, soy sauce, rice wine vinegar, brown sugar, cornstarch, garlic powder, and crushed red pepper in a small bowl; set aside. "),
      new Step("Heat 1 tablespoon oil in a large wok or skillet over high heat. Add red pepper, yellow pepper, red onion, snow peas, and green onion, and saute until vegetables are crisp-tender, 3 to 4 minutes. Remove vegetables to a large bowl."),
      new Step("Lower heat to medium-high and add remaining 1 tablespoon oil. Cook shrimp for 2 minutes, flipping over halfway through. Return vegetables to the wok. Stir sauce and pour over shrimp and vegetables; stir constantly until sauce comes to a simmer and thickens, about 1 to 2 minutes."),
    ],
    id: 3,
  },
  {
    name: 'Creamy Lemon Parmesan Chicken',
    imageURL: 'https://www.allrecipes.com/thmb/GTNhudSlJ-VKqzV8xtYPrOwF2mI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7555287-creamy-lemon-parmesan-chicken-mfs-4x3-93ed9e84aa0a43fa894e00b43aea1066.jpg',
    categoryId: 0,
    ingredients: [
      new Ingredient("1/2 cup chicken broth"),
      new Ingredient("1/4 cup low-sodium soy sauce"),
      new Ingredient("1 tablespoon brown sugar"),
      new Ingredient("1/2 teaspoon garlic powder"),
    ],
    steps: [
      new Step("Whisk together chicken broth, soy sauce, rice wine vinegar, brown sugar, cornstarch, garlic powder, and crushed red pepper in a small bowl; set aside. "),
      new Step("Heat 1 tablespoon oil in a large wok or skillet over high heat. Add red pepper, yellow pepper, red onion, snow peas, and green onion, and saute until vegetables are crisp-tender, 3 to 4 minutes. Remove vegetables to a large bowl."),
      new Step("Lower heat to medium-high and add remaining 1 tablespoon oil. Cook shrimp for 2 minutes, flipping over halfway through. Return vegetables to the wok. Stir sauce and pour over shrimp and vegetables; stir constantly until sauce comes to a simmer and thickens, about 1 to 2 minutes."),
    ],
    id: 4,
  },{
    name: 'Shrimp and Pepper Stir-Fry',
    imageURL: 'https://www.allrecipes.com/thmb/eUA5eDqv6NQPIMflBeGBQJsK6mg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7643060_Shrimp-and-Pepper-Stir-Fry_France-C_4x3-35b3f38fa5234d158c691a510abcc982.jpg',
    categoryId: 0,
    ingredients: [
      new Ingredient("1/2 cup chicken broth"),
      new Ingredient("1/4 cup low-sodium soy sauce"),
      new Ingredient("1 tablespoon brown sugar"),
      new Ingredient("1/2 teaspoon garlic powder"),
    ],
    steps: [
      new Step("Whisk together chicken broth, soy sauce, rice wine vinegar, brown sugar, cornstarch, garlic powder, and crushed red pepper in a small bowl; set aside. "),
      new Step("Heat 1 tablespoon oil in a large wok or skillet over high heat. Add red pepper, yellow pepper, red onion, snow peas, and green onion, and saute until vegetables are crisp-tender, 3 to 4 minutes. Remove vegetables to a large bowl."),
      new Step("Lower heat to medium-high and add remaining 1 tablespoon oil. Cook shrimp for 2 minutes, flipping over halfway through. Return vegetables to the wok. Stir sauce and pour over shrimp and vegetables; stir constantly until sauce comes to a simmer and thickens, about 1 to 2 minutes."),
    ],
    id: 5,
  },
  {
    name: 'Shrimp and Pepper Stir-Fry',
    imageURL: 'https://www.allrecipes.com/thmb/eUA5eDqv6NQPIMflBeGBQJsK6mg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7643060_Shrimp-and-Pepper-Stir-Fry_France-C_4x3-35b3f38fa5234d158c691a510abcc982.jpg',
    categoryId: 0,
    ingredients: [
      new Ingredient("1/2 cup chicken broth"),
      new Ingredient("1/4 cup low-sodium soy sauce"),
      new Ingredient("1 tablespoon brown sugar"),
      new Ingredient("1/2 teaspoon garlic powder"),
    ],
    steps: [
      new Step("Whisk together chicken broth, soy sauce, rice wine vinegar, brown sugar, cornstarch, garlic powder, and crushed red pepper in a small bowl; set aside. "),
      new Step("Heat 1 tablespoon oil in a large wok or skillet over high heat. Add red pepper, yellow pepper, red onion, snow peas, and green onion, and saute until vegetables are crisp-tender, 3 to 4 minutes. Remove vegetables to a large bowl."),
      new Step("Lower heat to medium-high and add remaining 1 tablespoon oil. Cook shrimp for 2 minutes, flipping over halfway through. Return vegetables to the wok. Stir sauce and pour over shrimp and vegetables; stir constantly until sauce comes to a simmer and thickens, about 1 to 2 minutes."),
    ],
    id: 6,
  },
  {
    name: 'Creamy Lemon Parmesan Chicken',
    imageURL: 'https://www.allrecipes.com/thmb/GTNhudSlJ-VKqzV8xtYPrOwF2mI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7555287-creamy-lemon-parmesan-chicken-mfs-4x3-93ed9e84aa0a43fa894e00b43aea1066.jpg',
    categoryId: 0,
    ingredients: [
      new Ingredient("1/2 cup chicken broth"),
      new Ingredient("1/4 cup low-sodium soy sauce"),
      new Ingredient("1 tablespoon brown sugar"),
      new Ingredient("1/2 teaspoon garlic powder"),
    ],
    steps: [
      new Step("Whisk together chicken broth, soy sauce, rice wine vinegar, brown sugar, cornstarch, garlic powder, and crushed red pepper in a small bowl; set aside. "),
      new Step("Heat 1 tablespoon oil in a large wok or skillet over high heat. Add red pepper, yellow pepper, red onion, snow peas, and green onion, and saute until vegetables are crisp-tender, 3 to 4 minutes. Remove vegetables to a large bowl."),
      new Step("Lower heat to medium-high and add remaining 1 tablespoon oil. Cook shrimp for 2 minutes, flipping over halfway through. Return vegetables to the wok. Stir sauce and pour over shrimp and vegetables; stir constantly until sauce comes to a simmer and thickens, about 1 to 2 minutes."),
    ],
    id: 7,
  },{
    name: 'Shrimp and Pepper Stir-Fry',
    imageURL: 'https://www.allrecipes.com/thmb/eUA5eDqv6NQPIMflBeGBQJsK6mg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7643060_Shrimp-and-Pepper-Stir-Fry_France-C_4x3-35b3f38fa5234d158c691a510abcc982.jpg',
    categoryId: 0,
    ingredients: [
      new Ingredient("1/2 cup chicken broth"),
      new Ingredient("1/4 cup low-sodium soy sauce"),
      new Ingredient("1 tablespoon brown sugar"),
      new Ingredient("1/2 teaspoon garlic powder"),
    ],
    steps: [
      new Step("Whisk together chicken broth, soy sauce, rice wine vinegar, brown sugar, cornstarch, garlic powder, and crushed red pepper in a small bowl; set aside. "),
      new Step("Heat 1 tablespoon oil in a large wok or skillet over high heat. Add red pepper, yellow pepper, red onion, snow peas, and green onion, and saute until vegetables are crisp-tender, 3 to 4 minutes. Remove vegetables to a large bowl."),
      new Step("Lower heat to medium-high and add remaining 1 tablespoon oil. Cook shrimp for 2 minutes, flipping over halfway through. Return vegetables to the wok. Stir sauce and pour over shrimp and vegetables; stir constantly until sauce comes to a simmer and thickens, about 1 to 2 minutes."),
    ],
    id: 8,
  }
];