<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200">
    <div>
      <MenuBar />
      <div
        class="w-md h-170 text-center m-auto relative bg-white rounded-sm shadow-2xl px-5 mt-5 overflow-y-auto scrollbar-hide"
      >
        <div
          v-if="dialog.open"
          class="mask rounded-sm"
          @click="closeDialog()"
        />

        <h1 class="text-3xl font-bold py-5 mt-5">待讀書籍</h1>

        <hr />
        <p class="mt-2 text-right mr-3 text-gray-400">
          共有 {{ undoneItem.length }} 本待讀書籍
        </p>
        <ul>
          <li
            v-for="(item, idx) in todoList"
            :key="idx"
            class="flex justify-between mt-5 items-center"
          >
            <div class="flex items-center justify-center ml-2">
              <input
                :id="'check' + idx"
                v-model="item.done"
                type="checkbox"
                class="size-5 cursor-pointer"
                @click="todoStore.doneItem(item.id)"
              />
              <label :for="'check' + idx">
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
                  @click="openDialog('編輯', item)"
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
          <h1 class="font-bold text-2xl text-left">{{ action }}待讀書籍</h1>
          <form @submit.prevent="addItem" @keydown.enter="addItem">
            <input
              v-model="input"
              type="text"
              class="border-2 border-gray-300 my-2 w-65 p-2 rounded-sm text-left"
              :placeholder="action === '編輯' ? editItem.text : '請輸入書名'"
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
                :value="action === '編輯' ? '編輯' : '新增'"
                class="rounded-md px-3 py-1 cursor-pointer hover:bg-blue-200 hover:text-white text-blue-200 font-bold"
              />
            </div>
          </form>
        </div>
      </div>
      <button
        class="absolute text-2xl rounded-full bg-blue-300 cursor-pointer text-white font-bold left-1/2 bottom-18 -translate-x-1/2 p-3 px-5 shadow-2xl z-200"
        :class="dialog.open ? 'bg-green-400' : 'bg-blue-300'"
        @click="openDialog('新增')"
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
const action = ref(null);
const input = ref("");
const editItem = ref(null);

const dialog = ref({ open: false });
const openDialog = (move, item = null) => {
  dialog.value.open = true;
  action.value = move;
  if (move === "編輯" && item) {
    input.value = item.text;
    editItem.value = item;
  } else {
    editItem.value = null;
    input.value = "";
  }
};

const closeDialog = () => {
  dialog.value.open = false;
  action.value = null;
  editItem.value = null;
  input.value = "";
};

const addItem = () => {
  if (action.value === "編輯") {
    const editData = { id: editItem.value.id, text: input.value };
    todoStore.saveEdit(editData);
  } else if (action.value === "新增") {
    todoStore.addItem(input.value);
  }
  closeDialog();
};

useHead({
  title: "待讀",
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
