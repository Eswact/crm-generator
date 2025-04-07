<template>
      <div class="w-full flex flex-col gap-1">
        <div class="w-full py-0  md:px-0 mt-2 flex justify-center items-center"><div class="p-6 w-full max-w-[1000px]"><h1 class="text-3xl font-bold text-center mb-6">Getting Started</h1><ol class="list-decimal list-inside space-y-4"><li><strong>Install Dependencies</strong><p>Open your terminal and run the following command in the <code>generator</code> folder:</p><pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>npm install</code></pre></li><li><strong>Edit <code>data.js</code> in the <code>generator</code> Folder</strong><p>Navigate to the <code>generator</code> folder, open <code>data.js</code>, and make the necessary adjustments to the data.</p></li><li><strong>Generate JSON Files</strong><p>Run the following command in the <code>generator</code> folder:</p><pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>npm run generate</code></pre></li></ol></div></div><div class="w-full py-0  md:px-0 mt-2 flex justify-center items-center">
<div class="p-6 w-full max-w-[1000px]">
    <h1 class="text-3xl font-bold text-center mb-6">Configuration</h1>
    <ol class="list-decimal list-inside space-y-4">
        <li>
            <strong>General </strong>
            <p>This section contains basic information about the site. Visual elements such as logo, site name, icon, page title and SEO information are defined here.</p>
            <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>
{
  "logo": "/images/logo.png",   
  "siteName": "My CRM",         
  "icon": "/images/icon.png",   
  "title": "My CRM"      
}
            </code></pre>
        </li>
        <li>
            <strong>Theme</strong>
            <p>Theme settings control the site design. This includes features like dark mode, colors, and fonts. You can also specify custom colors and the project’s logo and icon. Additionally, this section allows you to include fonts and images in the project directory.</p>
            <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>
"theme": {
  "darkModeEnabled": true,
  "colors": {
    "bg": "#F7F7F7",
    "text": "#333",
    "darkBg": "#091625",
    "darkText": "#FFF",
    "accept": "#4CAF50",
    "cancel": "#DC3545",
    "main": "#87567A",
    "second": "#2F323A",
    "third": "#E3D26F",
    "fourth": "#347FC4",
    "customColors": {
      "test": "00FF00"
      ...
    }
  },
  "font": {
    "family": "Montserrat",
    "size": "14px",
    "custom": [
      {
        "name": "Montserrat",
        "file": "Montserrat.woff2"
      }
      ...
    ]
  },
},
            </code></pre>
        </li>
        <li>
            <strong>Pages</strong>
            <p>In this section, the pages of the site are defined. Information about SEO, page-specific content, and the components used in each page are provided. There are two main types of pages:</p>
            <p class="p-3"><span class="font-semibold">Datatable:</span> A page that includes a table of data that can be dynamically populated through an AJAX call. This is useful for displaying large amounts of data in a structured format with the ability to filter, search, and paginate.</p>
            <p class="p-3 pt-0"><span class="font-semibold">Custom:</span> A page that allows for more customized content. The content is specified directly in the JSON file and can include custom HTML or Vue components.</p>
            <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>
{
  "file": "Configuration.vue",
  "name": "Configuration",
  "path": "/configuration",
  "icon": 'fa-solid fa-layer-group',
  "seo": {
    "title": "Configuration - My CRM",
    "description": "Configuration",
    "keywords": ["Configuration", "options", "settings"]
  },
  "doms": [
    {
      "type": "custom",
      "content": 'Content here'
    },
    {
      "type": "datatable",
      "id": "productsTable",
      "columns": ["title", "url", "albumId", "thumbnailUrl"],
      "ajax": { "url": "https://jsonplaceholder.typicode.com/photos", "method": "GET", "dataSrc": '' },
      "filters": [],
      "toolbar": []
    },
    {
      "type": "custom",
      "content": 'Content here'
    }
  ],
  "customScripts": 'custom scripts',
  "customReadyScripts": 'dom ready custom scripts',
}
            </code></pre>
        </li>
        <li>
            <strong>Custom Scripts</strong>
            <p>Shareable functions and scripts are located here.</p>
            <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>
"scripts": [
  {
    "name": "shared",
    "pages": [],
    "script": "import siteData from '../../siteData.json'
    import commonFunctions from './common';
    const sharedFunctions = {
        getPageByPath: function(path) {
            const currentPageJson = siteData.pages.find(x => x.path == path);
            const formatted = JSON.stringify(currentPageJson);
            commonFunctions.openModal(500, 600, formatted);
        }
    }
    export { sharedFunctions }"
  }
]
            </code></pre>
        </li>
    </ol>
</div>
</div><div class="w-full flex justify-center items-center">
            <div class="w-full py-0 px-6 max-w-[1000px] gap-8 flex justify-between items-center">
              <button @click=examples class="px-4 py-2 bg-third text-white shadow-md text-xl font-bold rounded-lg">Examples</button>
              <button @click="sharedFunctions.getPageByPath(route.path)" class="px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">This Page</button>
            </div>
          </div>
      </div>
    </template>
  
    <script setup>
      import { ref, onMounted, computed, watch } from 'vue';
      import { useRoute, useRouter } from 'vue-router';
      const route = useRoute();
      const router = useRouter();
      import commonFunctions from '../scripts/common.js'
      import { sharedFunctions } from '../scripts/custom/shared.js';
import $ from "jquery";
    
      
      
    
      onMounted(() => {
        
        
    
        
      });
    
      
       function examples() {
          router.push({ path: '/examples' });
        }
      
    </script>
    
    <style scoped>
      
    </style>