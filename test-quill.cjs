const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, { url: "http://localhost" });
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.Node = dom.window.Node;
// Mock document.getSelection
global.document.getSelection = () => ({
  getRangeAt: () => ({}),
  removeAllRanges: () => {},
});

const Quill = require('quill');

const BaseVideoFormat = Quill.import('formats/video');

class CustomVideoFormat extends BaseVideoFormat {
  static blotName = 'video';
  static tagName = 'IFRAME';
  static className = 'ql-video';

  static formats(domNode) {
    return {
      width: domNode.style.width || domNode.getAttribute('width') || '',
      height: domNode.style.height || domNode.getAttribute('height') || '',
      style: domNode.getAttribute('style') || '',
      class: domNode.getAttribute('class') || '',
    };
  }

  format(name, value) {
    if (['width', 'height', 'style', 'class'].includes(name)) {
      if (value) {
        this.domNode.setAttribute(name, value);
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

Quill.register({'formats/video': CustomVideoFormat}, true);

const container = document.createElement('div');
document.body.appendChild(container);
const quill = new Quill(container, {
  modules: {
    clipboard: {
      matchers: [
        ['IFRAME', function(node, delta) {
          if (delta.ops && delta.ops.length > 0 && delta.ops[0].insert && delta.ops[0].insert.video) {
            const style = node.getAttribute('style');
            if (style) {
              delta.ops[0].attributes = delta.ops[0].attributes || {};
              delta.ops[0].attributes.style = style;
            }
          }
          return delta;
        }]
      ]
    }
  }
});

quill.clipboard.dangerouslyPasteHTML('<iframe class="ql-video" style="width: 50px !important; height: 50px !important;" src="https://youtube.com"></iframe>');

console.log("=== DELTA AFTER PASTE ===");
console.log(JSON.stringify(quill.getContents(), null, 2));

console.log("=== HTML AFTER PASTE ===");
console.log(container.innerHTML);

quill.formatText(0, 1, 'width', '100');
quill.formatText(0, 1, 'height', '100');
quill.formatText(0, 1, 'style', 'width: 100px !important; height: 100px !important;');

console.log("=== DELTA AFTER FORMAT ===");
console.log(JSON.stringify(quill.getContents(), null, 2));

console.log("=== HTML AFTER FORMAT ===");
console.log(container.innerHTML);
