import { readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const baseDirectory = 'build/public'; 
const outputFile = `${baseDirectory}/service-worker-urls.js`;

function walkSync(directory, filelist = []) {
  readdirSync(directory).forEach((file) => {
    const fullPath = join(directory, file);

    if (statSync(fullPath).isDirectory()) {
      walkSync(fullPath, filelist);
    } else {
      filelist.push(fullPath.replace(baseDirectory + '/', ''));
    }
  });

  return filelist;
}

const files = walkSync(baseDirectory);
files.push("/");

const content = `
  const urlsToCache = ${JSON.stringify(files)};
  self.urlsToCache = urlsToCache;
`;

writeFileSync(outputFile, content);

console.log(`Generated ${outputFile} with ${files.length} URLs.`);
