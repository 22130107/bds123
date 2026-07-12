import { getAgentInfo, getSiteTheme } from "../../../actions/settings-actions";
import { ContactSettingsForm } from "./contact-settings-form";
import { ThemeSettingsForm } from "./theme-settings-form";

export default async function SettingsPage() {
  const agentInfo = await getAgentInfo();
  const siteTheme = await getSiteTheme();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Cài đặt Website</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <ThemeSettingsForm initialData={siteTheme || {}} />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <ContactSettingsForm initialData={agentInfo || {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
