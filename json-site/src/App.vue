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
    <main :class="[ showNavbar
            ? 'w-[calc(100%-80px)] md:w-full px-[54px] md:px-[24px] pb-[40px] mt-[120px] ml-[80px] md:ml-0 md:mt-[100px]'
            : 'w-full'
          ]">
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
      <div id="filterModalContent" class="w-[400px] overflow-hidden duration-200 max-w-full h-full p-8 rounded-l-2xl bg-bg flex flex-col justify-between items-center gap-4">
        <div class="w-full flex justify-between text-4xl">
          <h1 class="font-bold text-second">Filters</h1>
          <button @click="commonFunctions.closeFilter" class="text-cancel"><font-awesome-icon icon="fa-solid fa-circle-xmark" /></button>
        </div>
        <div id="tableFilterList" class="w-full h-full py-8 md:py-4 overflow-y-auto flex flex-col gap-4 md:gap-2"></div>
        <div class="w-full flex flex-col gap-3">
          <button id="filterModalApply" class="w-full border rounded-lg p-2 text-xl font-semibold tracking-wider bg-second text-white border-second">Apply</button>
          <button id="filterModalReset" class="w-full border rounded-lg p-2 text-xl font-semibold tracking-wider text-second border-second">Reset</button>
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
  @keyframes expandWidth {
    0% { width: 0; }
    100% { width: 400px; }
  }
  #tableFilterModal.show #filterModalContent {
    animation: expandWidth 0.25s ease forwards;
  }
</style>
