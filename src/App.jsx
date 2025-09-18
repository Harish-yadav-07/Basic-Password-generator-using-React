import { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setcopied] = useState(false)

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=`~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    if (!password) return;
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setcopied(true);

  }, [password])
  useEffect(() => {
    if (copied) {
      setcopied(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password])

  return (
    <div className="relatve" >
      <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-fit text-center shadow-md mx-auto rounded-lg text-blue-500 bg-gray-700 px-4 py-2" >
        <h1 className="text-white text-5xl mx-4 mb-4 p-3" >Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4" >
          <input
            type="text"
            value={password}
            className="outline-none w-full p-2 m-2 bg-white px-3 text-blue-700 text-xl font-bold rounded-lg mr-2"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-500 outline-none text-white w-20 p-2 m-2 cursor-pointer rounded-lg active:scale-[97%]"
          >
            {copied ? "Copied!" : "Copy"}
          </button>

        </div>
        <div className="flex text-sm gap-x-3" >
          <div className="flex gap-x-2">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className="text-white text-xl text-center">Length: {length}</label>
          </div>
          <div >
            <input
              className="scale-125 w-5 text-center"
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className="text-white text-xl text-center">Numbers</label>
          </div>
          <div >
            <input
              className="scale-125 w-5 text-center"
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className="text-white text-xl text-center">Characters</label>
          </div>
        </div>
          <button
          onClick={passwordGenerator}
          className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 mb-3 w-full text-xl active:scale-[97%]"
        >
          Generate Password
        </button>
      </div>
    </div>
  )
}

export default App;