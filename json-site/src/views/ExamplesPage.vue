<template>
      <div class="w-full flex flex-col gap-8">
        
    <div class="w-full">
      <table id="messagesTable" class="display stripe hover" style="width:100%"></table>
    </div><div class="w-full flex justify-center items-center">
            <div class="w-full py-0 gap-8 flex justify-between items-center">
              <div></div>
              <button @click="sharedFunctions.getPageByPath(route.path)" class="px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">This Page</button>
            </div>
          </div>
      </div>
    </template>
  
    <script setup>
      import { ref, onMounted, computed, watch } from 'vue';
      import { useRoute, useRouter } from 'vue-router';
      const route = useRoute();
      const router = useRouter();
      import commonFunctions from '../scripts/common.js'
      import { sharedFunctions } from '../scripts/custom/shared.js';
import $ from "jquery";
import datatableService from "../services/datatableService";
    
      
var messagesTable;

let messagesTableColumns = [
  {
    order: 0,
    title: "Group",
    data: "postId",
    name: "postId",
    checkable: true,
    orderable: undefined,
    render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex justify-center items-center font-bold text-2xl">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              },
    className: ""
  },{
    order: 1,
    title: "Name",
    data: "name",
    name: "name",
    checkable: false,
    orderable: undefined,
    render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              },
    className: ""
  },{
    order: 2,
    title: "Mail",
    data: "email",
    name: "email",
    checkable: true,
    orderable: undefined,
    render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              },
    className: ""
  },{
    order: 3,
    title: "Message",
    data: "body",
    name: "body",
    checkable: false,
    orderable: undefined,
    render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                                ${data}
                            </div>`;
                }
                else { return ''; }
              },
    className: ""
  }
];






let messagesTableAjax = {
  url: "https://jsonplaceholder.typicode.com/comments",
  type: "GET",
  dataSrc: '',
  data: function(d) {
    
    
    
  }
};

let messagesTableTableOptions = {
  drawCallback: function (settings, data) {},
fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) {},
fnInitComplete: function () {}
};
messagesTableTableOptions.serverSide = false;
messagesTableTableOptions.processing = false;

let messagesTableRightClick = false
let messagesTableKeyFocusFunction = false
let messagesTableKeyFunction = false
let messagesTableOptions = {}

messagesTableOptions["rightClick"] = messagesTableRightClick;
messagesTableOptions['keyFocus'] = messagesTableKeyFocusFunction;
messagesTableOptions['key'] = messagesTableKeyFunction;



let messagesTableOperations = {}

      
    
      onMounted(() => {
        messagesTable = datatableService.initializeDataTable('messagesTable', '#messagesTable', messagesTableAjax, messagesTableColumns, null, messagesTableTableOptions, messagesTableOperations, messagesTableOptions);
        
    
        
        toast.success("Toast Test!");
        commonFunctions.useSplashScreen({"title": "Example Splash", "description": "This is an example splash screen. This splash close automatically in 3 seconds.", "buttons": [{"text": "Close Now", "action": commonFunctions.hideSplashScreen}], "timeout": 3000});
      
      });
    
      
        import { toast } from "vue3-toastify";
        function gettingStarted() {
          router.push({ path: '/configuration' });
        }
      
    </script>
    
    <style scoped>
      
    </style>