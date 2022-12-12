import { execSync } from "child_process";
import { existsSync } from "fs";
import { resolve } from "path";

const out = execSync(`node ${resolve(__dirname,'..','where-is')} node`)
if (process.platform !== 'win32'){
  if (out.toString('utf-8').trim() !== execSync('whereis node').toString('utf-8').trim())
    throw new Error('does not match builtin whereis output')
} else if (out.toString('utf-8').split(' ').filter((_,idx)=>idx>0).filter(v=>!existsSync(v)).length>0) throw new Error('cannot find one of the reported files')