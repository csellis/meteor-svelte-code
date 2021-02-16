<script>
  import { Route } from 'svelte-routing'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'

  import AccessDenied from './pages/AccessDenied'

  export let path
  export let component

  $: isAuthenticated = useTracker(() => Meteor.userId())
</script>

{#if isAuthenticated}
  <Route path="{path}" component="{component}" />
{:else}
  <Route path="{path}" component="{AccessDenied}" />
{/if}
