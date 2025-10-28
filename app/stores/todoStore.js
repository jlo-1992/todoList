import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoStore = defineStore(
  "todo",
  () => {
    const todoList = ref([]);
    let id = 1;

    const addItem = (item) => {
      todoList.value.push({
        id: id++,
        done: false,
        text: item,
      });
    };

    const deleteItem = (itemId) => {
      const targetIndex = todoList.value.findIndex(
        (item) => item.id === itemId
      );
      if (targetIndex > -1) {
        todoList.value.splice(targetIndex, 1);
      }
    };

    const doneItem = (itemId) => {
      const targetItem = todoList.value.find((item) => item.id === itemId);
      if (targetItem) {
        targetItem.done = !targetItem.done;
      }
    };

    const saveEdit = (editData) => {
      const targetIndex = todoList.value.findIndex(
        (item) => item.id === editData.id
      );
      if (targetIndex > -1) {
        todoList.value[targetIndex].text = editData.text;
      }
    };

    return {
      todoList,
      id,
      addItem,
      deleteItem,
      doneItem,
      saveEdit,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      key: "todoList",
      pick: ["todoList"],
    },
  }
);
