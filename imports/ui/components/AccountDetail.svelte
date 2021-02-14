<script>
  import { fade } from 'svelte/transition'
  import AccountFormatter from './AccountFormatter'
  import { formatMoney } from '../helpers'

  export let selectedAccount
  export let toggleSlideover
  export let showSlideover

  let editName = false

  const categoryFormatter = (categories) => {
    return categories.join(': ')
  }

  const handleEditName = () => {
    if (!editName) {
      editName = !editName
    } else {
    }
  }
  const handleSubmit = () => {
    Meteor.call('Accounts.updateName', selectedAccount, (err, res) => {
      if (err) console.error(err)
    })
  }
</script>

{#if Object.keys(selectedAccount).length > 0}
  {#if showSlideover}
    <div
      on:click="{toggleSlideover}"
      transition:fade
      class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
    ></div>
  {/if}
  <section
    class="{showSlideover
      ? 'translate-x-0'
      : 'translate-x-full'} transform transition ease-in-out duration-500 sm:duration-300 absolute inset-y-0 right-0 pl-10 max-w-full flex"
    aria-labelledby="slide-over-heading"
  >
    <div class="w-screen max-w-md">
      <div
        class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
      >
        <div class="px-4 sm:px-6">
          <div class="flex items-start justify-between">
            <h2
              id="slide-over-heading"
              class="text-lg font-medium text-gray-900"
            >
              Transaction Details
            </h2>
            <div class="ml-3 h-7 flex items-center">
              <button
                on:click="{toggleSlideover}"
                class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close panel</span>
                <!-- Heroicon name: outline/x -->
                <svg
                  class="h-6 w-6"
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
                    d="M6 18L18 6M6 6l12 12"></path>
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
                    <div
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dd
                        class="mt-1 text-2xl text-gray-900 sm:mt-0 sm:col-span-2 text-right"
                      >
                        {#if selectedAccount}
                          {formatMoney(
                            selectedAccount.balances.current,
                            selectedAccount.balances.iso_currency_code
                          )}
                        {/if}
                      </dd>
                    </div>
                    <div
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-gray-500">Name</dt>
                      <dd
                        on:click="{handleEditName}"
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 cursor-pointer"
                      >
                        {#if editName}
                          <div>
                            <label
                              for="email"
                              class="block text-sm font-medium text-gray-700 sr-only"
                              >Search candidates</label
                            >
                            <div class="mt-1 flex rounded-md shadow-sm">
                              <div
                                class="relative flex items-stretch flex-grow focus-within:z-10"
                              >
                                <input
                                  bind:value="{selectedAccount.name}"
                                  type="text"
                                  name="email"
                                  id="email"
                                  class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                                  placeholder="John Doe"
                                />
                              </div>
                              <button
                                on:click="{handleSubmit}"
                                class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                <!-- Heroicon name: solid/sort-ascending -->
                                <svg
                                  class="h-5 w-5 text-gray-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"
                                  ></path>
                                </svg>
                                <span>Save</span>
                              </button>
                            </div>
                          </div>
                        {:else}
                          {selectedAccount.name}
                        {/if}
                      </dd>
                    </div>
                    <div
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-gray-500">Type</dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize"
                      >
                        {selectedAccount.type}: {selectedAccount.subtype}
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
{/if}
