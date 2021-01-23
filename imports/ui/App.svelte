<script>
  import { Router, Link, Route } from "svelte-routing";
  import AppLayout from "./layouts/AppLayout.svelte";
  import { LoginWindow, Logout } from "meteor/levelup:svelte-accounts-ui";

  import { useTracker } from "meteor/rdb:svelte-meteor-data";

  export let url = "";
</script>

<Router {url}>
  <AppLayout>
    <Route path="/" />
  </AppLayout>
</Router>
