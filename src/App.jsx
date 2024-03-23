import React, { useCallback, useEffect,useRef } from 'react'

import { useState } from 'react'

function App() {

const [length, setlength] = useState(6)
const [number,setnumber] = useState(false)
const [charAllowed, setchar] = useState(false)

const [password,setpassword] = useState("")

const passwordRef = useRef(null)

const passwordGenerator = useCallback(() => {
let pass = ''
let str = "ABCDEFGHIJKLMNOPQURTSUVWXYZabcdefghijklmnopqrstuvwxyz"

if (number) str += "0123456789"
if (charAllowed)  str += ')(*&^%$#@!~?><,.|}{][|'

for (let i = 1; i <= length; i++) {
 const char = Math.floor(Math.random() * str.length + 1)
 
 pass += str.charAt(char)

}

setpassword(pass)

},[length,number,charAllowed,setpassword])

const copy = useCallback(() => {

  passwordRef.current?.select()
window.navigator.clipboard.writeText(password)


},[password])



useEffect(() => {
  passwordGenerator()
},[length,charAllowed,number,passwordGenerator])

  return (
   <>

<div className='w-full h-screen flex justify-center pt-20 bg-black '>

<div className='w-[500px] h-[200px] bg-slate-600   rounded-xl'>


<h1 className="text-center py-5 text-orange-500 text-2xl font-semibold">Password Generator</h1>

<div className='flex justify-center '>

  <input type="text" 
  value={password}
  placeholder='password'
  readOnly
  ref={passwordRef}
  className='h-8 w-[380px] rounded-l-lg border-none pl-3 text-orange-500 font-semibold text-xl outline-none'/>

  <button 
onClick={copy}
  className="bg-blue-600 text-white font-medium h-8 px-4 rounded-r-lg border-2 border-white"
  >copy</button>


</div>


<div className="flex justify-around py-8  px-4 ">

 <div className="flex justify-center items-center w-[250px]">

 <input type="range" 
 className="text-blue-600"
  id='length'
  min={6}
  max={100}
  value={length}
  onChange={(e)=> {setlength(e.target.value)} }
/>

  <label
  className="text-orange-500 pl-2 font-medium 
  text-lg"
  htmlFor="length">length : {length}</label>

 </div>


 <div className="flex justify-center items-center">
 <input type='checkbox' 
  id='number'
  defaultChecked={number}
  onChange={() => {
    setnumber((prev) => !prev)
  }}
 
  
  />

  <label 
  className="text-orange-500 pl-1 font-medium
  text-lg"
  htmlFor="number">Number</label>

 </div>



 <div 
 className="flex justify-center items-center">
 <input type='checkbox' 
  id='char'
  defaultChecked={charAllowed}


  onChange={() => {
    setchar((prev) => !prev)
  }}/>


  <label
  className="text-orange-500 pl-1 font-medium text-lg"
  htmlFor="char">character</label>

 </div>


</div>
</div>

</div>

   </>
  )
}

export default App

