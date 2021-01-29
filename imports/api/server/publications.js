import { Categories } from "../collections";

Meteor.publish('allCategories', function allCategories() {
  return Categories.find();
});