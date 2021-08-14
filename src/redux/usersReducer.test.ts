import usersReducer, {actions, InitialStateType} from "./usersReducer";

let state: InitialStateType;
beforeEach(() => {
    state = {
        usersData: [
            {
                id: 0, name: 'igor 0', followed: false,
                photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 1, name: 'igor 1', followed: true,
                photos: {small: null, large: null}, status: 'status 1'
            },
            {
                id: 2, name: 'igor 2', followed: false,
                photos: {small: null, large: null}, status: 'status 2'
            }
        ],
        pageSize: 5,
        allUsers: 0,
        currentPage: 1,
        isFetching: false,
        isFollowing: [],
        filter: {
            term: '',
            friend: null
        }
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(2))

    expect(newState.usersData[0].followed).toBeFalsy()
    expect(newState.usersData[2].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(1))

    expect(newState.usersData[1].followed).toBeFalsy()
})