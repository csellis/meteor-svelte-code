require('dotenv').config({
  path: '../../../../../.env'
})
import { Meteor } from 'meteor/meteor';
import { Accounts } from '../../api/collections.js';

const plaid = require('plaid');

// console.log(process.env.PLAID_CLIENT_ID)


const plaidClient = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

import '../../api/methods';

Meteor.startup(() => {
  // var categories = ['Uncategorized', 'Baby', 'Bakery', 'Beer, Wine & Spirits', 'Beverages', 'Bread', 'Breakfast & Cereals', 'Candy',
  //   'Canned Goods & Soups', 'Chocolate', 'Cleaning & Home', 'Coffee & Tea', 'Condiments', 'Cookies & Crackers', 'Dairy', 'Eggs', 'Cheese', 'Deli Case', 'Deli Counter',
  //   'Diet Foods', 'Juice', 'Frozen Foods', 'Fruits & Vegetables', 'Grains & Pasta', 'Side Dishes', 'Greeting Cards',
  //   'Party Accessories', 'International Foods', 'Kosher', 'Meat & Seafood', 'Organic Foods', 'Other', 'Paper Goods', 'Personal Care',
  //   'Pharmacy', 'Pet Care', 'Ready to Bake', 'School & Office', 'Snack Foods', 'Spices & Baking'];

  // if (Categories.find().count() < categories.length + 1) {
  //   // Populate default Categories

  //   categories.forEach(function (name) {
  //     // console.log(name)
  //     var item = {
  //       name: name
  //     }
  //     Meteor.call('Categories.add', item, function (error, result) {
  //       if (error) console.log(error);
  //       // console.log(result)
  //     });
  //   });
  // }


})

