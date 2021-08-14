import {userAPI} from "../api/usersApi";
import {actions, follow, unfollow} from "./usersReducer";
import {APIResponseType, ResultCodeEnum} from "../api/api";

jest.mock('../api/usersApi')
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>;

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

const dispatchMock = jest.fn()
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.followUser.mockClear();
    userAPIMock.unfollowUser.mockClear();
})

test('Thunk follow User', async () => {
    const thunk = follow(5)

    userAPIMock.followUser.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowing(true, 5))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(5))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowing(false, 5))
})

test('Thunk unfollow User', async () => {
    const thunk = unfollow(5)

    userAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowing(true, 5))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(5))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowing(false, 5))
})