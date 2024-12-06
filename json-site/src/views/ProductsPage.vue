<template>
  <div class="w-full flex flex-col gap-2">
    <div class="w-full flex flex-col gap-1">
      
        <div class="datatable-container">
          <table id="productsTable" class="display" style="width:100%"></table>
        </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import initializeDataTable from '../scripts/initDatatable';

  let productsTableColumns = [{"title":"title","data":"title"},{"title":"url","data":"url"},{"title":"albumId","data":"albumId"},{"title":"thumbnailUrl","data":"thumbnailUrl"}];
  let productsTableAjax = {
    url: "https://jsonplaceholder.typicode.com/photos",
    type: "GET",
    dataSrc: ""
  };
  

  onMounted(() => {
    initializeDataTable('#productsTable', productsTableAjax, productsTableColumns, {});
      

    
  });

  
</script>