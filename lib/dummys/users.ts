export const dummy_users: Array<any> = [
    {
        username: "Mondei1",
        password: "123",
        permissions: ['*'],
        state: "+"
    },
    {
        username: "XYZ",
        password: "xyz",
        permissions: ["players.*", "server.show", "user.edit"],
        state: "+"
    },
    {
        username: "Evil_Morty",
        password: "evil",
        permissions: ["server.*", "user,*", "player.ban"],
        state: "-1"
    }
]