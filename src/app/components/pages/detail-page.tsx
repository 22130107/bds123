import { TopNavBar } from "../top-nav-bar";
import { PropertyGallery } from "../property-gallery";
import { TechnicalSpecs } from "../technical-specs";
import { AgentCard } from "../agent-card";
import { ConsultationForm } from "../consultation-form";
import { Footer } from "../footer";

interface DetailPageProps {
  onNavigate: (page: string) => void;
}

const villaImages = [
  {
    src: "https://lh3.googleusercontent.com/aida/AP1WRLsoyCcoRDyb4qCggdI8uJ-GoX5IrkzVSDkuyuWPzrb9W9-4PdhLYMy9QJL3wAOuCSHorSMfSSI9LdSwS0PBI5zlngGWT8tC0hmbooHOTnVTsFmOslDwLvClbtyqvhWgT1I6q7A1p9yUBBvlTduYtWnlZWHSCQcAr5osZ9GkL076T1p5IL2OrmNbg_g5Xr3H9KP3x10DVcqBcjFr08xkmmL64GpQEnIdkaRTf02cqH-WygVEftv9GVTdPNI",
    alt: "Biệt thự Riverfront Serenity - Mặt tiền",
  },
  {
    src: "https://lh3.googleusercontent.com/aida/AP1WRLu5WJAXe2DK574g7_n0GT0vsNWSNfaYpiS3TdMkReqeWEEHK-a3CfnBVfmQIYcwycxtQI_u2_NzIPXhRq_yLqXcPuRCBSAEthLcNEz23mvTWgKwwc9Txff0V-IgAoufnIeXYXdfmhgmSLl0s67Jkamr5A4TNUK7nx4vVKLVTKsm04kwLPCdmeqxP6Pta16Nd7U-oujhWVGtHdIt3fCfO4H4E2A_Dhr5Zink1xybP2b7hgB3JEfCYIILnA",
    alt: "Nội thất phòng khách",
  },
  {
    src: "https://lh3.googleusercontent.com/aida/AP1WRLuxGSZNImk81KewFdb_DxFciYp8gDpIbocvbwltcmJcLXdMxdVFwRAtwpa9xwTQN_6w_71ep9F0OqXJALtzzkWKykQk78fu9a3bPyKD9kB4r2vx-rrvx9_Oo_qVkc6AW8yLYYVAee_7TVdM7ZkMryyAKuX2URdvbYNF2GD2FotWyX0-e7MyHIY1lJO9rIeFp9cfmjKbR9jdbO9GsBOdva8PNCkeUqJgGMldlzBozbLoJQ-GZhqPI8xPOIE",
    alt: "Hồ bơi vô cực",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuArfTxcb8sfwUM7Fg_fQ3bm3wNm-ePQqpewaTzOfedvPliLJi2RKTFr8CZSK3IZuvwGaRlVIFlHYbY6z-GIhcxU-MMw4xiOrnIsbrFEpE9BMei0uPBTAQyZDThTnD3AJ7XMiuusUECsyL49yy6AhOVD6FSLS-N-vEDYZ1w126_CYsHuYeJJV1RjM01QQLg3lTtrLfU2ndqFc0ZspxYQQWinWEMLJg1kqxKnVh3Nn7nJzl8TEFq4JmOZ1nGgbo9iXy7rkMlaWg6IdOg",
    alt: "Khu vực ngoài trời",
  },
];

const villaSpecs = [
  { icon: "explore", label: "Hướng nhà", value: "Đông Nam" },
  { icon: "layers", label: "Số tầng", value: "4 tầng" },
  { icon: "bed", label: "Số phòng ngủ", value: "6 PN" },
  { icon: "bathtub", label: "Số phòng tắm/WC", value: "7 WC" },
  { icon: "description", label: "Giấy tờ pháp lý", value: "Sổ đỏ" },
];

const agentInfo = {
  name: "Anh Tuấn Nguyễn",
  title: "Đại diện phân phối dự án",
  phone: "0982 831 582",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB2rsfS1zgIJns5lv7NacWbwu_zuAYC7ZmKEoWUCSPtXtPsO9rSE5ZNQxX7tQMwrjS89ktI-mwmCbi9xNXuBJtXtPm9ivnnq4FiF5ZKnTGy3_n4o5iIigmoExPiKRiA7GlDLAZmWtm9OOvyV_8PDbcxS_z8wYyIJoQPZLLGDk1UCFUVvpfKNx7IYZ2_kl6I9qJpQzRPhjfSJ1-SRzVSNUbcY64z3rFaNSEy9aFzXoc2eHhkMvdEY1A6iSTPhfpJ6tmBRGhIg1DS_X4",
  isOnline: true,
};

export function DetailPage({ onNavigate }: DetailPageProps) {
  return (
    <div className="bg-surface text-on-surface font-body-md" style={{ overflowX: "hidden" }}>
      <TopNavBar activePage="detail" onNavigate={onNavigate} />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-[80px] py-4 flex items-center gap-2 text-on-surface-variant"
             style={{ fontSize: "14px" }}>
          <button onClick={() => onNavigate("home")} className="hover:text-antique-gold transition-colors">Trang chủ</button>
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_right</span>
          <button onClick={() => onNavigate("listing")} className="hover:text-antique-gold transition-colors">Bất động sản</button>
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_right</span>
          <span className="text-primary font-semibold">Riverfront Serenity Villa</span>
        </div>

        {/* Property Header */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-[80px] pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-antique-gold text-white font-label-caps px-3 py-1"
                      style={{ fontSize: "10px", letterSpacing: "0.1em", fontWeight: 700 }}>
                  ĐỘC QUYỀN
                </span>
                <span className="flex items-center gap-1 text-on-surface-variant" style={{ fontSize: "14px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>location_on</span>
                  Thảo Điền, Quận 2, TP. Hồ Chí Minh
                </span>
              </div>
              <h1
                className="font-headline-lg text-primary"
                style={{ fontSize: "32px", lineHeight: "40px", fontWeight: 600 }}
              >
                Biệt thự Riverfront Serenity
              </h1>
            </div>
            <div className="text-right">
              <span className="font-label-caps text-on-surface-variant uppercase" style={{ fontSize: "10px" }}>
                Giá niêm yết
              </span>
              <p
                className="font-price-display text-earth-brown"
                style={{ fontSize: "28px", lineHeight: "32px", fontWeight: 600 }}
              >
                68.500.000.000 ₫
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-[80px] py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            <PropertyGallery images={villaImages} title="Biệt thự Riverfront Serenity" />
            <TechnicalSpecs specs={villaSpecs} />

            {/* Description */}
            <div className="bg-white p-8 shadow-sm border border-outline-variant/30">
              <h3
                className="font-headline-md text-primary mb-6"
                style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600 }}
              >
                Kiệt tác kiến trúc bên sông
              </h3>
              <div className="text-on-surface-variant font-body-lg space-y-4 text-justify"
                   style={{ fontSize: "18px", lineHeight: "28px" }}>
                <p>
                  Biệt thự Riverfront Serenity kiêu hãnh như một biểu tượng của di sản kiến trúc hiện đại ngay tại trái tim Thảo Điền. Được thiết kế bởi những nghệ nhân danh tiếng thế giới, dinh thự này là sự kết hợp hoàn mỹ giữa vẻ đẹp trường tồn của chất liệu gạch đá truyền thống Việt Nam với sự phóng khoáng của kính và thép đương đại.
                </p>
                <p>
                  Với diện tích hơn 650 mét vuông được chăm chút tỉ mỉ, biệt thự mang đến một không gian sống đẳng cấp không đối thủ. Mọi căn phòng đều được định hướng để đón trọn ánh sáng luân chuyển trên dòng sông Sài Gòn, tạo nên một bức tranh sống động thay đổi từ lúc bình minh đến khi hoàng hôn buông xuống.
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <AgentCard {...agentInfo} />
            <ConsultationForm
              defaultMessage='Xin chào, tôi quan tâm đến tin đăng "Biệt thự Riverfront Serenity". Vui lòng liên hệ tư vấn lại cho tôi. Xin cảm ơn!'
            />
          </div>
        </div>
      </main>

      <Footer variant="heritage" />
    </div>
  );
}
