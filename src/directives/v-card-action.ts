import type { DirectiveBinding } from 'vue';
import iconHeart from '@/assets/iconHeart.svg?raw';
import iconBucket from '@/assets/iconBucket.svg?raw';
import iconEye from '@/assets/iconEye.svg?raw';

interface CardData {
  onAddToCard: () => void;
  onViewProduct: () => void;
  onFavorite: () => void;
};

const icons = [iconBucket, iconEye, iconHeart] as const;
const cardData = new WeakMap<HTMLElement, HTMLElement>();
const handlersMap = new WeakMap<
  HTMLElement,
  Map<HTMLAnchorElement, (e: MouseEvent) => void>
>();

const defaultSelector = 'imgWrapper';

export default {
  mounted(wr: HTMLElement, binding: DirectiveBinding<CardData, string>): void {
    const selector = binding.arg ?? defaultSelector;
    const el: HTMLElement | null = wr.querySelector(`.${selector}`) ?? wr;
    if (el == null) return;
    const { value } = binding;
    const wrapper = document.createElement('div');
    const wrapperLinks = document.createElement('div');
    wrapperLinks.classList.add('wrapper-links');

    el.style.position = 'relative';

    Object.assign(wrapper.style, {
      position: 'absolute',
      inset: '0',
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    });

    Object.assign(wrapperLinks.style, {
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
    });

    const onAddToCard = (e: MouseEvent): void => {
      e.preventDefault();
      value.onAddToCard();
    }

    const onViewProduct = (e: MouseEvent): void => {
      e.preventDefault();
      value.onViewProduct();
    }

    const onFavorite = (e: MouseEvent): void => {
      e.preventDefault();
      value.onFavorite();
    }

    const actions = [onAddToCard, onViewProduct, onFavorite];
    const linksMap = new Map<HTMLAnchorElement, (e: MouseEvent) => void>();

    icons.forEach((icon: string, i: number) => {
      const link = document.createElement('a');
      link.innerHTML = icon;

      link.addEventListener('click', actions[i]);
      linksMap.set(link, actions[i]);

      Object.assign(link.style, {
        cursor: 'pointer',
      });

      wrapperLinks.append(link);
    });

    wrapper.append(wrapperLinks);
    cardData.set(el, wrapper);
    handlersMap.set(el, linksMap);
    el.appendChild(wrapper);

    const onMouseenter = (): void => {
      wrapper.style.display = 'flex';
    }

    const onMouseleave = (): void => {
      wrapper.style.display = 'none';
    }

    el.addEventListener('mouseenter', onMouseenter);
    el.addEventListener('mouseleave', onMouseleave);

    (el as any)._onMouseenter = onMouseenter;
    (el as any)._onMouseleave = onMouseleave;
  },

  beforeUnmount(wr: HTMLElement, binding: DirectiveBinding<CardData, string>): void {
    const selector = binding.arg ?? defaultSelector;
    const el: HTMLElement | null = wr.querySelector(`.${selector}`) ?? wr;
    if (el == null) return;
    const wrapper = cardData.get(el);
    const linksMap = handlersMap.get(el);

    if (linksMap) {
      for (const [link, cb] of linksMap.entries()) {
        link.removeEventListener('click', cb);
      }
      handlersMap.delete(el);
    }

    if (wrapper && wrapper.parentElement === el) {
      el.removeChild(wrapper);
      cardData.delete(el);
    }

    if ((el as any)._onMouseenter) {
      el.removeEventListener('mouseenter', (el as any)._onMouseenter);
      delete (el as any)._onMouseenter;
    }
    if ((el as any)._onMouseleave) {
      el.removeEventListener('mouseleave', (el as any)._onMouseleave);
      delete (el as any)._onMouseleave;
    }
  }
}
