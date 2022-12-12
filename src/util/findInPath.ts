import { existsSync } from "fs";
import { resolve } from "path";
import { makeUnique } from "./makeUnique";

const endings = process.platform === 'win32' ? [
  '.exe',
  '.bat',
  '.cmd',
  '.ps',
  '.ps1',
  '.msi',
  '',
] : ['']

const trimEnding = (ending:string, itemName:string) => itemName.substring(0,itemName.length-ending.length)
export const findItemInPath = (itemName: string):string[]=>{
  if (process.platform==='win32') itemName=itemName.toLowerCase();
  endings.forEach(ending=>{
    if (itemName.endsWith(ending)) itemName=trimEnding(ending, itemName)
  })
  if (!process.env.PATH) throw new Error('NO PATH lol')
  let discovered = [];
  makeUnique(process.env.PATH.split(':')).forEach(pathPath=>{
    endings.forEach(ending=>{
      if (existsSync(resolve(pathPath,`${itemName}${ending}`)))
        discovered.push(resolve(pathPath,`${itemName}${ending}`))
    })
  })
  return discovered
}
export default findItemInPath;
