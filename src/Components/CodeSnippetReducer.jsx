import { useState } from "react";

const CodeSnippetReducer = ({getReduxReducer,getReduxReducerInitialValues}) => {
  const [copiedFlag, setCopiedFlag] = useState({main:false, initial:false})

  const handleCopy = (whichCopy) => {
    let codeElement = null;
    if(whichCopy == 'main'){
      codeElement = document.querySelector(".language-javascript-reducer code");
    }else if(whichCopy == 'initial'){
      codeElement = document.querySelector(".language-javascript-reducer-initial code");
    }
    const textArea = document.createElement("textarea");
    textArea.value = codeElement.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    if(whichCopy == 'main'){
      setCopiedFlag({...setCopiedFlag, main: true});
    }else if(whichCopy == 'initial'){
      setCopiedFlag({...setCopiedFlag, initial: true});
    }

  };

  return (
    <div className="md:flex border m-5 rounded-lg shadow-xl">
    <div className="p-1 w-full">

    <div className="max-w mx-auto bg-gray-900 rounded-lg overflow-hidden">
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-200 text-l font-bold" style={{fontStyle:'initial'}}>REDUX REDUCER</span>
          <button onClick={() => handleCopy('main')} className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600 focus:outline-none focus:ring focus:ring-red-400">
          {copiedFlag?.main ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <div className="px-3 py-2">
      <pre className="language-javascript-reducer" style={{overflow:'auto'}}>
      <code style={{color:'beige'}}>
          {getReduxReducer}
          </code>
          </pre>
      </div>
   
    <hr/>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-200 text-l font-bold" style={{fontStyle:'initial'}}>REDUX REDUCER INITIAL</span>
          <button onClick={() => handleCopy('initial')} className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600 focus:outline-none focus:ring focus:ring-red-400">
          {copiedFlag?.initial ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <div className="px-3 py-2">
      <pre className="language-javascript-reducer-initial" style={{overflow:'auto'}}>
      <code style={{color:'beige'}}>
          {getReduxReducerInitialValues}
          </code>
          </pre>
      </div>
    </div>
    </div>
    </div>
  );
};

export default CodeSnippetReducer;
