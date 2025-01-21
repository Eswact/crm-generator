<template>
      <div class="w-full flex flex-col gap-1">
        
    <div class="w-full">
      <table id="transferedAutomatTable" class="display stripe hover" style="width:100%"></table>
    </div>
    <div class="w-full">
      <table id="createdAutomatTable" class="display stripe hover" style="width:100%"></table>
    </div>
      </div>
    </template>
  
    <script setup>
      import { ref, onMounted } from 'vue';
      import { useRoute, useRouter } from 'vue-router';
      const route = useRoute();
      const router = useRouter();
      import commonFunctions from '../scripts/common.js'
      
      import datatableHelper from '../scripts/datatableHelper';
    
        
          var transferedAutomatTable;

          let transferedAutomatTableColumns = [
            {
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
              }
            },{
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
              }
            },{
              order: 2,
              title: "Customer",
              data: "customerName",
              name: "customerName",
              checkable: true,
              orderable: false,
              render: null
            },{
              order: 3,
              title: "Location",
              data: "location",
              name: "location",
              checkable: true,
              orderable: false,
              render: null
            },{
              order: 4,
              title: "Date",
              data: "transferedTime",
              name: "transferedTime",
              checkable: true,
              orderable: true,
              render: function (data, type, row) {
                if (data != null) {
                    return dateTrFormat(data);  
                }
                else { return ''; }
              }
            }
          ];

          let transferedAutomatTableFilters = [{"data":"IsField","name":"IsField","type":"check","value":true,"default":true,"visible":false},{"data":"plate","name":"Plate","type":"text","value":null,"default":null,"visible":true},{"data":"model","name":"Model","type":"select","options":[{"value":"AA-91","label":"AA-91"}],"value":null,"default":null,"visible":true},{"data":"customerId","name":"Customer","type":"select","options":[{"value":"1","label":"Eren"}],"value":null,"default":null,"visible":true}]
      
          let transferedAutomatTableAjax = {
            url: "http://localhost:44350/warehouse/get-automats",
            type: "POST",
            dataSrc: function (json) { return json.data; },
            data: function(d) {
              datatableHelper.updateTableAjaxData("transferedAutomatTable", d, transferedAutomatTableFilters);
            }
          };
    
          let transferedAutomatTableOptions = {
            drawCallback: function (settings, data) {},
fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) {},
fnInitComplete: function () {console.log('fnInitComplete')},
order: [[4,"desc"]]
          };
          transferedAutomatTableOptions.serverSide = true;
          transferedAutomatTableOptions.processing = true;

          let transferedAutomatTableOperations = {}
        
          var createdAutomatTable;

          let createdAutomatTableColumns = [
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
              }
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
              }
            },{
              order: 2,
              title: "Android Imei",
              data: "imeiAndroid",
              name: "imeiAndroid",
              checkable: true,
              orderable: false,
              render: null
            },{
              order: 3,
              title: "Android Mac",
              data: "macAndroid",
              name: "macAndroid",
              checkable: true,
              orderable: false,
              render: null
            },{
              order: 4,
              title: "Modem Imei",
              data: "imeimodem",
              name: "imeimodem",
              checkable: true,
              orderable: false,
              render: null
            },{
              order: 5,
              title: "Modem Mac",
              data: "macmodem",
              name: "macmodem",
              checkable: true,
              orderable: false,
              render: null
            },{
              order: 6,
              title: "PLC Imei",
              data: "imeiplc",
              name: "imeiplc",
              checkable: true,
              orderable: false,
              render: null
            },{
              order: 7,
              title: "PLC Mac",
              data: "macplc",
              name: "macplc",
              checkable: true,
              orderable: false,
              render: null
            }
          ];

          let createdAutomatTableFilters = [{"data":"plate","name":"Plate","type":"text","value":null,"default":null,"visible":true},{"data":"model","name":"Model","type":"select","options":[{"value":"AA-91","label":"AA-91"}],"value":null,"default":null,"visible":true},{"data":"androidImei","name":"Android Imei","type":"text","value":null,"default":null,"visible":true},{"data":"androidMac","name":"Android Mac","type":"text","value":null,"default":null,"visible":true},{"data":"modemImei","name":"Modem Imei","type":"text","value":null,"default":null,"visible":true},{"data":"modemMac","name":"Modem Mac","type":"text","value":null,"default":null,"visible":true},{"data":"plcImei","name":"PLC Imei","type":"text","value":null,"default":null,"visible":true},{"data":"plcMac","name":"PLC Mac","type":"text","value":null,"default":null,"visible":true}]
      
          let createdAutomatTableAjax = {
            url: "http://localhost:44350/production/get-manufacts",
            type: "POST",
            dataSrc: function (json) { return json.responseData; },
            data: function(d) {
              datatableHelper.updateTableAjaxData("createdAutomatTable", d, createdAutomatTableFilters);
            }
          };
    
          let createdAutomatTableOptions = {
            drawCallback: function (settings, data) {},
fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) {},
fnInitComplete: function () {
              createdAutomatTable.on('click', 'tbody tr', (e) => {
                e.currentTarget.classList.toggle('selected');
              });
            },
order: false
          };
          createdAutomatTableOptions.serverSide = true;
          createdAutomatTableOptions.processing = true;

          let createdAutomatTableOperations = {"add":{"title":"Yeni Otomat Oluştur","url":"http://localhost:44350/production/set-automat","method":"POST","data":[{"name":"plaka","title":"Plaka","type":"string","value":"","placeholder":"xxx-xx-xxx","controlFunction":"function(value) { return value != null && value != '' && value.length > 0; }","visible":true},{"name":"model","title":"Model","type":"select","options":[{"value":"","label":"Seçim yapınız"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-91"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-92"}],"controlFunction":"function(value) { return value != null && value != ''; }","visible":true},{"name":"serialNumber","title":"Serial number","type":"number","value":"","placeholder":"xxxxxxxxxxx","controlFunction":"function(value) { return value != null && value != '' && value.length > 7; }","visible":true},{"name":"androidImei","title":"Android imei","type":"string","value":"","placeholder":"xx-xx-xx-xx","controlFunction":"function(value) { return value != null && value != '' && value.length > 4; }","visible":true},{"name":"androidMac","title":"Android mac","type":"string","value":"","placeholder":"xx-xx-xx-xx","controlFunction":"function(value) { return value != null && value != '' && value.length > 4; }","visible":true},{"name":"modemImei","title":"Modem imei","type":"string","value":"","controlFunction":"function(value) { return value != null && value != '' && value.length > 4; }","visible":true},{"name":"modemMac","title":"Modem mac","type":"string","value":"","controlFunction":"function(value) { return value != null && value != '' && value.length > 4; }","visible":true},{"name":"plcImei","title":"Plc imei","type":"string","value":"","controlFunction":"function(value) { return value != null && value != '' && value.length > 4; }","visible":true},{"name":"plcMac","title":"Plc mac","type":"string","value":"","controlFunction":"function(value) { return value != null && value != '' && value.length > 4; }","visible":true}]}}
        
    
      onMounted(() => {
        transferedAutomatTable = datatableHelper.initializeDataTable('transferedAutomatTable', '#transferedAutomatTable', transferedAutomatTableAjax, transferedAutomatTableColumns, transferedAutomatTableFilters, transferedAutomatTableOptions, transferedAutomatTableOperations);
createdAutomatTable = datatableHelper.initializeDataTable('createdAutomatTable', '#createdAutomatTable', createdAutomatTableAjax, createdAutomatTableColumns, createdAutomatTableFilters, createdAutomatTableOptions, createdAutomatTableOperations);
    
        
      });
    
      function dateTrFormat(data) {
          let options = { timeZone: 'Europe/Istanbul', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
          let formattedDate = new Date(data).toLocaleString('tr-TR', options);
          return formattedDate;
      }
    </script>