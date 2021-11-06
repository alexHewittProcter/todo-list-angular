const fs = require('fs');

async function read() {
  try {
    let dir = await fs.readDir('./');
    console.log(dir);
    return dir;
  } catch (rejectedValue) {
    // …
  }
}

await read();
