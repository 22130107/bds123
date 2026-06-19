import { getAgentInfo } from "../../actions/settings-actions";
import { ContactPage } from "../../components/pages/contact-page";

export const metadata = {
  title: "Liên hệ | Happy M - Di sản & Thịnh vượng",
  description: "Kết nối với Happy M để nhận tư vấn và thông tin chi tiết nhất về các dự án bất động sản cao cấp, biệt thự nghỉ dưỡng, căn hộ chung cư hạng sang.",
};

export default async function Page() {
  const agentInfo = await getAgentInfo() || {
    name: "Trịnh Hữu Huynh",
    title: "Đại diện phân phối dự án",
    phone: "0982 831 582",
    zalo: "https://zalo.me/0982831582",
    avatar: "/uploads/1781501143389-avatas-kawaii-avata-color-life-260nw-2318473711.webp",
    isOnline: true,
  };

  return (
    <ContactPage agentInfo={agentInfo} />
  );
}
