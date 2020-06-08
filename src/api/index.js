import {  setJwtHeaders } from '../utils';


const generateHeader = () => {
    const headerObject = setJwtHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Custom-Header': 'ProcessThisImmediately',
    });
    return new Headers(headerObject);
}

const generateRequest = ( url, type, myHeaders, body ) => {
 const bodyLiteral = body? { body: JSON.stringify(body) } : {}; 
  return  new Request(url, {
    method: type,
    headers: myHeaders,
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    // accept: 'application/json, text/plain, */*',
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    ...bodyLiteral// body data type must match "Content-Type" header
  });
}

const resolveQueryParams = (params) => {
    return params ? Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&'):'';
}

const requestLogger = (url,type,header,body) => {
  console.info('Request API:::>>>>>>>>>>> with URL:::::',url, 'TYPE:::', type);
  console.info('Token::::',JSON.stringify(header.get('Authorization')));
  body && console.info('Body::::',body);
  console.info('END Request::::>>>>>>>>>>');
}

const responseLogger = (response) => {
  console.info('Response API:::>>>>>>');
  console.info('Response:',response);
  console.info('END Responset:::>>>>>');
}

export async function api(url, type, params, body = null){
        const header = generateHeader();
        url = url + resolveQueryParams(params);
        const myRequest = generateRequest(url, type, header, body);
        requestLogger(url, type, header, body);
        return await fetch(myRequest)
                .then(response => { 
                    responseLogger(response);
                    return response.json()
                 })
                .catch((err) => {
                     console.error('main error handler', err);
                });
}