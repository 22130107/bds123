import { getAgentInfo } from "../../../actions/settings-actions";
import { ContactSettingsForm } from "./contact-settings-form";

export default async function SettingsPage() {
  const agentInfo = await getAgentInfo();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Cài đặt Liên hệ & Đại diện</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        <ContactSettingsForm initialData={agentInfo || {}} />
      </div>
    </div>
  );
}
