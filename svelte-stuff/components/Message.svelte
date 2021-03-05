<script lang="ts">
  import Morse from "../shared/morse";

  export let encodedMessage: string
  export let username: string
  export let tooltip = false
  let plainMessage = encodedMessage
  let shouldProcess = true
  
  $: setPlainMessage = (value: string) => plainMessage = value
  $: setEncodedMessage = (value: string) => encodedMessage = value


  function process(morse: string){
    let dot = 80 / 1000
    let dash = 3 * dot
    let stop = 7 * dot
    let t = 0;

    let morseMessage = ''
    let message = ''
    let time = 0
    morse.split("").forEach(function(letter) {
        switch(letter) {
            case ".":
                t += dot;
                time += (dot + dot)*1000
                t += dot;
                break;
            case "-":
                t += dash;
                t += dot;
                time += (dash + dot)*1000
                break;
            case " ":
                time += stop*1000
                t += stop;
                setTimeout(()=>setPlainMessage(message = Morse.decode(morseMessage)), time)
                break;
            default:
        }
      setTimeout(()=>setEncodedMessage(morseMessage += letter), time)
      setTimeout(()=>setPlainMessage(message += letter), time)
    });
    setTimeout(()=>setPlainMessage(Morse.decode(encodedMessage)), time)
  }

    if(shouldProcess){
      process(encodedMessage)
      shouldProcess = false
    }
</script>

<style>
  
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
  .recipient > div {
    padding: 10px;
    margin-right: auto;
    color: var(--vscode-button-secondaryForeground);
    background: var(--vscode-button-secondaryBackground);
  }
  /*This would all go into the global.css file*/
	[data-tooltip] {
    position: relative;
    z-index: 2;
    display: block;
  }

[data-tooltip]:before,
[data-tooltip]:after {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
	transition: .2s ease-out;
	transform: translate(-50%, 5px)
}

[data-tooltip]:before {
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-bottom: 5px;
  padding: 7px;
	width: 100%;
  min-width: 70px;
	max-width: 250px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-color: #000;
  background-color: hsla(0, 0%, 20%, 0.9);
  color: #fff;
  content: attr(data-tooltip);
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
	transition: .2s ease-out
}

[data-tooltip]:after {
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 0;
  border-top: 5px solid #000;
  border-top: 5px solid hsla(0, 0%, 20%, 0.9);
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  content: " ";
  font-size: 0;
  line-height: 0;
}

[data-tooltip]:hover:before,
[data-tooltip]:hover:after {
  visibility: visible;
  opacity: 1;
	transform: translate(-50%, 0)
}
[data-tooltip=false]:hover:before,
[data-tooltip=false]:hover:after {
  visibility: hidden;
  opacity: 0;
}
</style>


<div
  class={`bubble recipient start`}>
  <div on:click={() => process(encodedMessage)} >
    <span style="position: relative;  margin-top: -7px">{username}</span>
    <span data-tooltip="{encodedMessage}"> {plainMessage} </span>
  </div>
</div>
