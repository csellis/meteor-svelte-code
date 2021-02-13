import { Accounts, Transactions, Settings } from "./collections";
import { format, add } from 'date-fns'

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

  const client = new plaid.Client({
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

      const response = await client
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
        const response = await client.exchangePublicToken(PUBLIC_TOKEN);
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
    "Plaid.syncTransactions": function syncTransactions() {
      const settings = Settings.findOne()
      const formatDate = (date) => format(date, "yyyy-MM-dd");
      
      const STARTING_DATE = new Date(settings.lastSyncedDate);
      
      const accounts = Accounts.find({ userId: Meteor.userId() }).fetch();
      // console.log({starting, ending})
      
      accounts.forEach(async account => {
        let dateReached = new Date(account.dateReached) || new Date(STARTING_DATE);
        const starting = formatDate(dateReached) 
        const ending = formatDate(add(dateReached, { months: 1}))
        const {access_token} = account;

        const response = await client
          .getTransactions(access_token, starting, ending, {
            count: 250,
            offset: 0,
          })
          .catch((err) => {
            // handle error
            throw new Meteor.Error(err)
          });
        
        response.transactions.forEach(transaction => {
          const { transaction_id } = transaction;
          // check if exists
          const transactionExists = Transactions.findOne({ transaction_id });
          // insert if doesn't exist
          if(!transactionExists) {
            if(new Date(transaction.date) > new Date(dateReached)) {
              console.log(`Updating ${account.name} date to ${dateReached}`)
              dateReached = transaction.date
            }

            const data = {
              ...transaction,
              createdAt: new Date(),
              updatedAt: new Date(),
              userId: Meteor.userId(),

            }
            Transactions.insert(data)
          }
        })

        // Update account to the date reached, if a lot of transactions it will only update to as
        // it got
        Accounts.update(account._id, {
          $set: {
            dateReached
          }
        })
      })  
    },
    "Accounts.insert": async function(accessToken, itemId) {
      // console.log({accessToken, itemId})

      const response = await client.getAccounts(accessToken).catch(err => console.log(err));
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