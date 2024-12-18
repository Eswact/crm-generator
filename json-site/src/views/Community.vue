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
              order: 0,
              title: "Plate",
              data: "plate",
              name: "plate",
              checkable: false,
              render: null
            },{
              order: 1,
              title: "Model",
              data: "model",
              name: "model",
              checkable: true,
              render: null
            },{
              order: 1,
              title: "Customer",
              data: "customerName",
              name: "customerName",
              checkable: true,
              render: null
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
fnInitComplete: function () {console.log('fnInitComplete')}
          };
          transferedAutomatTableOptions.serverSide = true;
          transferedAutomatTableOptions.processing = true;
        
    
      onMounted(() => {
        transferedAutomatTable = datatableHelper.initializeDataTable('transferedAutomatTable', '#transferedAutomatTable', transferedAutomatTableAjax, transferedAutomatTableColumns, transferedAutomatTableOptions);
    
        
      });
    
      
    </script>