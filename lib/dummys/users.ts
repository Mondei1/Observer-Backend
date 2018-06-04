import { _types } from '../../models/users';

export const dummy_users: Array<any> = [
    {
        username: "Mondei1",
        password: "123",
        type: _types.USER,
        permissions: ['*'],
        state: "+"
    },
    {
        username: "XYZ",
        password: "xyz",
        permissions: ["players.*", "server.show", "user.edit"],
        type: _types.USER,
        state: "+"
    },
    {
        username: "Evil_Morty",
        password: "evil",
        permissions: ["server.*", "user,*", "player.ban"],
        type: _types.USER,
        state: "-1"
    },
    {
        username: "API",
        password: "abc",
        type: _types.CLIENT,
        state: "+"
    }
]