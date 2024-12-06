const fs = require('fs');
const path = require('path');
const siteData = require('./data.js');

const pagesData = siteData;
const jsonFilePath = path.join(__dirname, '../json-site/siteData.json');
const viewsDir = path.join(__dirname, '../json-site/src/views');
const sourceImagesDir = path.join(__dirname, './images');
const targetImagesDir = path.join(__dirname, '../json-site/public/images');
const sourceFontsDir = path.join(__dirname, './fonts');
const targetFontsDir = path.join(__dirname, '../json-site/public/fonts');
const fontsCssOutputFile = path.resolve(__dirname, '../json-site/src/styles/fonts.css');


//Json
fs.writeFileSync(jsonFilePath, JSON.stringify(siteData, null, 2));
console.log(`JSON file created: ${jsonFilePath}`);

//Images
if (fs.existsSync(sourceImagesDir)) {
  if (!fs.existsSync(targetImagesDir)) {
    fs.mkdirSync(targetImagesDir, { recursive: true });
  }

  fs.readdirSync(sourceImagesDir).forEach((file) => {
    let sourceFile = path.join(sourceImagesDir, file);
    let targetFile = path.join(targetImagesDir, file);

    fs.copyFileSync(sourceFile, targetFile);
    console.log(`Copied image: ${file}`);
  });
} else {
  console.log(`Source images directory does not exist: ${sourceImagesDir}`);
}

//Fonts
if (fs.existsSync(sourceFontsDir)) {
  if (!fs.existsSync(targetFontsDir)) {
    fs.mkdirSync(targetFontsDir, { recursive: true });
  }

  fs.readdirSync(sourceFontsDir).forEach(file => {
    let sourceFile = path.join(sourceFontsDir, file);
    let targetFile = path.join(targetFontsDir, file);
    fs.copyFileSync(sourceFile, targetFile);
  });
}
else {
  console.log(`Source fonts directory does not exist: ${sourceFontsDir}`);
}
//Fonts css
let cssContent = '';
siteData.theme.font.custom.forEach(font => {
  const fontName = font.name;
  const fontFile = font.file;
  const fileExtension = path.extname(fontFile).toLowerCase();
  const filePath = `/fonts/${fontFile}`;

  let fontFormat = '';
  if (fileExtension === '.woff2') {
    fontFormat = 'woff2';
  } else if (fileExtension === '.woff') {
    fontFormat = 'woff';
  } else if (fileExtension === '.ttf') {
    fontFormat = 'truetype';
  } else if (fileExtension === '.otf') {
    fontFormat = 'opentype';
  } else {
    console.warn(`Unsupported font format for file: ${fontFile}`);
    return;
  }

  cssContent += `
@font-face {
  font-family: '${fontName}';
  src: url('${filePath}') format('${fontFormat}');
}
  `;
  console.log(`Font added to CSS: ${fontName}`);
});
fs.writeFileSync(fontsCssOutputFile, cssContent);


//Views
if (!fs.existsSync(viewsDir)) {
  fs.mkdirSync(viewsDir, { recursive: true });
}
pagesData.pages.forEach((page) => {
  let components = '';
  page.components.forEach(function(item,index){
    switch (item.type) {
      case 'datatable':
        components += `
        <div class="datatable-container">
          <table id="${item.id}" class="display" style="width:100%"></table>
        </div>`;
        break;
    }
  });

  let content = `
<template>
  <div>
    <div class="w-full flex justify-between items-center dark:text-white text-main text-[2rem]"><h1>${page.name}</h1></div>
    ${components}

    ${page.customDoms}
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  ${(!page.components.every(x => x.type != 'datatable')) 
    ? `import initializeDataTable from '../scripts/initDatatable';`
    : ''}

  ${(!page.components.every(x => x.type != 'datatable')) 
    ? `let tableColumns = ${JSON.stringify(page.components.find(x=>x.type == "datatable").columns.map(col => ({ title: col, data: col })))};
    let ajaxReq = {
      url: "${page.components.find(x=>x.type == "datatable").ajax.url}",
      type: "${page.components.find(x=>x.type == "datatable").ajax.method}",
      dataSrc: "${page.components.find(x=>x.type == "datatable").ajax.dataSrc}"
    };`
    : ''}

  onMounted(() => {
  ${(page.components.find(x=>x.type == "datatable"))
    ? `initializeDataTable('#${page.components.find(x=>x.type == "datatable").id}', ajaxReq, tableColumns, {})`
    : ''}
  });
 
  ${page.customScripts}
</script>
  `;
  let filePath = path.join(viewsDir, page.file);
  fs.writeFileSync(filePath, content.trim());
  console.log(`Created: ${filePath}`);
});