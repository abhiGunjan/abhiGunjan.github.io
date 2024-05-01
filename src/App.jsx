import { createContext, useState } from "react";
import UserForm from "./Components/UserForm";
// import ApiServicesResult from "./Components/ApiServicesResult";
import CodeSnippet from "./Components/CodeSnippet";
import CodeSnippetTypes from "./Components/CodeSnippetTypes";
import CodeSnippetAction from "./Components/CodeSnippetAction";
import CodeSnippetReducer from "./Components/CodeSnippetReducer";

// import CodeSnippet from "./Components/CodeSnippet";

function App() {
  const generatedResultContext =createContext();

  const [generatedResult, setGeneratedResult] = useState({apiService:"", reduxTypes: "", getAction: null , getReduxReducer: null, getReduxReducerInitialValues:null, integType:'GET'});

  return (
    <>
      <generatedResultContext.Provider value={generatedResult}>
            <UserForm generatedResult={generatedResult} setGeneratedResult={setGeneratedResult}/>
            {/* {generatedResult?.apiService !== "" && <ApiServicesResult  apiService={generatedResult?.apiService}/>} */}
            {generatedResult?.apiService !== "" && <CodeSnippet  apiService={generatedResult?.apiService}/>}
            {(generatedResult?.reduxTypes !== "" && generatedResult?.integType === "GET") && <CodeSnippetTypes  reduxTypes={generatedResult?.reduxTypes}/>}
            {generatedResult?.getAction !== null && <CodeSnippetAction  getAction={generatedResult?.getAction}/>}
            {(generatedResult?.getReduxReducer !== null && generatedResult?.integType === "GET") && <CodeSnippetReducer  getReduxReducer={generatedResult?.getReduxReducer} getReduxReducerInitialValues={generatedResult?.getReduxReducerInitialValues}/>}


            {/* <CodeSnippet /> */}
    </generatedResultContext.Provider>   
    </>
  );
}

export default App;
