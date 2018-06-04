/**
 * Hello user! This is the configuration file of 'Observer'. 
 * HINT: To setup your database, take a look at "ormconfig.json" that is in the same
 *       directory where I'm in.
 */
export const config: any = {
    /** 
     * Contains options for developer only. 
     * If you aren't an developer, leave your fingers away from this!
    */
    development: {
        /* If enabled, developer messages get printed. Can very spam but very helpful while development. */
        debug: true,

        /* WARNING: IF YOU ENABLE ONE OF THESE OPTIONS, YOUR COMPLETE DATABASE WILL BE DELETED AND RESTED WITH DUMMY DATA!! */
        dummys: {
            /* If enabled, test users and or dummy data get generated. */
            users: true,
            data: true
        }
    },

    // All of your clients must be access to this port. (default: 1337)
    port: 1337,

    /** Observer salt the passwords from all users, that, in case the DB get hacked, the hacker
     *  can't use rainbowtables to crack them.
     * 
     *  This value represents the amount of rounds, how long the password will be salted.
     *  Is the value high it will be take much longer then a less value. To learn more about
     *  this, take a look at this page: https://www.npmjs.com/package/bcrypt#a-note-on-rounds
     */
    saltRounds: 11,

    /** Don't tell anyone (only people you can trust) this key, because the server sign every
     *  login with this key, so nobody else, except the server, can create a valid token.
     * 
     * HINT: If you change this key, all other keys that exists will be unvailed and all users
     *       have to login again.
    */
    jwtKey: "better_nobody_know_this_key"
}