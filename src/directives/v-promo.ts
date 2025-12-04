import type { DirectiveBinding } from "vue";

interface Promo {
  title: string,
  price: string,
  navigate: () => void;
}

interface PromoData {
  wrapper: HTMLElement,
  title: HTMLElement,
  price: HTMLElement,
  button: HTMLElement,
  onClick: (e: MouseEvent) => void
}

const defaultSelector = 'sliderWrapper';

const promoMap = new WeakMap<HTMLElement, PromoData>();

export default {
  mounted(wr: HTMLElement, binding: DirectiveBinding<Promo>): void {
    const selector = binding.arg ?? defaultSelector;
    const el: HTMLElement | null = wr.querySelector(`.${selector}`) ?? wr;

    if (el == null) return;
    const { value } = binding;
    const wrapper = document.createElement('div');
    const title = document.createElement('div');
    title.textContent = value.title?.toString() ?? '';
    const price = document.createElement('div');
    price.textContent = value.price?.toString() ?? '';
    const button = document.createElement('a');
    button.textContent = 'View Product';

    el.style.position = 'relative';

    title.classList.add('heading1');

    title.style.marginBottom = '16px';

    price.classList.add('heading2');

    price.style.marginBottom = '48px';

    Object.assign(button.style, {
      fontSize: 'var(--font-size-20)',
      fontWeight: 'var(--font-weight-bold)',
      padding: '14px 32px',
      border: '2px solid var(--color-primary-white)',
      borderRadius: '6px',
      cursor: 'pointer'
    });

    const onClick = (e: MouseEvent): void => {
      e.stopPropagation();
      value.navigate()
    }

    button.addEventListener('click', onClick);

    wrapper.append(title, price, button);

    promoMap.set(el, {
      wrapper,
      title,
      price,
      button,
      onClick
    });

    Object.assign(wrapper.style, {
      position: 'absolute',
      top: '50%',
      left: '39px',
      transform: 'translateY(-50%)',
      color: 'var(--color-primary-white)',
      zIndex: 1
    });
    el.append(wrapper);
  },

  beforeUpdate(wr: HTMLElement, binding: DirectiveBinding<Promo>): void {
    const selector = binding.arg ?? defaultSelector;
    const el: HTMLElement | null = wr.querySelector(`.${selector}`) ?? wr;

    if (el == null) return;
    let data = promoMap.get(el)!;
    const { value, oldValue } = binding;

    if (value.title !== oldValue?.title) {
      data.title.textContent = value.title?.toString() ?? '';
    }

    if (value.price !== oldValue?.price) {
      data.price.textContent = value.price?.toString() ?? '';
    }

    if (value.navigate !== oldValue?.navigate) {
      data.button.removeEventListener('click', data.onClick);

      data.onClick = (e: MouseEvent): void => {
        e.stopPropagation();
        value.navigate()
      }

      data.button.addEventListener('click', data.onClick);
    }
  },

  beforeUnmount(wr: HTMLElement, binding: DirectiveBinding<Promo>): void {
    const selector = binding.arg ?? defaultSelector;
    const el: HTMLElement | null = wr.querySelector(`.${selector}`) ?? wr;

    if (el == null) return;
    const { button, onClick, wrapper } = promoMap.get(el)!;
    button.removeEventListener('click', onClick);

    if (wrapper.parentElement === el) {
      el.removeChild(wrapper);
      promoMap.delete(el);
    }
  }
}
