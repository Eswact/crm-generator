// imports
const fs = require('fs');
const path = require('path');
const siteData = require('./src/data.js');

// paths
const paths = {
  jsonFilePath: path.join(__dirname, '../json-site/siteData.json'),
  viewsDir: path.join(__dirname, '../json-site/src/views'),
  scriptsDir: path.join(__dirname, '../json-site/src/scripts/custom'),
  sourceImagesDir: path.join(__dirname, './src/images'),
  targetImagesDir: path.join(__dirname, '../json-site/public/images'),
  sourceFontsDir: path.join(__dirname, './src/fonts'),
  targetFontsDir: path.join(__dirname, '../json-site/public/fonts'),
  fontsCssOutputFile: path.resolve(__dirname, '../json-site/src/styles/fonts.css'),
}

// utilities
function customSerializer(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "function") {
      return value.toString();
    }
    return value;
  });
}

//Images
function copyImages() {
  if (fs.existsSync(paths.sourceImagesDir)) {
    if (fs.existsSync(paths.targetImagesDir)) { 
      fs.rmSync(paths.targetImagesDir, { recursive: true, force: true });
    }
    fs.mkdirSync(paths.targetImagesDir, { recursive: true }); 
    fs.readdirSync(paths.sourceImagesDir).forEach((file) => {
      let sourceFile = path.join(paths.sourceImagesDir, file);
      let targetFile = path.join(paths.targetImagesDir, file);
      fs.copyFileSync(sourceFile, targetFile);
    });
  } 
  else { console.log(`Source images directory does not exist: ${paths.sourceImagesDir}`); }
}

//Fonts
function setFonts() {
  copyFonts();
  createFontsCss();
}
function copyFonts() {
  if (fs.existsSync(paths.sourceFontsDir)) {
    if (fs.existsSync(paths.targetFontsDir)) { 
      fs.rmSync(paths.targetFontsDir, { recursive: true, force: true });
    }
    fs.mkdirSync(paths.targetFontsDir, { recursive: true }); 
    fs.readdirSync(paths.sourceFontsDir).forEach(file => {
      const sourceFile = path.join(paths.sourceFontsDir, file);
      const targetFile = path.join(paths.targetFontsDir, file);
      fs.copyFileSync(sourceFile, targetFile);
    });
  } 
  else { console.log(`Source fonts directory does not exist: ${paths.sourceFontsDir}`); }
}
function createFontsCss() {
  let cssContent = '';
  siteData.theme.fonts.custom.forEach(font => {
    const fontName = font.name;
    const fontFile = font.file;
    const fileExtension = path.extname(fontFile).toLowerCase();
    const filePath = `/fonts/${fontFile}`;
    const fontFormat = {
      '.woff2': 'woff2',
      '.woff': 'woff',
      '.ttf': 'truetype',
      '.otf': 'opentype'
    }[fileExtension];
    
    if (!fontFormat) {
      console.warn(`Unsupported font format for file: ${fontFile}`);
      return;
    }

    cssContent += `@font-face { font-family: '${fontName}'; src: url('${filePath}') format('${fontFormat}'); }\n`;
  });
  fs.writeFileSync(paths.fontsCssOutputFile, cssContent);
}

//Json
function createJsonFile() {
  fs.writeFileSync(paths.jsonFilePath, JSON.stringify(siteData, null, 2));
  console.log(`JSON file created: ${paths.jsonFilePath}`);
}

//Scripts
function createCustomScripts() {
  if (fs.existsSync(paths.scriptsDir)) { 
    fs.rmSync(paths.scriptsDir, { recursive: true, force: true });
  }
  if (siteData.scripts && siteData.scripts.length > 0) {
    fs.mkdirSync(paths.scriptsDir, { recursive: true });
    siteData.scripts.forEach(script => {
        const scriptFilePath = path.join(paths.scriptsDir, `${script.name}.js`);
        fs.writeFileSync(scriptFilePath, script.script, 'utf-8');
        console.log(`Script file created: ${scriptFilePath}`);
    });
  }
}

//Views
function createViews() {
  if (fs.existsSync(paths.viewsDir)) { 
    fs.rmSync(paths.viewsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(paths.viewsDir, { recursive: true });
  siteData.pages.forEach((page) => {
    let doms = '';
    page.doms.forEach(function(item,index){
      switch (item.type) {
        case 'datatable':
          doms += createDatatableDom(item);
          break;
        case 'custom':
          doms += item.content;
          break;
      }
    });
  
    let content = `
    <template>
      <div class="${page.pageCss || 'w-full flex flex-col gap-1'}">
        ${doms}
      </div>
    </template>
  
    <script setup>
      import { ref, onMounted } from 'vue';
      import { useRoute, useRouter } from 'vue-router';
      const route = useRoute();
      const router = useRouter();
      import commonFunctions from '../scripts/common.js'
      ${
        (siteData.scripts && siteData.scripts.length > 0) 
        ? siteData.scripts.map(function(item, index) {
            let thisPageScript = item.pages.find(x => x.name == page.name);
            let returnStr = '';
            (thisPageScript) ? returnStr = `import ${thisPageScript.import} from '../scripts/custom/${item.name}.js'` : null;
            return returnStr;
          }).join('\n')
        : ''
      }
      ${(!page.doms.every(x => x.type != 'datatable'))
        ? `import datatableHelper from '../scripts/datatableHelper';`
        : ''}
    
        ${page.doms.filter(x => x.type === 'datatable').map(item => `
          var ${item.name};

          let ${item.id}Columns = [
            ${item.columns.map(col => `{
              order: ${col.order},
              title: "${col.title}",
              data: "${col.name}",
              name: "${col.name}",
              checkable: ${col.checkable},
              orderable: ${col.orderable},
              render: ${col.render ? col.render.toString() : 'null'}
            }`).join(',')}
          ];

          ${(item.filters && item.filters.length > 0) 
            ? `let ${item.id}Filters = [${item.filters.map(filter => JSON.stringify(filter)).join(',')}]`
            : ''}
      
          let ${item.id}Ajax = {
            url: "${item.ajax.url}",
            type: "${item.ajax.method || 'GET'}",
            dataSrc: ${item.ajax.dataSrc || "''"},
            data: function(d) {
              ${(item.filters && item.filters.length > 0)
              ? `datatableHelper.updateTableAjaxData("${item.name}", d, ${item.id}Filters);`
              : ''}
            }
          };
    
          let ${item.id}TableOptions = {
            ${Object.entries(item.tableOptions).map(([key, value]) =>
              `${key}: ${ typeof value === 'function' ? value.toString() : JSON.stringify(value) }`)
            .join(',\n')}
          };
          ${item.id}TableOptions.serverSide = ${item.serverSide};
          ${item.id}TableOptions.processing = ${item.serverSide};

          ${(item.operations) 
              ? `let ${item.id}Operations = ${customSerializer(item.operations)}`
              : `let ${item.id}Operations = {}`}
        `).join('')}
    
      onMounted(() => {
        ${page.doms.filter(x => x.type == 'datatable').map(function(item, index) {
          return `${item.name} = datatableHelper.initializeDataTable('${item.name}', '#${item.id}', ${item.id}Ajax, ${item.id}Columns, ${(item.filters && item.filters.length > 0) ? `${item.id}Filters`: null}, ${item.id}TableOptions, ${item.id}Operations, ${item.options ? JSON.stringify(item.options) : '{}'});`;
        }).join('\n')}
    
        ${page.customReadyScripts}
      });
    
      ${page.customScripts}
    </script>`;
    
      let filePath = path.join(paths.viewsDir, page.file);
      fs.writeFileSync(filePath, content.trim());
      console.log(`Created: ${filePath}`);
    });
}
//Views - Utilities
function createDatatableDom(item) {
  return `
    <div class="${item.containerClass}">
      <table id="${item.id}" class="display stripe hover" style="width:100%"></table>
    </div>`;
}


//Generate
function generateSite() {
  copyImages();
  setFonts();
  createJsonFile();
  createCustomScripts();
  createViews();
}


//Run
generateSite();