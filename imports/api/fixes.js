import { Transactions, Accounts } from "./collections";
Meteor.methods({
  "Transactions.fixDates"() {
    const transactions = Transactions.find().fetch();

    transactions.forEach(transaction => {
      console.log(transaction.name, transaction.date)
      Transactions.update(transaction._id, {
        $set: {
          date: new Date(transaction.date)
        }
      })
    })
  },
  "Transactions.addAccountNames"() {
    const accounts = Accounts.find().fetch();

    accounts.forEach(account => {
      const updated = Transactions.update({ account_id: account.account_id }, {
        $set: {
          account_name: account.name
        }
      }, {
        multi: true
      })
      console.log(`Working on ${account.name}, updated ${updated}`);

    })
  }
})