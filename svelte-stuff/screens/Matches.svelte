<script lang="ts">
  import Messages from "./Messages.svelte";
  import { onDestroy, onMount } from "svelte";
  import type {
    Match,
    MatchState,
    State,
    User,
    MessageType,
  } from "../shared/types";

  export let currentUserIsLoading: boolean;
  export let currentUser: User | null;
  export let state: MatchState;
  export let onNewState: (s: State) => void;
  let other = { id: "string", photoUrl: "string", flair: "string", displayName: "DP Name", matchId: "string" }
// console.log(JSON.stringify(state))
</script>

<Messages myId={'1'} user={other} />

