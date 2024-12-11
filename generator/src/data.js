module.exports = { 
  "logo": "/images/logo.png",
  "siteName": "My CRM",
  "icon": "/images/icon.png",
  "title": "My CRM",
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
        "deneme": "#FF0000",
        "test": "00FF00"
      }
    },
    "fonts": {
      "family": "Montserrat",
      "size": "14px",
      "custom": [
        {
          "name": "Montserrat",
          "file": "Montserrat.woff2"
        }
      ]
    },
  },
  "pages": [
    {
      "file": "Introduction.vue",
      "name": "Introduction",
      "path": "/",
      "icon": 'fa-solid fa-home',
      "seo": {
        "description": "Manage your profile information",
        "keywords": ["home", "main", "introduction"]
      },
      "doms": [
        {
          "type": "custom",
          "content": `<div class="w-full flex flex-col gap-6 justify-center items-center text-lg">
            <h1 class="text-main text-center text-[2.25rem] leading-10 font-bold">JSON-Based Dynamic CRM Generator</h1>
            <div class="max-w-[1000px] flex flex-col gap-4 justify-center items-center">
              <p class="text-center">The project's goal is to simplify the process of website development, particularly for CRM systems, by utilizing a JSON file and local resources. It enables dynamic generation of a Vue 3 and Tailwind CSS-based website using predefined configurations in the JSON file, making it easier to create, customize, and maintain websites.</p>
              <img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl dark:hidden" title="process" src="/images/process.png" />
              <img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl hidden dark:block" title="process" src="/images/process-dark.png" />
            </div>
            <div class="max-w-[1000px] flex flex-col gap-4 justify-center items-center">
              <h2 class="text-main text-center text-[1.75rem] font-semibold">JSON Configuration</h2>
              <p>The JSON file forms the foundation of the project and includes the following key components:</p>
              <img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl dark:hidden" title="json config" src="/images/json-detail.png" />
              <img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl hidden dark:block" title="json config" src="/images/json-detail-dark.png" />
              <span>
                <span class="font-semibold">General Information: </span>
                In addition to the website's name and logo, it also includes metadata details such as the title, description, and icon.
              </span>
              <span>
                <span class="font-semibold">Themes: </span>
                Specifies settings for visual elements such as color schemes, dark mode enablement, and font configurations. These settings define the overall aesthetic of the website.
              </span>
              <span>
                <span class="font-semibold">Pages: </span>
                Each page is defined within the JSON structure, detailing its layout and the components used. Pages also include a variety of content types to streamline development like DataTable, customType
              </span>
              <span>
                The content types are integrated directly within the page definitions, making it easier to construct dynamic DOM structures that align with the project's requirements. This approach ensures that the JSON file can handle both general and page-specific configurations efficiently.
              </span>
            </div>      
          </div>`
        },
        {
          "type": "custom",
          "content": `<div class="w-full py-2 mt-2 flex justify-center items-center">
            <div class="w-full max-w-[1000px] gap-8 flex justify-between items-center">
              <button @click=gettingStarted class="px-4 py-2 bg-third text-white shadow-md text-xl font-bold rounded-lg">Getting Started</button>
              <button @click="sharedFunctions.getPageByPath(route.path)" class="px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">This Page</button>
            </div>
          </div>`
        }
      ],
      "customScripts": `
        function gettingStarted() {
          router.push({ path: '/configuration' });
        }
      `,
      "customReadyScripts": ``,
    },
    {
      "file": "ConfigurationPage.vue",
      "name": "Configuration",
      "path": "/configuration",
      "icon": 'fa-solid fa-hammer',
      "seo": {
        "title": "Configuration - My CRM",
        "description": "Configuration",
        "keywords": ["Configuration", "options", "settings"]
      },
      "doms": [
        {
          "type": "custom",
          "content": `<div class="w-full py-0  md:px-0 mt-2 flex justify-center items-center">
<div class="p-6 w-full max-w-[1000px]">
    <h1 class="text-3xl font-bold text-center mb-6">Getting Started</h1>
    <ol class="list-decimal list-inside space-y-4">
        <li>
            <strong>Install Dependencies</strong>
            <p>Open your terminal and run the following command in both the <code>generator</code> and <code>json-site</code> folders:</p>
            <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>npm install</code></pre>
        </li>
        <li>
            <strong>Edit <code>data.js</code> in the <code>generator</code> Folder</strong>
            <p>Navigate to the <code>generator</code> folder, open <code>data.js</code>, and make the necessary adjustments to the data.</p>
        </li>
        <li>
            <strong>Generate JSON Files</strong>
            <p>Run the following command in the <code>json-site</code> folder:</p>
            <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>npm run generate</code></pre>
        </li>
    </ol>
</div>
</div>
`
        },
        {
          "type": "custom",
          "content": `<div class="w-full py-0  md:px-0 mt-2 flex justify-center items-center">
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
</div>`
        },
        {
          "type": "custom",
          "content": `<div class="w-full flex justify-center items-center">
            <div class="w-full py-0 px-6 max-w-[1000px] gap-8 flex justify-between items-center">
              <button @click=examples class="px-4 py-2 bg-third text-white shadow-md text-xl font-bold rounded-lg">Examples</button>
              <button @click="sharedFunctions.getPageByPath(route.path)" class="px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">This Page</button>
            </div>
          </div>`
        }
      ],
      "customScripts": `
       function examples() {
          router.push({ path: '/examples' });
        }
      `,
      "customReadyScripts": ``,
    },
    {
      "file": "ExamplesPage.vue",
      "name": "Examples",
      "path": "/examples",
      "icon": 'fa-solid fa-chart-simple',
      "seo": {
        "title": "Examples - My CRM",
        "description": "Overview of Examples",
        "keywords": ["example", "demo", "try"]
      },
      "pageCss": "w-full flex flex-col gap-8",
      "doms": [
        {
          "type": "datatable",
          "containerClass": "w-full",
          "id": "messagesTable",
          "columns": [
            {
              order: 0,
              name: 'postId',
              title: 'Group',
              checkable: true,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex justify-center items-center font-bold text-2xl">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              },
            },
            {
              order: 1,
              name: 'name',
              title: 'Name',
              checkable: false,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              },
            },
            {
              order: 2,
              name: 'email',
              title: 'Mail',
              checkable: true,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              },
            },
            {
              order: 3,
              name: 'body',
              title: 'Message',
              checkable: false,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              },
            }
          ],
          "ajax": { 
            url: "https://jsonplaceholder.typicode.com/comments", 
            method: "GET", 
            dataSrc: '', 
            data: function (d) {}
          },
          "options": {
            dom: '<"w-full flex justify-between items-center md:flex-col md:justify-center"<"toolbar"><l>>rt<"w-full flex justify-between items-center md:flex-col md:justify-center"<i><p>>',
            drawCallback: function (settings, data) {console.log(data)},
            fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) {},
            fnInitComplete: function () {},
          }
        },
        {
          "type": "datatable",
          "containerClass": "w-full",
          "id": "productsTable",
          "columns": [
            {
              order: 0,
              name: 'title',
              title: 'Title',
              checkable: false,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex w-full gap-6 items-center">
                                <img class="w-[200px]" src="${row.url}" />
                                <div class="max-w-[250px] font-semibold text-xl">${data}</div>
                            </div>`;
                }
                else { return ''; }
              },
            },
            {
              order: 1,
              name: 'albumId',
              title: 'Album No',
              checkable: true,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="w-full flex justify-center items-center font-bold text-xl">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              },
            },
            {
              order: 2,
              name: 'thumbnailUrl',
              title: 'Thumbnail',
              checkable: true,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex w-full">
                                <img src="${data}" />
                            </div>`;
                }
                else { return ''; }
              },
            }
          ],
          "ajax": { 
            url: "https://jsonplaceholder.typicode.com/photos", 
            method: "GET", 
            dataSrc: '', 
            data: function (d) {}
          },
          "options": {
            dom: '<"w-full flex justify-between items-center md:flex-col md:justify-center"<"toolbar"><l>>rt<"w-full flex justify-between items-center md:flex-col md:justify-center"<i><p>>',
            drawCallback: function (settings, data) {console.log(data)},
            fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) {},
            fnInitComplete: function () {},
          }
        },
      ],
      "customScripts": ``,
      "customReadyScripts": ``,
    },
    {
      "file": "Community.vue",
      "name": "Community",
      "path": "/community",
      "icon": 'fa-solid fa-user-group',
      "seo": {
        "title": "Community - My CRM",
        "description": "Community",
        "keywords": ["community", "comments"]
      },
      "doms": [
        {
          "type": "custom",
          "content": `<div>Contact Form?</div>`
        }
      ],
      "customScripts": ``,
      "customReadyScripts": ``,
    }
  ],
  "scripts": [
    {
      "name": "shared",
      "pages": [], //all ?
      "script": `
        import siteData from '../../../siteData.json'
        import commonFunctions from '../common';
        const sharedFunctions = {
            getPageByPath: function(path) {
                const currentPageJson = siteData.pages.find(x => x.path == path);
                const formatted = JSON.stringify(currentPageJson, null, 2).replace(/</g, "&lt;").replace(/>/g, "&gt;");
                let modalHtml = '<pre class="bg-darkBg text-bg p-4 rounded-sm font-mono text-sm whitespace-pre-wrap">' + formatted + '</pre>'
                commonFunctions.openModal(500, 600, modalHtml);
            }
        }
        export { sharedFunctions }
      `
    }
  ]
};