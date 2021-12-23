const currentUserIDState = atom({
    key: 'CurrentUserID',
    default: null,
  });
  
  const userInfoQuery = selectorFamily({
    key: 'UserInfoQuery',
    get: userID => async () => {
      const response = await myDBQuery({userID});
      if (response.error) {
        throw response.error;
      }
      return response;
    },
  });
  
  const currentUserInfoQuery = selector({
    key: 'CurrentUserInfoQuery',
    get: ({get}) => get(userInfoQuery(get(currentUserIDStates))),
  });
  
  const friendsInfoQuery = selector({
    key: 'FriendsInfoQuery',
    get: ({get}) => {
      const {friendList} = get(currentUserInfoQuery);
      return friendList.map(friendID => get(userInfoQuery(friendID)));
    },
  });
  
  function CurrentUserInfo() {
    const currentUser = useRecoilValue(currentUserInfoQuery);
    const friends = useRecoilValue(friendsInfoQuery);
    const setCurrentUserID = useSetRecoilState(currentUserIDState);
    return (
      <div>
        <h1>{currentUser.name}</h1>
        <ul>
          {friends.map(friend =>
            <li key={friend.id} onClick={() => setCurrentUserID(friend.id)}>
              {friend.name}
            </li>
          )}
        </ul>
      </div>
    );
  }