import { useEffect, useState } from "react"
import {getApiService, getReduxAction, getReduxType, getReduxReducer, getReduxReducerInitialValues} from "../utilities/apiServiceGen";
import './style.css'

const _initialValues = {
  locationCount:0,
};

const UserForm = ({setGeneratedResult}) => {

const [apiEndPoint, setApiEndPoint] = useState("");
const [rows, setRows] = useState([]);
const [integType, setIntegType] = useState('GET');

const handleApiInput = (e) =>{
const apiEndPointData = e.target.value;
    setApiEndPoint(apiEndPointData);
  }

  const testEmptyKey = (rows) => {
    for (const item of rows) {
      if (item.keyName === "") {
        return true;
      }
    }
    return false; 
  
  }
  
  const submitApiEndPoint = (event) =>{
    event.preventDefault();

    const apiSerResult = getApiService(apiEndPoint);
    const redTypeResult = getReduxType(apiEndPoint);
    const actionCode = getReduxAction(apiEndPoint,rows, integType);
    const redReducer = getReduxReducer(apiEndPoint);
    const redReducerInitial = getReduxReducerInitialValues(apiEndPoint);
    setGeneratedResult({apiService:apiSerResult, reduxTypes: redTypeResult, getAction: actionCode, getReduxReducer: redReducer, getReduxReducerInitialValues:redReducerInitial, integType:integType})
}


const [initialValues, setInitialValues] = useState(_initialValues);



useEffect(() => {
  updateRows();
}, [initialValues?.locationCount]);

const updateRows = () => {
  setRows(prevRows => {
    const newRows = [...prevRows];

    for (let i = prevRows.length; i < initialValues?.locationCount; i++) {
      newRows.push({
        keyName: "",
        keyValue: "",
      });
    }

    if (prevRows.length > initialValues?.locationCount) {
      newRows.splice(initialValues?.locationCount);
    }

    return newRows;
  });
};


const addRowTable = () => {
  setInitialValues({...initialValues, locationCount:parseInt(initialValues?.locationCount ? initialValues?.locationCount : 0) + 1})
}


const onValueChange = (i, event) => {
  
  const { name, value } = event.target;
  const data = [...rows];
  data[i][name] = value;
  setRows(data);
};



const tableRowRemove = (index) => {
    
  const dataRow = [...rows];
  dataRow.splice(index, 1);
  setRows(dataRow);

setInitialValues({...initialValues, locationCount:parseInt(initialValues?.locationCount) - 1})
};



const handleIntegrationTypeChange = (e) => {
  setIntegType(e.target.value);
}


const resetFormData = () => {
  setInitialValues(_initialValues);
  setApiEndPoint("");
  setRows("");
  setIntegType('GET');
  setGeneratedResult({apiService:"", reduxTypes: "", getAction: null , getReduxReducer: null, getReduxReducerInitialValues:null, integType:'GET'});

}

  return (

<div className="border m-5 rounded-lg shadow-xl" style={{backgroundColor:'rgb(9 10 36)'}}>
  <div className="p-5">

    <form className="w-full">
      <div className="items-center">
        <table style={{width:"100%"}}>
          <tbody>
            <tr>
              <td width={"10%"}>
              <label className="block text-gray-200 font-bold mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
            End Point:
          </label>
              </td>
              <td width={"90%"}>
              <div className="w-full md:col-span-8 lg:col-span-8 sm:col-span-8 flex items-center">
          <input
            className="w-full bg-white appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-600"
            id="inline-full-name"
            type="text"
            value={apiEndPoint}
            onChange={(e) => handleApiInput(e)}
          />
        </div>
              </td>
            </tr>
            <tr>
              <td style={{height:'20px'}}>
                {
                  " "
                }
              </td>
            </tr>
            <tr>
              <td>
              <label className="block text-gray-200 font-bold mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
              Integration Type:
          </label>
              </td>
              <td>
              <div className="flex justify-left">


  <div className="relative flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
  <nav className="flex min-w-[240px] flex-row gap-1  font-sans text-base font-normal text-blue-gray-700">
    
  <div role="button"
      className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
      <label htmlFor="horizontal-list-vue" className="flex items-center w-full px-3 py-2 cursor-pointer">
        <div className="grid mr-3 place-items-center">
          <div className="inline-flex items-center">
            <label className="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor="horizontal-list-vue">
              <input name="horizontal-list" id="horizontal-list-vue" type="radio"   
                  value={"GET"}
                  checked={integType === "GET"}
                  onChange={(event) => handleIntegrationTypeChange(event)}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0" />
              <span
                className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </span>
            </label>
          </div>
        </div>
        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-400">
          GET
        </p>
      </label>
    </div>
    
    <div role="button"
      className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
      <label htmlFor="horizontal-list-react" className="flex items-center w-full px-3 py-2 cursor-pointer">
        <div className="grid mr-3 place-items-center">
          <div className="inline-flex items-center">
            <label className="relative flex items-center p-0 rounded-full cursor-pointer"
              htmlFor="horizontal-list-react">
              <input name="horizontal-list" id="horizontal-list-react" type="radio"       
              value={"CREATE"}
              checked={integType === "CREATE"}
              onChange={(event) => handleIntegrationTypeChange(event)}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0" />
              <span
                className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </span>
            </label>
          </div>
        </div>
        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-400">
          CREATE
        </p>
      </label>
    </div>

    <div role="button"
      className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
      <label htmlFor="horizontal-list-svelte" className="flex items-center w-full px-3 py-2 cursor-pointer">
        <div className="grid mr-3 place-items-center">
          <div className="inline-flex items-center">
            <label className="relative flex items-center p-0 rounded-full cursor-pointer"
              htmlFor="horizontal-list-svelte">
              <input name="horizontal-list" id="horizontal-list-svelte" type="radio"   
                  value={"UPDATE"}
                  checked={integType === "UPDATE"}
                  onChange={(event) => handleIntegrationTypeChange(event)}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0" />
              <span
                className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </span>
            </label>
          </div>
        </div>
        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-400">
          UPDATE
        </p>
      </label>
    </div>
  </nav>
</div>


              </div>
              </td>
            </tr>
            <tr>
              <td style={{height:'20px'}}>
                {
                  " "
                }
              </td>
            </tr>

            <tr>
              <td width={"10%"}>
              <label className="block text-gray-200 font-bold mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
             Payload Count:
          </label>
              </td>
              <td width={"90%"}>
              <div className="w-full md:col-span-8 lg:col-span-8 sm:col-span-8 flex items-center">
          <input
            className="w-full bg-white  appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-600"
            id="inline-full-name"
            type="number"
            name="locationCount"
            value={initialValues?.locationCount}
            onChange={(e) => {
              setInitialValues({...initialValues, locationCount : e.target.value})
          }}
          />
        </div>
              </td>
            </tr>
            <tr>
            <td style={{height:'20px'}}>
                {
                  " "
                }
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="payloadTable">
              <table >
                                            <thead className="bg-white">
                                        <tr>
                                            <th width="10%">Sl No</th>
                                            <th width="60%">Key</th>
                                            <th width="10%">Default Value</th>
                                            <th width="10%">
                                            <svg 
                                            onClick={() => addRowTable()}
                                            style={{cursor:'pointer'}} className="h-8 w-8 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>

                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {
                                      rows.map((rowsData, index) => {
                                        
                                        const {keyName, keyValue} = rowsData;
                                        return (
                                          <tr key={index}>
                                            <td>
                                              {index + 1}
                                            </td>
                                            <td>
                                            <input
                                                className="w-full bg-transparent border-b border-transparent focus:border-blue-500 text-white"
                                                type="text"
                                                name="keyName"
                                                id="keyName"
                                                value={keyName}
                                                onChange={(event) => onValueChange(index, event)}

                                              />
                                            </td>

                                            <td>
                                            <input
  className="w-full bg-transparent border-b border-transparent focus:border-blue-500 text-white"
  name="keyValue" 
  id="keyValue"
  type="text"
  onChange={(event) => onValueChange(index, event)}
  value={keyValue}
/>


                                            </td>
                                 
                                            <td><svg className="h-8 w-8 text-red-500" onClick={() => tableRowRemove(index)} style={{cursor:'pointer'}} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></td>

                                          </tr>
                                        );
                                      })


                                    }

                               
                                    </tbody>
                                  
                                </table>
                                {testEmptyKey(rows) && <p style={{fontStyle:'italic', color:'red'}}>{"Key can't be empty"}</p>}
                                </div>
              </td>
            </tr>
          </tbody>
        </table>
   
        <div className="md:col-span-7 mt-3 lg:col-span-7 sm:col-span-7 flex justify-center">
        <button
            className={`px-4 py-2 text-white rounded bg-teal-600 focus:outline-none`}
            type="reset"
            onClick={() => resetFormData()}

          >
            RESET
          </button>
          {" "}
            &nbsp; &nbsp;
          <button
            className={`px-4 py-2 text-white rounded focus:outline-none focus:ring focus:ring-red-400 ${
              (apiEndPoint === "" || testEmptyKey(rows)) ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'
            }`}
            type="button"
            onClick={(event) => submitApiEndPoint(event)}
            disabled={apiEndPoint === "" || testEmptyKey(rows)}
          >
            SUBMIT
          </button> 
        </div>
      </div>
      <div className="w-full bg-black/5 text-center">
  <p className="p-3" style={{color:'rgb(125 211 252 / 21%)' ,textAlign:'right', fontSize:'0.7rem'}}>{'API INTEGRATION HELPER - © abhishekGunjan :)'}</p>
  </div>
    </form>
 
  </div>
</div>



  )
}

export default UserForm