<script>
  import { Meteor } from 'meteor/meteor'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { fade } from 'svelte/transition'
  import { elasticOut } from 'svelte/easing'
  import NavLink from '../components/NavLink'

  import HomeIcon from '../icons/HomeIcon'
  import CardsIcon from '../icons/CardsIcon'
  import ClockIcon from '../icons/ClockIcon'
  import DocumentReportIcon from '../icons/DocumentReportIcon'
  import ScalesIcon from '../icons/ScalesIcon'
  import UsersGroupIcon from '../icons/UsersGroupIcon'
  import ChartsIcon from '../icons/ChartsIcon'
  import ShieldIcon from '../icons/ShieldIcon'
  import QuestionIcon from '../icons/QuestionIcon'
  import CogIcon from '../icons/CogIcon'
  import BellIcon from '../icons/BellIcon'

  export let menuOpen = false
  export let profileOpen = false
  export let location
  export let url
  let title = 'Title'

  $: user = useTracker(() => Meteor.user())
  $: userId = useTracker(() => Meteor.userId())

  function toggleMobileMenu(event) {
    menuOpen = !menuOpen
  }

  function toggleProfile() {
    profileOpen = !profileOpen
  }

  function logout() {
    Meteor.logout()
  }
</script>

<div class="h-screen flex overflow-hidden bg-gray-100">
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  {#if menuOpen}
    <div class="lg:hidden ">
      <div class="fixed inset-0 flex z-40" transition:fade>
        <div on:click="{toggleMobileMenu}" class="fixed inset-0">
          <div
            class="absolute inset-0 bg-gray-600 opacity-75"
            aria-hidden="true"
          ></div>
        </div>
        <div
          class="{menuOpen
            ? 'translate-x-0'
            : '-translate-x-full'} transition ease-in-out duration-300 transform relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700"
        >
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button
              on:click="{toggleMobileMenu}"
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">Close sidebar</span>
              <!-- Heroicon name: outline/x -->
              <svg
                class="h-6 w-6 text-white"
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
          <div class="flex-shrink-0 flex items-center px-4">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
              alt="Easywire logo"
            />
          </div>
          <nav
            class="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
            aria-label="Sidebar"
          >
            <div class="px-2 space-y-1">
              <!-- Current: "bg-cyan-800 text-white", Default: "text-cyan-100 hover:text-white hover:bg-cyan-600" -->
              <NavLink
                to="/"
                class="bg-cyan-800 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                aria-current="page"
              >
                <HomeIcon />
                Transactions
              </NavLink>

              <a
                href="#"
                class="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                <ClockIcon />
                History
              </a>

              <a
                href="#"
                class="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                <ScalesIcon />
                Balances
              </a>

              <a
                href="#"
                class="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                <CardsIcon />
                Cards
              </a>

              <a
                href="#"
                class="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                <UsersGroupIcon />
                Recipients
              </a>

              <a
                href="#"
                class="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                <DocumentReportIcon />
                Reports
              </a>
            </div>
            <div class="mt-6 pt-6">
              <div class="px-2 space-y-1">
                <a
                  href="#"
                  class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                >
                  <CogIcon />
                  Settings
                </a>

                <a
                  href="#"
                  class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                >
                  <QuestionIcon />
                  Help
                </a>

                <a
                  href="#"
                  class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                >
                  <ShieldIcon />
                  Privacy
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </div>
  {/if}

  <!-- Static sidebar for desktop -->
  <div class="hidden lg:flex lg:flex-shrink-0">
    <div class="flex flex-col w-64">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto"
      >
        <div class="flex items-center flex-shrink-0 px-4">
          <span class="text-white font-medium text-6xl"> The Divide </span>
          <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg" alt="Easywire logo"> -->
        </div>
        <nav
          class="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div class="px-2 space-y-1">
            <!-- Current: "bg-cyan-800 text-white", Default: "text-cyan-100 hover:text-white hover:bg-cyan-600" -->
            <NavLink
              to="/"
              activeClass="bg-cyan-800 text-white"
              defaultClass="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
              aria-current="page"
            >
              <HomeIcon />
              Transactions
            </NavLink>

            <NavLink
              to="/accounts"
              activeClass="bg-cyan-800 text-white"
              defaultClass="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
            >
              <ScalesIcon />
              Accounts
            </NavLink>

            <NavLink
              to="/trends"
              activeClass="bg-cyan-800 text-white"
              defaultClass="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
            >
              <ChartsIcon />
              Trends
            </NavLink>

            <a
              href="#"
              class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
            >
              <ClockIcon />
              History
            </a>

            <a
              href="#"
              class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
            >
              <CardsIcon />
              Cards
            </a>

            <a
              href="#"
              class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
            >
              <UsersGroupIcon />
              Recipients
            </a>

            <a
              href="#"
              class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
            >
              <DocumentReportIcon />
              Reports
            </a>
          </div>
          <div class="mt-6 pt-6">
            <div class="px-2 space-y-1">
              <a
                href="#"
                class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
              >
                <CogIcon />
                Settings
              </a>

              <a
                href="#"
                class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
              >
                <QuestionIcon />
                Help
              </a>

              <a
                href="#"
                class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
              >
                <ShieldIcon />
                Privacy
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>

  <div
    class="flex-1 overflow-auto focus:outline-none flex flex-col"
    tabindex="0"
  >
    <div
      class="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none"
    >
      <button
        on:click="{toggleMobileMenu}"
        class="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
      >
        <span class="sr-only">Open sidebar</span>
        <!-- Heroicon name: outline/menu-alt-1 -->
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
            d="M4 6h16M4 12h8m-8 6h16"></path>
        </svg>
      </button>
      <!-- Search bar -->
      <div
        class="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8"
      >
        <div class="flex-1 flex">
          <form class="w-full flex md:ml-0" action="#" method="GET">
            <label for="search_field" class="sr-only">Search</label>
            <div
              class="relative w-full text-gray-400 focus-within:text-gray-600"
            >
              <div
                class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                aria-hidden="true"
              >
                <!-- Heroicon name: solid/search -->
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
              <input
                id="search_field"
                name="search_field"
                class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search transactions"
                type="search"
              />
            </div>
          </form>
        </div>
        <div class="ml-4 flex items-center md:ml-6">
          <button
            class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon />
          </button>

          <!-- Profile dropdown -->
          <div class="ml-3 relative">
            <div>
              <button
                on:click="{toggleProfile}"
                class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                id="user-menu"
                aria-haspopup="true"
              >
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=jmNhzyT2t1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span
                  class="hidden ml-3 text-gray-700 text-sm font-medium lg:block"
                  ><span class="sr-only">Open user menu for </span>Emilia Birch</span
                >
                <!-- Heroicon name: solid/chevron-down -->
                <svg
                  class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
            {#if profileOpen}
              <div
                transition:fade
                class="{profileOpen
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'} transform transition ease-out duration-100 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem">Your Profile</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem">Settings</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem">Logout</a
                >
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
    <main class="flex-1 relative pb-8 z-0 overflow-y-auto">
      <slot />
    </main>
  </div>
</div>
