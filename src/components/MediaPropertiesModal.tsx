import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

export interface MediaAttributes {
  url: string;
  alt: string;
  width: string;
  height: string;
  borderWidth: string;
  borderColor: string;
  hspace: string;
  vspace: string;
  align: string; // '', 'left', 'right', 'center'
}

interface MediaPropertiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (attrs: MediaAttributes) => void;
  initialData: MediaAttributes | null;
  type: 'image' | 'video';
}

const rgbToHex = (color: string) => {
  if (!color) return '#000000';
  if (color.startsWith('#')) return color;
  const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return '#000000';
  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

// Helpers để parse và build style
export const parseMediaStyle = (styleStr: string): Partial<MediaAttributes> => {
  if (!styleStr) return {};
  const attrs: Partial<MediaAttributes> = {};
  
  // Tạo 1 element tạm để trình duyệt parse CSS
  const div = document.createElement('div');
  div.style.cssText = styleStr;

  if (div.style.width) attrs.width = div.style.width.replace('px', '');
  if (div.style.height) attrs.height = div.style.height.replace('px', '');
  if (div.style.borderWidth) attrs.borderWidth = div.style.borderWidth.replace('px', '');
  if (div.style.borderColor) attrs.borderColor = rgbToHex(div.style.borderColor);
  
  if (div.style.marginLeft && div.style.marginRight && div.style.marginLeft === 'auto' && div.style.marginRight === 'auto') {
    attrs.align = 'center';
  } else {
    if (div.style.marginLeft && div.style.marginLeft !== 'auto') attrs.hspace = div.style.marginLeft.replace('px', '');
    else if (div.style.marginRight && div.style.marginRight !== 'auto') attrs.hspace = div.style.marginRight.replace('px', '');
  }
  
  if (div.style.marginTop) attrs.vspace = div.style.marginTop.replace('px', '');

  if (div.style.float) {
    attrs.align = div.style.float;
  }

  return attrs;
};

export const buildMediaStyle = (attrs: MediaAttributes): string => {
  const div = document.createElement('div');
  
  const ensurePx = (val: string) => {
    if (!val) return '';
    if (!isNaN(Number(val))) return `${val}px`;
    return val;
  };

  const w = ensurePx(attrs.width);
  if (w) div.style.setProperty('width', w, 'important');

  const h = ensurePx(attrs.height);
  if (h) div.style.setProperty('height', h, 'important');

  const bWidth = ensurePx(attrs.borderWidth);
  if (bWidth) {
    div.style.setProperty('border', `${bWidth} solid ${attrs.borderColor || '#000000'}`, 'important');
  }
  
  if (attrs.align === 'center') {
    div.style.setProperty('display', 'block', 'important');
    div.style.setProperty('margin-left', 'auto', 'important');
    div.style.setProperty('margin-right', 'auto', 'important');
  } else if (attrs.align === 'left' || attrs.align === 'right') {
    div.style.setProperty('float', attrs.align, 'important');
  }

  if (attrs.align !== 'center') {
    const hSpace = ensurePx(attrs.hspace);
    if (hSpace) {
      div.style.setProperty('margin-left', hSpace, 'important');
      div.style.setProperty('margin-right', hSpace, 'important');
    }
  }

  const vSpace = ensurePx(attrs.vspace);
  if (vSpace) {
    div.style.setProperty('margin-top', vSpace, 'important');
    div.style.setProperty('margin-bottom', vSpace, 'important');
  }

  return div.style.cssText;
};

export function MediaPropertiesModal({ isOpen, onClose, onSave, initialData, type }: MediaPropertiesModalProps) {
  const [formData, setFormData] = useState<MediaAttributes>({
    url: '', alt: '', width: '', height: '', borderWidth: '', borderColor: '#000000', hspace: '', vspace: '', align: ''
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        url: initialData.url || '',
        alt: initialData.alt || '',
        width: initialData.width || '',
        height: initialData.height || '',
        borderWidth: initialData.borderWidth || '',
        borderColor: initialData.borderColor || '#000000',
        hspace: initialData.hspace || '',
        vspace: initialData.vspace || '',
        align: initialData.align || ''
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle>Thuộc tính {type === 'image' ? 'Hình ảnh' : 'Iframe/Video'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="col-span-2 space-y-1">
            <Label>URL</Label>
            <Input name="url" value={formData.url} onChange={handleChange} placeholder="https://..." disabled className="bg-gray-50" />
            <p className="text-xs text-gray-500 mt-1">URL không thể sửa trực tiếp ở đây, vui lòng chèn lại nếu muốn đổi.</p>
          </div>

          {type === 'image' && (
            <div className="col-span-2 space-y-1">
              <Label>Chú thích ảnh (Alt text)</Label>
              <Input name="alt" value={formData.alt} onChange={handleChange} />
            </div>
          )}

          <div className="space-y-1">
            <Label>Chiều rộng</Label>
            <Input name="width" value={formData.width} onChange={handleChange} placeholder="VD: 100% hoặc 500px" />
          </div>
          <div className="space-y-1">
            <Label>Chiều cao</Label>
            <Input name="height" value={formData.height} onChange={handleChange} placeholder="VD: auto hoặc 300px" />
          </div>

          <div className="space-y-1">
            <Label>Đường viền (Border width)</Label>
            <Input name="borderWidth" value={formData.borderWidth} onChange={handleChange} placeholder="VD: 1px" />
          </div>
          <div className="space-y-1">
            <Label>Màu viền</Label>
            <div className="flex gap-2">
              <Input type="color" name="borderColor" value={formData.borderColor} onChange={handleChange} className="w-12 p-1 h-10 cursor-pointer" />
              <Input name="borderColor" value={formData.borderColor} onChange={handleChange} className="flex-1 font-mono uppercase text-sm" />
            </div>
          </div>

          <div className="space-y-1">
            <Label>Khoảng đệm ngang (HSpace)</Label>
            <Input name="hspace" value={formData.hspace} onChange={handleChange} placeholder="VD: 10px" />
          </div>
          <div className="space-y-1">
            <Label>Khoảng đệm dọc (VSpace)</Label>
            <Input name="vspace" value={formData.vspace} onChange={handleChange} placeholder="VD: 10px" />
          </div>

          <div className="col-span-2 space-y-1">
            <Label>Vị trí (Căn lề)</Label>
            <select name="align" value={formData.align} onChange={handleChange} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="">&lt;không thiết lập&gt;</option>
              <option value="left">Bên trái (Float left)</option>
              <option value="right">Bên phải (Float right)</option>
              <option value="center">Ở giữa (Center block)</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Hủy</Button>
          <Button onClick={handleSave} className="bg-earth-brown hover:bg-earth-brown/90 text-white">Đồng ý</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
