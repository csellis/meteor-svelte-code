<script>
  import { Link } from 'svelte-routing'
  import { Meteor } from 'meteor/meteor'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { fly } from 'svelte/transition'
  import { elasticOut } from 'svelte/easing'

  export let menuOpen = false
  export let profileOpen = false
  export let location
  let title = 'Title'

  // console.log(location.pathname)
  $: user = useTracker(() => Meteor.user())
  $: userId = useTracker(() => Meteor.userId())

  function handleLogout() {
    Meteor.logout()
  }
</script>

<div class="relative bg-gray-800 overflow-hidden">
  <div class="hidden sm:block sm:absolute sm:inset-0" aria-hidden="true">
    <svg
      class="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
      width="364"
      height="384"
      viewBox="0 0 364 384"
      fill="none"
    >
      <defs>
        <pattern id="eab71dd9-9d7a-47bd-8044-256344ee00d0" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
        </pattern>
      </defs>
      <rect width="364" height="384" fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"></rect>
    </svg>
  </div>
  <div class="relative pt-6 pb-16 sm:pb-24">
    <nav class="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
      <div class="flex items-center flex-1">
        <div class="flex items-center justify-between w-full md:w-auto">
          <Link to="/">
            <span class="sr-only">Workflow</span>
            <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="" />
          </Link>
          <div class="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              class="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white"
              id="main-menu"
              aria-haspopup="true"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Heroicon name: outline/menu -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="hidden space-x-10 md:flex md:ml-10">
          <a href="#" class="font-medium text-white hover:text-gray-300">Product</a>

          <a href="#" class="font-medium text-white hover:text-gray-300">Features</a>

          <a href="#" class="font-medium text-white hover:text-gray-300">Marketplace</a>

          <a href="#" class="font-medium text-white hover:text-gray-300">Company</a>
        </div>
      </div>
      <div class="hidden md:flex">
        {#if $user}
          <a
            href="#"
            on:click|preventDefault="{handleLogout}"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
          >
            Log out
          </a>
          <Link to="/app/dashboard" class="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">Dashboard</Link>
        {:else}
          <Link to="/login" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">Log in</Link>
        {/if}
      </div>
    </nav>

    <!--
      Mobile menu, show/hide based on menu open state.

      Entering: "duration-150 ease-out"
        From: "opacity-0 scale-95"
        To: "opacity-100 scale-100"
      Leaving: "duration-100 ease-in"
        From: "opacity-100 scale-100"
        To: "opacity-0 scale-95"
    -->
    <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
      <div class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div class="px-5 pt-4 flex items-center justify-between">
          <div>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
          </div>
          <div class="-mr-2">
            <button
              type="button"
              class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">Close menu</span>
              <!-- Heroicon name: outline/x -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
          <div class="px-2 pt-2 pb-3 space-y-1" role="none">
            <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" role="menuitem">Product</a>

            <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" role="menuitem">Features</a>

            <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" role="menuitem">Marketplace</a>

            <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" role="menuitem">Company</a>
          </div>
          <div role="none">
            <a href="#" class="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100" role="menuitem"> Log in </a>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-16 sm:mt-24">
      <div class="mx-auto max-w-7xl">
        <slot />
      </div>
    </div>
  </div>
</div>
