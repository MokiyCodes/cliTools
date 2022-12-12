import { readdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import * as pkg from 'pkg'
const files = readdirSync(resolve(__dirname,'..')).filter(v=>v.endsWith('.js')).map(v=>resolve(__dirname,'..',v));
const outputtedFilepaths = [];
(async()=>{
  for (const file of files) {
    console.log('Compiling',file);
    const filename = `${file.split('\\').pop().split('/').pop().split('.').shift()}${process.platform==='win32'?'.exe':''}`
    const outFile = resolve(process.cwd(),'dist',filename);
    await pkg.exec([file,'-t','node18','--output',outFile])
    outputtedFilepaths.push(filename)
  }
  writeFileSync(resolve(process.cwd(),'dist','index.html'),`<!DOCTYPE html><html><head><title>clitools binaries for ${process.platform}</title><link rel="stylesheet" href="https://ministyles.astolfo.gay/all.css" /></head><body>
<h1>Binaries for ${process.platform}</h1>

<ul>
${outputtedFilepaths.map(v=>`<li><a href="./${v}">${v}</a></li>`).join('\n')}
</ul>

<p>
Built at: ${new Date()}
<br/>
<a href="../dist/">Go Back</a>
</p>
</body></html>`)
})()