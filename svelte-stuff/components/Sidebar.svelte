<script lang="ts">
  import Messages from "../screens/Messages.svelte";
  let other = { id: "string", photoUrl: "string", flair: "string", displayName: "DP Name", matchId: "string" }
</script>

<Messages myId={'1'} user={other} />
