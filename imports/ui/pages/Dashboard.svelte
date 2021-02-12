<script>
  import { onMount, afterUpdate } from "svelte";
  import { useTracker } from "meteor/rdb:svelte-meteor-data";
  import { Items, UserItems, Transactions } from "../../api/collections";
  import Header from "../components/Header";
  import MoneyString from "../components/MoneyString";
  import AccountFormatter from "../components/AccountFormatter";
  import Plaid from './Plaid'

  import { Accounts } from "../../api/collections";

  $: allAccounts = useTracker(() => Accounts.find({}).fetch());
  $: allTransactions = useTracker(() => Transactions.find({}, { date: -1}).fetch());


  function getLinkToken() {
    Meteor.call("Plaid.createLinkToken", (err, res) => {
      if (err) console.warn(err);
      linkToken = res;
    });
  }

  function syncTransactions() {
    Meteor.call("Plaid.syncTransactions", (err, res) => {
      if (err) console.warn(err);
      console.log(res)
    });
  }

  export let location;
  let linkToken = "";

  const dateFormatter = (date) => {
    const parsed = new Date(date);
    return new Intl.DateTimeFormat('en', {
      month: "numeric",
      day: "numeric",
      year:"numeric"
    }).format(parsed);
  }

  const categoryFormatter = (categories) => {
    return categories.join(": ")
  }

  const accountFormatter = (accountId) => {
    const name = allAccounts.find(account => account.account_id === accountId).name;
    return name;
  }

  getLinkToken();

  onMount(async () => {
    Meteor.subscribe("allAccounts");
    Meteor.subscribe("allTransactions");
  });
</script>

<div class="w-full relative">
  <div class="flex">
    <div class="flex-1">
      <Header title="Dashboard" />
    </div>
    <div>
      <div class="flex gap-2">
        <button 
          on:click={syncTransactions}
          class="text-white rounded-lg px-4 py-2 bg-gradient-to-r from-green-400 to-indigo-500"
        >
          Sync Trans
        </button>    
      {#if linkToken.length > 0}
        <Plaid token={linkToken} />
      {/if}
      </div>
    </div>
  </div>

  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-2">
      <nav class="space-y-1" aria-label="Sidebar">
        <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
        {#each $allAccounts as account}
        <a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md">
          <span class="truncate">
            {account.name}: {account.balances.available}
          </span>
        </a>
        {/each}
      </nav>
    </div>
    <div class="col-span-10">
      <!-- This example requires Tailwind CSS v2.0+ -->
<div class="flex flex-col mt-4">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Odd row -->
            {#each $allTransactions as transaction, index}
            <tr class="{ index % 2 === 0 ? "bg-white" : "bg-gray-50"}">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {dateFormatter(transaction.date)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.name}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {categoryFormatter(transaction.category)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <AccountFormatter accounts={$allAccounts} accountId={transaction.account_id} />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <MoneyString amount={transaction.amount} denomination={transaction.iso_currency_code} />
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
  </div>

</div>