import { execSync } from "child_process";
import { existsSync } from "fs";
import { resolve } from "path";

const out = execSync(`node ${resolve(__dirname,'..','where-is')} node`)
console.log('Received Output:',out.toString('utf-8'));
const notFound = out.toString('utf-8').split(' ').filter((_,idx)=>idx>0).map(v=>v.trim()).filter(v=>!!v && !existsSync(v)).filter(v=>{
  try {
    execSync(`"${v}" "${resolve(__dirname,'..','util','doNothing')}"`)
  } catch (e) {
    return true;
  }
})
if (notFound.length>0) throw new Error('cannot find one or more of the reported files: '+notFound.join(', '))