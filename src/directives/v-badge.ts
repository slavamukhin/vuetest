import type { DirectiveBinding } from "vue"

const elementMap = new WeakMap<HTMLElement, HTMLElement>()

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<number>): void {
    el.style.position = 'relative';

    if (!binding.value || binding.value <= 0) return;

    const badge = createBadge(binding.value);
    el.append(badge);
    elementMap.set(el, badge);
  },

  updated(el: HTMLElement, binding: DirectiveBinding<number>): void {
    const oldBadge = elementMap.get(el);

    // Удаляем бейдж, если значение стало 0 или меньше
    if (!binding.value || binding.value <= 0) {
      if (oldBadge) {
        el.removeChild(oldBadge);
        elementMap.delete(el);
      }
      return
    }

    // Бейджа ещё нет — создаём
    if (!oldBadge) {
      const newBadge = createBadge(binding.value);
      el.append(newBadge);
      elementMap.set(el, newBadge);
    } else if (binding.value !== binding.oldValue) {
      oldBadge.textContent = binding.value.toString();
    }
  },

  beforeUnmount(el: HTMLElement): void {
    const badge = elementMap.get(el)

    if (badge && badge.parentElement === el) {
      el.removeChild(badge);
      elementMap.delete(el);
    }
  }
}

function createBadge(value: number): HTMLElement {
  const badge = document.createElement('div')
  badge.textContent = value.toString()
  badge.className = 'v-badge'

  Object.assign(badge.style, {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    fontSize: '8px',
    border: '1px solid var(--color-primary-black)',
    borderRadius: '50%',
    width: '15px',
    height: '15px',
    backgroundColor: 'var(--color-primary-white)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })

  return badge
}
