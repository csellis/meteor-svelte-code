<script>
  import { onMount, afterUpdate } from "svelte";
  import { useTracker } from "meteor/rdb:svelte-meteor-data";
  import { Items, UserItems } from "../../api/collections";

  import UserItem from '../components/UserItem';

  export let location;
  export let search = "";
  export let selectedUserItem = "";

  export let selectUserItem = (userItem) => {
    selectUserItem = userItem;
    console.log({selectUserItem})
  }

  $: query = search;
  $: itemsResults = useTracker(() => Items.find({}).fetch());
  $: userItems = useTracker(() => UserItems.find({}).fetch());

export let subscription;
$: {
    subscription?.stop();
    subscription = Meteor.subscribe("itemsSearch", query);
};

    
  onMount(async () => {
    Meteor.subscribe("userItems");
  });

  function handleSubmit(event) {
    // Resolutions.update(
    //   {
    //     _id: resolution._id
    //   },
    //   {
    //     title: updateRes
    //   }
    // );
    console.log({ search });
  }

  function handleSearch(event) {
    // const search = event.target.value;
    // console.log({ search });
    // const items = Items.find().fetch();
    // console.log({items})
  }

  function addItem(event) {
    Meteor.call("Items.add", search, (err, res) => {
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
    <li class="px-6 py-4" key={item._id}>
      {item.name}
    </li>
    {/each}
            <li on:click={addItem} class="px-6 py-4">
          Add
            <strong>{search}</strong>
            ?
        </li>
  </ul>
</div>
{/if}


<div class="bg-white border border-gray-300 overflow-hidden rounded-md mt-4">
  <ul class="divide-y divide-gray-300">
      <li class="px-6 py-4 flex justify-between">
      <span>
      Items
      </span>
    </li>
    {#each $userItems as userItem}
      <UserItem {userItem} {selectUserItem} />
    {/each}
  </ul>
</div>

</div>
