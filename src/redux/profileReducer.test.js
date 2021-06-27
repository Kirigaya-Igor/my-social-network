import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer";

// 1. start test data
const state = {
    postsData: [
        {id: 1, message: 'first post', likesCount: 10},
        {id: 2, message: 'second post', likesCount: 3},
        {id: 3, message: 'React it`s fine', likesCount: 100}]
}

test('length of postsData should be incremented', () => {
    const action = addPostActionCreator('it-camasutra');

    // 2. action
    const newState = profileReducer(state, action)

    // 2. expectation
    expect(newState.postsData.length).toBe(4);
});

test('message of new post should be "Test text: it-camasutra"', () => {
    const action = addPostActionCreator('it-camasutra');

    // 2. action
    const newState = profileReducer(state, action)

    // 2. expectation
    expect(newState.postsData[3].message).toBe('it-camasutra');
});

test('after deleting length of postsData should be decrement', () => {
    const action = deletePost(1);

    // 2. action
    const newState = profileReducer(state, action)

    // 2. expectation
    expect(newState.postsData.length).toBe(2);
});