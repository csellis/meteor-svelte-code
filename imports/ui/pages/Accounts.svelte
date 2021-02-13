<script>
  import { onMount, afterUpdate } from 'svelte'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { Items, UserItems, Transactions } from '../../api/collections'
  import Header from '../components/Header'
  import MoneyString from '../components/MoneyString'
  import AccountFormatter from '../components/AccountFormatter'
  import Plaid from './Plaid'
  import AccountDetail from '../components/AccountDetail'
  import Card from '../components/Card'

  import { Accounts } from '../../api/collections'

  $: allAccounts = useTracker(() => Accounts.find({}).fetch())
  $: allTransactions = useTracker(() =>
    Transactions.find({}, { date: -1 }).fetch()
  )

  let selectedAccount = {}
  let showSlideover = false

  function handleSelectedAccount(account) {
    // selectedTransaction
    // console.log({transaction, showSlideover})
    selectedAccount = account
    showSlideover = true
  }

  function toggleSlideover() {
    showSlideover = !showSlideover
  }

  function getLinkToken() {
    Meteor.call('Plaid.createLinkToken', (err, res) => {
      if (err) console.warn(err)
      linkToken = res
    })
  }

  function syncTransactions() {
    console.log("Doesn't do anything at the moment")
    // Meteor.call("Plaid.syncTransactions", (err, res) => {
    //   if (err) console.warn(err);
    //   console.log(res)
    // });
  }

  export let location
  let linkToken = ''

  const dateFormatter = (date) => {
    const parsed = new Date(date)
    return new Intl.DateTimeFormat('en', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(parsed)
  }

  const formatMoney = (amount, currency) => {
    // console.log(balances)
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency,
    }).format(amount)
  }

  const amountAvailable = (accounts, currency) => {
    const reducer = (accumulator, account) => {
      if (account.balances.iso_currency_code === currency) {
        return accumulator + account.balances.current
      }
      return accumulator
    }
    return accounts.reduce(reducer, 0)
  }

  const categoryFormatter = (categories) => {
    return categories.join(': ')
  }

  const accountFormatter = (accountId) => {
    const name = allAccounts.find((account) => account.account_id === accountId)
      .name
    return name
  }

  // const hasBalance = (account) => {
  //   if(account.)
  // }

  getLinkToken()

  onMount(async () => {
    Meteor.subscribe('allAccounts')
    Meteor.subscribe('allTransactions')
  })
</script>

<!-- Page header -->
<div class="bg-white shadow">
  <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
    <div
      class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"
    >
      <div class="flex-1 min-w-0">
        <!-- Profile -->
        <div class="flex items-center">
          <img
            class="hidden h-16 w-16 rounded-full sm:block"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=jmNhzyT2t1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
            alt=""
          />
          <div>
            <div class="flex items-center">
              <img
                class="h-16 w-16 rounded-full sm:hidden"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=jmNhzyT2t1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                alt=""
              />
              <h1
                class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate"
              >
                Good morning, Chris
              </h1>
            </div>
            <dl
              class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap"
            >
              <dt class="sr-only">Company</dt>
              <dd
                class="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6"
              >
                <!-- Heroicon name: solid/office-building -->
                <svg
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                    clip-rule="evenodd"></path>
                </svg>
                Meet on V
              </dd>
              <dt class="sr-only">Account status</dt>
              <dd
                class="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize"
              >
                <!-- Heroicon name: solid/check-circle -->
                <svg
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"></path>
                </svg>
                Verified account
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
        {#if linkToken.length > 0}
          <Plaid token="{linkToken}" />
        {/if}
        <button
          on:click|preventDefault="{syncTransactions}"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Sync Accounts
        </button>
      </div>
    </div>
  </div>
</div>

<div class="mt-8">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-lg leading-6 font-medium text-gray-900">Overview</h2>
    <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Card -->

      <Card>
        <dl>
          <dt class="text-sm font-medium text-gray-500 truncate">
            Account balance
          </dt>
          <dd>
            <div class="text-lg font-medium text-gray-900">
              {formatMoney(amountAvailable($allAccounts, 'GBP'), 'GBP')}
            </div>
          </dd>
        </dl>
      </Card>

      <Card>
        <dl>
          <dt class="text-sm font-medium text-gray-500 truncate">
            Account balance
          </dt>
          <dd>
            <div class="text-lg font-medium text-gray-900">
              {formatMoney(amountAvailable($allAccounts, 'USD'), 'USD')}
            </div>
          </dd>
        </dl>
      </Card>
      <!-- More items... -->
    </div>
  </div>

  <h2
    class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8"
  >
    Accounts
  </h2>

  <div class="hidden sm:block">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col mt-2">
        <div
          class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Account Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Current Balance
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date Synced
                </th>
              </tr>
            </thead>
            <tbody>
              {#each $allAccounts as account, index}
                <tr
                  on:click="{handleSelectedAccount(account)}"
                  class="cursor-pointer {index % 2 === 0
                    ? 'bg-white'
                    : 'bg-gray-50'}"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {account.name}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatMoney(
                      account.balances.available,
                      account.balances.iso_currency_code
                    )}
                    {#if account.balances.current && account.balances.available !== account.balances.current}
                      <span class="font-thin italic">
                        ({formatMoney(
                          account.balances.current,
                          account.balances.iso_currency_code
                        )})
                      </span>
                    {/if}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dateFormatter(account.dateReached)}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<AccountDetail
  showSlideover="{showSlideover}"
  selectedAccount="{selectedAccount}"
  toggleSlideover="{toggleSlideover}"
/>
