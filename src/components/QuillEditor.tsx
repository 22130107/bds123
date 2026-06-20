import React, { useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// Register custom sizes
const Size = Quill.import('attributors/style/size');
Size.whitelist = ['10px', '11px', '12px', '13px', '14px', '16px', '18px', '20px', '24px', '32px', '48px', '64px'];
Quill.register(Size, true);

// Register custom fonts
const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'tahoma', 'verdana', 'georgia', 'times-new-roman', 'courier-new', 'hanken-grotesk'];
Quill.register(Font, true);

export default function QuillEditor({ value, onChange, placeholder, className, style }: any) {
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
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder={placeholder}
      className={className}
      style={style}
    />
  );
}
