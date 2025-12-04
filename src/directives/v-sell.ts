import type { DirectiveBinding } from 'vue'

const sellMap = new WeakMap<HTMLElement, HTMLElement>();

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<number>) {
    const { value } = binding;

    if (value <= 0) return;
    el.style.position = 'relative';
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    content.classList.add('body-small');
    content.textContent = `- ${value} %`;

    Object.assign(wrapper.style, {
      position: 'absolute',
      backgroundColor: 'var(--color-primary-accent)',
      borderRadius: '4px',
      left: '16px',
      top: '16px',
    });

    Object.assign(content.style, {
      color: 'var(--color-primary-white)',
      padding: '2px 4px 2px 8px',
      pointerEvents: 'none'
    });

    wrapper.append(content);
    el.append(wrapper);
    sellMap.set(el, wrapper);
  },

  beforeUnmount(el: HTMLElement) {
    const wrapper = sellMap.get(el)!;

    if (wrapper && wrapper.parentElement === el) {
      el.removeChild(wrapper);
      sellMap.delete(el);
    }
  }
}
