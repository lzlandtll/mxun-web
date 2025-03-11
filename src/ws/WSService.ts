import { reactive } from 'vue';

import {userStoreHandler} from '@/store/modules/user'

const userStore = userStoreHandler()
// 定义回调函数类型
interface CallbackMap {
    [key: string]: (data: any) => void;
}

// 使用明确的WebSocket实例类型，并为其他属性添加类型注解
const websocketState = reactive<{
    socket: WebSocket | null, // WebSocket实例可以是null
    connected: boolean,
    message: string,  // 存储当前最新的消息
    callback: CallbackMap  // 回调函数映射
}>({
    socket: null,
    connected: false,
    message: '',
    callback: {}
});

let checkHeartInterval: number | null = null; // 使用number代替NodeJS.Timeout

const WSService = {
    connect() {
        if (!websocketState.connected || !websocketState.socket) {
            const socket = new WebSocket(`ws://localhost:18080/saas/ws?token=${userStore.getToken}`);

            socket.onopen = () => {
                websocketState.connected = true;
                console.log('WebSocket connected');
            };

            socket.onmessage = (event) => {
                this.updateMessage(event.data);
            };

            socket.onclose = () => {
                websocketState.connected = false;
                console.log('WebSocket disconnected');
                // 清除心跳检测定时器
                if (checkHeartInterval !== null) {
                    clearInterval(checkHeartInterval);
                    checkHeartInterval = null;
                }
            };

            websocketState.socket = socket;
            // 心跳检测
            checkHeartInterval = setInterval(() => this.connect(), 1000) as unknown as number;
        }
    },

    close() {
        if (checkHeartInterval !== null) {
            clearInterval(checkHeartInterval);
            checkHeartInterval = null;
        }
        if (websocketState.socket) {
            websocketState.socket.close(); // 关闭连接
            websocketState.socket = null;  // 清除实例
            console.log("close websocket");
        }
    },

    updateMessage(message: string) {
        websocketState.message = message;
        let data = JSON.parse(message);
        // 调用订阅的方法，通知其他组件
        if (websocketState.callback && websocketState.callback[data.type]) {
            websocketState.callback[data.type](data);
        }
    },

    sendMessage(message: string) {
        if (websocketState.connected && websocketState.socket) {
            websocketState.socket.send(message);
            console.log('Message sent to server:', message);
        } else {
            console.log('WebSocket is not connected');
        }
    },

    subscribe(type: string, callback: (data: any) => void) {
        websocketState.callback[type] = callback;
    },

    inject() {
        return websocketState;
    },
};

export default WSService;
