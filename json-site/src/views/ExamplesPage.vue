<template>
      <div class="w-full flex flex-col gap-8">
        
    <div class="w-full">
      <table id="messagesTable" class="display" style="width:100%"></table>
    </div>
    <div class="w-full">
      <table id="productsTable" class="display" style="width:100%"></table>
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
      import initializeDataTable from '../scripts/initDatatable';
    
        
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
            dataSrc: "",
            data: function (d) {}
          };
    
          let messagesTableOptions = {
            dom: "<\"w-full flex justify-between items-center md:flex-col md:justify-center\"<\"toolbar\"><l>>rt<\"w-full flex justify-between items-center md:flex-col md:justify-center\"<i><p>>",
drawCallback: function (settings, data) {console.log(data)},
fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) {},
fnInitComplete: function () {}
          };
        
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
            dataSrc: "",
            data: function (d) {}
          };
    
          let productsTableOptions = {
            dom: "<\"w-full flex justify-between items-center md:flex-col md:justify-center\"<\"toolbar\"><l>>rt<\"w-full flex justify-between items-center md:flex-col md:justify-center\"<i><p>>",
drawCallback: function (settings, data) {console.log(data)},
fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) {},
fnInitComplete: function () {}
          };
        
    
      onMounted(() => {
        initializeDataTable('#messagesTable', messagesTableAjax, messagesTableColumns, messagesTableOptions);initializeDataTable('#productsTable', productsTableAjax, productsTableColumns, productsTableOptions);
    
        
      });
    
      
    </script>