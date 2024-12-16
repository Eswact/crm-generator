import $ from 'jquery';
import 'datatables.net';
import '../styles/dataTables.dataTables.css';

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
        dom: '<"w-full flex justify-between items-center md:flex-col md:justify-center py-2"<"toolbar"><l>>rt<"w-full flex justify-between items-center md:flex-col-reverse gap-2 md:justify-center py-2 px-4 rounded-b-lg bg-second text-white"<i><p>>',
        // processing: true,
        // serverSide: true,
        // ordering: true,
        paging: true,
        // pagingType: 'full_numbers_no_ellipses',
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

    // defaultOptions.dom = '';
    defaultOptions.drawCallback = function() {
        // console.log('callback');
    }
    defaultOptions.fnRowCallBack = function() {
        // console.log('row');
    }
    defaultOptions.fnInitComplete = function() {
        // console.log('complete');
    }
    // defaultOptions.processing = `<div><img src="/images/loading.gif"/></div>`;

    const finalOptions = { ...defaultOptions, ...options };
    console.log(finalOptions);

    $(selector).DataTable(finalOptions);
    // $(selector).fn.DataTable.ext.pager.numbers_length = 3;
}