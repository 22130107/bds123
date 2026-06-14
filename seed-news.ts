import { pool } from "./src/lib/db";

const newsData = [
  {
    category: "THỊ TRƯỜNG",
    date: "21.01.2025",
    title: "Hạn chế đầu cơ sẽ góp phần bình ổn giá bất động sản",
    excerpt: "Hạn chế đầu cơ có thể giúp ổn định giá bất động sản, đảm bảo phát triển bền vững và tạo sự đồng thuận trong xã hội.",
    img: "https://cdn.xemnha.vn/uploads/han-che-dau-co-se-gop-phan-binh-on-gia-bat-dong-san.jpg",
  },
  {
    category: "QUY HOẠCH",
    date: "25.02.2025",
    title: "Hà Nội chính thức duyệt chủ trương xây cầu Tứ Liên, Trần Hưng Đạo, Ngọc Hồi",
    excerpt: "",
    img: "https://xemnha.vn/uploads/images/hanoi-duyet-chu-truong-xay-cau.jpg",
  },
  {
    category: "THỊ TRƯỜNG",
    date: "10.12.2024",
    title: "Bất động sản khu đô thị “sát vách” Tp.HCM đón sóng đầu tư cuối năm với loạt động thái “lạ”",
    excerpt: "",
    img: "https://cdn.xemnha.vn/uploads/bat-dong-san-khu-do-thi-sat-vach-tphcm-don-song-dau-tu-cuoi-nam-voi-loat-dong-thai-la.jpg",
  },
  {
    category: "NHẬN ĐỊNH",
    date: "27.11.2024",
    title: "Kiến nghị giảm thuế và lãi suất để phát triển nhà ở xã hội",
    excerpt: "",
    img: "https://cdn.xemnha.vn/uploads/kien-nghi-giam-thue-va-lai-suat-de-phat-trien-nha-o-xa-hoi.jpg",
  },
];

async function seed() {
  for (const item of newsData) {
    await pool.query(
      'INSERT INTO news (title, excerpt, content, img, category, date) VALUES (?, ?, ?, ?, ?, ?)',
      [item.title, item.excerpt, '', item.img, item.category, item.date]
    );
  }
  console.log("Seeded news");
  process.exit(0);
}
seed();
