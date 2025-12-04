import { onMounted, onUnmounted } from 'vue';

export type GlobalEventMap = {
  'notification': { text: string, buttonText?: string, routeName?: string }
}

type EventKey = keyof GlobalEventMap;

export const useGlobalEventBus = <K extends EventKey>(name: K, cb: (payload: GlobalEventMap[K]) => void): void => {
  const handler = (e: Event) => {
    if (e instanceof CustomEvent) {
      cb(e.detail);
    }
  }

  onMounted(() => window.addEventListener(name, handler));
  onUnmounted(() => window.removeEventListener(name, handler));
}

export const dispatchEvent = <K extends EventKey>(name: EventKey, payload: GlobalEventMap[K]): void => {
  window.dispatchEvent(new CustomEvent(name, { detail: payload }));
}
