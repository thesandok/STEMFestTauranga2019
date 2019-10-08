
class Game {
  constructor() {
    this.connectSocket();
  }

  connectSocket() {
    let socket = io();
    socket.on("noisture", (data) => {
      if (data.value !== "") {
        console.log(data);
      }
    });
  }
}

let game = new Game();
