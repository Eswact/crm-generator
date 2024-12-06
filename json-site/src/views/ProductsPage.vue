<template>
  <div>
    <div class="w-full flex justify-between items-center dark:text-white text-main text-[2rem]"><h1>Products</h1></div>
    
        <div class="datatable-container">
          <table id="productsTable" class="display" style="width:100%"></table>
        </div>

    
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import initializeDataTable from '../scripts/initDatatable';

  let tableColumns = [{"title":"title","data":"title"},{"title":"url","data":"url"},{"title":"albumId","data":"albumId"},{"title":"thumbnailUrl","data":"thumbnailUrl"}];
    let ajaxReq = {
      url: "https://jsonplaceholder.typicode.com/photos",
      type: "GET",
      dataSrc: ""
    };

  onMounted(() => {
  initializeDataTable('#productsTable', ajaxReq, tableColumns, {})
  });
 
  
</script>