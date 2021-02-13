import { Transactions } from "./collections";
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
  }
})