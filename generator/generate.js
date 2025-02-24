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
        case 'cards':
          return generateCardsDom(item);
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
    scriptsImports += '\nimport $ from "jquery";';
    (!page.doms.every(x => x.type != 'datatable')) ? scriptsImports += '\nimport datatableService from "../services/datatableService";' : '';

    //Datatable scripts
    const datatableScripts = page.doms.filter(x => x.type === 'datatable').map(item => generateDatatableScript(item)).join('\n');
    const cardsScripts = page.doms.filter(x => x.type === 'cards').map(item => generateCardsScript(item)).join('\n');
  
    let content = `
    <template>
      <div class="${page.pageCss || 'w-full flex flex-col gap-1'}">
        ${doms}
      </div>
    </template>
  
    <script setup>
      import { ref, onMounted, computed, watch } from 'vue';
      import { useRoute, useRouter } from 'vue-router';
      const route = useRoute();
      const router = useRouter();
      import commonFunctions from '../scripts/common.js'
      ${scriptsImports}
    
      ${datatableScripts}
      ${cardsScripts}
    
      onMounted(() => {
        ${page.doms.filter(x => x.type == 'datatable').map(function(item, index) {
          return `${item.name} = datatableService.initializeDataTable('${item.name}', '#${item.id}', ${item.id}Ajax, ${item.id}Columns, ${(item.filters && item.filters.data && item.filters.data.length > 0) ? `${item.id}Filters`: null}, ${item.id}TableOptions, ${item.id}Operations, ${item.id}Options);`;
        }).join('\n')}
        ${page.doms.filter(x => x.type == 'cards').map(function(item, index) {
          return `get${item.name}();
          ${item. ordering 
            ? `$('#${item.name}OrderModalButton').off('click').on('click', ${item.name}ToggleOrderVisibility)`
            : ''
          }`;
        }).join('\n')}
    
        ${page.customReadyScripts || ''}
      });
    
      ${page.customScripts || ''}
    </script>
    
    <style scoped>
      ${page.scopedCss || ''}
    </style>`;
    
    let filePath = path.join(paths.viewsDir, page.file);
    fs.writeFileSync(filePath, content.trim());
    console.log(`Created: ${filePath}`);
  });
}
//Datatable
function createDatatableDom(item) {
  let tfoot = '';
  if (item.tableOptions.footerCallback) {
    let totalColumns = item.columns.length;
    let footerLayout = item.options.footerColumns || [];
    
    tfoot += '<tfoot><tr>';
    for (let i = 0; i < totalColumns; i++) {
      let footerCol = footerLayout.find(col => col.column === i);
      if (footerCol) {
          tfoot += `<td colspan="${footerCol.colspan}"></td>`;
          i += footerCol.colspan - 1;
      }
      else {
        tfoot += `<td></td>`;
      }
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
    ${(item.options && item.options.multiRowSelect && item.options.showSelectedRows)
      ? `datatableService.showSelectedRowsAjaxData("${item.name}", d, ${JSON.stringify(item.options.showSelectedRows)});`
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
//Cards
function generateCardsDom(item) {
  let cardsDom = '';
  let pagingDom = '';
  let topBar = '';
  let modals = '';
  let cardData = item.cardLayout.card;
  console.log(item.cardLayout.type);
  switch (item.cardLayout.type) {
    case 1:
      cardsDom = `<div class="w-full flex items-center gap-2 flex-wrap">
        <div
          v-for="card in ${item.name}"
          :key="card.${cardData.id}"
          class="relative w-[calc(20%-0.4rem)] xl:w-[calc(25%-0.4rem)] md:w-[calc(50%-0.4rem)] h-[340px] sm:h-[300px] py-2 px-4 bg-white dark:bg-black text-center flex flex-col items-center justify-around rounded-md shadow-lg"
        >
          <img
            :src="card.${cardData.img} || '/defaults/images/no-image.png'"
            class="w-full h-[50%] sm:h-[45%] object-contain object-center rounded-lg overflow-hidden"
            :alt="card.${cardData.title}"
            onerror="this.src='/defaults/images/no-image.png'"
          />
          <div class="h-[3.5rem] flex justify-center items-center">
            <h2 class="w-full text-xl sm:text-lg font-semibold truncatedText2">{{ card.${cardData.title} }}</h2>
          </div>
          <span class="text-lg sm:text-base font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.${cardData.price}) }}</span>
        </div>
      </div>`
      break;
    case 2:
      cardsDom = `<div class="w-full flex items-center gap-2 flex-wrap">
        <div
          v-for="card in ${item.name}"
          :key="card.${cardData.id}"
          class="relative w-[calc(20%-0.4rem)] xl:w-[calc(25%-0.4rem)] md:w-[calc(50%-0.4rem)] h-[340px] sm:h-[300px] py-2 px-4 bg-white dark:bg-black text-center flex flex-col items-center justify-around rounded-md shadow-lg"
          :data-envanter=card.${cardData.envanter}
          :data-barcode=card.${cardData.barcode}
        >
          <img
            :src="card.${cardData.img} || '/defaults/images/no-image.png'"
            class="w-full h-[50%] sm:h-[45%] object-contain object-center rounded-lg overflow-hidden"
            :alt="card.${cardData.title}"
            onerror="this.src='/defaults/images/no-image.png'"
          />
          <div class="h-[3.5rem] flex justify-center items-center">
            <h2 class="w-full text-xl sm:text-lg font-semibold truncatedText2">{{ card.${cardData.title} }}</h2>
          </div>
          <span class="text-lg sm:text-base font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.${cardData.price}) }}</span>
          <button  class="w-full bg-third border-2 border-third text-white p-1 text-lg font-semibold rounded-lg">Add to basket</button>
        </div>
      </div>`
      break;
    case 3:
      cardsDom = `<div class="w-full flex items-center justify-center gap-2 flex-wrap">
        <div
          v-for="card in ${item.name}"
          :key="card.${cardData.id}"
          class="relative w-[calc(33%-0.3rem)] md:w-[calc(50%-0.4rem)] h-[300px] p-6 bg-white dark:bg-black text-center flex items-start justify-beetween rounded-md shadow-lg"
          :data-envanter=card.${cardData.envanter}
          :data-barcode=card.${cardData.barcode}
        >
          <div class="w-[40%] h-full flex justify-center items-center">
            <img
              :src="card.${cardData.img} || '/defaults/images/no-image.png'"
              class="w-full max-h-full object-contain object-center rounded-lg overflow-hidden"
              :alt="card.${cardData.title}"
              onerror="this.src='/defaults/images/no-image.png'"
            />
          </div>
          <div class="w-[60%] h-full p-6 pr-0 flex flex-col justify-between items-start gap-4">
            <div class="w-full h-full flex flex-col justify-start items-start gap-2">
              <h2 class="text-2xl sm:text-lg text-start font-semibold truncatedText2">{{ card.${cardData.title} }}</h2>
              <span class="text-lg text-third font-semibold">{{card.${cardData.brand}}}</span>
              <span>{{card.${cardData.category}}}</span>
              <span>{{card.${cardData.barcode}}}</span>
              <span>{{card.${cardData.envanter}}}</span>
            </div>
            <span class="text-xl sm:text-base font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.${cardData.price}) }}</span>
          </div>
        </div>
      </div>`
      break;
  }

  if (item.searchBar || item.ordering || item.filters) {
    topBar = `<div class="w-full flex justify-between items-center gap-4 md:flex-col md:justify-center">
      <div class="flex items-center">
        ${item.searchBar ? `<div class="w-[300px] md:w-full relative max-w-full flex items-center justify-end"> <input v-model="${item.name}SearchBar" type="text" placeholder="${item.searchBar.placeholder || 'Search...'}" class="peer w-full pl-4 pr-8 py-2 bg-white dark:bg-opacity-10 border-2 border-second dark:border-white rounded-xl placeholder:text-second dark:placeholder:text-white font-bold md:font-semibold text-lg focus:placeholder:text-fourth focus:border-fourth dark:focus:placeholder:text-fourth dark:focus:border-fourth focus:outline-none"/><i class="fa-solid fa-magnifying-glass absolute right-4 text-lg text-second dark:text-white peer-focus:text-fourth"></i></div>` : ''}
      </div>
      <div class="w-[400px] max-w-full md:w-full flex items-center justify-end gap-4">
        ${item.filters ? `<button class="w-[calc(50%-0.5rem)] bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
          <span class="font-bold md:font-semibold">Filters</span>
          <i class="fa-solid fa-filter"></i>
        </button>` : ''}
        ${item.ordering ? `<button id="${item.name}OrderModalButton" class="w-[calc(50%-0.5rem)] bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
          <span class="font-bold md:font-semibold">Sort</span>
          <i class="fa-solid fa-sort"></i>
        </button>` : ''}
      </div>
    </div>`
  }

  if (item.ordering) {
    modals = `<div v-show="${item.name}OrderModalVisibility" id="${item.name}OrderModal" @click.self="${item.name}ToggleOrderVisibility()" class="z-30 fixed w-full h-full top-0 left-0 bg-black bg-opacity-65 flex justify-center items-center md:items-end">
      <div class="bg-bg text-dark p-4 max-h-full max-w-full min-w-[400px] overflow-y-auto md:w-full md:min-w-[unset] md:pb-8 rounded-lg md:rounded-b-none md:rounded-t-2xl flex flex-col gap-4">
        <div class="w-full flex items-center justify-between mb-1">
          <h2 class="text-2xl font-bold dark:text-darkBg">Sorting</h2>
          <button @click="${item.name}ToggleOrderVisibility()" class="px-2 text-3xl text-red-600"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <label v-for="option in ${item.name}OrderOptions" :key="option.id" :for="option.id" class="w-full px-6 py-3 border border-gray-400 flex items-center gap-4 text-lg font-semibold rounded-md">
          <input
            type="radio"
            :id="option.id"
            name="ordering"
            :checked="${item.name}Ordering === option.value"
            @change="${item.name}Ordering = option.value"
          />
          <span class="dark:text-darkBg">{{ option.name }}</span>
        </label>
      </div>
    </div>`
  }

  if (item.paging) {
    pagingDom = `<div class="flex justify-between items-center">
                <button @click="prevPage" :disabled="shoppingCardsCurrentPage === 1" class="bg-second text-white hover:bg-main duration-200 py-2 w-28 rounded-lg disabled:bg-second/50 dark:disabled:bg-second/20">Previous</button>
                <span>Sayfa {{ shoppingCardsCurrentPage }} / {{ shoppingCardsTotalPages }}</span>
                <button @click="nextPage" :disabled="shoppingCardsCurrentPage === shoppingCardsTotalPages" class="bg-second text-white hover:bg-main duration-200 py-2 w-28 rounded-lg disabled:bg-second/50 dark:disabled:bg-second/20">Next</button>
              </div>`
  }

  return `<div class="w disabled:bg-second/50-full flex flex-col gap-4">
            ${topBar}
            ${cardsDom}
            ${pagingDom}
            ${modals}
          </div>`;
}
function generateCardsScript(item) {
  if (item.ajax) {
    return `
    const ${item.name} = ref([]);
    ${item.ordering ? `const ${item.name}Ordering = ref(${item.ordering.options[0].value});\n const ${item.name}OrderOptions = ref(${JSON.stringify(item.ordering.options)});\n const ${item.name}OrderModalVisibility = ref(false);` : ''}
    ${item.searchBar ? `const ${item.name}SearchBar = ref('');` : ''}
    ${item.filters ? `const ${item.name}Filters = ref({${item.filters.map((e) => `${e.name}: ${e.value}`).join(',')}});` : ''}
    const ${item.name}ViewMode = ref('${item.cardLayout.viewMode?.defaultView || "grid"}');
    ${item.paging ? `const ${item.name}CurrentPage = ref(1);\nconst ${item.name}TotalPages = ref(1);` : ''}

    const get${item.name} = function () {
      const params = {
        ${item.paging ? `currentPage: ${item.name}CurrentPage.value,\n itemsPerPage: ${item.paging.size},` : ''}
        ${item.ordering ? `${item.ordering.name}: ${item.name}Ordering.value,` : ''}
        ${item.searchBar ? `${item.searchBar.name}: ${item.name}SearchBar.value,` : ''}
        ${item.filters ? `...${item.name}Filters.value,` : ''}
      };

      $.ajax({
        url: "${item.ajax.url}",
        type: "${item.ajax.method}",
        ${item.ajax.dataType ? `dataType: "${item.ajax.dataType}",` : ""}
        ${item.ajax.contentType ? `contentType: "${item.ajax.contentType}",` : ""}
        data: ${item.ajax.stringifyData ? "JSON.stringify(params)" : "params"},
        success: function(res) {
          console.log(res);
          ${item.name}.value = res.data;
          ${item.name}TotalPages.value = res.totalPages;
        },
        error: function(err) {
          console.log(err);
        }
      })
    };

    function nextPage() {
      if (${item.name}CurrentPage.value < ${item.name}TotalPages.value) {
        ${item.name}CurrentPage.value++;
        get${item.name}();
      }
    }
    function prevPage() {
      if (${item.name}CurrentPage.value > 1) {
        ${item.name}CurrentPage.value--;
        get${item.name}();
      }
    }
    
    ${item.ordering 
      ? `function ${item.name}ToggleOrderVisibility() { ${item.name}OrderModalVisibility.value = !${item.name}OrderModalVisibility.value };
      watch(${item.name}Ordering, () => { get${item.name}(); });`
      : ''
    }
    ${item.searchBar 
      ? `watch(${item.name}SearchBar, commonFunctions.debounce((value) => { ${item.name}SearchBar.value = value; get${item.name}(); }, ${item.searchBar.delay}));`
      : ''
    }
    ${item.filters
      ? ``
      : ''
    }`
  }
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