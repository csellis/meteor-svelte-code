<script>
  import { onMount, afterUpdate } from "svelte";
  import { useTracker } from "meteor/rdb:svelte-meteor-data";
  import { Items, UserItems } from "../../api/collections";
  import Header from "../components/Header";
  import Plaid from './Plaid'

  import { Accounts } from "../../api/collections";

  $: allAccounts = useTracker(() => Accounts.find({}).fetch());


  function getLinkToken() {
    Meteor.call("Plaid.createLinkToken", (err, res) => {
      if (err) console.warn(err);
      linkToken = res;
    });
  }

  export let location;
  let linkToken = ""

  getLinkToken();

  onMount(async () => {
    Meteor.subscribe("allAccounts");
  });
</script>

<div class="w-full relative">
  <Header title="Dashboard" />

  {#if linkToken.length > 0}
    <Plaid token={linkToken} />
  {/if}

  <ul>
  {#each $allAccounts as account}
    <li>{account.name}</li>
  {/each}
  </ul>
</div>