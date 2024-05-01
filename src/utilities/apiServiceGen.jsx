function convertToConstantCase(input) {
  const words = input
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toUpperCase()
    .split(/[\s_-]+/);
  return words.join("_");
}

export const getApiService = (apiEndPoint) => {
  const output = convertToConstantCase(apiEndPoint);
  const finalString = output + ":" + '"' + apiEndPoint + '"' + ",";
  return finalString;
};

export const getReduxType = (apiEndPoint) => {
  const output = convertToConstantCase(apiEndPoint);
  const finalString = "export const " + output + " = " + '"' + output + '"' + ";";
  return finalString;
};

export const getReduxAction = (apiEndPoint, payload, integType) => {
  if(integType === 'GET'){
    return getReduxActionGET(apiEndPoint, payload);
  }else if(integType === 'CREATE'){
    return getReduxActionNonGET(apiEndPoint, payload);
  }
};

export const getReduxActionGET = (apiEndPoint, payload) => {
  const actionName = `${apiEndPoint}_action`;
  const output = convertToConstantCase(apiEndPoint);

  return (
    <>
      {`export const ${actionName} = (data) => {

    const initialPayload = {
    "userID": LoginuserId,
    ${payload && payload.length > 0 ? payload.map((item) => `"${item.keyName}": "${item.keyValue}"`).join(",\n ") : ""}${payload && payload.length > 0 ? "," : ""}
    ...data
    };

    return (dispatch) => {
        dispatch(mainLoadingTrue());
        return ErpApiService.post(ErpApi.${output}, initialPayload).then((response) => {
                const { data } = response;
                dispatch(mainLoadingFalse());

                if (!data.error) {
                    dispatch(${apiEndPoint}Success(data));
                } else {
                    dispatch(${apiEndPoint}Success([]));
                }
            })
            .catch((err) => {
                console.log("err", err);
                dispatch(${apiEndPoint}Success([]));
                dispatch(mainLoadingFalse());
            });
    };
};

export const ${apiEndPoint}Success = (data) => {
    return {
        type: ${output},
        payload: data,
    };
}`}
    </>
  );
};

export const getReduxActionNonGET = (apiEndPoint, payload) => {
  const actionName = `${apiEndPoint}_action`;
  const output = convertToConstantCase(apiEndPoint);

  return (
    <>
      {`export const ${actionName} = (data) => {

    const initialPayload = {
    "userID": LoginuserId,
    ${payload && payload.length > 0 ? payload.map((item) => `"${item.keyName}": "${item.keyValue}"`).join(",\n ") : ""}${payload && payload.length > 0 ? "," : ""}
    ...data
    };

    return (dispatch) => {
        dispatch(mainLoadingTrue());
        return ErpApiService.post(ErpApi.${output}, initialPayload).then((response) => {
                const { data } = response;
                dispatch(mainLoadingFalse());

                if (!data.error) {
                  dispatch(displayMessage({
                    text : data.message,
                    type : "success"
                }));
                } else {
                  dispatch(displayMessage({
                    text : data.message,
                    type : "error"
                }));
                }
            })
            .catch((err) => {
                console.log("err", err);
                dispatch(mainLoadingFalse());
            });
    };
};
`}
    </>
  );
};

export const getReduxReducer = (apiEndPoint) => {
  const output = convertToConstantCase(apiEndPoint);

  return (
    <>
      {`case ${output}:
    return Object.assign({}, state, { ${apiEndPoint}: payload });
`}
    </>
  );
};

export const getReduxReducerInitialValues = (apiEndPoint) => {
  return (
    <>
      {`${apiEndPoint}:{
    error: false,
    message: "",
    data: [],
    totalCount: 0,
  }
`}
    </>
  );
};
