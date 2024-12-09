<template>
  <div class="w-full flex flex-col gap-2">
    <div class="w-full flex flex-col gap-1">
      
        <div class="datatable-container">
          <table id="messagesTable" class="display" style="width:100%"></table>
        </div>
        <div class="datatable-container">
          <table id="productsTable" class="display" style="width:100%"></table>
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
  import { sharedFunctions } from '../scripts/shared.js'
  import initializeDataTable from '../scripts/initDatatable';

  let messagesTableColumns = [{"title":"postId","data":"postId"},{"title":"name","data":"name"},{"title":"email","data":"email"},{"title":"body","data":"body"}];
  let messagesTableAjax = {
    url: "https://jsonplaceholder.typicode.com/comments",
    type: "GET",
    dataSrc: ""
  };
  let productsTableColumns = [{"title":"title","data":"title"},{"title":"url","data":"url"},{"title":"albumId","data":"albumId"},{"title":"thumbnailUrl","data":"thumbnailUrl"}];
  let productsTableAjax = {
    url: "https://jsonplaceholder.typicode.com/photos",
    type: "GET",
    dataSrc: ""
  };
  

  onMounted(() => {
    initializeDataTable('#messagesTable', messagesTableAjax, messagesTableColumns, {});
      initializeDataTable('#productsTable', productsTableAjax, productsTableColumns, {});
      

    
  });

  
</script>