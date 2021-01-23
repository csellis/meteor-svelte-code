<script>
  import { Router, Link, Route } from "svelte-routing";
  import MainLayout from "./layouts/MainLayout.svelte";
  import { LoginWindow, Logout } from "meteor/levelup:svelte-accounts-ui";

  import { useTracker } from "meteor/rdb:svelte-meteor-data";

  export let url = "";
</script>

<Router {url}>
  <MainLayout>
    <Route path="/" />
  </MainLayout>
</Router>
