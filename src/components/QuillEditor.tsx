import React, { useMemo, useRef, useState, useEffect } from 'react';
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

export default function QuillEditor({ value, onChange, placeholder, className, style }: any) {
  const reactQuillRef = useRef<ReactQuill>(null);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<MediaAttributes | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  useEffect(() => {
    // We need a short timeout to let ReactQuill initialize the editor instance
    const timeoutId = setTimeout(() => {
      const editor = reactQuillRef.current?.getEditor();
      if (!editor) return;

      const handleDblClick = (e: MouseEvent) => {
        let target = e.target as HTMLElement;
        
        // Nếu click không trúng IMG/IFRAME (có thể do iframe có pointer-events: none)
        // Ta tìm iframe dựa trên tọa độ chuột
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
              width: target.getAttribute('width') || '',
              height: target.getAttribute('height') || '',
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
      
      // Cleanup
      editor.root.dblclickListener = handleDblClick;
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      const editor = reactQuillRef.current?.getEditor();
      if (editor && (editor.root as any).dblclickListener) {
        editor.root.removeEventListener('dblclick', (editor.root as any).dblclickListener);
      }
    };
  }, []);

  const handleSaveMedia = (attrs: MediaAttributes) => {
    const editor = reactQuillRef.current?.getEditor();
    if (!editor || targetIndex === null) return;
    
    if (targetIndex !== undefined && targetIndex >= 0) {
      const formatStr = buildMediaStyle(attrs);
      
      const formats: any = {
        width: attrs.width || false,
        height: attrs.height || false,
        style: formatStr || false,
      };
      
      if (mediaType === 'image') {
        formats.alt = attrs.alt || false;
      }
      
      // Sử dụng 1 lệnh duy nhất để không bị xung đột event listener của react-quill
      editor.formatText(targetIndex, 1, formats);
      
      // Kích hoạt cập nhật ép buộc
      setTargetIndex(null);
    }
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
      matchers: [
        ['IFRAME', (node: any, delta: any) => {
          if (delta.ops && delta.ops.length > 0 && delta.ops[0].insert && delta.ops[0].insert.video) {
            const style = node.getAttribute('style');
            if (style) {
              delta.ops[0].attributes = delta.ops[0].attributes || {};
              delta.ops[0].attributes.style = style;
            }
          }
          return delta;
        }],
        ['IMG', (node: any, delta: any) => {
          if (delta.ops && delta.ops.length > 0 && delta.ops[0].insert && delta.ops[0].insert.image) {
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
  }), []);

  return (
    <>
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        value={value}
        onChange={onChange}
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
}
