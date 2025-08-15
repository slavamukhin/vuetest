import iconCross from '@/assets/iconCross.svg?raw';
import type { DirectiveBinding } from 'vue';

const kvCb = new WeakMap<HTMLElement, (e: MouseEvent) => void>();
const kvEl = new WeakMap<HTMLElement, HTMLElement>();

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<(e: MouseEvent) => void>): void {
    el.style.position = 'relative';

    const button = document.createElement('div');
    button.innerHTML = iconCross;

    Object.assign(button.style, {
      position: 'absolute',
      top: '5px',
      right: '5px',
      cursor: 'pointer'
    });

    const cb = binding.value

    button.addEventListener('click', cb);
    el.append(button);

    kvCb.set(el, cb);
    kvEl.set(el, button);
  },

  beforeUnmount(el: HTMLElement, binding: DirectiveBinding) {
    const button = kvEl.get(el)!;
    const cb = kvCb.get(el)!;

    if (button.parentElement === el) {
      button.removeEventListener('click', cb);
      kvCb.delete(el);
      kvEl.delete(el);
      el.appendChild(button);
    }
  }
}
