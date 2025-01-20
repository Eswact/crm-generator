<template>
      <div class="w-full flex flex-col gap-1">
        <div class="w-full flex flex-col gap-6 justify-center items-center text-lg">
            <h1 class="text-main text-center text-[2.25rem] leading-10 font-bold">JSON-Based Dynamic CRM Generator</h1>
            <div class="max-w-[1000px] flex flex-col gap-4 justify-center items-center">
              <p class="text-center">The project's goal is to simplify the process of website development, particularly for CRM systems, by utilizing a JSON file and local resources. It enables dynamic generation of a Vue 3 and Tailwind CSS-based website using predefined configurations in the JSON file, making it easier to create, customize, and maintain websites.</p>
              <img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl dark:hidden" title="process" src="/images/process.png" />
              <img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl hidden dark:block" title="process" src="/images/process-dark.png" />
            </div>
            <div class="max-w-[1000px] flex flex-col gap-4 justify-center items-center">
              <h2 class="text-main text-center text-[1.75rem] font-semibold">JSON Configuration</h2>
              <p>The JSON file forms the foundation of the project and includes the following key components:</p>
              <img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl dark:hidden" title="json config" src="/images/json-detail.png" />
              <img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl hidden dark:block" title="json config" src="/images/json-detail-dark.png" />
              <span>
                <span class="font-semibold">General Information: </span>
                In addition to the website's name and logo, it also includes metadata details such as the title, description, and icon.
              </span>
              <span>
                <span class="font-semibold">Themes: </span>
                Specifies settings for visual elements such as color schemes, dark mode enablement, and font configurations. These settings define the overall aesthetic of the website.
              </span>
              <span>
                <span class="font-semibold">Pages: </span>
                Each page is defined within the JSON structure, detailing its layout and the components used. Pages also include a variety of content types to streamline development like DataTable, customType
              </span>
              <span>
                The content types are integrated directly within the page definitions, making it easier to construct dynamic DOM structures that align with the project's requirements. This approach ensures that the JSON file can handle both general and page-specific configurations efficiently.
              </span>
            </div>      
          </div><div class="w-full py-2 mt-2 flex justify-center items-center">
            <div class="w-full max-w-[1000px] gap-8 flex justify-between items-center">
              <button @click=gettingStarted class="px-4 py-2 bg-third text-white shadow-md text-xl font-bold rounded-lg">Getting Started</button>
              <button @click="sharedFunctions.getPageByPath(route.path)" class="px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">This Page</button>
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
      import { sharedFunctions } from '../scripts/custom/shared.js'
      
    
        
    
      onMounted(() => {
        
    
        
        toast.success("Toast Test!");
      
      });
    
      
        import { toast } from "vue3-toastify";
        function gettingStarted() {
          router.push({ path: '/configuration' });
        }
      
    </script>