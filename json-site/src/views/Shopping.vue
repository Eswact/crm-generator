<template>
      <div class="w-full flex flex-col justify-center items-center gap-8">
        <div id="shoppingCards" name="shoppingCards" class="w-full flex flex-col gap-4">
            <div class="w-full flex justify-between items-center gap-4 md:flex-col md:justify-center">
      <div class="flex items-center">
        <div class="w-[300px] md:w-full relative max-w-full flex items-center justify-end"> <input v-model="shoppingCardsSearchBar" type="text" placeholder="Search Products..." class="peer w-full pl-4 pr-8 py-2 bg-white dark:bg-opacity-10 border-2 border-second dark:border-white rounded-xl placeholder:text-second dark:placeholder:text-white font-bold md:font-semibold text-lg focus:placeholder:text-fourth focus:border-fourth dark:focus:placeholder:text-fourth dark:focus:border-fourth focus:outline-none"/><i class="fa-solid fa-magnifying-glass absolute right-4 text-lg text-second dark:text-white peer-focus:text-fourth"></i></div>
      </div>
      <div class="w-[400px] max-w-full md:w-full flex items-center justify-end gap-4">
        <button id="shoppingCardsFiltersButton" class="w-[calc(50%-0.5rem)] bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
          <span class="font-bold md:font-semibold">Filters</span>
          <i class="fa-solid fa-filter"></i>
        </button>
        <button id="shoppingCardsOrderModalButton" class="w-[calc(50%-0.5rem)] bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
          <span class="font-bold md:font-semibold">Sort</span>
          <i class="fa-solid fa-sort"></i>
        </button>
        <button v-show="basketStore.getBasket('shoppingCards').length > 0" @click="getBasketList('shoppingCards')" id="shoppingCardsBasketButton" class="flex items-center gap-2 text-white bg-third text-lg font-semibold p-2 rounded-lg" >
          <i class="fa-solid fa-basket-shopping text-xl"></i>
          <span>({{ basketStore.getBasket('shoppingCards').length }})</span>
        </button>
      </div>
    </div>
            <div v-if="shoppingCards.length > 0" class="cardList w-full flex items-center gap-2 flex-wrap">
        <div
          v-for="card in shoppingCards"
          :key="card.ID"
          class="relative w-[calc(20%-0.4rem)] xl:w-[calc(25%-0.4rem)] md:w-[calc(50%-0.4rem)] h-[340px] sm:h-[300px] py-2 px-4 bg-white dark:bg-black text-center flex flex-col items-center justify-around rounded-md shadow-lg"
          :data-envanter=card.Envanter
          :data-barcode=card.Barkodlar[0].Barkodu
        >
          <img
            :src="card.Resimler[0] || '/defaults/images/no-image.png'"
            class="w-full h-[50%] sm:h-[45%] object-contain object-center rounded-lg overflow-hidden"
            :alt="card.UrunAdi"
            onerror="this.src='/defaults/images/no-image.png'"
          />
          <div class="h-[3.5rem] flex justify-center items-center">
            <h2 class="w-full text-xl sm:text-lg font-semibold truncatedText2">{{ card.UrunAdi }}</h2>
          </div>
          <span class="text-lg sm:text-base font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.Tutar) }}</span>
          <button v-if="basketStore.getBasket('shoppingCards').every(c => c.ID !== card.ID)" @click="basketStore.addItem('shoppingCards', card)" class="w-full bg-third border-2 border-third text-white p-1 text-lg font-semibold rounded-lg">Add to basket</button>
          <div v-else class="w-full flex items-center justify-between gap-4 md:gap-2">
            <button @click="basketStore.decreaseQuantity('shoppingCards', card.ID)" class="w-full bg-second text-white p-1 text-lg font-semibold rounded-lg"><i class="fa-solid fa-minus"></i></button>
            <span class="text-lg font-bold text-third px-2">{{ basketStore.getBasket('shoppingCards').find(c => c.ID === card.ID).quantity }}</span>
            <button @click="basketStore.increaseQuantity('shoppingCards', card.ID)" class="w-full bg-second text-white p-1 text-lg font-semibold rounded-lg"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
      </div>
      <div v-else class="w-full flex flex-col justify-center items-center gap-2">
        <img src="/defaults/images/not-found.gif" alt="No data found" />
        <h2 class="text-3xl font-bold text-second">No data found</h2>
      </div>
            <div class="flex justify-between items-center">
                <button @click="shoppingCardsCurrentPage--" :disabled="shoppingCardsCurrentPage <= 1" class="bg-second text-white hover:bg-main duration-200 py-2 w-28 rounded-lg disabled:bg-second/50 dark:disabled:bg-second/20">Previous</button>
                <div class="flex items-center gap-4 px-3 py-1 rounded-lg text-second dark:text-white font-semibold"><span>Page</span><span>{{ shoppingCardsCurrentPage }} / {{ shoppingCardsTotalPages }}</span></div>
                <button @click="shoppingCardsCurrentPage++" :disabled="shoppingCardsCurrentPage >= shoppingCardsTotalPages" class="bg-second text-white hover:bg-main duration-200 py-2 w-28 rounded-lg disabled:bg-second/50 dark:disabled:bg-second/20">Next</button>
              </div>
            <div v-show="shoppingCardsOrderModalVisibility" id="shoppingCardsOrderModal" @click.self="shoppingCardsToggleOrderVisibility()" class="z-30 fixed w-full h-full top-0 left-0 bg-black bg-opacity-65 flex justify-center items-center md:items-end">
      <div class="bg-bg text-dark p-4 max-h-full max-w-full min-w-[400px] overflow-y-auto md:w-full md:min-w-[unset] md:pb-8 rounded-lg md:rounded-b-none md:rounded-t-2xl flex flex-col gap-4">
        <div class="w-full flex items-center justify-between mb-1">
          <h2 class="text-2xl font-bold dark:text-darkBg">Sorting</h2>
          <button @click="shoppingCardsToggleOrderVisibility()" class="px-2 text-3xl text-red-600"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <label v-for="option in shoppingCardsOrderOptions" :key="option.id" :for="option.id" class="w-full px-6 py-3 border border-gray-400 flex items-center gap-4 text-lg font-semibold rounded-md">
          <input
            type="radio"
            :id="option.id"
            name="ordering"
            :checked="shoppingCardsOrdering === option.value"
            @change="shoppingCardsOrdering = option.value"
          />
          <span class="dark:text-darkBg">{{ option.name }}</span>
        </label>
      </div>
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
      
import $ from "jquery";
import cardService from "../services/cardService";
import { useBasketStore } from "../store/basketStore";
const basketStore = useBasketStore();
    
      
      
    const shoppingCards = ref([]);
    const shoppingCardsOrdering = ref(1);
 const shoppingCardsOrderOptions = ref([{"name":"A to Z","id":"aToZ","value":1},{"name":"Lowest price","id":"lowestPrice","value":2},{"name":"Highest price","id":"highestPrice","value":3}]);
 const shoppingCardsOrderModalVisibility = ref(false);
    const shoppingCardsSearchBar = ref('');
    const shoppingCardsFilters = [{"data":"category","name":"Category","type":"select2","options":{"width":"100%","minimumInputLength":-1,"placeholder":"Category Selection","allowClear":true,"language":{"noResults":"Eşleşen bir Kategori bulunamadı.","inputTooShort":"En az 1 Karakter giriniz.","searching":"Aranıyor..."},"ajax":{"url":"http://localhost:3000/categories","delay":250,"type":"GET","dataType":"json","contentType":"application/json; charset=utf-8"}},"value":null,"default":null,"visible":true},{"data":"brand","name":"Brand","type":"text","value":null,"default":null,"visible":true}];
    const shoppingCardsFiltersData = ref({category: null,brand: null}) 
    const shoppingCardsViewMode = ref('grid');
    const shoppingCardsCurrentPage = ref(1);
const shoppingCardsTotalPages = ref(1);

    const getshoppingCards = function () {
      const params = {
        currentPage: shoppingCardsCurrentPage.value,
 itemsPerPage: 10,
        orderType: shoppingCardsOrdering.value,
        searchValue: shoppingCardsSearchBar.value,
        filters: {...shoppingCardsFiltersData.value},
      };

      $.ajax({
        url: "http://localhost:3000/products",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(params),
        success: function(res) {
          console.log(res);
          shoppingCards.value = res.data;
          shoppingCardsTotalPages.value = res.totalPages;
        },
        error: function(err) {
          console.log(err);
        }
      })
    };
    
    watch(shoppingCardsCurrentPage, () => { getshoppingCards(); }, { deep: true });
    function shoppingCardsToggleOrderVisibility() { shoppingCardsOrderModalVisibility.value = !shoppingCardsOrderModalVisibility.value };
      watch(shoppingCardsOrdering, () => { getshoppingCards(); }, { deep: true });
    watch(shoppingCardsSearchBar, commonFunctions.debounce((value) => { 
        shoppingCardsSearchBar.value = value; 
        if (shoppingCardsCurrentPage.value > 1) { shoppingCardsCurrentPage.value = 1; }
        else { getshoppingCards(); } 
        }, 300), { deep: true });
    function shoppingCardsOpenCardFilters() { cardService.openFiltersModal("shoppingCards", shoppingCardsFilters, shoppingCardsFiltersData.value) };
      watch(shoppingCardsFiltersData, () => { 
        if (shoppingCardsCurrentPage.value > 1) { shoppingCardsCurrentPage.value = 1; }
        else { getshoppingCards(); }
      }, { deep: true });
    function getBasketList(name) {
        console.log(basketStore.getBasket(name));
      };
    
      onMounted(() => {
        
        getshoppingCards();
          $('#shoppingCardsOrderModalButton').off('click').on('click', shoppingCardsToggleOrderVisibility)
          $('#shoppingCardsFiltersButton').off('click').on('click', shoppingCardsOpenCardFilters);
    
        
      });
    
      
    </script>
    
    <style scoped>
      
    </style>