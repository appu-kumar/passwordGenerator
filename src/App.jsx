import "./index.css";
import { useState,useCallback,useEffect,useRef} from "react";  

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(0);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const inputRef = useRef();    // it returns the reference of the obj, when you bind with input ref attribute there is current blue inside the returned object

 const cachedPassword = useCallback(()=>{

    let generatedPassword = "";
    let charString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(number){
        charString+="0123456789";
    }

    if(character){
      charString += "!@#$%^&*()[]{}|;:";
    }

  
    for(let i=0;i<length;i++){
      let randomIdx = Math.floor(Math.random()*charString.length);
      generatedPassword+=charString.charAt(randomIdx);
    }

    setPassword(generatedPassword);
  },[length,number,character])


  useEffect(()=>cachedPassword(),[cachedPassword])

  function handleOnchange(e) {
    setPassword(e.target.value);
  }

  function handleCopy(){
      if(inputRef.current){
          inputRef.current.style.color = "green"
      }
      window.navigator.clipboard.writeText(inputRef.current.value);
      window.alert("password copied!")

  }
  return (
    <>
      <div className="w-6/12  h-96 border border-black m-auto bg-gray-300 text-white ">
      <h1 className="text-4xl text-center m-4">Password Generator</h1>
        <div className="text-center m-8 text-black">
          <input
            type="text"
            className="w-64 p-1 border border-black"
            value={password}
            onChange={handleOnchange}
            ref={inputRef}
          />
          <button className="border border-black p-1 bg-blue-500"  onClick={handleCopy}>Copy</button>
        </div>
        <div className="text-black flex items-center justify-around ">
          <div className="">
            <input
              className="mx-2"
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <span>Length({length})</span>
          </div>
          <div>
            <input
              className="mx-2"
              type="checkbox"
              onChange={() => setCharacter(!character)}
            />
            <span>Characters</span>
          </div>
          <div>
            <input
              className="mx-2"
              type="checkbox"
              onChange={() => setNumber(!number)}
            />
            <span>Numbers</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
