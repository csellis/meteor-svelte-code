<script>
  import { onMount, afterUpdate } from "svelte";
  import { useTracker } from "meteor/rdb:svelte-meteor-data";
  import { Items, UserItems, Categories, PickedItems } from "../../api/collections";
  import { flip } from 'svelte/animate';

  import UserItem from '../components/UserItem';
  import SelectCategory from '../components/SelectCategory';
  

  export let location;
  export let subscription;

  $: categories = useTracker(() => {
    const categories  = Categories.find({}, { sort: { rank: 1}}).fetch();
    console.log({categories})
    return categories
  })  
  $: pickedItems = useTracker(() => {
    const pickedItems  = PickedItems.find({}, { sort: { updatedAt: 1}}).fetch();
    let options = {hour: "numeric", minute: "numeric", dayPeriod: "short"};
    const items = pickedItems.map(item => {
      return {
        ...item,
        pickedTime: new Intl.DateTimeFormat('en-GB', options).format(item.updatedAt)
      }
    })
    console.log({items})
    
    return items
  })

  let hovering = false;

  const drop = (event, target) => {
    event.dataTransfer.dropEffect = 'move'; 
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const newTracklist = $categories

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start]);
      newTracklist.splice(start, 1);
    } else {
      newTracklist.splice(target, 0, newTracklist[start]);
      newTracklist.splice(start + 1, 1);
    }
    list = newTracklist
    // console.table(list)
    hovering = null
  }

  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    const start = i;
    event.dataTransfer.setData('text/plain', start);
  }

  // $: query = search;
  // $: itemsResults = useTracker(() => Items.find({}).fetch());

  function save() {
    console.table(list)
    Meteor.call('Categories.reorder', list, (err, res) => {
      if(err) console.warn(err)
      console.log(res)
    })
  }

  function clear() {
    Meteor.call('PickedItems.clear', (err, res) => {
      if(err) console.warn(err)
      console.log(res)
    })
  }
     
  onMount(async () => {
    Meteor.subscribe("allCategories");
    Meteor.subscribe("userPickedItems");
  });

</script>

<div class="w-full relative">
<div class="flex justify-between">
  <button on:click={save} class="bg-blue-500 hover:bg-blue-700 rounded-md shadow hover:shadow-solid text-white px-4 py-2">
    Save
  </button>
  <button on:click={clear} class="bg-white hover:bg-gray-50 rounded-md shadow hover:shadow-solid px-4 py-2">
    Clear Picked
  </button>

</div>
  <div class="grid grid-cols-2 gap-4">
    <div class="bg-white border border-gray-300 overflow-hidden rounded-md mt-2 ">
      <ul class="divide-y divide-gray-300">
        <li class="cursor-pointer px-6 py-4 font-medium">
          Categories:
        </li>
        {#each $categories as item, index (item._id)}
          <li class="cursor-pointer px-6 py-4"
            animate:flip="{{duration: 150}}"
            draggable={true} 
            on:dragstart={event => dragstart(event, index)}
            on:drop|preventDefault={event => drop(event, index)}
            ondragover="return false"
            on:dragenter={() => hovering = index}
            class:is-active={hovering === index}
          >
            {item.rank}: {item.name} 
          </li>
        {/each}
      </ul>
    </div>

  <div>
    <div class="bg-white border border-gray-300 overflow-hidden rounded-md mt-2">
      <ul class="divide-y divide-gray-300">
          <li class="cursor-pointer px-6 py-4 font-medium">
            Picked Items:
          </li>
        {#each $pickedItems as item, index (item._id)}
          <li class="cursor-pointer px-6 py-4 flex justify-between">
            <span>
            {item.categoryRank}: {item.categoryName}
            </span>
            
            <span>
            {item.pickedTime}
            </span>
          </li>
        {:else}
          <li class="cursor-pointer px-6 py-4">
            No items picked.
          </li>
        {/each}
      </ul>
    </div>
  </div>
    </div>

</div>