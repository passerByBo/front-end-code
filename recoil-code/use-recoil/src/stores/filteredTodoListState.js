import { selector } from 'recoil';
import { todoListFilterState } from './todoListFilterState';
import { todoListState } from './todoListState';
const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({ get }) => {
        let filter = get(todoListFilterState);
        let list = get(todoListState);
        switch (filter) {
            case 'Show Completed':
                return list.filter((item) => item.isComplete);
            case 'Show Uncompleted':
                return list.filter((item) => !item.isComplete);
            default:
                return list;
        }
    }
})

export {
    filteredTodoListState
}