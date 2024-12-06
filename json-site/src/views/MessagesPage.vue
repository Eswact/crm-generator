<template>
  <div>
    <div class="w-full flex justify-between items-center dark:text-white text-main text-[2rem]"><h1>Messages</h1></div>
    
        <div class="datatable-container">
          <table id="messagesTable" class="display" style="width:100%"></table>
        </div>

    
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import initializeDataTable from '../scripts/initDatatable';

  let tableColumns = [{"title":"postId","data":"postId"},{"title":"name","data":"name"},{"title":"email","data":"email"},{"title":"body","data":"body"}];
    let ajaxReq = {
      url: "https://jsonplaceholder.typicode.com/comments",
      type: "GET",
      dataSrc: ""
    };

  onMounted(() => {
  initializeDataTable('#messagesTable', ajaxReq, tableColumns, {})
  });
 
  
</script>