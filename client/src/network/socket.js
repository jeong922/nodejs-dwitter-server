import socekt from 'socket.io-client';

export default class Socket {
  constructor(baseURL, getAccessToken) {
    // const io = socekt(this.baseURL, {
    //   query: { token: this.getAccessToken() },
    // }); // 이렇게 사용❌

    this.io = socekt(baseURL, {
      auth: (cb) => cb({ token: getAccessToken() }),
    });

    this.io.on('connect_error', (err) => {
      console.log('socket error', err.message);
    });
  }

  onSync(event, callback) {
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, (message) => callback(message));
    return () => this.io.off(event);
  }
}
