#!/usr/bin/env node
// TS implementation of unix whereis provided no options are supplied
import findItemInPath from "./util/findInPath";

process.argv.forEach((arg,argIdx)=>{
  if (argIdx > 1)
    console.log(`${arg}: ${findItemInPath(arg).join(' ')}`);
})
