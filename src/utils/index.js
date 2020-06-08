import { userInfo, jwt, defaultImageSrc } from '../constants';


export function setToken(token) {
  localStorage.setItem(jwt, token);
}

export function getToken() {
  return localStorage.getItem(jwt);
}

export function getProperty(propName) {
    let value = localStorage.getItem(propName);
    return JSON.parse(value);
}

export function setProperty(propName,value){
  let val = JSON.stringify(value);
  localStorage.setItem(propName,val);
}

export function resetProperty(propName){
  localStorage.removeItem(propName);
}

export function resetToken() {
  localStorage.removeItem(jwt);
}

export function setJwtHeaders(header = {}) {
  const token = getToken();
  if (token) {
    header['Authorization'] = 'Token '+getToken()
  }

  return header;
}

export function generateNavLinksOptions(userInfo = {}){
    const {username, image } = userInfo ||  {};
    console.log('generateNavLinksOptions',username, image);
   return getToken() ? [
        { name:'Home', path:'/' }, 
        { name:'New Article', path:'/editor', icon:'fa fa-pencil-square-o'},
        { name:'Settings', path:'/settings' , icon:'fa fa-cog'},
        {name:`${username}`,path:`/@${username}`, image:`${image?image:defaultImageSrc}` } 
       ]: [ 
        { name:'Home', path:'/' }, 
        { name:'Sign in', path:'/login' },
        { name:'Sign up', path:'/register'},
       ]; 
}

export const storeInLocalStorage = user => {
  setToken(user.token);
  setProperty(userInfo, user);
}

export const deleteFromLocalStorage = () => {
      resetToken();
      resetProperty(userInfo);
}

export const getFormatDate = (date) => {
    let dateObject = new Date(date);
    let dateStrArray = dateObject.toDateString().split(' ');
    dateStrArray.splice(0 ,1);
    let strDate = dateStrArray.join(',');
    return strDate.substring(0,3)+' '+strDate.substring(4,strDate.length);
}

export const getNumberOfTabs = ( totalCount  , limit ) => {
  return Math.ceil(totalCount/limit);
}
