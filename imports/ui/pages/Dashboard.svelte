<script>
  import { onMount, afterUpdate } from 'svelte'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { Items, UserItems, Transactions } from '../../api/collections'
  import Header from '../components/Header'
  import MoneyString from '../components/MoneyString'
  import AccountFormatter from '../components/AccountFormatter'
  import Plaid from '../components/Plaid'

  import TransactionDetail from '../components/TransactionDetail'

  import { Accounts } from '../../api/collections'

  $: allAccounts = useTracker(() => Accounts.find({}).fetch())
  $: allTransactions = useTracker(() =>
    Transactions.find({}, { sort: { date: -1 } }).fetch()
  )

  export let location
  let linkToken = ''
  let selectedTransaction = {}
  let showSlideover = false

  function handleSelectedTransaction(transaction) {
    // selectedTransaction
    // console.log({transaction, showSlideover})
    selectedTransaction = transaction
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
    Meteor.call('Plaid.syncTransactions', (err, res) => {
      if (err) console.warn(err)
      console.log(res)
    })
  }

  const dateFormatter = (date) => {
    const parsed = new Date(date)
    return new Intl.DateTimeFormat('en', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    }).format(parsed)
  }

  const categoryFormatter = (categories) => {
    return categories.join(': ')
  }

  const accountFormatter = (accountId) => {
    const name = allAccounts.find((account) => account.account_id === accountId)
      .name
    return name
  }

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
                Good morning, Emilia
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
    <div
      class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      x-max="1"
    >
      <!-- Card -->

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-gray-400"
                x-description="Heroicon name: outline/refresh"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Pending
                </dt>
                <dd>
                  <div class="text-lg font-medium text-gray-900">
                    -$19,500.00
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <a href="#" class="font-medium text-cyan-700 hover:text-cyan-900">
              View all
            </a>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-gray-400"
                x-description="Heroicon name: outline/check-circle"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Processed (last 30 days)
                </dt>
                <dd>
                  <div class="text-lg font-medium text-gray-900">$20,000</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <a href="#" class="font-medium text-cyan-700 hover:text-cyan-900">
              View all
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2
    class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8"
  >
    Recent activity
  </h2>

  <!-- Activity table (small breakopoint and up) -->
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
                  Date
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Transaction
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Account
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Odd row -->
              {#each $allTransactions as transaction, index}
                <tr
                  on:click="{handleSelectedTransaction(transaction)}"
                  class="{index % 2 === 0
                    ? 'bg-white'
                    : 'bg-gray-50'} cursor-pointer"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {dateFormatter(transaction.date)}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate"
                  >
                    {transaction.name}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate"
                  >
                    {categoryFormatter(transaction.category)}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <AccountFormatter
                      accounts="{$allAccounts}"
                      accountId="{transaction.account_id}"
                    />
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <MoneyString
                      amount="{transaction.amount}"
                      denomination="{transaction.iso_currency_code}"
                    />
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>

          <!-- Pagination -->
          <!-- <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
                  <div class="hidden sm:block">
                    <p class="text-sm text-gray-700">
                      Showing
                      <span class="font-medium">1</span>
                      to
                      <span class="font-medium">10</span>
                      of
                      <span class="font-medium">20</span>
                      results
                    </p>
                  </div>
                  <div class="flex-1 flex justify-between sm:justify-end">
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Previous
                    </a>
                    <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Next
                    </a>
                  </div>
                </nav> -->
        </div>
      </div>
    </div>
  </div>
</div>

<div class="w-full relative">
  <div class="flex">
    <div class="flex-1"></div>
    <div>
      <div class="flex gap-2"></div>
    </div>
  </div>
</div>

<TransactionDetail
  showSlideover="{showSlideover}"
  selectedTransaction="{selectedTransaction}"
  toggleSlideover="{toggleSlideover}"
  $allAccounts="{$allAccounts}"
/>
