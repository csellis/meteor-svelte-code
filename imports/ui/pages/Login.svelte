<script>
  import { LoginWindow, Logout } from "meteor/levelup:svelte-accounts-ui";
  import { useTracker } from "meteor/rdb:svelte-meteor-data";

  export let location;
</script>

<style>
  h3 {
    display: none;
  }
</style>

<div>
  <h3>Login</h3>
  <LoginWindow />
</div>
