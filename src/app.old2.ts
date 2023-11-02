import fs from 'fs';
import { yarg } from "./config/plugins/yargs.plugin";


(async () => {
  await main();
})();

async function main() {

  const {b:base, l:limit, s:show} = await yarg
  let outputMessage:string = '';


  const headerMessage:string = `
  ================================
        Tabla del ${base}
  =================================\n
  `
  for (let i = 1;  i <= limit; i++) {
    outputMessage += `${base} x ${i} = ${base * 1}\n`;
  }

  outputMessage = headerMessage + outputMessage
  
  if (show) {
    console.log(outputMessage);
  }

  const outputPath = 'outputs'

  fs.mkdirSync(outputPath, { recursive: true })
  fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage)

}