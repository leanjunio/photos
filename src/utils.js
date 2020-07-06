import Unsplash from 'unsplash-js';

console.log(process.env)
const unsplash = new Unsplash({ accessKey: process.env.REACT_APP_UNSPLASH_KEY});
export default unsplash;