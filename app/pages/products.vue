<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200">
    <div class="relative">
      <div class="grid grid-cols-3 -m-1.5">
        <button
          class="bg-blue-300 rounded-md px-3 py-1 m-2 cursor-pointer hover:bg-blue-200 text-white font-bold"
        >
          <NuxtLink to="/">代辦清單</NuxtLink>
        </button>
        <button
          class="bg-blue-300 rounded-md px-3 py-1 m-2 cursor-pointer hover:bg-blue-200 text-white font-bold"
        >
          <NuxtLink to="/products">產品頁面</NuxtLink>
        </button>
        <button
          class="bg-blue-300 rounded-md px-3 py-1 m-2 cursor-pointer hover:bg-blue-200 text-white font-bold"
        >
          <NuxtLink to="/products">投票頁面</NuxtLink>
        </button>
      </div>
      <ClientOnly>
        <swiper-container ref="containerRef" class="max-w-md">
          <swiper-slide
            v-for="(item, idx) in productsData"
            :key="idx"
            class="rounded-sm shadow-lg bg-gray-100 mt-5 mb-10"
          >
            <div v-if="dialog.open" class="mask" @click="closeDialog()" />
            <div>
              <div class="bg-white py-9">
                <img
                  class="w-full h-60 object-contain"
                  :src="base + item.img.replace(/^\/+/, '')"
                  :alt="item.title"
                />
              </div>
              <div class="px-6 py-4">
                <div class="font-bold text-2xl mb-2">{{ item.title }}</div>
                <div class="font-bold text-xl mb-2 text-gray-400">
                  {{ item.author }}
                </div>
                <p class="text-gray-700 text-base h-40">
                  {{ item.content }}
                </p>
              </div>
              <div class="px-6 pt-4 pb-5">
                <span
                  class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-8"
                  >{{ item.hashTag1 }}</span
                >
                <span
                  class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-8"
                  >{{ item.hashTag2 }}</span
                >
                <span
                  class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-8"
                  >{{ item.hashTag3 }}</span
                >
              </div>
              <button
                class="absolute text-2xl rounded-full bg-blue-300 cursor-pointer text-white font-bold -bottom-6 left-1/2 -translate-x-1/2 p-2 px-5 shadow-2xl z-200"
                :class="dialog.open ? 'bg-green-400' : 'bg-blue-300'"
                @click="openDialog(item)"
              >
                ＋加入書櫃
              </button>
            </div>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
      <Icon
        name="tabler:arrow-badge-left"
        class="absolute size-15 top-1/2 -left-20 -translate-y-1/2 cursor-pointer hover:bg-blue-500"
        @click="swiper.next()"
      />
      <Icon
        class="absolute size-15 top-1/2 -right-20 -translate-y-1/2 cursor-pointer hover:bg-blue-500"
        name="tabler:arrow-badge-right"
        @click="swiper.prev()"
      />
    </div>
    <div
      v-if="dialog.open"
      class="absolute p-6 w-80 rounded-md shadow-2xl z-1 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <h1 class="font-bold text-2xl text-center">
        《{{ chosenBook }}》 已加入書櫃
      </h1>
      <div class="text-center mt-5">
        <button
          class="rounded-md px-3 py-1 cursor-pointer hover:bg-gray-200 hover:text-white text-gray-300 font-bold"
          @click="closeDialog()"
        >
          確定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useHead, useBase } from "nuxt/app";

import ghostImg from "~/assets/images/ghost.jpg";
import dynastyImg from "~/assets/images/dynasty.jpg";
import noDadImg from "~/assets/images/noDad.jpg";

const { data: productsData } = await useFetch("/api/products");

const containerRef = ref(null);
const slides = ref(Array.from({ length: 3 }));
const swiper = useSwiper(containerRef, { loop: true });
const chosenBook = ref(null);
const base = useBase();

onMounted(() => {
  console.log(swiper.instance);
});

const dialog = ref({ open: false });
const openDialog = (item) => {
  dialog.value.open = true;
  chosenBook.value = item.title;
};
const closeDialog = () => {
  dialog.value.open = false;
};

useHead({
  title: "產品",
});

// const products = [
//   {
//     img: dynastyImg,
//     title: "明朝",
//     author: "駱以軍",
//     content:
//       "「這是我的夢外之悲，或可稱之為：科幻版的《牡丹亭》。」機器人經歷上萬年、甚至數十萬年在無垠宇宙中的漂流，最後登陸某顆遙遠孤絕的行星。再以預存的大數據資料提煉這顆星球之金屬，開始複製與自己相同的機器人，重新啟動、覆蓋、繁殖那個曾經栩栩如生存在過 ，黑暗、變態、幻美，層層纏縛又渴望自由的文明——名為「明朝」之星球。",
//     hashTag1: "#長篇小說",
//     hashTag2: "#連載中",
//     hashTag3: "#科幻科技",
//   },
//   {
//     img: noDadImg,
//     title: "無父之城",
//     author: "陳雪",
//     content:
//       "這是一座父親缺席的城，一個人的消失與離開有各種可能與結果。有些祕密，你甚至對自己也不會說出口。父親的缺席及無父之子的失落在小鎮若無似有隱現。眾人究竟該如何穿過記憶的海，抵達答案所在的彼端？",
//     hashTag1: "#長篇小說",
//     hashTag2: "#連載中",
//     hashTag3: "#推理犯罪",
//   },
//   {
//     img: ghostImg,
//     title: "鬼地方",
//     author: "陳思宏",
//     content:
//       "永靖對我來說，是個鬼地方，我一輩子都想逃離。陳家空廢，連篇鬼話。我們終究都活不出永靖這個小地方。視角切換，光怪陸離的崩壞眾生相逐遭披露，層層窺見家族的傷痕與醜陋、小鎮的祕密、時代的恐怖與無情。回到鬼地方的人怎麼面對難堪的過往？一個小地方又怎麼會變成了鬼地方？",
//     hashTag1: "#長篇小說",
//     hashTag2: "#連載中",
//     hashTag3: "#文學/寫實",
//   },
// ];
</script>

<style>
.mask {
  position: absolute;
  background-color: darkgray;
  opacity: 0.9;
  height: 100%;
  width: 100%;
  z-index: 200;
}
</style>
