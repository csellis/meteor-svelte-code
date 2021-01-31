<script>
  import { createEventDispatcher } from 'svelte';
    import { useTracker } from "meteor/rdb:svelte-meteor-data";
      import { Items, UserItems } from "../../api/collections";



  const dispatch = createEventDispatcher(); 

    import UserItem from './UserItem';
  
    export let categoryId;

  // console.log(userItems)
   $: userItems = useTracker(() => {
     const userItems = UserItems.find({ categoryId, picked: false}).fetch();
     console.log({categoryId, userItems})
     return userItems;
   });

  // $: filteredItems = categoryId
	// 	? userItems.categorizedUserItems.filter(userItem => {
  //     console.log(userItem)
  //     return userItem.categoryId === categoryId ? userItem : null 
	// 	})
  //   : userItems.categorizedUserItems;
    

  
  function selectUserItem (event) {
    const selected = event.detail.userItem;

    Meteor.call("UserItems.togglePickItem", selected._id, (err, res) => {
      if(err) console.warn(err)
      console.log(res)
    })
    console.log(selected)
  }
</script>


{#each $userItems as userItem}
  <UserItem on:selectUserItem={selectUserItem} {userItem} isShopping={true} />
{/each}