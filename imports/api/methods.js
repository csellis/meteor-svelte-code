import { Accounts } from "./collections";
require('dotenv').config({
  path: '../../../../../.env'
})

if(Meteor.isServer) {
  const plaid = require('plaid');
  // console.log("ClientId: " + process.env.PLAID_CLIENT_ID + " && " + process.env.PLAID_SECRET)

  let isSandbox = true,secret, env;

  if(isSandbox) {
    secret = process.env.PLAID_SANDBOX;
    env = plaid.environments.sandbox
  } else {
    secret = process.env.PLAID_SECRET;
    env = plaid.environments.development
  }

  const plaidClient = new plaid.Client({
    clientID: process.env.PLAID_CLIENT_ID,
    secret,
    env,
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
          country_codes: ['US'],
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
    },
    "Plaid.exchangePublicToken": async function exchangePublicToken(PUBLIC_TOKEN) {
      try {
        const response = await plaidClient.exchangePublicToken(PUBLIC_TOKEN);
        const accessToken = response.access_token;
        const itemId = response.item_id;

        Meteor.call('Accounts.insert', accessToken, itemId, (err, res) => {
          if(err) console.log(err)
          return res;
        })
      } catch (error) {
        console.log(error)
      }
    },
    "Accounts.insert": async function(accessToken, itemId) {
      // console.log({accessToken, itemId})

      const response = await plaidClient.getAccounts(accessToken).catch(err => console.log(err));
      console.log(response)
      response.accounts.forEach(account => {
        const accountExists = Accounts.findOne({ account_id: account.account_id});

        if(accountExists) {
          Accounts.update(accountExists._id, {
            $set: {
              "balances": account.balances,
              "updatedAt": new Date()
            }
          })
        } else {
          const newAccount = {
            ...account,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: Meteor.userId(),
            item_id: itemId,
            access_token: accessToken
          }
          Accounts.insert(newAccount);
        }
      })
    }
  });
}