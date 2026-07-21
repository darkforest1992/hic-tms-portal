import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, GraduationCap, UserCheck, Search, Plus, Edit, Trash2, Lock, 
  LogOut, User, Shield, BookOpen, CheckCircle, AlertCircle, Menu, X, Key, 
  Filter, Mail, Phone, Briefcase, Calendar, Layers, Award, ClipboardList, 
  ChevronRight, Download, Upload, Printer
} from 'lucide-react';

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, deleteDoc, onSnapshot, collection } from 'firebase/firestore';

const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'hic-lms-app';

// Helper tạo tham chiếu tới collection/document
const getColRef = (colName) => collection(db, 'artifacts', appId, 'public', 'data', colName);
const getDocRef = (colName, docId) => doc(db, 'artifacts', appId, 'public', 'data', colName, String(docId));

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

const INITIAL_CLASSES = [
  { id: 'LH001', name: 'Kỹ thuật chế biến món ăn K15', courseId: 'KH004', major: 'Kỹ thuật chế biến món ăn', teacherId: 'GV004', startDate: '2026-02-15', endDate: '2026-06-30', location: 'Cơ sở chính - HIC', quota: 40, term: 'Học kỳ I' },
  { id: 'LH002', name: 'Lập trình ứng dụng CNTT-K15', courseId: 'KH001', major: 'Công nghệ thông tin', teacherId: 'GV001', startDate: '2026-02-20', endDate: '2026-06-25', location: 'Tòa nhà Công nghệ cao - HIC', quota: 45, term: 'Học kỳ I' },
  { id: 'LH003', name: 'Ngôn ngữ Nhật thương mại K15', courseId: 'KH006', major: 'Tiếng Nhật', teacherId: 'GV002', startDate: '2026-03-01', endDate: '2026-07-15', location: 'Trung tâm Ngoại ngữ - HIC', quota: 30, term: 'Học kỳ I' }
];

const INITIAL_ENROLLMENTS = [
  { studentId: 'HV001', classId: 'LH002' }, { studentId: 'HV002', classId: 'LH001' },
  { studentId: 'HV003', classId: 'LH003' }, { studentId: 'HV004', classId: 'LH002' }
];

const INITIAL_GRADES = [
  { studentId: 'HV001', subjectId: 'MH20', score: 8.5 },
  { studentId: 'HV001', subjectId: 'MH17', score: 9.0 },
  { studentId: 'HV004', subjectId: 'MH20', score: 5.6 },
  { studentId: 'HV002', subjectId: 'MH10', score: 7.2 }
];

const INITIAL_SCHEDULES = [
  { id: 'S001', classId: 'LH002', sessionNum: 1, date: '2026-03-05', topic: 'Giới thiệu về ReactJS & JSX' },
  { id: 'S002', classId: 'LH002', sessionNum: 2, date: '2026-03-12', topic: 'State, Props và Quản lý vòng đời Component' },
  { id: 'S003', classId: 'LH003', sessionNum: 1, date: '2026-03-06', topic: 'Khái quát hệ chữ Kana và Từ vựng Chào hỏi' }
];

const INITIAL_ATTENDANCE = {
  'S001': { 'HV001': 'P', 'HV004': 'E' },
  'S002': { 'HV001': 'P', 'HV004': 'P' }
};

const INITIAL_STUDENTS = [
  { id: 'HV001', name: 'Nguyễn Văn Anh', dob: '15/05/2002', gender: 'Nam', cccd: '012345678912', phone: '0912345678', email: 'vananh.nguyen@gmail.com', status: 'Đang học', class: 'CNTT-K15', major: 'Công nghệ thông tin' },
  { id: 'HV002', name: 'Trần Thị Bình', dob: '20/09/2001', gender: 'Nữ', cccd: '012345678913', phone: '0987654321', email: 'thibinh.tran@gmail.com', status: 'Đang học', class: 'CBMA-K15', major: 'Kỹ thuật chế biến món ăn' },
  { id: 'HV003', name: 'Phạm Hồng Cường', dob: '02/11/2003', gender: 'Nam', cccd: '012345678914', phone: '0905123456', email: 'hongcuong.pham@gmail.com', status: 'Bảo lưu', class: 'TN-K15', major: 'Tiếng Nhật' },
  { id: 'HV004', name: 'Lê Thùy Dương', dob: '30/01/2002', gender: 'Nữ', cccd: '012345678915', phone: '0934567890', email: 'thuyduong.le@gmail.com', status: 'Đang học', class: 'CNTT-K15', major: 'Công nghệ thông tin' }
];

const INITIAL_TEACHERS = [
  { id: 'GV001', name: 'PGS. TS. Nguyễn Tiến Dũng', specialty: 'Trí tuệ nhân tạo & Học máy', department: 'Khoa Kỹ thuật - Công nghệ', phone: '0911223344', email: 'dung.nt@tms-edu.vn', degree: 'Phó Giáo sư, Tiến sĩ' },
  { id: 'GV002', name: 'TS. Lê Thị Hoài', specialty: 'Ngôn ngữ học ứng dụng', department: 'Khoa Ngôn ngữ', phone: '0922334455', email: 'hoai.lt@tms-edu.vn', degree: 'Tiến sĩ' },
  { id: 'GV004', name: 'TS. Vũ Hoàng Long', specialty: 'Chế biến món Á - Âu chuyên sâu', department: 'Khoa Dịch vụ  - Du lịch - Nhà hàng khách sạn', phone: '0944556677', email: 'long.vh@tms-edu.vn', degree: 'Tiến sĩ' }
];

const USERS_ACCOUNTS = [
  { username: 'admin', password: '123', name: 'Superadmin-HIC (Admin)', role: 'admin', email: 'admin@tms-edu.vn' },
  { username: 'cbdt', password: '123', name: 'Nguyễn Yến Đường (Cán bộ)', role: 'staff', email: 'minh.nt@tms-edu.vn' },
  { username: 'GV001', password: '123', name: 'PGS. TS. Nguyễn Tiến Dũng', role: 'teacher', email: 'dung.nt@tms-edu.vn', teacherId: 'GV001' },
  { username: 'HV001', password: '123', name: 'Nguyễn Văn Anh', role: 'student', email: 'vananh.nguyen@gmail.com', studentId: 'HV001' }
];

export default function App() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Firestore DB States
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [grades, setGrades] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [accounts, setAccounts] = useState([]);

  // UI States (Filters & Modals)
  const [studentSearch, setStudentSearch] = useState('');
  const [studentFilterStatus, setStudentFilterStatus] = useState('All');
  const [studentFilterMajor, setStudentFilterMajor] = useState('Công nghệ thông tin');
  const [teacherSearch, setTeacherSearch] = useState('');
  const [teacherFilterDept, setTeacherFilterDept] = useState('All');
  const [classFilterMajor, setClassFilterMajor] = useState('All');
  const [classSearch, setClassSearch] = useState('');
  const [selectedMajorForGrades, setSelectedMajorForGrades] = useState('Công nghệ thông tin');
  const [selectedClassIdForAttendance, setSelectedClassIdForAttendance] = useState('');
  const [gradeSearchText, setGradeSearchText] = useState('');
  const [gradeViewMode, setGradeViewMode] = useState('edit');

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
    id: '', name: '', courseId: 'KH001', major: 'Công nghệ thông tin', teacherId: '', startDate: '', endDate: '', location: '', quota: 40, term: 'Học kỳ I'
  });

  const [isGradeEditModalOpen, setIsGradeEditModalOpen] = useState(false);
  const [studentIdForGradeEdit, setStudentIdForGradeEdit] = useState('');
  const [tempGradeEditScores, setTempGradeEditScores] = useState({});

  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [changePassForm, setChangePassForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [changePassError, setChangePassError] = useState('');

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [subjectFormMode, setSubjectFormMode] = useState('add');
  const [currentSubjectData, setCurrentSubjectData] = useState({
    id: '', name: '', credits: 3, hours: 45, major: 'Công nghệ thông tin', type: 'Môn học, mô đun chuyên môn'
  });

  const [isEnrollStudentModalOpen, setIsEnrollStudentModalOpen] = useState(false);
  const [selectedStudentToEnroll, setSelectedStudentToEnroll] = useState('');
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [newScheduleForm, setNewScheduleForm] = useState({ date: '', topic: '' });
  const [activeScheduleIdForAttendance, setActiveScheduleIdForAttendance] = useState(null);
  const [isLegendOpen, setIsLegendOpen] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) { console.error("Firebase Auth Error:", err); }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setFirebaseUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!firebaseUser) return;
    let isInitialLoad = true;

    // Seeding function (chạy 1 lần nếu DB trống)
    const seedDatabase = async () => {
      try {
        const promises = [];
        INITIAL_SUBJECTS.forEach(item => promises.push(setDoc(getDocRef('subjects', `${item.id}_${item.major}`), item)));
        INITIAL_CLASSES.forEach(item => promises.push(setDoc(getDocRef('classes', item.id), item)));
        INITIAL_ENROLLMENTS.forEach(item => promises.push(setDoc(getDocRef('enrollments', `${item.studentId}_${item.classId}`), item)));
        INITIAL_GRADES.forEach(item => promises.push(setDoc(getDocRef('grades', `${item.studentId}_${item.subjectId}`), item)));
        INITIAL_SCHEDULES.forEach(item => promises.push(setDoc(getDocRef('schedules', item.id), item)));
        INITIAL_STUDENTS.forEach(item => promises.push(setDoc(getDocRef('students', item.id), item)));
        INITIAL_TEACHERS.forEach(item => promises.push(setDoc(getDocRef('teachers', item.id), item)));
        USERS_ACCOUNTS.forEach(item => promises.push(setDoc(getDocRef('accounts', item.username), item)));
        
        Object.entries(INITIAL_ATTENDANCE).forEach(([scheduleId, attendanceData]) => {
            promises.push(setDoc(getDocRef('attendance', scheduleId), attendanceData));
        });

        await Promise.all(promises);
      } catch (error) { console.error("Error seeding:", error); }
    };

    const unsubAccounts = onSnapshot(getColRef('accounts'), async (snapshot) => {
      if (snapshot.empty && isInitialLoad) {
        isInitialLoad = false;
        await seedDatabase();
      } else {
        setAccounts(snapshot.docs.map(doc => doc.data()));
        setIsDataLoaded(true);
      }
    });

    const unsubStudents = onSnapshot(getColRef('students'), (snapshot) => setStudents(snapshot.docs.map(d => d.data())));
    const unsubTeachers = onSnapshot(getColRef('teachers'), (snapshot) => setTeachers(snapshot.docs.map(d => d.data())));
    const unsubSubjects = onSnapshot(getColRef('subjects'), (snapshot) => setSubjects(snapshot.docs.map(d => d.data())));
    const unsubClasses = onSnapshot(getColRef('classes'), (snapshot) => {
      const clsData = snapshot.docs.map(d => d.data());
      setClasses(clsData);
      if (clsData.length > 0 && !selectedClassIdForAttendance) setSelectedClassIdForAttendance(clsData[0].id);
    });
    const unsubEnrollments = onSnapshot(getColRef('enrollments'), (snapshot) => setEnrollments(snapshot.docs.map(d => d.data())));
    const unsubGrades = onSnapshot(getColRef('grades'), (snapshot) => setGrades(snapshot.docs.map(d => d.data())));
    const unsubSchedules = onSnapshot(getColRef('schedules'), (snapshot) => setSchedules(snapshot.docs.map(d => d.data())));
    const unsubAttendance = onSnapshot(getColRef('attendance'), (snapshot) => {
      const attData = {};
      snapshot.forEach(doc => { attData[doc.id] = doc.data(); });
      setAttendance(attData);
    });

    return () => {
      unsubAccounts(); unsubStudents(); unsubTeachers(); unsubSubjects();
      unsubClasses(); unsubEnrollments(); unsubGrades(); unsubSchedules(); unsubAttendance();
    };
  }, [firebaseUser]);

  useEffect(() => {
    if (isLoggedIn && currentUser.role === 'student' && currentUser.studentId) {
      const studentObj = students.find(s => s.id === currentUser.studentId);
      if (studentObj) {
        setSelectedMajorForGrades(studentObj.major);
        setGradeViewMode('scoreboard');
      }
    }
  }, [isLoggedIn, currentUser, students]);

  useEffect(() => {
    if (!window.XLSX) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const triggerConfirm = (title, message, callback) => {
    setConfirmModal({
      isOpen: true, title, message,
      onConfirm: () => { callback(); setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null }); }
    });
  };

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

  const convertScoreToGrade = (score10) => {
    if (score10 === undefined || score10 === null || score10 === '') return { letter: '-', scale4: 0, label: 'Chưa có điểm' };
    const score = parseFloat(score10);
    if (score >= 8.5) return { letter: 'A', scale4: 4, label: 'Xuất sắc' };
    if (score >= 7.0) return { letter: 'B', scale4: 3, label: 'Giỏi' };
    if (score >= 5.5) return { letter: 'C', scale4: 2, label: 'Khá' };
    if (score >= 4.0) return { letter: 'D', scale4: 1, label: 'Trung bình' };
    return { letter: 'F', scale4: 0, label: 'Yếu - Trượt' };
  };

  const getTermGPAOfStudent = (studentId, studentMajor, gradeList, subjectList) => {
    let totalCredits = 0; let weightedScale4Sum = 0;
    const majorSubjects = subjectList.filter(s => s.major === studentMajor);
    
    majorSubjects.forEach(sub => {
      const nameLower = sub.name.toLowerCase();
      const isExcluded = nameLower.includes("thể chất") || nameLower.includes("quốc phòng") || nameLower.includes("qp-an");
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
    
    let classification = 'Yếu';
    if (gpa >= 3.50) classification = 'Xuất sắc';
    else if (gpa >= 3.00) classification = 'Giỏi';
    else if (gpa >= 2.50) classification = 'Khá';
    else if (gpa >= 2.00) classification = 'Trung bình';

    return { gpa, credits: totalCredits, label: classification };
  };

  const hasAccess = (allowedRoles) => allowedRoles.includes(currentUser.role);
  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return { text: 'Quản trị viên', color: 'bg-rose-100 text-rose-800 border-rose-200' };
      case 'staff': return { text: 'Cán bộ đào tạo', color: 'bg-sky-100 text-sky-800 border-sky-200' };
      case 'teacher': return { text: 'Giảng viên', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'student': return { text: 'Học viên', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      default: return { text: 'Khách', color: 'bg-slate-100 text-slate-800' };
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = accounts.find((u) => u.username === loginForm.username && u.password === loginForm.password);
    if (user) {
      setCurrentUser(user); setIsLoggedIn(true); setLoginError(''); setActiveTab('dashboard');
      showToast(`Chào mừng ${user.name} đến với HIC LMS!`, 'success');
    } else {
      setLoginError('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); setCurrentUser(null); setLoginForm({ username: '', password: '' });
    showToast('Đăng xuất thành công!', 'info');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (changePassForm.oldPassword !== currentUser.password) return setChangePassError('Mật khẩu hiện tại không khớp.');
    if (changePassForm.newPassword.length < 3) return setChangePassError('Mật khẩu mới phải từ 3 ký tự.');
    if (changePassForm.newPassword !== changePassForm.confirmPassword) return setChangePassError('Nhập lại mật khẩu mới không chính xác.');

    try {
      const updatedUser = { ...currentUser, password: changePassForm.newPassword };
      await setDoc(getDocRef('accounts', currentUser.username), updatedUser);
      setCurrentUser(updatedUser);
      setIsChangePassModalOpen(false);
      setChangePassForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setChangePassError('');
      showToast('Đổi mật khẩu bảo mật thành công!', 'success');
    } catch (err) { setChangePassError('Có lỗi xảy ra khi cập nhật mật khẩu.'); }
  };

  const handleSaveStudent = async (e) => {
    e.preventDefault();
    if (!currentStudentData.name.trim()) return showToast('Vui lòng nhập họ và tên học viên!', 'error');
    
    const associatedAccount = accounts.find(acc => acc.studentId === currentStudentData.id || acc.username === currentStudentData.id);
    if (associatedAccount && associatedAccount.role === 'admin' && currentUser.role !== 'admin') {
      return showToast('Bạn không có quyền chỉnh sửa thông tin của Quản trị viên (Admin)!', 'error');
    }

    const formattedStudent = {
      id: currentStudentData.id, name: currentStudentData.name, dob: parseYMDtoDMY(currentStudentData.dob),
      gender: currentStudentData.gender, cccd: currentStudentData.cccd, phone: currentStudentData.phone,
      email: currentStudentData.email, status: currentStudentData.status, class: currentStudentData.class, major: currentStudentData.major
    };

    const studentAccount = {
      username: formattedStudent.id, password: currentStudentData.password || '123', name: formattedStudent.name,
      role: 'student', email: formattedStudent.email, studentId: formattedStudent.id
    };

    try {
      if (studentFormMode === 'add' && students.some(s => s.id === formattedStudent.id)) {
        return showToast('Mã học viên đã tồn tại!', 'error');
      }
      await setDoc(getDocRef('students', formattedStudent.id), formattedStudent);
      await setDoc(getDocRef('accounts', studentAccount.username), studentAccount);
      showToast(studentFormMode === 'add' ? `Thành công thêm học viên ${formattedStudent.name}.` : `Cập nhật thông tin học viên ${formattedStudent.name} thành công.`, 'success');
      setIsStudentModalOpen(false);
    } catch (err) { showToast('Có lỗi xảy ra khi lưu học viên!', 'error'); }
  };

  const handleDeleteStudent = (id, name) => {
    const associatedAccount = accounts.find(acc => acc.studentId === id || acc.username === id);
    if (associatedAccount && associatedAccount.role === 'admin') return showToast('Không thể xóa tài khoản Quản trị viên!', 'error');

    triggerConfirm('Xóa Hồ sơ Học viên', `Xóa vĩnh viễn học viên ${name} (${id})?`, async () => {
      try {
        await deleteDoc(getDocRef('students', id));
        await deleteDoc(getDocRef('accounts', id));
        enrollments.filter(e => e.studentId === id).forEach(async (e) => await deleteDoc(getDocRef('enrollments', `${e.studentId}_${e.classId}`)));
        grades.filter(g => g.studentId === id).forEach(async (g) => await deleteDoc(getDocRef('grades', `${g.studentId}_${g.subjectId}`)));
        showToast(`Đã xóa hồ sơ của học viên ${name}.`, 'warning');
      } catch (err) { showToast('Lỗi khi xóa học viên', 'error'); }
    });
  };

  const handleOpenStudentModal = (mode, student = null) => {
    setStudentFormMode(mode);
    if (mode === 'edit' && student) {
      const acc = accounts.find(a => a.username === student.id);
      setCurrentStudentData({ ...student, dob: parseDMYtoYMD(student.dob), password: acc ? acc.password : '123' });
    } else {
      const lastIdNum = students.length > 0 ? Math.max(...students.map(s => { const num = parseInt(s.id.replace('HV', ''), 10); return isNaN(num) ? 0 : num; })) : 0;
      setCurrentStudentData({ id: `HV${String(lastIdNum + 1).padStart(3, '0')}`, name: '', dob: '', gender: 'Nam', cccd: '', phone: '', email: '', status: 'Đang học', class: 'CNTT-K15', major: 'Công nghệ thông tin', password: '123' });
    }
    setIsStudentModalOpen(true);
  };

  const handleOpenTeacherModal = (mode, teacher = null) => {
    setTeacherFormMode(mode);
    if (mode === 'edit' && teacher) {
      const acc = accounts.find(a => a.username === teacher.id);
      setCurrentTeacherData({ ...teacher, password: acc ? acc.password : '123' });
    } else {
      const lastIdNum = teachers.length > 0 ? Math.max(...teachers.map(t => { const num = parseInt(t.id.replace('GV', ''), 10); return isNaN(num) ? 0 : num; })) : 0;
      setCurrentTeacherData({ id: `GV${String(lastIdNum + 1).padStart(3, '0')}`, name: '', specialty: '', department: 'Khoa Kỹ thuật - Công nghệ', phone: '', email: '', degree: 'Thạc sĩ', password: '123' });
    }
    setIsTeacherModalOpen(true);
  };

  const handleSaveTeacher = async (e) => {
    e.preventDefault();
    if (!currentTeacherData.name.trim()) return;
    const associatedAccount = accounts.find(acc => acc.teacherId === currentTeacherData.id || acc.username === currentTeacherData.id);
    if (associatedAccount && associatedAccount.role === 'admin' && currentUser.role !== 'admin') return showToast('Không thể sửa Quản trị viên (Admin)!', 'error');

    const teacherAccount = { username: currentTeacherData.id, password: currentTeacherData.password || '123', name: currentTeacherData.name, role: 'teacher', email: currentTeacherData.email, teacherId: currentTeacherData.id };
    try {
      if (teacherFormMode === 'add' && teachers.some(t => t.id === currentTeacherData.id)) return showToast('Mã giáo viên đã trùng lập!', 'error');
      const teacherToSave = { ...currentTeacherData }; delete teacherToSave.password;
      await setDoc(getDocRef('teachers', teacherToSave.id), teacherToSave);
      await setDoc(getDocRef('accounts', teacherAccount.username), teacherAccount);
      showToast(`Lưu hồ sơ giáo viên ${teacherToSave.name} thành công.`, 'success');
      setIsTeacherModalOpen(false);
    } catch (err) { showToast('Có lỗi xảy ra khi lưu.', 'error'); }
  };

  const handleDeleteTeacher = (id, name) => {
    const associatedAccount = accounts.find(acc => acc.teacherId === id || acc.username === id);
    if (associatedAccount && associatedAccount.role === 'admin') return showToast('Không thể xóa Quản trị viên!', 'error');
    triggerConfirm('Xóa Giáo viên', `Loại bỏ giáo viên ${name} (${id})?`, async () => {
      await deleteDoc(getDocRef('teachers', id)); await deleteDoc(getDocRef('accounts', id));
      showToast(`Đã xóa giáo viên ${name}.`, 'warning');
    });
  };

  const handleOpenClassModal = (mode, cls = null) => {
    setClassFormMode(mode);
    if (mode === 'edit' && cls) { setCurrentClassData({ ...cls }); } else {
      const lastIdNum = classes.length > 0 ? Math.max(...classes.map(c => { const num = parseInt(c.id.replace('LH', ''), 10); return isNaN(num) ? 0 : num; })) : 0;
      setCurrentClassData({ id: `LH${String(lastIdNum + 1).padStart(3, '0')}`, name: '', courseId: 'KH001', major: 'Công nghệ thông tin', teacherId: teachers[0]?.id || '', startDate: '', endDate: '', location: '', quota: 40, term: 'Học kỳ I' });
    }
    setIsClassModalOpen(true);
  };

  const handleSaveClass = async (e) => {
    e.preventDefault();
    if (!currentClassData.name.trim() || !currentClassData.location.trim()) return showToast('Vui lòng điền đủ thông tin!', 'error');
    if (classFormMode === 'add' && classes.some(c => c.id === currentClassData.id)) return showToast('Mã lớp đã tồn tại!', 'error');
    await setDoc(getDocRef('classes', currentClassData.id), currentClassData);
    showToast(`Lưu thông tin lớp ${currentClassData.name} thành công.`, 'success');
    setIsClassModalOpen(false);
  };

  const handleDeleteClass = (id, name) => {
    triggerConfirm('Hủy Lớp học', `Hủy lớp học ${name} (${id}) và mọi dữ liệu liên quan?`, async () => {
      await deleteDoc(getDocRef('classes', id));
      enrollments.filter(e => e.classId === id).forEach(async (e) => await deleteDoc(getDocRef('enrollments', `${e.studentId}_${e.classId}`)));
      schedules.filter(s => s.classId === id).forEach(async (s) => {
         await deleteDoc(getDocRef('schedules', s.id)); await deleteDoc(getDocRef('attendance', s.id));
      });
      showToast(`Đã xóa lớp học ${name}.`, 'warning');
    });
  };

  const handleOpenSubjectModal = (mode, subject = null) => {
    setSubjectFormMode(mode);
    if (mode === 'edit' && subject) { setCurrentSubjectData({ ...subject }); } else {
      setCurrentSubjectData({ id: '', name: '', credits: 3, hours: 45, major: studentFilterMajor, type: 'Môn học, mô đun chuyên môn' });
    }
    setIsSubjectModalOpen(true);
  };

  const handleSaveSubject = async (e) => {
    e.preventDefault();
    if (!currentSubjectData.id.trim() || !currentSubjectData.name.trim()) return showToast('Điền mã và tên môn học!', 'error');
    const subjectDocId = `${currentSubjectData.id}_${currentSubjectData.major}`;
    if (subjectFormMode === 'add' && subjects.some(s => s.id === currentSubjectData.id && s.major === currentSubjectData.major)) return showToast('Mã môn học đã tồn tại trong ngành này!', 'error');
    await setDoc(getDocRef('subjects', subjectDocId), currentSubjectData);
    showToast(`Lưu môn học "${currentSubjectData.name}" thành công!`, 'success');
    setIsSubjectModalOpen(false);
  };

  const handleDeleteSubject = (id, name, major) => {
    triggerConfirm('Xóa môn học', `Xóa môn học "${name}" (${id}) thuộc ngành ${major}?`, async () => {
      await deleteDoc(getDocRef('subjects', `${id}_${major}`));
      showToast(`Đã xóa môn học "${name}".`, 'warning');
    });
  };

  const handleUpdateGradeDirectly = async (studentId, subjectId, val) => {
    const docId = `${studentId}_${subjectId}`;
    if (val === '') { await deleteDoc(getDocRef('grades', docId)); return; }
    let numVal = parseFloat(val);
    if (isNaN(numVal) || numVal < 0 || numVal > 10) return showToast('Điểm số phải từ 0-10!', 'error');
    await setDoc(getDocRef('grades', docId), { studentId, subjectId, score: Math.round(numVal * 10) / 10 });
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

  const handleSaveStudentGrades = async (e) => {
    e.preventDefault();
    const promises = [];
    Object.entries(tempGradeEditScores).forEach(([subId, scoreStr]) => {
      const docId = `${studentIdForGradeEdit}_${subId}`;
      if (scoreStr === '' || scoreStr === undefined || scoreStr === null) {
        promises.push(deleteDoc(getDocRef('grades', docId)));
      } else {
        const numScore = parseFloat(scoreStr);
        if (!isNaN(numScore) && numScore >= 0 && numScore <= 10) {
          promises.push(setDoc(getDocRef('grades', docId), { studentId: studentIdForGradeEdit, subjectId: subId, score: Math.round(numScore * 10) / 10 }));
        }
      }
    });
    await Promise.all(promises);
    setIsGradeEditModalOpen(false);
    showToast('Cập nhật toàn bộ điểm thành công!', 'success');
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (!newScheduleForm.date || !newScheduleForm.topic.trim()) return showToast('Nhập đủ thông tin!', 'error');
    const currentSessions = schedules.filter(s => s.classId === selectedClassIdForAttendance);
    const sessionNum = currentSessions.length + 1;
    const newSchedId = `S${Date.now()}`;
    await setDoc(getDocRef('schedules', newSchedId), {
      id: newSchedId, classId: selectedClassIdForAttendance, sessionNum, date: parseYMDtoDMY(newScheduleForm.date), topic: newScheduleForm.topic
    });
    showToast(`Đã thêm lịch học Buổi ${sessionNum}!`, 'success');
    setIsAddScheduleModalOpen(false);
    setNewScheduleForm({ date: '', topic: '' });
  };

  const handleAttendanceChange = async (scheduleId, studentId, status) => {
    const docRef = getDocRef('attendance', scheduleId);
    await setDoc(docRef, { [studentId]: status }, { merge: true });
    showToast('Điểm danh tự động lưu thành công.', 'success');
  };

  const handleEnrollStudent = async (e) => {
    e.preventDefault();
    if (!selectedStudentToEnroll) return showToast('Hãy chọn học viên.', 'error');
    if (enrollments.some(e => e.studentId === selectedStudentToEnroll && e.classId === selectedClassIdForAttendance)) return showToast('Học viên này đã tồn tại trong lớp.', 'warning');
    await setDoc(getDocRef('enrollments', `${selectedStudentToEnroll}_${selectedClassIdForAttendance}`), { studentId: selectedStudentToEnroll, classId: selectedClassIdForAttendance });
    showToast('Xếp học viên vào lớp thành công!', 'success');
    setIsEnrollStudentModalOpen(false);
    setSelectedStudentToEnroll('');
  };

  const exportClassToCSV = (classId) => {
    const cls = classes.find(c => c.id === classId);
    if (!cls) return;
    const enrolledStudents = enrollments.filter(e => e.classId === classId).map(e => students.find(s => s.id === e.studentId)).filter(Boolean);
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += `Mã lớp,${cls.id},Tên lớp,${cls.name}\nChuyên ngành,${cls.major},Địa điểm,${cls.location}\n\n`;
    csvContent += "Mã Học Viên,Họ và Tên,Ngày Sinh,Giới Tính,Lớp Hành Chính,Ngành Nghề\n";
    enrolledStudents.forEach(st => { csvContent += `${st.id},${st.name},${st.dob},${st.gender},${st.class},${st.major}\n`; });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri); link.setAttribute("download", `Danh_sach_lop_${cls.id}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    showToast('Tải danh sách CSV thành công!', 'success');
  };

  const handleExcelImport = (e, type) => {
    const file = e.target.files[0];
    if (!file || !window.XLSX) return showToast('Lỗi tải module Excel.', 'error');
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = window.XLSX.read(bstr, { type: 'binary' });
        const rawData = window.XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
        if (rawData.length < 2) return showToast('File rỗng.', 'error');

        const dataRows = rawData.slice(1);
        let successCount = 0; const promises = [];

        if (type === 'students') {
          dataRows.forEach(row => {
            if (!row[0] || !row[1]) return;
            const st = {
              id: String(row[0]).trim(), name: String(row[1]).trim(), dob: row[2] ? (String(row[2]).includes('-') ? parseYMDtoDMY(String(row[2])) : String(row[2])) : '',
              gender: row[3] ? String(row[3]).trim() : 'Nam', cccd: row[4] ? String(row[4]).trim() : '', phone: row[5] ? String(row[5]).trim() : '',
              email: row[6] ? String(row[6]).trim() : '', class: row[7] ? String(row[7]).trim() : 'CNTT-K15', major: row[8] ? String(row[8]).trim() : 'Công nghệ thông tin', status: row[9] ? String(row[9]).trim() : 'Đang học'
            };
            if (!students.some(s => s.id === st.id)) {
              promises.push(setDoc(getDocRef('students', st.id), st));
              promises.push(setDoc(getDocRef('accounts', st.id), { username: st.id, password: '123', name: st.name, role: 'student', email: st.email, studentId: st.id }));
              successCount++;
            }
          });
        } else if (type === 'teachers') {
          dataRows.forEach(row => {
            if (!row[0] || !row[1]) return;
            const tc = {
              id: String(row[0]).trim(), name: String(row[1]).trim(), degree: row[2] ? String(row[2]).trim() : 'Thạc sĩ',
              specialty: row[3] ? String(row[3]).trim() : 'Chung', department: row[4] ? String(row[4]).trim() : 'Khoa Khác', phone: row[5] ? String(row[5]).trim() : '', email: row[6] ? String(row[6]).trim() : ''
            };
            if (!teachers.some(t => t.id === tc.id)) {
              promises.push(setDoc(getDocRef('teachers', tc.id), tc));
              promises.push(setDoc(getDocRef('accounts', tc.id), { username: tc.id, password: '123', name: tc.name, role: 'teacher', email: tc.email, teacherId: tc.id }));
              successCount++;
            }
          });
        } else if (type === 'classes') {
          dataRows.forEach(row => {
            if (!row[0] || !row[1]) return;
            const cl = {
              id: String(row[0]).trim(), name: String(row[1]).trim(), major: row[2] ? String(row[2]).trim() : 'Khác', teacherId: row[3] ? String(row[3]).trim() : '',
              quota: row[4] ? parseInt(row[4]) || 40 : 40, location: row[5] ? String(row[5]).trim() : 'HIC Campus', term: row[6] ? String(row[6]).trim() : 'Học kỳ I',
              startDate: row[7] ? String(row[7]).trim() : '2026-09-01', endDate: row[8] ? String(row[8]).trim() : '2027-01-15', courseId: 'KH001'
            };
            if (!classes.some(c => c.id === cl.id)) { promises.push(setDoc(getDocRef('classes', cl.id), cl)); successCount++; }
          });
        }
        await Promise.all(promises);
        showToast(`Nhập dữ liệu thành công ${successCount} bản ghi.`, 'success');
      } catch (err) { showToast('Có lỗi đọc file.', 'error'); }
    };
    reader.readAsBinaryString(file); e.target.value = '';
  };

  const handleGradeExcelImport = (e) => {
    const file = e.target.files[0];
    if (!file || !window.XLSX) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = window.XLSX.read(bstr, { type: 'binary' });
        const rawData = window.XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
        
        let headerRowIndex = -1;
        for (let i = 0; i < rawData.length; i++) {
          if (rawData[i] && rawData[i].some(cell => String(cell).toLowerCase().includes('mã'))) { headerRowIndex = i; break; }
        }
        if (headerRowIndex === -1) return showToast('Lỗi định dạng cột.', 'error');

        const headers = rawData[headerRowIndex].map(h => String(h || '').trim());
        const idColIdx = headers.findIndex(h => h.toLowerCase().includes('mã') || h.toLowerCase().includes('id'));
        
        const majorSubjects = subjects.filter(s => s.major === selectedMajorForGrades);
        const columnToSubjectMap = {};
        headers.forEach((headerVal, colIdx) => {
          if (colIdx === idColIdx) return;
          const cleanHeader = headerVal.trim().toLowerCase();
          const matchingSub = majorSubjects.find(sub => sub.id.toLowerCase() === cleanHeader || cleanHeader.includes(sub.id.toLowerCase()));
          if (matchingSub) columnToSubjectMap[colIdx] = matchingSub.id;
        });

        const promises = [];
        rawData.slice(headerRowIndex + 1).forEach(row => {
          if (!row || !row.length) return;
          const studentId = String(row[idColIdx] || '').trim();
          const st = students.find(s => s.id === studentId);
          if (!st || st.major !== selectedMajorForGrades) return;

          Object.entries(columnToSubjectMap).forEach(([colIdxStr, subjectId]) => {
            const scoreValRaw = row[parseInt(colIdxStr, 10)];
            if (scoreValRaw !== undefined && scoreValRaw !== null && scoreValRaw !== '') {
              const score = parseFloat(scoreValRaw);
              if (!isNaN(score) && score >= 0 && score <= 10) {
                promises.push(setDoc(getDocRef('grades', `${studentId}_${subjectId}`), { studentId, subjectId, score }));
              }
            }
          });
        });
        await Promise.all(promises);
        showToast('Đồng bộ điểm thành công từ Excel.', 'success');
      } catch (err) { showToast('Có lỗi xử lý file.', 'error'); }
    };
    reader.readAsBinaryString(file); e.target.value = '';
  };

  const downloadGradeTemplate = (majorName) => {
    if (!window.XLSX) return;
    const majorSubjects = subjects.filter(s => s.major === majorName);
    const majorStudents = students.filter(s => s.major === majorName);
    if (!majorStudents.length) return showToast('Ngành này chưa có HV.', 'warning');

    const headers = [
      ["TRƯỜNG TRUNG CẤP QUỐC TẾ HÀ NỘI (HIC)"], [`BẢNG ĐIỂM NGÀNH: ${majorName.toUpperCase()}`], [],
      ["STT", "Mã Học Viên", "Họ và Tên", ...majorSubjects.map(s => `${s.id} - ${s.name}`)]
    ];
    const dataRows = majorStudents.map((st, i) => {
      const row = [i + 1, st.id, st.name];
      majorSubjects.forEach(sub => { const g = grades.find(g => g.studentId === st.id && g.subjectId === sub.id); row.push(g ? g.score : ""); });
      return row;
    });

    const wb = window.XLSX.utils.book_new();
    const ws = window.XLSX.utils.aoa_to_sheet([...headers, ...dataRows]);
    window.XLSX.utils.book_append_sheet(wb, ws, "Diem");
    window.XLSX.writeFile(wb, `Mau_Diem_${majorName}.xlsx`);
  };

  const downloadExcelTemplate = (type) => {
    if (!window.XLSX) return;
    let headers = [], sampleData = [], filename = '';
    if (type === 'students') {
      headers = [["Mã Học Viên", "Họ và Tên", "Ngày Sinh (DD/MM/YYYY)", "Giới Tính", "CCCD", "Điện Thoại", "Email", "Lớp", "Ngành", "Trạng Thái"]];
      sampleData = [["HV100", "Nguyễn Khang", "15/08/2004", "Nam", "001", "09", "a@a.com", "CNTT-K15", "Công nghệ thông tin", "Đang học"]];
      filename = 'Mau_HocVien.xlsx';
    } else if (type === 'teachers') {
      headers = [["Mã Giáo Viên", "Họ Tên", "Học Vị", "Chuyên Môn", "Khoa", "SĐT", "Email"]];
      sampleData = [["GV100", "Lê Văn A", "Thạc sĩ", "CNTT", "Khoa CNTT", "09", "a@hic.vn"]];
      filename = 'Mau_GiangVien.xlsx';
    } else if (type === 'classes') {
      headers = [["Mã Lớp", "Tên Lớp", "Ngành", "Mã GV", "Sĩ Số", "Địa Điểm", "Kỳ", "Ngày BĐ", "Ngày KT"]];
      sampleData = [["LH004", "Lớp A", "Công nghệ thông tin", "GV001", "35", "Cơ sở 1", "Học kỳ I", "2026-09-01", "2027-01-15"]];
      filename = 'Mau_Lop.xlsx';
    }
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.aoa_to_sheet([...headers, ...sampleData]), "Sheet1");
    window.XLSX.writeFile(wb, filename);
  };

  const subjectsOfSelectedMajorForGrades = useMemo(() => subjects.filter(s => s.major === selectedMajorForGrades), [subjects, selectedMajorForGrades]);
  const studentsOfSelectedMajorForGrades = useMemo(() => {
    return students.filter(st => {
      if (currentUser?.role === 'student') return st.id === currentUser.studentId;
      return st.major === selectedMajorForGrades && (st.id.toLowerCase().includes(gradeSearchText.toLowerCase()) || st.name.toLowerCase().includes(gradeSearchText.toLowerCase()));
    });
  }, [students, selectedMajorForGrades, gradeSearchText, currentUser]);

  const schedulesOfSelectedClass = useMemo(() => schedules.filter(s => s.classId === selectedClassIdForAttendance), [schedules, selectedClassIdForAttendance]);

  const filteredStudents = useMemo(() => students.filter(st => 
    (st.id.toLowerCase().includes(studentSearch.toLowerCase()) || st.name.toLowerCase().includes(studentSearch.toLowerCase()) || st.phone.includes(studentSearch) || st.cccd.includes(studentSearch) || (st.class && st.class.toLowerCase().includes(studentSearch.toLowerCase()))) &&
    (studentFilterStatus === 'All' || st.status === studentFilterStatus) && (st.major === studentFilterMajor)
  ), [students, studentSearch, studentFilterStatus, studentFilterMajor]);

  const filteredTeachers = useMemo(() => teachers.filter(tc => 
    (tc.id.toLowerCase().includes(teacherSearch.toLowerCase()) || tc.name.toLowerCase().includes(teacherSearch.toLowerCase()) || tc.specialty.toLowerCase().includes(teacherSearch.toLowerCase()) || tc.department.toLowerCase().includes(teacherSearch.toLowerCase())) &&
    (teacherFilterDept === 'All' || tc.department === teacherFilterDept)
  ), [teachers, teacherSearch, teacherFilterDept]);

  const filteredClasses = useMemo(() => classes.filter(cl => 
    (cl.id.toLowerCase().includes(classSearch.toLowerCase()) || cl.name.toLowerCase().includes(classSearch.toLowerCase()) || cl.location.toLowerCase().includes(classSearch.toLowerCase())) &&
    (classFilterMajor === 'All' || cl.major === classFilterMajor)
  ), [classes, classSearch, classFilterMajor]);

  if (!isDataLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-semibold text-sm">Đang kết nối hệ thống đám mây HIC Firebase...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      
      {notification && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center p-4 rounded-2xl shadow-xl border animate-bounce ${
          notification.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' :
          notification.type === 'error' ? 'bg-rose-50 text-rose-800 border-rose-100' : 'bg-blue-50 text-blue-800 border-blue-100'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5 mr-3 text-emerald-500" /> : <AlertCircle className="w-5 h-5 mr-3 text-rose-500" />}
          <span className="text-sm font-semibold">{notification.message}</span>
        </div>
      )}

      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-fade-in space-y-4">
            <h3 className="text-base font-bold text-slate-950 flex items-center"><AlertCircle className="w-5 h-5 text-rose-500 mr-2" /> {confirmModal.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{confirmModal.message}</p>
            <div className="flex space-x-3 pt-2">
              <button onClick={() => setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null })} className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-250 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer">Hủy bỏ</button>
              <button onClick={confirmModal.onConfirm} className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer">Xác nhận</button>
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn ? (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-slate-100">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-200 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-650 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-100 mb-4">
                <GraduationCap className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Trường Trung cấp Quốc tế Hà Nội</h2>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1.5">HANOI INTERNATIONAL COLLEGE (CLOUD LMS)</p>
            </div>
            {loginError && (<div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-750 text-xs rounded-xl flex items-center"><AlertCircle className="w-4 h-4 mr-2.5 shrink-0" /><span>{loginError}</span></div>)}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Tên đăng nhập</label>
                <input type="text" required value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="Nhập mã / tên tài khoản" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Mật khẩu</label>
                <input type="password" required value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="Mật khẩu của bạn" />
              </div>
              <button type="submit" className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md cursor-pointer">Đăng nhập hệ thống</button>
            </form>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center mb-3">Tài khoản demo Firebase</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {accounts.filter(a => ['admin','cbdt','GV001','HV001'].includes(a.username)).slice(0, 4).map((acc, idx) => (
                  <button key={idx} onClick={() => { setLoginForm({ username: acc.username, password: acc.password }); setLoginError(''); }} className="p-2 border border-slate-150 hover:bg-indigo-50 rounded-lg text-left transition-all">
                    <span className="font-semibold block text-slate-800 truncate">{acc.name}</span>
                    <span className="text-slate-500 font-mono">ID: {acc.username} (pw: 123)</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row h-screen overflow-hidden">
          
          <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-850 shrink-0 h-full">
            <div className="p-5 border-b border-slate-800 flex items-center space-x-3 bg-slate-950">
              <div className="p-2 bg-indigo-600 rounded-lg text-white"><GraduationCap className="w-6 h-6" /></div>
              <div><h1 className="font-bold text-white leading-none text-base">HIC LMS</h1><span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Cloud Connected</span></div>
            </div>
            <div className="p-4 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-bold border border-slate-700">{currentUser.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
                  <span className={`inline-block px-2 py-0.5 mt-1 text-[10px] font-bold rounded-full border ${getRoleLabel(currentUser.role).color}`}>{getRoleLabel(currentUser.role).text}</span>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
              <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}><Layers className="w-4 h-4 mr-3" /> Bảng điều khiển</button>
              {hasAccess(['admin', 'staff']) && (<button onClick={() => setActiveTab('students')} className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'students' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}><Users className="w-4 h-4 mr-3" /> Quản lý học viên</button>)}
              {hasAccess(['admin', 'staff']) && (<button onClick={() => setActiveTab('teachers')} className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'teachers' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}><UserCheck className="w-4 h-4 mr-3" /> Hồ sơ giảng viên</button>)}
              {hasAccess(['admin', 'staff']) && (<button onClick={() => setActiveTab('classes')} className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'classes' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}><ClipboardList className="w-4 h-4 mr-3" /> Quản lý lớp học</button>)}
              <button onClick={() => setActiveTab('grades')} className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'grades' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}><Award className="w-4 h-4 mr-3" /> Quản lý điểm số</button>
              <button onClick={() => setActiveTab('schedule')} className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'schedule' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}><Calendar className="w-4 h-4 mr-3" /> Lịch học & Điểm danh</button>
              <button onClick={() => setActiveTab('curriculum')} className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'curriculum' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}><BookOpen className="w-4 h-4 mr-3" /> Chương trình đào tạo</button>
              <div className="pt-4 mt-4 border-t border-slate-800">
                <button onClick={() => setIsChangePassModalOpen(true)} className="w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors"><Key className="w-4 h-4 mr-3 text-slate-500" /> Đổi mật khẩu</button>
                <button onClick={handleLogout} className="w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-rose-950 text-rose-400 mt-1"><LogOut className="w-4 h-4 mr-3" /> Đăng xuất</button>
              </div>
            </nav>
          </aside>

          <header className="md:hidden bg-slate-900 text-slate-200 flex items-center justify-between p-4 border-b border-slate-800 shrink-0">
            <div className="flex items-center space-x-2.5"><div className="p-1.5 bg-indigo-600 rounded-lg text-white"><GraduationCap className="w-5 h-5" /></div><span className="font-bold text-white text-md">HIC LMS</span></div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-slate-800 rounded-lg"><Menu className="w-6 h-6" /></button>
          </header>

          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-900 border-b border-slate-850 text-slate-300 p-4 space-y-2">
              <button onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} className="w-full flex items-center p-3 rounded-xl text-sm"><Layers className="w-4 h-4 mr-3" /> Dashboard</button>
              {hasAccess(['admin', 'staff']) && (<button onClick={() => { setActiveTab('students'); setMobileMenuOpen(false); }} className="w-full flex items-center p-3 rounded-xl text-sm"><Users className="w-4 h-4 mr-3" /> Học viên</button>)}
              <button onClick={() => { setActiveTab('grades'); setMobileMenuOpen(false); }} className="w-full flex items-center p-3 rounded-xl text-sm"><Award className="w-4 h-4 mr-3" /> Điểm số</button>
              <button onClick={handleLogout} className="w-full flex items-center p-3 rounded-xl text-sm text-rose-400"><LogOut className="w-4 h-4 mr-3" /> Đăng xuất</button>
            </div>
          )}

          <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-full">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {activeTab === 'dashboard' && 'Hệ thống quản lý đào tạo HIC'}
                  {activeTab === 'students' && 'Quản lý Hồ sơ Học viên'}
                  {activeTab === 'teachers' && 'Danh mục hồ sơ Giảng viên'}
                  {activeTab === 'classes' && 'Lớp học phần'}
                  {activeTab === 'grades' && 'Quản lý điểm số học tập'}
                  {activeTab === 'schedule' && 'Sổ quản lý Lịch học & Điểm danh'}
                  {activeTab === 'curriculum' && 'Khung chương trình đào tạo'}
                </h1>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Đã đồng bộ thời gian thực với Máy chủ Đám mây (Firebase)</p>
              </div>
              <div className="flex items-center space-x-3 bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-sm self-start">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-500">Vai trò:</span>
                <span className="text-xs font-bold text-indigo-800 uppercase">{getRoleLabel(currentUser.role).text}</span>
              </div>
            </div>

            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Users className="w-6 h-6" /></div>
                    <div><p className="text-xs font-semibold text-slate-500 uppercase">Học viên quy mô</p><h3 className="text-2xl font-bold text-slate-800">{students.length}</h3></div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl"><UserCheck className="w-6 h-6" /></div>
                    <div><p className="text-xs font-semibold text-slate-500 uppercase">Giảng viên cơ hữu</p><h3 className="text-2xl font-bold text-slate-800">{teachers.length}</h3></div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><ClipboardList className="w-6 h-6" /></div>
                    <div><p className="text-xs font-semibold text-slate-500 uppercase">Lớp học phần</p><h3 className="text-2xl font-bold text-slate-800">{classes.length}</h3></div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><BookOpen className="w-6 h-6" /></div>
                    <div><p className="text-xs font-semibold text-slate-500 uppercase">Ngành đào tạo</p><h3 className="text-2xl font-bold text-slate-800">{INITIAL_COURSES.length}</h3></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                    <h2 className="text-md font-bold text-slate-800 flex items-center"><User className="w-4 h-4 mr-2 text-indigo-600" /> Thông tin tài khoản đăng nhập</h2>
                    <div className="flex flex-col items-center py-4 border-y border-slate-100">
                      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-150 flex items-center justify-center text-2xl font-bold mb-2">{currentUser.name.charAt(0)}</div>
                      <h3 className="font-bold text-slate-800">{currentUser.name}</h3>
                      <span className={`inline-block px-2.5 py-0.5 mt-1 text-[10px] font-bold rounded-full border ${getRoleLabel(currentUser.role).color}`}>{getRoleLabel(currentUser.role).text}</span>
                    </div>
                    <div className="space-y-2.5 text-xs text-slate-600">
                      <div className="flex justify-between"><span>Tên đăng nhập:</span><span className="font-semibold text-slate-800">{currentUser.username}</span></div>
                      <div className="flex justify-between"><span>Email hệ thống:</span><span className="font-semibold text-slate-800">{currentUser.email}</span></div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-md font-bold text-slate-800 flex items-center mb-4"><Shield className="w-4 h-4 mr-2 text-indigo-600" /> Phân quyền hệ thống đám mây</h2>
                    <div className="overflow-x-auto text-xs">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase">
                            <th className="py-2.5">Tác vụ Firestore</th>
                            <th className="py-2.5 text-center">Admin</th>
                            <th className="py-2.5 text-center">CBĐT</th>
                            <th className="py-2.5 text-center">Giảng viên</th>
                            <th className="py-2.5 text-center">Học viên</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                          <tr><td className="py-2.5">Quản trị DB Học viên, Giáo viên</td><td className="text-center text-emerald-500 font-bold">✔</td><td className="text-center text-emerald-500 font-bold">✔</td><td className="text-center">✖</td><td className="text-center">✖</td></tr>
                          <tr><td className="py-2.5">Quản trị DB Lớp, Ghi điểm số</td><td className="text-center text-emerald-500 font-bold">✔</td><td className="text-center text-emerald-500 font-bold">✔</td><td className="text-center text-emerald-500 font-bold">✔</td><td className="text-center">✖</td></tr>
                          <tr><td className="py-2.5">Ghi Lịch học & Điểm danh</td><td className="text-center text-emerald-500 font-bold">✔</td><td className="text-center text-emerald-500 font-bold">✔</td><td className="text-center">✖</td><td className="text-center">✖</td></tr>
                          <tr><td className="py-2.5">Đọc Học bạ Tích lũy (Realtime)</td><td className="text-center text-emerald-500 font-bold">✔</td><td className="text-center text-emerald-500 font-bold">✔</td><td className="text-center text-emerald-500 font-bold">✔</td><td className="text-center text-emerald-500 font-bold">✔</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STUDENTS TAB */}
            {activeTab === 'students' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xs font-bold text-slate-500 uppercase">Ngành:</span>
                    <select value={studentFilterMajor} onChange={(e) => setStudentFilterMajor(e.target.value)} className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-3 py-2.5">
                      {INITIAL_COURSES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => downloadExcelTemplate('students')} className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center"><Download className="w-3.5 h-3.5 mr-1.5" /> File mẫu</button>
                    {hasAccess(['admin', 'staff']) && (
                      <label className="px-3 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-150 text-xs font-bold rounded-xl flex items-center cursor-pointer">
                        <Upload className="w-3.5 h-3.5 mr-1.5" /> Nạp từ Excel<input type="file" accept=".xlsx" onChange={(e) => handleExcelImport(e, 'students')} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input type="text" value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 text-xs" placeholder="Tìm kiếm..." />
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <select value={studentFilterStatus} onChange={(e) => setStudentFilterStatus(e.target.value)} className="bg-slate-50 border border-slate-200 text-xs font-semibold px-3 py-2.5 rounded-xl">
                      <option value="All">Tất cả Trạng thái</option><option value="Đang học">Đang học</option><option value="Bảo lưu">Bảo lưu</option><option value="Tốt nghiệp">Tốt nghiệp</option><option value="Buộc thôi học">Buộc thôi học</option>
                    </select>
                    {hasAccess(['admin', 'staff']) && (<button onClick={() => handleOpenStudentModal('add')} className="py-2.5 px-4 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md flex items-center"><Plus className="w-4 h-4 mr-1" /> Thêm HV</button>)}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                          <th className="py-3 px-4">Mã HV</th><th className="py-3 px-4">Họ Tên</th><th className="py-3 px-4">Lớp / Ngành</th><th className="py-3 px-4">Liên hệ</th><th className="py-3 px-4 text-center">Trạng thái</th><th className="py-3 px-4 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredStudents.map((st) => (
                          <tr key={st.id} className="hover:bg-slate-50/50">
                            <td className="py-3 px-4 font-mono font-bold">{st.id}</td>
                            <td className="py-3 px-4 font-semibold text-slate-800">{st.name}<br/><span className="text-[10px] text-slate-400 font-normal">{st.dob} ({st.gender})</span></td>
                            <td className="py-3 px-4"><span className="font-semibold text-indigo-600">{st.class}</span><br/><span className="text-[10px] text-slate-500">{st.major}</span></td>
                            <td className="py-3 px-4">{st.phone}<br/><span className="text-[10px] text-slate-500">{st.email}</span></td>
                            <td className="py-3 px-4 text-center"><span className={`px-2 py-0.5 rounded-full font-semibold ${st.status === 'Đang học' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>{st.status}</span></td>
                            <td className="py-3 px-4 text-right">
                              {hasAccess(['admin', 'staff']) && (
                                <><button onClick={() => handleOpenStudentModal('edit', st)} className="p-1 text-indigo-600 hover:bg-indigo-50"><Edit className="w-3.5 h-3.5" /></button><button onClick={() => handleDeleteStudent(st.id, st.name)} className="p-1 text-rose-600 hover:bg-rose-50"><Trash2 className="w-3.5 h-3.5" /></button></>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* CLASSES TAB */}
            {activeTab === 'classes' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex gap-2.5 w-full md:w-auto items-center">
                    <div className="relative w-full sm:w-64"><Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" /><input type="text" value={classSearch} onChange={(e) => setClassSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs" placeholder="Tìm lớp..." /></div>
                    <select value={classFilterMajor} onChange={(e) => setClassFilterMajor(e.target.value)} className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-3 py-2.5">
                      <option value="All">Tất cả Ngành</option>{INITIAL_COURSES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    {hasAccess(['admin', 'staff']) && (<button onClick={() => handleOpenClassModal('add')} className="py-2.5 px-4 bg-indigo-600 text-white text-xs font-bold rounded-xl flex items-center"><Plus className="w-4 h-4 mr-1" /> Tạo lớp mới</button>)}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead><tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                      <th className="py-3 px-4">Lớp</th><th className="py-3 px-4">GVCN</th><th className="py-3 px-4">Sĩ số (Đã xếp)</th><th className="py-3 px-4">Thời gian</th><th className="py-3 px-4 text-right">Thao tác</th>
                    </tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredClasses.map((cl) => {
                        const tc = teachers.find(t => t.id === cl.teacherId);
                        const enrolled = enrollments.filter(e => e.classId === cl.id).length;
                        return (
                          <tr key={cl.id} className="hover:bg-slate-50/50">
                            <td className="py-3 px-4"><span className="font-bold text-slate-900 block">{cl.name}</span><span className="text-[10px] text-slate-500">{cl.id} • {cl.major}</span></td>
                            <td className="py-3 px-4 font-semibold text-slate-800">{tc?.name || '-'}</td>
                            <td className="py-3 px-4"><span className="font-bold text-indigo-600 block">{enrolled} / {cl.quota}</span><span className="text-[10px] text-slate-500">{cl.location}</span></td>
                            <td className="py-3 px-4"><span className="text-amber-600 font-bold block">{cl.term}</span><span className="text-[10px] text-slate-500">{cl.startDate} đến {cl.endDate}</span></td>
                            <td className="py-3 px-4 text-right flex justify-end gap-1">
                              <button onClick={() => { setSelectedClassIdForAttendance(cl.id); setActiveTab('schedule'); }} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-bold">Lịch</button>
                              <button onClick={() => { setSelectedMajorForGrades(cl.major); setActiveTab('grades'); }} className="px-2 py-1 bg-slate-100 text-indigo-700 rounded-lg text-[10px] font-bold">Điểm</button>
                              {hasAccess(['admin', 'staff']) && (
                                <><button onClick={() => handleOpenClassModal('edit', cl)} className="p-1 text-indigo-600"><Edit className="w-3.5 h-3.5" /></button><button onClick={() => handleDeleteClass(cl.id, cl.name)} className="p-1 text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button></>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* GRADES TAB */}
            {activeTab === 'grades' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-bold text-slate-500 uppercase">Ngành:</span>
                      <select disabled={currentUser.role === 'student'} value={selectedMajorForGrades} onChange={(e) => setSelectedMajorForGrades(e.target.value)} className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-3 py-2.5">
                        {INITIAL_COURSES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    {!hasAccess(['student']) && (
                      <div className="flex gap-2">
                        <button onClick={() => setGradeViewMode('edit')} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${gradeViewMode === 'edit' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>Lưới điểm</button>
                        <button onClick={() => setGradeViewMode('scoreboard')} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${gradeViewMode === 'scoreboard' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>Thống kê</button>
                      </div>
                    )}
                  </div>
                  {!hasAccess(['student']) && (
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-slate-100 pt-4">
                      <div className="relative w-full md:max-w-xs"><Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" /><input type="text" value={gradeSearchText} onChange={(e) => setGradeSearchText(e.target.value)} className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-xs" placeholder="Mã số, họ tên học viên..." /></div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button onClick={() => downloadGradeTemplate(selectedMajorForGrades)} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl flex items-center"><Download className="w-3.5 h-3.5 mr-1" /> Mẫu Excel</button>
                        {hasAccess(['admin', 'staff', 'teacher']) && (
                          <label className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-150 text-xs font-bold rounded-xl flex items-center cursor-pointer"><Upload className="w-3.5 h-3.5 mr-1" /> Nhập điểm<input type="file" accept=".xlsx" onChange={handleGradeExcelImport} className="hidden" /></label>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {gradeViewMode === 'edit' ? (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto max-w-full">
                      <table className="w-full text-left text-xs table-fixed">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                            <th className="py-3 px-4 w-32 sticky left-0 bg-slate-50 border-r">Mã HV</th>
                            <th className="py-3 px-4 w-40 sticky left-32 bg-slate-50 border-r">Họ Tên</th>
                            {subjectsOfSelectedMajorForGrades.map(sub => (
                              <th key={sub.id} className="py-3 px-2 w-16 text-center border-r" title={sub.name}>
                                <span className="block font-bold">{sub.id}</span>
                              </th>
                            ))}
                            <th className="py-3 px-4 w-20 text-center sticky right-0 bg-slate-50 border-l font-bold text-indigo-700">GPA</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 text-slate-700">
                          {studentsOfSelectedMajorForGrades.map((st) => {
                            const gpaInfo = getTermGPAOfStudent(st.id, selectedMajorForGrades, grades, subjects);
                            return (
                              <tr key={st.id} className="hover:bg-slate-50/50">
                                <td className="py-2 px-4 font-mono font-bold sticky left-0 bg-white border-r">{st.id}</td>
                                <td className="py-2 px-4 font-semibold sticky left-32 bg-white border-r truncate">
                                  <div className="flex justify-between items-center">{st.name}{hasAccess(['admin', 'staff', 'teacher']) && <button onClick={() => handleOpenGradeEditModal(st.id)} className="text-indigo-600"><Edit className="w-3.5 h-3.5"/></button>}</div>
                                </td>
                                {subjectsOfSelectedMajorForGrades.map(sub => {
                                  const grade = grades.find(g => g.studentId === st.id && g.subjectId === sub.id);
                                  return (
                                    <td key={sub.id} className="py-1 px-1 border-r text-center">
                                      <input type="number" disabled={!hasAccess(['admin', 'staff', 'teacher'])} min="0" max="10" step="0.1" value={grade ? grade.score : ''} onChange={(e) => handleUpdateGradeDirectly(st.id, sub.id, e.target.value)} className="w-12 px-1 py-1 border border-slate-200 rounded text-center text-xs focus:ring-1 focus:ring-indigo-500" />
                                    </td>
                                  );
                                })}
                                <td className="py-2 px-4 text-center sticky right-0 bg-white border-l font-extrabold text-indigo-700">{gpaInfo.credits > 0 ? gpaInfo.gpa.toFixed(2) : '-'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h3 className="text-base font-bold text-slate-800 mb-4">Kết quả học tập ngành {selectedMajorForGrades}</h3>
                    <div className="overflow-x-auto text-xs">
                      <table className="w-full text-left">
                        <thead><tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase"><th className="py-2">Mã HV</th><th className="py-2">Họ Tên</th><th className="py-2 text-center">Tín chỉ Tích lũy</th><th className="py-2 text-center">GPA (Hệ 4)</th><th className="py-2 text-right">Xếp loại</th></tr></thead>
                        <tbody className="divide-y divide-slate-100">
                          {studentsOfSelectedMajorForGrades.map(st => {
                            const gpaInfo = getTermGPAOfStudent(st.id, selectedMajorForGrades, grades, subjects);
                            return (
                              <tr key={st.id}>
                                <td className="py-3 font-mono font-bold">{st.id}</td><td className="py-3 font-semibold">{st.name}</td>
                                <td className="py-3 text-center">{gpaInfo.credits}</td><td className="py-3 text-center font-bold text-indigo-600">{gpaInfo.credits > 0 ? gpaInfo.gpa.toFixed(2) : '-'}</td>
                                <td className="py-3 text-right">{gpaInfo.credits > 0 ? <span className="font-bold">{gpaInfo.label}</span> : '-'}</td>
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

            {/* SCHEDULE TAB */}
            {activeTab === 'schedule' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-bold text-slate-500 uppercase">Lớp học phần:</span>
                    <select value={selectedClassIdForAttendance} onChange={(e) => { setSelectedClassIdForAttendance(e.target.value); setActiveScheduleIdForAttendance(null); }} className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-3 py-2.5">
                      {classes.map(c => <option key={c.id} value={c.id}>{c.name} ({c.id})</option>)}
                    </select>
                  </div>
                  {hasAccess(['admin', 'staff']) && (<button onClick={() => setIsAddScheduleModalOpen(true)} className="py-2.5 px-4 bg-indigo-600 text-white text-xs font-bold rounded-xl"><Plus className="w-4 h-4 mr-1 inline" /> Thêm lịch học</button>)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                    <h3 className="font-bold text-sm">Thời khóa biểu lớp</h3>
                    <div className="space-y-2">
                      {schedulesOfSelectedClass.map((sch) => (
                        <button key={sch.id} onClick={() => setActiveScheduleIdForAttendance(sch.id)} className={`w-full p-3.5 rounded-xl border text-left flex justify-between items-center ${activeScheduleIdForAttendance === sch.id ? 'bg-indigo-50 border-indigo-250' : 'bg-slate-50 hover:bg-slate-100'}`}>
                          <div><span className="text-[10px] font-bold text-indigo-600 block">Buổi {sch.sessionNum} - {sch.date}</span><span className="text-xs font-bold block">{sch.topic}</span></div>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    {activeScheduleIdForAttendance ? (() => {
                      const activeSchedule = schedules.find(s => s.id === activeScheduleIdForAttendance);
                      const enrolledIds = enrollments.filter(e => e.classId === selectedClassIdForAttendance).map(e => e.studentId);
                      const enrolledStudents = students.filter(st => enrolledIds.includes(st.id));
                      
                      return (
                        <div className="space-y-4">
                          <div className="border-b pb-3"><h4 className="font-bold text-sm">Điểm danh - Buổi {activeSchedule?.sessionNum}</h4><p className="text-xs">{activeSchedule?.topic}</p></div>
                          <table className="w-full text-left text-xs">
                            <thead><tr className="border-b text-slate-500"><th className="py-2">Mã SV</th><th className="py-2">Họ Tên</th><th className="py-2 text-center w-48">Trạng thái</th></tr></thead>
                            <tbody className="divide-y">
                              {enrolledStudents.map(st => {
                                const status = (attendance[activeScheduleIdForAttendance] || {})[st.id] || 'P';
                                return (
                                  <tr key={st.id}>
                                    <td className="py-3 font-mono font-bold">{st.id}</td><td className="py-3 font-semibold">{st.name}</td>
                                    <td className="py-3">
                                      <div className="flex justify-center gap-1">
                                        <button disabled={!hasAccess(['admin', 'staff', 'teacher'])} onClick={() => handleAttendanceChange(activeScheduleIdForAttendance, st.id, 'P')} className={`px-2 py-1 rounded text-[10px] font-bold ${status==='P'?'bg-emerald-500 text-white':'bg-slate-100'}`}>CÓ MẶT</button>
                                        <button disabled={!hasAccess(['admin', 'staff', 'teacher'])} onClick={() => handleAttendanceChange(activeScheduleIdForAttendance, st.id, 'A')} className={`px-2 py-1 rounded text-[10px] font-bold ${status==='A'?'bg-rose-500 text-white':'bg-slate-100'}`}>VẮNG</button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )
                    })() : <div className="text-center text-slate-400 py-10">Chọn một lịch học để điểm danh</div>}
                  </div>
                </div>
              </div>
            )}

            {/* CURRICULUM TAB */}
            {activeTab === 'curriculum' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500">Khung chương trình:</span>
                    <select value={studentFilterMajor} onChange={(e) => setStudentFilterMajor(e.target.value)} className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-3 py-2.5">
                      {INITIAL_COURSES.map(course => <option key={course.id} value={course.name}>{course.name}</option>)}
                    </select>
                  </div>
                  {hasAccess(['admin', 'staff']) && (<button onClick={() => handleOpenSubjectModal('add')} className="py-2.5 px-4 bg-indigo-600 text-white text-xs font-bold rounded-xl"><Plus className="w-4 h-4 mr-1 inline" /> Thêm Môn</button>)}
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead><tr className="bg-slate-50 border-b text-slate-500 uppercase"><th className="py-3 px-4">Mã Môn</th><th className="py-3 px-4">Tên môn</th><th className="py-3 px-4 text-center">Tín chỉ</th><th className="py-3 px-4 text-right">Thao tác</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {subjects.filter(s => s.major === studentFilterMajor).map((sub) => (
                        <tr key={sub.id}>
                          <td className="py-2 px-4 font-mono font-bold">{sub.id}</td><td className="py-2 px-4 font-semibold">{sub.name}</td><td className="py-2 px-4 text-center">{sub.credits}</td>
                          <td className="py-2 px-4 text-right flex justify-end gap-1">
                            {hasAccess(['admin', 'staff']) && (
                              <><button onClick={() => handleOpenSubjectModal('edit', sub)} className="p-1 text-indigo-600"><Edit className="w-3.5 h-3.5"/></button><button onClick={() => handleDeleteSubject(sub.id, sub.name, sub.major)} className="p-1 text-rose-600"><Trash2 className="w-3.5 h-3.5"/></button></>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* MODALS */}
      {isChangePassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border">
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center"><h3 className="font-bold flex items-center"><Lock className="w-4 h-4 mr-2" /> Đổi mật khẩu</h3><button onClick={() => setIsChangePassModalOpen(false)}><X className="w-5 h-5"/></button></div>
            <form onSubmit={handleChangePassword} className="p-6 space-y-4 text-xs">
              {changePassError && <div className="p-3 bg-rose-50 text-rose-700 rounded-lg">{changePassError}</div>}
              <input type="password" required value={changePassForm.oldPassword} onChange={(e) => setChangePassForm({...changePassForm, oldPassword: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Mật khẩu hiện tại" />
              <input type="password" required value={changePassForm.newPassword} onChange={(e) => setChangePassForm({...changePassForm, newPassword: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Mật khẩu mới" />
              <input type="password" required value={changePassForm.confirmPassword} onChange={(e) => setChangePassForm({...changePassForm, confirmPassword: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Xác nhận mật khẩu mới" />
              <div className="flex space-x-3 pt-4"><button type="button" onClick={() => setIsChangePassModalOpen(false)} className="flex-1 py-2.5 bg-slate-100 rounded-xl font-bold">Hủy</button><button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-bold">Lưu</button></div>
            </form>
          </div>
        </div>
      )}

      {isSubjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-indigo-950 text-white p-5 flex justify-between"><h3 className="font-bold">{subjectFormMode==='add'?'Thêm môn':'Sửa môn'}</h3><button onClick={() => setIsSubjectModalOpen(false)}><X className="w-5 h-5"/></button></div>
            <form onSubmit={handleSaveSubject} className="p-6 space-y-4 text-xs">
              <input type="text" disabled value={currentSubjectData.major} className="w-full p-2.5 bg-slate-50 border rounded-xl font-semibold"/>
              <input type="text" required disabled={subjectFormMode==='edit'} value={currentSubjectData.id} onChange={(e) => setCurrentSubjectData({...currentSubjectData, id: e.target.value.toUpperCase()})} className="w-full p-2.5 border rounded-xl font-mono" placeholder="Mã môn (VD: MH01)"/>
              <input type="text" required value={currentSubjectData.name} onChange={(e) => setCurrentSubjectData({...currentSubjectData, name: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Tên môn"/>
              <div className="flex gap-4">
                <input type="number" required step="0.5" value={currentSubjectData.credits} onChange={(e) => setCurrentSubjectData({...currentSubjectData, credits: parseFloat(e.target.value)})} className="w-full p-2.5 border rounded-xl" placeholder="Tín chỉ"/>
                <input type="number" required value={currentSubjectData.hours} onChange={(e) => setCurrentSubjectData({...currentSubjectData, hours: parseInt(e.target.value)})} className="w-full p-2.5 border rounded-xl" placeholder="Giờ học"/>
              </div>
              <div className="flex space-x-3 pt-4"><button type="button" onClick={() => setIsSubjectModalOpen(false)} className="flex-1 p-2.5 bg-slate-100 rounded-xl font-bold">Hủy</button><button type="submit" className="flex-1 p-2.5 bg-indigo-600 text-white rounded-xl font-bold">Lưu</button></div>
            </form>
          </div>
        </div>
      )}

      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-indigo-950 text-white p-5 flex justify-between"><h3 className="font-bold">{studentFormMode==='add'?'Thêm Học Viên':'Sửa Hồ Sơ Học Viên'}</h3><button onClick={() => setIsStudentModalOpen(false)}><X className="w-5 h-5"/></button></div>
            <form onSubmit={handleSaveStudent} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required disabled={studentFormMode==='edit'} value={currentStudentData.id} onChange={e => setCurrentStudentData({...currentStudentData, id: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Mã HV" />
                <input type="text" required value={currentStudentData.name} onChange={e => setCurrentStudentData({...currentStudentData, name: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Họ Tên" />
                <input type="date" required value={currentStudentData.dob} onChange={e => setCurrentStudentData({...currentStudentData, dob: e.target.value})} className="w-full p-2.5 border rounded-xl" />
                <select value={currentStudentData.gender} onChange={e => setCurrentStudentData({...currentStudentData, gender: e.target.value})} className="w-full p-2.5 border rounded-xl"><option value="Nam">Nam</option><option value="Nữ">Nữ</option></select>
                <input type="text" value={currentStudentData.phone} onChange={e => setCurrentStudentData({...currentStudentData, phone: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Số điện thoại" />
                <input type="text" required value={currentStudentData.class} onChange={e => setCurrentStudentData({...currentStudentData, class: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Lớp HC" />
                <select value={currentStudentData.major} onChange={e => setCurrentStudentData({...currentStudentData, major: e.target.value})} className="col-span-2 w-full p-2.5 border rounded-xl">{INITIAL_COURSES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select>
                <select value={currentStudentData.status} onChange={e => setCurrentStudentData({...currentStudentData, status: e.target.value})} className="w-full p-2.5 border rounded-xl"><option>Đang học</option><option>Bảo lưu</option><option>Tốt nghiệp</option><option>Buộc thôi học</option></select>
                <input type="text" required value={currentStudentData.password} onChange={e => setCurrentStudentData({...currentStudentData, password: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Mật khẩu" />
              </div>
              <div className="flex space-x-3 pt-4"><button type="button" onClick={() => setIsStudentModalOpen(false)} className="flex-1 p-2.5 bg-slate-100 rounded-xl font-bold">Hủy</button><button type="submit" className="flex-1 p-2.5 bg-indigo-600 text-white rounded-xl font-bold">Lưu</button></div>
            </form>
          </div>
        </div>
      )}

      {isTeacherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-teal-950 text-white p-5 flex justify-between"><h3 className="font-bold">{teacherFormMode==='add'?'Thêm Giảng Viên':'Sửa Hồ Sơ Giảng Viên'}</h3><button onClick={() => setIsTeacherModalOpen(false)}><X className="w-5 h-5"/></button></div>
            <form onSubmit={handleSaveTeacher} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required disabled={teacherFormMode==='edit'} value={currentTeacherData.id} onChange={e => setCurrentTeacherData({...currentTeacherData, id: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Mã GV" />
                <input type="text" required value={currentTeacherData.name} onChange={e => setCurrentTeacherData({...currentTeacherData, name: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Họ Tên" />
                <select value={currentTeacherData.department} onChange={e => setCurrentTeacherData({...currentTeacherData, department: e.target.value})} className="w-full p-2.5 border rounded-xl"><option value="Khoa Dịch vụ  - Du lịch - Nhà hàng khách sạn">Khoa Dịch vụ  - Du lịch - Nhà hàng khách sạn</option><option value="Khoa Kỹ thuật - Công nghệ">Khoa Kỹ thuật - Công nghệ</option><option value="Khoa Ngôn ngữ">Khoa Ngôn ngữ</option></select>
                <input type="email" required value={currentTeacherData.email} onChange={e => setCurrentTeacherData({...currentTeacherData, email: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Email" />
                <input type="text" required value={currentTeacherData.password} onChange={e => setCurrentTeacherData({...currentTeacherData, password: e.target.value})} className="col-span-2 w-full p-2.5 border rounded-xl" placeholder="Mật khẩu" />
              </div>
              <div className="flex space-x-3 pt-4"><button type="button" onClick={() => setIsTeacherModalOpen(false)} className="flex-1 p-2.5 bg-slate-100 rounded-xl font-bold">Hủy</button><button type="submit" className="flex-1 p-2.5 bg-teal-600 text-white rounded-xl font-bold">Lưu</button></div>
            </form>
          </div>
        </div>
      )}

      {isClassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-indigo-900 text-white p-5 flex justify-between"><h3 className="font-bold">{classFormMode==='add'?'Thiết lập Lớp mới':'Chỉnh sửa Lớp'}</h3><button onClick={() => setIsClassModalOpen(false)}><X className="w-5 h-5"/></button></div>
            <form onSubmit={handleSaveClass} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required disabled={classFormMode==='edit'} value={currentClassData.id} onChange={e => setCurrentClassData({...currentClassData, id: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Mã lớp" />
                <input type="text" required value={currentClassData.name} onChange={e => setCurrentClassData({...currentClassData, name: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Tên lớp" />
                <select value={currentClassData.major} onChange={e => setCurrentClassData({...currentClassData, major: e.target.value})} className="col-span-2 w-full p-2.5 border rounded-xl">{INITIAL_COURSES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select>
                <select value={currentClassData.teacherId} onChange={e => setCurrentClassData({...currentClassData, teacherId: e.target.value})} className="w-full p-2.5 border rounded-xl">{teachers.map(tc => <option key={tc.id} value={tc.id}>{tc.name}</option>)}</select>
                <input type="text" required value={currentClassData.location} onChange={e => setCurrentClassData({...currentClassData, location: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Địa điểm" />
                <input type="date" required value={currentClassData.startDate} onChange={e => setCurrentClassData({...currentClassData, startDate: e.target.value})} className="w-full p-2.5 border rounded-xl" />
                <input type="date" required value={currentClassData.endDate} onChange={e => setCurrentClassData({...currentClassData, endDate: e.target.value})} className="w-full p-2.5 border rounded-xl" />
              </div>
              <div className="flex space-x-3 pt-4"><button type="button" onClick={() => setIsClassModalOpen(false)} className="flex-1 p-2.5 bg-slate-100 rounded-xl font-bold">Hủy</button><button type="submit" className="flex-1 p-2.5 bg-indigo-600 text-white rounded-xl font-bold">Lưu</button></div>
            </form>
          </div>
        </div>
      )}

      {isAddScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-indigo-950 text-white p-5 flex justify-between"><h3 className="font-bold">Thêm Lịch Học</h3><button onClick={() => setIsAddScheduleModalOpen(false)}><X className="w-5 h-5"/></button></div>
            <form onSubmit={handleAddSchedule} className="p-6 space-y-4 text-xs">
              <input type="date" required value={newScheduleForm.date} onChange={e => setNewScheduleForm({...newScheduleForm, date: e.target.value})} className="w-full p-2.5 border rounded-xl" />
              <input type="text" required value={newScheduleForm.topic} onChange={e => setNewScheduleForm({...newScheduleForm, topic: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Chủ đề bài giảng" />
              <div className="flex space-x-3 pt-4"><button type="button" onClick={() => setIsAddScheduleModalOpen(false)} className="flex-1 p-2.5 bg-slate-100 rounded-xl font-bold">Hủy</button><button type="submit" className="flex-1 p-2.5 bg-indigo-600 text-white rounded-xl font-bold">Lưu</button></div>
            </form>
          </div>
        </div>
      )}

      {isGradeEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-indigo-950 text-white p-5 flex justify-between shrink-0"><h3 className="font-bold">Nhập điểm HV: {students.find(s=>s.id===studentIdForGradeEdit)?.name}</h3><button onClick={() => setIsGradeEditModalOpen(false)}><X className="w-5 h-5"/></button></div>
            <form onSubmit={handleSaveStudentGrades} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {subjectsOfSelectedMajorForGrades.map(sub => (
                  <div key={sub.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border text-xs">
                    <div className="flex-1"><span className="font-bold">{sub.id}</span> - {sub.name}</div>
                    <input type="number" min="0" max="10" step="0.1" value={tempGradeEditScores[sub.id] ?? ''} onChange={e => setTempGradeEditScores({...tempGradeEditScores, [sub.id]: e.target.value})} className="w-16 p-2 border rounded-lg text-center font-bold" />
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-50 border-t flex space-x-3 shrink-0"><button type="button" onClick={() => setIsGradeEditModalOpen(false)} className="flex-1 py-2.5 bg-white border font-bold rounded-xl">Hủy</button><button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-xl">Lưu Điểm</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
