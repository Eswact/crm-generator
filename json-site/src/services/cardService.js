import $ from 'jquery';
import commonFunctions from '../scripts/common';
import { toast } from "vue3-toastify";
import select2Service from './select2Service';


const cardService = {
    openFiltersModal: function(card, cardFilters, filtersData) {
        this.fillFiltersModal(card, cardFilters, filtersData);
        commonFunctions.openFilter();
    },
    fillFiltersModal: function(card, cardFilters, filtersData) {
        let filterHtml = '';
        cardFilters.map(function(filter, index){
            if(filter.visible) {
                switch(filter.type) {
                    case 'text':
                        filterHtml += `<div class="w-full flex flex-col">
                                            <label class="font-semibold text-second text-md pl-1">${filter.name}</label>
                                            <input type="text" data-filter="${filter.data}" value="${filter.value ? filter.value : ''}" placeholder="${filter.name}" class="filterInput text-lg w-full h-[50px] md:h-auto border border-darkBg text-darkBg rounded-xl  px-4 py-3 md:py-2 md:px-3">
                                        </div>`;
                        break;
                    case 'select':
                        filterHtml += `<div class="w-full flex flex-col">
                                            <label class="font-semibold text-second text-md pl-1">${filter.name}</label>
                                            <select data-filter="${filter.data}" value="${filter.value ? filter.value : ''}" class="filterInput text-lg w-full h-[50px] md:h-auto border border-darkBg text-darkBg rounded-xl  px-4 py-3 md:py-2 md:px-3">
                                                <option value="">All</option>
                                                ${filter.options.map(option => `<option value="${option.value}" ${filter.value == option.value ? 'selected' : ''}>${option.label}</option>`).join('')}
                                            </select>
                                        </div>`;
                        break;
                    case 'select2':
                        filterHtml += `<div class="w-full flex flex-col">
                                            <label class="font-semibold text-second text-md pl-1">${filter.name}</label>
                                            <select data-filter="${filter.data}" class="filterInput text-lg w-full h-[50px] md:h-auto border border-darkBg text-darkBg rounded-xl  px-4 py-3 md:py-2 md:px-3">
                                                <option value=""></option>
                                            </select>
                                        </div>`;
                        break;
                    case 'check':
                        filterHtml += `<div class="w-full flex flex-col">
                                            <label class="font-semibold text-second text-md pl-1">${filter.name}</label>
                                            <input type="checkbox" data-filter="${filter.data}" class="filterInput text-lg w-full h-[50px] md:h-auto border border-darkBg text-darkBg rounded-xl" ${filter.value ? 'checked' : ''}>
                                        </div>`;
                        break;
                }
            }
        });
        $('#tableFilterList').html(filterHtml);

        $(cardFilters.filter(filter => filter.type == 'select2' && filter.visible)).each((i, f) => {
            (f.value && f.selectedText)
                ? select2Service.createSelect2(`.filterInput[data-filter="${f.data}"]`, f.options, {id: f.value, text: f.selectedText})
                : select2Service.createSelect2(`.filterInput[data-filter="${f.data}"]`, f.options);
        });

        $('#filterModalApply').off('click').on('click', () => this.applyFilters(card, cardFilters, filtersData));
        $('#filterModalReset').off('click').on('click', () => this.resetFilters(card, cardFilters, filtersData));
    },
    
    applyFilters: function(card, cardFilters, filtersData) {
        // if (cardFilters.beforeApply) {
        //     cardFilters.beforeApply();
        // }
        cardFilters.map(function(filter, index){
            if(filter.visible) {
                switch(filter.type) {
                    case 'text':
                        filter.value = $(`.filterInput[data-filter="${filter.data}"]`).val();
                        break;
                    case 'select':
                        filter.value = $(`.filterInput[data-filter="${filter.data}"]`).val();
                        break;
                    case 'select2':
                        filter.value = $(`.filterInput[data-filter="${filter.data}"]`).val();
                        filter.selectedText = $(`.filterInput[data-filter="${filter.data}"]`).text();
                        break;
                    case 'check':
                        filter.value = $(`.filterInput[data-filter="${filter.data}"]`).prop('checked');
                        break;
                }
            }
        });
        cardFilters.forEach((filter) => {
            filtersData.value[filter.data] = filter.value;
        });
        // this.reloadCards(card);
        commonFunctions.closeFilter();
    },
    resetFilters: function(card, cardFilters, filtersData) {
        // if (cardFilters.beforeReset) {
        //     cardFilters.beforeReset();
        // }
        cardFilters.map(function(filter, index){
            filter.value = filter.default;
        });
        // this.reloadCards(card);
        commonFunctions.closeFilter();
    },
};

export default cardService;