const { exec } = require('child_process');

console.log('🎵 Installing yt-dlp...');

const commands = [
  'pip install yt-dlp',
  'python -m pip install yt-dlp',
  'pip3 install yt-dlp',
  'python3 -m pip install yt-dlp'
];

async function tryInstall() {
  for (const command of commands) {
    try {
      console.log(`Trying: ${command}`);
      
      await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.log(`❌ Failed: ${command}`);
            reject(error);
          } else {
            console.log(`✅ Success: ${command}`);
            console.log('yt-dlp installed successfully!');
            resolve();
          }
        });
      });
      
      return;
      
    } catch (error) {
      continue;
    }
  }
  
  console.log('⚠️  Could not install yt-dlp automatically.');
  console.log('Please install manually:');
  console.log('  pip install yt-dlp');
}

tryInstall();