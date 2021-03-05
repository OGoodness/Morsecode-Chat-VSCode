<script lang="ts">
  import Messages from "../screens/Messages.svelte";
  let other = { id: "string", photoUrl: "string", flair: "string", displayName: "DP Name", matchId: "string" }
</script>

<style>
  .mainer {
    padding: 0px var(--container-paddding);
    flex: 1;
  }
</style>



<Messages myId={'1'} user={other} />


