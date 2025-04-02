import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBasketStore = defineStore('basket', () => {
    const baskets = ref({});

    function addItem(cardGroupName, item) {
        if (!baskets.value[cardGroupName]) {
            baskets.value[cardGroupName] = [];
        }

        let existingItem = baskets.value[cardGroupName].find(i => i.ID === item.ID);
        if (existingItem) {
            if (existingItem.quantity < existingItem.limit) {
                existingItem.quantity += 1;
            }
        } else {
            baskets.value[cardGroupName].push({ ID: item.ID, quantity: 1, limit: item.Envanter, item: item });
        }
    }

    function removeItem(cardGroupName, itemId) {
        if (baskets.value[cardGroupName]) {
            baskets.value[cardGroupName] = baskets.value[cardGroupName].filter(i => i.ID !== itemId);
        }
    }

    function clearBasket(cardGroupName) {
        if (baskets.value[cardGroupName]) {
            baskets.value[cardGroupName] = [];
        }
    }

    function getBasket(cardGroupName) {
        return baskets.value[cardGroupName] || [];
    }

    function increaseQuantity(cardGroupName, itemId) {
        let item = baskets.value[cardGroupName]?.find(i => i.ID === itemId);
        if (item && item.quantity < item.limit) {
            item.quantity += 1;
        }
    }

    function decreaseQuantity(cardGroupName, itemId) {
        let item = baskets.value[cardGroupName]?.find(i => i.ID === itemId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                removeItem(cardGroupName, itemId);
            }
        }
    }

    function setQuantity(cardGroupName, itemId, newQuantity) {
        let item = baskets.value[cardGroupName]?.find(i => i.ID === itemId);
        if (item) {
            if (newQuantity >= 1 && newQuantity <= item.limit) {
                item.quantity = newQuantity;
            } else if (newQuantity < 1) {
                removeItem(cardGroupName, itemId);
            }
        }
    }

    return {
        baskets,
        addItem,
        removeItem,
        clearBasket,
        getBasket,
        increaseQuantity,
        decreaseQuantity,
        setQuantity
    };
});
