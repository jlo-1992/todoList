import { defineStore } from "pinia";
import { ref } from "vue";

export const usePollStore = defineStore(
  "poll",
  () => {
    const poll = ref({ dynasty: 0, noDad: 0, ghost: 0 });

    const addVote = (id) => {
      poll.value[id]++;
    };

    return {
      addVote,
    };
  },
  {
    persist: {
      key: "poll",
      pick: ["poll"],
    },
  }
);
