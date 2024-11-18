import {Client} from "@stomp/stompjs";
import {toast} from "react-toastify";

const SOCKET_URL = `ws://${process.env.REACT_APP_BASE_URL}/ws`;
const TOPIC = '/topic/notification'

export const subscribeToNotification = () => {
    const client = new Client({
        brokerURL: SOCKET_URL,
        debug: (str) => {
            console.log(str);
        },
        onConnect: () => {
            client.subscribe(TOPIC, message => {
                    console.log(`WS message: ${message.body}`);
                    toast.success(message.body, {autoClose: 3000})
                }
            );
            toast.info("Connecté au service de notifications", {autoClose: 3000})
        },
    });

    client.activate();
};