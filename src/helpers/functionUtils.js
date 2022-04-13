import Cookies from 'universal-cookie';



const setCookies = (key, value, expireAt) => {

  const cookies = new Cookies();
  cookies.set(key, value, {
    path: '/',
    expires: new Date(expireAt),
  })
}
const deleteCookie = (key) => {
  const cookies = new Cookies();
  cookies.remove(key)
}
const split_array = (arr, count) => {
  let newobj = {};
  for(let i = 0; i < arr.length; i++){
    if(newobj.hasOwnProperty(arr[i].category_id)){
      newobj[arr[i].category_id].push(arr[i])
    }else{
      newobj[arr[i].category_id] =  [arr[i]]
    }

  }
  console.log(Object.values(newobj))
 return Object.values(newobj)
}


export {
  setCookies,
  split_array,
  deleteCookie
}
