#!/usr/bin/env node

import { execSync } from "child_process"
import { existsSync, readFileSync, writeFileSync } from "fs"
import findItemInPath from "./util/findInPath"

const ensureRc = ()=>{
  if (process.platform === 'linux' || process.platform==='darwin') {
    const rcs = ['~/.zshrc','~/.bashrc','~/.zshrc.pre-oh-my-zsh'].map(v=>v.replace('~',process.env.HOME));
    const pnpmBlock = `# pnpm
export PNPM_HOME="${process.env.HOME}/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
# pnpm end`
    rcs.forEach(v=>{
      if (existsSync(v) && !readFileSync(v,'utf-8').includes('# pnpm')) {
        console.log(`Adding path export to ${v}`)
        writeFileSync(v,readFileSync(v,'utf-8')+'\n'+pnpmBlock)
      }
    })
  }
}

if (findItemInPath('pnpm').length>0) {
  ensureRc()
  process.exit(0)
}

// Ensures pnpm is instaled
const doesCurlExist = findItemInPath('curl').length>0
const installCommands: Record<'noNode'|'corepack',Record<'linux'|'win32'|'darwin', string>> = {
  /** if node isn't installed */
  noNode: {
    linux: doesCurlExist?'curl -fsSL https://get.pnpm.io/install.sh | sh -':'wget -qO- https://get.pnpm.io/install.sh | sh -',
    darwin: doesCurlExist?'curl -fsSL https://get.pnpm.io/install.sh | sh -':'wget -qO- https://get.pnpm.io/install.sh | sh -',
    win32: 'powershell.exe -ExecutionPolicy Unrestricted -command "iwr https://get.pnpm.io/install.ps1 -useb | iex"',
  },
  /** If corepack is available */
  corepack: {
    linux: 'corepack enable && corepack prepare pnpm@latest --activate',
    darwin: 'corepack enable && corepack prepare pnpm@latest --activate',
    win32: 'corepack enable && corepack prepare pnpm@latest --activate',
  }
}
const scenario = installCommands[findItemInPath('corepack').length>0 ? 'corepack' : 'noNode']
const command = scenario[process.platform]
console.log(`PNPM is not installed. Running ${command}...`);
execSync(command,{
  stdio: 'inherit'
})
ensureRc()
