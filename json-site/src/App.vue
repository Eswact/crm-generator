<script setup>
  import { computed, onMounted  } from 'vue';
  import { useRoute } from 'vue-router';
  import Navbar from './components/Navbar.vue';
  import commonFunctions from './scripts/common';
  import siteData from '../siteData.json'

  const route = useRoute();
  const showNavbar = computed(() => {
    return route.name !== 'notFound';
  });

  function setWebsiteIcon() {
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = siteData.icon || '/default-icon.png';
    document.head.appendChild(link);
  }

  onMounted(() => {
    setWebsiteIcon();
  });
</script>

<template>
  <div class="w-full flex items-center">
    <Navbar v-if="showNavbar" />
    <main :class="['pb-[40px]', { 'w-[calc(100%-80px)] md:w-full px-[54px] md:px-[24px] mt-[120px] ml-[80px] md:ml-0 md:mt-[100px]': showNavbar }]">
      <RouterView />
    </main>

    <div id="sharedModal" class="fixed top-0 left-0 z-30 w-full h-full bg-[rgba(0,0,0,0.7)] justify-center items-center">
      <div id="sharedModalBg" class="relative p-[1.25rem] bg-bg text-darkBg rounded-lg sm:w-full sm:h-full">
        <button @click="commonFunctions.closeModal" class="text-cancel rounded-full bg-white flex text-[2rem] p-0 m-0 absolute right-[-0.8rem] top-[-0.8rem] sm:right-2 sm:top-2"><font-awesome-icon icon="fa-solid fa-circle-xmark" /></button>
        <div id="sharedModalBody" class="overflow-y-auto h-full pr-[0.25rem]">

        </div>
      </div>
    </div>

    <div id="tableFilterModal" class="fixed top-0 left-0 z-30 w-full h-full bg-[rgba(0,0,0,0.7)] justify-end items-center">
      <div class="w-[400px] max-w-full h-full p-8 rounded-l-2xl bg-white flex flex-col justify-between items-center gap-4">
        <div class="w-full flex">
          <h1>Filtreler</h1>
          <button>x</button>
        </div>
        <div id="tableFilterList" class="w-full flex flex-col"></div>
        <div>
          <button>Uygula</button>
          <button>Sıfırla</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #sharedModal, #tableFilterModal {
    display: none;
  }
  #sharedModal.show, #tableFilterModal.show {
    display: flex;
  }
</style>
