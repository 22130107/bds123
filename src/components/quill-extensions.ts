import { Quill } from 'react-quill-new';

const BaseImageFormat = Quill.import('formats/image');
const BaseVideoFormat = Quill.import('formats/video');

class CustomImageFormat extends BaseImageFormat {
  static formats(domNode: HTMLElement) {
    return {
      width: domNode.getAttribute('width') || '',
      height: domNode.getAttribute('height') || '',
      style: domNode.getAttribute('style') || '',
      alt: domNode.getAttribute('alt') || '',
      class: domNode.getAttribute('class') || '',
    };
  }

  format(name: string, value: any) {
    if (['width', 'height', 'style', 'alt', 'class'].includes(name)) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

class CustomVideoFormat extends BaseVideoFormat {
  static formats(domNode: HTMLElement) {
    return {
      width: domNode.getAttribute('width') || '',
      height: domNode.getAttribute('height') || '',
      style: domNode.getAttribute('style') || '',
      class: domNode.getAttribute('class') || '',
    };
  }

  format(name: string, value: any) {
    if (['width', 'height', 'style', 'class'].includes(name)) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

export function registerQuillExtensions() {
  Quill.register(CustomImageFormat, true);
  Quill.register(CustomVideoFormat, true);
}
