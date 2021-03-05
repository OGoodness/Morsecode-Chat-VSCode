<script lang="ts">
  import type { MessageType } from "../shared/types";
  import Message from "./Message.svelte"


  export let username: string;
  export let mg: MessageType[];
  
  $: messages = mg 


</script>

<style>
  .message-group {
    display: flex;
    flex-direction: column-reverse;
  }
  .mb {
    margin-bottom: auto;
  }
  .flex {
    display: flex;
  }

</style>

<div class="message-group" class:mb={true}>

  <div class:flex={true}>
    <div style="margin-left: 4px; flex: 1;" class="message-group">
      {#each messages as m, index (m.createdAt)}
        {#if m.action == 'internal' || m.action == 'system'}
          <span><b>SYSTEM: </b> {m.message}</span>
        {:else}
        <Message  encodedMessage={m.data ?? m.message} 
        {username}></Message>
        {/if}
        
      {/each}
    </div>
  </div>
</div>
