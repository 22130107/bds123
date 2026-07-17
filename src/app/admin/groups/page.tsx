import { getGroups } from "../../../actions/group-actions";
import { getCategories } from "../../../actions/category-actions";
import { GroupManager } from "./group-manager";
import { AddGroupForm } from "./add-group-form";

export default async function GroupsPage() {
  const groups = await getGroups();
  const allCats = await getCategories();

  const groupStatus = Object.fromEntries(
    groups.map(g => [g, allCats.some(c => c.group_name === g && c.is_active)])
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quản lý Nhóm danh mục</h2>
          <p className="text-gray-500 text-sm mt-1">Quản lý các nhóm phân loại chính: MUA BÁN, CHO THUÊ, DỰ ÁN...</p>
        </div>
      </div>

      <AddGroupForm />

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-medium">Tên nhóm</th>
              <th className="px-6 py-4 font-medium">Slug URL</th>
              <th className="px-6 py-4 font-medium w-24 text-center">Trạng thái</th>
              <th className="px-6 py-4 font-medium w-52 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {groups.length > 0 ? groups.map((group) => (
              <GroupManager key={group} groupName={group} initialActive={groupStatus[group] ?? true} />
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Chưa có nhóm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
