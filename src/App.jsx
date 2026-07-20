import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Lock, 
  LogOut, 
  User, 
  Shield, 
  BookOpen, 
  CheckCircle, 
  AlertCircle,
  Menu,
  X,
  Key,
  Filter,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Layers,
  Award,
  ClipboardList,
  ChevronRight,
  Download,
  Upload,
  Printer
} from 'lucide-react';

// === DỮ LIỆU CHƯƠNG TRÌNH ĐÀO TẠO CỦA CÁC NGÀNH ===
const INITIAL_SUBJECTS = [
  // === NGÀNH: CÔNG NGHỆ THÔNG TIN (image_304889.png) ===
  { id: 'MH01', name: 'Tiếng Anh', credits: 3, hours: 90, major: 'Công nghệ thông tin', type: 'Các môn học chung' },
  { id: 'MH02', name: 'Tin học', credits: 2, hours: 45, major: 'Công nghệ thông tin', type: 'Các môn học chung' },
  { id: 'MH03', name: 'Giáo dục chính trị', credits: 2, hours: 30, major: 'Công nghệ thông tin', type: 'Các môn học chung' },
  { id: 'MH04', name: 'Pháp luật', credits: 1, hours: 15, major: 'Công nghệ thông tin', type: 'Các môn học chung' },
  { id: 'MH05', name: 'Giáo dục QP-AN', credits: 2, hours: 45, major: 'Công nghệ thông tin', type: 'Các môn học chung' },
  { id: 'MH06', name: 'Giáo dục Thể chất', credits: 1, hours: 30, major: 'Công nghệ thông tin', type: 'Các môn học chung' },
  { id: 'MH07', name: 'Kỹ năng làm việc nhóm', credits: 3, hours: 45, major: 'Công nghệ thông tin', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH08', name: 'Lập trình cơ bản', credits: 2, hours: 60, major: 'Công nghệ thông tin', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH09', name: 'Cấu trúc dữ liệu và giải thuật', credits: 4, hours: 60, major: 'Công nghệ thông tin', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH10', name: 'Cơ sở dữ liệu', credits: 3, hours: 45, major: 'Công nghệ thông tin', type: 'Môn học, mô đun cơ sở' },
  { id: 'MĐ11', name: 'Soạn thảo văn bản', credits: 1.5, hours: 45, major: 'Công nghệ thông tin', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH12', name: 'Phân tích và thiết kế hệ thống thông tin', credits: 3, hours: 45, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ13', name: 'Bảng tính Excel', credits: 1.5, hours: 45, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ14', name: 'Thiết kế bài thuyết trình', credits: 1.5, hours: 45, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH15', name: 'Mạng máy tính', credits: 3, hours: 45, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH16', name: 'Quản trị cơ sở dữ liệu với Access', credits: 2, hours: 60, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH17', name: 'Cấu trúc và bảo trì máy tính', credits: 5, hours: 75, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ18', name: 'Photoshop cơ bản', credits: 1.5, hours: 45, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH19', name: 'AutoCAD cơ bản', credits: 1.5, hours: 45, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH20', name: 'Thiết kế trang Web', credits: 2, hours: 60, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH21', name: 'Thiết kế và lắp đặt hệ thống mạng', credits: 2, hours: 60, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH22', name: 'Quản trị CSDL với SQL server', credits: 2, hours: 60, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH23', name: 'Thực hành nghề nghiệp 1', credits: 4, hours: 120, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ24', name: 'Thực hành nghề nghiệp 2', credits: 4, hours: 180, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH25', name: 'Kỹ năng giao tiếp', credits: 2, hours: 30, major: 'Công nghệ thông tin', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH26', name: 'Khởi tạo doanh nghiệp', credits: 2, hours: 30, major: 'Công nghệ thông tin', type: 'Môn học, mô đun tự chọn' },

  // === NGÀNH: CHĂM SÓC SẮC ĐẸP ===
  { id: 'MH01', name: 'Tiếng Anh', credits: 3, hours: 90, major: 'Chăm sóc sắc đẹp', type: 'Các môn học chung' },
  { id: 'MH02', name: 'Tin học', credits: 2, hours: 45, major: 'Chăm sóc sắc đẹp', type: 'Các môn học chung' },
  { id: 'MH03', name: 'Giáo dục chính trị', credits: 2, hours: 30, major: 'Chăm sóc sắc đẹp', type: 'Các môn học chung' },
  { id: 'MH04', name: 'Pháp luật', credits: 1, hours: 15, major: 'Chăm sóc sắc đẹp', type: 'Các môn học chung' },
  { id: 'MH05', name: 'Giáo dục QP-AN', credits: 2, hours: 45, major: 'Chăm sóc sắc đẹp', type: 'Các môn học chung' },
  { id: 'MH06', name: 'Giáo dục Thể chất', credits: 1, hours: 30, major: 'Chăm sóc sắc đẹp', type: 'Các môn học chung' },
  { id: 'MH07', name: 'Tổng quan ngành chăm sóc sắc đẹp', credits: 2, hours: 30, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH08', name: 'Kỹ năng giao tiếp - đạo đức nghề nghiệp', credits: 4, hours: 60, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH09', name: 'Mỹ thuật', credits: 1.5, hours: 45, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH10', name: 'Giải phẫu - sinh lý', credits: 3, hours: 45, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH11', name: 'Hương liệu hóa mỹ phẩm', credits: 3, hours: 45, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH12', name: 'Phòng chống lây nhiễm các bệnh qua đường máu và dịch sinh học', credits: 2, hours: 30, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ13', name: 'Chăm sóc da', credits: 2.5, hours: 75, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ14', name: 'Chăm sóc móng', credits: 3, hours: 90, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH15', name: 'Phun thêu, khắc thẩm mỹ', credits: 3, hours: 90, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ16', name: 'Trang điểm nghệ thuật', credits: 3, hours: 90, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ17', name: 'Chăm sóc tóc', credits: 3, hours: 90, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH18', name: 'Massage dưỡng sinh', credits: 2, hours: 60, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ19', name: 'Massage body', credits: 3, hours: 90, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH20', name: 'Thực hành nghề nghiệp 1', credits: 4, hours: 120, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ21', name: 'Thực hành nghề nghiệp 2', credits: 4, hours: 180, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH22', name: 'Khởi tạo doanh nghiệp', credits: 2, hours: 30, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH23', name: 'Quản lý cơ sở làm đẹp', credits: 2, hours: 30, major: 'Chăm sóc sắc đẹp', type: 'Môn học, mô đun tự chọn' },

  // === NGÀNH: KỸ THUẬT PHA CHẾ ĐỒ UỐNG ===
  { id: 'MH01', name: 'Tiếng Anh', credits: 3, hours: 90, major: 'Kỹ thuật pha chế đồ uống', type: 'Các môn học chung' },
  { id: 'MH02', name: 'Tin học', credits: 2, hours: 45, major: 'Kỹ thuật pha chế đồ uống', type: 'Các môn học chung' },
  { id: 'MH03', name: 'Giáo dục chính trị', credits: 2, hours: 30, major: 'Kỹ thuật pha chế đồ uống', type: 'Các môn học chung' },
  { id: 'MH04', name: 'Pháp luật', credits: 1, hours: 15, major: 'Kỹ thuật pha chế đồ uống', type: 'Các môn học chung' },
  { id: 'MH05', name: 'Giáo dục QP-AN', credits: 2, hours: 45, major: 'Kỹ thuật pha chế đồ uống', type: 'Các môn học chung' },
  { id: 'MH06', name: 'Giáo dục Thể chất', credits: 1, hours: 30, major: 'Kỹ thuật pha chế đồ uống', type: 'Các môn học chung' },
  { id: 'MH07', name: 'Tổng quan du lịch và khách sạn', credits: 2, hours: 30, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH08', name: 'Tâm lý và kỹ năng giao tiếp ứng xử với khách du lịch', credits: 2, hours: 60, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH09', name: 'Văn hóa ẩm thực', credits: 2, hours: 30, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH10', name: 'An toàn thực phẩm, thương phẩm hàng thực phẩm', credits: 3, hours: 45, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH11', name: 'An toàn, an ninh trong quầy bar', credits: 2, hours: 30, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH12', name: 'Nghiệp vụ nhà hàng', credits: 2, hours: 60, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH13', name: 'Tổ chức kỹ thuật quầy bar', credits: 2, hours: 30, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH14', name: 'Lý thuyết pha chế đồ uống', credits: 3, hours: 45, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ15', name: 'Kỹ thuật trang trí đồ uống', credits: 1.5, hours: 45, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ16', name: 'Kỹ thuật pha chế và phục vụ thức uống không cồn', credits: 4, hours: 120, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ17', name: 'Kỹ thuật pha chế và phục vụ thức uống có cồn', credits: 4, hours: 120, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH18', name: 'Kỹ thuật pha chế cà phê máy', credits: 2, hours: 60, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH19', name: 'Kỹ thuật biểu diễn (Flair Bartending)', credits: 2.5, hours: 75, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ20', name: 'Xây dựng danh mục đồ uống', credits: 1.5, hours: 45, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH21', name: 'Khởi tạo doanh nghiệp', credits: 1.5, hours: 45, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH22', name: 'Thực hành nghề nghiệp 1', credits: 4, hours: 120, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ23', name: 'Thực hành nghề nghiệp 2', credits: 4, hours: 180, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH24', name: 'Marketing sản phẩm đồ uống', credits: 2, hours: 30, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH25', name: 'Kỹ năng làm việc nhóm', credits: 2, hours: 30, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH26', name: 'Kỹ thuật tổ chức phục vụ buffet', credits: 2, hours: 30, major: 'Kỹ thuật pha chế đồ uống', type: 'Môn học, mô đun tự chọn' },

  // === NGÀNH: TẠO MẪU VÀ CHĂM SÓC SẮC ĐẸP (image_033380.png) ===
  { id: 'MH01', name: 'Tiếng Anh', credits: 3, hours: 90, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Các môn học chung' },
  { id: 'MH02', name: 'Tin học', credits: 2, hours: 45, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Các môn học chung' },
  { id: 'MH03', name: 'Giáo dục chính trị', credits: 2, hours: 30, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Các môn học chung' },
  { id: 'MH04', name: 'Pháp luật', credits: 1, hours: 15, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Các môn học chung' },
  { id: 'MH05', name: 'Giáo dục QP-AN', credits: 2, hours: 45, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Các môn học chung' },
  { id: 'MH06', name: 'Giáo dục Thể chất', credits: 1, hours: 30, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Các môn học chung' },
  { id: 'MH07', name: 'Tổng quan ngành Tạo mẫu và chăm sóc sắc đẹp', credits: 2, hours: 30, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH08', name: 'Kỹ năng giao tiếp - đạo đức nghề nghiệp', credits: 4, hours: 60, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH09', name: 'Mỹ thuật', credits: 3, hours: 45, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH10', name: 'Giải phẫu - sinh lý', credits: 3, hours: 45, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH11', name: 'Hương liệu hóa mỹ phẩm', credits: 3, hours: 45, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH12', name: 'Phòng chống lây nhiễm các bệnh qua đường máu và dịch sinh học', credits: 2, hours: 30, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ13', name: 'Chăm sóc da', credits: 3, hours: 90, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ14', name: 'Tạo mẫu và chăm sóc móng', credits: 3, hours: 90, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH15', name: 'Phun thêu thẩm mỹ', credits: 2, hours: 60, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ16', name: 'Trang điểm nghệ thuật', credits: 3, hours: 90, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH17', name: 'Tạo mẫu và Chăm sóc tóc', credits: 2, hours: 60, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ18', name: 'Massage dưỡng sinh', credits: 2, hours: 60, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH19', name: 'Nối mi nghệ thuật (tăng 15t)', credits: 2.5, hours: 75, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH20', name: 'Quản lý cơ sở làm đẹp', credits: 3, hours: 45, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH21', name: 'Thực hành nghề nghiệp 1', credits: 4, hours: 120, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ22', name: 'Thực hành nghề nghiệp 2', credits: 4, hours: 180, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH23', name: 'Khởi tạo doanh nghiệp', credits: 3, hours: 45, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH24', name: 'Kỹ năng làm việc nhóm', credits: 3, hours: 45, major: 'Tạo mẫu và chăm sóc sắc đẹp', type: 'Môn học, mô đun tự chọn' },

  // === NGÀNH: KỸ THUẬT PHA CHẾ VÀ PHỤC VỤ ĐỒ UỐNG (image_0333b9.png) ===
  { id: 'MH01', name: 'Tiếng Anh', credits: 3, hours: 90, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Các môn học chung' },
  { id: 'MH02', name: 'Tin học', credits: 2, hours: 45, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Các môn học chung' },
  { id: 'MH03', name: 'Giáo dục chính trị', credits: 2, hours: 30, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Các môn học chung' },
  { id: 'MH04', name: 'Pháp luật', credits: 1, hours: 15, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Các môn học chung' },
  { id: 'MH05', name: 'Giáo dục QP-AN', credits: 2, hours: 45, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Các môn học chung' },
  { id: 'MH06', name: 'Giáo dục Thể chất', credits: 1, hours: 30, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Các môn học chung' },
  { id: 'MH07', name: 'Tổng quan du lịch và khách sạn', credits: 2, hours: 30, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH08', name: 'Tâm lý và kỹ năng giao tiếp ứng xử với khách du lịch', credits: 1.5, hours: 45, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH09', name: 'Văn hoá ẩm thực', credits: 3, hours: 45, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH10', name: 'An toàn thực phẩm, thương phẩm hàng thực phẩm', credits: 3, hours: 45, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH11', name: 'An toàn, an ninh trong quầy bar', credits: 3, hours: 45, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun cơ sở' },
  { id: 'MĐ12', name: 'Nghiệp vụ nhà hàng', credits: 1.5, hours: 45, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH13', name: 'Nghiệp vụ bán hàng và chăm sóc khách hàng', credits: 4, hours: 60, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH14', name: 'Tổ chức kỹ thuật quầy bar', credits: 2, hours: 30, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH15', name: 'Lý thuyết pha chế đồ uống', credits: 3, hours: 45, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ16', name: 'Kỹ thuật trang trí đồ uống', credits: 1, hours: 30, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ17', name: 'Kỹ thuật pha chế và phục vụ thức uống không cồn', credits: 4, hours: 120, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH18', name: 'Kỹ thuật pha chế và phục vụ thức uống có cồn', credits: 4, hours: 120, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH19', name: 'Tiếng anh chuyên ngành', credits: 3, hours: 45, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH20', name: 'Kỹ thuật biểu diễn (Flair Bartending)', credits: 2.5, hours: 75, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH21', name: 'Xây dựng danh mục đồ uống', credits: 1.5, hours: 45, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH22', name: 'Thực hành nghề nghiệp 1', credits: 4, hours: 120, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ23', name: 'Thực hành nghề nghiệp 2', credits: 4, hours: 180, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH24', name: 'Hoạch toán định mức', credits: 2, hours: 30, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH25', name: 'Kỹ năng giao tiếp', credits: 2, hours: 30, major: 'Kỹ thuật pha chế và phục vụ đồ uống', type: 'Môn học, mô đun tự chọn' },

  // === NGÀNH: KỸ THUẬT CHẾ BIẾN MÓN ĂN (image_952fc6.png) ===
  { id: 'MH01', name: 'Tiếng Anh', credits: 3, hours: 90, major: 'Kỹ thuật chế biến món ăn', type: 'Các môn học chung' },
  { id: 'MH02', name: 'Tin học', credits: 2, hours: 45, major: 'Kỹ thuật chế biến món ăn', type: 'Các môn học chung' },
  { id: 'MH03', name: 'Giáo dục chính trị', credits: 2, hours: 30, major: 'Kỹ thuật chế biến món ăn', type: 'Các môn học chung' },
  { id: 'MH04', name: 'Pháp luật', credits: 1, hours: 15, major: 'Kỹ thuật chế biến món ăn', type: 'Các môn học chung' },
  { id: 'MH05', name: 'Giáo dục QP-AN', credits: 2, hours: 45, major: 'Kỹ thuật chế biến món ăn', type: 'Các môn học chung' },
  { id: 'MH06', name: 'Giáo dục Thể chất', credits: 1, hours: 30, major: 'Kỹ thuật chế biến món ăn', type: 'Các môn học chung' },
  { id: 'MH07', name: 'Tổng quan du lịch và khách sạn', credits: 2, hours: 30, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH08', name: 'Tâm lý và kỹ năng giao tiếp ứng xử với khách du lịch', credits: 1.5, hours: 45, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH09', name: 'Văn hoá ẩm thực', credits: 3, hours: 45, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH10', name: 'An toàn thực phẩm, thương phẩm hàng thực phẩm', credits: 4, hours: 60, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH11', name: 'Sinh lý dinh dưỡng', credits: 3, hours: 45, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH12', name: 'Nghiệp vụ nhà hàng', credits: 1.5, hours: 45, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH13', name: 'Tổ chức an toàn lao động cơ sở vật chất và kỹ thuật của bộ phận bếp', credits: 3, hours: 45, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH14', name: 'Thao tác cơ bản trong chế biến món ăn', credits: 1.5, hours: 45, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH15', name: 'Lý thuyết Kỹ thuật chế biến món ăn', credits: 6, hours: 90, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ16', name: 'Thực hành chế biến món Âu', credits: 3, hours: 90, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ17', name: 'Thực hành chế biến món Á', credits: 4, hours: 120, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ18', name: 'Thực hành kỹ thuật cắt tỉa và trang trí món ăn', credits: 2, hours: 60, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ19', name: 'Thực hành làm bánh và một số món ăn tráng miệng', credits: 2.5, hours: 75, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH20', name: 'Phương pháp xây dựng thực đơn', credits: 1.5, hours: 45, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH21', name: 'Thực hành nghề nghiệp 1', credits: 4, hours: 120, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ22', name: 'Thực hành nghề nghiệp 2', credits: 4, hours: 180, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH23', name: 'Hạch toán định mức', credits: 2, hours: 30, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH24', name: 'Khởi tạo doanh nghiệp', credits: 2, hours: 30, major: 'Kỹ thuật chế biến món ăn', type: 'Môn học, mô đun tự chọn' },

  // === NGÀNH: HƯỚNG DẪN DU LỊCH (image_952f05.png) ===
  { id: 'MH01', name: 'Tiếng Anh', credits: 3, hours: 90, major: 'Hướng dẫn du lịch', type: 'Các môn học chung' },
  { id: 'MH02', name: 'Tin học', credits: 2, hours: 45, major: 'Hướng dẫn du lịch', type: 'Các môn học chung' },
  { id: 'MH03', name: 'Giáo dục chính trị', credits: 2, hours: 30, major: 'Hướng dẫn du lịch', type: 'Các môn học chung' },
  { id: 'MH04', name: 'Pháp luật', credits: 1, hours: 15, major: 'Hướng dẫn du lịch', type: 'Các môn học chung' },
  { id: 'MH05', name: 'Giáo dục QP-AN', credits: 2, hours: 45, major: 'Hướng dẫn du lịch', type: 'Các môn học chung' },
  { id: 'MH06', name: 'Giáo dục Thể chất', credits: 1, hours: 30, major: 'Hướng dẫn du lịch', type: 'Các môn học chung' },
  { id: 'MH07', name: 'Lịch sử Việt Nam', credits: 3, hours: 45, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH08', name: 'Địa lý du lịch Việt Nam', credits: 3, hours: 45, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH09', name: 'Hệ thống di tích lịch sử, văn hóa và danh lam thắng cảnh ở Việt Nam', credits: 1.5, hours: 45, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH10', name: 'Cơ sở văn hóa Việt Nam', credits: 2, hours: 30, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH11', name: 'Văn hóa ẩm thực', credits: 3, hours: 45, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH12', name: 'Tổng quan du lịch và khách sạn', credits: 4, hours: 60, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH13', name: 'Tâm lý và kỹ năng giao tiếp ứng xử với khách du lịch', credits: 2, hours: 60, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH14', name: 'Nghiệp vụ nhà hàng', credits: 1.5, hours: 45, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ15', name: 'Lễ tân du lịch', credits: 2, hours: 60, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH16', name: 'Pháp luật du lịch', credits: 4, hours: 60, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH17', name: 'Tuyến điểm du lịch', credits: 1.5, hours: 45, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ18', name: 'Nghiệp vụ du lịch lữ hành', credits: 2.5, hours: 75, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH19', name: 'Tiếng Anh chuyên ngành', credits: 2, hours: 60, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH20', name: 'Marketing du lịch', credits: 1.5, hours: 45, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ21', name: 'Nghiệp vụ hướng dẫn du lịch', credits: 2.5, hours: 75, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH22', name: 'Môi trường An ninh - An toàn trong Du lịch', credits: 3, hours: 45, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH23', name: 'Thực hành nghề nghiệp 1', credits: 4, hours: 120, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ24', name: 'Thực hành nghề nghiệp 2', credits: 4, hours: 180, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH25', name: 'Tổ chức sự kiện', credits: 3, hours: 45, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH26', name: 'Khởi tạo doanh nghiệp', credits: 3, hours: 45, major: 'Hướng dẫn du lịch', type: 'Môn học, mô đun tự chọn' },

  // === NGÀNH: KỸ THUẬT LÀM BÁNH (image_a01092.png) ===
  { id: 'MH01', name: 'Tiếng Anh', credits: 3, hours: 90, major: 'Kỹ thuật làm bánh', type: 'Các môn học chung' },
  { id: 'MH02', name: 'Tin học', credits: 2, hours: 45, major: 'Kỹ thuật làm bánh', type: 'Các môn học chung' },
  { id: 'MH03', name: 'Giáo dục chính trị', credits: 2, hours: 30, major: 'Kỹ thuật làm bánh', type: 'Các môn học chung' },
  { id: 'MH04', name: 'Pháp luật', credits: 1, hours: 15, major: 'Kỹ thuật làm bánh', type: 'Các môn học chung' },
  { id: 'MH05', name: 'Giáo dục QP-AN', credits: 2, hours: 45, major: 'Kỹ thuật làm bánh', type: 'Các môn học chung' },
  { id: 'MH06', name: 'Giáo dục Thể chất', credits: 1, hours: 30, major: 'Kỹ thuật làm bánh', type: 'Các môn học chung' },
  { id: 'MH07', name: 'Tổng quan du lịch và khách sạn', credits: 2, hours: 30, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH08', name: 'Sinh lý dinh dưỡng', credits: 3, hours: 45, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH09', name: 'Tâm lý và kỹ năng giao tiếp ứng xử với khách du lịch', credits: 2, hours: 30, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH10', name: 'Tổ chức an toàn lao động cơ sở vật chất kỹ thuật trong bộ phận bếp', credits: 3, hours: 45, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH11', name: 'An toàn thực phẩm, thương phẩm hàng thực phẩm', credits: 3, hours: 45, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH12', name: 'Nghiệp vụ bán hàng và chăm sóc khách hàng', credits: 4, hours: 60, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH13', name: 'Nghiệp vụ nhà hàng', credits: 1.5, hours: 45, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH14', name: 'Lý thuyết về kỹ thuật chế biến bánh', credits: 5, hours: 75, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ15', name: 'Kỹ thuật chế biến bánh Á', credits: 5, hours: 120, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH16', name: 'Kỹ thuật trang trí trong chế biến bánh', credits: 2, hours: 60, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ17', name: 'Kỹ thuật chế biến bánh Âu', credits: 7, hours: 180, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ18', name: 'Kỹ thuật chế biến bánh tráng miệng', credits: 3, hours: 75, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH19', name: 'Thực hành nghề nghiệp 1', credits: 4, hours: 120, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ20', name: 'Thực hành nghề nghiệp 2', credits: 4, hours: 180, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH21', name: 'Hạch toán định mức', credits: 3, hours: 45, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH22', name: 'Văn hóa ẩm thực', credits: 3, hours: 45, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH23', name: 'Lý thuyết chế biến bánh lạnh', credits: 3, hours: 45, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH24', name: 'Lý thuyết chế biến bánh dành cho người ăn kiêng', credits: 3, hours: 45, major: 'Kỹ thuật làm bánh', type: 'Môn học, mô đun tự chọn' },

  // === NGÀNH: MAY THỜI TRANG (image_a00d0c.png) ===
  { id: 'MH01', name: 'Tiếng Anh', credits: 3, hours: 90, major: 'May thời trang', type: 'Các môn học chung' },
  { id: 'MH02', name: 'Tin học', credits: 2, hours: 45, major: 'May thời trang', type: 'Các môn học chung' },
  { id: 'MH03', name: 'Giáo dục chính trị', credits: 2, hours: 30, major: 'May thời trang', type: 'Các môn học chung' },
  { id: 'MH04', name: 'Pháp luật', credits: 1, hours: 15, major: 'May thời trang', type: 'Các môn học chung' },
  { id: 'MH05', name: 'Giáo dục QP-AN', credits: 2, hours: 45, major: 'May thời trang', type: 'Các môn học chung' },
  { id: 'MH06', name: 'Giáo dục Thể chất', credits: 1, hours: 30, major: 'May thời trang', type: 'Các môn học chung' },
  { id: 'MH07', name: 'Vẽ kỹ thuật ngành may', credits: 2, hours: 30, major: 'May thời trang', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH08', name: 'Nhân trắc học', credits: 2, hours: 30, major: 'May thời trang', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH09', name: 'Cơ sở thiết kế trang phục', credits: 2, hours: 30, major: 'May thời trang', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH10', name: 'Vật liệu may, công nghệ là', credits: 2, hours: 30, major: 'May thời trang', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH11', name: 'An toàn lao động', credits: 1, hours: 20, major: 'May thời trang', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH12', name: 'Thiết bị ngành may', credits: 3, hours: 45, major: 'May thời trang', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH13', name: 'Thiết kế trang phục 1', credits: 3.5, hours: 110, major: 'May thời trang', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH14', name: 'May sơ mi nam, nữ', credits: 3.5, hours: 110, major: 'May thời trang', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH15', name: 'May quần âu nam, nữ', credits: 3.5, hours: 110, major: 'May thời trang', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ16', name: 'Thiết kế trang phục 2', credits: 3, hours: 90, major: 'May thời trang', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH17', name: 'May áo jacket nam', credits: 3.5, hours: 110, major: 'May thời trang', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ18', name: 'May các sản phẩm nâng cao', credits: 2.5, hours: 75, major: 'May thời trang', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH19', name: 'May váy, áo váy', credits: 3.5, hours: 110, major: 'May thời trang', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH20', name: 'Công nghệ sản xuất', credits: 3, hours: 45, major: 'May thời trang', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH21', name: 'Quản lý chất lượng sản phẩm', credits: 2, hours: 30, major: 'May thời trang', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ22', name: 'Cắt may thời trang sơ mi, quần âu', credits: 4, hours: 90, major: 'May thời trang', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH23', name: 'Thực hành nghề nghiệp 1', credits: 4, hours: 120, major: 'May thời trang', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ24', name: 'Thực hành nghề nghiệp 2', credits: 4, hours: 180, major: 'May thời trang', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH25', name: 'Kỹ năng giao tiếp', credits: 2, hours: 30, major: 'May thời trang', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH26', name: 'Khởi tạo doanh nghiệp', credits: 2, hours: 30, major: 'May thời trang', type: 'Môn học, mô đun tự chọn' },

  // === NGÀNH: KỸ THUẬT MÁY LẠNH VÀ ĐIỀU HÒA KHÔNG KHÍ (image_a01168.png) ===
  { id: 'MH01', name: 'Tiếng Anh', credits: 3, hours: 90, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Các môn học chung' },
  { id: 'MH02', name: 'Tin học', credits: 2, hours: 45, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Các môn học chung' },
  { id: 'MH03', name: 'Giáo dục chính trị', credits: 2, hours: 30, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Các môn học chung' },
  { id: 'MH04', name: 'Pháp luật', credits: 1, hours: 15, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Các môn học chung' },
  { id: 'MH05', name: 'Giáo dục QP-AN', credits: 2, hours: 45, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Các môn học chung' },
  { id: 'MH06', name: 'Giáo dục Thể chất', credits: 1, hours: 30, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Các môn học chung' },
  { id: 'MH07', name: 'Kỹ năng làm việc nhóm', credits: 3, hours: 45, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH08', name: 'An toàn lao động điện lạnh và vệ sinh công nghiệp', credits: 2, hours: 30, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH09', name: 'Kỹ thuật điện tử', credits: 2, hours: 30, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH10', name: 'Cơ sở kỹ thuật nhiệt - lạnh và điều hòa không khí', credits: 5, hours: 75, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH11', name: 'Vật liệu điện lạnh', credits: 4, hours: 60, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH12', name: 'Cơ sở kỹ thuật điện', credits: 4, hours: 60, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun cơ sở' },
  { id: 'MĐ13', name: 'Đo lường điện - lạnh', credits: 2, hours: 60, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ14', name: 'Điện dân dụng và công nghiệp', credits: 2, hours: 60, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH15', name: 'Trang bị điện', credits: 2.5, hours: 75, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ16', name: 'Lạnh cơ bản', credits: 4, hours: 120, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH17', name: 'Điều hòa không khí ô tô', credits: 2.5, hours: 75, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ18', name: 'Hệ thống máy lạnh dân dụng và thương nghiệp', credits: 3, hours: 90, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ19', name: 'Hệ thống điều hòa không khí cục bộ', credits: 3, hours: 90, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH20', name: 'Hệ thống máy lạnh công nghiệp', credits: 3, hours: 90, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ21', name: 'Hệ thống điều hòa không khí trung tâm', credits: 3, hours: 90, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH22', name: 'Thực hành nghề nghiệp 1', credits: 4, hours: 120, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ23', name: 'Thực hành nghề nghiệp 2', credits: 4, hours: 180, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH24', name: 'Kỹ năng giao tiếp', credits: 3, hours: 45, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH25', name: 'Khởi tạo doanh nghiệp', credits: 3, hours: 45, major: 'Kỹ thuật máy lạnh và điều hoà không khí', type: 'Môn học, mô đun tự chọn' },

  // === NGÀNH: TIẾNG NHẬT (image_0336e2.png) ===
  { id: 'MH01', name: 'Tiếng Anh', credits: 3, hours: 90, major: 'Tiếng Nhật', type: 'Các môn học chung' },
  { id: 'MH02', name: 'Tin học', credits: 2, hours: 45, major: 'Tiếng Nhật', type: 'Các môn học chung' },
  { id: 'MH03', name: 'Giáo dục chính trị', credits: 2, hours: 30, major: 'Tiếng Nhật', type: 'Các môn học chung' },
  { id: 'MH04', name: 'Pháp luật', credits: 1, hours: 15, major: 'Tiếng Nhật', type: 'Các môn học chung' },
  { id: 'MH05', name: 'Giáo dục QP-AN', credits: 2, hours: 45, major: 'Tiếng Nhật', type: 'Các môn học chung' },
  { id: 'MH06', name: 'Giáo dục Thể chất', credits: 1, hours: 30, major: 'Tiếng Nhật', type: 'Các môn học chung' },
  { id: 'MH07', name: 'Kỹ năng giao tiếp', credits: 3, hours: 45, major: 'Tiếng Nhật', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH08', name: 'Tiếng Việt thực hành', credits: 1.5, hours: 45, major: 'Tiếng Nhật', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH09', name: 'Lịch sử Văn hóa - Xã hội Nhật Bản', credits: 3, hours: 45, major: 'Tiếng Nhật', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH10', name: 'Ngữ pháp Tiếng Nhật 1', credits: 3, hours: 45, major: 'Tiếng Nhật', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH11', name: 'Ngữ pháp Tiếng Nhật 2', credits: 3, hours: 45, major: 'Tiếng Nhật', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH12', name: 'Đọc hiểu Tiếng Nhật 1', credits: 2.5, hours: 75, major: 'Tiếng Nhật', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH13', name: 'Đọc hiểu Tiếng Nhật 2', credits: 2, hours: 60, major: 'Tiếng Nhật', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ14', name: 'Đọc hiểu Tiếng Nhật 3', credits: 2, hours: 60, major: 'Tiếng Nhật', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH15', name: 'Viết Tiếng Nhật 1', credits: 5, hours: 75, major: 'Tiếng Nhật', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH16', name: 'Viết Tiếng Nhật 2', credits: 2, hours: 60, major: 'Tiếng Nhật', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ17', name: 'Viết Tiếng Nhật 3', credits: 2, hours: 60, major: 'Tiếng Nhật', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH18', name: 'Nghe - Nói tiếng Nhật 1', credits: 5, hours: 75, major: 'Tiếng Nhật', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH19', name: 'Nghe - Nói tiếng Nhật 2', credits: 2.5, hours: 75, major: 'Tiếng Nhật', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ20', name: 'Nghe - Nói tiếng Nhật 3', credits: 2.5, hours: 75, major: 'Tiếng Nhật', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH21', name: 'Thực hành nghề nghiệp 1', credits: 4, hours: 120, major: 'Tiếng Nhật', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ22', name: 'Thực hành nghề nghiệp 2', credits: 4, hours: 180, major: 'Tiếng Nhật', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH23', name: 'Tiếng Nhật thương mại', credits: 3, hours: 45, major: 'Tiếng Nhật', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH24', name: 'Tiếng Nhật du lịch', credits: 3, hours: 45, major: 'Tiếng Nhật', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH25', name: 'Khởi tạo doanh nghiệp', credits: 3, hours: 45, major: 'Tiếng Nhật', type: 'Môn học, mô đun tự chọn' },

  // === NGÀNH: TIẾNG TRUNG QUỐC (image_03371f.png) ===
  { id: 'MH01', name: 'Tiếng Anh', credits: 3, hours: 90, major: 'Tiếng Trung Quốc', type: 'Các môn học chung' },
  { id: 'MH02', name: 'Tin học', credits: 2, hours: 45, major: 'Tiếng Trung Quốc', type: 'Các môn học chung' },
  { id: 'MH03', name: 'Giáo dục chính trị', credits: 2, hours: 30, major: 'Tiếng Trung Quốc', type: 'Các môn học chung' },
  { id: 'MH04', name: 'Pháp luật', credits: 1, hours: 15, major: 'Tiếng Trung Quốc', type: 'Các môn học chung' },
  { id: 'MH05', name: 'Giáo dục QP-AN', credits: 2, hours: 45, major: 'Tiếng Trung Quốc', type: 'Các môn học chung' },
  { id: 'MH06', name: 'Giáo dục Thể chất', credits: 1, hours: 30, major: 'Tiếng Trung Quốc', type: 'Các môn học chung' },
  { id: 'MH07', name: 'Kỹ năng giao tiếp', credits: 1.5, hours: 45, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH08', name: 'Tiếng Việt thực hành', credits: 1.5, hours: 45, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH09', name: 'Lịch sử Văn hóa - Xã hội Trung Quốc', credits: 3, hours: 45, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun cơ sở' },
  { id: 'MH10', name: 'Kỹ năng nghe nói 1', credits: 2.5, hours: 75, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH11', name: 'Kỹ năng đọc hiểu 1', credits: 2.5, hours: 75, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH12', name: 'Ngữ pháp cơ bản', credits: 5, hours: 75, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ13', name: 'Tiếng Trung tổng hợp 1', credits: 3, hours: 90, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH14', name: 'Kỹ năng nghe nói 2', credits: 2, hours: 60, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH15', name: 'Kỹ năng đọc hiểu 2', credits: 2, hours: 60, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH16', name: 'Ngữ pháp nâng cao', credits: 5, hours: 75, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ17', name: 'Tiếng Trung tổng hợp 2', credits: 3, hours: 90, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH18', name: 'Viết văn bản thương mại', credits: 3, hours: 90, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH19', name: 'Thực hành nghề nghiệp 1', credits: 4, hours: 120, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MĐ20', name: 'Thực hành nghề nghiệp 2', credits: 4, hours: 180, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun chuyên môn' },
  { id: 'MH21', name: 'Khẩu ngữ tiếng Trung thương mại', credits: 3, hours: 45, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH22', name: 'Khẩu ngữ tiếng Trung du lịch', credits: 3, hours: 45, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun tự chọn' },
  { id: 'MH23', name: 'Khởi tạo doanh nghiệp', credits: 3, hours: 45, major: 'Tiếng Trung Quốc', type: 'Môn học, mô đun tự chọn' }
];

const INITIAL_COURSES = [
  { id: 'KH001', name: 'Công nghệ thông tin' },
  { id: 'KH002', name: 'Chăm sóc sắc đẹp' },
  { id: 'KH003', name: 'Kỹ thuật pha chế đồ uống' },
  { id: 'KH004', name: 'Kỹ thuật chế biến món ăn' },
  { id: 'KH005', name: 'Hướng dẫn du lịch' },
  { id: 'KH006', name: 'Kỹ thuật làm bánh' },
  { id: 'KH007', name: 'May thời trang' },
  { id: 'KH008', name: 'Kỹ thuật máy lạnh và điều hoà không khí' },
  { id: 'KH009', name: 'Tạo mẫu và chăm sóc sắc đẹp' },
  { id: 'KH010', name: 'Kỹ thuật pha chế và phục vụ đồ uống' },
  { id: 'KH011', name: 'Tiếng Nhật' },
  { id: 'KH012', name: 'Tiếng Trung Quốc' }
];

// === DANH SÁCH LỚP HỌC HÀNH CHÍNH ===
const INITIAL_CLASSES = [
 ];

// === DANH SÁCH ĐĂNG KÝ HỌC ===
const INITIAL_ENROLLMENTS = [
];

// === DANH SÁCH ĐIỂM SỐ BAN ĐẦU (Theo mô hình điểm tổng kết hệ 10) ===
const INITIAL_GRADES = [
];

// === DANH SÁCH LỊCH HỌC BAN ĐẦU ===
const INITIAL_SCHEDULES = [
];

// === DANH SÁCH ĐIỂM DANH BAN ĐẦU ===
const INITIAL_ATTENDANCE = {
};

// === DỮ LIỆU HỌC VIÊN BAN ĐẦU ===
const INITIAL_STUDENTS = [
];

// === DỮ LIỆU GIÁO VIÊN BAN ĐẦU ===
const INITIAL_TEACHERS = [
];

// === DANH SÁCH TÀI KHOẢN MẪU BAN ĐẦU ===
const USERS_ACCOUNTS = [
  { username: 'admin', password: '123', name: 'Superadmin-HIC (Admin)', role: 'admin', email: 'admin@tms-edu.vn' },
  { username: 'cbdt', password: '123', name: 'Nguyễn Yến Đường (Cán bộ)', role: 'staff', email: 'minh.nt@tms-edu.vn' },
];

export default function App() {
  // --- STATE QUẢN LÝ CHÍNH ---
  const [currentUser, setCurrentUser] = useState(USERS_ACCOUNTS[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Cơ sở dữ liệu ứng dụng
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [enrollments, setEnrollments] = useState(INITIAL_ENROLLMENTS);
  const [grades, setGrades] = useState(INITIAL_GRADES);
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [accounts, setAccounts] = useState(USERS_ACCOUNTS);

  // Bộ lọc & Tìm kiếm học tập
  const [studentSearch, setStudentSearch] = useState('');
  const [studentFilterStatus, setStudentFilterStatus] = useState('All');
  const [studentFilterMajor, setStudentFilterMajor] = useState('Công nghệ thông tin');
  
  const [teacherSearch, setTeacherSearch] = useState('');
  const [teacherFilterDept, setTeacherFilterDept] = useState('All');

  const [classFilterMajor, setClassFilterMajor] = useState('All');
  const [classSearch, setClassSearch] = useState('');

  // Sổ điểm: Lọc theo NGÀNH/NGHỀ ĐÀO TẠO
  const [selectedMajorForGrades, setSelectedMajorForGrades] = useState('Công nghệ thông tin');
  const [selectedClassIdForAttendance, setSelectedClassIdForAttendance] = useState(INITIAL_CLASSES[0].id);
  const [gradeSearchText, setGradeSearchText] = useState('');
  const [gradeViewMode, setGradeViewMode] = useState('edit'); // 'edit' | 'scoreboard'

  // MODALS
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [studentFormMode, setStudentFormMode] = useState('add');
  const [currentStudentData, setCurrentStudentData] = useState({
    id: '', name: '', dob: '', gender: 'Nam', cccd: '', phone: '', email: '', status: 'Đang học', class: 'CNTT-K15', major: 'Công nghệ thông tin', password: '123'
  });

  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [teacherFormMode, setTeacherFormMode] = useState('add');
  const [currentTeacherData, setCurrentTeacherData] = useState({
    id: '', name: '', specialty: '', department: 'Khoa Kỹ thuật - Công nghệ', phone: '', email: '', degree: 'Thạc sĩ', password: '123'
  });

  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [classFormMode, setClassFormMode] = useState('add');
  const [currentClassData, setCurrentClassData] = useState({
    id: '', name: '', courseId: 'KH001', major: 'Công nghệ thông tin', teacherId: 'GV001', startDate: '', endDate: '', location: '', quota: 40, term: 'Học kỳ I'
  });

  // Grade Edit Modal States
  const [isGradeEditModalOpen, setIsGradeEditModalOpen] = useState(false);
  const [studentIdForGradeEdit, setStudentIdForGradeEdit] = useState('');
  const [tempGradeEditScores, setTempGradeEditScores] = useState({});

  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [changePassForm, setChangePassForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [changePassError, setChangePassError] = useState('');

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [subjectFormMode, setSubjectFormMode] = useState('add'); // 'add' | 'edit'
  const [currentSubjectData, setCurrentSubjectData] = useState({
    id: '', name: '', credits: 3, hours: 45, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn'
  });

  const [isEnrollStudentModalOpen, setIsEnrollStudentModalOpen] = useState(false);
  const [selectedStudentToEnroll, setSelectedStudentToEnroll] = useState('');

  // Custom Confirm Modal
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  // Lịch học & Điểm danh Modal
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [newScheduleForm, setNewScheduleForm] = useState({ date: '', topic: '' });
  const [activeScheduleIdForAttendance, setActiveScheduleIdForAttendance] = useState(null);

  // Thu gọn/mở rộng Chú dẫn Mô-đun (Module Legend)
  const [isLegendOpen, setIsLegendOpen] = useState(true);

  // Đồng bộ hóa tự động ngành nghề xem điểm cho tài khoản học viên khi đăng nhập
  useEffect(() => {
    if (isLoggedIn && currentUser.role === 'student' && currentUser.studentId) {
      const studentObj = students.find(s => s.id === currentUser.studentId);
      if (studentObj) {
        setSelectedMajorForGrades(studentObj.major);
        setGradeViewMode('scoreboard'); // Chế độ học bạ cá nhân trực quan
      }
    }
  }, [isLoggedIn, currentUser, students]);

  // SheetJS (XLSX) CDN Auto Loader
  useEffect(() => {
    if (!window.XLSX) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // --- HÀM THÔNG BÁO ---
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const triggerConfirm = (title, message, callback) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        callback();
        setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  // --- HÀM XỬ LÝ NGÀY THÁNG ĐỊNH DẠNG VIỆT NAM ---
  const parseYMDtoDMY = (ymdString) => {
    if (!ymdString) return '';
    const parts = ymdString.split('-');
    if (parts.length !== 3) return ymdString;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  const parseDMYtoYMD = (dmyString) => {
    if (!dmyString) return '';
    const parts = dmyString.split('/');
    if (parts.length !== 3) return dmyString;
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  // === QUY ĐỔI THANG ĐIỂM (Chuẩn quy chế tín chỉ) ===
  const convertScoreToGrade = (score10) => {
    if (score10 === undefined || score10 === null || score10 === '') return { letter: '-', scale4: 0, label: 'Chưa có điểm' };
    const score = parseFloat(score10);
    if (score >= 8.5) return { letter: 'A', scale4: 4, label: 'Xuất sắc' };
    if (score >= 7.0) return { letter: 'B', scale4: 3, label: 'Giỏi' };
    if (score >= 5.5) return { letter: 'C', scale4: 2, label: 'Khá' };
    if (score >= 4.0) return { letter: 'D', scale4: 1, label: 'Trung bình' };
    return { letter: 'F', scale4: 0, label: 'Yếu - Trượt' };
  };

  // --- HÀM TÍNH ĐIỂM GPA THEO THANG ĐIỂM 4 (LOẠI BỎ GDTC & GDQP-AN) ---
  const getTermGPAOfStudent = (studentId, studentMajor, gradeList, subjectList) => {
    let totalCredits = 0;
    let weightedScale4Sum = 0;

    const majorSubjects = subjectList.filter(s => s.major === studentMajor);
    
    majorSubjects.forEach(sub => {
      const nameLower = sub.name.toLowerCase();
      // Loại trừ các nội dung không tính vào điểm tổng kết chung theo quy định
      const isExcluded = nameLower.includes("thể chất") || 
                         nameLower.includes("quốc phòng") || 
                         nameLower.includes("qp-an") || 
                         nameLower.includes("qp - an");

      const grade = gradeList.find(g => g.studentId === studentId && g.subjectId === sub.id);
      if (grade && grade.score !== undefined && grade.score !== null && grade.score !== '') {
        const final10 = parseFloat(grade.score);
        const { scale4 } = convertScoreToGrade(final10);
        
        if (!isExcluded) {
          totalCredits += sub.credits;
          weightedScale4Sum += scale4 * sub.credits;
        }
      }
    });

    if (totalCredits === 0) return { gpa: 0, credits: 0, label: 'Không có điểm' };
    const gpa = Math.round((weightedScale4Sum / totalCredits) * 100) / 100;
    
    // Xếp loại tốt nghiệp căn cứ trực tiếp vào GPA tích lũy toàn khóa hệ 4
    let classification = 'Yếu';
    if (gpa >= 3.50) classification = 'Xuất sắc';
    else if (gpa >= 3.00) classification = 'Giỏi';
    else if (gpa >= 2.50) classification = 'Khá';
    else if (gpa >= 2.00) classification = 'Trung bình';

    return { gpa, credits: totalCredits, label: classification };
  };

  // --- PHÂN QUYỀN TRUY CẬP ---
  const hasAccess = (allowedRoles) => {
    return allowedRoles.includes(currentUser.role);
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return { text: 'Quản trị viên', color: 'bg-rose-100 text-rose-800 border-rose-200' };
      case 'staff': return { text: 'Cán bộ đào tạo', color: 'bg-sky-100 text-sky-800 border-sky-200' };
      case 'teacher': return { text: 'Giảng viên', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'student': return { text: 'Học viên', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      default: return { text: 'Khách', color: 'bg-slate-100 text-slate-800' };
    }
  };

  // --- HÀM XỬ LÝ ĐĂNG NHẬP / ĐĂNG XUẤT ---
  const handleLogin = (e) => {
    e.preventDefault();
    const user = accounts.find(
      (u) => u.username === loginForm.username && u.password === loginForm.password
    );
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setLoginError('');
      setActiveTab('dashboard');
      showToast(`Chào mừng ${user.name} đến với HIC LMS!`, 'success');
    } else {
      setLoginError('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: '', password: '' });
    showToast('Đăng xuất thành công!', 'info');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (changePassForm.oldPassword !== currentUser.password) {
      setChangePassError('Mật khẩu hiện tại không khớp.');
      return;
    }
    if (changePassForm.newPassword.length < 3) {
      setChangePassError('Mật khẩu mới phải từ 3 ký tự.');
      return;
    }
    if (changePassForm.newPassword !== changePassForm.confirmPassword) {
      setChangePassError('Nhập lại mật khẩu mới không chính xác.');
      return;
    }

    const updatedAccounts = accounts.map(acc => {
      if (acc.username === currentUser.username) {
        return { ...acc, password: changePassForm.newPassword };
      }
      return acc;
    });
    setAccounts(updatedAccounts);
    setCurrentUser({ ...currentUser, password: changePassForm.newPassword });
    setIsChangePassModalOpen(false);
    setChangePassForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setChangePassError('');
    showToast('Đổi mật khẩu bảo mật thành công!', 'success');
  };

  // --- QUẢN LÝ MÔN HỌC ---
  const handleOpenSubjectModal = (mode, subject = null) => {
    setSubjectFormMode(mode);
    if (mode === 'edit' && subject) {
      setCurrentSubjectData({ ...subject });
    } else {
      setCurrentSubjectData({
        id: '',
        name: '',
        credits: 3,
        hours: 45,
        major: studentFilterMajor,
        type: 'Môn học, mô đun chuyên môn'
      });
    }
    setIsSubjectModalOpen(true);
  };

  const handleSaveSubject = (e) => {
    e.preventDefault();
    if (!currentSubjectData.id.trim() || !currentSubjectData.name.trim()) {
      showToast('Vui lòng điền mã môn và tên môn học!', 'error');
      return;
    }

    if (subjectFormMode === 'add') {
      const isDuplicate = subjects.some(
        s => s.id === currentSubjectData.id && s.major === currentSubjectData.major
      );
      if (isDuplicate) {
        showToast('Mã môn học đã tồn tại trong chương trình ngành này!', 'error');
        return;
      }
      setSubjects([...subjects, currentSubjectData]);
      showToast(`Đã thêm thành công môn học "${currentSubjectData.name}"`, 'success');
    } else {
      setSubjects(
        subjects.map(s => 
          (s.id === currentSubjectData.id && s.major === currentSubjectData.major) 
            ? currentSubjectData 
            : s
        )
      );
      showToast(`Cập nhật thông tin môn học "${currentSubjectData.name}" thành công!`, 'success');
    }
    setIsSubjectModalOpen(false);
  };

  const handleDeleteSubject = (id, name, major) => {
    const isUsedInClasses = classes.some(c => c.subjectId === id && c.major === major);
    if (isUsedInClasses) {
      showToast(`Không thể xóa! Môn học "${name}" đang được dạy ở ít nhất một lớp học phần.`, 'error');
      return;
    }

    triggerConfirm(
      'Xóa môn học khỏi chương trình',
      `Bạn chắc chắn muốn xóa môn học "${name}" (${id}) thuộc ngành đào tạo ${major}?`,
      () => {
        setSubjects(subjects.filter(s => !(s.id === id && s.major === major)));
        showToast(`Đã xóa thành công môn học "${name}".`, 'warning');
      }
    );
  };

  // --- QUẢN LÝ HỌC VIÊN CRUD ---
  const handleOpenStudentModal = (mode, student = null) => {
    setStudentFormMode(mode);
    if (mode === 'edit' && student) {
      const acc = accounts.find(a => a.username === student.id);
      setCurrentStudentData({
        ...student,
        dob: parseDMYtoYMD(student.dob),
        password: acc ? acc.password : '123'
      });
    } else {
      const lastIdNum = students.length > 0 
        ? Math.max(...students.map(s => {
            const num = parseInt(s.id.replace('HV', ''), 10);
            return isNaN(num) ? 0 : num;
          })) 
        : 0;
      const newId = `HV${String(lastIdNum + 1).padStart(3, '0')}`;
      setCurrentStudentData({
        id: newId, name: '', dob: '', gender: 'Nam', cccd: '', phone: '', email: '', status: 'Đang học', class: 'CNTT-K15', major: 'Công nghệ thông tin', password: '123'
      });
    }
    setIsStudentModalOpen(true);
  };

  const handleSaveStudent = (e) => {
    e.preventDefault();
    if (!currentStudentData.name.trim()) {
      showToast('Vui lòng nhập họ và tên học viên!', 'error');
      return;
    }

    const associatedAccount = accounts.find(acc => acc.studentId === currentStudentData.id || acc.username === currentStudentData.id);
    if (associatedAccount && associatedAccount.role === 'admin' && currentUser.role !== 'admin') {
      showToast('Bạn không có quyền chỉnh sửa thông tin của Quản trị viên (Admin)!', 'error');
      return;
    }

    const formattedStudent = {
      id: currentStudentData.id,
      name: currentStudentData.name,
      dob: parseYMDtoDMY(currentStudentData.dob),
      gender: currentStudentData.gender,
      cccd: currentStudentData.cccd,
      phone: currentStudentData.phone,
      email: currentStudentData.email,
      status: currentStudentData.status,
      class: currentStudentData.class,
      major: currentStudentData.major
    };

    const studentAccount = {
      username: formattedStudent.id,
      password: currentStudentData.password || '123',
      name: formattedStudent.name,
      role: 'student',
      email: formattedStudent.email,
      studentId: formattedStudent.id
    };

    if (studentFormMode === 'add') {
      if (students.some(s => s.id === formattedStudent.id)) {
        showToast('Mã học viên đã tồn tại!', 'error');
        return;
      }
      setStudents([...students, formattedStudent]);
      setAccounts([...accounts, studentAccount]);
      showToast(`Thành công thêm học viên ${formattedStudent.name} và tự động khởi tạo tài khoản đăng nhập.`, 'success');
    } else {
      setStudents(students.map(s => s.id === formattedStudent.id ? formattedStudent : s));
      const exists = accounts.some(acc => acc.username === formattedStudent.id);
      if (exists) {
        setAccounts(accounts.map(acc => acc.username === formattedStudent.id ? studentAccount : acc));
      } else {
        setAccounts([...accounts, studentAccount]);
      }
      showToast(`Cập nhật thông tin học viên ${formattedStudent.name} và mật khẩu tài khoản thành công.`, 'success');
    }
    setIsStudentModalOpen(false);
  };

  const handleDeleteStudent = (id, name) => {
    const associatedAccount = accounts.find(acc => acc.studentId === id || acc.username === id);
    if (associatedAccount && associatedAccount.role === 'admin') {
      showToast('Không thể xóa tài khoản Quản trị viên (Admin)!', 'error');
      return;
    }

    triggerConfirm(
      'Xóa Hồ sơ Học viên',
      `Bạn có thực sự muốn xóa vĩnh viễn học viên ${name} (${id}) và tài khoản liên quan?`,
      () => {
        setStudents(students.filter(s => s.id !== id));
        setEnrollments(enrollments.filter(e => e.studentId !== id));
        setGrades(grades.filter(g => g.studentId !== id));
        setAccounts(accounts.filter(acc => acc.username !== id));
        showToast(`Đã xóa sạch hồ sơ và thông tin tài khoản của học viên ${name}.`, 'warning');
      }
    );
  };

  // --- QUẢN LÝ GIÁO VIÊN CRUD ---
  const handleOpenTeacherModal = (mode, teacher = null) => {
    setTeacherFormMode(mode);
    if (mode === 'edit' && teacher) {
      const acc = accounts.find(a => a.username === teacher.id);
      setCurrentTeacherData({
        ...teacher,
        password: acc ? acc.password : '123'
      });
    } else {
      const lastIdNum = teachers.length > 0 
        ? Math.max(...teachers.map(t => {
            const num = parseInt(t.id.replace('GV', ''), 10);
            return isNaN(num) ? 0 : num;
          })) 
        : 0;
      const newId = `GV${String(lastIdNum + 1).padStart(3, '0')}`;
      setCurrentTeacherData({
        id: newId, name: '', specialty: '', department: 'Khoa Kỹ thuật - Công nghệ', phone: '', email: '', degree: 'Thạc sĩ', password: '123'
      });
    }
    setIsTeacherModalOpen(true);
  };

  const handleSaveTeacher = (e) => {
    e.preventDefault();
    if (!currentTeacherData.name.trim() || !currentTeacherData.specialty.trim() || !currentTeacherData.email.trim()) {
      showToast('Thông tin liên hệ và hướng nghiên cứu chuyên môn bắt buộc!', 'error');
      return;
    }

    const associatedAccount = accounts.find(acc => acc.teacherId === currentTeacherData.id || acc.username === currentTeacherData.id);
    if (associatedAccount && associatedAccount.role === 'admin' && currentUser.role !== 'admin') {
      showToast('Bạn không có quyền chỉnh sửa thông tin của Quản trị viên (Admin)!', 'error');
      return;
    }

    const teacherAccount = {
      username: currentTeacherData.id,
      password: currentTeacherData.password || '123',
      name: currentTeacherData.name,
      role: 'teacher',
      email: currentTeacherData.email,
      teacherId: currentTeacherData.id
    };

    if (teacherFormMode === 'add') {
      if (teachers.some(t => t.id === currentTeacherData.id)) {
        showToast('Mã giáo viên đã trùng lập!', 'error');
        return;
      }
      setTeachers([...teachers, currentTeacherData]);
      setAccounts([...accounts, teacherAccount]);
      showToast(`Đã thêm thành công giáo viên ${currentTeacherData.name} và tự động cấp tài khoản đăng nhập.`, 'success');
    } else {
      setTeachers(teachers.map(t => t.id === currentTeacherData.id ? currentTeacherData : t));
      const exists = accounts.some(acc => acc.username === currentTeacherData.id);
      if (exists) {
        setAccounts(accounts.map(acc => acc.username === currentTeacherData.id ? teacherAccount : acc));
      } else {
        setAccounts([...accounts, teacherAccount]);
      }
      showToast(`Cập nhật hồ sơ giáo viên ${currentTeacherData.name} và mật khẩu tài khoản thành công.`, 'success');
    }
    setIsTeacherModalOpen(false);
  };

  const handleDeleteTeacher = (id, name) => {
    const associatedAccount = accounts.find(acc => acc.teacherId === id || acc.username === id);
    if (associatedAccount && associatedAccount.role === 'admin') {
      showToast('Không thể xóa tài khoản Quản trị viên (Admin)!', 'error');
      return;
    }

    triggerConfirm(
      'Xóa Hồ sơ Giáo viên',
      `Bạn chắc chắn muốn loại bỏ giáo viên ${name} (${id}) ra khỏi hệ thống của HIC?`,
      () => {
        setTeachers(teachers.filter(t => t.id !== id));
        setAccounts(accounts.filter(acc => acc.username !== id));
        showToast(`Đã gỡ bỏ giáo viên ${name} và xóa tài khoản liên kết.`, 'warning');
      }
    );
  };

  // --- QUẢN LÝ LỚP HỌC CRUD ---
  const handleOpenClassModal = (mode, cls = null) => {
    setClassFormMode(mode);
    if (mode === 'edit' && cls) {
      setCurrentClassData({ ...cls });
    } else {
      const lastIdNum = classes.length > 0 
        ? Math.max(...classes.map(c => {
            const num = parseInt(c.id.replace('LH', ''), 10);
            return isNaN(num) ? 0 : num;
          })) 
        : 0;
      const newId = `LH${String(lastIdNum + 1).padStart(3, '0')}`;
      
      setCurrentClassData({
        id: newId, 
        name: '', 
        courseId: 'KH001', 
        major: 'Công nghệ thông tin', 
        teacherId: teachers[0]?.id || 'GV001', 
        startDate: '', 
        endDate: '', 
        location: '', 
        quota: 40, 
        term: 'Học kỳ I'
      });
    }
    setIsClassModalOpen(true);
  };

  const handleSaveClass = (e) => {
    e.preventDefault();
    if (!currentClassData.name.trim() || !currentClassData.location.trim()) {
      showToast('Tên lớp học và địa điểm liên kết đào tạo không được để trống!', 'error');
      return;
    }

    if (classFormMode === 'add') {
      if (classes.some(c => c.id === currentClassData.id)) {
        showToast('Mã lớp này đã được đăng ký trước đó!', 'error');
        return;
      }
      setClasses([...classes, currentClassData]);
      showToast(`Tạo thành công lớp ${currentClassData.name}.`, 'success');
    } else {
      setClasses(classes.map(c => c.id === currentClassData.id ? currentClassData : c));
      showToast(`Cập nhật thông tin lớp ${currentClassData.name} thành công.`, 'success');
    }
    setIsClassModalOpen(false);
  };

  const handleDeleteClass = (id, name) => {
    triggerConfirm(
      'Hủy Lớp học hành chính',
      `Hủy lớp học ${name} (${id}) sẽ xóa toàn bộ đăng ký học và lịch học hiện thời. Tiếp tục?`,
      () => {
        setClasses(classes.filter(c => c.id !== id));
        setEnrollments(enrollments.filter(e => e.classId !== id));
        setGrades(grades.filter(g => g.classId !== id));
        setSchedules(schedules.filter(s => s.classId !== id));
        showToast(`Hủy hoàn toàn lớp học ${name}.`, 'warning');
      }
    );
  };

  // --- QUẢN LÝ ĐĂNG KÝ HỌC (ENROLLMENT) ---
  const handleEnrollStudent = (e) => {
    e.preventDefault();
    if (!selectedStudentToEnroll) {
      showToast('Hãy chọn học viên cần xếp vào lớp.', 'error');
      return;
    }
    const isEnrolled = enrollments.some(e => e.studentId === selectedStudentToEnroll && e.classId === selectedClassIdForAttendance);
    if (isEnrolled) {
      showToast('Học viên này đã tồn tại trong danh sách lớp học.', 'warning');
      return;
    }

    setEnrollments([...enrollments, { studentId: selectedStudentToEnroll, classId: selectedClassIdForAttendance }]);
    showToast('Xếp học viên vào lớp học phần thành công!', 'success');
    setIsEnrollStudentModalOpen(false);
    setSelectedStudentToEnroll('');
  };

  const handleUnenrollStudent = (studentId, studentName) => {
    triggerConfirm(
      'Hủy đăng ký học',
      `Bạn muốn rút tên học viên ${studentName} khỏi lớp học hiện tại?`,
      () => {
        setEnrollments(enrollments.filter(e => !(e.studentId === studentId && e.classId === selectedClassIdForAttendance)));
        showToast(`Đã rút tên ${studentName} ra khỏi học phần.`, 'warning');
      }
    );
  };

  // --- XUẤT CSV DANH SÁCH LỚP HỌC ---
  const exportClassToCSV = (classId) => {
    const cls = classes.find(c => c.id === classId);
    if (!cls) return;
    
    const enrolledStudents = enrollments
      .filter(e => e.classId === classId)
      .map(e => students.find(s => s.id === e.studentId))
      .filter(Boolean);

    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += `Mã lớp,${cls.id},Tên lớp,${cls.name}\n`;
    csvContent += `Chuyên ngành,${cls.major},Địa điểm,${cls.location}\n\n`;
    csvContent += "Mã Học Viên,Họ và Tên,Ngày Sinh,Giới Tính,Lớp Hành Chính,Ngành Nghề\n";

    enrolledStudents.forEach(st => {
      csvContent += `${st.id},${st.name},${st.dob},${st.gender},${st.class},${st.major}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Danh_sach_lop_${cls.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Tải danh sách CSV thành công!', 'success');
  };

  // --- NHẬP EXCEL ĐỒNG BỘ ---
  const handleExcelImport = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!window.XLSX) {
      showToast('Trình duyệt đang tải module Excel. Vui lòng thử lại sau giây lát!', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = window.XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawData = window.XLSX.utils.sheet_to_json(ws, { header: 1 });

        if (rawData.length < 2) {
          showToast('File Excel trống hoặc định dạng không hợp lệ.', 'error');
          return;
        }

        const dataRows = rawData.slice(1);
        let successCount = 0;
        let skippedCount = 0;

        if (type === 'students') {
          const newStudentsList = [];
          dataRows.forEach(row => {
            if (!row[0] || !row[1]) return;
            
            const id = String(row[0]).trim();
            const name = String(row[1]).trim();
            let dobRaw = row[2] ? String(row[2]).trim() : '';
            let dob = dobRaw;
            if (dobRaw.includes('-')) {
              dob = parseYMDtoDMY(dobRaw);
            }

            const gender = row[3] ? String(row[3]).trim() : 'Nam';
            const cccd = row[4] ? String(row[4]).trim() : '';
            const phone = row[5] ? String(row[5]).trim() : '';
            const email = row[6] ? String(row[6]).trim() : '';
            const stClass = row[7] ? String(row[7]).trim() : 'CNTT-K15';
            const major = row[8] ? String(row[8]).trim() : 'Công nghệ thông tin';
            const status = row[9] ? String(row[9]).trim() : 'Đang học';

            const exists = students.some(s => s.id === id) || newStudentsList.some(s => s.id === id);
            if (!exists) {
              newStudentsList.push({ id, name, dob, gender, cccd, phone, email, class: stClass, major, status });
              successCount++;
            } else {
              skippedCount++;
            }
          });

          if (newStudentsList.length > 0) {
            setStudents([...students, ...newStudentsList]);
          }
          showToast(`Nhập dữ liệu thành công ${successCount} học viên. Bỏ qua ${skippedCount} bản ghi bị trùng mã.`, 'success');

        } else if (type === 'teachers') {
          const newTeachersList = [];
          dataRows.forEach(row => {
            if (!row[0] || !row[1]) return;
            const id = String(row[0]).trim();
            const name = String(row[1]).trim();
            const degree = row[2] ? String(row[2]).trim() : 'Thạc sĩ';
            const specialty = row[3] ? String(row[3]).trim() : 'Cơ sở dữ liệu';
            const department = row[4] ? String(row[4]).trim() : 'Khoa Công nghệ thông tin';
            const phone = row[5] ? String(row[5]).trim() : '';
            const email = row[6] ? String(row[6]).trim() : '';

            const exists = teachers.some(t => t.id === id) || newTeachersList.some(t => t.id === id);
            if (!exists) {
              newTeachersList.push({ id, name, degree, specialty, department, phone, email });
              successCount++;
            } else {
              skippedCount++;
            }
          });

          if (newTeachersList.length > 0) {
            setTeachers([...teachers, ...newTeachersList]);
          }
          showToast(`Nhập dữ liệu thành công ${successCount} giảng viên. Bỏ qua ${skippedCount} bản ghi trùng lặp.`, 'success');
        } else if (type === 'classes') {
          const newClassesList = [];
          dataRows.forEach(row => {
            if (!row[0] || !row[1]) return;
            const id = String(row[0]).trim();
            const name = String(row[1]).trim();
            const major = row[2] ? String(row[2]).trim() : 'Công nghệ thông tin';
            const teacherId = row[3] ? String(row[3]).trim() : 'GV001';
            const quota = row[4] ? parseInt(row[4]) || 40 : 40;
            const location = row[5] ? String(row[5]).trim() : 'HIC Campus';
            const term = row[6] ? String(row[6]).trim() : 'Học kỳ I';
            const startDate = row[7] ? String(row[7]).trim() : '2026-09-01';
            const endDate = row[8] ? String(row[8]).trim() : '2027-01-15';

            const exists = classes.some(c => c.id === id) || newClassesList.some(c => c.id === id);
            if (!exists) {
              newClassesList.push({ id, name, major, teacherId, quota, location, term, startDate, endDate, courseId: 'KH001' });
              successCount++;
            } else {
              skippedCount++;
            }
          });

          if (newClassesList.length > 0) {
            setClasses([...classes, ...newClassesList]);
          }
          showToast(`Nhập dữ liệu thành công ${successCount} lớp học. Bỏ qua ${skippedCount} bản ghi trùng lặp.`, 'success');
        }

      } catch (err) {
        showToast('Có lỗi xảy ra khi đọc file Excel.', 'error');
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = '';
  };

  const downloadExcelTemplate = (type) => {
    if (!window.XLSX) {
      showToast('Trình duyệt đang khởi tạo module Excel, vui lòng tải lại sau giây lát!', 'warning');
      return;
    }

    let headers = [];
    let sampleData = [];
    let filename = '';

    if (type === 'students') {
      headers = [["Mã Học Viên", "Họ và Tên", "Ngày Sinh (DD/MM/YYYY)", "Giới Tính (Nam/Nữ)", "CCCD", "Điện Thoại", "Email", "Lớp Hành Chính", "Ngành Nghề", "Trạng Thái"]];
      sampleData = [
        ["HV100", "Nguyễn Minh Khang", "15/08/2004", "Nam", "001204008954", "0963521487", "khangminh@gmail.com", "CNTT-K15", "Công nghệ thông tin", "Đang học"],
        ["HV101", "Phạm Hải Yến", "22/12/2003", "Nữ", "001203004561", "0987154236", "yenpham@gmail.com", "CSSD-K14", "Tạo mẫu và chăm sóc sắc đẹp", "Đang học"]
      ];
      filename = 'Mau_Nhap_Hoc_Vien_HIC.xlsx';
    } else if (type === 'teachers') {
      headers = [["Mã Giáo Viên", "Họ và Tên", "Học Vị", "Chuyên Môn Sâu", "Đơn Vị Khoa", "Điện Thoại", "Email"]];
      sampleData = [
        ["GV100", "GS. TS. Nguyễn Hoài Nam", "Giáo sư, Tiến sĩ", "Hệ thống sấy lạnh thông minh", "Khoa Ngoại ngữ", "0904325698", "namnh@hic-edu.vn"]
      ];
      filename = 'Mau_Nhap_Giang_Vien_HIC.xlsx';
    } else if (type === 'classes') {
      headers = [["Mã Lớp", "Tên Lớp", "Ngành Đào Tạo", "Mã Giáo Viên Chủ Nhiệm", "Sĩ Số Lớp", "Địa Điểm Liên Kết Đào Tạo", "Học Kỳ", "Ngày Bắt Đầu (YYYY-MM-DD)", "Ngày Kết Thúc (YYYY-MM-DD)"]];
      sampleData = [
        ["LH004", "May Thời Trang K15 - Cơ Sở 2", "May thời trang", "GV001", "35", "Văn phòng liên kết Hải Phòng", "Học kỳ I", "2026-09-01", "2027-01-15"],
        ["LH005", "Hướng dẫn du lịch chất lượng cao", "Hướng dẫn du lịch", "GV004", "30", "Trung tâm liên kết HN", "Học kỳ I", "2026-09-05", "2027-01-20"]
      ];
      filename = 'Mau_Nhap_Lop_Hoc_HIC.xlsx';
    }

    const wb = window.XLSX.utils.book_new();
    const ws = window.XLSX.utils.aoa_to_sheet([...headers, ...sampleData]);
    window.XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    window.XLSX.writeFile(wb, filename);
    showToast('Tải xuống file mẫu Excel thành công!', 'success');
  };

  // --- TỰ ĐỘNG NHẬP ĐIỂM TỪ EXCEL CHO TOÀN BỘ MÔN CỦA NGÀNH (Khớp file ĐIỂM TK-CBMA.xlsx) ---
  const handleGradeExcelImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!window.XLSX) {
      showToast('Trình duyệt đang tải module Excel. Vui lòng thử lại sau giây lát!', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = window.XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawData = window.XLSX.utils.sheet_to_json(ws, { header: 1 });

        if (rawData.length < 2) {
          showToast('File Excel trống hoặc không đúng định dạng.', 'error');
          return;
        }

        // Tìm dòng tiêu đề chứa mã học viên/mã sv
        let headerRowIndex = -1;
        for (let i = 0; i < rawData.length; i++) {
          const row = rawData[i];
          if (row && row.some(cell => cell && String(cell).toLowerCase().includes('mã'))) {
            headerRowIndex = i;
            break;
          }
        }

        if (headerRowIndex === -1) {
          showToast('Không tìm thấy dòng tiêu đề cột chứa "Mã Học Viên" hoặc "Mã SV" trong file.', 'error');
          return;
        }

        const headers = rawData[headerRowIndex].map(h => String(h || '').trim());
        const idColIdx = headers.findIndex(h => {
          const l = h.toLowerCase();
          return l.includes('mã') || l.includes('id') || l.includes('msv') || l.includes('student');
        });

        if (idColIdx === -1) {
          showToast('Không định vị được cột Mã Học Viên trong file Excel.', 'error');
          return;
        }

        // Tạo map khớp cột môn học
        const majorSubjects = subjects.filter(s => s.major === selectedMajorForGrades);
        const columnToSubjectMap = {}; // { colIndex: subjectId }

        headers.forEach((headerVal, colIdx) => {
          if (colIdx === idColIdx) return;
          const cleanHeader = headerVal.trim().toLowerCase();
          
          // Tìm theo mã môn hoặc tên môn
          const matchingSub = majorSubjects.find(sub => 
            sub.id.toLowerCase() === cleanHeader || 
            sub.name.toLowerCase() === cleanHeader ||
            cleanHeader.includes(sub.id.toLowerCase()) ||
            cleanHeader.includes(sub.name.toLowerCase())
          );

          if (matchingSub) {
            columnToSubjectMap[colIdx] = matchingSub.id;
          }
        });

        if (Object.keys(columnToSubjectMap).length === 0) {
          showToast('Không khớp được cột điểm môn học nào của ngành đang chọn. Vui lòng kiểm tra lại dòng tiêu đề cột!', 'error');
          return;
        }

        const dataRows = rawData.slice(headerRowIndex + 1);
        let successCount = 0;
        let cellUpdateCount = 0;
        const updatedGrades = [...grades];

        dataRows.forEach(row => {
          if (!row || row.length === 0) return;
          const studentId = String(row[idColIdx] || '').trim();
          if (!studentId) return;

          // Kiểm tra học viên có thuộc ngành đang chọn không
          const st = students.find(s => s.id === studentId);
          if (!st || st.major !== selectedMajorForGrades) return;

          successCount++;

          // Cập nhật điểm cho từng cột môn học tương ứng
          Object.entries(columnToSubjectMap).forEach(([colIdxStr, subjectId]) => {
            const colIdx = parseInt(colIdxStr, 10);
            const scoreValRaw = row[colIdx];
            if (scoreValRaw === undefined || scoreValRaw === null || scoreValRaw === '') return;

            const score = parseFloat(scoreValRaw);
            if (!isNaN(score) && score >= 0 && score <= 10) {
              cellUpdateCount++;
              const existingIdx = updatedGrades.findIndex(g => g.studentId === studentId && g.subjectId === subjectId);
              if (existingIdx !== -1) {
                updatedGrades[existingIdx] = { ...updatedGrades[existingIdx], score };
              } else {
                updatedGrades.push({ studentId, subjectId, score });
              }
            }
          });
        });

        setGrades(updatedGrades);
        showToast(`Đã đồng bộ điểm thành công cho ${successCount} học sinh ngành ${selectedMajorForGrades} (${cellUpdateCount} đầu điểm).`, 'success');
      } catch (err) {
        console.error(err);
        showToast('Có lỗi xảy ra khi xử lý file nhập điểm Excel.', 'error');
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = '';
  };

  // --- TẠO FILE EXCEL MẪU NHẬP ĐIỂM DẠNG LƯỚI CHO TOÀN BỘ NGÀNH ---
  const downloadGradeTemplate = (majorName) => {
    if (!window.XLSX) {
      showToast('Trình duyệt đang tải module Excel, vui lòng tải lại sau giây lát!', 'warning');
      return;
    }

    const majorSubjects = subjects.filter(s => s.major === majorName);
    const majorStudents = students.filter(s => s.major === majorName);

    if (majorStudents.length === 0) {
      showToast('Ngành nghề này hiện chưa có học viên nào để sinh danh sách mẫu.', 'warning');
      return;
    }

    const headers = [
      ["TRƯỜNG TRUNG CẤP QUỐC TẾ HÀ NỘI (HIC)"],
      [`BẢNG ĐIỂM TỔNG HỢP TOÀN KHÓA - NGÀNH: ${majorName.toUpperCase()}`],
      ["Nhập trực tiếp Điểm tổng kết hệ 10 của từng môn vào cột tương ứng. Để trống môn chưa học."],
      [],
      ["STT", "Mã Học Viên", "Họ và Tên", ...majorSubjects.map(s => `${s.id} - ${s.name} (${s.credits} tín)`)]
    ];

    const dataRows = majorStudents.map((st, index) => {
      const rowData = [index + 1, st.id, st.name];
      majorSubjects.forEach(sub => {
        const grade = grades.find(g => g.studentId === st.id && g.subjectId === sub.id);
        rowData.push(grade ? grade.score : "");
      });
      return rowData;
    });

    const wb = window.XLSX.utils.book_new();
    const ws = window.XLSX.utils.aoa_to_sheet([...headers, ...dataRows]);

    const colsConfig = [
      { wch: 6 },  // STT
      { wch: 15 }, // Mã học viên
      { wch: 25 }  // Họ tên
    ];
    majorSubjects.forEach(() => {
      colsConfig.push({ wch: 22 }); // Độ rộng các cột môn
    });
    ws['!cols'] = colsConfig;

    window.XLSX.utils.book_append_sheet(wb, ws, "BangDiemNganh");
    window.XLSX.writeFile(wb, `Mau_Nhap_Diem_Nganh_${majorName.replace(/\s+/g, '_')}.xlsx`);
    showToast('Tải xuống file mẫu Excel thành công!', 'success');
  };

  // --- QUẢN LÝ ĐIỂM SỐ & CHỈNH SỬA TRỰC TIẾP TRÊN LƯỚI ---
  const handleUpdateGradeDirectly = (studentId, subjectId, val) => {
    let numVal = parseFloat(val);
    if (val === '') {
      // Nếu xóa điểm, lọc bỏ bản ghi đó
      setGrades(grades.filter(g => !(g.studentId === studentId && g.subjectId === subjectId)));
      showToast('Đã xóa điểm môn học.', 'info');
      return;
    }

    if (isNaN(numVal) || numVal < 0 || numVal > 10) {
      showToast('Điểm số phải nằm trong khoảng từ 0 đến 10!', 'error');
      return;
    }

    const roundedVal = Math.round(numVal * 10) / 10;
    const exists = grades.some(g => g.studentId === studentId && g.subjectId === subjectId);
    if (exists) {
      setGrades(grades.map(g => {
        if (g.studentId === studentId && g.subjectId === subjectId) {
          return { ...g, score: roundedVal };
        }
        return g;
      }));
    } else {
      setGrades([...grades, { studentId, subjectId, score: roundedVal }]);
    }
  };

  const handleOpenGradeEditModal = (studentId) => {
    setStudentIdForGradeEdit(studentId);
    const studentGrades = {};
    subjectsOfSelectedMajorForGrades.forEach(sub => {
      const grade = grades.find(g => g.studentId === studentId && g.subjectId === sub.id);
      studentGrades[sub.id] = grade ? grade.score : '';
    });
    setTempGradeEditScores(studentGrades);
    setIsGradeEditModalOpen(true);
  };

  const handleSaveStudentGrades = (e) => {
    e.preventDefault();
    let updatedGrades = [...grades];
    Object.entries(tempGradeEditScores).forEach(([subId, scoreStr]) => {
      const index = updatedGrades.findIndex(g => g.studentId === studentIdForGradeEdit && g.subjectId === subId);
      if (scoreStr === '' || scoreStr === undefined || scoreStr === null) {
        if (index !== -1) {
          updatedGrades.splice(index, 1);
        }
      } else {
        const numScore = parseFloat(scoreStr);
        if (!isNaN(numScore) && numScore >= 0 && numScore <= 10) {
          const roundedScore = Math.round(numScore * 10) / 10;
          if (index !== -1) {
            updatedGrades[index] = { ...updatedGrades[index], score: roundedScore };
          } else {
            updatedGrades.push({ studentId: studentIdForGradeEdit, subjectId: subId, score: roundedScore });
          }
        }
      }
    });
    setGrades(updatedGrades);
    setIsGradeEditModalOpen(false);
    showToast('Cập nhật toàn bộ điểm học viên thành công!', 'success');
  };

  // --- QUẢN LÝ LỊCH HỌC & ĐIỂM DANH ---
  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newScheduleForm.date || !newScheduleForm.topic.trim()) {
      showToast('Thông tin ngày học và nội dung bài học là bắt buộc!', 'error');
      return;
    }

    const currentSessions = schedules.filter(s => s.classId === selectedClassIdForAttendance);
    const sessionNum = currentSessions.length + 1;
    const newSchedId = `S${String(schedules.length + 1).padStart(3, '0')}`;

    const formattedDate = parseYMDtoDMY(newScheduleForm.date);

    setSchedules([...schedules, {
      id: newSchedId,
      classId: selectedClassIdForAttendance,
      sessionNum,
      date: formattedDate,
      topic: newScheduleForm.topic
    }]);

    showToast(`Đã bổ sung lịch học Buổi ${sessionNum}!`, 'success');
    setIsAddScheduleModalOpen(false);
    setNewScheduleForm({ date: '', topic: '' });
  };

  const handleAttendanceChange = (scheduleId, studentId, status) => {
    setAttendance({
      ...attendance,
      [scheduleId]: {
        ...(attendance[scheduleId] || {}),
        [studentId]: status
      }
    });
    showToast('Điểm danh thành công.', 'success');
  };

  // Lấy danh sách môn học của ngành được chọn
  const subjectsOfSelectedMajorForGrades = useMemo(() => {
    return subjects.filter(s => s.major === selectedMajorForGrades);
  }, [subjects, selectedMajorForGrades]);

  // Bộ lọc học sinh của một ngành nghề đào tạo cụ thể
  const studentsOfSelectedMajorForGrades = useMemo(() => {
    return students.filter(st => {
      if (currentUser.role === 'student') {
        // Tài khoản học viên chỉ xem được chính mình
        return st.id === currentUser.studentId;
      }
      const isSameMajor = st.major === selectedMajorForGrades;
      const matchesSearch = 
        st.id.toLowerCase().includes(gradeSearchText.toLowerCase()) ||
        st.name.toLowerCase().includes(gradeSearchText.toLowerCase());
      return isSameMajor && matchesSearch;
    });
  }, [students, selectedMajorForGrades, gradeSearchText, currentUser]);

  const schedulesOfSelectedClass = useMemo(() => {
    return schedules.filter(s => s.classId === selectedClassIdForAttendance);
  }, [schedules, selectedClassIdForAttendance]);

  // --- TRA CỨU BỘ LỌC ĐA NĂNG ---
  const filteredStudents = useMemo(() => {
    return students.filter(st => {
      const matchesSearch = 
        st.id.toLowerCase().includes(studentSearch.toLowerCase()) ||
        st.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        st.phone.includes(studentSearch) ||
        st.cccd.includes(studentSearch) ||
        st.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
        (st.class && st.class.toLowerCase().includes(studentSearch.toLowerCase()));

      const matchesStatus = studentFilterStatus === 'All' || st.status === studentFilterStatus;
      const matchesMajor = st.major === studentFilterMajor;

      return matchesSearch && matchesStatus && matchesMajor;
    });
  }, [students, studentSearch, studentFilterStatus, studentFilterMajor]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(tc => {
      const matchesSearch = 
        tc.id.toLowerCase().includes(teacherSearch.toLowerCase()) ||
        tc.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
        tc.specialty.toLowerCase().includes(teacherSearch.toLowerCase()) ||
        tc.department.toLowerCase().includes(teacherSearch.toLowerCase());

      const matchesDept = teacherFilterDept === 'All' || tc.department === teacherFilterDept;

      return matchesSearch && matchesDept;
    });
  }, [teachers, teacherSearch, teacherFilterDept]);

  const filteredClasses = useMemo(() => {
    return classes.filter(cl => {
      const matchesSearch = 
        cl.id.toLowerCase().includes(classSearch.toLowerCase()) ||
        cl.name.toLowerCase().includes(classSearch.toLowerCase()) ||
        cl.location.toLowerCase().includes(classSearch.toLowerCase());

      const matchesMajor = classFilterMajor === 'All' || cl.major === classFilterMajor;

      return matchesSearch && matchesMajor;
    });
  }, [classes, classSearch, classFilterMajor]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      
      {/* TOAST THÔNG BÁO NHANH */}
      {notification && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center p-4 rounded-2xl shadow-xl border animate-bounce ${
          notification.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' :
          notification.type === 'error' ? 'bg-rose-50 text-rose-800 border-rose-100' : 'bg-blue-50 text-blue-800 border-blue-100'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5 mr-3 text-emerald-500" /> : <AlertCircle className="w-5 h-5 mr-3 text-rose-500" />}
          <span className="text-sm font-semibold">{notification.message}</span>
        </div>
      )}

      {/* CONFIRM DIALOG CHUNG */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-fade-in space-y-4">
            <h3 className="text-base font-bold text-slate-950 flex items-center">
              <AlertCircle className="w-5 h-5 text-rose-500 mr-2" /> {confirmModal.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">{confirmModal.message}</p>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null })}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-250 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md shadow-rose-100 transition-all cursor-pointer"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= GIAO DIỆN CHƯA ĐĂNG NHẬP ================= */}
      {!isLoggedIn ? (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-slate-100">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-200 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-650 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-100 mb-4">
                <GraduationCap className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Trường Trung cấp Quốc tế Hà Nội</h2>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1.5">HANOI INTERNATIONAL COLLEGE</p>
            </div>

            {loginError && (
              <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-750 text-xs rounded-xl flex items-center">
                <AlertCircle className="w-4 h-4 mr-2.5 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Tên đăng nhập</label>
                <input
                  type="text"
                  required
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-800 transition-colors"
                  placeholder="Nhập mã / tên tài khoản"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Mật khẩu</label>
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-800 transition-colors"
                  placeholder="Mật khẩu của bạn"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-indigo-200 cursor-pointer"
              >
                Đăng nhập hệ thống
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center mb-3">Tài khoản demo</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {accounts.slice(0, 4).map((acc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setLoginForm({ username: acc.username, password: acc.password });
                      setLoginError('');
                    }}
                    className="p-2 border border-slate-150 hover:bg-indigo-50 rounded-lg text-left transition-all"
                  >
                    <span className="font-semibold block text-slate-800 truncate">{acc.name}</span>
                    <span className="text-slate-500 font-mono">ID: {acc.username} (pw: 123)</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= GIAO DIỆN CHÍNH SAU KHI ĐĂNG NHẬP ================= */
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* --- SIDEBAR CHO MÁY TÍNH --- */}
          <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-850 shrink-0">
            <div className="p-5 border-b border-slate-800 flex items-center space-x-3 bg-slate-950">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-white leading-none text-base">HIC LMS</h1>
                <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">HANOI INTERNATIONAL COLLEGE</span>
              </div>
            </div>

            <div className="p-4 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-bold border border-slate-700">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
                  <span className={`inline-block px-2 py-0.5 mt-1 text-[10px] font-bold rounded-full border ${getRoleLabel(currentUser.role).color}`}>
                    {getRoleLabel(currentUser.role).text}
                  </span>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1.5">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4 mr-3" /> Bảng điều khiển
              </button>

              {hasAccess(['admin', 'staff']) && (
                <button
                  onClick={() => setActiveTab('students')}
                  className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'students' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4 mr-3" /> Quản lý học viên
                </button>
              )}

              {hasAccess(['admin', 'staff']) && (
                <button
                  onClick={() => setActiveTab('teachers')}
                  className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'teachers' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <UserCheck className="w-4 h-4 mr-3" /> Hồ sơ giảng viên
                </button>
              )}

              {hasAccess(['admin', 'staff']) && (
                <button
                  onClick={() => setActiveTab('classes')}
                  className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'classes' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <ClipboardList className="w-4 h-4 mr-3" /> Quản lý lớp học
                </button>
              )}

              <button
                onClick={() => setActiveTab('grades')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === 'grades' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4 mr-3" /> Quản lý điểm số
              </button>

              <button
                onClick={() => setActiveTab('schedule')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === 'schedule' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4 mr-3" /> Lịch học & Điểm danh
              </button>

              <button
                onClick={() => setActiveTab('curriculum')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === 'curriculum' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 mr-3" /> Chương trình đào tạo
              </button>

              <div className="pt-4 mt-4 border-t border-slate-800">
                <button
                  onClick={() => setIsChangePassModalOpen(true)}
                  className="w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Key className="w-4 h-4 mr-3 text-slate-500" /> Đổi mật khẩu
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-rose-950 hover:text-red-300 transition-colors text-rose-400 mt-1"
                >
                  <LogOut className="w-4 h-4 mr-3" /> Đăng xuất
                </button>
              </div>
            </nav>
            <div className="p-4 text-center text-xs text-slate-600 border-t border-slate-855 bg-slate-950/20">
              HIC LMS © 2026
            </div>
          </aside>

          {/* --- MOBILE NAVIGATION --- */}
          <header className="md:hidden bg-slate-900 text-slate-200 flex items-center justify-between p-4 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-md">HIC LMS</span>
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </header>

          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-900 border-b border-slate-850 text-slate-300 p-4 space-y-2">
              <button onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} className="w-full flex items-center p-3 rounded-xl text-sm"><Layers className="w-4 h-4 mr-3" /> Dashboard</button>
              {hasAccess(['admin', 'staff']) && (
                <button onClick={() => { setActiveTab('students'); setMobileMenuOpen(false); }} className="w-full flex items-center p-3 rounded-xl text-sm"><Users className="w-4 h-4 mr-3" /> Học sinh</button>
              )}
              {hasAccess(['admin', 'staff']) && (
                <button onClick={() => { setActiveTab('teachers'); setMobileMenuOpen(false); }} className="w-full flex items-center p-3 rounded-xl text-sm"><UserCheck className="w-4 h-4 mr-3" /> Giảng viên</button>
              )}
              {hasAccess(['admin', 'staff']) && (
                <button onClick={() => { setActiveTab('classes'); setMobileMenuOpen(false); }} className="w-full flex items-center p-3 rounded-xl text-sm"><ClipboardList className="w-4 h-4 mr-3" /> Lớp học</button>
              )}
              <button onClick={() => { setActiveTab('grades'); setMobileMenuOpen(false); }} className="w-full flex items-center p-3 rounded-xl text-sm"><Award className="w-4 h-4 mr-3" /> Điểm số</button>
              <button onClick={() => { setActiveTab('schedule'); setMobileMenuOpen(false); }} className="w-full flex items-center p-3 rounded-xl text-sm"><Calendar className="w-4 h-4 mr-3" /> Lịch học & Điểm danh</button>
              <button onClick={() => { setActiveTab('curriculum'); setMobileMenuOpen(false); }} className="w-full flex items-center p-3 rounded-xl text-sm"><BookOpen className="w-4 h-4 mr-3" /> Chương trình</button>
            </div>
          )}

          {/* ================= PHẦN NỘI DUNG CHÍNH ================= */}
          <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-full">
            
            {/* Header Top */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {activeTab === 'dashboard' && 'Hệ thống quản lý đào tạo - HIC'}
                  {activeTab === 'students' && 'Quản lý Hồ sơ Học viên'}
                  {activeTab === 'teachers' && 'Danh mục hồ sơ Giảng viên'}
                  {activeTab === 'classes' && 'Đăng ký học & Lớp học phần'}
                  {activeTab === 'grades' && 'Quản lý điểm số học tập tích lũy'}
                  {activeTab === 'schedule' && 'Sổ quản lý Lịch học & Điểm danh'}
                  {activeTab === 'curriculum' && 'Khung chương trình đào tạo tín chỉ'}
                </h1>
                <p className="text-xs text-slate-500 mt-1">Trường Trung cấp Quốc tế Hà Nội (HIC)</p>
              </div>

              <div className="flex items-center space-x-3 bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-sm self-start">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-500">Vai trò:</span>
                <span className="text-xs font-bold text-indigo-800 uppercase">{getRoleLabel(currentUser.role).text}</span>
              </div>
            </div>

            {/* ================= TAB: DASHBOARD ================= */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Khối thống kê thực tế */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">Học viên quy mô</p>
                      <h3 className="text-2xl font-bold text-slate-800">{students.length} Học viên</h3>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">Giảng viên cơ hữu</p>
                      <h3 className="text-2xl font-bold text-slate-800">{teachers.length} Giảng viên</h3>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                      <ClipboardList className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">Lớp học phần mở</p>
                      <h3 className="text-2xl font-bold text-slate-800">{classes.length} Lớp</h3>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">Ngành đào tạo</p>
                      <h3 className="text-2xl font-bold text-slate-800">{INITIAL_COURSES.length} Ngành</h3>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Hồ sơ cá nhân */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                    <h2 className="text-md font-bold text-slate-800 flex items-center">
                      <User className="w-4 h-4 mr-2 text-indigo-600" /> Thông tin tài khoản đăng nhập
                    </h2>
                    <div className="flex flex-col items-center py-4 border-y border-slate-100">
                      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-150 flex items-center justify-center text-2xl font-bold mb-2">
                        {currentUser.name.charAt(0)}
                      </div>
                      <h3 className="font-bold text-slate-800">{currentUser.name}</h3>
                      <span className={`inline-block px-2.5 py-0.5 mt-1 text-[10px] font-bold rounded-full border ${getRoleLabel(currentUser.role).color}`}>
                        {getRoleLabel(currentUser.role).text}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Tên đăng nhập:</span>
                        <span className="font-semibold text-slate-800">{currentUser.username}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email hệ thống:</span>
                        <span className="font-semibold text-slate-800">{currentUser.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bản đồ phân quyền */}
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-md font-bold text-slate-800 flex items-center mb-4">
                      <Shield className="w-4 h-4 mr-2 text-indigo-600" /> Phân quyền hệ thống tích lũy tín chỉ
                    </h2>
                    <div className="overflow-x-auto text-xs">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase">
                            <th className="py-2.5">Nhóm tác vụ</th>
                            <th className="py-2.5 text-center">Quản trị viên</th>
                            <th className="py-2.5 text-center">Cán bộ đào tạo</th>
                            <th className="py-2.5 text-center">Giảng viên</th>
                            <th className="py-2.5 text-center">Học viên</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                          <tr>
                            <td className="py-2.5 font-medium">Thêm, Sửa, Xóa Học sinh, Giáo viên & Lớp</td>
                            <td className="text-center text-emerald-500 font-bold">✔</td>
                            <td className="text-center text-emerald-500 font-bold">✔</td>
                            <td className="text-center text-slate-300">✖</td>
                            <td className="text-center text-slate-300">✖</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-medium">Nhập điểm môn học tích lũy (Quản lý điểm số)</td>
                            <td className="text-center text-emerald-500 font-bold">✔</td>
                            <td className="text-center text-emerald-500 font-bold">✔</td>
                            <td className="text-center text-emerald-500 font-bold">✔</td>
                            <td className="text-center text-slate-300">✖</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-medium">Thiết lập Lịch học & Điểm danh chuyên cần</td>
                            <td className="text-center text-emerald-500 font-bold">✔</td>
                            <td className="text-center text-emerald-500 font-bold">✔</td>
                            <td className="text-center text-slate-300">✖</td>
                            <td className="text-center text-slate-300">✖</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-medium">Xem học bạ tín chỉ quy đổi Hệ 4 (image_10e21e.png)</td>
                            <td className="text-center text-emerald-500 font-bold">✔</td>
                            <td className="text-center text-emerald-500 font-bold">✔</td>
                            <td className="text-center text-emerald-500 font-bold">✔</td>
                            <td className="text-center text-emerald-500 font-bold">✔</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* GIÁO VIÊN HỒ SƠ CÁ NHÂN (CHỈ HIỂN THỊ KHI ĐĂNG NHẬP VAI TRÒ TEACHER) */}
                {isLoggedIn && currentUser.role === 'teacher' && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 mt-6 animate-fade-in">
                    <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">Cập nhật hồ sơ thông tin cá nhân của bạn</h3>
                        <p className="text-xs text-slate-500">Giảng viên có quyền tự điều chỉnh các kênh liên lạc nghiệp vụ</p>
                      </div>
                      <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded">{currentUser.username}</span>
                    </div>

                    {(() => {
                      const currentUserProfile = teachers.find(t => t.id === currentUser.teacherId);
                      if (!currentUserProfile) return null;

                      return (
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          setTeachers(teachers.map(t => t.id === currentUserProfile.id ? currentUserProfile : t));
                          showToast("Lưu thông tin cá nhân thành công!", "success");
                        }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <label className="block text-slate-500 mb-1">Họ và tên giáo viên</label>
                            <input
                              disabled
                              type="text"
                              value={currentUserProfile.name}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-500 mb-1">Khoa / Đơn vị giảng dạy</label>
                            <select
                              disabled
                              value={currentUserProfile.department}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-500"
                            >
                              <option value="Khoa Dịch vụ  - Du lịch - Nhà hàng khách sạn">Khoa Dịch vụ  - Du lịch - Nhà hàng khách sạn</option>
                              <option value="Khoa Kỹ thuật - Công nghệ">Khoa Kỹ thuật - Công nghệ</option>
                              <option value="Khoa Ngôn ngữ">Khoa Ngôn ngữ</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-slate-600 mb-1">Số điện thoại liên hệ *</label>
                            <input
                              type="text"
                              required
                              value={currentUserProfile.phone}
                              onChange={(e) => setTeachers(teachers.map(t => t.id === currentUserProfile.id ? { ...t, phone: e.target.value.replace(/\D/g, '') } : t))}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-600 mb-1">Email giảng vụ *</label>
                            <input
                              type="email"
                              required
                              value={currentUserProfile.email}
                              onChange={(e) => setTeachers(teachers.map(t => t.id === currentUserProfile.id ? { ...t, email: e.target.value } : t))}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-600 mb-1">Học vị / Học hàm *</label>
                            <select
                              value={currentUserProfile.degree}
                              onChange={(e) => setTeachers(teachers.map(t => t.id === currentUserProfile.id ? { ...t, degree: e.target.value } : t))}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800"
                            >
                              <option value="Thạc sĩ">Thạc sĩ</option>
                              <option value="Tiến sĩ">Tiến sĩ</option>
                              <option value="Phó Giáo sư, Tiến sĩ">Phó Giáo sư, Tiến sĩ</option>
                              <option value="Giáo sư, Tiến sĩ">Giáo sư, Tiến sĩ</option>
                              <option value="Cử nhân / Kỹ sư">Cử nhân / Kỹ sư</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-slate-600 mb-1">Lĩnh vực chuyên môn chính *</label>
                            <input
                              type="text"
                              required
                              value={currentUserProfile.specialty}
                              onChange={(e) => setTeachers(teachers.map(t => t.id === currentUserProfile.id ? { ...t, specialty: e.target.value } : t))}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800"
                            />
                          </div>

                          <div className="sm:col-span-2 pt-2">
                            <button
                              type="submit"
                              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all cursor-pointer shadow-sm"
                            >
                              Cập nhật hồ sơ cá nhân
                            </button>
                          </div>
                        </form>
                      );
                    })()}
                  </div>
                )}

              </div>
            )}

            {/* ================= TAB: QUẢN LÝ HỌC VIÊN ================= */}
            {activeTab === 'students' && (
              <div className="space-y-4 animate-fade-in">
                
                {/* Bộ lọc ngành học ở Tab Học viên */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xs font-bold text-slate-500 uppercase">Ngành đào tạo:</span>
                    <select
                      value={studentFilterMajor}
                      onChange={(e) => setStudentFilterMajor(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-3 py-2.5 focus:outline-none"
                    >
                      {INITIAL_COURSES.map(course => (
                        <option key={course.id} value={course.name}>{course.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-2 w-full sm:w-auto">
                    <button 
                      onClick={() => downloadExcelTemplate('students')}
                      className="flex-1 sm:flex-none px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" /> File mẫu Excel
                    </button>

                    {hasAccess(['admin', 'staff']) && (
                      <label className="flex-1 sm:flex-none px-3 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-150 text-xs font-bold rounded-xl flex items-center justify-center cursor-pointer transition-all">
                        <Upload className="w-3.5 h-3.5 mr-1.5" /> Nhập Excel
                        <input 
                          type="file" 
                          accept=".xlsx, .xls" 
                          onChange={(e) => handleExcelImport(e, 'students')} 
                          className="hidden" 
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs text-slate-800"
                      placeholder="Tìm kiếm: Tên học viên, Mã số, SĐT, Lớp..."
                    />
                  </div>

                  <div className="flex items-center space-x-2.5 w-full md:w-auto justify-end">
                    <div className="flex items-center space-x-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-150">
                      <Filter className="w-3.5 h-3.5 text-slate-500" />
                      <select
                        value={studentFilterStatus}
                        onChange={(e) => setStudentFilterStatus(e.target.value)}
                        className="bg-transparent border-none text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                      >
                        <option value="All">Tất cả Trạng thái</option>
                        <option value="Đang học">Đang học</option>
                        <option value="Bảo lưu">Bảo lưu</option>
                        <option value="Tốt nghiệp">Tốt nghiệp</option>
                        <option value="Buộc thôi học">Buộc thôi học</option>
                      </select>
                    </div>

                    {hasAccess(['admin', 'staff']) && (
                      <button
                        onClick={() => handleOpenStudentModal('add')}
                        className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Thêm học viên
                      </button>
                    )}
                  </div>
                </div>

                {/* Danh sách Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                          <th className="py-3 px-4">Mã HV</th>
                          <th className="py-3 px-4">Họ và Tên</th>
                          <th className="py-3 px-4">Ngày sinh</th>
                          <th className="py-3 px-4">Lớp / Ngành nghề</th>
                          <th className="py-3 px-4">Thông tin liên hệ</th>
                          <th className="py-3 px-4 text-center">Trạng thái</th>
                          <th className="py-3 px-4 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map((st) => (
                            <tr key={st.id} className="hover:bg-slate-50/50">
                              <td className="py-3 px-4 font-mono font-bold text-slate-900">{st.id}</td>
                              <td className="py-3 px-4 font-semibold text-slate-800">{st.name}</td>
                              <td className="py-3 px-4">{st.dob} ({st.gender})</td>
                              <td className="py-3 px-4">
                                <span className="block font-semibold text-indigo-600">{st.class}</span>
                                <span className="text-[10px] text-slate-400">{st.major}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="block">{st.phone || <em className="text-slate-400">Chưa cung cấp</em>}</span>
                                <span className="text-[10px] block text-slate-400">{st.email || <em className="text-slate-400">Chưa cung cấp</em>}</span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className={`inline-block px-2 py-0.5 rounded-full font-semibold ${
                                  st.status === 'Đang học' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                  st.status === 'Bảo lưu' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                  st.status === 'Tốt nghiệp' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                  'bg-rose-50 text-rose-700 border border-rose-100 animate-pulse'
                                }`}>
                                  {st.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end space-x-1.5">
                                  {hasAccess(['admin', 'staff']) ? (
                                    <>
                                      <button onClick={() => handleOpenStudentModal('edit', st)} className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"><Edit className="w-3.5 h-3.5 text-indigo-500" /></button>
                                      <button onClick={() => handleDeleteStudent(st.id, st.name)} className="p-1 text-rose-600 hover:bg-rose-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </>
                                  ) : (
                                    <span className="text-slate-400 italic">Chỉ xem</span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="py-10 text-center text-slate-400">Không tìm thấy học viên nào phù hợp.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ================= TAB: HỒ SƠ GIẢNG VIÊN ================= */}
            {activeTab === 'teachers' && (
              <div className="space-y-4 animate-fade-in">
                
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={teacherSearch}
                      onChange={(e) => setTeacherSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-550 text-xs"
                      placeholder="Tìm kiếm: Tên, Chuyên môn, Khoa..."
                    />
                  </div>

                  <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
                    <div className="flex items-center space-x-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-150">
                      <Filter className="w-3.5 h-3.5 text-slate-500" />
                      <select
                        value={teacherFilterDept}
                        onChange={(e) => setTeacherFilterDept(e.target.value)}
                        className="bg-transparent border-none text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                      >
                        <option value="All">Tất cả Khoa</option>
                        <option value="Khoa Dịch vụ  - Du lịch - Nhà hàng khách sạn">Khoa Dịch vụ  - Du lịch - Nhà hàng khách sạn</option>
                        <option value="Khoa Kỹ thuật - Công nghệ">Khoa Kỹ thuật - Công nghệ</option>
                        <option value="Khoa Ngôn ngữ">Khoa Ngôn ngữ</option>
                      </select>
                    </div>

                    <button onClick={() => downloadExcelTemplate('teachers')} className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center transition-all cursor-pointer"><Download className="w-3.5 h-3.5 mr-1.5" /> File mẫu</button>
                    {hasAccess(['admin', 'staff']) && (
                      <label className="px-3 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-750 border border-emerald-150 text-xs font-bold rounded-xl flex items-center cursor-pointer transition-all">
                        <Upload className="w-3.5 h-3.5 mr-1.5" /> Nhập Excel
                        <input type="file" accept=".xlsx, .xls" onChange={(e) => handleExcelImport(e, 'teachers')} className="hidden" />
                      </label>
                    )}
                    {hasAccess(['admin', 'staff']) && (
                      <button onClick={() => handleOpenTeacherModal('add')} className="py-2.5 px-4 bg-indigo-650 hover:bg-indigo-755 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"><Plus className="w-4 h-4 mr-1" /> Thêm giảng viên</button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTeachers.map((tc) => (
                    <div key={tc.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">{tc.id}</span>
                          <span className="text-[10px] font-bold text-indigo-650 uppercase">{tc.degree}</span>
                        </div>
                        <h3 className="font-bold text-slate-800 text-sm">{tc.name}</h3>
                        <p className="text-xs text-slate-500">{tc.department}</p>
                        
                        <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                          <div className="flex items-center"><Briefcase className="w-3.5 h-3.5 mr-2 text-slate-400" /> <span>{tc.specialty}</span></div>
                          <div className="flex items-center"><Phone className="w-3.5 h-3.5 mr-2 text-slate-400" /> <span>{tc.phone}</span></div>
                          <div className="flex items-center"><Mail className="w-3.5 h-3.5 mr-2 text-slate-400" /> <span className="font-mono">{tc.email}</span></div>
                        </div>
                      </div>

                      {hasAccess(['admin', 'staff']) && (
                        <div className="flex justify-end space-x-1.5 pt-3 border-t border-slate-50 mt-3">
                          <button onClick={() => handleOpenTeacherModal('edit', tc)} className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"><Edit className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDeleteTeacher(tc.id, tc.name)} className="p-1 text-rose-600 hover:bg-rose-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ================= TAB: QUẢN LÝ LỚP HỌC ================= */}
            {activeTab === 'classes' && (
              <div className="space-y-4 animate-fade-in">
                
                {/* Thanh điều khiển nâng cao */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto items-center">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={classSearch}
                        onChange={(e) => setClassSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                        placeholder="Tìm lớp: Tên lớp, Địa điểm..."
                      />
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <span className="text-xs font-bold text-slate-500 uppercase shrink-0">Ngành:</span>
                      <select
                        value={classFilterMajor}
                        onChange={(e) => setClassFilterMajor(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-3 py-2.5 focus:outline-none w-full"
                      >
                        <option value="All">Tất cả Ngành nghề</option>
                        {INITIAL_COURSES.map(course => (
                          <option key={course.id} value={course.name}>{course.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 w-full md:w-auto justify-end">
                    <button 
                      onClick={() => downloadExcelTemplate('classes')} 
                      className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" /> Mẫu Excel Lớp
                    </button>

                    {hasAccess(['admin', 'staff']) && (
                      <label className="px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-150 text-xs font-bold rounded-xl flex items-center cursor-pointer transition-all">
                        <Upload className="w-3.5 h-3.5 mr-1.5" /> Nhập Excel Lớp
                        <input 
                          type="file" 
                          accept=".xlsx, .xls" 
                          onChange={(e) => handleExcelImport(e, 'classes')} 
                          className="hidden" 
                        />
                      </label>
                    )}

                    {hasAccess(['admin', 'staff']) && (
                      <button 
                        onClick={() => handleOpenClassModal('add')} 
                        className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center cursor-pointer transition-all"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Thêm Lớp Mới
                      </button>
                    )}
                  </div>
                </div>

                {/* Bảng danh sách lớp */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto text-xs">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                          <th className="py-3 px-4 w-24">Mã lớp</th>
                          <th className="py-3 px-4">Tên lớp hành chính</th>
                          <th className="py-3 px-4">Ngành nghề đào tạo</th>
                          <th className="py-3 px-4">Giáo viên chủ nhiệm (GVCN)</th>
                          <th className="py-3 px-4">Sĩ số lớp / Địa điểm liên kết</th>
                          <th className="py-3 px-4 w-44">Thời gian</th>
                          <th className="py-3 px-4 text-right w-36">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {filteredClasses.length > 0 ? (
                          filteredClasses.map((cl) => {
                            const teacher = teachers.find(t => t.id === cl.teacherId);
                            const currentEnrolledCount = enrollments.filter(e => e.classId === cl.id).length;

                            return (
                              <tr key={cl.id} className="hover:bg-slate-50/50">
                                <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{cl.id}</td>
                                <td className="py-3.5 px-4 font-bold text-slate-800">{cl.name}</td>
                                <td className="py-3.5 px-4 font-semibold text-slate-600">{cl.major}</td>
                                <td className="py-3.5 px-4">
                                  <span className="font-semibold text-slate-800">{teacher?.name || 'Chưa phân công'}</span>
                                  <span className="text-[10px] block text-slate-400">{teacher?.degree}</span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="block">Sĩ số lớp: <strong className="text-slate-950">{cl.quota} học sinh</strong> (Xếp lớp: {currentEnrolledCount})</span>
                                  <span className="text-[10px] text-indigo-650 font-medium block mt-0.5">{cl.location}</span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="block text-[10px] font-bold text-amber-600">{cl.term}</span>
                                  <span className="text-[10px] block text-slate-400">Từ {cl.startDate} đến {cl.endDate}</span>
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <div className="flex items-center justify-end space-x-1">
                                    <button 
                                      onClick={() => { setSelectedMajorForGrades(cl.major); setActiveTab('grades'); }} 
                                      className="px-2 py-1 bg-slate-100 hover:bg-indigo-50 text-indigo-700 font-bold rounded-lg mr-1" 
                                      title="Xem học bạ ngành"
                                    >
                                      Điểm
                                    </button>
                                    <button 
                                      onClick={() => exportClassToCSV(cl.id)} 
                                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded" 
                                      title="Xuất CSV"
                                    >
                                      <Printer className="w-3.5 h-3.5" />
                                    </button>
                                    {hasAccess(['admin', 'staff']) && (
                                      <>
                                        <button onClick={() => handleOpenClassModal('edit', cl)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded"><Edit className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => handleDeleteClass(cl.id, cl.name)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="7" className="py-10 text-center text-slate-400">Không có lớp học nào thỏa mãn điều kiện tìm kiếm.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ================= TAB: QUẢN LÝ ĐIỂM SỐ ================= */}
            {activeTab === 'grades' && (
              <div className="space-y-4 animate-fade-in">
                
                {/* Header Sổ điểm lớp theo ngành */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-bold text-slate-500 uppercase">Chọn ngành đào tạo:</span>
                      <select
                        disabled={currentUser.role === 'student'}
                        value={selectedMajorForGrades}
                        onChange={(e) => setSelectedMajorForGrades(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-3 py-2.5 focus:outline-none cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {INITIAL_COURSES.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    {!hasAccess(['student']) && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setGradeViewMode('edit')}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${gradeViewMode === 'edit' ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                        >
                          Nhập điểm dạng lưới (Excel style)
                        </button>
                        <button 
                          onClick={() => setGradeViewMode('scoreboard')}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${gradeViewMode === 'scoreboard' ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                        >
                          Thống kê kết quả ngành học
                        </button>
                      </div>
                    )}
                  </div>

                  {!hasAccess(['student']) && (
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-slate-100 pt-4">
                      <div className="relative w-full md:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="text"
                          value={gradeSearchText}
                          onChange={(e) => setGradeSearchText(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none"
                          placeholder="Mã số, họ tên học viên..."
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        <span className="text-xs font-semibold text-slate-500 mr-2">
                          Tổng số môn khung: <strong className="text-indigo-650">{subjectsOfSelectedMajorForGrades.length} môn</strong>
                        </span>
                        
                        <button 
                          onClick={() => downloadGradeTemplate(selectedMajorForGrades)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center transition-all cursor-pointer"
                          title="Tải mẫu Excel nhập điểm"
                        >
                          <Download className="w-3.5 h-3.5 mr-1" /> Tải file mẫu nhập điểm
                        </button>

                        {hasAccess(['admin', 'staff', 'teacher']) && (
                          <label className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-150 text-xs font-bold rounded-xl flex items-center cursor-pointer transition-all" title="Nhập điểm trực tiếp từ file Excel giống ĐIỂM TK-CBMA.xlsx">
                            <Upload className="w-3.5 h-3.5 mr-1" /> Nhập điểm từ Excel
                            <input 
                              type="file" 
                              accept=".xlsx, .xls" 
                              onChange={handleGradeExcelImport} 
                              className="hidden" 
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Chú dẫn mô-đun (Module Legend) */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-2 cursor-pointer" onClick={() => setIsLegendOpen(!isLegendOpen)}>
                    <span className="font-bold text-slate-700 flex items-center"><BookOpen className="w-4 h-4 mr-1.5 text-indigo-600" /> Bảng Chú dẫn Mã Mô-đun đào tạo của Ngành</span>
                    <span className="text-[10px] text-indigo-650 font-bold underline">{isLegendOpen ? "Thu gọn ▲" : "Mở rộng ▼"}</span>
                  </div>
                  {isLegendOpen && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-slate-600 animate-fade-in">
                      {subjectsOfSelectedMajorForGrades.map(sub => {
                        const nameLower = sub.name.toLowerCase();
                        const isExcluded = nameLower.includes("thể chất") || nameLower.includes("quốc phòng") || nameLower.includes("qp-an") || nameLower.includes("qp - an");
                        return (
                          <div key={sub.id} className="p-1.5 bg-slate-50 border border-slate-150 rounded flex flex-col">
                            <span className="font-bold text-slate-800 font-mono">{sub.id} • {sub.credits} tín</span>
                            <span className="truncate text-slate-550" title={sub.name}>{sub.name}</span>
                            {isExcluded && <span className="text-[9px] text-rose-500 font-bold">(Đặc thù - Không tính GPA)</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Chế độ nhập điểm dạng lưới (Excel Style) */}
                {gradeViewMode === 'edit' ? (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <p>💡 <strong>Hướng dẫn:</strong> Bảng điểm dưới đây hiển thị điểm trung bình tích lũy Hệ 4 được tính theo Thông tư quy định. Các môn <em>Giáo dục thể chất</em> và <em>Giáo dục QP-AN</em> được tự động loại trừ khỏi điểm trung bình.</p>
                      <span className="font-semibold text-indigo-700">Quy chuẩn Thang 4 & Điểm chữ</span>
                    </div>

                    <div className="overflow-x-auto max-w-full">
                      <table className="w-full text-left text-xs table-fixed">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                            <th className="py-3 px-4 w-32 sticky left-0 bg-slate-50 z-10 border-r border-slate-150">Mã Học Viên</th>
                            <th className="py-3 px-4 w-48 sticky left-32 bg-slate-50 z-10 border-r border-slate-150">Họ và Tên</th>
                            {subjectsOfSelectedMajorForGrades.map(sub => (
                              <th 
                                key={sub.id} 
                                className="py-3 px-2 w-20 text-center border-r border-slate-100 hover:bg-slate-100 cursor-help transition-colors"
                                title={`${sub.id} - ${sub.name} (${sub.credits} tín chỉ, ${sub.hours} tiết)`}
                              >
                                <span className="block font-bold text-slate-900">{sub.id}</span>
                                <span className="text-[9px] text-indigo-650 block">({sub.credits}T)</span>
                              </th>
                            ))}
                            <th className="py-3 px-4 w-24 text-center sticky right-0 bg-slate-50 z-10 border-l border-slate-150 font-bold text-indigo-700">GPA (Hệ 4)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 text-slate-700">
                          {studentsOfSelectedMajorForGrades.length > 0 ? (
                            studentsOfSelectedMajorForGrades.map((st) => {
                              const gpaInfo = getTermGPAOfStudent(st.id, selectedMajorForGrades, grades, subjects);

                              return (
                                <tr key={st.id} className="hover:bg-slate-50/50">
                                  <td className="py-2 px-4 font-mono font-bold text-slate-950 sticky left-0 bg-white z-10 border-r border-slate-150">{st.id}</td>
                                  
                                  {/* Tên học viên kèm nút bấm sửa điểm inline tiện dụng */}
                                  <td className="py-2 px-4 font-semibold text-slate-800 sticky left-32 bg-white z-10 border-r border-slate-150 truncate">
                                    <div className="flex items-center justify-between">
                                      <span className="truncate">{st.name}</span>
                                      {hasAccess(['admin', 'staff', 'teacher']) && (
                                        <button
                                          onClick={() => handleOpenGradeEditModal(st.id)}
                                          className="ml-2 p-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                                          title="Chỉnh sửa toàn bộ điểm học viên này"
                                        >
                                          <Edit className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                  
                                  {subjectsOfSelectedMajorForGrades.map(sub => {
                                    const grade = grades.find(g => g.studentId === st.id && g.subjectId === sub.id);
                                    const currentScore = grade ? grade.score : '';

                                    return (
                                      <td key={sub.id} className="py-1 px-1 border-r border-slate-100 text-center">
                                        <input
                                          type="number"
                                          disabled={!hasAccess(['admin', 'staff', 'teacher'])}
                                          min="0" max="10" step="0.1"
                                          value={currentScore}
                                          onChange={(e) => handleUpdateGradeDirectly(st.id, sub.id, e.target.value)}
                                          className="w-12 px-1 py-1 border border-slate-200 rounded text-center disabled:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold text-xs text-slate-800 transition-shadow"
                                          placeholder="-"
                                        />
                                      </td>
                                    );
                                  })}

                                  <td className="py-2 px-4 text-center sticky right-0 bg-white z-10 border-l border-slate-150 font-extrabold text-sm text-indigo-700">
                                    {gpaInfo.credits > 0 ? (
                                      <div title={`${gpaInfo.credits} tín chỉ tính điểm GPA (đã loại trừ môn đặc thù)`}>
                                        {gpaInfo.gpa.toFixed(2)}
                                        <span className="text-[9px] block text-slate-450 font-medium">({gpaInfo.label})</span>
                                      </div>
                                    ) : (
                                      <span className="text-slate-350 font-normal">-</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={subjectsOfSelectedMajorForGrades.length + 3} className="py-12 text-center text-slate-400">Không tìm thấy học sinh nào thuộc ngành {selectedMajorForGrades}.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  /* Chế độ bảng điểm học kỳ tổng hợp */
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-800">Thống kê học thuật ngành {selectedMajorForGrades}</h3>
                        <p className="text-xs text-slate-500">Tự động loại trừ Giáo dục thể chất & Giáo dục QP-AN khỏi điểm trung bình tích lũy theo quy định</p>
                      </div>
                      <button 
                        onClick={() => window.print()}
                        className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-150 text-indigo-700 text-xs font-bold rounded-xl flex items-center transition-all cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 mr-1.5" /> In thống kê điểm số ngành
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <span className="text-slate-400 block font-semibold uppercase">Điểm tích lũy trung bình ngành (Hệ 4)</span>
                        <h4 className="text-2xl font-bold mt-1 text-indigo-650">
                          {(() => {
                            const GPAs = studentsOfSelectedMajorForGrades.map(st => {
                              return getTermGPAOfStudent(st.id, selectedMajorForGrades, grades, subjects);
                            }).filter(g => g.credits > 0);
                            
                            if (GPAs.length === 0) return '0.00';
                            return (GPAs.reduce((sum, g) => sum + g.gpa, 0) / GPAs.length).toFixed(2);
                          })()} / 4.00
                        </h4>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl">
                        <span className="text-slate-400 block font-semibold uppercase">Tổng tín chỉ tích lũy tối đa</span>
                        <h4 className="text-2xl font-bold mt-1 text-emerald-650">
                          {subjectsOfSelectedMajorForGrades.reduce((sum, current) => sum + current.credits, 0)} Tín chỉ
                        </h4>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl">
                        <span className="text-slate-400 block font-semibold uppercase">Quy mô học sinh ngành</span>
                        <h4 className="text-2xl font-bold mt-1 text-slate-800">{studentsOfSelectedMajorForGrades.length} Học viên</h4>
                      </div>
                    </div>

                    <div className="overflow-x-auto text-xs">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase">
                            <th className="py-2.5 px-2">Mã Học Viên</th>
                            <th className="py-2.5 px-2">Họ và Tên</th>
                            <th className="py-2.5 px-2 text-center">Tín Chỉ Đã Học</th>
                            <th className="py-2.5 px-2 text-center">Tín Chỉ Tích Lũy (Tính GPA)</th>
                            <th className="py-2.5 px-2 text-center">GPA Tích Lũy (Hệ 4)</th>
                            <th className="py-2.5 px-2 text-right">Xếp loại tốt nghiệp (GPA)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {studentsOfSelectedMajorForGrades.map(st => {
                            const gpaInfo = getTermGPAOfStudent(st.id, selectedMajorForGrades, grades, subjects);

                            // Tính tín chỉ tích lũy thực tế cho xét tốt nghiệp (bao gồm cả môn đặc thù nếu đạt điểm >= 4.0)
                            let earnedCreditsTotal = 0;
                            subjectsOfSelectedMajorForGrades.forEach(sub => {
                              const grade = grades.find(g => g.studentId === st.id && g.subjectId === sub.id);
                              if (grade && grade.score >= 4.0) {
                                earnedCreditsTotal += sub.credits;
                              }
                            });

                            return (
                              <tr key={st.id}>
                                <td className="py-3 px-2 font-mono font-bold">{st.id}</td>
                                <td className="py-3 px-2 font-semibold text-slate-800">{st.name}</td>
                                <td className="py-3 px-2 text-center font-semibold">
                                  {earnedCreditsTotal} tín chỉ
                                </td>
                                <td className="py-3 px-2 text-center font-bold text-emerald-600">
                                  {gpaInfo.credits} tín chỉ
                                </td>
                                <td className="py-3 px-2 text-center font-extrabold text-indigo-600">
                                  {gpaInfo.credits > 0 ? gpaInfo.gpa.toFixed(2) : '-'}
                                </td>
                                <td className="py-3 px-2 text-right">
                                  {gpaInfo.credits > 0 ? (
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                                      gpaInfo.label === 'Xuất sắc' ? 'bg-purple-100 text-purple-850 border-purple-200' :
                                      gpaInfo.label === 'Giỏi' ? 'bg-emerald-100 text-emerald-850 border-emerald-200' :
                                      gpaInfo.label === 'Khá' ? 'bg-indigo-100 text-indigo-850 border-indigo-200' :
                                      gpaInfo.label === 'Trung bình' ? 'bg-amber-100 text-amber-850 border-amber-200' :
                                      'bg-rose-100 text-rose-850 border-rose-200'
                                    }`}>
                                      {gpaInfo.label}
                                    </span>
                                  ) : '-'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ================= TAB: LỊCH HỌC & ĐIỂM DANH ================= */}
            {activeTab === 'schedule' && (
              <div className="space-y-4 animate-fade-in">
                
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-bold text-slate-500 uppercase">Chọn lớp học phần:</span>
                      <select
                        value={selectedClassIdForAttendance}
                        onChange={(e) => {
                          setSelectedClassIdForAttendance(e.target.value);
                          setActiveScheduleIdForAttendance(null);
                        }}
                        className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-3 py-2.5 focus:outline-none cursor-pointer"
                      >
                        {classes.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                        ))}
                      </select>
                    </div>

                    {hasAccess(['admin', 'staff']) && (
                      <button 
                        onClick={() => setIsAddScheduleModalOpen(true)}
                        className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-755 text-white text-xs font-bold rounded-xl shadow-md flex items-center cursor-pointer"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Thêm buổi học mới
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                    <h3 className="font-bold text-slate-800 text-sm">Thời khóa biểu chi tiết của lớp</h3>
                    <div className="space-y-2">
                      {schedulesOfSelectedClass.length > 0 ? (
                        schedulesOfSelectedClass.map((sch) => (
                          <button
                            key={sch.id}
                            onClick={() => setActiveScheduleIdForAttendance(sch.id)}
                            className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                              activeScheduleIdForAttendance === sch.id 
                                ? 'bg-indigo-50 border-indigo-250' 
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-150'
                            }`}
                          >
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-indigo-600 block uppercase">Buổi {sch.sessionNum} - {sch.date}</span>
                              <span className="text-xs font-bold text-slate-800 truncate block">{sch.topic}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </button>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 text-center py-6">Lớp học phần chưa được thiết lập lịch học chi tiết.</p>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    {activeScheduleIdForAttendance ? (
                      <div className="space-y-4 animate-fade-in">
                        {(() => {
                          const activeSchedule = schedules.find(s => s.id === activeScheduleIdForAttendance);
                          return (
                            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                              <div>
                                <h4 className="text-sm font-bold text-slate-900">Sổ điểm danh chuyên cần - Buổi {activeSchedule?.sessionNum}</h4>
                                <p className="text-xs text-slate-500">Chuyên đề bài học: <strong className="text-slate-800">{activeSchedule?.topic}</strong></p>
                              </div>
                              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{activeSchedule?.date}</span>
                            </div>
                          );
                        })()}

                        <div className="overflow-x-auto text-xs">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="border-b border-slate-100 text-slate-500 font-semibold uppercase">
                                <th className="py-2">Mã sinh viên</th>
                                <th className="py-2">Họ và Tên</th>
                                <th className="py-2 text-center w-64">Điểm danh điểm số</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {students.filter(st => {
                                const enrolledIds = enrollments.filter(e => e.classId === selectedClassIdForAttendance).map(e => e.studentId);
                                return enrolledIds.includes(st.id);
                              }).map(st => {
                                const currentStatus = (attendance[activeScheduleIdForAttendance] || {})[st.id] || 'P';
                                return (
                                  <tr key={st.id}>
                                    <td className="py-3 font-mono font-bold text-slate-900">{st.id}</td>
                                    <td className="py-3 font-semibold text-slate-800">{st.name}</td>
                                    <td className="py-3">
                                      <div className="flex justify-center space-x-1.5">
                                        <button
                                          disabled={!hasAccess(['admin', 'staff', 'teacher'])}
                                          onClick={() => handleAttendanceChange(activeScheduleIdForAttendance, st.id, 'P')}
                                          className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all ${
                                            currentStatus === 'P' ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                          }`}
                                        >
                                          CÓ MẶT
                                        </button>
                                        <button
                                          disabled={!hasAccess(['admin', 'staff', 'teacher'])}
                                          onClick={() => handleAttendanceChange(activeScheduleIdForAttendance, st.id, 'E')}
                                          className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all ${
                                            currentStatus === 'E' ? 'bg-amber-500 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                          }`}
                                        >
                                          CÓ PHÉP
                                        </button>
                                        <button
                                          disabled={!hasAccess(['admin', 'staff', 'teacher'])}
                                          onClick={() => handleAttendanceChange(activeScheduleIdForAttendance, st.id, 'A')}
                                          className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all ${
                                            currentStatus === 'A' ? 'bg-rose-500 text-white' : 'bg-slate-50 text-slate-550 hover:bg-slate-100'
                                          }`}
                                        >
                                          VẮNG MẶT
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col justify-center items-center py-10 text-slate-400">
                        <ClipboardList className="w-12 h-12 mb-2 text-slate-200 animate-pulse" />
                        <p className="text-sm font-semibold">Sổ điểm danh thời gian thực</p>
                        <p className="text-xs mt-1 text-slate-400">Hãy chọn một buổi học cụ thể ở cột bên trái để tiến hành kiểm diện học viên.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* ================= TAB: CHƯƠNG TRÌNH ĐÀO TẠO ================= */}
            {activeTab === 'curriculum' && (
              <div className="space-y-4 animate-fade-in">
                
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-bold text-slate-500 uppercase">Khung chương trình:</span>
                    <select
                      value={studentFilterMajor}
                      onChange={(e) => setStudentFilterMajor(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-3 py-2.5 focus:outline-none cursor-pointer"
                    >
                      {INITIAL_COURSES.map(course => (
                        <option key={course.id} value={course.name}>{course.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-4 text-xs font-semibold text-slate-605">
                    <span>Tổng số tín chỉ: <strong className="text-indigo-600">{subjects.filter(s => s.major === studentFilterMajor).reduce((sum, current) => sum + current.credits, 0)} Tín chỉ</strong></span>
                    <span>| Tổng môn: <strong className="text-slate-800">{subjects.filter(s => s.major === studentFilterMajor).length} môn</strong></span>
                  </div>

                  {hasAccess(['admin', 'staff']) && (
                    <button
                      onClick={() => handleOpenSubjectModal('add')}
                      className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-755 text-white text-xs font-bold rounded-xl shadow-md flex items-center transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4 mr-1.5" /> Thêm môn học mới
                    </button>
                  )}
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
                  <div className="overflow-x-auto text-xs">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                          <th className="py-3 px-4">Mã Môn</th>
                          <th className="py-3 px-4">Tên môn học / Mô đun môn</th>
                          <th className="py-3 px-4">Loại môn học</th>
                          <th className="py-3 px-4 text-center">Số tín chỉ</th>
                          <th className="py-3 px-4 text-center">Thời lượng học tập (Giờ)</th>
                          <th className="py-3 px-4 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {subjects.filter(s => s.major === studentFilterMajor).map((sub) => (
                          <tr key={sub.id} className="hover:bg-slate-50/20">
                            <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{sub.id}</td>
                            <td className="py-2.5 px-4 font-semibold text-slate-800">{sub.name}</td>
                            <td className="py-2.5 px-4 text-slate-500">{sub.type}</td>
                            <td className="py-2.5 px-4 text-center font-bold text-indigo-650">{sub.credits} Tín</td>
                            <td className="py-2.5 px-4 text-center font-semibold">{sub.hours} Giờ</td>
                            <td className="py-2.5 px-4 text-right">
                              <div className="flex items-center justify-end space-x-1.5">
                                {hasAccess(['admin', 'staff']) ? (
                                  <>
                                    <button
                                      onClick={() => handleOpenSubjectModal('edit', sub)}
                                      className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"
                                      title="Sửa môn học"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteSubject(sub.id, sub.name, sub.major)}
                                      className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                                      title="Xóa môn học"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                ) : (
                                  <span className="text-slate-400 italic">Chỉ xem</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

          </main>
        </div>
      )}

      {/* ================= MODAL: THAY ĐỔI MẬT KHẨU ================= */}
      {isChangePassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base flex items-center">
                <Lock className="w-4 h-4 mr-2" /> Đổi mật khẩu tài khoản
              </h3>
              <button 
                onClick={() => { setIsChangePassModalOpen(false); setChangePassError(''); }} 
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="p-6 space-y-4 text-xs">
              {changePassError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                  <span>{changePassError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-605 uppercase tracking-wider mb-1.5">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  required
                  value={changePassForm.oldPassword}
                  onChange={(e) => setChangePassForm({ ...changePassForm, oldPassword: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Nhập mật khẩu đang dùng"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-605 uppercase tracking-wider mb-1.5">Mật khẩu mới</label>
                <input
                  type="password"
                  required
                  value={changePassForm.newPassword}
                  onChange={(e) => setChangePassForm({ ...changePassForm, newPassword: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Nhập mật khẩu mới từ 3 kí tự"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-605 uppercase tracking-wider mb-1.5">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  required
                  value={changePassForm.confirmPassword}
                  onChange={(e) => setChangePassForm({ ...changePassForm, confirmPassword: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Gõ lại mật khẩu mới"
                />
              </div>

              <div className="flex space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsChangePassModalOpen(false); setChangePassError(''); }}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Hủy thao tác
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-indigo-650 hover:bg-indigo-755 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: THÊM / SỬA MÔN HỌC ================= */}
      {isSubjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-indigo-950 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-405" />
                {subjectFormMode === 'add' ? 'Thêm môn học mới' : 'Cập nhật môn học/mô-đun'}
              </h3>
              <button onClick={() => setIsSubjectModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubject} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Ngành nghề giảng dạy</label>
                <input
                  type="text"
                  disabled
                  value={currentSubjectData.major}
                  className="w-full px-3.5 py-2.5 border border-slate-250 rounded-xl bg-slate-100 text-slate-500 text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-605 uppercase mb-1.5">Mã môn học *</label>
                  <input
                    type="text"
                    required
                    disabled={subjectFormMode === 'edit'}
                    value={currentSubjectData.id}
                    onChange={(e) => setCurrentSubjectData({ ...currentSubjectData, id: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-800 disabled:bg-slate-50"
                    placeholder="VD: MH27"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-605 uppercase mb-1.5">Loại môn học *</label>
                  <select
                    value={currentSubjectData.type}
                    onChange={(e) => setCurrentSubjectData({ ...currentSubjectData, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                  >
                    <option value="Các môn học chung">Các môn học chung</option>
                    <option value="Môn học, mô đun cơ sở">Môn học, mô đun cơ sở</option>
                    <option value="Môn học, mô đun chuyên môn">Môn học, mô đun chuyên môn</option>
                    <option value="Môn học, mô đun tự chọn">Môn học, mô đun tự chọn</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-605 uppercase mb-1.5">Tên môn học / mô-đun *</label>
                <input
                  type="text"
                  required
                  value={currentSubjectData.name}
                  onChange={(e) => setCurrentSubjectData({ ...currentSubjectData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800"
                  placeholder="Nhập tên môn"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1.5">Số tín chỉ *</label>
                  <input
                    type="number"
                    required
                    step="0.5"
                    min="0.5"
                    max="15"
                    value={currentSubjectData.credits}
                    onChange={(e) => setCurrentSubjectData({ ...currentSubjectData, credits: parseFloat(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1.5">Tổng số giờ (tiết) *</label>
                  <input
                    type="number"
                    required
                    min="15"
                    max="300"
                    value={currentSubjectData.hours}
                    onChange={(e) => setCurrentSubjectData({ ...currentSubjectData, hours: parseInt(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSubjectModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Lưu môn học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: THÊM / SỬA HỌC VIÊN ================= */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-indigo-950 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-indigo-400" />
                {studentFormMode === 'add' ? 'Thêm mới Hồ sơ Học viên' : 'Cập nhật Hồ sơ Học viên'}
              </h3>
              <button onClick={() => setIsStudentModalOpen(false)} className="text-slate-450 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Mã học viên *</label>
                  <input
                    type="text"
                    required
                    disabled={studentFormMode === 'edit'}
                    value={currentStudentData.id}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, id: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono font-bold text-slate-800 disabled:bg-slate-50"
                    placeholder="VD: HV005"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={currentStudentData.name}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Ngày sinh *</label>
                  <input
                    type="date"
                    required
                    value={currentStudentData.dob}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Giới tính *</label>
                  <select
                    value={currentStudentData.gender}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Số CCCD (12 chữ số) *</label>
                  <input
                    type="text"
                    required
                    maxLength={12}
                    value={currentStudentData.cccd}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, cccd: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono"
                    placeholder="012345678912"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Điện thoại liên hệ</label>
                  <input
                    type="tel"
                    value={currentStudentData.phone || ''}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Địa chỉ Email</label>
                  <input
                    type="email"
                    value={currentStudentData.email || ''}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="email@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Lớp hành chính *</label>
                  <input
                    type="text"
                    required
                    value={currentStudentData.class}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, class: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                    placeholder="VD: CNTT-K15"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Ngành, nghề đào tạo *</label>
                  <select
                    value={currentStudentData.major}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, major: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700"
                  >
                    {INITIAL_COURSES.map(course => (
                      <option key={course.id} value={course.name}>{course.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Trạng thái học tập *</label>
                  <select
                    value={currentStudentData.status}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Đang học">Đang học</option>
                    <option value="Bảo lưu">Bảo lưu</option>
                    <option value="Tốt nghiệp">Tốt nghiệp</option>
                    <option value="Buộc thôi học">Buộc thôi học</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Mật khẩu tài khoản *</label>
                  <input
                    type="text"
                    required
                    value={currentStudentData.password || ''}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono"
                    placeholder="Mật khẩu của tài khoản"
                  />
                </div>

              </div>

              <div className="flex space-x-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsStudentModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-indigo-655 hover:bg-indigo-755 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Lưu hồ sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: THÊM / SỬA GIÁO VIÊN ================= */}
      {isTeacherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-teal-950 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-teal-400" />
                {teacherFormMode === 'add' ? 'Thêm mới Giáo viên' : 'Cập nhật hồ sơ Giáo viên'}
              </h3>
              <button onClick={() => setIsTeacherModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacher} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Mã giảng viên *</label>
                  <input
                    type="text"
                    required
                    disabled={teacherFormMode === 'edit'}
                    value={currentTeacherData.id}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, id: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-800"
                    placeholder="VD: GV102"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Họ và tên giảng viên *</label>
                  <input
                    type="text"
                    required
                    value={currentTeacherData.name}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                    placeholder="GS. TS. Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Học vị / Học hàm *</label>
                  <select
                    value={currentTeacherData.degree}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, degree: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Thạc sĩ">Thạc sĩ</option>
                    <option value="Tiến sĩ">Tiến sĩ</option>
                    <option value="Phó Giáo sư, Tiến sĩ">Phó Giáo sư, Tiến sĩ</option>
                    <option value="Giáo sư, Tiến sĩ">Giáo sư, Tiến sĩ</option>
                    <option value="Cử nhân / Kỹ sư">Cử nhân / Kỹ sư</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Đơn vị / Khoa đào tạo *</label>
                  <select
                    value={currentTeacherData.department}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="Khoa Dịch vụ  - Du lịch - Nhà hàng khách sạn">Khoa Dịch vụ  - Du lịch - Nhà hàng khách sạn</option>
                    <option value="Khoa Kỹ thuật - Công nghệ">Khoa Kỹ thuật - Công nghệ</option>
                    <option value="Khoa Ngôn ngữ">Khoa Ngôn ngữ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={currentTeacherData.phone}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                    placeholder="SĐT liên hệ"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-1">Địa chỉ Email *</label>
                  <input
                    type="email"
                    required
                    value={currentTeacherData.email}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                    placeholder="giangvien@tms-edu.vn"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Hướng nghiên cứu chính *</label>
                  <input
                    type="text"
                    required
                    value={currentTeacherData.specialty}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, specialty: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                    placeholder="VD: Nghiên cứu kỹ thuật sấy công nghiệp, lập trình AI"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1">Mật khẩu tài khoản *</label>
                  <input
                    type="text"
                    required
                    value={currentTeacherData.password || ''}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono"
                    placeholder="Mật khẩu đăng nhập"
                  />
                </div>

              </div>

              <div className="flex space-x-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTeacherModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Lưu giảng viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: THÊM / SỬA LỚP HỌC HÀNH CHÍNH ================= */}
      {isClassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-indigo-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base flex items-center">
                <ClipboardList className="w-5 h-5 mr-2 text-indigo-400" />
                {classFormMode === 'add' ? 'Thiết lập Lớp hành chính mới' : 'Chỉnh sửa Lớp hành chính'}
              </h3>
              <button onClick={() => setIsClassModalOpen(false)} className="text-slate-450 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClass} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Mã lớp học *</label>
                  <input
                    type="text"
                    required
                    disabled={classFormMode === 'edit'}
                    value={currentClassData.id}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, id: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-mono font-bold disabled:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-550"
                    placeholder="LH001"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Tên lớp hành chính *</label>
                  <input
                    type="text"
                    required
                    value={currentClassData.name}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, name: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-550"
                    placeholder="Lớp May K15 - Cơ sở chính"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Ngành, nghề đào tạo *</label>
                  <select
                    value={currentClassData.major}
                    onChange={(e) => {
                      setCurrentClassData({ 
                        ...currentClassData, 
                        major: e.target.value
                      });
                    }}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-550"
                  >
                    {INITIAL_COURSES.map(course => (
                      <option key={course.id} value={course.name}>{course.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Giáo viên chủ nhiệm *</label>
                  <select
                    value={currentClassData.teacherId}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, teacherId: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-550"
                  >
                    {teachers.map(tc => (
                      <option key={tc.id} value={tc.id}>{tc.name} ({tc.id})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Sĩ số lớp *</label>
                  <input
                    type="number"
                    required
                    min="5"
                    max="100"
                    value={currentClassData.quota}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, quota: parseInt(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-550"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Địa điểm liên kết đào tạo *</label>
                  <input
                    type="text"
                    required
                    value={currentClassData.location}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, location: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-550"
                    placeholder="Địa điểm liên kết đào tạo hoặc cơ sở"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Học kỳ hành chính *</label>
                  <select
                    value={currentClassData.term}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, term: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-550"
                  >
                    <option value="Học kỳ I">Học kỳ I</option>
                    <option value="Học kỳ II">Học kỳ II</option>
                    <option value="Học kỳ III">Học kỳ III</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Ngày bắt đầu khóa *</label>
                  <input
                    type="date"
                    required
                    value={currentClassData.startDate}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, startDate: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-550"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Ngày kết thúc khóa *</label>
                  <input
                    type="date"
                    required
                    value={currentClassData.endDate}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, endDate: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-550"
                  />
                </div>

              </div>

              <div className="flex space-x-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsClassModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-indigo-650 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Lưu lớp học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: XẾP THÊM HỌC VIÊN VÀO LỚP HỌC PHẦN ================= */}
      {isEnrollStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base">Thêm học viên vào lớp phần</h3>
              <button onClick={() => setIsEnrollStudentModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEnrollStudent} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Học viên phù hợp ngành này *</label>
                <select
                  value={selectedStudentToEnroll}
                  onChange={(e) => setSelectedStudentToEnroll(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-755"
                >
                  <option value="">-- Chọn Học Viên --</option>
                  {students.filter(st => st.status === 'Đang học' && st.major === selectedMajorForGrades).map(st => (
                    <option key={st.id} value={st.id}>{st.name} ({st.id}) - Lớp: {st.class}</option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEnrollStudentModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Hủy thao tác
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-755 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Thêm học viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: THÊM LỊCH HỌC BUỔI MỚI ================= */}
      {isAddScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-indigo-950 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base">Thêm Buổi Học / Lịch Học Phần</h3>
              <button onClick={() => setIsAddScheduleModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSchedule} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Ngày học *</label>
                <input
                  type="date"
                  required
                  value={newScheduleForm.date}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Nội dung / Chủ đề bài giảng *</label>
                <input
                  type="text"
                  required
                  value={newScheduleForm.topic}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                  placeholder="VD: Tổng quan và cài đặt NodeJS"
                />
              </div>

              <div className="flex space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddScheduleModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Xác nhận lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: CHỈNH SỬA TOÀN BỘ ĐIỂM HỌC VIÊN ================= */}
      {isGradeEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-indigo-950 text-white p-5 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base flex items-center">
                  <Award className="w-5 h-5 mr-2 text-indigo-400" />
                  Cập nhật bảng điểm học viên
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Học viên: <strong className="text-white">{students.find(s => s.id === studentIdForGradeEdit)?.name}</strong> ({studentIdForGradeEdit})
                </p>
              </div>
              <button onClick={() => setIsGradeEditModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudentGrades} className="flex flex-col h-[70vh]">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <p className="text-xs text-slate-500 italic">Nhập điểm tổng kết hệ 10 (từ 0.0 đến 10.0) cho từng môn học/mô-đun dưới đây. Để trống nếu học viên chưa học học phần này.</p>
                <div className="space-y-3">
                  {subjectsOfSelectedMajorForGrades.map(sub => {
                    const nameLower = sub.name.toLowerCase();
                    const isExcluded = nameLower.includes("thể chất") || nameLower.includes("quốc phòng") || nameLower.includes("qp-an") || nameLower.includes("qp - an");
                    return (
                      <div key={sub.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-150 hover:bg-slate-100/50 transition-colors">
                        <div className="flex-1 min-w-0 pr-3 text-xs">
                          <div className="flex items-center space-x-1.5">
                            <span className="font-mono font-bold text-xs text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">{sub.id}</span>
                            <span className="text-xs font-bold text-slate-800 truncate" title={sub.name}>{sub.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            {sub.credits} tín chỉ • {sub.hours} tiết {isExcluded && <strong className="text-rose-500 font-semibold">(Không tính GPA)</strong>}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={tempGradeEditScores[sub.id] !== undefined ? tempGradeEditScores[sub.id] : ''}
                            onChange={(e) => setTempGradeEditScores({
                              ...tempGradeEditScores,
                              [sub.id]: e.target.value
                            })}
                            className="w-16 px-2.5 py-1.5 border border-slate-200 rounded-lg text-center font-semibold text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="-"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-150 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsGradeEditModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Hủy thao tác
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-indigo-650 hover:bg-indigo-755 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  Lưu điểm số học sinh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
