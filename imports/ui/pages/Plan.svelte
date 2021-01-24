<script>
  export let location;
  export let search = "";
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
    console.log({ search });
  }
</script>

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
  {search}
</form>
