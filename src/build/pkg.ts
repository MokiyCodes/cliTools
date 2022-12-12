import { readdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import * as pkg from 'pkg'
const files = readdirSync(resolve(__dirname,'..')).filter(v=>v.endsWith('.js')).map(v=>resolve(__dirname,'..',v));
const outputtedFilepaths = [];
(async()=>{
  for (const file of files) {
    console.log('Compiling',file);
    const outFile = `${resolve(process.cwd(),'dist',`${file.split('\\').pop().split('/').pop().split('.').shift()}`)}${process.platform==='win32'?'.exe':''}`;
    await pkg.exec([file,'-t','node18','--output',outFile])
    outputtedFilepaths.push(outFile)
  }
  writeFileSync(resolve(process.cwd(),'dist','index.md'),`# Binaries for ${process.platform}

${outputtedFilepaths.map(v=>`- [${v}](./${v})`).join('\n')}

> Built at: ${new Date()}<br/>
> [Go Back](..)`)
})()