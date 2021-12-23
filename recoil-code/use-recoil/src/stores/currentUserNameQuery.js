import {selector} from 'recoil';
const currentUserNameQuery = selector({
    key: 'CurrentUserName',
    get: async ({get}) => {
      const response = await new Promise((resolve) => {
          setTimeout(() =>{
              resolve({name: '石晓波'})
          },5000)
      })
      return response.name;
    },
  });

  export {currentUserNameQuery};