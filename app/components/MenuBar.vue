<template>
  <div class="grid grid-cols-3 -m-1.5">
    <button
      class="bg-blue-300 rounded-md px-3 py-1 m-2 cursor-pointer hover:bg-blue-200 text-white font-bold"
    >
      <NuxtLink to="/">待讀書籍</NuxtLink>
    </button>
    <button
      class="bg-blue-300 rounded-md px-3 py-1 m-2 cursor-pointer hover:bg-blue-200 text-white font-bold"
    >
      <NuxtLink to="/products">最新作品</NuxtLink>
    </button>
    <button
      class="bg-blue-300 rounded-md px-3 py-1 m-2 cursor-pointer hover:bg-blue-200 text-white font-bold"
    >
      <NuxtLink to="/poll">每月一書</NuxtLink>
    </button>
  </div>
</template>
