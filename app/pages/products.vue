<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200">
    <div class="relative">
      <div class="w-103 m-auto">
        <MenuBar />
      </div>
      <ClientOnly>
        <swiper-container
          ref="containerRef"
          class="max-w-320"
          loop="true"
          slides-per-view="3"
          space-between="30"
          :breakpoints="{
            '0': { slidesPerView: 1, spaceBetween: 0 },
            '640': { slidesPerView: 2, spaceBetween: 10 },
            '1024': { slidesPerView: 3, spaceBetween: 30 },
          }"
        >
          <swiper-slide
            v-for="(item, idx) in products"
            :key="idx"
            class="rounded-sm shadow-lg bg-gray-100 mt-5 mb-10"
          >
            <div v-if="dialog.open" class="mask" @click="closeDialog()" />
            <div>
              <div class="bg-white py-9">
                <img
                  class="w-full h-60 object-contain"
                  :src="item.img"
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
        @click="swiper.prev()"
      />
      <Icon
        class="absolute size-15 top-1/2 -right-20 -translate-y-1/2 cursor-pointer hover:bg-blue-500"
        name="tabler:arrow-badge-right"
        @click="swiper.next()"
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

import { useHead } from "nuxt/app";

import ghostImg from "~/assets/images/ghost.jpg";
import dynastyImg from "~/assets/images/dynasty.jpg";
import noDadImg from "~/assets/images/noDad.jpg";
import deadImg from "~/assets/images/dead.jpg";
import dearImg from "~/assets/images/dear.jpeg";
import killerImg from "~/assets/images/killer.jpg";

const containerRef = ref(null);
// const slides = ref(Array.from({ length: 3 }));
const swiper = useSwiper(containerRef);
const chosenBook = ref(null);

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
  title: "作品",
});

const products = [
  {
    img: dynastyImg,
    title: "明朝",
    author: "駱以軍",
    content:
      "「這是我的夢外之悲，或可稱之為：科幻版的《牡丹亭》。」機器人經歷上萬年、甚至數十萬年在無垠宇宙中的漂流，最後登陸某顆遙遠孤絕的行星。再以預存的大數據資料提煉這顆星球之金屬，開始複製與自己相同的機器人，重新啟動、覆蓋、繁殖那個曾經栩栩如生存在過 ，黑暗、變態、幻美，層層纏縛又渴望自由的文明——名為「明朝」之星球。",
    hashTag1: "#長篇小說",
    hashTag2: "#連載中",
    hashTag3: "#科幻科技",
  },
  {
    img: noDadImg,
    title: "無父之城",
    author: "陳雪",
    content:
      "這是一座父親缺席的城，一個人的消失與離開有各種可能與結果。有些祕密，你甚至對自己也不會說出口。父親的缺席及無父之子的失落在小鎮若無似有隱現。眾人究竟該如何穿過記憶的海，抵達答案所在的彼端？",
    hashTag1: "#長篇小說",
    hashTag2: "#連載中",
    hashTag3: "#推理犯罪",
  },
  {
    img: ghostImg,
    title: "鬼地方",
    author: "陳思宏",
    content:
      "永靖對我來說，是個鬼地方，我一輩子都想逃離。陳家空廢，連篇鬼話。我們終究都活不出永靖這個小地方。視角切換，光怪陸離的崩壞眾生相逐遭披露，層層窺見家族的傷痕與醜陋、小鎮的祕密、時代的恐怖與無情。回到鬼地方的人怎麼面對難堪的過往？一個小地方又怎麼會變成了鬼地方？",
    hashTag1: "#長篇小說",
    hashTag2: "#連載中",
    hashTag3: "#文學/寫實",
  },
  {
    img: killerImg,
    title: "殺手的戀愛相談",
    author: "謝東霖",
    content:
      "好想談場普通的戀愛 像ATM領把槍一樣普通的戀愛——一點都不普通啊！ 上下冊一次推出，收錄獨家番外大結局！",
    hashTag1: "#條漫/頁漫",
    hashTag2: "#完結",
    hashTag3: "#愛情",
  },
  {
    img: deadImg,
    title: "你不能再死一次",
    author: "陳雪",
    content:
      "最恐怖的遺棄，是在精心布置之後，把你獨自留在原地。桃花盛開的時節瀰漫著血色，相隔十四年的殺人棄屍案重現小鎮，被丟在樹下的少女們長出滿樹的衣裙鞋襪，這是她們最後一次的展覽……那次的我，沒有好好活下來，只能在被世界遺棄以前，自己長出自己。",
    hashTag1: "#長篇小說",
    hashTag2: "#連載中",
    hashTag3: "#推理犯罪",
  },
  {
    img: dearImg,
    title: "親愛的共犯",
    author: "陳雪",
    content:
      "當摯愛雙手染血，你是否願意奮不顧身成為共犯？我覺得悲傷也覺得幸福，世上還有人願意陪我走進地獄裡，地獄成了我們可以重逢的地方……豪宅裡、山腳下，時隔多年的兩個黑夜，怎麼改變了兩個「家」？",
    hashTag1: "#長篇小說",
    hashTag2: "#連載中",
    hashTag3: "#文學/寫實",
  },
];
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
