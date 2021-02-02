<script>
	import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  
  export let userItem;
  export let showCategory;
  let isSelected = false;
  

  function selectUserItem() {
    dispatch('selectUserItem', {
      userItem: userItem
    })

    isSelected = !isSelected;
  }
</script>

<li class="px-6 py-4 flex justify-between hover:bg-gray-100 cursor-pointer" class:bg-gray-100={isSelected} id={userItem._id} key={userItem._id} 
  on:click={selectUserItem} >
  <span>
  {userItem.itemName}
  </span>


  {#if showCategory}
  <span class="text-gray-500">
    {userItem.categoryName}
  </span>
  {:else}
    <span class="text-gray-500">
    </span>
  {/if}
</li>