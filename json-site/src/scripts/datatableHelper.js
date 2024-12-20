import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-colreorder';
import '../styles/dataTables.dataTables.css';
import Sortable from 'sortablejs';
import commonFunctions from './common';


const datatableHelper = {
    reloadTable: function (name) {
        $(`#${name}`).DataTable().ajax.reload();
    },
    initializeDataTable: function (name, selector, ajaxReq, tableColumns, options = {}) {
        let thisHelper = this;

        tableColumns = tableColumns.sort((a, b) => a.order - b.order);
        let tablePrefs;
        if (thisHelper.getTablePrefs(name) && thisHelper.getTablePrefs(name).length == tableColumns.length) {
            tablePrefs = JSON.parse(localStorage.getItem(`${name}Prefs`));
        }
        else {
            tablePrefs = tableColumns.map((column, index) => { return {name:column.name, order:column.order, visible:column.visible != false} });
            thisHelper.setTablePrefs(name, tablePrefs);
        }

        const columnDefinitions = tableColumns.map(column => ({
            data: column.data,
            name: column.name,
            title: column.title,
            visible: tablePrefs.find(pref => pref.name == column.name).visible,
            orderable: column.orderable != false,
            render: column.render || ((data, type, row) => data || ''),
        }));

        const defaultOptions = {
            columns: columnDefinitions,
            scrollX: true,
            dom: `<"w-full flex justify-between items-center md:flex-col md:gap-2 md:justify-center py-2"<"${name}Toolbar"><l>>rt<"w-full flex justify-between items-center md:flex-col-reverse gap-2 md:justify-center py-2 px-4 rounded-b-lg bg-second text-white"<i><p>>`,
            colReorder: {
                order: tablePrefs.map((column, index) => { return tableColumns.find(pref => pref.name == column.name).order; }),
            },
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
                processing: `<div class="absolute w-full h-full flex justify-center items-center"><img src="/images/loading.gif" /></div>`
            },
        };
    
        if (ajaxReq) {
            defaultOptions.ajax = ajaxReq
        }
    
        if (options.fnInitComplete) {
            const userFnInitComplete = options.fnInitComplete;
            options.fnInitComplete = function () {
                $(`.${name}Toolbar`).html(`<div class="flex items-center gap-2">
                    <button id="open${name}CT" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg">
                        <svg class="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                        <span class="font-semibold md:hidden">Visibility</span>
                    </button>
                    <button id="open${name}Filters" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg">
                        <svg class="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                        <span class="font-semibold md:hidden">Filters</span>
                    </button>
                </div>`);
                $(`#open${name}CT`).off('click').on('click', () => thisHelper.openCTModal(name, tableColumns));
                $(`#open${name}Filters`).off('click').on('click', () => thisHelper.openFiltersModal(name, tableColumns));
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
    
        const finalOptions = { ...defaultOptions, ...options };
        
        return $(selector).DataTable(finalOptions);
    },


    getTablePrefs: function (name) {
        return JSON.parse(localStorage.getItem(`${name}Prefs`));
    },
    setTablePrefs: function (name, prefs) {
        prefs = prefs.sort((a, b) => a.order - b.order);
        localStorage.setItem(`${name}Prefs`, JSON.stringify(prefs));
    },
    openCTModal: function (table, tableColumns) {
        let thisHelper = this;

        let tablePrefs = thisHelper.getTablePrefs(table);
        tablePrefs = tablePrefs.sort((a, b) => a.order - b.order);
        let modalHtml = `<div class="w-full h-full max-h-full overflow-hidden flex flex-col gap-4">
                            <div class="w-full h-[15%] flex flex-col gap-2">
                                <h2 class="text-2xl font-bold">Customize Table</h2>
                                <p>Drag and drop the items in the list to reorder them. Use checkboxes for column visibility.</p>
                            </div>
                            <div id="columnList" class="h-[calc(70%-2rem)]">
                                <ul class="w-full h-full overflow-y-auto flex flex-col gap-2">
                                    ${tablePrefs.map(function(column, index){ 
                                        let thisColumn = tableColumns.find(item => item.name === column.name);
                                        return `<li data-order="${column.order}" data-realorder="${thisColumn.order}" class="select-none w-full flex items-center justify-between gap-2 p-4 border-2 border-dashed border-gray-300 rounded-md">
                                                    <label for="${column.name}Check" class="flex items-center gap-[0.75rem] w-[calc(100%-2.5rem)]">
                                                        ${thisColumn.checkable ? `<input id="${column.name}Check" class="w-6 h-6 accent-second rounded-lg" type="checkbox" ${column.visible ? 'checked' : ''} />` : ''}
                                                        <span class="text-[1.25rem] font-semibold">${thisColumn.title}</span>
                                                    </label>
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-6 px-2 fill-second" viewBox="0 0 320 512"><path d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"/></svg>
                                                </li>`}).join('')}
                                </ul>
                            </div>
                            <div class="w-full h-[15%] flex flex-col justify-between">
                                <button  id="save${name}CT" class="w-full bg-second text-white hover:bg-opacity-90 duration-200 font-semibold text-xl text-center py-2 rounded-lg">Save</button>
                                <button id="reset${name}CT" class="w-full border border-second text-second hover:bg-second hover:bg-opacity-10 duration-200 font-semibold text-xl text-center py-2 rounded-lg">Reset to default</button>
                            </div>
                        </div>`;
        commonFunctions.openModal(500, 640, modalHtml);
        let drag = document.querySelector('#columnList ul');
        new Sortable(drag, {
            animation: 150,
            handle: '#columnList ul li svg',
            forceFallback: true
        });

        $(`#save${name}CT`).off('click').on('click', () => thisHelper.saveTablePrefs(table, tableColumns));
        $(`#reset${name}CT`).off('click').on('click', () => thisHelper.resetTablePrefs(table, tableColumns));
    },
    saveTablePrefs: function (table, tableColumns) {
        let newPrefs = [];
        let newOrder = [];
        $('#columnList ul li').each(function (i, column) {
            let thisColumn = tableColumns.find(item => item.order == $(column).data('realorder'));
            let thisColumnVisibility = ($(column).find('input').length) ? $(column).find('input').is(':checked') : true;
            newPrefs.push({name:thisColumn.name, order:i, visible:thisColumnVisibility});
            newOrder.push($(column).data('realorder'));
        });
        //Order
        $(`#${table}`).DataTable().colReorder.order(newOrder, true);
        //Visibility
        $(tableColumns).each((i, column) => { $(`#${table}`).DataTable().column(column.name + ':name').visible(newPrefs.find(pref => pref.name == column.name).visible); });
        //Save
        localStorage.setItem(`${table}Prefs`, JSON.stringify(newPrefs));
        //Close
        commonFunctions.closeModal();
        // this.reloadTable(table);
    },
    resetTablePrefs: function (table, tableColumns) {
        //Order
        $(`#${table}`).DataTable().colReorder.order(tableColumns.map((column, index) => index), true);
        //Visibility
        $(tableColumns).each((i, column) => { $(`#${table}`).DataTable().column(column.name + ':name').visible(column.visible != false); });
        //Save
        let defaultPrefs = tableColumns.map((column, index) => { return {name:column.name, order:column.order, visible:true} });
        this.setTablePrefs(table, defaultPrefs);
        //Close
        commonFunctions.closeModal();
        // this.reloadTable(table);
    },


    openFiltersModal: function(table, tableColumns) {
        commonFunctions.openFilter();
    }
};

export default datatableHelper;