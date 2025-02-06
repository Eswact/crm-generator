<template>
      <div class="w-full flex flex-col justify-center items-center gap-8">
        
    <div class="w-full">
      <table id="createdAutomatTable2" class="display stripe hover" style="width:100%"><tfoot><tr><td colspan="2"></td><td></td><td colspan="3"></td><td></td><td></td><td></td></tr></tfoot></table>
    </div>
      </div>
    </template>
  
    <script setup>
      import { ref, onMounted, computed, watch } from 'vue';
      import { useRoute, useRouter } from 'vue-router';
      const route = useRoute();
      const router = useRouter();
      import commonFunctions from '../scripts/common.js'
      
import $ from "jquery";
import datatableService from "../services/datatableService";
    
      
var createdAutomatTable2;

let createdAutomatTable2Columns = [
  {
    order: 0,
    title: "Plate",
    data: "plate",
    name: "plate",
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
    className: ""
  },{
    order: 1,
    title: "Model",
    data: "model",
    name: "model",
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
    className: ""
  },{
    order: 2,
    title: "Android Imei",
    data: "imeiAndroid",
    name: "imeiAndroid",
    checkable: true,
    orderable: false,
    render: null,
    className: ""
  },{
    order: 3,
    title: "Android Mac",
    data: "macAndroid",
    name: "macAndroid",
    checkable: true,
    orderable: false,
    render: null,
    className: ""
  },{
    order: 4,
    title: "Modem Imei",
    data: "imeimodem",
    name: "imeimodem",
    checkable: true,
    orderable: false,
    render: null,
    className: ""
  },{
    order: 5,
    title: "Modem Mac",
    data: "macmodem",
    name: "macmodem",
    checkable: true,
    orderable: false,
    render: null,
    className: ""
  },{
    order: 6,
    title: "PLC Imei",
    data: "imeiplc",
    name: "imeiplc",
    checkable: true,
    orderable: false,
    render: null,
    className: ""
  },{
    order: 7,
    title: "PLC Mac",
    data: "macplc",
    name: "macplc",
    checkable: true,
    orderable: false,
    render: null,
    className: ""
  },{
    order: 8,
    title: "Test",
    data: "null",
    name: "null",
    checkable: true,
    orderable: false,
    render: function (data, type, row) {
                return `<div class="w-full h-full flex px-2 items-center"><button data-manufactid='${row.manufactId}' class="alertManufactIdButton notSelectRow px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">Test</button></div>`;
              },
    className: ""
  }
];

let createdAutomatTable2Filters = { data: [{"data":"plate","name":"Plate","type":"text","value":null,"default":null,"visible":true},{"data":"model","name":"Model","type":"select2","options":{"width":"100%","minimumInputLength":-1,"placeholder":"Model Selection","allowClear":true,"language":{"noResults":"Eşleşen bir Model bulunamadı.","inputTooShort":"En az 1 Karakter giriniz.","searching":"Aranıyor..."},"ajax":{"url":"http://localhost:44350/production/get-models","delay":250,"type":"POST","dataType":"json","contentType":"application/json; charset=utf-8"}},"value":null,"default":null,"visible":true},{"data":"androidImei","name":"Android Imei","type":"text","value":null,"default":null,"visible":true},{"data":"androidMac","name":"Android Mac","type":"text","value":null,"default":null,"visible":true},{"data":"modemImei","name":"Modem Imei","type":"text","value":null,"default":null,"visible":true},{"data":"modemMac","name":"Modem Mac","type":"text","value":null,"default":null,"visible":true},{"data":"plcImei","name":"PLC Imei","type":"text","value":null,"default":null,"visible":true},{"data":"plcMac","name":"PLC Mac","type":"text","value":null,"default":null,"visible":true}] }
createdAutomatTable2Filters.beforeApply = function () { 
              console.log('test apply');
              console.log('test apply');
            };
createdAutomatTable2Filters.beforeReset = function () { 
              console.log('test reset');
              console.log('test reset');
            };


let createdAutomatTable2Ajax = {
  url: "http://localhost:44350/production/get-manufacts",
  type: "POST",
  dataSrc: function (json) { return json.responseData; },
  data: function(d) {
    d.changedCells = $('#showChangedCells').is(':checked') && $('#showChangedCells').is(':visible')  ?  createdAutomatTableCellUpdates.map(item => (item.id)) : null;
d.forTest = 4
    datatableService.updateTableAjaxData("createdAutomatTable2", d, createdAutomatTable2Filters.data);
    datatableService.showSelectedRowsAjaxData("createdAutomatTable2", d, {"dataName":"selectedRows","targetData":"manufactId"});
  }
};

let createdAutomatTable2TableOptions = {
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
order: false
};
createdAutomatTable2TableOptions.serverSide = true;
createdAutomatTable2TableOptions.processing = true;

let createdAutomatTable2RightClick = [{'name': "Edit", 'click': function(rowData) {
                  alert(`Edit: ${rowData.manufactId}`);
                }},{'name': "Delete", 'click': function(rowData) {
                  alert(`Delete: ${rowData.manufactId}`);
                }},{'name': "Test", 'click': function(rowData) {
                  commonFunctions.openModal(500, 600, rowData.manufactId);
                }}];
let createdAutomatTable2KeyFocusFunction = false
let createdAutomatTable2KeyFunction = false
let createdAutomatTable2Options = {"customButtons":[{"html":"<i class='fa-solid fa-arrows-rotate text-xl'></i>","id":"refreshTableButton","title":"Yenile"}],"rowSelect":false,"multiRowSelect":true,"showSelectedRows":{"dataName":"selectedRows","targetData":"manufactId"},"rightClick":[{"name":"Edit"},{"name":"Delete"},{"name":"Test"}],"footerColumns":[{"column":0,"colspan":2},{"column":3,"colspan":3}]}

createdAutomatTable2Options["rightClick"] = createdAutomatTable2RightClick;
createdAutomatTable2Options['keyFocus'] = createdAutomatTable2KeyFocusFunction;
createdAutomatTable2Options['key'] = createdAutomatTable2KeyFunction;

createdAutomatTable2Options.customButtons[0].onclick = function () {
                  createdAutomatTable2.ajax.reload();
                };

let createdAutomatTable2Operations = {"add":{"title":"Yeni Otomat Oluştur","url":"http://localhost:44350/production/set-automat","method":"POST","data":[{"name":"plaka","title":"Plate","type":"string","required":true,"value":"","placeholder":"xxx-xx-xxx","errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Plate must be longer than 4 characters."}],"keydown":{"maxLength":14},"visible":true},{"name":"model","title":"Model","type":"select","required":true,"options":[{"value":"","label":"Seçim yapınız"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-91"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-92"}],"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != ''","errMessage":"Model cannot be null."}],"visible":true},{"name":"serialNumber","title":"Serial number","type":"number","required":true,"value":"","placeholder":"xxxxxxxxxxx","showAllErrors":true,"errorChecks":[{"control":"return value != null && value != '' && value.length > 7","errMessage":"Serial number must be longer than 7 characters."},{"control":"return !value.startsWith('000')","errMessage":"Serial number cannot start with 000."}],"keydown":{"maxLength":14,"bannedKeys":["68-90",32]},"visible":true},{"name":"androidImei","title":"Android imei","type":"string","required":true,"value":"","placeholder":"xx-xx-xx-xx","showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Android imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"androidMac","title":"Android mac","type":"string","required":true,"value":"","placeholder":"xx-xx-xx-xx","showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Android mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"modemImei","title":"Modem imei","type":"string","required":true,"value":"","showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Modem imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"modemMac","title":"Modem mac","type":"string","required":true,"value":"","showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Modem mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"plcImei","title":"Plc imei","type":"string","required":false,"value":"","showAllErrors":false,"errorChecks":[{"control":"return value == '' || value.length > 4;","errMessage":"Plc imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"plcMac","title":"Plc mac","type":"string","required":false,"value":"","showAllErrors":false,"errorChecks":[{"control":"return !value.startsWith('000')","errMessage":"Serial number cannot start with 000."}],"keydown":{"maxLength":10},"visible":true},{"name":"defaultData","value":true,"keydown":{"maxLength":10},"visible":false}]},"edit":{"title":"Otomat Düzenle","url":"http://localhost:44350/production/update-automat","method":"POST","data":[{"name":"manufactId","value":"selectedRow.manufactId","visible":false},{"name":"plaka","value":"selectedRow.plate","visible":false},{"name":"serialNumber","value":"selectedRow.snAndroid","visible":false},{"name":"model","title":"Model","type":"select","value":"selectedRow.modelID","options":[{"value":"","label":"Seçim yapınız"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-91"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-92"}],"required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != ''","errMessage":"Model cannot be null."}],"visible":true},{"name":"androidImei","title":"Android imei","type":"string","value":"selectedRow.imeiAndroid","placeholder":"xx-xx-xx-xx","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Android imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"androidMac","title":"Android mac","type":"string","value":"selectedRow.macAndroid","placeholder":"xx-xx-xx-xx","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Android mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"modemImei","title":"Modem imei","type":"string","value":"selectedRow.imeimodem","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Modem imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"modemMac","title":"Modem mac","type":"string","value":"selectedRow.macmodem","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Modem mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"plcImei","title":"Plc imei","type":"string","value":"selectedRow.imeiplc","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Plc imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"plcMac","title":"Plc mac","type":"string","value":"selectedRow.macplc","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Plc mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true}]},"delete":{"url":"http://localhost:44350/production/delete-automat","method":"POST","data":{"manufactIds":"selectedRow.manufactId"}}}

      
    
      onMounted(() => {
        createdAutomatTable2 = datatableService.initializeDataTable('createdAutomatTable2', '#createdAutomatTable2', createdAutomatTable2Ajax, createdAutomatTable2Columns, createdAutomatTable2Filters, createdAutomatTable2TableOptions, createdAutomatTable2Operations, createdAutomatTable2Options);
        
    
        
      });
    
      
    </script>
    
    <style scoped>
      
    </style>