import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';

export default function initializeDataTable(selector, ajaxReq, tableColumns, options = {}) {
    const columnDefinitions = tableColumns.map(column => ({
        data: column.data,
        name: column.name,
        title: column.title,
        visible: column.visible !== false,
        // orderable: column.orderable !== false,
        render: column.render || ((data, type, row) => data || ''), // Varsayılan render veya özel render
    }));

    const defaultOptions = {
        columns: columnDefinitions,
        scrollX: true,
        // processing: true,
        // serverSide: true,
        paging: true,
        // ordering: true,
        // language: {},
    };

    if (ajaxReq) {
        defaultOptions.ajax = ajaxReq
    }

    // defaultOptions.dom = '';
    defaultOptions.drawCallback = function() {
        console.log('callback');
    }
    defaultOptions.fnRowCallBack = function() {
        console.log('row');
    }
    defaultOptions.fnInitComplete = function() {
        console.log('complete');
    }
    // defaultOptions.processing = `<div><img src="/images/loading.gif"/></div>`;

    const finalOptions = { ...defaultOptions, ...options };
    console.log(finalOptions);

    $(selector).DataTable(finalOptions);
}