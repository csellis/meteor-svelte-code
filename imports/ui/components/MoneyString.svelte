<script>
  export let amount;
  export let denomination;

  $: negated = -amount;
  $: updatedAmount = negated.toFixed(2);
  
</script>

  {#if denomination === "USD"}${:else}£{/if}
  {updatedAmount}
