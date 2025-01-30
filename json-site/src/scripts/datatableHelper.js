import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-colreorder';
import 'datatables.net-keytable';
import '../styles/dataTables.dataTables.css';
import Sortable from 'sortablejs';
import commonFunctions from './common';
import { toast } from "vue3-toastify";


const datatableHelper = {
    selectedRow: {},
    reloadTable: function (name, stayOnPage = false) {
        const table = $(`#${name}`).DataTable();
        const currentPage = table.page();

        if (stayOnPage) {
            table.ajax.reload(() => {
                // If the last page has been reached, go back to the previous page
                if (table.page.info().recordsDisplay <= currentPage * table.page.info().length) {
                    table.page(Math.max(currentPage - 1, 0)).draw(false);
                }
            }, false);
        } else {
            table.ajax.reload();
        }
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
            className: column.className || '',
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
        let userFnInitComplete = false;
        if (tableOptions.fnInitComplete) {
            userFnInitComplete = tableOptions.fnInitComplete;
        }
        tableOptions.fnInitComplete = function () {
            $(`.${name}Toolbar`).html(`<div class="flex items-center gap-2">
                <button id="open${name}CT" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg">
                    <i class="fa-solid fa-eye text-xl"></i>
                    <span class="font-semibold md:hidden">Visibility</span>
                </button>
                ${tableFilters
                    ? `<button id="open${name}Filters" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg">
                            <i class="fa-solid fa-magnifying-glass text-xl"></i>
                            <span class="font-semibold md:hidden">Filters</span>
                            <span class="filterCounter font-semibold hidden"></span>
                        </button>`
                    :''
                }
                ${operations.add
                    ? `<button id="add${name}Row" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg">
                            <i class="fa-solid fa-plus text-xl"></i>
                        </button>`
                    :''
                }
                ${operations.edit
                    ? `<button id="edit${name}Row" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg disabled:opacity-50" disabled>
                            <i class="fa-solid fa-pencil text-xl"></i>
                        </button>`
                    :''
                }
                ${operations.delete
                    ? `<button id="delete${name}Row" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg disabled:opacity-50" disabled>
                            <i class="fa-solid fa-trash-can text-xl"></i>
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
                    if (e.target.classList.contains('notSelectRow')) {
                        return;
                    }
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

            if (options && options.keyFocus) {
                $(`#${name}`).DataTable().on('key-focus', function (e, datatable, cell, originalEvent) {
                    options.keyFocus(e, datatable, cell, originalEvent);
                });
                
            }
            if (options && options.key) {
                $(`#${name}`).DataTable().on('keydown', function (e, datatable, key, cell, originalEvent) {
                    options.key(e, datatable, key, cell, originalEvent);
                });
            }


            if (userFnInitComplete) {
                userFnInitComplete.apply(this, arguments);
            }
        };

        //drawCallback
        let userDrawCallback = false;
        if (tableOptions.drawCallback) {
            userDrawCallback = tableOptions.drawCallback;
        }
        tableOptions.drawCallback = function () {
            if (options && options.rowSelect) {
                const table = $(`#${name}`).DataTable();
                const selected = thisHelper.selectedRow[name];
                (JSON.stringify(selected) === JSON.stringify({})) ? $(`#edit${name}Row, #delete${name}Row`).prop('disabled', true) : null;

                table.rows().every(function () {
                    const row = this.data();
                    if (JSON.stringify(selected) == JSON.stringify(row)) {
                        $(this.node()).addClass('selected');
                    }
                });
            }

            if (options && options.rightClick) {
                const table = $(`#${name}`).DataTable();
                $(`#${name} tbody`).off("contextmenu").on("contextmenu", "tr", function (e) {
                    e.preventDefault();

                    const row = table.row(this);
                    const rowData = row.data();

                    const rightClickMenu = options.rightClick.map(option => {
                        return {
                            name: option.name,
                            click: option.click,
                            data: rowData
                        };
                    });
                    console.log(rightClickMenu);

                    commonFunctions.createRightClickMenu(e, rightClickMenu);
                });
            }

            if (userDrawCallback) {
                userDrawCallback.apply(this, arguments);
            }
        };

        //fnRowCallBack
        let userFnRowCallBack = false;
        if (tableOptions.fnRowCallBack) {
            userFnRowCallBack = tableOptions.fnRowCallBack;
        }
        tableOptions.fnRowCallBack = function () {

            if (userFnRowCallBack) {
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
                                                    <i class="fa-solid fa-grip-vertical cursor-pointer text-[1.75rem] px-2 text-second"></i>
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
            handle: '#columnList ul li i',
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
        if (filterCounter > 0) {
            $(`#open${name}Filters .filterCounter`).html(`(${filterCounter})`);
            $(`#open${name}Filters .filterCounter`).removeClass('hidden');
        } else {
            $(`#open${name}Filters .filterCounter`).html(``);
            $(`#open${name}Filters .filterCounter`).addClass('hidden');
        }
    },
    fillFiltersModal: function(table, tableFilters) {
        let filterHtml = '';
        tableFilters.data.map(function(filter, index){
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
        if (tableFilters.beforeApply) {
            tableFilters.beforeApply();
        }
        tableFilters.data.map(function(filter, index){
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
        if (tableFilters.beforeReset) {
            tableFilters.beforeReset();
        }
        tableFilters.data.map(function(filter, index){
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
                            <label for="${item.name}" class="font-semibold">${item.required ? `* ${item.title}`: `${item.title}`}</label>
                            <input 
                                type="${item.type}" 
                                id="${item.name}" 
                                name="${item.name}" 
                                value="${item.value}" 
                                class="py-2 px-4 border border-darkBg text-darkBg rounded-lg" 
                                ${item.placeholder ? `placeholder=${item.placeholder}`: ''} />
                            <span class="itemError hidden text-sm text-red-600 p-1"></span>
                        </div>`;
                } else if (item.type === "select") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${item.required ? `* ${item.title}`: `${item.title}`}</label>
                            <select id="${item.name}" name="${item.name}" class="p-2 border border-darkBg text-darkBg rounded-lg">
                                ${item.options.map(option => `
                                    <option value="${option.value}">${option.label}</option>
                                `).join('')}
                            </select>
                            <span class="itemError hidden text-sm text-red-600 p-1"></span>
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

        // input keydowns
        addOperation.data.forEach(item => {
            if (item.visible) {
                const input = document.getElementById(item.name);
                if (item.keydown) {
                    if (item.keydown.maxLength) {
                        let maxLength = item.keydown.maxLength;
                        $(input).on("keydown.maxLenght", function (e) {
                            let currentLength = e.target.value.length;
                            let allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
                            if (currentLength >= maxLength && !allowedKeys.includes(e.key)) {
                                e.preventDefault();
                            }
                        });
                        $(input).on("paste.maxLenght", function (e) {
                            let pastedText = e.originalEvent.clipboardData.getData("text");
                            if (e.target.value.length + pastedText.length > maxLength) {
                                e.preventDefault();
                            }
                        });
                    }
                    if (item.keydown.bannedKeys) {
                        let parsedBannedKeys = commonFunctions.parseBannedKeys(item.keydown.bannedKeys);
                        $(input).on("keydown.bannedKeys", function (e) {
                            if (parsedBannedKeys.includes(e.keyCode)) {
                                e.preventDefault();
                            }
                        });
                    }
                }
            }
        });
    
        // addRowButtonClick
        document.getElementById("addRowButton").addEventListener("click", function () {
            let formData = {};
            let incorrectEntries = [];
            
            addOperation.data.forEach(item => {
                if (incorrectEntries.length > 0) { return; }

                if (item.visible) {
                    console.log(item);
                    const input = document.getElementById(item.name);
                    input.classList.remove("border-red-500");
                    $(input).siblings(".itemError").addClass('hidden').text('');
            
                    // add to formData
                    formData[item.name] = input ? input.value : null;
            
                    // input controls
                    if (item.required && (input.value == null || input.value == "")) {
                        input.classList.add("border-red-500");
                        incorrectEntries.push('Zorunlu alanlar boş bırakılamaz');
                        if (!item.showAllErrors) {
                            return;
                        }
                    }
                    if (item.errorChecks && item.errorChecks.length > 0) {
                        item.errorChecks.forEach(errorCheck => {
                            if (!errorCheck.control) { return; }
                            const controlFunction = new Function("value", `${errorCheck.control};`);
                            if (!controlFunction(input.value)) {
                                input.classList.add("border-red-500");
                                $(input).siblings(".itemError").removeClass('hidden').text(errorCheck.errMessage || 'Hatalı giriş yapıldı');
                                incorrectEntries.push(errorCheck.errMessage || 'Hatalı giriş yapıldı');
                                if (!item.showAllErrors) {
                                    return;
                                }
                            }
                        });
                    }
                }
                else {
                    formData[item.name] = item.value;
                }
            });
        
            if (incorrectEntries.length > 0) {
                incorrectEntries.forEach(message => {
                    toast.error(message);
                });
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
                        thisHelper.reloadTable(table, true);
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

        let editOpData = JSON.parse(JSON.stringify(editOperation.data));
        editOpData =  thisHelper.resolveDeep(editOpData, table, `selectedRow`);

        let modalHtml = ``;
        let formHtml = '';
        editOpData.forEach(item => {
            if (item.visible) {
                if (item.type === "string" || item.type === "number") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${item.required ? `* ${item.title}`: `${item.title}`}</label>
                            <input 
                                type="${item.type}" 
                                id="${item.name}" 
                                name="${item.name}" 
                                value="${item.value}" 
                                class="py-2 px-4 border border-darkBg text-darkBg rounded-lg" 
                                ${item.placeholder ? `placeholder=${item.placeholder}`: ''} />
                            <span class="itemError hidden text-sm text-red-600 p-1"></span>
                        </div>`;
                } else if (item.type === "select") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${item.required ? `* ${item.title}`: `${item.title}`}</label>
                            <select id="${item.name}" name="${item.name}" class="p-2 border border-darkBg text-darkBg rounded-lg">
                                ${item.options.map(option => `
                                    <option value="${option.value}" ${String(option.value).toLowerCase() == String(item.value).toLowerCase() ? 'selected' : ''}>${option.label}</option>
                                `).join('')}
                            </select>
                            <span class="itemError hidden text-sm text-red-600 p-1"></span>
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

         // input keydowns
         editOpData.forEach(item => {
            if (item.visible) {
                const input = document.getElementById(item.name);
                if (item.keydown) {
                    if (item.keydown.maxLength) {
                        let maxLength = item.keydown.maxLength;
                        $(input).on("keydown.maxLenght", function (e) {
                            let currentLength = e.target.value.length;
                            let allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
                            if (currentLength >= maxLength && !allowedKeys.includes(e.key)) {
                                e.preventDefault();
                            }
                        });

                        $(input).on("paste.maxLenght", function (e) {
                            let pastedText = e.originalEvent.clipboardData.getData("text");
                            if (e.target.value.length + pastedText.length > maxLength) {
                                e.preventDefault();
                            }
                        });
                    }
                    if (item.keydown.bannedKeys) {
                        let parsedBannedKeys = commonFunctions.parseBannedKeys(item.keydown.bannedKeys);
                        $(input).on("keydown.bannedKeys", function (e) {
                            if (parsedBannedKeys.includes(e.keyCode)) {
                                e.preventDefault();
                            }
                        });
                    }
                }
            }
        });
    
        // editRowButtonClick
        document.getElementById("addRowButton").addEventListener("click", function () {
            let formData = {};
            let incorrectEntries = [];
            
            editOpData.forEach(item => {
                if (incorrectEntries.length > 0) { return; }

                if (item.visible) {
                    const input = document.getElementById(item.name);
                    input.classList.remove("border-red-500");
                    $(input).siblings(".itemError").addClass('hidden').text('');
            
                    // add to formData
                    formData[item.name] = input ? input.value : null;
            
                    // input controls
                    if (item.required && (input.value == null || input.value == "")) {
                        input.classList.add("border-red-500");
                        incorrectEntries.push('Zorunlu alanlar boş bırakılamaz');
                        if (!item.showAllErrors) {
                            return;
                        }
                    }
                    if (item.errorChecks && item.errorChecks.length > 0) {
                        item.errorChecks.forEach(errorCheck => {
                            if (!errorCheck.control) { return; }
                            const controlFunction = new Function("value", `${errorCheck.control};`);
                            if (!controlFunction(input.value)) {
                                input.classList.add("border-red-500");
                                $(input).siblings(".itemError").removeClass('hidden').text(errorCheck.errMessage || 'Hatalı giriş yapıldı');
                                incorrectEntries.push(errorCheck.errMessage || 'Hatalı giriş yapıldı');
                                if (!item.showAllErrors) {
                                    return;
                                }
                            }
                        });
                    }
                }
                else {
                    formData[item.name] = item.value;
                }
            });
        
            if (incorrectEntries.length > 0) {
                incorrectEntries.forEach(message => {
                    toast.error(message);
                });
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
                        thisHelper.reloadTable(table, true);
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

        let formData = JSON.parse(JSON.stringify(deleteOperation.data));
        formData = thisHelper.resolveDeep(formData, table, `selectedRow`);
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
                        thisHelper.reloadTable(table, true);
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
    resolveDeep: function (data, table, resolvedString) {
        let thisHelper = this;
        let tableData = thisHelper.selectedRow[table];
        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                data[index] = this.resolveDeep(item, table, resolvedString);
            });
        } else if (typeof data === 'object' && data !== null) {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    data[key] = this.resolveDeep(data[key], table, resolvedString);
                }
            }
        } else if (typeof data === 'string') {
          if (data.includes(resolvedString)) {
            // get selectedRow data
            data = tableData[data.split('.')[1]];
          }
        }
        return data;
    },
};

export default datatableHelper;