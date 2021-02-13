<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import { useTracker } from "meteor/rdb:svelte-meteor-data";
  import { UserItems } from "../api/collections";

  import AppLayout from "./layouts/AppLayout.svelte";
  import Layout from "./layouts/Layout.svelte";

  import Dashboard from "./pages/Dashboard";
  import Accounts from "./pages/Accounts";
  import Shop from "./pages/Shop";
  import Login from "./pages/Login";
  import Categories from "./pages/Categories";

  $: userId = useTracker(() => Meteor.userId());
  export let url = "";

  $: if ($userId) {
    // navigate("/", { replace: true });
  } else {
    navigate("/login", { replace: true });
  }

  Window.UserItems = UserItems;
  // Window.Meteor.users = Meteor.users
 
</script>

<Router {url}>
  <Layout {url} {location}>
    <Route path="/" component={Dashboard} />
    <Route path="/accounts" component={Accounts} />
    <Route path="/login" component={Login} />
    <!-- <Route path="/shop" component={Shop} />
 
    <Route path="/categories" component={Categories} /> -->
  </Layout>
</Router>
