<script>
  export let amount;
  export let denomination;

  $: updatedAmount = amount.toFixed(2);
</script>

  {#if denomination === "USD"}${:else}£{/if}
  {updatedAmount}
