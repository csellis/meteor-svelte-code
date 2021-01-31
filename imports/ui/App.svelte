<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import { useTracker } from "meteor/rdb:svelte-meteor-data";

  import AppLayout from "./layouts/AppLayout.svelte";

  import Plan from "./pages/Plan";
  import Shop from "./pages/Shop";
  import Login from "./pages/Login";

  $: userId = useTracker(() => Meteor.userId());
  export let url = "";

  $: if ($userId) {
    // navigate("/", { replace: true });
  } else {
    navigate("/login", { replace: true });
  }

</script>

<Router {url}>
  <AppLayout {url} {location}>
    <Route path="/" component={Plan} title="Plan" />
    <Route path="/shop" component={Shop} />
    <Route path="/login" component={Login} />
  </AppLayout>
</Router>
