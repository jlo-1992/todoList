import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const usePollStore = defineStore(
  "poll",
  () => {
    const books = ref([
      {
        title: "明朝",
        author: "駱以軍",
        votes: 0,
      },
      {
        title: "無父之城",
        author: "陳雪",
        votes: 0,
      },
      {
        title: "鬼地方",
        author: "陳思宏",
        votes: 0,
      },
      {
        title: "殺手的戀愛相談",
        author: "謝東霖",
        votes: 0,
      },
      {
        title: "你不能再死一次",
        author: "陳雪",
        votes: 0,
      },
      {
        title: "親愛的共犯",
        author: "陳雪",
        votes: 0,
      },
    ]);

    const totalVotes = computed(() => {
      return books.value.reduce(
        (totalVotes, book) => totalVotes + book.votes,
        0
      );
    });

    const booksWithPercent = computed(() => {
      const currentTotalVotes = totalVotes.value;
      if (currentTotalVotes === 0) {
        return books.value.map((book) => ({ ...book, percent: 0 }));
      }
      return books.value.map((book) => ({
        ...book,
        percent: Math.round((book.votes / currentTotalVotes) * 100),
      }));
    });

    const castVote = (bookTitle) => {
      if (bookTitle) {
        const targetBook = books.value.find((book) => {
          return book.title === bookTitle;
        });
        if (targetBook) {
          targetBook.votes++;
        }
      }
    };

    return {
      books,
      castVote,
      totalVotes,
      booksWithPercent,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      key: "poll",
      pick: ["books"],
    },
  }
);
