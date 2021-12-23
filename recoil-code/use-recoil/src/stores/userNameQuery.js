
import { selectorFamily } from 'recoil';
import {todoListState} from './todoListState';
const userNameQuery = selectorFamily({
    key: 'userNameQuery',
    get: userID => async ({ get }) => {
        const todoList = get(todoListState)
        let response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    name: userID + '石晓波' + todoList.length
                })
            }, 4000)
            
        })

        return response.name;
    }
})

export {
    userNameQuery
}