import type { ObjectDirective, DirectiveBinding } from "vue";

type RateType = 'debounce' | 'throttle';
type Handler = (e: Event) => void;
type BindingValue = [Handler, number]
const handlerMap = new WeakMap<HTMLElement, Handler>();
const defaultEvent = 'click';
const defaultDelay = 300;
const defaultHandler = (e: Event) => { console.log('default handler rate limit') }

function createRateLimit(type: RateType): ObjectDirective<HTMLElement, BindingValue> {
  return {
    mounted(el: HTMLElement, binding: DirectiveBinding<BindingValue, string>): void {
      const event = binding.arg ?? defaultEvent;
      const [handler = defaultHandler, delay = defaultDelay] = binding.value ?? [];
      let wrapped: Handler;

      if (type === 'debounce') {
        let timer: ReturnType<typeof setTimeout>;

        wrapped = (e: Event): void => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => handler(e), delay);
        }
      } else {
        // throttle
        let last = 0;
        wrapped = (e: Event) => {
          const now = Date.now();

          if (now - last >= delay) {
            handler(e);
            last = now;
          }
        }
      }

      handlerMap.set(el, wrapped);
      el.addEventListener(event, wrapped);
    },

    beforeUnmount(el: HTMLElement, binding: DirectiveBinding<BindingValue, string>): void {
      const event = binding.arg ?? defaultEvent;
      const wrapped = handlerMap.get(el);

      if (wrapped != null) {
        el.removeEventListener(event, wrapped);
        handlerMap.delete(el);
      }
    }
  }
}


export const debounce = createRateLimit('debounce');
export const throttle = createRateLimit('throttle');
