
import {useState , useEffect , useRef} from "react"


function App() {
const countdownValue = 15   // countdown seconds
const [sec ,setSec] = useState(countdownValue) 
let timer = useRef()
const [type , setType] = useState("")
const [gameStart , setGameStart] = useState(false)
const textArea = useRef(null)
let count = useRef()
const [word , setWord ] = useState(0)

// to start countDown
function start(){
 timer.current = setInterval( () => {
     setSec( sec => sec - 1)
 },1000)   
 setGameStart(true)
 textArea.current.focus()
}

// to stop countdown
useEffect( () => {
  if( sec <= 0){ 
    clearInterval(timer.current) // to stop timer 
    setGameStart(false)  
    setType( prevValue => prevValue )
    setSec(0)
    textArea.current.blur()
    count.current = type.split( ' ' )
    setWord( count.current.filter( word => word !== " ").length )

  
    if(count.current[count.current.length - 1] === ""){
      setWord( count.current.length - 1)
    }
   
   
  }
},[sec,type])


// to get  of value textarea 
function handleChange(e){
 if(gameStart) {
  setType(e.target.value)
 }else{
    setType("")
 }
}


// to reset game
function reset(){
  setSec(15)
  setType("")
  setWord(0)
}











return (
  <div className="App">
    <h1>How Fast Do You type</h1>
    <textarea placeholder="Instruction: Press 'START' button to start the game. type as fast you can before the countdown ends" value={type} onChange={handleChange} ref={textArea}></textarea>
     {sec ? <button onClick={start}>start</button> : <button onClick={reset} className="padding">reset</button>}
    <div className="type-info">
      <div>Time Remaining : {sec}</div>
      <hr/>
      <div>Word Count : {word}</div>
    </div>
  </div>
);
}

export default App;
