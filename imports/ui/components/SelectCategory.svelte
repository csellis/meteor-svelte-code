<script>
  import { onMount, afterUpdate, createEventDispatcher } from "svelte";
  import { useTracker } from "meteor/rdb:svelte-meteor-data";
  import { Categories } from "../../api/collections";

  const dispatch = createEventDispatcher();
  
  export let selectedUserItem;
  let query = "";

  onMount(async () => {
    Meteor.subscribe("allCategories");
  });

  $: categoryResults = useTracker(() => {
    let regex = new RegExp( query, "i");
    console.log({regex})

    const categories = Categories.find({ name: {
      $regex: regex
    }}, {limit: 10}).fetch();

    console.log(categories)
    return categories;
  });

  function selectUserItem() {
    dispatch('selectUserItem', {
      userItem: userItem
    })

    isSelected = !isSelected;
  }

  function handleClick(categoryId, itemId) {
    console.log(categoryId, itemId)

    Meteor.call('Items.categorize', itemId, categoryId, (err, res) => {
      if(err) console.warn(err);
      console.log(res)
    })

    dispatch('selectUserItem', {
      userItem: {}
    })
  }
</script>

  <div>
    <label for="category" class="block text-sm font-medium text-gray-700 sr-only">Category</label>
    <div class="mt-1">
      <input bind:value={query} type="text" name="category" id="category" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Select a Category">
    </div>
    <div class="mt-1">
      {#if query.length > 0}
        <!-- This example requires Tailwind CSS v2.0+ -->
        <div class="absolute w-full bg-white border border-gray-300 overflow-hidden rounded-md">
          <ul class="divide-y divide-gray-300">
          {#each $categoryResults as category}
            <li  on:click={handleClick(category._id, selectedUserItem.itemId)} class="px-6 py-4" key={category._id}>
              {category.name}
            </li>
            {/each}
          </ul>
        </div>

      {/if}
    </div>
  </div>

