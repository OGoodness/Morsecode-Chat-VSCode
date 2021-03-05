<script lang="ts">
  import _ from 'lodash';
  import { sendMessage } from "../shared/io";
  import Morse from "../shared/morse";
  export let saveMessages: any;
  let startTime:any, endTime:any = null

  let morse = ''
  let keyDown = false
  let shouldSpace = false;
  let dotTiming = 80

  const messageBounce = _.debounce(() => {
          if(keyDown) return
          
          saveMessages(sendMessage(morse, 'a'))
          morse = ''
        }, 2000)

  function startSignal() {
    if(keyDown) return
    startTime = new Date()
    console.log("StartSignal", endTime - startTime)
    if((startTime - endTime) / dotTiming >= 3){
      shouldSpace = true
    }else{
      shouldSpace = false
    }
    keyDown = true
  }
  function timeDifference(e: any) {
    keyDown = false
    endTime = new Date()
    messageBounce()
    // state.AudioManager.stop()
    dotOrDash(endTime - startTime)
    
  }
  
  const dotOrDash = (timing: number) => {
    morse += (shouldSpace ? ' ' : '')
    //Dash Timing is 3x of Dot
    if((timing / dotTiming) >= 3){
        morse += '-'
    }else{
      morse += '.'
    }
  }
</script>
<style>
  .morse-button {
    display: block;
    max-width:100px;
    max-height:59px;
    width: auto;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    content:url('../../media/morse_0.png')!important;
  }
  .morse-button:active {
    content:url('../../media/morse_1.png')!important;
  }
  .display-name {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .full { width: 100%; }
  .list {margin: 2px; min-width: 47%; text-align: center; font-size: 150%; display: inline-block;}
  .list:nth-child(4n+3), .list:nth-child(4n+4) { background: #FFAAAA; width: 47%; }
</style>

<h4 class="display-name, full">
  <span class='list'>{morse}</span>
  <span class='list'>{Morse.decode(morse)}</span>
</h4>
<button on:mousedown={ startSignal } on:mouseup={timeDifference} class="send-message-button"><img alt="visual" class="morse-button" /></button>


