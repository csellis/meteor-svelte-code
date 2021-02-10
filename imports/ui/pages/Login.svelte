<script>
  import { LoginWindow, Logout } from "meteor/levelup:svelte-accounts-ui";
  import { useTracker } from "meteor/rdb:svelte-meteor-data";

  export let location;
</script>

<div id="loginWindow" class="sm:mx-auto sm:w-full sm:max-w-md">
  <LoginWindow />
</div>
