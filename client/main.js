import { Meteor } from "meteor/meteor";
import App from "../imports/ui/App.svelte";

import {UserItems} from '../imports/api/collections'

Meteor.startup(() => {
  new App({
    target: document.getElementById("app"),
  });


});
