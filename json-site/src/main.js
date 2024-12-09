import { createApp } from 'vue';
import './styles/base.css';
import './styles/index.css';
import './styles/fonts.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'

import siteData from '../siteData.json';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

async function loadIcons() {
    let solidIcons, regularIcons, brandIcons;

    await Promise.all([
        siteData.pages.some(item => item.icon.includes('fa-solid')) &&
            import('@fortawesome/free-solid-svg-icons').then((module) => {
                solidIcons = module;
            }),
        siteData.pages.some(item => item.icon.includes('fa-regular')) &&
            import('@fortawesome/free-regular-svg-icons').then((module) => {
                regularIcons = module;
            }),
        siteData.pages.some(item => item.icon.includes('fa-brand')) &&
            import('@fortawesome/free-brands-svg-icons').then((module) => {
                brandIcons = module;
            }),
    ]);

    // default icons
    let libraryIcons = [{ prefix: 'fa-solid', name: 'faBars' }, { prefix: 'fa-solid', name: 'faXmark' }, { prefix: 'fa-solid', name: 'faCircleXmark' }];

    siteData.pages.forEach(function (item) {
        let [prefix, iconFaName] = item.icon.split(' ');
        let iconParts = iconFaName.split('-');
        iconParts.splice(0,1);
        let iconVarName = 'fa' + iconParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
        libraryIcons.push({
            prefix,
            name: iconVarName,
        });
    });

    libraryIcons.forEach(function (icon) {
        let module;
        switch (icon.prefix) {
            case 'fa-solid':
                module = solidIcons;
                break;
            case 'fa-regular':
                module = regularIcons;
                break;
            case 'fa-brands':
                module = brandIcons;
                break;
            default:
                console.error(`Unknown icon prefix: ${icon.prefix}`);
                return;
        }

        const iconObject = module?.[icon.name];
        if (iconObject) {
            library.add(iconObject);
        } else {
            console.error(`Icon ${icon.name} not found in ${icon.prefix} icons.`);
        }
    });
}

loadIcons().then(() => {
    const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);
    app.use(router);
    app.use(createPinia());
    app.mount('#app');
});