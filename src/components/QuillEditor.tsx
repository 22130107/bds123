import React, { useMemo, useRef, useState, useEffect, memo, useCallback } from 'react';
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

function preprocessHtml(html: string): string {
  if (!html) return html;
  return html.replace(/<iframe([^>]*)>/gi, (match, attrs) => {
    const cleaned = attrs.replace(/\s*class="[^"]*ql-video[^"]*"/gi, '');
    return `<iframe class="ql-video"${cleaned}>`;
  });
}

// ─── Floating Media Toolbar ────────────────────────────────────────────────
interface FloatingToolbarProps {
  target: HTMLElement | null;
  type: 'image' | 'video';
  containerRef: React.RefObject<HTMLDivElement>;
  onEdit: () => void;
  onDelete: () => void;
  onAlign: (align: string) => void;
}

function FloatingMediaToolbar({ target, type, containerRef, onEdit, onDelete, onAlign }: FloatingToolbarProps) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!target || !containerRef.current) {
      setPos(null);
      return;
    }
    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setPos({
      top: targetRect.top - containerRect.top - 44, // 44px = toolbar height + gap
      left: targetRect.left - containerRect.left,
    });
  }, [target, containerRef]);

  if (!target || !pos) return null;

  const btnBase =
    'flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-all hover:bg-white/20 active:scale-95 whitespace-nowrap';

  return (
    <div
      className="media-floating-toolbar"
      style={{
        position: 'absolute',
        top: Math.max(4, pos.top),
        left: pos.left,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: '#f1f5f9',
        borderRadius: '8px',
        padding: '4px 6px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.2)',
        fontSize: '12px',
        userSelect: 'none',
        pointerEvents: 'all',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        animation: 'mediaToolbarIn 0.15s ease-out',
      }}
      onMouseDown={(e) => e.preventDefault()} // Ngăn editor mất focus
    >
      {/* Icon loại media */}
      <span style={{ marginRight: 4, opacity: 0.7, fontSize: 14 }}>
        {type === 'image' ? '🖼️' : '🎬'}
      </span>

      <span style={{ opacity: 0.5, fontSize: 10, marginRight: 4 }}>
        {type === 'image' ? 'Hình ảnh' : 'Video/Iframe'}
      </span>

      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)', margin: '0 4px' }} />

      {/* Căn trái */}
      <button
        type="button"
        className={btnBase}
        title="Căn trái"
        onClick={() => onAlign('left')}
        style={{ padding: '3px 6px' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/>
        </svg>
      </button>

      {/* Căn giữa */}
      <button
        type="button"
        className={btnBase}
        title="Căn giữa"
        onClick={() => onAlign('center')}
        style={{ padding: '3px 6px' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
        </svg>
      </button>

      {/* Căn phải */}
      <button
        type="button"
        className={btnBase}
        title="Căn phải"
        onClick={() => onAlign('right')}
        style={{ padding: '3px 6px' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)', margin: '0 4px' }} />

      {/* Chỉnh sửa thuộc tính */}
      <button
        type="button"
        className={btnBase}
        title="Chỉnh sửa thuộc tính"
        onClick={onEdit}
        style={{ padding: '3px 8px', background: 'rgba(99,102,241,0.3)', borderRadius: 6 }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        <span>Thuộc tính</span>
      </button>

      {/* Xóa */}
      <button
        type="button"
        className={btnBase}
        title="Xóa"
        onClick={onDelete}
        style={{ padding: '3px 8px', background: 'rgba(239,68,68,0.3)', borderRadius: 6 }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
          <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
        </svg>
        <span>Xóa</span>
      </button>
    </div>
  );
}

// ─── Main Editor ───────────────────────────────────────────────────────────
interface QuillEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

const QuillEditor = memo(function QuillEditor({ value, onChange, placeholder, className, style }: QuillEditorProps) {
  const reactQuillRef = useRef<ReactQuill>(null);
  const containerRef = useRef<HTMLDivElement>(null!);
  const isInitialized = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<MediaAttributes | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  // Floating toolbar state
  const [selectedEl, setSelectedEl] = useState<HTMLElement | null>(null);
  const [selectedType, setSelectedType] = useState<'image' | 'video'>('image');

  // Load nội dung ban đầu MỘT LẦN DUY NHẤT
  useEffect(() => {
    if (isInitialized.current) return;

    let outerTimer: ReturnType<typeof setTimeout>;
    let innerTimer: ReturnType<typeof setTimeout>;

    const tryInit = () => {
      const editor = reactQuillRef.current?.getEditor();
      if (!editor) {
        innerTimer = setTimeout(tryInit, 50);
        return;
      }

      isInitialized.current = true;
      editor.setContents([]);

      if (value) {
        const processed = preprocessHtml(value);
        editor.clipboard.dangerouslyPasteHTML(processed);
      }

      editor.on('text-change', () => {
        if (onChangeRef.current) {
          onChangeRef.current(editor.root.innerHTML);
        }
      });
    };

    outerTimer = setTimeout(tryInit, 100);

    return () => {
      clearTimeout(outerTimer);
      clearTimeout(innerTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Click/dblclick handler
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const editor = reactQuillRef.current?.getEditor();
      if (!editor) return;

      // Ẩn toolbar khi click ra ngoài
      const handleDocClick = (e: MouseEvent) => {
        const toolbar = document.querySelector('.media-floating-toolbar');
        if (toolbar && !toolbar.contains(e.target as Node)) {
          // Chỉ ẩn nếu click không phải vào img/iframe trong editor
          const t = e.target as HTMLElement;
          if (t.tagName !== 'IMG' && t.tagName !== 'IFRAME') {
            setSelectedEl(null);
          }
        }
      };
      document.addEventListener('click', handleDocClick);

      const handleClick = (e: MouseEvent) => {
        let target = e.target as HTMLElement;

        // Tìm iframe theo tọa độ (do pointer-events: none)
        if (target.tagName !== 'IMG' && target.tagName !== 'IFRAME') {
          const iframes = editor.root.querySelectorAll('iframe');
          for (let i = 0; i < iframes.length; i++) {
            const rect = iframes[i].getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
              target = iframes[i];
              break;
            }
          }
        }

        if (target.tagName === 'IMG' || target.tagName === 'IFRAME') {
          setSelectedEl(target);
          setSelectedType(target.tagName === 'IMG' ? 'image' : 'video');
        } else {
          setSelectedEl(null);
        }
      };

      // Double click → mở modal
      const handleDblClick = (e: MouseEvent) => {
        let target = e.target as HTMLElement;

        if (target.tagName !== 'IMG' && target.tagName !== 'IFRAME') {
          const iframes = editor.root.querySelectorAll('iframe');
          for (let i = 0; i < iframes.length; i++) {
            const rect = iframes[i].getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
              target = iframes[i];
              break;
            }
          }
        }

        if (target.tagName === 'IMG' || target.tagName === 'IFRAME') {
          const blot = Quill.find(target);
          if (blot) {
            openEditModal(target, editor.getIndex(blot));
          }
        }
      };

      editor.root.addEventListener('click', handleClick);
      editor.root.addEventListener('dblclick', handleDblClick);
      (editor.root as any)._handlers = { handleClick, handleDblClick, handleDocClick };

      return () => {
        editor.root.removeEventListener('click', handleClick);
        editor.root.removeEventListener('dblclick', handleDblClick);
        document.removeEventListener('click', handleDocClick);
      };
    }, 150);

    return () => clearTimeout(timeoutId);
  }, []);

  const openEditModal = useCallback((el: HTMLElement, index: number) => {
    const styleStr = el.getAttribute('style') || '';
    const parsedStyle = parseMediaStyle(styleStr);
    const type = el.tagName === 'IMG' ? 'image' : 'video';

    setMediaType(type);
    setModalData({
      url: el.getAttribute('src') || '',
      alt: el.getAttribute('alt') || '',
      width: el.style.width.replace(/px$/i, '') || el.getAttribute('width') || '',
      height: el.style.height.replace(/px$/i, '') || el.getAttribute('height') || '',
      borderWidth: parsedStyle.borderWidth || '',
      borderColor: parsedStyle.borderColor || '#000000',
      hspace: parsedStyle.hspace || '',
      vspace: parsedStyle.vspace || '',
      align: parsedStyle.align || ''
    });
    setTargetIndex(index);
    setModalOpen(true);
  }, []);

  // Toolbar: Căn lề nhanh
  const handleQuickAlign = useCallback((align: string) => {
    if (!selectedEl) return;
    const editor = reactQuillRef.current?.getEditor();

    if (align === 'center') {
      selectedEl.style.setProperty('display', 'block', 'important');
      selectedEl.style.setProperty('margin-left', 'auto', 'important');
      selectedEl.style.setProperty('margin-right', 'auto', 'important');
      selectedEl.style.removeProperty('float');
    } else if (align === 'left' || align === 'right') {
      selectedEl.style.setProperty('float', align, 'important');
      selectedEl.style.removeProperty('margin-left');
      selectedEl.style.removeProperty('margin-right');
    }

    if (editor && onChangeRef.current) {
      onChangeRef.current(editor.root.innerHTML);
    }
    // Force re-position
    setSelectedEl((el) => el);
  }, [selectedEl]);

  // Toolbar: Xóa media
  const handleDelete = useCallback(() => {
    if (!selectedEl) return;
    const editor = reactQuillRef.current?.getEditor();
    if (!editor) return;

    const blot = Quill.find(selectedEl);
    if (blot) {
      const index = editor.getIndex(blot);
      editor.deleteText(index, 1);
    }
    setSelectedEl(null);
  }, [selectedEl]);

  // Toolbar: Mở modal chỉnh sửa
  const handleEditFromToolbar = useCallback(() => {
    if (!selectedEl) return;
    const editor = reactQuillRef.current?.getEditor();
    if (!editor) return;

    const blot = Quill.find(selectedEl);
    if (blot) {
      openEditModal(selectedEl, editor.getIndex(blot));
    }
  }, [selectedEl, openEditModal]);

  const handleSaveMedia = (attrs: MediaAttributes) => {
    const editor = reactQuillRef.current?.getEditor();
    if (!editor || targetIndex === null) return;

    const ensurePx = (val: string) => (!val ? '' : !isNaN(Number(val)) ? `${val}px` : val);

    let elFound: HTMLElement | null = null;
    const walker = document.createTreeWalker(editor.root, NodeFilter.SHOW_ELEMENT);
    let node = walker.nextNode();
    while (node) {
      const el = node as HTMLElement;
      if ((mediaType === 'video' && el.tagName === 'IFRAME') || (mediaType === 'image' && el.tagName === 'IMG')) {
        const blot = Quill.find(el);
        if (blot && editor.getIndex(blot) === targetIndex) { elFound = el; break; }
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

      const extraStyle = buildMediaStyle({ ...attrs, width: '', height: '' });
      if (extraStyle) elFound.style.cssText = elFound.style.cssText + '; ' + extraStyle;
      if (mediaType === 'image' && attrs.alt !== undefined) elFound.setAttribute('alt', attrs.alt);

      if (onChangeRef.current) onChangeRef.current(editor.root.innerHTML);
      setSelectedEl(elFound); // Re-trigger toolbar position
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
          return new Delta().insert({ video: src }, Object.keys(attributes).length ? attributes : undefined);
        }],
      ]
    }
  }), []);

  return (
    <>
      <style>{`
        @keyframes mediaToolbarIn {
          from { opacity: 0; transform: translateY(6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ql-editor img.ql-selected,
        .ql-editor img:hover {
          outline: 2px solid #6366f1;
          outline-offset: 2px;
          cursor: pointer;
        }
        .ql-editor iframe {
          pointer-events: none;
          transition: outline 0.15s;
        }
      `}</style>

      <div ref={containerRef} style={{ position: 'relative' }}>
        <FloatingMediaToolbar
          target={selectedEl}
          type={selectedType}
          containerRef={containerRef}
          onEdit={handleEditFromToolbar}
          onDelete={handleDelete}
          onAlign={handleQuickAlign}
        />
        <ReactQuill
          ref={reactQuillRef}
          theme="snow"
          defaultValue=""
          onChange={() => {}}
          modules={modules}
          placeholder={placeholder}
          className={className}
          style={style}
        />
      </div>

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
