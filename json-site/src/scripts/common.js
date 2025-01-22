import { ref } from "vue";
import siteDataJson from "../../siteData.json";

const defaultSplash = {
  visible: false,
  defaultHtml: siteDataJson.splashDefaultContext || `<img class="defaultImg" src="/defaults/images/loading.gif" />`,
  title: null,
  description: null,
  buttons: [],
};
const splash = ref({ ...defaultSplash });

const commonFunctions = {
  openModal: function(width, height, html) {
    let sharedModalBg = document.getElementById('sharedModalBg');
    if (window.innerWidth >= 640) { //sm fullscreen
      width ? sharedModalBg.style.width = `${width}px` : sharedModalBg.style.width = 'auto';
      height ? sharedModalBg.style.height = `${height}px` : sharedModalBg.style.height = 'auto';
    }
    document.getElementById('sharedModal').classList.add('show');
    document.getElementById('sharedModalBody').innerHTML = html;
  },
  closeModal: function() {
    document.getElementById('sharedModal').classList.remove('show');
  },
  showConfirmationMessage: function(message, onClick) {
    let thisFunctions = this;

    let html = `<div class="flex flex-col items-center justify-center gap-4 px-8 py-4 sm:h-full"><h1 class="text-3xl font-bold text-black">Are you Sure ?</h1><p class="text-second max-w-[320px] sm:max-w-full text-center">${message}</p><div class="flex gap-8 items-center justify-center mt-4"><button class="w-32 py-2 text-lg font-bold rounded-xl shadow-md hover:bg-opacity-75 bg-green-700 text-white" id="confirmModalApply">OK</button><button class="w-32 py-2 text-lg font-bold rounded-xl shadow-md hover:bg-opacity-75 bg-red-700 text-white" id="confirmModalCancel">Cancel</button></div></div>`;
    thisFunctions.openModal(null, null, html);

    let confirmFunction = function () { onClick(); thisFunctions.closeModal(); };
    document.getElementById('confirmModalApply').addEventListener('click', confirmFunction);
    document.getElementById('confirmModalCancel').addEventListener('click', thisFunctions.closeModal);
  },
  updateSEO: function({ title, description, keywords }) {
    if (title) {
      document.title = title;
    }
    if (description) {
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }
    if (keywords) {
      let metaKeywords = document.querySelector("meta[name='keywords']");
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords.join(", ");
    }
  },
  openFilter: function() {
    document.getElementById('tableFilterModal').classList.add('show');
  },
  closeFilter: function() {
    document.getElementById('tableFilterModal').classList.remove('show');
  },
  useSplashScreen: function (options) {
    Object.assign(splash.value, { ...defaultSplash, ...options, visible: true });
  },
  hideSplashScreen: function() {
    splash.value.visible = false;
  },
  getSplashScreen: function() {
    return splash;
  },
}

export default commonFunctions;