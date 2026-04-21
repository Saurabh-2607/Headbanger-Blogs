const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content');
const outputFile = path.join(process.cwd(), 'components', 'generated-mdx-components.js');

let imports = [];
let mappings = [];

const dirs = fs.readdirSync(contentDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

dirs.forEach(dir => {
  const dirPath = path.join(contentDir, dir);
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    if (file.endsWith('.jsx') || file.endsWith('.tsx') || (file.endsWith('.js') && file !== 'index.js' && file !== 'page.js' && file !== 'route.js' && file !== 'layout.js')) {
      const componentName = file.replace(/\.(jsx|tsx|js)$/, '');
      const importPath = `../content/${dir}/${componentName}`;
      // Unique variable name for import to avoid collisions like 'Step1' in dir A vs dir B
      const uniqueName = componentName + '_' + dir.replace(/[^a-zA-Z0-9]/g, '');
      
      imports.push(`import ${uniqueName} from '${importPath}';`);
      mappings.push(`  ${componentName}: ${uniqueName},`);
      mappings.push(`  ${componentName.toLowerCase()}: ${uniqueName},`);
    }
  });
});

const fileContent = `// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
${imports.join('\n')}

export const DynamicMDXComponents = {
${mappings.join('\n')}
};
`;

fs.writeFileSync(outputFile, fileContent);
console.log('✅ Generated components/generated-mdx-components.js');
