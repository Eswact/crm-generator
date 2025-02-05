// Imports
const fs = require('fs');
const path = require('path');
const siteData = require('./src/data.js');

// Paths
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

// Utilities
function clearAndCreateDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
  fs.mkdirSync(dirPath, { recursive: true });
}
function copyFiles(sourceDir, targetDir) {
  fs.readdirSync(sourceDir).forEach(file => {
    fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
  });
}

//Images
function copyImages() {
  if (fs.existsSync(paths.sourceImagesDir)) {
    clearAndCreateDir(paths.targetImagesDir);
    copyFiles(paths.sourceImagesDir, paths.targetImagesDir);
  } else {
    console.log(`Source images directory does not exist: ${paths.sourceImagesDir}`);
  }
}

//Fonts
function setFonts() {
  if (fs.existsSync(paths.sourceFontsDir)) {
    clearAndCreateDir(paths.targetFontsDir);
    copyFiles(paths.sourceFontsDir, paths.targetFontsDir);
    createFontsCss();
  } else {
    console.log(`Source fonts directory does not exist: ${paths.sourceFontsDir}`);
  }
}
function createFontsCss() {
  const cssContent = siteData.theme.fonts.custom.map(font => {
    const fileExtension = path.extname(font.file).toLowerCase();
    const formatMap = { '.woff2': 'woff2', '.woff': 'woff', '.ttf': 'truetype', '.otf': 'opentype' };
    const fontFormat = formatMap[fileExtension];

    if (!fontFormat) {
      console.warn(`Unsupported font format for file: ${font.file}`);
      return '';
    }

    return `@font-face { font-family: '${font.name}'; src: url('/fonts/${font.file}') format('${fontFormat}'); }`;
  }).join('\n');

  fs.writeFileSync(paths.fontsCssOutputFile, cssContent);
}

//Json
function createJsonFile() {
  fs.writeFileSync(paths.jsonFilePath, JSON.stringify(siteData, null, 2));
  console.log(`JSON file created: ${paths.jsonFilePath}`);
}

//Scripts
function createCustomScripts() {
  clearAndCreateDir(paths.scriptsDir);
  siteData.scripts.forEach(script => {
    const scriptFilePath = path.join(paths.scriptsDir, `${script.name}.js`);
    fs.writeFileSync(scriptFilePath, script.script, 'utf-8');
    console.log(`Script file created: ${scriptFilePath}`);
  });
}

//Views
function createViews() {
  clearAndCreateDir(paths.viewsDir);

  //Pages
  siteData.pages.forEach(page => {
    //Doms
    let doms = page.doms.map(item => {
      switch (item.type) {
        case 'datatable':
          return createDatatableDom(item);
        case 'custom':
          return item.content;
        default:
          return '';
      }
    }).join('');

    //Script Imports
    let scriptsImports = (siteData.scripts || []).map(script => {
      let thisPageScript = script.pages.find(x => x.name === page.name);
      return thisPageScript ? `import ${thisPageScript.import} from '../scripts/custom/${script.name}.js';` : '';
    }).join('\n');
    (!page.doms.every(x => x.type != 'datatable')) ? scriptsImports += '\nimport datatableService from "../services/datatableService";\nimport $ from "jquery";' : '';

    //Datatable scripts
    const datatableScripts = page.doms.filter(x => x.type === 'datatable').map(item => generateDatatableScript(item)).join('\n');
  
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
      ${scriptsImports}
    
      ${datatableScripts}
    
      onMounted(() => {
        ${page.doms.filter(x => x.type == 'datatable').map(function(item, index) {
          return `${item.name} = datatableService.initializeDataTable('${item.name}', '#${item.id}', ${item.id}Ajax, ${item.id}Columns, ${(item.filters && item.filters.data && item.filters.data.length > 0) ? `${item.id}Filters`: null}, ${item.id}TableOptions, ${item.id}Operations, ${item.id}Options);`;
        }).join('\n')}
    
        ${page.customReadyScripts}
      });
    
      ${page.customScripts}
    </script>
    
    <style scoped>
      ${page.scopedCss || ''}
    </style>`;
    
    let filePath = path.join(paths.viewsDir, page.file);
    fs.writeFileSync(filePath, content.trim());
    console.log(`Created: ${filePath}`);
  });
}
function createDatatableDom(item) {
  let tfoot = '';
  if (item.tableOptions.footerCallback) {
    tfoot += '<tfoot><tr>';
    for(i = 0; i < item.columns.length; i++) {
      tfoot += '<td></td>';
    }
    tfoot += '</tr></tfoot>';
  }
  return `
    <div class="${item.containerClass}">
      <table id="${item.id}" class="display stripe hover" style="width:100%">${tfoot}</table>
    </div>`;
}
function generateDatatableScript(item) {
  return `
var ${item.name};

let ${item.id}Columns = [
  ${item.columns.map(col => `{
    order: ${col.order},
    title: "${col.title}",
    data: "${col.name}",
    name: "${col.name}",
    checkable: ${col.checkable},
    orderable: ${col.orderable},
    render: ${col.render ? col.render.toString() : 'null'},
    className: "${col.className || ''}"
  }`).join(',')}
];

${(item.filters && item.filters.data && item.filters.data.length > 0) 
  ? `let ${item.id}Filters = { data: [${item.filters.data.map(filter => JSON.stringify(filter)).join(',')}] }`
  : ''}
${(item.filters && item.filters.beforeApply) 
  ? `${item.id}Filters.beforeApply = ${item.filters.beforeApply.toString()};`
  : ''}
${(item.filters && item.filters.beforeReset) 
  ? `${item.id}Filters.beforeReset = ${item.filters.beforeReset.toString()};`
  : ''}


let ${item.id}Ajax = {
  url: "${item.ajax.url}",
  type: "${item.ajax.method || 'GET'}",
  dataSrc: ${item.ajax.dataSrc || "''"},
  data: function(d) {
    ${item.ajax.data && item.ajax.data.length > 0
      ? `${item.ajax.data.map(x => `d.${x.name} = ${x.value}`).join(';\n')}`
      : ''
    }
    ${(item.filters && item.filters.data && item.filters.data.length > 0)
    ? `datatableService.updateTableAjaxData("${item.name}", d, ${item.id}Filters.data);`
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

${item.options && item.options["rightClick"] 
  ? `let ${item.id}RightClick = [${item.options["rightClick"].map(x => (`{'name': ${JSON.stringify(x.name)}, 'click': ${x.click}}`)).join(',')}];`
  : `let ${item.id}RightClick = false`}
${item.options && item.options["keyFocus"] 
  ? `let ${item.id}KeyFocusFunction = ${item.options["keyFocus"]};`
  : `let ${item.id}KeyFocusFunction = false`}
${item.options && item.options["key"] 
  ? `let ${item.id}KeyFunction = ${item.options["key"]};`
  : `let ${item.id}KeyFunction = false`}
${(item.options) 
  ? `let ${item.id}Options = ${JSON.stringify(item.options)}`
  : `let ${item.id}Options = {}`}

${item.id}Options["rightClick"] = ${item.id}RightClick;
${item.id}Options['keyFocus'] = ${item.id}KeyFocusFunction;
${item.id}Options['key'] = ${item.id}KeyFunction;

${item.options && item.options.customButtons && item.options.customButtons.length > 0
  ? item.options.customButtons.map((element, index) => {
    return `${item.id}Options.customButtons[${index}].onclick = ${element.onclick.toString()};`;
  }).join('\n')
  : ''
}

${(item.operations) 
  ? `let ${item.id}Operations = ${JSON.stringify(item.operations)}`
  : `let ${item.id}Operations = {}`}
`; 
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