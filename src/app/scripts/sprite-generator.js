
/**
 * "npm run svg-sprite"
 */



const path = require('path');
const fs = require('fs');
const glob = require('glob');
const SVGSpriter = require('svg-sprite');  //npm install svg-sprite

const cwd = path.join(__dirname, '../../assets/svg');         // Path of svg directory
const dest = path.join(__dirname, '../../assets/sprites');    // Destination path for sprite
const files = glob.sync('**/*.svg', { cwd });                 // Files to convert

console.log(files);
const spriter = new SVGSpriter({
  dest,
  svg: true
});

/**
 * Add a bunch of SVG files
 *
 * @param {SVGSpriter} spriter          Spriter instance
 * @param {Array} files                 SVG files
 * @return {SVGSpriter}                 Spriter instance
 */
function addFixtureFiles(spriter, files) {
  files.forEach(file => {
    spriter.add(
      path.resolve(path.join(cwd, file)),
      file,
      fs.readFileSync(path.join(cwd, file), { encoding: 'utf-8' })
    );
  });
  return spriter;
}

addFixtureFiles(spriter, files).compile({
  defs: {
    inline: true
  }
}, (error, result) => {

  for (const type in result.defs) {
    if (Object.prototype.hasOwnProperty.call(result.defs, type)) {
      fs.mkdirSync(path.dirname("../../assets/sprites/sprite.svg"), { recursive: true });
      fs.writeFileSync("../../assets/sprites/sprite.svg", result.defs[type].contents);
    }
  }
});
