import { computed, ref } from "vue";

export const useTodoList = () => {
    const todoListRef = ref([]);
    const ls = localStorage.todoList;
    todoListRef.value = ls ? JSON.parse(ls) : [];

    // TODOリストからIDを元にTODO情報を取得
    const findById = (id) => {
        return todoListRef.value.find((todo) => todo.id === id);
    };

    // TODOリストからIDを元にそのインデックスを取得
    const findIndexById = (id) => {
        // findIndex：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        return todoListRef.value.findIndex((todo) => todo.id === id);
    };

    // 追加処理
    const add = (task) => {
        const id = new Date().getTime();
        todoListRef.value.push({ id: id, task: task, checked: false });
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    const editId = ref(-1);

    // 編集ボタン押下後の表示処理
    const show = (id) => {
        const todo = findById(id);
        editId.value = id;
        return todo.task;
    };

    // 変更ボタン押下後の表示処理
    const edit = (task) => {
        const todo = findById(editId.value);
        const index = findIndexById(editId.value);
        todo.task = task;
        // splice：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        todoListRef.value.splice(index, 1, todo);
        localStorage.todoList = JSON.stringify(todoListRef.value);
        editId.value = -1;
    };

    // 削除ボタン押下後の表示処理
    const del = (id) => {
        const todo = findById(id);
        const deleteMessage = "「" + todo.task + "」を削除しますか？";
        if (!confirm(deleteMessage)) return;

        const index = findIndexById(id);
        todoListRef.value.splice(index, 1);
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    // チェックボックス押下後の表示処理
    const check = (id) => {
        const todo = findById(id);
        const index = findIndexById(id);
        todo.checked = !todo.checked;
        todoListRef.value.splice(index, 1, todo);
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    const countFin = computed(() => {
        const finArr = todoListRef.value.filter((todo) => todo.checked);
        return finArr.length;
    });

    return { todoListRef, add, show, edit, del, check, countFin };
};
