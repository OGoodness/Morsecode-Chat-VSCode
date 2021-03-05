<script lang="ts">
  import type { MessageType } from "../shared/types";

  import Message from "./Message.svelte"
  import Morse from "../shared/morse";


  export let userInfo: { id: string; displayName: string; flair: string };
  export let myId: string;
  export let mg: MessageType[];
  
  $: messages = mg 
  $: lastMessage = mg[mg.length - 1];
  $: last = mg.length -1
  // $: isSender = lastMessage.username === myId;


</script>

<style>
  .dt {
    display: flex;
    margin-top: 0;
  }
  .sender.bubble {
    margin-left: 30px;
  }
  .recipient.bubble {
    margin-right: 30px;
  }
  .bubble {
    display: flex;
    margin-bottom: 4px;
  }

  .sender.bubble > div {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }
  .recipient.bubble > div {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .sender.start > div {
    border-top-right-radius: 16px;
  }
  .recipient.start > div {
    border-top-left-radius: 16px;
  }

  .sender > div {
    padding: 10px 15px;
    margin-left: auto;
    color: var(--vscode-button-foreground);
    background: var(--vscode-button-background);
  }
  .sender-date {
    margin-left: auto;
  }
  .recipient > div {
    padding: 10px;
    margin-right: auto;
    color: var(--vscode-button-secondaryForeground);
    background: var(--vscode-button-secondaryBackground);
  }
  .recipient-date {
    margin-right: auto;
  }
  .panel {
    height: 100%;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
  }
  .msg-container {
    padding: 0px var(--container-paddding);
    display: flex;
    flex-direction: column-reverse;
    flex: 1;
    min-height: 0px;
    overflow-y: auto;
  }
  .message-group {
    display: flex;
    flex-direction: column-reverse;
  }
  .mb {
    margin-bottom: auto;
  }
  .ml {
    margin-left: 43px;
  }
  .flex {
    display: flex;
  }
  .avatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
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
        username={userInfo.displayName}></Message>
        {/if}
        
      {/each}
    </div>
  </div>
</div>
