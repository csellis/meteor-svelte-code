<script>
  import { Link } from "svelte-routing";

  export let to = "";
  export let defaultClass="";
  export let activeClass="";

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      let combinedClass = defaultClass + " " + activeClass;
      return { class: combinedClass };
    }
    return { class: defaultClass };
  }


</script>

<Link to="{to}" getProps="{getProps}">
  <slot />
</Link>