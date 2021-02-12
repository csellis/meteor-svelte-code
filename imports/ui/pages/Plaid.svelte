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

<button on:click={openLink} class="text-white rounded-lg px-4 py-2 bg-gradient-to-r from-green-400 to-indigo-500">
  Add Account
</button>