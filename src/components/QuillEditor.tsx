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
  const [targetBlot, setTargetBlot] = useState<any>(null);

  useEffect(() => {
    // We need a short timeout to let ReactQuill initialize the editor instance
    const timeoutId = setTimeout(() => {
      const editor = reactQuillRef.current?.getEditor();
      if (!editor) return;

      const handleDblClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
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
            setTargetBlot(blot);
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
    if (!editor || !targetBlot) return;
    
    const index = editor.getIndex(targetBlot);
    if (index !== undefined && index >= 0) {
      const formatStr = buildMediaStyle(attrs);
      editor.formatText(index, 1, 'width', attrs.width || false);
      editor.formatText(index, 1, 'height', attrs.height || false);
      if (mediaType === 'image') {
        editor.formatText(index, 1, 'alt', attrs.alt || false);
      }
      editor.formatText(index, 1, 'style', formatStr || false);
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
