import ReconnectingWebSocket from "reconnecting-websocket";

let socket: ReconnectingWebSocket | null = null;
export const getSocket = () => {
  if (!socket) {
    socket = new ReconnectingWebSocket("wss://do9p8j4xz7.execute-api.us-east-1.amazonaws.com/Prod");
  }

  return socket;
};

export const sendMessage = (body: any, username: string, action: string = "sendmessage") => {
  getSocket()
  let message = {
    action: action,
    data: body,
    username: username,
    createdAt: new Date().getMilliseconds()
  }
  socket?.send(JSON.stringify(message))
  return message
}
