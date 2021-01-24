<script>
  import { Router, Link, Route } from "svelte-routing";
  import AppLayout from "./layouts/AppLayout.svelte";
  import { LoginWindow, Logout } from "meteor/levelup:svelte-accounts-ui";

  import { useTracker } from "meteor/rdb:svelte-meteor-data";

  import Plan from "./pages/Plan";
  import Shop from "./pages/Shop";

  export let url = "";
</script>

<Router {url}>
  <AppLayout {url} {location}>
    <Route path="/" component={Plan} />
    <Route path="/shop" component={Shop} />
  </AppLayout>
</Router>
