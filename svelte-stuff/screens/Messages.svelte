<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { getSocket, sendMessage } from "../shared/io";
  import MorseButton from '../components/MorseButton.svelte'
  import type {
    MatchState,
    MessageType,
  } from "../shared/types";
  import LoadingSpinner from "../ui/LoadingSpinner.svelte";
  import MessageGroup from "../components/MessageGroup.svelte";
  const channels = ['1', '2', '3']
  export let user: NonNullable<MatchState["user"]>;
  export let myId: string;
  let loading = true;
  let choosingChannel = false
  let choosingUsername = false
  let channel = "default"
  let username = '';
  let messages: MessageType[] = [];
  let messageGroups: MessageType[] = [];
  const saveMessages = (payload:any) => messages = [payload, ...messages];
  export const show = () => {
    let newMessageGroups: MessageType[] = [];
    messages.forEach((m) => {
      if (newMessageGroups.length === 0) {
        newMessageGroups.push(m);
        return;
      }
      if(m?.message || m.data){
        newMessageGroups.push(m);
      }
    });
    messageGroups = newMessageGroups;
  }

  function onWebsocketEvent(e: MessageEvent) {
    const payload = JSON.parse(e.data);
    payload.createdAt =  new Date().getMilliseconds()
    if(payload.action === 'internal' || payload.action === 'system'){
      saveMessages(payload)
      payload.users.Items.map((userItem:any) => {
        if(userItem.connectionId !== payload.connectionId) return
          username = userItem.username
          return
      })
    }else if (
      payload.connectionId &&
      payload.username &&
      payload.message &&
      payload.username !== username
    ) {
      console.log("inside webevent")
      saveMessages(payload)
    }
    show()
  }

  function changeChannel(){
    sendMessage(channel, username, 'joinnroom')
    choosingChannel = false
  }
  function changeUsername(){
    sendMessage(username, username, 'setname')
    choosingUsername = false
  }


  onMount(async () => {
    try {
      const socket = getSocket();
      socket.addEventListener("message", onWebsocketEvent);
      sendMessage('Default User', 'user', 'initialize')
    } catch (err) {
      console.log(err);
    }
    loading = false;
  });
  onDestroy(() => {
    const socket = getSocket();
    socket.removeEventListener("message", onWebsocketEvent);
  });
</script>

<style>
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
  form {
    padding: 0px var(--container-paddding);
  }
  .full { width: 100%; }
  .list { border: 1px solid #333; margin: 2px; min-width: 47% ; display: inline-block;}
  .list:nth-child(4n+3), .list:nth-child(4n+4) { background: #FFAAAA; width: 47%; }
</style>

{#if loading}
  <LoadingSpinner />
{:else}
  <select style="display: {choosingChannel ? "block" : "none" }" 
          name="channels" id="channels" 
          bind:value={channel}
          on:blur={(value) => changeChannel() }>
    <option value="default" selected>Default</option>
    {#each channels as item}
      <option value="{item}">{item}</option>
    {/each}
  </select>
  <h2 style="display: {choosingChannel || choosingUsername ? "none" : "block" }" class="display-name, full">
    <span class='list' on:click={() => choosingUsername = true }><b>Name:</b> {username}</span>
    <span class='list' on:click={() => choosingChannel = true }><b>Ch:</b> {channel}</span>
  </h2>
  <form style="display: {choosingUsername ? "block" : "none" }" >
    <input bind:value={username} on:blur={(value) => changeUsername() } />
  </form>
  <div class="panel" on:click={() => { 
      choosingUsername = false 
      choosingChannel = false 
    } }>
    <div class="msg-container">
        <MessageGroup
          userInfo={{ id: user.id, flair: user.flair, displayName: username }}
          mg={messageGroups}/>
    </div>
    <MorseButton  saveMessages={saveMessages}></MorseButton>
  </div>
{/if}
