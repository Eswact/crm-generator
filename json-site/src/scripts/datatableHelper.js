import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-colreorder';
import '../styles/dataTables.dataTables.css';
import commonFunctions from './common';


const datatableHelper = {
    initializeDataTable: function (name, selector, ajaxReq, tableColumns, options = {}) {
        let thisHelper = this;

        const columnDefinitions = tableColumns.map(column => ({
            data: column.data,
            name: column.name,
            title: column.title,
            visible: column.visible !== false,
            // orderable: column.orderable !== false,
            render: column.render || ((data, type, row) => data || ''),
        }));
    
        // let orderPref = localStorage.getItem(`${name}Order`);
        const defaultOptions = {
            columns: columnDefinitions,
            scrollX: true,
            dom: `<"w-full flex justify-between items-center md:flex-col md:justify-center py-2"<"${name}Toolbar"><l>>rt<"w-full flex justify-between items-center md:flex-col-reverse gap-2 md:justify-center py-2 px-4 rounded-b-lg bg-second text-white"<i><p>>`,
            // ordering: false,
            // colReorder: {
            //     order: (orderPref) ? orderPref : tableColumns.map((c, index) => index),
            // },
            paging: true,
            pagingType: 'numbers',
            stripeClasses: ['stripe1','stripe2'],
            language: {
                info: "Showing _START_ to _END_ of _TOTAL_ entries",
                infoEmpty: "No data available in table",
                loadingRecords: "Loading...",
                lengthMenu: "Show _MENU_ entries",
                zeroRecords: `<div><span>Tablo Empty.</span></div>`,
                infoFiltered: "(filtered from _MAX_ total entries)",
                paginate: {
                    first: "<<",
                    previous: "<",
                    next: ">",
                    last: ">>",
                },
                //processing: `<div><img src="/images/loading-gif/loading.gif" /></div>`
            },
        };
    
        if (ajaxReq) {
            defaultOptions.ajax = ajaxReq
        }
    
        if (options.fnInitComplete) {
            const userFnInitComplete = options.fnInitComplete;
            options.fnInitComplete = function () {
                $(`.${name}Toolbar`).html(`<button id="open${name}CT">Visibility</button>`);
                $(`#open${name}CT`).click(() => thisHelper.openCTModal(name, tableColumns));
                userFnInitComplete.apply(this, arguments);
            };
        }
        else {
            options.fnInitComplete = function () {
                $(`.${name}Toolbar`).html(`<button id="open${name}CT">Visibility</button>`);
            };
        }
    
        // defaultOptions.drawCallback = function() {};
        // defaultOptions.fnRowCallBack = function() {};
        // defaultOptions.fnInitComplete = function() {};
    
        const finalOptions = { ...defaultOptions, ...options };
        
        return $(selector).DataTable(finalOptions);
    },

    openCTModal: function (table, tableColumns) {
        let modalHtml = `<div>
                            <h2>Customize Table (${table})</h2>
                            <p>Drag and drop the items in the list to reorder them. Use checkboxes for column visibility.</p>
                        </div>
                        <div id="columnList"></div>
                        <div>
                            <button>Save</button>
                            <button>Reset to default</button>
                        </div>`;
        commonFunctions.openModal(500, 600, modalHtml);
    },

    fillCTModal: function (table, tableColumns, tablePrefs) {},
    setColumnVisibility: function (table, tableColumns) {},
    setColumnOrder: function (table, orderPref) {},
};

export default datatableHelper;