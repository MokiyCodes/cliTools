import { readdirSync } from "fs";
import { resolve } from "path";
import * as pkg from 'pkg'
const files = readdirSync(resolve(__dirname,'..')).filter(v=>v.endsWith('.js')).map(v=>resolve(__dirname,'..',v));
(async()=>{
  for (const file of files) {
    console.log('Compiling',file);
    await pkg.exec([file,'-t','node18','--output',`${resolve(process.cwd(),'dist',`${file.split('\\').pop().split('/').pop().split('.').shift()}`)}${process.platform==='win32'?'.exe':''}`])
  }
})()