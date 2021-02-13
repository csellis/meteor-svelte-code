<script>
  import { fade } from "svelte/transition";
  import MoneyString from "./MoneyString";
  import AccountFormatter from "./AccountFormatter";
  export let selectedTransaction;
  export let toggleSlideover;
  export let showSlideover;
  export let allAccounts;


  const categoryFormatter = (categories) => {
    return categories.join(": ")
  }

</script>


{#if showSlideover}
  <div on:click={toggleSlideover} transition:fade class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
{/if}
<section class="{showSlideover ? "translate-x-0": "translate-x-full" } transform transition ease-in-out duration-500 sm:duration-300 absolute inset-y-0 right-0 pl-10 max-w-full flex" aria-labelledby="slide-over-heading">
  <div class="w-screen max-w-md">
    <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div class="px-4 sm:px-6">
        <div class="flex items-start justify-between">
          <h2 id="slide-over-heading" class="text-lg font-medium text-gray-900">
            Transaction Details
          </h2>
          <div class="ml-3 h-7 flex items-center">
            <button on:click={toggleSlideover} class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">Close panel</span>
              <!-- Heroicon name: outline/x -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="mt-6 relative flex-1 px-4 sm:px-6">
        <!-- Replace with your content -->
        <div class="absolute inset-0 px-4 sm:px-6">
          <div class="h-full" aria-hidden="true">
            <div class="bg-white overflow-hidden sm:rounded-lg">
              <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl class="sm:divide-y sm:divide-gray-200">
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dd class="mt-1 text-2xl text-gray-900 sm:mt-0 sm:col-span-2 text-right">
                      <MoneyString amount={selectedTransaction.amount} denomination={selectedTransaction.iso_currency_code} />
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                      Name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {selectedTransaction.name}<br />
                      {#if selectedTransaction.payment_channel}
                        <span class="text-gray-700 text-xs">{selectedTransaction.payment_channel}</span>
                      {/if}
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                      Category
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {#if selectedTransaction.category}
                      {categoryFormatter(selectedTransaction.category)}
                      {/if}
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                      Account
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {selectedTransaction.account_name}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </div>
  </div>
</section>
