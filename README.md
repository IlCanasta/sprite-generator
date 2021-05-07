# SpriteGenerator
Script based on svg-sprite package [https://github.com/svg-sprite/svg-sprite]  
It takes a bunch of svg from a your local directory and rewrite them into a sprite svg file.  
The *resource* and *destination* paths can be handled. *see below*.  

# The script  
Run `node sprite-generator.js` for convert all your svg into a sprite.  
  
Run `node sprite-generator.js --help`to get some tips.  
  
Run `node sprite-generator.js --svgsDir *yourPath*` for set dynamic path from wich the script will get svgs.  
  
Run `node sprite-generator.js --spriteDir *yourPath*` for set dynamic path where the script will write the sprite.  

# Default paths    
By default the svgsDir is: *`./src/assets/svg`*  and the spriteDir is *`./src/assets`*  
```javascript
  
const svgsDir = path.join(__dirname, argv.svgsDir ? argv.svgsDir : './src/assets/svg'); // Path of svg directory
const spriteDir = path.join(__dirname, argv.spriteDir ? argv.spriteDir :  './src/assets'); // Path of sprite directory
  
```
