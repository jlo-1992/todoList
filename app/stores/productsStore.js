import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductsStore = defineStore(
  "products",
  () => {
    const chosenBook = ref(null);

    const setChosenBook = (bookTitle) => {
      chosenBook.value = bookTitle;
    };

    const clearChosenBook = () => {
      chosenBook.value = null;
    };

    return {
      chosenBook,
      setChosenBook,
      clearChosenBook,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      key: "products",
      pick: ["chosenBook"],
    },
  }
);
