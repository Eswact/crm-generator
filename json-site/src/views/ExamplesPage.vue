<template>
      <div class="w-full flex flex-col gap-8">
        
    <div class="w-full">
      <table id="messagesTable" class="display stripe hover" style="width:100%"></table>
    </div>
    <div class="w-full">
      <table id="productsTable" class="display stripe hover" style="width:100%"></table>
    </div><div class="w-full flex justify-center items-center">
            <div class="w-full py-0 gap-8 flex justify-between items-center">
              <div></div>
              <button @click="sharedFunctions.getPageByPath(route.path)" class="px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">This Page</button>
            </div>
          </div>
      </div>
    </template>
  
    <script setup>
      import { ref, onMounted } from 'vue';
      import { useRoute, useRouter } from 'vue-router';
      const route = useRoute();
      const router = useRouter();
      import commonFunctions from '../scripts/common.js'
      import { sharedFunctions } from '../scripts/custom/shared.js'
      import datatableHelper from '../scripts/datatableHelper';
    
        
          var messagesTable;

          let messagesTableColumns = [
            {
              order: 0,
              title: "Group",
              data: "postId",
              name: "postId",
              checkable: true,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex justify-center items-center font-bold text-2xl">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              }
            },{
              order: 1,
              title: "Name",
              data: "name",
              name: "name",
              checkable: false,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              }
            },{
              order: 2,
              title: "Mail",
              data: "email",
              name: "email",
              checkable: true,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              }
            },{
              order: 3,
              title: "Message",
              data: "body",
              name: "body",
              checkable: false,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              }
            }
          ];
      
          let messagesTableAjax = {
            url: "https://jsonplaceholder.typicode.com/comments",
            type: "GET",
            dataSrc: '',
            data: function (d) {}
          };
    
          let messagesTableOptions = {
            drawCallback: function (settings, data) {},
fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) {},
fnInitComplete: function () {}
          };
          messagesTableOptions.serverSide = false;
          messagesTableOptions.processing = false;
        
          var productsTable;

          let productsTableColumns = [
            {
              order: 0,
              title: "Title",
              data: "title",
              name: "title",
              checkable: false,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex w-full gap-6 items-center">
                                <img class="w-[200px]" src="${row.url}" />
                                <div class="max-w-[250px] font-semibold text-xl">${data}</div>
                            </div>`;
                }
                else { return ''; }
              }
            },{
              order: 1,
              title: "Album No",
              data: "albumId",
              name: "albumId",
              checkable: true,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="w-full flex justify-center items-center font-bold text-xl">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              }
            },{
              order: 2,
              title: "Thumbnail",
              data: "thumbnailUrl",
              name: "thumbnailUrl",
              checkable: true,
              render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex w-full">
                                <img src="${data}" />
                            </div>`;
                }
                else { return ''; }
              }
            }
          ];
      
          let productsTableAjax = {
            url: "https://jsonplaceholder.typicode.com/photos",
            type: "GET",
            dataSrc: '',
            data: function (d) {}
          };
    
          let productsTableOptions = {
            drawCallback: function (settings, data) {},
fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) {},
fnInitComplete: function () {console.log('fnInitComplete')}
          };
          productsTableOptions.serverSide = false;
          productsTableOptions.processing = false;
        
    
      onMounted(() => {
        messagesTable = datatableHelper.initializeDataTable('messagesTable', '#messagesTable', messagesTableAjax, messagesTableColumns, messagesTableOptions);
productsTable = datatableHelper.initializeDataTable('productsTable', '#productsTable', productsTableAjax, productsTableColumns, productsTableOptions);
    
        
      });
    
      
    </script>