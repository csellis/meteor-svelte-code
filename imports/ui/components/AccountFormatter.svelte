<script>
  export let accountId;
  export let accounts;

  $: accountName = accounts.find(account => account.account_id === accountId)
</script>

{accountName.name}