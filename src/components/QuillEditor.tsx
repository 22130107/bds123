import React, { useMemo, useRef, useState, useEffect, memo } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { registerQuillExtensions } from './quill-extensions';
import { MediaPropertiesModal, MediaAttributes, parseMediaStyle, buildMediaStyle } from './MediaPropertiesModal';

// Register extensions to override default image/video formats
registerQuillExtensions();

// Register custom sizes
const Size = Quill.import('attributors/style/size');
Size.whitelist = ['10px', '11px', '12px', '13px', '14px', '16px', '18px', '20px', '24px', '32px', '48px', '64px'];
Quill.register(Size, true);

// Register custom fonts
const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'tahoma', 'verdana', 'georgia', 'times-new-roman', 'courier-new', 'hanken-grotesk'];
Quill.register(Font, true);

/**
 * Chuyển mọi <iframe> thành <iframe class="ql-video"> để Quill nhận dạng đúng.
 */
function preprocessHtml(html: string): string {
  if (!html) return html;
  // Xóa class ql-video cũ nếu có rồi thêm lại cho chắc
  return html.replace(/<iframe([^>]*)>/gi, (match, attrs) => {
    // Xóa class="ql-video" nếu đã có để không bị duplicate
    const cleaned = attrs.replace(/\s*class="[^"]*ql-video[^"]*"/gi, '');
    return `<iframe class="ql-video"${cleaned}>`;
  });
}

interface QuillEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

// Dùng memo để tránh re-render không cần thiết từ parent
const QuillEditor = memo(function QuillEditor({ value, onChange, placeholder, className, style }: QuillEditorProps) {
  const reactQuillRef = useRef<ReactQuill>(null);
  const isInitialized = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<MediaAttributes | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  // Load nội dung ban đầu MỘT LẦN DUY NHẤT qua dangerouslyPasteHTML
  // Đây là cách duy nhất để Quill parse iframe đúng (qua clipboard matchers)
  useEffect(() => {
    if (isInitialized.current) return;

    const tryInit = () => {
      const editor = reactQuillRef.current?.getEditor();
      if (!editor) {
        // Thử lại nếu editor chưa sẵn sàng
        setTimeout(tryInit, 50);
        return;
      }
      isInitialized.current = true;

      if (value) {
        const processed = preprocessHtml(value);
        // dangerouslyPasteHTML dùng clipboard matchers → iframe được nhận dạng đúng
        editor.clipboard.dangerouslyPasteHTML(0, processed);
        // Đặt cursor về đầu sau khi paste
        editor.setSelection(0, 0);
      }

      // Lắng nghe text-change để gọi onChange
      editor.on('text-change', () => {
        if (onChangeRef.current) {
          onChangeRef.current(editor.root.innerHTML);
        }
      });
    };

    setTimeout(tryInit, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gắn sự kiện double-click để mở form chỉnh sửa media
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const editor = reactQuillRef.current?.getEditor();
      if (!editor) return;

      const handleDblClick = (e: MouseEvent) => {
        let target = e.target as HTMLElement;

        // iframe có pointer-events: none nên tìm bằng tọa độ chuột
        if (target.tagName !== 'IMG' && target.tagName !== 'IFRAME') {
          const iframes = editor.root.querySelectorAll('iframe');
          for (let i = 0; i < iframes.length; i++) {
            const rect = iframes[i].getBoundingClientRect();
            if (
              e.clientX >= rect.left && e.clientX <= rect.right &&
              e.clientY >= rect.top && e.clientY <= rect.bottom
            ) {
              target = iframes[i];
              break;
            }
          }
        }

        if (target.tagName === 'IMG' || target.tagName === 'IFRAME') {
          const blot = Quill.find(target);
          if (blot) {
            const isImage = target.tagName === 'IMG';
            const type = isImage ? 'image' : 'video';
            const styleStr = target.getAttribute('style') || '';
            const parsedStyle = parseMediaStyle(styleStr);

            setMediaType(type);
            setModalData({
              url: target.getAttribute('src') || '',
              alt: target.getAttribute('alt') || '',
              width: target.style.width.replace(/px$/i, '') || target.getAttribute('width') || '',
              height: target.style.height.replace(/px$/i, '') || target.getAttribute('height') || '',
              borderWidth: parsedStyle.borderWidth || '',
              borderColor: parsedStyle.borderColor || '#000000',
              hspace: parsedStyle.hspace || '',
              vspace: parsedStyle.vspace || '',
              align: parsedStyle.align || ''
            });
            setTargetIndex(editor.getIndex(blot));
            setModalOpen(true);
          }
        }
      };

      editor.root.addEventListener('dblclick', handleDblClick);
      (editor.root as any)._dblclickHandler = handleDblClick;
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      const editor = reactQuillRef.current?.getEditor();
      if (editor && (editor.root as any)._dblclickHandler) {
        editor.root.removeEventListener('dblclick', (editor.root as any)._dblclickHandler);
      }
    };
  }, []);

  const handleSaveMedia = (attrs: MediaAttributes) => {
    const editor = reactQuillRef.current?.getEditor();
    if (!editor || targetIndex === null) return;

    const ensurePx = (val: string) => {
      if (!val) return '';
      return !isNaN(Number(val)) ? `${val}px` : val;
    };

    // Tìm đúng DOM element theo targetIndex
    let elFound: HTMLElement | null = null;
    const walker = document.createTreeWalker(editor.root, NodeFilter.SHOW_ELEMENT);
    let node = walker.nextNode();
    while (node) {
      const el = node as HTMLElement;
      if (
        (mediaType === 'video' && el.tagName === 'IFRAME') ||
        (mediaType === 'image' && el.tagName === 'IMG')
      ) {
        const blot = Quill.find(el);
        if (blot && editor.getIndex(blot) === targetIndex) {
          elFound = el;
          break;
        }
      }
      node = walker.nextNode();
    }

    if (elFound) {
      const pxW = ensurePx(attrs.width);
      const pxH = ensurePx(attrs.height);

      if (pxW) elFound.style.setProperty('width', pxW, 'important');
      else elFound.style.removeProperty('width');

      if (pxH) elFound.style.setProperty('height', pxH, 'important');
      else elFound.style.removeProperty('height');

      // Apply border, margin, align
      const extraStyle = buildMediaStyle({ ...attrs, width: '', height: '' });
      if (extraStyle) {
        const current = elFound.style.cssText;
        elFound.style.cssText = current + '; ' + extraStyle;
      }

      if (mediaType === 'image' && attrs.alt !== undefined) {
        elFound.setAttribute('alt', attrs.alt);
      }

      // Cập nhật state của parent thông qua onChange
      if (onChangeRef.current) {
        onChangeRef.current(editor.root.innerHTML);
      }
    }

    setTargetIndex(null);
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'font': [false, 'arial', 'tahoma', 'verdana', 'georgia', 'times-new-roman', 'courier-new', 'hanken-grotesk'] }],
        [{ 'size': ['10px', '11px', '12px', '13px', '14px', '16px', '18px', '20px', '24px', '32px', '48px', '64px'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
    },
    clipboard: {
      matchVisual: false,
      matchers: [
        // Chuyển <iframe> thành video embed khi paste hoặc dangerouslyPasteHTML
        ['IFRAME', (node: any, _delta: any) => {
          const src = node.getAttribute('src') || '';
          const Delta = Quill.import('delta');
          const attributes: any = {};
          const nodeStyle = node.getAttribute('style');
          if (nodeStyle) attributes.style = nodeStyle;
          const w = node.getAttribute('width') || (node.style && node.style.width);
          const h = node.getAttribute('height') || (node.style && node.style.height);
          if (w) attributes.width = w;
          if (h) attributes.height = h;
          return new Delta().insert(
            { video: src },
            Object.keys(attributes).length ? attributes : undefined
          );
        }],
      ]
    }
  }), []);

  return (
    <>
      {/* KHÔNG truyền value prop — editor hoạt động ở chế độ uncontrolled */}
      {/* Nội dung được set 1 lần qua dangerouslyPasteHTML trong useEffect */}
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        defaultValue=""
        onChange={() => {}} // dummy, thực tế dùng text-change event ở trên
        modules={modules}
        placeholder={placeholder}
        className={className}
        style={style}
      />
      <MediaPropertiesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={modalData}
        type={mediaType}
        onSave={handleSaveMedia}
      />
    </>
  );
});

export default QuillEditor;
