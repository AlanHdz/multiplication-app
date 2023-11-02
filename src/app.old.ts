import fs from 'fs';

let outputMessage:string = '';
const base:number = 5;
const headerMessage:string = `
================================
      Tabla del ${base}
=================================\n
`

for (let i = 1;  i < 10; i++) {
  outputMessage += `${base} x ${i} = ${base * 1}\n`;
}

outputMessage = headerMessage + outputMessage

console.log(outputMessage);

const outputPath = 'outputs'

fs.mkdirSync(outputPath, { recursive: true })
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage)
