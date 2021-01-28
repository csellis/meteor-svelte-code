<script>
  export let userItem;
  export let selectUserItem;
  let isSelected = false;

  function handleSelectUserItem(userItemId) {
    isSelected = !isSelected;
    selectUserItem(userItemId)
}
</script>

 <li class="px-6 py-4 flex justify-between" class:bg-gray-100={isSelected} key={userItem._id} on:click={() => handleSelectUserItem(userItem._id)}>
      <span>
      {userItem.itemName}
      </span>
      <span class="text-gray-500">
      {userItem.categoryName}
      </span>
</li>