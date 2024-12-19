<template>
      <div class="w-full flex flex-col gap-1">
        
    <div class="w-full">
      <table id="transferedAutomatTable" class="display stripe hover" style="width:100%"></table>
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
              render: null
            },{
              order: 0,
              title: "Plate",
              data: "plate",
              name: "plate",
              checkable: false,
              orderable: false,
              render: null
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
      
          let transferedAutomatTableAjax = {
            url: "http://localhost:44350/warehouse/get-automats",
            type: "POST",
            dataSrc: function (json) { return json.data; },
            data: function (d) {
              d.IsField = true;
              d.plate = "";
              d.model = "";
              d.customerId = "";
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
        
    
      onMounted(() => {
        transferedAutomatTable = datatableHelper.initializeDataTable('transferedAutomatTable', '#transferedAutomatTable', transferedAutomatTableAjax, transferedAutomatTableColumns, transferedAutomatTableOptions);
    
        
      });
    
      function dateTrFormat(data) {
          let options = { timeZone: 'Europe/Istanbul', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
          let formattedDate = new Date(data).toLocaleString('tr-TR', options);
          return formattedDate;
      }
    </script>