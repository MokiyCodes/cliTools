import { execSync } from "child_process";
import { resolve } from "path";
import findItemInPath from "../util/findInPath";

if (findItemInPath('pnpm').length !== 0){
  console.warn('Cannot test ensure-pnpm if pnpm is already installed.');
  process.exit(0)
}
if (process.platform === 'win32') {
  console.warn('Cannot reliably programmatically test ensure-pnpm on win32');
  process.exit(0)
}
execSync(`node ${resolve(__dirname,'..','ensure-pnpm')}`)
process.env.PATH += `:${process.env.HOME}/.local/share/pnpm`
if (findItemInPath('pnpm').length === 0)
  throw new Error('Did not install pnpm')

console.log('Test Success.');
process.exit(0)