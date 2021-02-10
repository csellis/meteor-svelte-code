import { Categories, UserItems, PickedItems, Accounts } from "../collections";

Meteor.publish('allCategories', function allCategories() {
  return Categories.find();
});

Meteor.publish('userPickedItems', function userItems() {
  return PickedItems.find({ userId: this.userId });
});


Meteor.publish('allAccounts', function allAccounts() {
  const accounts = Accounts.find();
  console.log(accounts.fetch())
  return accounts
});
