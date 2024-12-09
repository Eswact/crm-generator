const fs = require('fs');
const path = require('path');
const siteData = require('./data.js');

const pagesData = siteData;
const jsonFilePath = path.join(__dirname, '../json-site/siteData.json');
const viewsDir = path.join(__dirname, '../json-site/src/views');
const scriptsDir = path.join(__dirname, '../json-site/src/scripts');
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

//Scripts
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}
if (siteData.scripts && siteData.scripts.length > 0) {
  siteData.scripts.forEach(script => {
      const scriptFilePath = path.join(scriptsDir, `${script.name}.js`);
      fs.writeFileSync(scriptFilePath, script.script, 'utf-8');
      console.log(`Script file created: ${scriptFilePath}`);
  });
}

//Views
if (!fs.existsSync(viewsDir)) {
  fs.mkdirSync(viewsDir, { recursive: true });
}
pagesData.pages.forEach((page) => {
  let doms = '';
  page.doms.forEach(function(item,index){
    switch (item.type) {
      case 'datatable':
        doms += `
        <div class="datatable-container">
          <table id="${item.id}" class="display" style="width:100%"></table>
        </div>`;
        break;
      case 'custom':
        doms += item.content;
        break;
    }
  });

  let content = `<template>
  <div class="w-full flex flex-col gap-2">
    <div class="w-full flex flex-col gap-1">
      ${doms}
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  const route = useRoute();
  const router = useRouter();
  import commonFunctions from '../scripts/common.js'
  import { sharedFunctions } from '../scripts/shared.js'
  ${(!page.doms.every(x => x.type != 'datatable'))
    ? `import initializeDataTable from '../scripts/initDatatable';`
    : ''}

  ${page.doms.filter(x => x.type == 'datatable').map(function(item, index) {
    return `let ${item.id}Columns = ${JSON.stringify(item.columns.map(col => ({ title: col, data: col })))};
  let ${item.id}Ajax = {
    url: "${item.ajax.url}",
    type: "${item.ajax.method}",
    dataSrc: "${item.ajax.dataSrc}"
  };
  `;
  }).join('')}

  onMounted(() => {
    ${page.doms.filter(x => x.type == 'datatable').map(function(item, index) {
      return `initializeDataTable('#${item.id}', ${item.id}Ajax, ${item.id}Columns, {});
      `;
    }).join('')}

    ${page.customReadyScripts}
  });

  ${page.customScripts}
</script>`;

  let filePath = path.join(viewsDir, page.file);
  fs.writeFileSync(filePath, content.trim());
  console.log(`Created: ${filePath}`);
});