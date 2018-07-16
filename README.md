# Observer-Backend
Welcome to the core of Observer. Here get's all data processed and managed.

The **Client** sends data to the backend and the **frontend** display's it.


## Dependencies
You have to install the following software to install and run this backend:
* NodeJS: [Linux or macOS](https://nodejs.org/en/download/package-manager/) via package manager or for [Windows](https://nodejs.org/dist/v8.11.3/node-v8.11.3-x86.msi).
* [Git](https://git-scm.com) (optional, you can download the zip instead)
* (Nano: `sudo apt install nano`, recommended to edit config files)
## Install
1. First clone this repository with git or [download zip](https://github.com/Mondei1/Observer-Backend/archive/master.zip) from Github: 
```sh
git clone https://github.com/Mondei1/Observer-Backend.git
```
2. Now go into the directory:
```sh
cd Observer-Backend/
```
3. Install all dependencies (this can take a while, depends on your network):
```sh
npm install
```
4. Edit your config:
```sh
nano config.ts
```
5. Change your JWT Key ([What?](https://jwt.io/introduction/)) at the buttom of your config. Change it to something save. You don't have to remember this key, just take a hard one. You can use [this](http://passwordsgenerator.net) website to create a really loooong password.
```
{
    ...
    jwtKey: "better_nobody_know_this_key"
}
```
6. Exit nano with `STRG + X` then `y` and to exit press `ENTER`.
7. Edit your database connection in `ormconfig.json`.
```sh
nano ormconfig.json
```
8. Edit the following entry's to your database. Only these:
```json
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "YOUR_USER",
    "password": "USER_PASSWORD",
    "database": "observer"
    ...
}
```
9. Now exit nano like in step `6.`
10. Finally you can start the backend with:
```
npm start
```
11. Optionaly but recommended, you can use [screen](https://packages.ubuntu.com/bionic/screen) or [tmux](https://packages.ubuntu.com/bionic/tmux) to run it in the background.

## 