#!/usr/bin/env node

const { program } = require("@caporal/core");
const fs          = require('fs');
const path        = require('path');
const { spawn }   = require('child_process')

program
  .name("palapa")
  .argument("<file>", "The palapa entry point")
  .action(({ logger, args }) => {
    const { file }  = args;
    const filepath  = path.resolve(file);

    if (!fs.existsSync(filepath)) {
      throw new Error(`File not found: ${filepath}`);
    }

    var options = {
      stdio: "inherit",
      cwd: path.join(__dirname, 'node_modules/@palapa/next'),
      env : {
        ...process.env,
        DEBUG: 'palapa,webpack',
        PALAPA_ENTRYPOINT: filepath
      }
    }
  
    spawn('npm', ['run', 'dev'], options)
  })
  
program.run()
