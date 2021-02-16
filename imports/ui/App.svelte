<script>
  import { getContext } from 'svelte'
  import { Router, Link, Route, navigate } from 'svelte-routing'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { UserItems } from '../api/collections'

  import AppLayout from './layouts/AppLayout.svelte'
  import Layout from './layouts/Layout.svelte'
  import MarketingLayout from './layouts/MarketingLayout.svelte'

  import Dashboard from './pages/Dashboard'
  import Accounts from './pages/Accounts'
  import Trends from './pages/Trends'
  import Login from './pages/Login'
  import Landing from './pages/Landing'

  import ProtectedRoute from './ProtectedRoute'

  $: userId = useTracker(() => Meteor.userId())
  export let url = ''

  // $: if ($userId) {
  //   // navigate("/", { replace: true });
  // } else {
  //   navigate('/login', { replace: true })
  // }

  Window.UserItems = UserItems
  // Window.Meteor.users = Meteor.users
  typeof location
</script>

<Router url="{url}">
  {#if location.pathname.includes('app')}
    <Layout url="{url}" location="{location}">
      <ProtectedRoute path="/app/dashboard" component="{Dashboard}" />
      <ProtectedRoute path="/app/accounts" component="{Accounts}" />
      <ProtectedRoute path="/app/trends" component="{Trends}" />
    </Layout>
  {:else}
    <MarketingLayout url="{url}" location="{location}">
      <Route path="/login" component="{Login}" />
      <Route path="/" component="{Landing}" />
    </MarketingLayout>
  {/if}
</Router>
