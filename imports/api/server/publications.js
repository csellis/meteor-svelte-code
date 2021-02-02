import { Categories, UserItems, PickedItems } from "../collections";

Meteor.publish('allCategories', function allCategories() {
  return Categories.find();
});

Meteor.publish('userPickedItems', function userItems() {
  return PickedItems.find({ userId: this.userId });
});
