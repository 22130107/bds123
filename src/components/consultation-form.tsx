import { useState } from "react";
import { submitConsultation } from "../actions/consultation-actions";

interface ConsultationFormProps {
  defaultMessage?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function ConsultationForm({ defaultMessage = "" }: ConsultationFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: defaultMessage,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("phone", formData.phone);
    formDataObj.append("email", formData.email);
    formDataObj.append("message", formData.message);

    const result = await submitConsultation(formDataObj);

    if (result.success) {
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", message: defaultMessage });
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass =
    "w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 focus:border-antique-gold focus:ring-0 transition-colors placeholder:text-outline-variant/60 outline-none font-body-md";

  return (
    <div className="bg-white p-8 shadow-sm border border-outline-variant/30">
      <h4
        className="font-label-caps text-antique-gold mb-6 uppercase tracking-widest"
        style={{ fontSize: "12px", letterSpacing: "0.1em", fontWeight: 700 }}
      >
        Gửi yêu cầu tư vấn
      </h4>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            className="font-label-caps text-outline uppercase block mb-1"
            style={{ fontSize: "10px" }}
          >
            Họ và tên *
          </label>
          <input
            type="text"
            placeholder="Nhập họ tên của bạn"
            value={formData.name}
            onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
            required
            className={inputClass}
            style={{ fontSize: "16px" }}
          />
        </div>
        <div>
          <label
            className="font-label-caps text-outline uppercase block mb-1"
            style={{ fontSize: "10px" }}
          >
            Số điện thoại *
          </label>
          <input
            type="tel"
            placeholder="Nhập số điện thoại liên lạc"
            value={formData.phone}
            onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
            required
            className={inputClass}
            style={{ fontSize: "16px" }}
          />
        </div>
        <div>
          <label
            className="font-label-caps text-outline uppercase block mb-1"
            style={{ fontSize: "10px" }}
          >
            Địa chỉ Email
          </label>
          <input
            type="email"
            placeholder="vidu@email.com"
            value={formData.email}
            onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
            className={inputClass}
            style={{ fontSize: "16px" }}
          />
        </div>
        <div>
          <label
            className="font-label-caps text-outline uppercase block mb-1"
            style={{ fontSize: "10px" }}
          >
            Lời nhắn tư vấn
          </label>
          <textarea
            rows={4}
            placeholder="Nhập lời nhắn..."
            value={formData.message}
            onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
            className={inputClass}
            style={{ fontSize: "16px", resize: "none" }}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full text-white py-4 font-label-caps uppercase tracking-widest hover:bg-forest-deep transition-all active:scale-95 flex items-center justify-center gap-2 ${
            status === "success" ? "bg-moss-green" : status === "error" ? "bg-red-600 hover:bg-red-700" : "bg-moss-green"
          } disabled:opacity-80 disabled:cursor-not-allowed`}
          style={{ fontSize: "12px", letterSpacing: "0.1em", fontWeight: 700 }}
        >
          {status === "loading" ? (
            <>
              <span className="material-symbols-outlined animate-spin" style={{ fontSize: "18px" }}>
                progress_activity
              </span>
              Đang xử lý...
            </>
          ) : status === "success" ? (
            <>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>check_circle</span>
              Đã nhận yêu cầu
            </>
          ) : status === "error" ? (
            <>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>error</span>
              Lỗi! Thử lại
            </>
          ) : (
            <>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>send</span>
              Gửi thông tin liên hệ
            </>
          )}
        </button>
      </form>
    </div>
  );
}
