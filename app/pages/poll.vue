<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200">
    <div>
      <MenuBar />
      <div
        class="w-md h-170 text-center m-auto relative bg-blue-300 rounded-sm shadow-2xl px-5 mt-5 overflow-y-auto scrollbar-hide"
      >
        <h1 class="text-3xl font-bold py-5 mt-5 text-white">每月一書</h1>
        <hr class="text-white" />
        <div class="bg-white rounded-xl shadow-2xl p-9 mt-6">
          <ul>
            <li
              v-for="(item, index) in booksWithPercent"
              :key="index"
              class="my-1 py-2"
            >
              <div>
                <div class="mb-2 flex justify-between">
                  <label
                    class="text-xl font-bold"
                    :for="item.title"
                    @click="() => showImg(index)"
                    >《{{ item.title }}》</label
                  >
                  <VueEasyLightbox
                    :visible="visibleRef"
                    :imgs="item.image"
                    :index="indexRef"
                    @hide="onHide"
                  />
                  <div class="flex justify-between items-center">
                    <input
                      v-if="hasVoted === false"
                      :id="item.title"
                      v-model="selectedBook"
                      name="poll"
                      type="radio"
                      :value="item.title"
                      class="cursor-pointer"
                    />
                    <template v-else>
                      <h1>{{ item.percent }}%</h1>
                      <h2 class="text-gray-400 ml-1">( {{ item.votes }} 票)</h2>
                    </template>
                  </div>
                </div>
                <UProgress v-if="hasVoted === true" v-model="item.percent" />
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
import { ref } from "vue";
import { usePollStore } from "~/stores/pollStore";
import { storeToRefs } from "pinia";
import { useHead } from "nuxt/app";

const pollStore = usePollStore();
const { totalVotes, booksWithPercent } = storeToRefs(pollStore);

const hasVoted = ref(false);
const selectedBook = ref(null);

const castVote = (bookTitle) => {
  if (!bookTitle) {
    alert("請選擇一本你喜歡的本月書籍");
    return;
  }
  hasVoted.value = true;
  pollStore.castVote(bookTitle);
  selectedBook.value = null;
};

const visibleRef = ref(false);
const indexRef = ref(0);

const showImg = (index) => {
  indexRef.value = index;
  visibleRef.value = true;
};
const onHide = () => (visibleRef.value = false);

useHead({
  title: "每月一書",
});
</script>
