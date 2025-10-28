<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200">
    <div>
      <MenuBar />
      <div
        class="w-md h-170 text-center m-auto relative bg-blue-300 rounded-sm shadow-2xl px-5 mt-5 overflow-y-auto scrollbar-hide"
      >
        <h1 class="text-3xl font-bold py-5 mt-5 text-white">本月一書</h1>
        <hr class="text-white" />
        <div class="bg-white rounded-xl shadow-2xl p-9 mt-6">
          <ul>
            <li v-for="(item, idx) in books" :key="idx" class="my-1 py-2">
              <div>
                <div class="mb-2 flex justify-between">
                  <label class="text-xl font-bold" :for="item.title"
                    >《{{ item.title }}》</label
                  >
                  <div class="flex justify-between items-center">
                    <input
                      v-if="hasVoted === false"
                      :id="item.title"
                      v-model="selectedBook"
                      name="bestOfTheMonth"
                      type="radio"
                      :value="item.title"
                    />
                    <template v-else>
                      <h1>{{ item.value }}%</h1>
                      <h2 class="text-gray-400 ml-1">( {{ item.votes }} 票)</h2>
                    </template>
                  </div>
                </div>
                <UProgress v-model="item.value" />
              </div>
            </li>
          </ul>
          <h1 class="mt-1">總票數：{{ totalVotes }}</h1>
          <UButton
            size="xl"
            class="bg-blue-300 mt-3 px-5 text-white cursor-pointer font-bold"
            :disabled="hasVoted === true"
            @click="castVote(selectedBook)"
            >投票</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const dynastyValue = ref(0);
const noDadValue = ref(0);
const ghostValue = ref(0);
const killerValue = ref(0);
const deadValue = ref(0);
const dearValue = ref(0);

const totalVotes = ref(0);
const hasVoted = ref(false);
const selectedBook = ref(null);

const castVote = (book) => {
  if (!book) {
    alert("請選擇一本你喜歡的本月書籍");
    return;
  }

  const targetIndex = books.value.findIndex(
    (item) => item.title === selectedBook.value
  );

  if (targetIndex > -1) {
    hasVoted.value = true;
    books.value[targetIndex].votes++;
    totalVotes.value++;
  }
};

const books = ref([
  {
    title: "明朝",
    author: "駱以軍",
    value: dynastyValue,
    votes: 0,
  },
  {
    title: "無父之城",
    author: "陳雪",
    value: noDadValue,
    votes: 0,
  },
  {
    title: "鬼地方",
    author: "陳思宏",
    value: ghostValue,
    votes: 0,
  },
  {
    title: "殺手的戀愛相談",
    author: "謝東霖",
    value: killerValue,
    votes: 0,
  },
  {
    title: "你不能再死一次",
    author: "陳雪",
    value: deadValue,
    votes: 0,
  },
  {
    title: "親愛的共犯",
    author: "陳雪",
    value: dearValue,
    votes: 0,
  },
]);
</script>
