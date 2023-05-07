const ocrad = require('async-ocrad');
const v = async() =>{
const text = await ocrad('sudo.png');
console.log(text)
}
v()