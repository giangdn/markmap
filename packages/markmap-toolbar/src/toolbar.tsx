import { mountDom, VChildren } from '@gera2ld/jsx-dom';
import type { Markmap } from 'markmap-view';
import './style.css';

export interface IToolbarItem {
  id?: string;
  title?: string;
  content: VChildren;
  onClick?: (e: Event) => void;
}

const clsToolbarItem = 'mm-toolbar-item';
const clsActive = 'active';

function renderBrand() {
  return (
    <a className="mm-toolbar-brand" href="https://markmap.js.org/">
      <img
        alt="markmap"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACoFBMVEUAAAAAAAD//wAAAACAgAD//wAAAABVVQCqqgBAQACAQACAgABmZgBtbQAAAABgQABgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaFQAAAAAAAAAAAAAAAAAHAAARBQIdGAIYEwI/OgJYUQUfHQI+OgJDPgJJRARBPQRJQgRRSwRRTQRIQQRUTgRUUARZUgRSTQRPSQRjWgZORQRfWQZsZAhTTQRNRwRWUAZkXAZOSARUTgZPRwRRSQRoYwZWUQZWTgRbUwZmXQZoXghmXwdqYwdsYwdfVwVmXQdqYgdiWgVpYAl3bgl6cgl4cAqLggw8OAOWjA2Uig1OSAR2bQihlg55cAh5cAh6cQmMgwyOhAyUjA2QhQ2Uiw2Viw2soBCflA+voxGwpRGhlg+hlg+snxGroBGjmBCpnBC0pxKyphKxpRG2qhK0qBK5rBK5rBP/7h3/8B7/8R3/8h3/8R7/8h786x397B3+7R3EtxT66Rz66hz76hz86xz96xz97Bz+7Rz45xz56Bz76hz97Bz97B3MvRX15Rv25Rv45xz66Rz76hz97B3+7R3IuxX05Bv15Bv25Rz56Bz66Ry/sxPAsxPCtRTCthTNvxbZyxfczxfi0xjl1Rnn2Bnr2xrr3Brs3Rru3Rru3xrv3hrw3xrx4Bvx4Rvy4hvz4hvz4xv04xv05Bv14xv15Bv15Rv25Bv25Rv25Rz25hv35hv35xv45xv45xz55xz56Bv56Bz66Rv66Rz76Rv76Rz76hz86hv86xz+7h3/7R3/7h3/7x3/8B3/8B7/8R3/8R4Yqhj5AAAAq3RSTlMAAQECAgIDAwMEBAQFBwgICAwQERITFRYXGBkbHB0eHyQlJyguNTg8RUZISU5PV2FiY2RlZmdqa2xubnJzc3R2d3d3eXl5eXp7fH1+gIGCgoKDg4SEhIWGh4eHiYmJjIyMjZSUlJ+sra+zt7i4uru8ztHV1tbW2d7g4OHi4uPk5ufp7Ozv9fX29/f3+Pj6+vr7+/v7+/v7+/z8/Pz8/f39/f39/f3+/v7+/v7K6J1dAAACHklEQVQ4y2NgwAoYWdi5uLm5GXHIcrLCmMzYpDmAhKCKjoGtp40MFhVsDAwSxmmVEzZu2XvqSLkchjw3g0h445Ybd24vmTN1Usd5X3R5DgaNqgN35sycP2/GxMkTMRVwMOivvtO3YsWUm3duX790EcMKdgbNNXdnnJh1+9T6ipzU+FB0RzIyiFYB5WdfaElUF8TmTQ6GwH39J2bvypMHcpg4MAKKkUGo5s6KWRfyGRh4WJClGEGBCgS8DLobliy/3abMwM8NBYwQjXDgf3ryxOspyKYyg+RFTFwdnYDAzbrw+oLFm9Ot3J3AwNHFTBykQrhg++GDh48cOXzk4P6VZy8s230MyAGCwwcP7iyRBJpiur1n8hQIWHX27NkLi6bAwOSuow5ABeY7OydOhoCFIAULe6E8YFCf8QAqEC86evniZTA4tfLsuRXHr0E4ly9ePF0uC3KnpH1MZBQQxPoVgxyZ5RMdBQaRMc6yIEcihWbQGaA3k9G8CfQoN0pAtSoxCMACihk9qGtBQZ2LHtRIkRUMiqwd2TJADiswsrjQlAGju/o+MLrPNkWo8mFN1ewMWmvBCebQ0rKMJG87QzF0FRwMRuvugpLcrXu3rp7Zs61UCtMZ2nVHbk+fMX/+jMmTp3Sf9MLiULG45q237txaPG3yxPYrYQzYMo60RWbD3E27Ll68Uq+AK+uJqOlZBiSEKGLNnMA0iDfzwrI/NKgBOivk9piPdtUAAAAASUVORK5CYII="
      />
      <span>markmap</span>
    </a>
  );
}

function renderItem({ title, content, onClick }: IToolbarItem) {
  return (
    <div className={clsToolbarItem} title={title} onClick={onClick}>
      {content}
    </div>
  );
}

let promise: Promise<void> | undefined;
function safeCaller<T extends unknown[]>(fn: (...args: T) => Promise<void>) {
  return async (...args: T) => {
    if (promise) return;
    promise = fn(...args);
    try {
      await promise;
    } finally {
      promise = undefined;
    }
  };
}

export class Toolbar {
  showBrand = true;

  registry: { [id: string]: IToolbarItem } = {};

  private markmap: Markmap | undefined;

  static defaultItems: (string | IToolbarItem)[] = [
    'zoomIn',
    'zoomOut',
    'fit',
    'recurse',
    'dark',
  ];

  el = mountDom(<div className="mm-toolbar" />) as HTMLDivElement;

  items = [...Toolbar.defaultItems];

  static create(mm: Markmap) {
    const toolbar = new Toolbar();
    toolbar.attach(mm);
    return toolbar;
  }

  static icon(path: string, attrs = {}) {
    attrs = {
      stroke: 'none',
      fill: 'currentColor',
      'fill-rule': 'evenodd',
      ...attrs,
    };
    return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <path {...attrs} d={path} />
      </svg>
    );
  }

  constructor() {
    this.register({
      id: 'zoomIn',
      title: 'Zoom in',
      content: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1 -2 0v-6h-6a1 1 0 0 1 0 -2h6v-6a1 1 0 0 1 1 -1" />
        </svg>
      ),
      onClick: this.getHandler((mm) => mm.rescale(1.25)),
    });
    this.register({
      id: 'zoomOut',
      title: 'Zoom out',
      content: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
        </svg>
      ),
      onClick: this.getHandler((mm) => mm.rescale(0.8)),
    });
    this.register({
      id: 'fit',
      title: 'Fit window size',
      content: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19 4h-14a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3zm-10 3a1 1 0 0 1 .117 1.993l-.117 .007h-2v2a1 1 0 0 1 -.883 .993l-.117 .007a1 1 0 0 1 -.993 -.883l-.007 -.117v-3a1 1 0 0 1 .883 -.993l.117 -.007h3zm9 5a1 1 0 0 1 .993 .883l.007 .117v3a1 1 0 0 1 -.883 .993l-.117 .007h-3a1 1 0 0 1 -.117 -1.993l.117 -.007h2v-2a1 1 0 0 1 .883 -.993l.117 -.007z" />
        </svg>
      ),
      onClick: this.getHandler((mm) => mm.fit()),
    });
    this.register({
      id: 'recurse',
      title: 'Toggle recursively',
      content: Toolbar.icon('M16 4h-12v12h12v-8h-8v4h2v-2h4v4h-8v-8h10z'),
      onClick: (e) => {
        const button = (e.target as HTMLDivElement).closest<HTMLDivElement>(
          `.${clsToolbarItem}`,
        );
        const active = button?.classList.toggle(clsActive);
        this.markmap?.setOptions({
          toggleRecursively: active,
        });
      },
    });
    this.register({
      id: 'dark',
      title: 'Toggle dark theme',
      content: Toolbar.icon(
        'M10 4a6 6 0 0 0 0 12a6 6 0 0 0 0 -12v2a4 4 0 0 1 0 8z',
      ),
      onClick: () => {
        document.documentElement.classList.toggle('markmap-dark');
      },
    });
    this.render();
  }

  /** @deprecated Set `showBrand` instead. */
  setBrand(show: boolean) {
    this.showBrand = show;
    return this.render();
  }

  register(data: IToolbarItem & { id: string }) {
    this.registry[data.id] = data;
  }

  getHandler(handle: (mm: Markmap) => Promise<void>) {
    handle = safeCaller(handle);
    return () => {
      if (this.markmap) handle(this.markmap);
    };
  }

  setItems(items: (string | IToolbarItem)[]) {
    this.items = [...items];
    return this.render();
  }

  attach(mm: Markmap) {
    this.markmap = mm;
  }

  render() {
    const items = this.items
      .map((item: string | IToolbarItem): IToolbarItem => {
        if (typeof item === 'string') {
          const data = this.registry[item];
          if (!data) console.warn(`[markmap-toolbar] ${item} not found`);
          return data;
        }
        return item;
      })
      .filter(Boolean);
    while (this.el.firstChild) {
      this.el.firstChild.remove();
    }
    this.el.append(
      mountDom(
        <>
          {this.showBrand && renderBrand()}
          {items.map(renderItem)}
        </>,
      ),
    );
    return this.el;
  }
}
