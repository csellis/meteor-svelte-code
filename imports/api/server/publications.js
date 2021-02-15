import { Settings, Accounts, Transactions} from "../collections";

Meteor.publish(null, function allCategories() {
  return Settings.find();
});

Meteor.publish('allAccounts', function allAccounts() {
  const accounts = Accounts.find();
  // console.log(accounts.fetch())
  return accounts
});

Meteor.publish('allTransactions', function allTransactions() {
  const transactions = Transactions.find();
  // console.log(accounts.fetch())
  return transactions
});

Meteor.publish('transactionsByDate', function(startDate, endDate) {
  console.log({startDate, endDate})
  return Transactions.find({
    "date": {
      "$gte": new Date(startDate),
      "$lte": new Date(endDate)
    }
  })
});