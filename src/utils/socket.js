import { io } from "socket.io-client";
import API_CONFIG from "./apiConstants";

const socket = io(API_CONFIG.API_ENDPOINT);
export default socket;
