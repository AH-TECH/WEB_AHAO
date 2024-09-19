export default class Socket {

    // init properties
    constructor(){
        this.socket = null
        this.message = undefined
    }

    connectWebSocket = (url) => {
        const newSocket = new WebSocket(url);
        newSocket.onopen = () => {
            console.log(`WebSocket connection opened for ${url}`);
        };
        this.socket = newSocket
    }

    disconnectWebSocket = () => {
        this.socket.close();
    }

    sendMessage = (message) => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } 
    }

    getMessage = () => {
        this.socket.onmessage = (event) => {
            this.message = event.data
            console.log(this.message)
        }
    }
}