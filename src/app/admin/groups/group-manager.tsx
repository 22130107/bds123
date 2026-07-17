"use client";

import { useState, useTransition, useEffect } from "react";
import { renameGroup, deleteGroup } from "../../../actions/group-actions";
import { toggleGroup } from "../../../actions/group-actions";
import { generateSlug } from "../../../lib/slugify";
import { useRouter } from "next/navigation";

export function GroupManager({ groupName, initialActive }: { groupName: string; initialActive: boolean }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(groupName);
  const [isPending, startTransition] = useTransition();
  const [active, setActive] = useState(initialActive);
  const router = useRouter();

  useEffect(() => { setValue(groupName); }, [groupName]);
  useEffect(() => { setActive(initialActive); }, [initialActive]);

  const handleSave = () => {
    if (!value.trim() || value === groupName) { setEditing(false); return; }
    startTransition(async () => {
      await renameGroup(groupName, value.trim());
      setEditing(false);
      router.refresh();
    });
  };

  return (
    <tr className={`hover:bg-gray-50/50 transition-colors ${active ? "" : "opacity-60"}`}>
      <td className="px-6 py-4">
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") { setEditing(false); setValue(groupName); } }}
              autoFocus
              className="px-3 py-1.5 border border-earth-brown rounded outline-none text-sm w-64"
            />
            <button onClick={handleSave} disabled={isPending} className="text-green-600 hover:text-green-700 text-sm font-medium">
              {isPending ? "..." : "Lưu"}
            </button>
            <button onClick={() => { setEditing(false); setValue(groupName); }} className="text-gray-400 hover:text-gray-600 text-sm">
              Hủy
            </button>
          </div>
        ) : (
          <span className="font-medium text-gray-800">{groupName}</span>
        )}
      </td>
      <td className="px-6 py-4">
        <code className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs font-mono">
          /danh-muc/{generateSlug(groupName)}
        </code>
      </td>
      <td className="px-6 py-4 text-center">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
          active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
        }`}>
          {active ? "Hiện" : "Ẩn"}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => startTransition(async () => {
              const res = await toggleGroup(groupName);
              if (res.success) { setActive(res.is_active); router.refresh(); }
            })}
            disabled={isPending}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              active ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
            title={active ? "Ẩn nhóm" : "Hiện nhóm"}
          >
            <span className="material-symbols-outlined text-[18px]">
              {active ? "visibility" : "visibility_off"}
            </span>
          </button>
          <button
            onClick={() => setEditing(true)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            title="Sửa tên nhóm"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <form action={async () => {
            if (confirm(`Xóa nhóm "${groupName}" và tất cả danh mục trong nhóm?\n\nProject thuộc các danh mục này sẽ được bỏ trống.`)) {
              await deleteGroup(groupName);
              router.refresh();
            }
          }}>
            <button type="submit" className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors" title="Xóa nhóm">
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}
