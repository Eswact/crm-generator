<template>
  <div class="w-full flex flex-col gap-2">
    <div class="w-full flex flex-col gap-1">
      
        <div class="datatable-container">
          <table id="messagesTable" class="display" style="width:100%"></table>
        </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import initializeDataTable from '../scripts/initDatatable';

  let messagesTableColumns = [{"title":"postId","data":"postId"},{"title":"name","data":"name"},{"title":"email","data":"email"},{"title":"body","data":"body"}];
  let messagesTableAjax = {
    url: "https://jsonplaceholder.typicode.com/comments",
    type: "GET",
    dataSrc: ""
  };
  

  onMounted(() => {
    initializeDataTable('#messagesTable', messagesTableAjax, messagesTableColumns, {});
      

    
  });

  
</script>