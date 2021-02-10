<script>
  import { onMount, afterUpdate } from "svelte";
  import { useTracker } from "meteor/rdb:svelte-meteor-data";
  import { Items, UserItems } from "../../api/collections";
  import Header from "../components/Header";
  import Plaid from './Plaid'

  function getLinkToken() {
    Meteor.call("Plaid.createLinkToken", (err, res) => {
      if (err) console.warn(err);
      linkToken = res;
    });
  }

  export let location;
  let linkToken = ""

  getLinkToken();
</script>

<div class="w-full relative">
  <Header title="Dashboard" />

  {#if linkToken.length > 0}
    <Plaid token={linkToken} />
  {/if}
</div>