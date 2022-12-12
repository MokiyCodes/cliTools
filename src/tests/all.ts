import { execSync } from "child_process";
import { readdirSync } from "fs";
import { resolve } from "path";

readdirSync(__dirname).filter(v=>resolve(__dirname,v)!==resolve(__filename)).forEach(v=>{
  console.log(`=> Run Test ${v} <=`);
  execSync(`node ${resolve(__dirname,v)}`,{stdio:'inherit'})
})