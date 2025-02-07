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
  "splashDefaultContext": `<img src="/images/loading.gif" />`,
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
          "content": `<div class="w-full flex flex-col gap-6 justify-center items-center text-lg"><h1 class="text-main text-center text-[2.25rem] leading-10 font-bold">JSON-Based Dynamic CRM Generator</h1><div class="max-w-[1000px] flex flex-col gap-4 justify-center items-center"><p class="text-center">The project's goal is to simplify the process of website development, particularly for CRM systems, by utilizing a JSON file and local resources. It enables dynamic generation of a Vue 3 and Tailwind CSS-based website using predefined configurations in the JSON file, making it easier to create, customize, and maintain websites.</p><img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl dark:hidden" title="process" src="/images/process.png" /><img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl hidden dark:block" title="process" src="/images/process-dark.png" /></div><div class="max-w-[1000px] flex flex-col gap-4 justify-center items-center"><h2 class="text-main text-center text-[1.75rem] font-semibold">JSON Configuration</h2><p>The JSON file forms the foundation of the project and includes the following key components:</p><img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl dark:hidden" title="json config" src="/images/json-detail.png" /><img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl hidden dark:block" title="json config" src="/images/json-detail-dark.png" /><span><span class="font-semibold">General Information: </span>In addition to the website's name and logo, it also includes metadata details such as the title, description, and icon.</span><span><span class="font-semibold">Themes: </span>Specifies settings for visual elements such as color schemes, dark mode enablement, and font configurations. These settings define the overall aesthetic of the website.</span><span><span class="font-semibold">Pages: </span>Each page is defined within the JSON structure, detailing its layout and the components used. Pages also include a variety of content types to streamline development like DataTable, customType</span><span>The content types are integrated directly within the page definitions, making it easier to construct dynamic DOM structures that align with the project's requirements. This approach ensures that the JSON file can handle both general and page-specific configurations efficiently.</span></div></div>`
        },
        {
          "type": "custom",
          "content": `<div class="w-full py-2 mt-2 flex justify-center items-center"><div class="w-full max-w-[1000px] gap-8 flex justify-between items-center"><button @click=gettingStarted class="px-4 py-2 bg-third text-white shadow-md text-xl font-bold rounded-lg">Getting Started</button><button @click="sharedFunctions.getPageByPath(route.path)" class="px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">This Page</button></div></div>`
        }
      ],
      "scopedCss": ``,
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
          "content": `<div class="w-full py-0  md:px-0 mt-2 flex justify-center items-center"><div class="p-6 w-full max-w-[1000px]"><h1 class="text-3xl font-bold text-center mb-6">Getting Started</h1><ol class="list-decimal list-inside space-y-4"><li><strong>Install Dependencies</strong><p>Open your terminal and run the following command in both the <code>generator</code> and <code>json-site</code> folders:</p><pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>npm install</code></pre></li><li><strong>Edit <code>data.js</code> in the <code>generator</code> Folder</strong><p>Navigate to the <code>generator</code> folder, open <code>data.js</code>, and make the necessary adjustments to the data.</p></li><li><strong>Generate JSON Files</strong><p>Run the following command in the <code>json-site</code> folder:</p><pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>npm run generate</code></pre></li></ol></div></div>`
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
          "name": "messagesTable",
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
          // "filters": [],
          "ajax": { 
            url: "https://jsonplaceholder.typicode.com/comments", 
            method: "GET", 
            dataSrc: '', 
            // data: function (d) {}
          },
          "serverSide": false,
          "tableOptions": {
            drawCallback: function (settings, data) {},
            fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) {},
            fnInitComplete: function () {},
          }
        },
        {
          "type": "custom",
          "content": `<div class="w-full flex justify-center items-center">
            <div class="w-full py-0 gap-8 flex justify-between items-center">
              <div></div>
              <button @click="sharedFunctions.getPageByPath(route.path)" class="px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">This Page</button>
            </div>
          </div>`
        }
      ],
      "customScripts": `
        import { toast } from "vue3-toastify";
        function gettingStarted() {
          router.push({ path: '/configuration' });
        }
      `,
      "customReadyScripts": `
        toast.success("Toast Test!");
        commonFunctions.useSplashScreen({"title": "Example Splash", "description": "This is an example splash screen. This splash close automatically in 3 seconds.", "buttons": [{"text": "Close Now", "action": commonFunctions.hideSplashScreen}], "timeout": 3000});
      `,
      "help": {
        "page": "Examples Page",
        "info": "In this page, you can see a list of examples. Example Dom types are: DataTable and custom. If you want to see this page's json you can click the 'this page' button at the bottom of the page.",
        "shortcuts": [
          {
            "shortcut": [
              {
                "key": "/images/ctrl_key.png"
              },
              {
                "key": "/images/letter_k.png"
              }
            ],
            "shortcutDescription": "Example shortcut description."
          },
          {
            "shortcut": [
              {
                "key": "/images/esc_key.png"
              }
            ],
            "shortcutDescription": "For the cancel."
          },
          {
            "shortcut": [
              {
                "key": "/images/right-click.png"
              }
            ],
            "shortcutDescription": "Example shortcut description."
          }
        ],
        "link": "https://www.youtube.com/embed/pad_iFvqtYw?si=cWmRAfFFvFuJR8Hj"
      }
    },
    {
      "file": "Datatables.vue",
      "name": "Datatables",
      "path": "/datatables",
      "icon": 'fa-solid fa-table',
      "seo": {
        "title": "Datatables - My CRM",
        "description": "In this page you can see datatable examples.",
        "keywords": ["datatable", "example", "table"]
      },
      "pageCss": "w-full flex flex-col justify-center items-center gap-8",
      "doms": [
        {
          "type": "datatable",
          "containerClass": "w-full",
          "id": "transferedAutomatTable",
          "name": "transferedAutomatTable",
          "columns": [
            {
              order: 1,
              name: 'model',
              title: 'Model',
              checkable: true,
              orderable: false,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="py-2 px-4 flex items-center font-semibold text-second dark:text-fourth">
                                ${data}
                            </div>`;
                }
                else { return '<div class="py-2 px-4 flex items-center font-semibold text-second dark:text-fourth">-</div>'; }
              },
            },
            {
              order: 0,
              name: 'plate',
              title: 'Plate',
              checkable: false,
              orderable: false,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="p-2 flex items-center font-bold text-lg">
                                ${data}
                            </div>`;
                }
                else { return '<div class="p-2 flex items-center font-bold text-xl">-</div>'; }
              },
            },
            {
              order: 2,
              name: 'customerName',
              title: 'Customer',
              checkable: true,
              orderable: false,
            },
            {
              order: 3,
              name: 'location',
              title: 'Location',
              checkable: true,
              orderable: false,
            },
            {
              order: 4,
              name: 'transferedTime',
              title: 'Date',
              checkable: true,
              orderable: true,
              render: function (data, type, row) {
                if (data != null) {
                    return dateTrFormat(data);  
                }
                else { return ''; }
              },
            }
          ],
          "filters": {
            "data": [
            {
              "data":"IsField",
              "name":"IsField",
              "type":"check",
              "value": true,
              "default": true,
              "visible": false
            },
            {
              "data":"plate",
              "name":"Plate",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"model",
              "name":"Model",
              "type":"select",
              "options": [
                {
                  "value": "AA-91",
                  "label": "AA-91"
                }    
              ],
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"customerId",
              "name":"Customer",
              "type":"select",
              "options": [
                {
                  "value": "1",
                  "label": "Eren"
                }    
              ],
              "value": null,
              "default": null,
              "visible": true
            }
            ],
          },
          "ajax": { 
            url: "http://localhost:44350/warehouse/get-automats", 
            method: "POST", 
            dataSrc: function (json) { return json.data; },
            data: [
              {
                "name": "forTest",
                "value": 4
              }
            ]
          },
          "serverSide": true,
          "tableOptions": {
            drawCallback: function (settings, data) {},
            fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) {},
            fnInitComplete: function () {console.log('fnInitComplete')},
            order: [[4, 'desc']],
            keys: true,
          },
          "options": {
            "keyFocus": function (e, datatable, cell, originalEvent) {
              console.log('Key focus on: ', cell.index());
            },
            "key": function (e, datatable, key, cell, originalEvent) {
              console.log(cell.node());
              if (key === 13 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
                  alert("Enter pressed");
              }
            },
          }
        },
        {
          "type": "datatable",
          "containerClass": "w-full",
          "id": "createdAutomatTable",
          "name": "createdAutomatTable",
          "columns": [
            { 
              order: 0,
              name: 'plate',
              title: 'Plate',
              checkable: false,
              orderable: false,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="p-2 flex items-center font-bold text-lg">
                                ${data}
                            </div>`;
                }
                else { return '<div class="p-2 flex items-center font-bold text-xl">-</div>'; }
              },
            },
            {
              order: 1,
              name: 'model',
              title: 'Model',
              checkable: true,
              orderable: false,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="py-2 px-4 flex items-center font-semibold text-second dark:text-fourth">
                                ${data}
                            </div>`;
                }
                else { return '<div class="py-2 px-4 flex items-center font-semibold text-second dark:text-fourth">-</div>'; }
              },
            },
            {
              order: 2,
              name: 'imeiAndroid',
              title: 'Android Imei',
              checkable: true,
              orderable: false,
              className: 'notSelectRow',
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="notSelectRow py-2 px-4 flex items-center">
                              <input type="text" class="editableTdInput hidden notSelectRow w-full h-full border-none bg-transparent p-2" value="${data}" data-temp=${data} data-first=${data} data-name="androidImei" />
                              <span class="editableText notSelectRow p-2" data-name="imeiAndroid">${data}</span>
                            </div>`;
                }
                else { return '-'; }
              },
            },
            {
              order: 3,
              name: 'macAndroid',
              title: 'Android Mac',
              checkable: true,
              orderable: false,
              className: 'notSelectRow',
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="notSelectRow py-2 px-4 flex items-center">
                              <input type="text" class="editableTdInput hidden notSelectRow w-full h-full border-none bg-transparent p-2" value="${data}" data-first=${data} data-temp=${data} data-name="androidMac" />
                              <span class="editableText  notSelectRow p-2" data-name="macAndroid">${data}</span>
                            </div>`;
                }
                else { return '-'; }
              },
            },
            {
              order: 4,
              name: 'imeimodem',
              title: 'Modem Imei',
              checkable: true,
              orderable: false,
            },
            {
              order: 5,
              name: 'macmodem',
              title: 'Modem Mac',
              checkable: true,
              orderable: false,
            },
            {
              order: 6,
              name: 'imeiplc',
              title: 'PLC Imei',
              checkable: true,
              orderable: false,
            },
            {
              order: 7,
              name: 'macplc',
              title: 'PLC Mac',
              checkable: true,
              orderable: false,
            },
            {
              order: 8,
              name: null,
              title: 'Test',
              checkable: true,
              orderable: false,
              render: function (data, type, row) {
                return `<div class="w-full h-full flex px-2 items-center"><button data-manufactid='${row.manufactId}' class="alertManufactIdButton notSelectRow px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">Test</button></div>`;
              },
            }
          ],
          "filters": {
            "data": [
            {
              "data":"plate",
              "name":"Plate",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"model",
              "name":"Model",
              "type":"select",
              "options": [
                {
                  "value": "AA-91",
                  "label": "AA-91"
                }    
              ],
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"androidImei",
              "name":"Android Imei",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"androidMac",
              "name":"Android Mac",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"modemImei",
              "name":"Modem Imei",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"modemMac",
              "name":"Modem Mac",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"plcImei",
              "name":"PLC Imei",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"plcMac",
              "name":"PLC Mac",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            }
            ],
            "beforeApply": function () { 
              console.log('test apply');
              console.log('test apply');
            },
            "beforeReset": function () { 
              console.log('test reset');
              console.log('test reset');
            },
          },
          "ajax": { 
            url: "http://localhost:44350/production/get-manufacts", 
            method: "POST", 
            dataSrc: function (json) { return json.responseData; },
            data: [
              {
                "name": "changedCells",
                "value": "$('#showChangedCells').is(':checked') && $('#showChangedCells').is(':visible')  ?  createdAutomatTableCellUpdates.map(item => (item.id)) : null"
              },
              {
                "name": "forTest",
                "value": 4
              }
            ]
          },
          "serverSide": true,
          "tableOptions": {
            drawCallback: function (settings, data) {
              if (createdAutomatTableCellUpdates != '') {
                createdAutomatTable.rows((idx, data, row) => {
                  $(createdAutomatTableCellUpdates).each(function () {
                      if (data.manufactId == this.id) {
                          let rowElement = $(row).get(0);
                          //input
                          let cellInput = $(rowElement).find(`.editableTdInput[data-name="${this.name}"]`);
                          cellInput.val(this.value);
                          cellInput.data("temp", this.value);
                          // text
                          $(cellInput).siblings(`.editableText`).text(this.value);
                          // cell
                          cellInput.closest('td').addClass('border-2 border-green-500 bg-green-500 bg-opacity-10');
                      }
                  });
                });
              }

              $('.alertManufactIdButton').off('click').on('click', function () {
                alert($(this).data('manufactid'));
              });
            },
            fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) {},
            fnInitComplete: function () {},
            order: false,
            keys: true
          },
          "options": {
            "rowSelect": true,
            "rightClick": [
              {
                "name": "Edit",
                "click": function(rowData) {
                  alert(`Edit: ${rowData.manufactId}`);
                }
              },
              {
                "name": "Delete",
                "click": function(rowData) {
                  alert(`Delete: ${rowData.manufactId}`);
                }
              },
              {
                "name": "Test",
                "click": function(rowData) {
                  commonFunctions.openModal(500, 600, rowData.manufactId);
                }
              }
            ],
            "keyFocus": function (e, datatable, cell, originalEvent) {
              $(".editableTdInput").blur();

              let input = (cell.node != undefined) ? $(cell.node()).find(".editableTdInput") : '';
              if (input.length) {
                input.removeClass("hidden");
                input.siblings(".editableText").addClass("hidden");
                input.focus().select();

                let firstVal = input.data("first");
                let tempVal = input.data("temp");
                let updateName = input.data("name");
                let rowData = datatable.row(cell.index().row).data();

                input.off("keydown.tdInputKeydown").on("keydown.tdInputKeydown", function (e) {
                  if (e.keyCode === 13 || e.keyCode === 9) {
                    e.preventDefault();
                    input.blur();
                  } else if (e.keyCode === 27) {
                    e.preventDefault();
                    input.val(tempVal);
                    input.blur();
                  } else if (
                    (e.keyCode >= 48 && e.keyCode <= 57) || // Numbers
                    (e.keyCode >= 96 && e.keyCode <= 105) || // Numpad
                    e.keyCode === 8 || // Backspace
                    e.keyCode === 46 || // Delete
                    e.keyCode === 37 || // Left Arrow
                    e.keyCode === 38 || // Up Arrow
                    e.keyCode === 39 || // Right Arrow
                    e.keyCode === 40 // Down Arrow
                  ) {
                    return true;
                  } else {
                    e.preventDefault();
                    return false;
                  }
                });

                input.off("blur.tdInputBlur").on("blur.tdInputBlur", function () {
                  input.addClass("hidden");
                  input.siblings(".editableText").removeClass("hidden");
                  let inputVal = input.val();
                  if (inputVal === null || inputVal === "") {
                    input.val(firstVal);
                  }
                  if (String(inputVal) != String(firstVal)) {
                    add2UpdatedCells(updateName, rowData.manufactId, inputVal, rowData);
                    input.data("temp", inputVal);
                    input.siblings(".editableText").text(inputVal);
                    $(cell.node()).addClass("border-2 border-green-500 bg-green-500 bg-opacity-10");
                  } else {
                    remove2UpdatedCells(updateName, rowData.manufactId);
                    $(cell.node()).removeClass("border-2 border-green-500 bg-green-500 bg-opacity-10");
                  }
                });
              }
            },
            "key": function (e, datatable, key, cell, originalEvent) {
              let input = (cell != undefined) ? $(cell.node()).find(".editableTdInput") : '';
              if (input.length) {
                if (key === 13) {
                  if (!input.is(":focus")) {
                    input.focus().select();
                  }
                }
              }
            },
          },
          "operations": {
            "add": {
              "title": "Yeni Otomat Oluştur",
              "url": "http://localhost:44350/production/set-automat",
              "method": "POST",
              "data": [
                {
                  "name": "plaka",
                  "title": "Plate",
                  "type": "string",
                  "required": true,
                  "value": "",
                  "placeholder": "xxx-xx-xxx",
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Plate must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 14,
                  },
                  "visible": true
                },
                {
                  "name": "model",
                  "title": "Model",
                  "type": "select",
                  "required": true,
                  "options": [
                    {
                      "value": "",
                      "label": "Seçim yapınız"
                    },
                    {
                      "value": "CD636047-CE35-43D4-A82D-AF0943BB63BE",
                      "label": "AA-91"
                    },
                    {
                      "value": "CD636047-CE35-43D4-A82D-AF0943BB63BE",
                      "label": "AA-92"
                    },
                  ],
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != ''",
                      errMessage: "Model cannot be null."
                    },
                  ],
                  "visible": true
                },
                {
                  "name": "serialNumber",
                  "title": "Serial number",
                  "type": "number",
                  "required": true,
                  "value": "",
                  "placeholder": "xxxxxxxxxxx",
                  "showAllErrors": true,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 7",
                      errMessage: "Serial number must be longer than 7 characters."
                    },
                    {
                      control: "return !value.startsWith('000')",
                      errMessage: "Serial number cannot start with 000."
                    },
                  ],
                  "keydown": {
                    "maxLength": 14,
                    "bannedKeys": ["68-90", 32]
                  },
                  "visible": true
                },
                {
                  "name": "androidImei",
                  "title": "Android imei",
                  "type": "string",
                  "required": true,
                  "value": "",
                  "placeholder": "xx-xx-xx-xx",
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Android imei must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "androidMac",
                  "title": "Android mac",
                  "type": "string",
                  "required": true,
                  "value": "",
                  "placeholder": "xx-xx-xx-xx",
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Android mac must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "modemImei",
                  "title": "Modem imei",
                  "type": "string",
                  "required": true,
                  "value": "",
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Modem imei must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "modemMac",
                  "title": "Modem mac",
                  "type": "string",
                  "required": true,
                  "value": "",
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Modem mac must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "plcImei",
                  "title": "Plc imei",
                  "type": "string",
                  "required": false,
                  "value": "",
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value == '' || value.length > 4;",
                      errMessage: "Plc imei must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "plcMac",
                  "title": "Plc mac",
                  "type": "string",
                  "required": false,
                  "value": "",
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return !value.startsWith('000')",
                      errMessage: "Serial number cannot start with 000."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "defaultData",
                  "value": true,
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": false
                },
              ]
            },
            "edit": {
              "title": "Otomat Düzenle",
              "url": "http://localhost:44350/production/update-automat",
              "method": "POST",
              "data": [
                {
                  "name": "manufactId",
                  "value": "selectedRow.manufactId",
                  "visible": false
                },
                {
                  "name": "plaka",
                  "value": "selectedRow.plate",
                  "visible": false
                },
                {
                  "name": "serialNumber",
                  "value": "selectedRow.snAndroid",
                  "visible": false
                },
                {
                  "name": "model",
                  "title": "Model",
                  "type": "select",
                  "value": "selectedRow.modelID",
                  "options": [
                    {
                      "value": "",
                      "label": "Seçim yapınız"
                    },
                    {
                      "value": "CD636047-CE35-43D4-A82D-AF0943BB63BE",
                      "label": "AA-91"
                    },
                    {
                      "value": "CD636047-CE35-43D4-A82D-AF0943BB63BE",
                      "label": "AA-92"
                    },
                  ],
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != ''",
                      errMessage: "Model cannot be null."
                    },
                  ],
                  "visible": true
                },
                {
                  "name": "androidImei",
                  "title": "Android imei",
                  "type": "string",
                  "value": "selectedRow.imeiAndroid",
                  "placeholder": "xx-xx-xx-xx",
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Android imei must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "androidMac",
                  "title": "Android mac",
                  "type": "string",
                  "value": "selectedRow.macAndroid",
                  "placeholder": "xx-xx-xx-xx",
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Android mac must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "modemImei",
                  "title": "Modem imei",
                  "type": "string",
                  "value": "selectedRow.imeimodem",
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Modem imei must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "modemMac",
                  "title": "Modem mac",
                  "type": "string",
                  "value": "selectedRow.macmodem",
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Modem mac must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "plcImei",
                  "title": "Plc imei",
                  "type": "string",
                  "value": "selectedRow.imeiplc",
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Plc imei must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "plcMac",
                  "title": "Plc mac",
                  "type": "string",
                  "value": "selectedRow.macplc",
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Plc mac must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                }
              ]
            },
            "delete": {
              "url": "http://localhost:44350/production/delete-automat",
              "method": "POST",
              "data": {
                "manufactIds": ["selectedRow.manufactId"]
              }
            }
          }
        },
        {
          "type": "custom",
          "content": `
            <div id="changesModal" class="fixed bottom-0 flex-col justify-center items-center gap-2 w-[400px] px-8 py-4 max-w-full bg-bg text-darkBg rounded-t-lg">
                <div class="w-full flex justify-center items-center gap-4 text-sm"><input id="showChangedCells" type="checkbox" /><span>Show changed cells</span></div>
                <div class="flex flex-col justify-center items-center gap-8">
                  <h1 class="text-2xl font-bold">Some changes were noticed</h1>
                  <div class="flex gap-4 w-full">
                      <button @click="saveCellChanges" class="w-1/2 px-4 py-2 bg-green-600 text-white shadow-md text-xl font-bold rounded-lg">Save</button>
                      <button @click="cancelCellChanges" class="w-1/2 px-4 py-2 bg-red-600 text-white shadow-md text-xl font-bold rounded-lg">Cancel</button>
                  </div>
                </div>
            </div>
          `
        }
      ],
      "scopedCss": `
        #changesModal { 
          display:none;     
        }
        #changesModal.show { 
          display:flex;     
        }
      `,
      "customScripts": ` import { toast } from "vue3-toastify";
      var createdAutomatTableCellUpdates = [];
      function add2UpdatedCells(name, id, value, rowData) { 
          document.getElementById('changesModal').classList.add('show');
          $('#showChangedCells').attr('checked', false);
          let index = createdAutomatTableCellUpdates.findIndex(x => x.name == name && x.id == id);
          if (index == -1) {
              createdAutomatTableCellUpdates.push({ name: name, id: id, value: value, rowData: rowData });
          }
          else {
              createdAutomatTableCellUpdates[index].value = value;
          }
      }
      function remove2UpdatedCells(name, id) { 
          let index = createdAutomatTableCellUpdates.findIndex(x => x.name == name && x.id == id);
          if (index != -1) {
              createdAutomatTableCellUpdates.splice(index, 1);
          }

          if (createdAutomatTableCellUpdates.length == 0) {
              document.getElementById('changesModal').classList.remove('show');
          }
      }
      function saveCellChanges() { 
        console.log(createdAutomatTableCellUpdates[0].rowData);
        let data = {
          manufactId: createdAutomatTableCellUpdates[0].id,
          plaka: createdAutomatTableCellUpdates[0].rowData.plate,
          model: createdAutomatTableCellUpdates[0].rowData.model,
          androidMac: createdAutomatTableCellUpdates[0].rowData.macAndroid,
          androidImei: createdAutomatTableCellUpdates[0].rowData.imeiAndroid,
          modemImei: createdAutomatTableCellUpdates[0].rowData.imeimodem,
          modemMac: createdAutomatTableCellUpdates[0].rowData.macmodem,
          plcImei: createdAutomatTableCellUpdates[0].rowData.imeiplc,
          plcMac: createdAutomatTableCellUpdates[0].rowData.macplc,
          serialNumber: createdAutomatTableCellUpdates[0].rowData.snAndroid
        };
        data[createdAutomatTableCellUpdates[0].name] = createdAutomatTableCellUpdates[0].value;
        $.ajax({
          url: "http://localhost:44350/production/update-automat",
          method: "POST",
          data: data,
          success: function (response) {
            toast.success(response.description || "İşlem başarılı");
            createdAutomatTableCellUpdates = [];
            createdAutomatTable.ajax.reload(null, false);
            document.getElementById('changesModal').classList.remove('show');
          },
          error: function (xhr, status, error) {
            console.log(error);
          }
        });
      }
      function cancelCellChanges() {
        createdAutomatTableCellUpdates = [];
        document.getElementById('changesModal').classList.remove('show');
        createdAutomatTable.ajax.reload(null, false);
      }
      function dateTrFormat(data) {
          let options = { timeZone: 'Europe/Istanbul', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
          let formattedDate = new Date(data).toLocaleString('tr-TR', options);
          return formattedDate;
      }`,
      "customReadyScripts": `
        $('#showChangedCells').on('change', function () {
            createdAutomatTable.ajax.reload();
        });
      `,
      "help": {
        "page": "Datatables Page",
        "info": "In this page, you can see example datatables. There are two datatables in this page and both have filtering. Second datatable has operations (add, edit, delete) and right-click context menu. If you want delete or edit a row, first you click on the row to select it, then click on the edit or delete button above the datatable",
        "shortcuts": [
          {
            "shortcut": [
              {
                "key": "/images/ctrl_key.png"
              },
              {
                "key": "/images/letter_k.png"
              }
            ],
            "shortcutDescription": "Example shortcut description."
          },
          {
            "shortcut": [
              {
                "key": "/images/esc_key.png"
              }
            ],
            "shortcutDescription": "For the cancel."
          },
          {
            "shortcut": [
              {
                "key": "/images/right-click.png"
              }
            ],
            "shortcutDescription": "In the second datatable, right click on the row to see the context menu."
          }
        ],
        "link": null
      }
    },
    {
      "file": "Datatables2.vue",
      "name": "Datatables 2",
      "path": "/datatables2",
      "icon": 'fa-solid fa-table',
      "seo": {
        "title": "Datatables 2 - My CRM",
        "description": "In this page you can see datatable examples.",
        "keywords": ["datatable", "example", "table"]
      },
      "pageCss": "w-full flex flex-col justify-center items-center gap-8",
      "doms": [
        {
          "type": "datatable",
          "containerClass": "w-full",
          "id": "createdAutomatTable2",
          "name": "createdAutomatTable2",
          "columns": [
            { 
              order: 0,
              name: 'plate',
              title: 'Plate',
              checkable: false,
              orderable: false,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="p-2 flex items-center font-bold text-lg">
                                ${data}
                            </div>`;
                }
                else { return '<div class="p-2 flex items-center font-bold text-xl">-</div>'; }
              },
            },
            {
              order: 1,
              name: 'model',
              title: 'Model',
              checkable: true,
              orderable: false,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="py-2 px-4 flex items-center font-semibold text-second dark:text-fourth">
                                ${data}
                            </div>`;
                }
                else { return '<div class="py-2 px-4 flex items-center font-semibold text-second dark:text-fourth">-</div>'; }
              },
            },
            {
              order: 2,
              name: 'imeiAndroid',
              title: 'Android Imei',
              checkable: true,
              orderable: false,
            },
            {
              order: 3,
              name: 'macAndroid',
              title: 'Android Mac',
              checkable: true,
              orderable: false,
            },
            {
              order: 4,
              name: 'imeimodem',
              title: 'Modem Imei',
              checkable: true,
              orderable: false,
            },
            {
              order: 5,
              name: 'macmodem',
              title: 'Modem Mac',
              checkable: true,
              orderable: false,
            },
            {
              order: 6,
              name: 'imeiplc',
              title: 'PLC Imei',
              checkable: true,
              orderable: false,
            },
            {
              order: 7,
              name: 'macplc',
              title: 'PLC Mac',
              checkable: true,
              orderable: false,
            },
            {
              order: 8,
              name: null,
              title: 'Test',
              checkable: true,
              orderable: false,
              render: function (data, type, row) {
                return `<div class="w-full h-full flex px-2 items-center"><button data-manufactid='${row.manufactId}' class="alertManufactIdButton notSelectRow px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">Test</button></div>`;
              },
            }
          ],
          "filters": {
            "data": [
            {
              "data":"plate",
              "name":"Plate",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"model",
              "name":"Model",
              "type": "select2",
              "options": {
                "width": '100%',
                "minimumInputLength": -1,
                "placeholder": "Model Selection",
                "allowClear": true,
                "language": {
                  "noResults": "Eşleşen bir Model bulunamadı.",
                  "inputTooShort": "En az 1 Karakter giriniz.",
                  "searching": "Aranıyor..."
                },
                "ajax": {
                  "url": `http://localhost:44350/production/get-models`,
                  "delay": 250,
                  "type": 'POST',
                  "dataType": 'json',
                  "contentType": "application/json; charset=utf-8",
                }
              },
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"androidImei",
              "name":"Android Imei",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"androidMac",
              "name":"Android Mac",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"modemImei",
              "name":"Modem Imei",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"modemMac",
              "name":"Modem Mac",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"plcImei",
              "name":"PLC Imei",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            },
            {
              "data":"plcMac",
              "name":"PLC Mac",
              "type":"text",
              "value": null,
              "default": null,
              "visible": true
            }
            ],
            "beforeApply": function () { 
              console.log('test apply');
              console.log('test apply');
            },
            "beforeReset": function () { 
              console.log('test reset');
              console.log('test reset');
            },
          },
          "ajax": { 
            url: "http://localhost:44350/production/get-manufacts", 
            method: "POST", 
            dataSrc: function (json) { return json.responseData; },
            data: [
              {
                "name": "changedCells",
                "value": "$('#showChangedCells').is(':checked') && $('#showChangedCells').is(':visible')  ?  createdAutomatTableCellUpdates.map(item => (item.id)) : null"
              },
              {
                "name": "forTest",
                "value": 4
              }
            ]
          },
          "serverSide": true,
          "tableOptions": {
            drawCallback: function (settings, data) {
              $('.alertManufactIdButton').off('click').on('click', function () {
                alert($(this).data('manufactid'));
              });
            },
            fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) {},
            fnInitComplete: function () {},
            footerCallback: function (row, data, start, end, display) {
              let api = this.api();
              if (api) {
                let total = api
                  .column(2, { page: 'current' })
                  .data()
                  .reduce((a, b) => a + b.length, 0);

                $(api.column(0).footer()).html('<span class="font-bold text-sm inline-block">Total number of characters in the third column:</span>');
                $(api.column(2).footer()).html(`<span class="font-bold text-lg px-4 text-main dark:text-third">${total.toFixed(0)}</span>`);
              }
            },
            order: false,
          },
          "options": {
            "customButtons": [
              {
                "html": "<i class='fa-solid fa-arrows-rotate text-xl'></i>",
                "id": "refreshTableButton",
                "title": "Yenile",
                "onclick": function () {
                  createdAutomatTable2.ajax.reload();
                }
              }
            ],
            "rowSelect": false,
            "multiRowSelect": true,
            "showSelectedRows": {
              "dataName": "selectedRows",
              "targetData": "manufactId",
            },
            "rightClick": [
              {
                "name": "Edit",
                "click": function(rowData) {
                  alert(`Edit: ${rowData.manufactId}`);
                }
              },
              {
                "name": "Delete",
                "click": function(rowData) {
                  alert(`Delete: ${rowData.manufactId}`);
                }
              },
              {
                "name": "Test",
                "click": function(rowData) {
                  commonFunctions.openModal(500, 600, rowData.manufactId);
                }
              }
            ],
            "footerColumns": [
              {
                column: 0,
                colspan: 2
              },
              {
                column: 3,
                colspan: 3
              }
            ]
          },
          "operations": {
            "add": {
              "title": "Yeni Otomat Oluştur",
              "url": "http://localhost:44350/production/set-automat",
              "method": "POST",
              "data": [
                {
                  "name": "plaka",
                  "title": "Plate",
                  "type": "string",
                  "required": true,
                  "value": "",
                  "placeholder": "xxx-xx-xxx",
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Plate must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 14,
                  },
                  "visible": true
                },
                {
                  "name": "model",
                  "title": "Model",
                  "type": "select",
                  "required": true,
                  "options": [
                    {
                      "value": "",
                      "label": "Seçim yapınız"
                    },
                    {
                      "value": "CD636047-CE35-43D4-A82D-AF0943BB63BE",
                      "label": "AA-91"
                    },
                    {
                      "value": "CD636047-CE35-43D4-A82D-AF0943BB63BE",
                      "label": "AA-92"
                    },
                  ],
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != ''",
                      errMessage: "Model cannot be null."
                    },
                  ],
                  "visible": true
                },
                {
                  "name": "serialNumber",
                  "title": "Serial number",
                  "type": "number",
                  "required": true,
                  "value": "",
                  "placeholder": "xxxxxxxxxxx",
                  "showAllErrors": true,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 7",
                      errMessage: "Serial number must be longer than 7 characters."
                    },
                    {
                      control: "return !value.startsWith('000')",
                      errMessage: "Serial number cannot start with 000."
                    },
                  ],
                  "keydown": {
                    "maxLength": 14,
                    "bannedKeys": ["68-90", 32]
                  },
                  "visible": true
                },
                {
                  "name": "androidImei",
                  "title": "Android imei",
                  "type": "string",
                  "required": true,
                  "value": "",
                  "placeholder": "xx-xx-xx-xx",
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Android imei must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "androidMac",
                  "title": "Android mac",
                  "type": "string",
                  "required": true,
                  "value": "",
                  "placeholder": "xx-xx-xx-xx",
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Android mac must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "modemImei",
                  "title": "Modem imei",
                  "type": "string",
                  "required": true,
                  "value": "",
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Modem imei must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "modemMac",
                  "title": "Modem mac",
                  "type": "string",
                  "required": true,
                  "value": "",
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Modem mac must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "plcImei",
                  "title": "Plc imei",
                  "type": "string",
                  "required": false,
                  "value": "",
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value == '' || value.length > 4;",
                      errMessage: "Plc imei must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "plcMac",
                  "title": "Plc mac",
                  "type": "string",
                  "required": false,
                  "value": "",
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return !value.startsWith('000')",
                      errMessage: "Serial number cannot start with 000."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "defaultData",
                  "value": true,
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": false
                },
              ]
            },
            "edit": {
              "title": "Otomat Düzenle",
              "url": "http://localhost:44350/production/update-automat",
              "method": "POST",
              "data": [
                {
                  "name": "manufactId",
                  "value": "selectedRow.manufactId",
                  "visible": false
                },
                {
                  "name": "plaka",
                  "value": "selectedRow.plate",
                  "visible": false
                },
                {
                  "name": "serialNumber",
                  "value": "selectedRow.snAndroid",
                  "visible": false
                },
                {
                  "name": "model",
                  "title": "Model",
                  "type": "select",
                  "value": "selectedRow.modelID",
                  "options": [
                    {
                      "value": "",
                      "label": "Seçim yapınız"
                    },
                    {
                      "value": "CD636047-CE35-43D4-A82D-AF0943BB63BE",
                      "label": "AA-91"
                    },
                    {
                      "value": "CD636047-CE35-43D4-A82D-AF0943BB63BE",
                      "label": "AA-92"
                    },
                  ],
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != ''",
                      errMessage: "Model cannot be null."
                    },
                  ],
                  "visible": true
                },
                {
                  "name": "androidImei",
                  "title": "Android imei",
                  "type": "string",
                  "value": "selectedRow.imeiAndroid",
                  "placeholder": "xx-xx-xx-xx",
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Android imei must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "androidMac",
                  "title": "Android mac",
                  "type": "string",
                  "value": "selectedRow.macAndroid",
                  "placeholder": "xx-xx-xx-xx",
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Android mac must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "modemImei",
                  "title": "Modem imei",
                  "type": "string",
                  "value": "selectedRow.imeimodem",
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Modem imei must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "modemMac",
                  "title": "Modem mac",
                  "type": "string",
                  "value": "selectedRow.macmodem",
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Modem mac must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "plcImei",
                  "title": "Plc imei",
                  "type": "string",
                  "value": "selectedRow.imeiplc",
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Plc imei must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                },
                {
                  "name": "plcMac",
                  "title": "Plc mac",
                  "type": "string",
                  "value": "selectedRow.macplc",
                  "required": true,
                  "showAllErrors": false,
                  "errorChecks": [
                    {
                      control: "return value != null && value != '' && value.length > 4;",
                      errMessage: "Plc mac must be longer than 4 characters."
                    },
                  ],
                  "keydown": {
                    "maxLength": 10,
                  },
                  "visible": true
                }
              ]
            },
            "delete": {
              "url": "http://localhost:44350/production/delete-automat",
              "method": "POST",
              "data": {
                "manufactIds": "selectedRow.manufactId"
              }
            }
          }
        },
      ],
      "scopedCss": '',
      "customScripts": '',
      "customReadyScripts": '',
      "help": {
        "page": "Datatables Page",
        "info": "In this page, you can see example datatables. There are two datatables in this page and both have filtering. Second datatable has operations (add, edit, delete) and right-click context menu. If you want delete or edit a row, first you click on the row to select it, then click on the edit or delete button above the datatable",
        "shortcuts": [
          {
            "shortcut": [
              {
                "key": "/images/ctrl_key.png"
              },
              {
                "key": "/images/letter_k.png"
              }
            ],
            "shortcutDescription": "Example shortcut description."
          },
          {
            "shortcut": [
              {
                "key": "/images/esc_key.png"
              }
            ],
            "shortcutDescription": "For the cancel."
          },
          {
            "shortcut": [
              {
                "key": "/images/right-click.png"
              }
            ],
            "shortcutDescription": "In the second datatable, right click on the row to see the context menu."
          }
        ],
        "link": null
      }
    },
    {
      "file": "Shopping.vue",
      "name": "Shopping",
      "path": "/shopping",
      "icon": 'fa-solid fa-cart-shopping',
      "seo": {
        "title": "Shopping - My CRM",
        "description": "In this page you can see shopping card examples.",
        "keywords": ["shopping", "shopping", "card", "basket"]
      },
      "pageCss": "w-full flex flex-col justify-center items-center gap-8",
      "doms": [
        {
          "type": "cards",
          "containerClass": "w-full",
          "id": "shoppingCards",
          "name": "shoppingCards",
          "ajax": {
            "url": "http://localhost:3000/products",
            "method": "POST",
            "dataType": 'json',
            "contentType": 'application/json',
            "stringifyData": true
          },
          "paging": {
            "type": 0, //with number buttons / with scroll ??
            "size": 20,
          },
          "ordering": {
            "name": "orderType",
            "options": [
              {
                "name": "A to Z",
                "id": "aToZ",
                "value": 1,
              },
              {
                "name": "Lowest price",
                "id": "lowestPrice",
                "value": 2,
              },
              {
                "name": "Highest price",
                "id": "highestPrice",
                "value": 3,
              }
            ]
          },
          "searchBar": {
            "name": "searchValue",
            "placeholder": "Search Products...",
            "delay": 300
          },
          "filters": [

          ],
          "cardLayout": {
            "type": 2,
            "card": {
              "id": "ID",
              "title": "UrunAdi",
              "img": "Resimler[0]",
              "envanter": "Envanter",
              "barcode": "Barkodlar[0].Barkodu",
              "price": "Tutar"
            },
            "viewMode": {
              "changeable": true,
              "default": "grid",
            },
          }
        }
      ]
    }
  ],
  "scripts": [
    {
      "name": "shared",
      "pages": [
        {
          "name": "Introduction",
          "import": "{ sharedFunctions }"
        },
        {
          "name": "Configuration",
          "import": "{ sharedFunctions }"
        },
        {
          "name": "Examples",
          "import": "{ sharedFunctions }"
        }
      ],
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