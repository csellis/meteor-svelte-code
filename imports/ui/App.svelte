<script>
  import { getContext } from 'svelte'
  import { Router, Link, Route, navigate } from 'svelte-routing'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { UserItems } from '../api/collections'

  import AppLayout from './layouts/AppLayout.svelte'
  import Layout from './layouts/Layout.svelte'

  import Dashboard from './pages/Dashboard'
  import Accounts from './pages/Accounts'
  import Trends from './pages/Trends'
  import Login from './pages/Login'

  $: userId = useTracker(() => Meteor.userId())
  export let url = ''

  $: if ($userId) {
    // navigate("/", { replace: true });
  } else {
    navigate('/login', { replace: true })
  }

  Window.UserItems = UserItems
  // Window.Meteor.users = Meteor.users
</script>

<Router url="{url}">
  <Layout url="{url}" location="{location}">
    <Route path="/" component="{Dashboard}" />
    <Route path="/accounts" component="{Accounts}" />
    <Route path="/trends" component="{Trends}" />
    <Route path="/login" component="{Login}" />
  </Layout>
</Router>
