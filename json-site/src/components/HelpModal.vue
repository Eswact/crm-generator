<script setup>
    import { useHelpStore } from '../store/pageHelper';
    const helpStore = useHelpStore();

    function closeHelp() {
        helpStore.$state.isHelpVisible = false;
    }
</script>

<template>
    <div @click.self="closeHelp" class="z-40 fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col justify-end items-center">
        <div class="relative w-full h-[300px] px-[5%] py-6 flex justify-center items-center bg-bg dark:bg-darkBg text-darkBg dark:text-bg rounded-t-xl shadow-md border border-second">
            <div @click="closeHelp" class="absolute right-4 top-4 px-3 text-xl aspect-square flex justify-center items-center bg-cancel rounded-full"><i class="fa-solid fa-x"></i></div>
            <div class="w-full h-full flex justify-center items-center">
                <div class="helpSection w-full h-full flex flex-col gap-2 items-center border-third">
                    <div class="text-third w-full relative flex justify-center gap-4 items-center text-2xl font-semibold">
                        <i class="fa-regular fa-lightbulb absolute left-16"></i>
                        <h5>{{ helpStore.$state.helpData.page || "Sayfa" }}</h5>
                    </div>
                    <div class="w-full h-full py-8 px-16 text-justify">
                        <span class="w-full text-lg">{{ helpStore.$state.helpData.info || "" }}</span>
                    </div>
                </div>
                <div v-if="helpStore.$state.helpData.shortcuts.length" class="helpSection w-full h-full flex flex-col gap-2 items-center border-third">
                    <div class="text-third w-full relative flex justify-center gap-4 items-center text-2xl font-semibold">
                        <i class="fa-solid fa-keyboard absolute left-16"></i>
                        <h5>Shortcuts</h5>
                    </div>
                    <div class="w-full h-full py-8 px-16">
                        <ul class="w-full flex flex-col justify-beetween gap-4 max-h-full overflow-y-auto">
                            <li v-for="thisShortcut in helpStore.$state.helpData.shortcuts" :key="thisShortcut" class="w-full flex justify-between items-center gap-8">
                                <div class="w-1/2 flex justify-end items-center gap-4">
                                    <div v-for="(shortcutKey, index) in thisShortcut.shortcut" :key="shortcutKey" class="flex justify-start items-center gap-4">
                                        <img :src=shortcutKey.key  class="max-h-12">
                                        <i v-if="index !== thisShortcut.shortcut.length - 1" class="fa-solid fa-plus"></i>
                                    </div>
                                </div>
                                <span class="w-1/2">{{ thisShortcut.shortcutDescription }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="helpStore.$state.helpData.link" class="helpSection w-full h-full flex flex-col gap-2 items-center border-third">
                    <div class="text-third w-full relative flex justify-center gap-4 items-center text-2xl font-semibold">
                        <i class="fa-brands fa-youtube absolute left-16"></i>
                        <h5>Video</h5>
                    </div>
                    <div class="w-full h-full py-4 px-16 flex justify-center items-center">
                        <iframe :src=helpStore.$state.helpData.link class="w-full h-full rounded-md" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .helpSection {
        border-right: 2px solid;
    }
    .helpSection:last-child {
        border-right: none;
    }
</style>