<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0" /> -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200">
    <div>
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
      <div
        class="w-md h-170 text-center m-auto relative bg-white rounded-sm shadow-2xl px-5 mt-5 overflow-y-auto scrollbar-hide"
      >
        <div
          v-if="dialog.open"
          class="mask rounded-sm"
          @click="closeDialog()"
        />

        <h1 class="text-3xl font-bold py-5 mt-5">代辦清單</h1>

        <hr />
        <p class="mt-2 text-right mr-3 text-gray-400">
          共有 {{ undoneItem.length }} 個代辦事項
        </p>
        <ul>
          <li
            v-for="item in todoList"
            :key="item.id"
            class="flex justify-between mt-5 items-center"
          >
            <div class="flex items-center justify-center ml-2">
              <input
                :id="check + item.id"
                v-model="item.done"
                type="checkbox"
                class="size-5 cursor-pointer"
                @click="todoStore.doneItem(item.id)"
              />

              <template v-if="item.edit">
                <input
                  v-model="item.input"
                  type="text"
                  class="ml-3 p-1"
                  @keydown.enter="todoStore.saveEdit(item)"
                  @keydown.esc="cancelEdit(item)"
                />
              </template>
              <label v-else :for="check + item.id">
                <del v-if="item.done" class="text-xl ml-3 text-gray-300">{{
                  item.text
                }}</del>
                <span v-else class="text-xl ml-3">{{ item.text }}</span>
              </label>
            </div>
            <div>
              <button
                class="hover:bg-gray-200 hover:text-white cursor-pointer rounded-full p-2 px-3"
              >
                <Icon
                  name="tabler:pencil"
                  class="size-6 mt-1"
                  @click="toggleEdit(item)"
                />
              </button>
              <button
                class="hover:bg-red-200 hover:text-white cursor-pointer rounded-full p-2 px-3 m-auto"
              >
                <Icon
                  name="tabler:trash"
                  class="size-6 mt-1"
                  @click="todoStore.deleteItem(item.id)"
                />
              </button>
            </div>
          </li>
        </ul>

        <div
          v-if="dialog.open"
          class="absolute p-7 h-45 w-80 rounded-md shadow-2xl z-200 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <h1 class="font-bold text-2xl text-left">新增代辦事項</h1>
          <form
            @submit.prevent="addItem(input)"
            @keydown.enter="addItem(input)"
          >
            <input
              v-model="input"
              type="text"
              class="border-2 border-gray-300 my-2 w-65 p-2 rounded-sm text-left"
              placeholder="請輸入代辦事項"
            />
            <div class="text-right">
              <button
                class="rounded-md px-3 py-1 cursor-pointer hover:bg-gray-200 hover:text-white text-gray-200 font-bold"
                @click="closeDialog()"
              >
                關閉
              </button>
              <input
                type="submit"
                value="新增"
                class="rounded-md px-3 py-1 cursor-pointer hover:bg-blue-200 hover:text-white text-blue-200 font-bold"
              />
            </div>
          </form>
        </div>
      </div>
      <button
        class="absolute text-2xl rounded-full bg-blue-300 cursor-pointer text-white font-bold bottom-23 left-1/2 -translate-x-1/2 p-3 px-5 shadow-2xl z-200"
        :class="dialog.open ? 'bg-green-400' : 'bg-blue-300'"
        @click="openDialog()"
      >
        ＋新增
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTodoStore } from "~/stores/todoStore";
import { storeToRefs } from "pinia";
import { useHead } from "nuxt/app";

const todoStore = useTodoStore();
const { todoList } = storeToRefs(todoStore);
const undoneItem = computed(() => todoList.value.filter((item) => !item.done));

const check = "check";

const dialog = ref({ open: false });
const openDialog = () => {
  dialog.value.open = true;
};
const closeDialog = () => {
  dialog.value.open = false;
};

const input = ref("");

const addItem = (item) => {
  todoStore.addItem(item);
  input.value = "";
  closeDialog();
};

// const deleteItem = (id) => {
//   todoStore.deleteItem(id);
// };

// const doneItem = (id) => {
//   todoStore.doneItem(id);
// };

const toggleEdit = (item) => {
  item.edit = !item.edit;
};

// const saveEdit = (item) => {
//   todoStore.saveEdit(item);
// };

const cancelEdit = (item) => {
  item.input = item.text;
  item.edit = false;
};

useHead({
  title: "首頁",
});
</script>

<style>
.mask {
  position: absolute;
  background-color: darkgray;
  opacity: 0.9;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
