import { Accounts } from "./collections";
require('dotenv').config({
  path: '../../../../../.env'
})

if(Meteor.isServer) {
  const plaid = require('plaid');
  console.log("ClientId: " + process.env.PLAID_CLIENT_ID + " && " + process.env.PLAID_SECRET)

  const plaidClient = new plaid.Client({
    clientID: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    env: plaid.environments.development,
  });

  Meteor.methods({
    "Plaid.createLinkToken": async function() {
      const userId = Meteor.userId();
      if(!userId) {
        throw new Meteor.Error('need-user', 'You must be logged in.')
      }

      const response = await plaidClient
        .createLinkToken({
          user: {
            client_user_id: userId,
          },
          client_name: 'Plaid Test App',
          products: ['auth', 'transactions'],
          country_codes: ['GB'],
          language: 'en',
          // webhook: 'https://sample-web-hook.com',
          // account_filters: {
          //   depository: {
          //     account_subtypes: ['checking', 'savings'],
          //   },
          // },
        })
        .catch((err) => {
          // handle error
          console.log(err)
        });
      const linkToken = response.link_token;
        return linkToken
    }
  });
}