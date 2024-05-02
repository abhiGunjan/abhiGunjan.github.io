import { useState } from "react";

const CodeSnippetTypes = ({reduxTypes}) => {
  const [copiedFlag, setCopiedFlag] = useState(false)

  const handleCopy = () => {
    const codeElement = document.querySelector(".language-javascript-types code");
    const textArea = document.createElement("textarea");
    textArea.value = codeElement.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopiedFlag(true)

  };

  return (
    <div className="md:flex border m-5 rounded-lg shadow-xl">
    <div className="p-1 w-full">

    <div className="max-w mx-auto bg-gray-900 rounded-lg overflow-hidden">
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-200 text-l font-bold" style={{fontStyle:'initial'}}>REDUX TYPE</span>
          <button onClick={handleCopy} className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600 focus:outline-none focus:ring focus:ring-red-400">
          {copiedFlag ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <div className="px-3 py-2">
        <pre className="language-javascript-types">
          <code className="text-sm" style={{color:'beige'}}>{reduxTypes}</code>
        </pre>
      </div>
    </div>
    </div>
    </div>
  );
};

export default CodeSnippetTypes;
