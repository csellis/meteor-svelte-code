<script>
  import UserItem from './UserItem';

  export let categoryId;
  export let userItems;
  // console.log(userItems)
  $: filteredItems = categoryId
		? userItems.categorizedUserItems.filter(userItem => {
      return userItem.categoryId === categoryId ? userItem : null 
		})
		: userItems.categorizedUserItems;
  
  function selectUserItem (event) {
    const selected = event.detail.userItem;
    console.log(selected)
  }
</script>


{#each filteredItems as userItem}
  <UserItem on:selectUserItem={selectUserItem} {userItem} isShopping={true} />
{/each}