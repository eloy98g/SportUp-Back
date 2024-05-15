import { Socket as BaseSocket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface CustomSocket extends BaseSocket<DefaultEventsMap, DefaultEventsMap> {
  gid?: string;
  chatGid?: string | string[];
}

export default CustomSocket;