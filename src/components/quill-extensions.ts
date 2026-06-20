import { Quill } from 'react-quill-new';

const BaseImageFormat = Quill.import('formats/image');
const BaseVideoFormat = Quill.import('formats/video');

class CustomImageFormat extends BaseImageFormat {
  static blotName = 'image';
  static tagName = 'IMG';

  static formats(domNode: HTMLElement) {
    return {
      width: domNode.style.width || domNode.getAttribute('width') || '',
      height: domNode.style.height || domNode.getAttribute('height') || '',
      style: domNode.getAttribute('style') || '',
      alt: domNode.getAttribute('alt') || '',
      class: domNode.getAttribute('class') || '',
    };
  }

  format(name: string, value: any) {
    if (['width', 'height', 'style', 'alt', 'class'].includes(name)) {
      if (value) {
        this.domNode.setAttribute(name, value);
        // Bắt buộc ghi đè vào inline style để chặn CSS mặc định
        if (name === 'width' || name === 'height') {
          const pxVal = !isNaN(Number(value)) ? `${value}px` : value;
          this.domNode.style.setProperty(name, pxVal, 'important');
        }
      } else {
        this.domNode.removeAttribute(name);
        if (name === 'width' || name === 'height') {
          this.domNode.style.removeProperty(name);
        }
      }
    } else {
      super.format(name, value);
    }
  }
}

class CustomVideoFormat extends BaseVideoFormat {
  static blotName = 'video';
  static tagName = 'IFRAME';
  static className = 'ql-video';

  static formats(domNode: HTMLElement) {
    return {
      width: domNode.style.width || domNode.getAttribute('width') || '',
      height: domNode.style.height || domNode.getAttribute('height') || '',
      style: domNode.getAttribute('style') || '',
      class: domNode.getAttribute('class') || '',
    };
  }

  format(name: string, value: any) {
    if (['width', 'height', 'style', 'class'].includes(name)) {
      if (value) {
        this.domNode.setAttribute(name, value);
        // Bắt buộc ghi đè vào inline style để chặn class .ql-video
        if (name === 'width' || name === 'height') {
          const pxVal = !isNaN(Number(value)) ? `${value}px` : value;
          this.domNode.style.setProperty(name, pxVal, 'important');
        }
      } else {
        this.domNode.removeAttribute(name);
        if (name === 'width' || name === 'height') {
          this.domNode.style.removeProperty(name);
        }
      }
    } else {
      super.format(name, value);
    }
  }
}

export function registerQuillExtensions() {
  Quill.register({
    'formats/image': CustomImageFormat,
    'formats/video': CustomVideoFormat
  }, true);
}
