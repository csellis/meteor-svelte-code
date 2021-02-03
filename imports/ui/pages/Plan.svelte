<script>
  import { onMount, afterUpdate } from "svelte";
  import { useTracker } from "meteor/rdb:svelte-meteor-data";
  import { Items, UserItems } from "../../api/collections";

  import UserItem from '../components/UserItem';
  import SelectCategory from '../components/SelectCategory';
  

  export let location;
  export let search = "";
  export let selectedUserItem = {};
  export let subscription;

  $: query = search;
  $: itemsResults = useTracker(() => Items.find({}).fetch());
  $: userItems = useTracker(() => {
    const userItems = UserItems.find({}, {sort: { createdAt: -1}}).fetch();

  // console.log(userItems)
    const uncategorizedUserItems = userItems.filter(userItem => userItem.categoryName === "Uncategorized")
    const categorizedUserItems = userItems.filter(userItem => userItem.categoryName !== "Uncategorized")

    return {
      uncategorizedUserItems,
      categorizedUserItems
    }
  })
  
  $: selectedUserItemRecord = useTracker(() => {
      const userItem = UserItems.findOne(selectedUserItem);
      console.log("hello")
      return userItem;
  })
  // $: showModal = () => Object.keys(selectUserItem).length > 0;


  $: {
      subscription?.stop();
      subscription = Meteor.subscribe("itemsSearch", query);
  };

    
  onMount(async () => {
    Meteor.subscribe("userItems");
  });

  function handleSubmit(event) {
    console.log({ search });
  }

  function handleSearch(event) {
  }

  function addItem(event) {
    Meteor.call("Items.add", search, (err, res) => {
      if (err) console.warn(err);
    });
    search = "";
  }

  function selectUserItem (event) {
    selectedUserItem = event.detail.userItem;
  }

  function clearUserItem () {
    selectedUserItem = {}
  }

  function removeUserItem(userItemId) {
    selectedUserItem = {}

    Meteor.call("UserItems.remove", userItemId, (err, res) => {
      if (err) console.warn(err);
    })
  }

  function selectExistingItem(itemId) {
    Meteor.call("UserItems.add", itemId, (err, res) => {
      if (err) console.warn(err);
    });
    search = "";
  }

</script>

<div class="w-full relative">

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700 sr-only">
      Search for Items
    </label>
    <div class="mt-1">
      <input
        on:keyup|preventDefault={handleSearch}
        bind:value={search}
        type="text"
        name="search"
        id="search"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block
        w-full sm:text-sm border-gray-300 rounded-md py-2 px-4"
        placeholder="Search for items" />
    </div>
  </div>
</form>

{#if search.length > 0}
<div class="bg-white border border-gray-300 overflow-hidden rounded-md absolute mt-2 w-full">
  <ul class="divide-y divide-gray-300">
    {#each $itemsResults as item}
      <li on:click={selectExistingItem(item._id)} class="cursor-pointer px-6 py-4" key={item._id}>
        {item.name}
      </li>
    {/each}
            <li on:click={addItem} class="cursor-pointer px-6 py-4">
          Add
            <strong>{search}</strong>
            ?
        </li>
  </ul>
</div>
{/if}

  {#if $userItems.uncategorizedUserItems.length > 0}
  <div class="bg-white border border-gray-300 overflow-hidden rounded-md mt-4">
    <ul class="divide-y divide-gray-300">
        <li class="px-6 py-4 flex justify-between bg-red-100">
          <span>
          Uncategorized Items
          </span>
        </li>
      {#each $userItems.uncategorizedUserItems as userItem}
        <UserItem on:selectUserItem={selectUserItem} {userItem} showCategory={false} />
      {/each}
    </ul>
  </div>
  {/if}


  {#if $userItems.categorizedUserItems.length > 0}
  <div class="bg-white border border-gray-300 overflow-hidden rounded-md mt-4">
    <ul class="divide-y divide-gray-300">
        <li class="px-6 py-4 flex justify-between bg-indigo-50">
        <span>
        Items
        </span>
      </li>
      {#each $userItems.categorizedUserItems as userItem}
        <UserItem on:selectUserItem={selectUserItem} {userItem} showCategory={true} />
      {/each}
    </ul>
  </div>
  {/if}
</div>


{#if selectedUserItem.itemName}
<!-- This example requires Tailwind CSS v2.0+ -->
<div class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-start justify-center min-h-screen pt-12 px-4 pb-20 text-center sm:block sm:p-0">
    <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div 
    class="fixed inset-0 transition-opacity ease-out duration-300 {selectedUserItem ? 'opacity-100' : 'opacity-0'}}" 
    aria-hidden="true"
    on:click={clearUserItem}
    >
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
    <div class="{selectedUserItem ? 'opacity-100 translate-y-0 sm:scale-100' : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'} ease-out duration 300 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div>
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <!-- Heroicon name: check -->
          <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              {selectedUserItem.itemName}
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              {selectedUserItem.categoryName}
            </p>
          </div>
          <div class="mt-2">
            <SelectCategory {selectedUserItem} on:selectUserItem={selectUserItem} />
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6 grid grid-cols-2 gap-2">
        <button on:click={clearUserItem} type="button" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
          Back
        </button>
        <button on:click={removeUserItem(selectedUserItem._id)} type="button" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
          Remove Item
        </button>
      </div>
    </div>
  </div>
</div>


{/if}