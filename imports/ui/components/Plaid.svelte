<script>
  export let token;

    $: handler = Plaid.create({
      token,
      onSuccess: (public_token, metadata) => {
        Meteor.call("Plaid.exchangePublicToken", public_token, (err, res) => {
          if(err) console.log({err})
          if(res) console.log({res})
        })
        console.log(public_token)
      },
      onLoad: () => {},
      onExit: (err, metadata) => {},
      onEvent: (eventName, metadata) => {},
      receivedRedirectUri: null,
    });

  function openLink() {
    handler.open();
  }
</script>
<button on:click={openLink} type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm 
  text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
  focus:ring-offset-2 focus:ring-cyan-500">
  Add account
</button>