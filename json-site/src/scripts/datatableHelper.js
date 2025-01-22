import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-colreorder';
import '../styles/dataTables.dataTables.css';
import Sortable from 'sortablejs';
import commonFunctions from './common';
import { toast } from "vue3-toastify";


const datatableHelper = {
    selectedRow: {},
    reloadTable: function (name) {
        $(`#${name}`).DataTable().ajax.reload();
    },
    initializeDataTable: function (name, selector, ajaxReq, tableColumns, tableFilters, tableOptions = {}, operations = {}, options = {}) {
        let thisHelper = this;

        if (!thisHelper.selectedRow[name]) {
            thisHelper.selectedRow[name] = {};
        }

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

        const defaultTableOptions = {
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
                processing: `<div class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"><img src="/images/loading.gif" /></div>`
            },
        };
    
        if (ajaxReq) {
            defaultTableOptions.ajax = ajaxReq
        }
    
        //fnInitComplete
        let userFnInitComplete;
        if (tableOptions.fnInitComplete) {
            userFnInitComplete = tableOptions.fnInitComplete;
        }
        tableOptions.fnInitComplete = function () {
            $(`.${name}Toolbar`).html(`<div class="flex items-center gap-2">
                <button id="open${name}CT" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg">
                    <svg class="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                    <span class="font-semibold md:hidden">Visibility</span>
                </button>
                ${tableFilters
                    ? `<button id="open${name}Filters" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg">
                            <svg class="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                            <span class="font-semibold md:hidden">Filters</span>
                            <span class="filterCounter font-semibold"></span>
                        </button>`
                    :''
                }
                ${operations.add
                    ? `<button id="add${name}Row" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg">
                            <svg class="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                        </button>`
                    :''
                }
                ${operations.edit
                    ? `<button id="edit${name}Row" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg disabled:opacity-50" disabled>
                            <svg class="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
                        </button>`
                    :''
                }
                ${operations.delete
                    ? `<button id="delete${name}Row" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg disabled:opacity-50" disabled>
                            <svg class="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>
                        </button>`
                    :''
                }
            </div>`);
            $(`#open${name}CT`).off('click').on('click', () => thisHelper.openCTModal(name, tableColumns));
            $(`#open${name}Filters`).off('click').on('click', () => thisHelper.openFiltersModal(name, tableFilters));
            $(`#add${name}Row`).off('click').on('click', () => thisHelper.openAddRowModal(name, operations.add));
            $(`#edit${name}Row`).off('click').on('click', () => thisHelper.editRowModal(name, operations.edit));
            $(`#delete${name}Row`).off('click').on('click', () => thisHelper.deleteRow(name, operations.delete));

            if (options && options.rowSelect) {
                $(`#${name}`).DataTable().on('click', 'tbody tr', (e) => {
                    const row = $(`#${name}`).DataTable().row(e.currentTarget).data();
                    const isSelected = e.currentTarget.classList.contains('selected');

                    if (!isSelected) {
                        thisHelper.selectedRow[name] = row;
                        $(`#${name}`).DataTable().rows('.selected').nodes().each((row) => row.classList.remove('selected'));
                        $(`#edit${name}Row, #delete${name}Row`).prop('disabled', false);
                    } else {
                        thisHelper.selectedRow[name] = {};
                        $(`#edit${name}Row, #delete${name}Row`).prop('disabled', true);
                    }

                    e.currentTarget.classList.toggle('selected');
                    console.log(thisHelper.selectedRow[name]);
                });
            }


            if (userFnInitComplete && userFnInitComplete.type == 'function') {
                userFnInitComplete.apply(this, arguments);
            }
        };

        //drawCallback
        let userDrawCallback;
        if (tableOptions.drawCallback) {
            userDrawCallback = tableOptions.drawCallback;
        }
        tableOptions.drawCallback = function () {
            if (options && options.rowSelect) {
                const table = $(`#${name}`).DataTable();
                const selected = thisHelper.selectedRow[name];
                console.log(selected, JSON.stringify(selected) === JSON.stringify({}));
                (JSON.stringify(selected) === JSON.stringify({})) ? $(`#edit${name}Row, #delete${name}Row`).prop('disabled', true) : null;

                table.rows().every(function () {
                    const row = this.data();
                    if (JSON.stringify(selected) == JSON.stringify(row)) {
                        $(this.node()).addClass('selected');
                    }
                });
            }


            if (userDrawCallback && userDrawCallback.type == 'function') {
                userDrawCallback.apply(this, arguments);
            }
        };

        //fnRowCallBack
        let userFnRowCallBack;
        if (tableOptions.fnRowCallBack) {
            userFnRowCallBack = tableOptions.fnRowCallBack;
        }
        tableOptions.fnRowCallBack = function () {

            if (userFnRowCallBack && userFnRowCallBack.type == 'function') {
                userFnRowCallBack.apply(this, arguments);
            }
        };
    
        const finalTableOptions = { ...defaultTableOptions, ...tableOptions };
        
        return $(selector).DataTable(finalTableOptions);
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


    openFiltersModal: function(table, tableFilters) {
        this.fillFiltersModal(table, tableFilters);
        commonFunctions.openFilter();
    },
    updateTableAjaxData: function(name, d, filters) {
        filters.map(function(filter, index) {
            d[filter.data] = filter.value
        }).join(';');

        let filterCounter = filters.filter(filter => filter.visible && filter.value != '' && filter.value != null).reduce((i, e) => (e.value != e.default) ? i + 1 : 0, 0);
        $(`#open${name}Filters .filterCounter`).html((filterCounter > 0) ? `(${filterCounter})` : '');
    },
    fillFiltersModal: function(table, tableFilters) {
        let filterHtml = '';
        tableFilters.map(function(filter, index){
            if(filter.visible) {
                switch(filter.type) {
                    case 'text':
                        filterHtml += `<div class="w-full flex flex-col">
                                            <label class="font-semibold text-second text-md pl-1">${filter.name}</label>
                                            <input type="text" data-filter="${filter.data}" value="${filter.value ? filter.value : ''}" placeholder="${filter.name}" class="filterInput text-lg w-full h-[50px] md:h-auto border border-darkBg text-darkBg rounded-xl  px-4 py-3 md:py-2 md:px-3">
                                        </div>`;
                        break;
                    case 'select':
                        filterHtml += `<div class="w-full flex flex-col">
                                            <label class="font-semibold text-second text-md pl-1">${filter.name}</label>
                                            <select data-filter="${filter.data}" value="${filter.value ? filter.value : ''}" class="filterInput text-lg w-full h-[50px] md:h-auto border border-darkBg text-darkBg rounded-xl  px-4 py-3 md:py-2 md:px-3">
                                                <option value="">All</option>
                                                ${filter.options.map(option => `<option value="${option.value}" ${filter.value == option.value ? 'selected' : ''}>${option.label}</option>`).join('')}
                                            </select>
                                        </div>`;
                        break;
                    case 'check':
                        filterHtml += `<div class="w-full flex flex-col">
                                            <label class="font-semibold text-second text-md pl-1">${filter.name}</label>
                                            <input type="checkbox" data-filter="${filter.data}" class="filterInput text-lg w-full h-[50px] md:h-auto border border-darkBg text-darkBg rounded-xl" ${filter.value ? 'checked' : ''}>
                                        </div>`;
                        break;
                }
            }
        });
        $('#tableFilterList').html(filterHtml);

        $('#filterModalApply').off('click').on('click', () => this.applyFilters(table, tableFilters));
        $('#filterModalReset').off('click').on('click', () => this.resetFilters(table, tableFilters));
    },
    applyFilters: function(table, tableFilters) {
        tableFilters.map(function(filter, index){
            if(filter.visible) {
                switch(filter.type) {
                    case 'text':
                        filter.value = $(`.filterInput[data-filter="${filter.data}"]`).val();
                        break;
                    case 'select':
                        filter.value = $(`.filterInput[data-filter="${filter.data}"]`).val();
                        break;
                    case 'check':
                        filter.value = $(`.filterInput[data-filter="${filter.data}"]`).prop('checked');
                        break;
                }
            }
        });
        console.log(tableFilters);
        this.reloadTable(table);
        commonFunctions.closeFilter();
    },
    resetFilters: function(table, tableFilters) {
        tableFilters.map(function(filter, index){
            filter.value = filter.default;
        });
        this.reloadTable(table);
        commonFunctions.closeFilter();
    },


    openAddRowModal: function (table, addOperation) {
        let thisHelper = this;

        let modalHtml = ``;
        let formHtml = '';
        addOperation.data.forEach(item => {
            if (item.visible) {
                if (item.type === "string" || item.type === "number") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${item.controlFunction ? `* ${item.title}`: `${item.title}`}</label>
                            <input 
                                type="${item.type}" 
                                id="${item.name}" 
                                name="${item.name}" 
                                value="${item.value}" 
                                class="py-2 px-4 border border-darkBg text-darkBg rounded-lg" 
                                ${item.placeholder ? `placeholder=${item.placeholder}`: ''} />
                        </div>`;
                } else if (item.type === "select") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${item.controlFunction ? `* ${item.title}`: `${item.title}`}</label>
                            <select id="${item.name}" name="${item.name}" class="p-2 border border-darkBg text-darkBg rounded-lg">
                                ${item.options.map(option => `
                                    <option value="${option.value}">${option.label}</option>
                                `).join('')}
                            </select>
                        </div>`;
                }
            }
        });
        modalHtml = `<form class="w-full h-full flex flex-col justify-between items-center gap-4">
                            <h1 class="w-full text-2xl font-bold">${addOperation.title}</h1>
                            <div class="w-full h-full overflow-y-auto flex flex-col gap-4">${formHtml}</div>
                            <button type="button" id="addRowButton" class="w-full text-xl font-bold py-2 rounded-md bg-main text-white tracking-widest">Ekle</button>
                        </form>`;
        commonFunctions.openModal(500, 640, modalHtml);
    
        // addRowButtonClick
        document.getElementById("addRowButton").addEventListener("click", function () {
            let formData = {};
            let incorrectEntries = [];
            
            addOperation.data.forEach(item => {
                if (item.visible) {
                    const input = document.getElementById(item.name);
                    input.classList.remove("border-red-500");
            
                    // add to formData
                    formData[item.name] = input ? input.value : null;
            
                    // controlFunction string to function
                    const controlFunction = new Function("value", item.controlFunction.match(/\(([^)]*)\)\s*{([\s\S]*)}/)[2]);
                    if (!controlFunction(input.value)) {
                        incorrectEntries.push(item);
                    }
                }
                else {
                    formData[item.name] = item.value;
                }
            });
        
            if (incorrectEntries.length > 0) {
                incorrectEntries.forEach(item => {
                    document.getElementById(item.name).classList.add("border-red-500");
                });
                toast.error("Hatalı girişler yapıldı");
                return;
            }
        
            // console.log(formData);
            $.ajax({
                url: addOperation.url,
                type: addOperation.method,
                data: formData,
                success: function (data) {
                    if (data.status == undefined || !data.status) {
                        toast.error(data.description || "İşlem başarısız");
                        return;
                    }
                    else {
                        toast.success(data.description || "İşlem başarılı");
                        thisHelper.reloadTable(table);
                        commonFunctions.closeModal();
                    }
                },
                error: function (err) {
                    toast.error(err.description || "İşlem başarısız");
                }
            });
        });
        
    },
    editRowModal: function (table, editOperation) {
        let thisHelper = this;

        let editOpData = JSON.stringify(editOperation.data);
        editOpData = editOpData.replace(/selectedRow/g, `thisHelper.selectedRow['${table}']`);
        editOpData = JSON.parse(editOpData);
        editOpData = thisHelper.resolveDeep(editOpData, `thisHelper.selectedRow`);
        console.log(editOpData);

        let modalHtml = ``;
        let formHtml = '';
        editOpData.forEach(item => {
            if (item.visible) {
                if (item.type === "string" || item.type === "number") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${item.controlFunction ? `* ${item.title}`: `${item.title}`}</label>
                            <input 
                                type="${item.type}" 
                                id="${item.name}" 
                                name="${item.name}" 
                                value="${item.value}" 
                                class="py-2 px-4 border border-darkBg text-darkBg rounded-lg" 
                                ${item.placeholder ? `placeholder=${item.placeholder}`: ''} />
                        </div>`;
                } else if (item.type === "select") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${item.controlFunction ? `* ${item.title}`: `${item.title}`}</label>
                            <select id="${item.name}" name="${item.name}" class="p-2 border border-darkBg text-darkBg rounded-lg">
                                ${item.options.map(option => `
                                    <option value="${option.value}" ${String(option.value).toLowerCase() == String(item.value).toLowerCase() ? 'selected' : ''}>${option.label}</option>
                                `).join('')}
                            </select>
                        </div>`;
                }
            }
        });
        modalHtml = `<form class="w-full h-full flex flex-col justify-between items-center gap-4">
                            <h1 class="w-full text-2xl font-bold">${editOperation.title}</h1>
                            <div class="w-full h-full overflow-y-auto flex flex-col gap-4">${formHtml}</div>
                            <button type="button" id="addRowButton" class="w-full text-xl font-bold py-2 rounded-md bg-main text-white tracking-widest">Kaydet</button>
                        </form>`;
        commonFunctions.openModal(500, 640, modalHtml);
    
        // addRowButtonClick
        document.getElementById("addRowButton").addEventListener("click", function () {
            let formData = {};
            let incorrectEntries = [];
            
            editOpData.forEach(item => {
                if (item.visible) {
                    const input = document.getElementById(item.name);
                    input.classList.remove("border-red-500");
            
                    // add to formData
                    formData[item.name] = input ? input.value : null;
            
                    // controlFunction string to function
                    const controlFunction = new Function("value", item.controlFunction.match(/\(([^)]*)\)\s*{([\s\S]*)}/)[2]);
                    if (!controlFunction(input.value)) {
                        incorrectEntries.push(item);
                    }
                }
                else {
                    formData[item.name] = item.value;
                }
            });
        
            if (incorrectEntries.length > 0) {
                incorrectEntries.forEach(item => {
                    document.getElementById(item.name).classList.add("border-red-500");
                });
                toast.error("Hatalı girişler yapıldı");
                return;
            }
        
            // console.log(formData);
            $.ajax({
                url: editOperation.url,
                type: editOperation.method,
                data: formData,
                success: function (data) {
                    if (data.status == undefined || !data.status) {
                        toast.error(data.description || "İşlem başarısız");
                        return;
                    }
                    else {
                        toast.success(data.description || "İşlem başarılı");
                        thisHelper.selectedRow[table] = {};
                        thisHelper.reloadTable(table);
                        commonFunctions.closeModal();
                    }
                },
                error: function (err) {
                    toast.error(err.description || "İşlem başarısız");
                }
            });
        });
        
    },
    deleteRow: function (table, deleteOperation) {
        let thisHelper = this;

        let formData = JSON.stringify(deleteOperation.data);
        formData = formData.replace(/selectedRow/g, `thisHelper.selectedRow['${table}']`);
        formData = JSON.parse(formData);
        formData = thisHelper.resolveDeep(formData, `thisHelper.selectedRow`);
        // console.log(formData);
        
        let onClick = function () {
            $.ajax({
                url: deleteOperation.url,
                type: deleteOperation.method,
                data: formData,
                success: function (data) {
                    if (data.status == undefined || !data.status) {
                        toast.error(data.description || "İşlem başarısız");
                        return;
                    } else {
                        toast.success(data.description || "İşlem başarılı");
                        thisHelper.selectedRow[table] = {};
                        thisHelper.reloadTable(table);
                    }
                },
                error: function (err) {
                    toast.error(err.description || "İşlem başarısız");
                }
            });
        }
        commonFunctions.showConfirmationMessage('The row you selected will be removed from the table', onClick);
    },
    

    // utilities
    resolveDeep: function (data, resolvedString) {
        let thisHelper = this;
        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                data[index] = this.resolveDeep(item, resolvedString);
            });
        } else if (typeof data === 'object' && data !== null) {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    data[key] = this.resolveDeep(data[key], resolvedString);
                }
            }
        } else if (typeof data === 'string') {
          if (data.includes(resolvedString)) {
            data = eval(data);
          }
        }
        return data;
    },
};

export default datatableHelper;