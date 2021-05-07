const svgsDirCommand = {
  command:'--svgsDir',
  desc:'The directory of the SVGs to convert'
}
const spriteDirCommand = {
  command: '--spriteDir',
  desc: 'The destination directory of created sprite'
}
const path = require('path');
const glob = require('glob');
const SVGSpriter = require('svg-sprite');  //npm install svg-sprite
const { readFile, writeFile, mkdir } = require('fs');
const { promisify } = require('util');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
  .command(svgsDirCommand)
  .command(spriteDirCommand)
  .help()
  .wrap(null)
  .argv


const promisifiedReadFile = promisify(readFile);
const promisifiedWriteFile = promisify(writeFile);
const promisifiedMkdir = promisify(mkdir);

const svgsDir = path.join(__dirname, argv.svgsDir ? argv.svgsDir : './src/assets/svg'); // Path of svg directory
const spriteDir = path.join(__dirname, argv.spriteDir ? argv.spriteDir :  './src/assets'); // Path of sprite directory

async function spriterCompileAsync(spriterInstance, config) {
  return new Promise((resolve, reject) => {
    spriterInstance.compile(config, (error, result) => {
      if (error) {
        return reject(error);
      }

      resolve(result);
    });
  });
}

async function generateSpriteFile(spriterInstance, files) {
  const filesContents = await Promise.all(files.map(async file => {
    const fileContent = await promisifiedReadFile(path.join(svgsDir, file), { encoding: 'utf-8' });
    return { fileContent, fileName: file };
  }));

  filesContents.forEach(({ fileContent, fileName }) => spriterInstance.add(
    path.resolve(path.join(svgsDir, fileName)),
    fileName,
    fileContent
  ));

  const spriterCompileConfig = {
    defs: { inline: true }
  };
  const spriterCompileResult = await spriterCompileAsync(spriterInstance, spriterCompileConfig);

  
  // Create svg sprite directory if not exists.
  await promisifiedMkdir(spriteDir, { recursive: true });
  
  const { defs: svgDefs } = spriterCompileResult;
  const svgDefsKeys = Object.keys(svgDefs);

  await Promise.all(
    svgDefsKeys.map(svgDefKey => promisifiedWriteFile(`${spriteDir}/sprite.svg`, svgDefs[svgDefKey].contents))
  );
}

const files = glob.sync('**/*.svg', { cwd: svgsDir });     // Files to convert

const spriter = new SVGSpriter({
  dest: spriteDir,
  svg: true
});

(async () => {
  try {
    await generateSpriteFile(spriter, files);
  } catch (err) {
    console.error(err);
  }
})();
