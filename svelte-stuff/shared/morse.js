const MORSE_CODE = {  
  "-----":"0",
  ".----":"1",
  "..---":"2",
  "...--":"3",
  "....-":"4",
  ".....":"5",
  "-....":"6",
  "--...":"7",
  "---..":"8",
  "----.":"9",
  ".-":"A",
  "-...":"B",
  "-.-.":"C",
  "-..":"D",
  ".":"E",
  "..-.":"F",
  "--.":"G",
  "....":"H",
  "..":"I",
  ".---":"J",
  "-.-":"K",
  ".-..":"L",
  "--":"M",
  "-.":"N",
  "---":"O",
  ".--.":"P",
  "--.-":"Q",
  ".-.":"R",
  "...":"S",
  "-":"T",
  "..-":"U",
  "...-":"V",
  ".--":"W",
  "-..-":"X",
  "-.--":"Y",
  "--..":"Z",
  "-.-.--":"!",
  ".-.-.-":".",
  "--..--":","
};

const ALPHABET = {
  'A': '.-',    'B': '-...',  'C': '-.-.', 'D': '-..',
  'E': '.',     'F': '..-.',  'G': '--.',  'H': '....',
  'I': '..',    'J': '.---',  'K': '-.-',  'L': '.-..',
  'M': '--',    'N': '-.',    'O': '---',  'P': '.--.',
  'Q': '--.-',  'R': '.-.',   'S': '...',  'T': '-',
  'U': '..-',   'V': '...-',  'W': '.--',  'X': '-..-',
  'Y': '-.--',  'Z': '--..',  ' ': '/',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', 
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', 
  '9': '----.', '0': '-----', 
}
const Morse = {
  decode: ( morseCode, seperator = ' ' ) => {
    morseCode = morseCode.split( seperator ); // get single words
    let result = "";
    
    for( let i = 0; i < morseCode.length; i ++ ) {
        morseCode[i] = morseCode[i].split( " " ); // get single characters
        
        for( let a = 0; a < morseCode[i].length; a ++ ) {
            if( morseCode[i][a] !== "" ) {
                result += MORSE_CODE[ morseCode[i][a] ] || '❓';
            }
        }
        
        if( i < ( morseCode.length -1 ) ) {  // add space after word
            result += " ";
        }
        
    }
    return result
  },
  encode: (string) => {
    return string.split('').map((e) => ALPHABET[e.toLowerCase()] || '❓').join(' ') 
  }
  


}



export default Morse
