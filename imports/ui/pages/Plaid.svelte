<script>
  export let token;

    $: handler = Plaid.create({
      token,
      onSuccess: (public_token, metadata) => {
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

<button on:click={openLink}>Open Link</button>