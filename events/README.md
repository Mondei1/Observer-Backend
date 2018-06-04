# Events
Here are all socket "endpoints". When ever a client or frontend emits a call, the router will execute a class in this folder.

## Example

**Plugin**
```java
this.socket.emit("new player", data);
```
The **backend** will execute this class: `events/new_player.ts` that handle this specific request. It's better then do everthing in the [router.ts](../lib/router).