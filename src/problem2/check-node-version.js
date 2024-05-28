const requiredVersion = '18.16.1';
const currentVersion = process.version.slice(1);

if (currentVersion !== requiredVersion) {
  console.error(
    `Incorrect Node.js version. Expected ${requiredVersion}, but got ${currentVersion}, try nvm install & nvm use.`
  );
  process.exit(1);
} else {
  console.log(`Node.js version ${currentVersion} is correct. OK!!!`);
}
