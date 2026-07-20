import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  FileText, 
  CheckCircle, 
  AlertCircle,
  Menu,
  X,
  Key,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  Briefcase,
  IdCard,
  Calendar,
  Layers,
  Award,
  ClipboardList,
  MapPin,
  Download,
  Check,
  UserPlus,
  Clock,
  CheckSquare,
  Sparkles,
  Send,
  Bot,
  Wand2
} from 'lucide-react';

// === DỮ LIỆU KHÓA HỌC BAN ĐẦU ===
const INITIAL_COURSES = [
  { id: 'KH001', name: 'Công nghệ thông tin' },
  { id: 'KH002', name: 'An toàn thông tin' },
  { id: 'KH003', name: 'Quản trị kinh doanh' }
];

// === DỮ LIỆU LỚP HỌC BAN ĐẦU ===
const INITIAL_CLASSES = [
  { id: 'LH001', name: 'Lập trình React cơ bản', courseId: 'KH001', teacherId: 'GV003', startDate: '2026-08-01', endDate: '2026-11-30', location: 'Phòng máy Lab 402 - HIC', capacity: 30, term: 'Kỳ I - 2026' },
  { id: 'LH002', name: 'Mật mã học ứng dụng', courseId: 'KH002', teacherId: 'GV002', startDate: '2026-08-15', endDate: '2026-12-15', location: 'Phòng lý thuyết 305 - HIC', capacity: 25, term: 'Kỳ I - 2026' },
  { id: 'LH003', name: 'Khởi nghiệp & Quản trị', courseId: 'KH003', teacherId: 'GV001', startDate: '2026-09-01', endDate: '2026-12-30', location: 'Hội trường Lớn - HIC', capacity: 40, term: 'Kỳ II - 2026' }
];

// === DỮ LIỆU HỌC VIÊN BAN ĐẦU ===
const INITIAL_STUDENTS = [
  { id: 'HV001', name: 'Nguyễn Văn Anh', dob: '2002-05-15', gender: 'Nam', cccd: '012345678912', phone: '0912345678', email: 'vananh.nguyen@gmail.com', status: 'Đang học', class: 'CNTT-K15' },
  { id: 'HV002', name: 'Trần Thị Bình', dob: '2001-09-20', gender: 'Nữ', cccd: '012345678913', phone: '0987654321', email: 'thibinh.tran@gmail.com', status: 'Đang học', class: 'ATTT-K14' },
  { id: 'HV003', name: 'Phạm Hồng Cường', dob: '2003-11-02', gender: 'Nam', cccd: '012345678914', phone: '0905123456', email: 'hongcuong.pham@gmail.com', status: 'Bảo lưu', class: 'KHMT-K16' },
  { id: 'HV004', name: 'Lê Thùy Dương', dob: '2002-01-30', gender: 'Nữ', cccd: '012345678915', phone: '0934567890', email: 'thuyduong.le@gmail.com', status: 'Đang học', class: 'CNTT-K15' },
  { id: 'HV005', name: 'Hoàng Minh Đức', dob: '2000-07-12', gender: 'Nam', cccd: '012345678916', phone: '0978901234', email: 'minhduc.hoang@gmail.com', status: 'Tốt nghiệp', class: 'HTTT-K13' }
];

// === DỮ LIỆU GIÁO VIÊN BAN ĐẦU ===
const INITIAL_TEACHERS = [
  { id: 'GV001', name: 'PGS. TS. Nguyễn Tiến Dũng', specialty: 'Trí tuệ nhân tạo & Học máy', department: 'Khoa Công nghệ thông tin', phone: '0911223344', email: 'dung.nt@tms-edu.vn', degree: 'Phó Giáo sư, Tiến sĩ' },
  { id: 'GV002', name: 'TS. Lê Thị Hoài', specialty: 'An toàn và Bảo mật thông tin', department: 'Khoa An toàn thông tin', phone: '0922334455', email: 'hoai.lt@tms-edu.vn', degree: 'Tiến sĩ' },
  { id: 'GV003', name: 'ThS. Trần Minh Hoàng', specialty: 'Lập trình Web & Di động', department: 'Khoa Công nghệ phần mềm', phone: '0933445566', email: 'hoang.tm@tms-edu.vn', degree: 'Thạc sĩ' },
  { id: 'GV004', name: 'TS. Vũ Hoàng Long', specialty: 'Cơ sở dữ liệu lớn (Big Data)', department: 'Khoa Khoa học máy tính', phone: '0944556677', email: 'long.vh@tms-edu.vn', degree: 'Tiến sĩ' }
];

// === DỮ LIỆU ĐĂNG KÝ HỌC BAN ĐẦU ===
const INITIAL_ENROLLMENTS = [
  { classId: 'LH001', studentId: 'HV001' },
  { classId: 'LH001', studentId: 'HV004' },
  { classId: 'LH002', studentId: 'HV002' },
  { classId: 'LH003', studentId: 'HV001' },
  { classId: 'LH003', studentId: 'HV002' },
  { classId: 'LH003', studentId: 'HV005' }
];

// === DỮ LIỆU ĐIỂM SỐ BAN ĐẦU ===
const INITIAL_GRADES = [
  { studentId: 'HV001', classId: 'LH001', trainingScore: 88, testScore: 8.5, finalScore: 9.0, term: 'Kỳ I - 2026' },
  { studentId: 'HV004', classId: 'LH001', trainingScore: 75, testScore: 6.0, finalScore: 7.5, term: 'Kỳ I - 2026' },
  { studentId: 'HV002', classId: 'LH002', trainingScore: 92, testScore: 9.0, finalScore: 8.5, term: 'Kỳ I - 2026' },
  { studentId: 'HV001', classId: 'LH003', trainingScore: 85, testScore: 7.0, finalScore: 8.0, term: 'Kỳ II - 2026' },
  { studentId: 'HV002', classId: 'LH003', trainingScore: 90, testScore: 8.0, finalScore: 8.5, term: 'Kỳ II - 2026' },
  { studentId: 'HV005', classId: 'LH003', trainingScore: 95, testScore: 9.5, finalScore: 10.0, term: 'Kỳ II - 2026' }
];

// === DỮ LIỆU LỊCH HỌC BAN ĐẦU ===
const INITIAL_SCHEDULES = [
  { id: 'SCH001', classId: 'LH001', date: '2026-08-01', topic: 'Giới thiệu môn học & Tổng quan về React' },
  { id: 'SCH002', classId: 'LH001', date: '2026-08-08', topic: 'React State, Props & Lifecycle' },
  { id: 'SCH003', classId: 'LH002', date: '2026-08-15', topic: 'Khái niệm Mật mã học & Mã hóa cổ điển' }
];

// === DỮ LIỆU ĐIỂM DANH BAN ĐẦU ===
const INITIAL_ATTENDANCE = [
  { scheduleId: 'SCH001', studentId: 'HV001', status: 'Present' },
  { scheduleId: 'SCH001', studentId: 'HV004', status: 'Present' },
  { scheduleId: 'SCH002', studentId: 'HV001', status: 'Present' },
  { scheduleId: 'SCH002', studentId: 'HV004', status: 'Absent' },
  { scheduleId: 'SCH003', studentId: 'HV002', status: 'Present' }
];

// === CÁC TÀI KHOẢN NGƯỜI DÙNG ===
const USERS_ACCOUNTS = [
  { username: 'admin', password: '123', name: 'Lê Minh Đức (Admin)', role: 'admin', email: 'admin@hic.edu.vn' },
  { username: 'cbdt', password: '123', name: 'Nguyễn Thị Hoa (Cán bộ)', role: 'staff', email: 'hoa.nt@hic.edu.vn' },
  { username: 'giangvien', password: '123', name: 'ThS. Trần Minh Hoàng', role: 'teacher', email: 'hoang.tm@hic.edu.vn', teacherId: 'GV003' },
  { username: 'hocvien', password: '123', name: 'Nguyễn Văn Anh', role: 'student', email: 'vananh.nguyen@gmail.com', studentId: 'HV001' }
];

export default function App() {
  // --- STATE QUẢN LÝ ---
  const [currentUser, setCurrentUser] = useState(USERS_ACCOUNTS[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Cơ sở dữ liệu ứng dụng
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [enrollments, setEnrollments] = useState(INITIAL_ENROLLMENTS);
  const [grades, setGrades] = useState(INITIAL_GRADES);
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [accounts, setAccounts] = useState(USERS_ACCOUNTS);

  // Bộ lọc tìm kiếm
  const [studentSearch, setStudentSearch] = useState('');
  const [studentFilterStatus, setStudentFilterStatus] = useState('All');
  const [teacherSearch, setTeacherSearch] = useState('');
  const [teacherFilterDept, setTeacherFilterDept] = useState('All');
  const [classSearch, setClassSearch] = useState('');
  const [classFilterCourse, setClassFilterCourse] = useState('All');

  // Lớp học được chọn chi tiết
  const [selectedClassId, setSelectedClassId] = useState(INITIAL_CLASSES[0].id);
  const [selectedScheduleId, setSelectedScheduleId] = useState(INITIAL_SCHEDULES[0].id);

  // --- STATE CỦA TRỢ LÝ AI (GEMINI) ---
  const [aiChatHistory, setAiChatHistory] = useState([
    { 
      role: 'model', 
      parts: [{ text: "Xin chào! Tôi là Trợ lý Học thuật AI tại trường Cao đẳng HIC. Tôi có thể giúp gì cho quá trình học tập hoặc hỗ trợ giảng dạy của bạn hôm nay?" }] 
    }
  ]);
  const [userAiInput, setUserAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnalysisModalOpen, setAiAnalysisModalOpen] = useState(false);
  const [aiAnalysisContent, setAiAnalysisContent] = useState('');
  const [isAiAnalysisLoading, setIsAiAnalysisLoading] = useState(false);

  const chatEndRef = useRef(null);

  // Cuộn xuống cuối khung chat AI tự động
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiChatHistory, isAiLoading]);

  // State các Form Modals
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [studentFormMode, setStudentFormMode] = useState('add');
  const [currentStudentData, setCurrentStudentData] = useState({
    id: '', name: '', dob: '', gender: 'Nam', cccd: '', phone: '', email: '', status: 'Đang học', class: ''
  });

  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [teacherFormMode, setTeacherFormMode] = useState('add');
  const [currentTeacherData, setCurrentTeacherData] = useState({
    id: '', name: '', specialty: '', department: 'Khoa Công nghệ thông tin', phone: '', email: '', degree: 'Thạc sĩ'
  });

  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [classFormMode, setClassFormMode] = useState('add');
  const [currentClassData, setCurrentClassData] = useState({
    id: '', name: '', courseId: 'KH001', teacherId: 'GV001', startDate: '', endDate: '', location: '', capacity: 30, term: 'Kỳ I - 2026'
  });

  // State Quản lý điểm
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [currentGradeForm, setCurrentGradeForm] = useState({
    studentId: '', classId: '', trainingScore: 80, testScore: 0, finalScore: 0, term: 'Kỳ I - 2026'
  });

  // State Thêm lịch học
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    classId: '', date: '', topic: ''
  });

  // Trạng thái đổi mật khẩu
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [changePassForm, setChangePassForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [changePassError, setChangePassError] = useState('');

  // Toast notification
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // --- HÀM GỌI GEMINI API ---
  const callGeminiAPI = async (userPrompt, systemInstructionText = "") => {
    const apiKey = ""; // Leave blank, runtime handles automatic provision
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: userPrompt }] }]
    };

    if (systemInstructionText) {
      payload.systemInstruction = {
        parts: [{ text: systemInstructionText }]
      };
    }

    // Exponential Backoff implementation
    let delay = 1000;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          if (response.status === 429) {
            await new Promise(res => setTimeout(res, delay));
            delay *= 2;
            continue;
          }
          throw new Error(`Gemini API Error: Status ${response.status}`);
        }

        const data = await response.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Không nhận được phản hồi từ AI.";
      } catch (error) {
        if (attempt === 2) {
          console.error("Gemini API Connection failed after 3 attempts:", error);
          throw error;
        }
        await new Promise(res => setTimeout(res, delay));
        delay *= 2;
      }
    }
  };

  // Tạo văn bản ngữ cảnh (Grounded state) dựa trên vai trò của người dùng
  const getAIChatSystemInstruction = () => {
    let instruction = "Bạn là Trợ lý học thuật thông minh chính thức của trường Cao đẳng HIC. ";
    instruction += "Hãy trả lời bằng tiếng Việt một cách lịch sự, chuyên nghiệp, hỗ trợ tận tình. ";
    instruction += `Thời gian hiện tại: Thứ Ba, ngày 14 tháng 7 năm 2026. `;

    // Bổ sung dữ liệu tổng quát của hệ thống
    instruction += `Dữ liệu HIC hiện có: ${courses.length} Khóa học, ${classes.length} Lớp học hoạt động, ${students.length} Học viên đăng ký, ${teachers.length} Giảng viên. `;

    if (currentUser.role === 'student') {
      // Học viên đăng nhập: Trích xuất điểm & chuyên cần của họ
      const studentId = currentUser.studentId || 'HV001';
      const profile = students.find(s => s.id === studentId) || {};
      const studentGrades = grades.filter(g => g.studentId === studentId);
      const cumulativeGPA = calculateCumulativeGPA(studentId);

      instruction += `Bạn đang nói chuyện trực tiếp với sinh viên: ${profile.name} (Mã: ${studentId}), Lớp: ${profile.class}. `;
      instruction += `Kết quả học tập toàn khóa: GPA tích lũy là ${cumulativeGPA.gpa} (Xếp loại: ${cumulativeGPA.rating}) trên tổng số ${cumulativeGPA.count} môn học đã thi. `;
      instruction += `Chi tiết điểm học phần: `;
      studentGrades.forEach(g => {
        const clsName = classes.find(c => c.id === g.classId)?.name || 'Chưa rõ';
        instruction += `[Lớp ${clsName} (${g.classId}): Điểm rèn luyện=${g.trainingScore}, Giữa kỳ=${g.testScore}, Cuối kỳ=${g.finalScore}]; `;
      });

      instruction += "Nhiệm vụ chính: Hãy tư vấn phương hướng học tập, đưa ra lời khuyên thiết thực giúp họ cải thiện điểm số và chuyên cần dựa trên kết quả thực tế này.";
    } else {
      // Vai trò Quản lý / Giáo viên:
      instruction += `Bạn đang hỗ trợ cán bộ/giảng viên: ${currentUser.name} (Quyền: ${currentUser.role}). `;
      instruction += `Danh sách các lớp hiện tại trong trường: `;
      classes.forEach(c => {
        const teacherName = teachers.find(t => t.id === c.teacherId)?.name || 'Chưa phân công';
        const stCount = enrollments.filter(e => e.classId === c.id).length;
        instruction += `[Lớp: ${c.name} (Mã: ${c.id}), Giảng viên: ${teacherName}, Sĩ số: ${stCount}/${c.capacity} học viên]; `;
      });

      instruction += "Nhiệm vụ chính: Hỗ trợ người dùng soạn thảo đề cương bài học, viết email thông báo học vụ, phân tích thống kê lớp học nhanh, tư vấn phương pháp giảng dạy hiện đại.";
    }

    return instruction;
  };

  const handleSendAiMessage = async (e) => {
    if (e) e.preventDefault();
    if (!userAiInput.trim() || isAiLoading) return;

    const userMsg = userAiInput;
    setUserAiInput('');

    // Thêm tin nhắn của User vào history
    const updatedHistory = [...aiChatHistory, { role: 'user', parts: [{ text: userMsg }] }];
    setAiChatHistory(updatedHistory);
    setIsAiLoading(true);

    try {
      const systemInstructionText = getAIChatSystemInstruction();
      const aiResponse = await callGeminiAPI(userMsg, systemInstructionText);
      
      setAiChatHistory([...updatedHistory, { role: 'model', parts: [{ text: aiResponse }] }]);
    } catch (err) {
      setAiChatHistory([...updatedHistory, { role: 'model', parts: [{ text: "Rất tiếc, đã xảy ra sự cố kết nối với máy chủ AI của HIC. Vui lòng thử lại sau." }] }]);
      showToast("Không thể kết nối tới AI", "error");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Kích hoạt AI phân tích học tập tự động bằng một nút bấm
  const handleTriggerAiAnalysis = async (studentId) => {
    const profile = students.find(s => s.id === studentId) || {};
    const cumulativeGPA = calculateCumulativeGPA(studentId);
    const studentGrades = grades.filter(g => g.studentId === studentId);

    setIsAiAnalysisLoading(true);
    setAiAnalysisModalOpen(true);

    let prompt = `Hãy đóng vai là Trưởng phòng Đào tạo trường Cao đẳng HIC. Hãy phân tích chuyên sâu và đưa ra đánh giá, gợi ý cải thiện học tập chi tiết nhất cho sinh viên sau:\n\n`;
    prompt += `Học tên: ${profile.name}\nMã sinh viên: ${studentId}\nLớp hành chính: ${profile.class}\n`;
    prompt += `Điểm trung bình GPA tích lũy: ${cumulativeGPA.gpa} (Học lực: ${cumulativeGPA.rating})\n\n`;
    prompt += `Chi tiết điểm thi các lớp học phần:\n`;
    
    studentGrades.forEach((g, index) => {
      const cls = classes.find(c => c.id === g.classId);
      const attendanceStats = getStudentAttendanceStats(g.classId, studentId);
      prompt += `${index + 1}. Môn học: ${cls ? cls.name : 'N/A'} (Kỳ học: ${g.term})\n`;
      prompt += `   - Điểm chuyên cần/Rèn luyện: ${g.trainingScore}/100\n`;
      prompt += `   - Điểm kiểm tra giữa kỳ (40%): ${g.testScore}/10\n`;
      prompt += `   - Điểm thi kết thúc học phần (60%): ${g.finalScore}/10\n`;
      prompt += `   - Tỷ lệ tham gia buổi học thực tế: Đã điểm danh ${attendanceStats.present} buổi có mặt / ${attendanceStats.total} buổi học (Chuyên cần: ${attendanceStats.percentage}%)\n`;
    });

    prompt += `\nĐịnh dạng đầu ra: Hãy viết báo cáo có bố cục rõ ràng bằng các tiêu đề đẹp mắt, bao gồm: \n`;
    prompt += `1. Nhận định ưu điểm & thế mạnh của sinh viên này.\n`;
    prompt += `2. Chỉ ra các lỗ hổng học lực, nguy cơ bị điểm kém hoặc rủi ro vắng học (nếu có).\n`;
    prompt += `3. Kế hoạch hành động cụ thể để cải thiện GPA và nâng cao kỹ năng thực hành.\n`;
    prompt += `4. Lời chúc và động viên tinh thần từ trường HIC.`;

    try {
      const evaluation = await callGeminiAPI(prompt, "Bạn là cố vấn học tập xuất sắc của trường HIC.");
      setAiAnalysisContent(evaluation);
    } catch (err) {
      setAiAnalysisContent("Không thể tạo phân tích tự động lúc này do quá tải kết nối. Bạn vui lòng thử lại sau.");
    } finally {
      setIsAiAnalysisLoading(false);
    }
  };

  // --- TÍNH TOÁN ĐIỂM SỐ & XẾP LOẠI HỌC KỲ ---
  const calculateGradeResult = (test, final, training) => {
    const summary = (parseFloat(test) * 0.4) + (parseFloat(final) * 0.6);
    const summaryScore = parseFloat(summary.toFixed(2));
    
    let classification = 'Yếu';
    if (summaryScore >= 9.0 && training >= 90) classification = 'Xuất sắc';
    else if (summaryScore >= 8.0 && training >= 80) classification = 'Giỏi';
    else if (summaryScore >= 6.5 && training >= 65) classification = 'Khá';
    else if (summaryScore >= 5.0 && training >= 50) classification = 'Trung bình';
    
    const result = (summaryScore >= 5.0 && training >= 50) ? 'Đạt' : 'Không đạt';

    return { summaryScore, classification, result };
  };

  // Tính điểm toàn khóa cho 1 học viên
  const calculateCumulativeGPA = (studentId) => {
    const studentGrades = grades.filter(g => g.studentId === studentId);
    if (studentGrades.length === 0) return { gpa: 'N/A', rating: 'Chưa có điểm', count: 0 };

    let totalScore = 0;
    let totalTraining = 0;
    studentGrades.forEach(g => {
      const { summaryScore } = calculateGradeResult(g.testScore, g.finalScore, g.trainingScore);
      totalScore += summaryScore;
      totalTraining += g.trainingScore;
    });

    const averageScore = parseFloat((totalScore / studentGrades.length).toFixed(2));
    const averageTraining = parseFloat((totalTraining / studentGrades.length).toFixed(2));

    let rating = 'Yếu';
    if (averageScore >= 9.0 && averageTraining >= 90) rating = 'Xuất sắc';
    else if (averageScore >= 8.0 && averageTraining >= 80) rating = 'Giỏi';
    else if (averageScore >= 6.5 && averageTraining >= 65) rating = 'Khá';
    else if (averageScore >= 5.0 && averageTraining >= 50) rating = 'Trung bình';

    return {
      gpa: averageScore,
      avgTraining: averageTraining,
      rating,
      count: studentGrades.length
    };
  };

  // --- ĐĂNG NHẬP / ĐĂNG XUẤT ---
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
      showToast(`Chào mừng ${user.name} quay trở lại HIC!`, 'success');
    } else {
      setLoginError('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: '', password: '' });
    showToast('Đã đăng xuất khỏi HIC Portal.', 'info');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (changePassForm.oldPassword !== currentUser.password) {
      setChangePassError('Mật khẩu hiện tại không chính xác.');
      return;
    }
    if (changePassForm.newPassword.length < 3) {
      setChangePassError('Mật khẩu mới phải từ 3 ký tự trở lên.');
      return;
    }
    if (changePassForm.newPassword !== changePassForm.confirmPassword) {
      setChangePassError('Mật khẩu xác nhận không khớp.');
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
    showToast('Đổi mật khẩu thành công!', 'success');
  };

  // --- CRUD HỌC VIÊN ---
  const handleOpenStudentModal = (mode, student = null) => {
    setStudentFormMode(mode);
    if (mode === 'edit' && student) {
      setCurrentStudentData({ ...student });
    } else {
      const lastIdNum = students.length > 0 
        ? Math.max(...students.map(s => parseInt(s.id.replace('HV', '')))) 
        : 0;
      const newId = `HV${String(lastIdNum + 1).padStart(3, '0')}`;
      setCurrentStudentData({
        id: newId, name: '', dob: '', gender: 'Nam', cccd: '', phone: '', email: '', status: 'Đang học', class: 'CNTT-K15'
      });
    }
    setIsStudentModalOpen(true);
  };

  const handleSaveStudent = (e) => {
    e.preventDefault();
    if (studentFormMode === 'add') {
      if (students.some(s => s.id === currentStudentData.id)) {
        showToast('Mã học viên đã tồn tại!', 'error');
        return;
      }
      setStudents([...students, currentStudentData]);
      showToast(`Thêm học viên ${currentStudentData.name} thành công.`, 'success');
    } else {
      setStudents(students.map(s => s.id === currentStudentData.id ? currentStudentData : s));
      showToast(`Cập nhật học viên ${currentStudentData.name} thành công.`, 'success');
    }
    setIsStudentModalOpen(false);
  };

  const handleDeleteStudent = (id, name) => {
    if (window.confirm(`Bạn muốn xóa học viên ${name} (${id})? Tất cả dữ liệu đăng ký lớp học & điểm số liên quan cũng sẽ bị loại bỏ.`)) {
      setStudents(students.filter(s => s.id !== id));
      setEnrollments(enrollments.filter(e => e.studentId !== id));
      setGrades(grades.filter(g => g.studentId !== id));
      showToast(`Đã xóa học viên ${name}.`, 'warning');
    }
  };

  // --- CRUD GIÁO VIÊN ---
  const handleOpenTeacherModal = (mode, teacher = null) => {
    setTeacherFormMode(mode);
    if (mode === 'edit' && teacher) {
      setCurrentTeacherData({ ...teacher });
    } else {
      const lastIdNum = teachers.length > 0 
        ? Math.max(...teachers.map(t => parseInt(t.id.replace('GV', '')))) 
        : 0;
      const newId = `GV${String(lastIdNum + 1).padStart(3, '0')}`;
      setCurrentTeacherData({
        id: newId, name: '', specialty: '', department: 'Khoa Công nghệ thông tin', phone: '', email: '', degree: 'Thạc sĩ'
      });
    }
    setIsTeacherModalOpen(true);
  };

  const handleSaveTeacher = (e) => {
    e.preventDefault();
    if (teacherFormMode === 'add') {
      if (teachers.some(t => t.id === currentTeacherData.id)) {
        showToast('Mã giảng viên đã tồn tại!', 'error');
        return;
      }
      setTeachers([...teachers, currentTeacherData]);
      showToast(`Thêm giảng viên ${currentTeacherData.name} thành công.`, 'success');
    } else {
      setTeachers(teachers.map(t => t.id === currentTeacherData.id ? currentTeacherData : t));
      showToast(`Cập nhật giảng viên ${currentTeacherData.name} thành công.`, 'success');
    }
    setIsTeacherModalOpen(false);
  };

  const handleDeleteTeacher = (id, name) => {
    if (window.confirm(`Bạn muốn xóa giảng viên ${name} (${id})?`)) {
      setTeachers(teachers.filter(t => t.id !== id));
      showToast(`Đã xóa giảng viên ${name}.`, 'warning');
    }
  };

  // --- CRUD LỚP HỌC ---
  const handleOpenClassModal = (mode, cls = null) => {
    setClassFormMode(mode);
    if (mode === 'edit' && cls) {
      setCurrentClassData({ ...cls });
    } else {
      const lastIdNum = classes.length > 0 
        ? Math.max(...classes.map(c => parseInt(c.id.replace('LH', '')))) 
        : 0;
      const newId = `LH${String(lastIdNum + 1).padStart(3, '0')}`;
      setCurrentClassData({
        id: newId, name: '', courseId: 'KH001', teacherId: 'GV001', startDate: '2026-08-01', endDate: '2026-11-30', location: 'Lab 402 - HIC', capacity: 30, term: 'Kỳ I - 2026'
      });
    }
    setIsClassModalOpen(true);
  };

  const handleSaveClass = (e) => {
    e.preventDefault();
    if (classFormMode === 'add') {
      if (classes.some(c => c.id === currentClassData.id)) {
        showToast('Mã lớp học đã tồn tại!', 'error');
        return;
      }
      setClasses([...classes, currentClassData]);
      showToast(`Mở lớp học ${currentClassData.name} thành công.`, 'success');
      setSelectedClassId(currentClassData.id);
    } else {
      setClasses(classes.map(c => c.id === currentClassData.id ? currentClassData : c));
      showToast(`Cập nhật thông tin lớp ${currentClassData.name} thành công.`, 'success');
    }
    setIsClassModalOpen(false);
  };

  const handleDeleteClass = (id, name) => {
    if (window.confirm(`Xóa lớp học ${name} (${id})? Hành động này sẽ xóa toàn bộ danh sách đăng ký học và điểm số.`)) {
      setClasses(classes.filter(c => c.id !== id));
      setEnrollments(enrollments.filter(e => e.classId !== id));
      setGrades(grades.filter(g => g.classId !== id));
      setSchedules(schedules.filter(s => s.classId !== id));
      showToast(`Đã giải tán lớp học ${name}.`, 'warning');
      if (selectedClassId === id && classes.length > 1) {
        setSelectedClassId(classes.filter(c => c.id !== id)[0].id);
      }
    }
  };

  // --- ĐĂNG KÝ HỌC (ENROLLMENT) ---
  const handleEnrollStudent = (studentId) => {
    if (!studentId) return;
    const isAlreadyEnrolled = enrollments.some(e => e.classId === selectedClassId && e.studentId === studentId);
    if (isAlreadyEnrolled) {
      showToast('Học viên này đã đăng ký lớp học này từ trước.', 'error');
      return;
    }

    const currentClass = classes.find(c => c.id === selectedClassId);
    const currentEnrolledCount = enrollments.filter(e => e.classId === selectedClassId).length;
    if (currentEnrolledCount >= currentClass.capacity) {
      showToast('Lớp học đã đạt sĩ số tối đa!', 'error');
      return;
    }

    setEnrollments([...enrollments, { classId: selectedClassId, studentId }]);
    
    // Tự động thêm điểm rỗng cho học viên mới vào lớp
    const isGradeExist = grades.some(g => g.studentId === studentId && g.classId === selectedClassId);
    if (!isGradeExist) {
      const cls = classes.find(c => c.id === selectedClassId);
      setGrades([...grades, {
        studentId,
        classId: selectedClassId,
        trainingScore: 80,
        testScore: 0,
        finalScore: 0,
        term: cls ? cls.term : 'Kỳ I - 2026'
      }]);
    }

    showToast('Thêm học viên vào lớp thành công!', 'success');
  };

  const handleCancelEnrollment = (studentId, studentName) => {
    if (window.confirm(`Hủy đăng ký học của ${studentName} khỏi lớp này?`)) {
      setEnrollments(enrollments.filter(e => !(e.classId === selectedClassId && e.studentId === studentId)));
      // Đồng thời gỡ điểm của lớp này
      setGrades(grades.filter(g => !(g.classId === selectedClassId && g.studentId === studentId)));
      showToast(`Đã hủy đăng ký lớp của ${studentName}.`, 'warning');
    }
  };

  // --- XUẤT DANH SÁCH LỚP HỌC (SIMULATED CSV DOWNLOAD) ---
  const handleExportCSV = (classId) => {
    const cls = classes.find(c => c.id === classId);
    const teacher = teachers.find(t => t.id === cls.teacherId);
    const classEnrolled = enrollments.filter(e => e.classId === classId).map(e => students.find(s => s.id === e.studentId));

    if (!cls || classEnrolled.length === 0) {
      showToast('Không có dữ liệu học viên để xuất!', 'error');
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `DANH SACH LOP HOC - HIC\n`;
    csvContent += `Ten lop: ${cls.name} (${cls.id})\n`;
    csvContent += `Giang vien: ${teacher ? teacher.name : 'Chua phan cong'}\n`;
    csvContent += `Ky hoc: ${cls.term}\n\n`;
    csvContent += `STT,Ma Hoc Vien,Ho va Ten,Ngay sinh,Gioi tinh,CCCD,Dien thoai,Email\n`;

    classEnrolled.forEach((st, index) => {
      if (st) {
        csvContent += `${index + 1},${st.id},${st.name},${st.dob},${st.gender},'${st.cccd},${st.phone},${st.email}\n`;
      }
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Danh_sach_lop_${cls.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Xuất danh sách thành công!', 'success');
  };

  // --- QUẢN LÝ ĐIỂM SỐ ---
  const handleOpenGradeModal = (studentId, classId) => {
    const existingGrade = grades.find(g => g.studentId === studentId && g.classId === classId);
    const cls = classes.find(c => c.id === classId);
    if (existingGrade) {
      setCurrentGradeForm({ ...existingGrade });
    } else {
      setCurrentGradeForm({
        studentId,
        classId,
        trainingScore: 80,
        testScore: 0,
        finalScore: 0,
        term: cls ? cls.term : 'Kỳ I - 2026'
      });
    }
    setIsGradeModalOpen(true);
  };

  const handleSaveGrade = (e) => {
    e.preventDefault();
    const idx = grades.findIndex(g => g.studentId === currentGradeForm.studentId && g.classId === currentGradeForm.classId);
    if (idx > -1) {
      const updatedGrades = [...grades];
      updatedGrades[idx] = {
        ...currentGradeForm,
        trainingScore: parseInt(currentGradeForm.trainingScore),
        testScore: parseFloat(currentGradeForm.testScore),
        finalScore: parseFloat(currentGradeForm.finalScore)
      };
      setGrades(updatedGrades);
    } else {
      setGrades([...grades, {
        ...currentGradeForm,
        trainingScore: parseInt(currentGradeForm.trainingScore),
        testScore: parseFloat(currentGradeForm.testScore),
        finalScore: parseFloat(currentGradeForm.finalScore)
      }]);
    }
    setIsGradeModalOpen(false);
    showToast('Đã lưu điểm học phần thành công!', 'success');
  };

  // --- QUẢN LÝ LỊCH HỌC & ĐIỂM DANH ---
  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newSchedule.date || !newSchedule.topic) {
      showToast('Vui lòng nhập đầy đủ ngày học và chủ đề!', 'error');
      return;
    }
    const lastIdNum = schedules.length > 0 
      ? Math.max(...schedules.map(s => parseInt(s.id.replace('SCH', '')))) 
      : 0;
    const newId = `SCH${String(lastIdNum + 1).padStart(3, '0')}`;
    
    setSchedules([...schedules, {
      id: newId,
      classId: selectedClassId,
      date: newSchedule.date,
      topic: newSchedule.topic
    }]);

    setIsScheduleModalOpen(false);
    setNewSchedule({ classId: '', date: '', topic: '' });
    showToast('Thêm lịch học thành công!', 'success');
  };

  // --- TRA CỨU & BỘ LỌC CHUYÊN SÂU ---
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.id.toLowerCase().includes(studentSearch.toLowerCase()) ||
        student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        student.phone.includes(studentSearch) ||
        student.cccd.includes(studentSearch) ||
        student.email.toLowerCase().includes(studentSearch.toLowerCase());
      const matchesStatus = studentFilterStatus === 'All' || student.status === studentFilterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [students, studentSearch, studentFilterStatus]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const matchesSearch = 
        teacher.id.toLowerCase().includes(teacherSearch.toLowerCase()) ||
        teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
        teacher.specialty.toLowerCase().includes(teacherSearch.toLowerCase()) ||
        teacher.email.toLowerCase().includes(teacherSearch.toLowerCase());
      const matchesDept = teacherFilterDept === 'All' || teacher.department === teacherFilterDept;
      return matchesSearch && matchesDept;
    });
  }, [teachers, teacherSearch, teacherFilterDept]);

  const filteredClasses = useMemo(() => {
    return classes.filter(cls => {
      const matchesSearch = 
        cls.id.toLowerCase().includes(classSearch.toLowerCase()) ||
        cls.name.toLowerCase().includes(classSearch.toLowerCase()) ||
        cls.location.toLowerCase().includes(classSearch.toLowerCase()) ||
        cls.term.toLowerCase().includes(classSearch.toLowerCase());
      const matchesCourse = classFilterCourse === 'All' || cls.courseId === classFilterCourse;
      return matchesSearch && matchesCourse;
    });
  }, [classes, classSearch, classFilterCourse]);

  // Bộ danh mục các Khoa/Đơn vị giảng viên
  const departments = useMemo(() => {
    const depts = new Set(teachers.map(t => t.department));
    return ['All', ...Array.from(depts)];
  }, [teachers]);

  // Kiểm tra quyền của vai trò hiện tại
  const hasAccess = (allowedRoles) => {
    return allowedRoles.includes(currentUser.role);
  };

  // Thống kê chuyên cần của 1 học viên trong 1 lớp
  const getStudentAttendanceStats = (classId, studentId) => {
    const classSchedules = schedules.filter(s => s.classId === classId);
    if (classSchedules.length === 0) return { present: 0, absent: 0, excused: 0, percentage: 100 };

    const scheduleIds = classSchedules.map(s => s.id);
    const studentRecords = attendance.filter(a => scheduleIds.includes(a.scheduleId) && a.studentId === studentId);

    const present = studentRecords.filter(r => r.status === 'Present').length;
    const absent = studentRecords.filter(r => r.status === 'Absent').length;
    const excused = studentRecords.filter(r => r.status === 'Excused').length;

    const totalTracked = present + absent + excused;
    const percentage = totalTracked > 0 ? Math.round((present / totalTracked) * 100) : 100;

    return { present, absent, excused, percentage, total: classSchedules.length };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      
      {/* --- THÔNG BÁO TOAST --- */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 flex items-center p-4 rounded-xl shadow-2xl max-w-md border bg-white text-slate-800 animate-slide-in">
          {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />}
          {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500 mr-3" />}
          {notification.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500 mr-3" />}
          {notification.type === 'info' && <AlertCircle className="w-5 h-5 text-sky-500 mr-3" />}
          <span className="font-semibold text-sm">{notification.message}</span>
        </div>
      )}

      {/* ================= ĐĂNG NHẬP GIAO DIỆN ================= */}
      {!isLoggedIn ? (
        <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-8 border border-slate-100">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-3xl mb-4">
                <GraduationCap className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Hệ thống quản lý đào tạo - HIC</h2>
              <p className="text-sm text-slate-500 mt-1">Cổng thông tin đào tạo & trợ lý AI học thuật</p>
            </div>

            {loginError && (
              <div className="mb-5 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center">
                <AlertCircle className="w-4 h-4 mr-2.5 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Tên đăng nhập</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm text-slate-800"
                    placeholder="Tài khoản (admin, giangvien, hocvien)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Mật khẩu</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
                    placeholder="Mật khẩu của bạn"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-750 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-indigo-200 cursor-pointer"
              >
                Đăng nhập hệ thống
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase text-center mb-3">Tài khoản demo</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {accounts.map((acc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setLoginForm({ username: acc.username, password: acc.password });
                      setLoginError('');
                    }}
                    className="p-2 border border-slate-150 hover:bg-indigo-50 rounded-xl text-left transition-all cursor-pointer"
                  >
                    <span className="font-semibold block text-slate-800 truncate">{acc.name}</span>
                    <span className="text-slate-500 font-mono text-[10px]">ID: {acc.username} (pw: 123)</span>
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
          <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-350 border-r border-slate-800 shrink-0">
            <div className="p-5 border-b border-slate-800 flex items-center space-x-3 bg-slate-950">
              <div className="p-2 bg-indigo-650 text-white rounded-xl">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-white text-base leading-none">HIC Portal</h1>
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Hệ Thống Đào Tạo</span>
              </div>
            </div>

            {/* Profile nhanh */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/40">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-bold border border-slate-700">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
                  <span className={`inline-block px-2 py-0.5 mt-1 text-[9px] font-extrabold rounded-full border ${getRoleLabel(currentUser.role).color}`}>
                    {getRoleLabel(currentUser.role).text}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4 mr-3" />
                Bảng điều khiển
              </button>

              <button
                onClick={() => setActiveTab('ai_advising')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer relative overflow-hidden group ${
                  activeTab === 'ai_advising' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 mr-3 text-amber-400 animate-pulse" />
                <span className="font-semibold">Trợ lý Học thuật AI</span>
                <span className="absolute right-2 px-1.5 py-0.5 text-[9px] bg-amber-500 text-slate-900 font-black rounded uppercase tracking-widest scale-90 group-hover:scale-100 transition-transform">PRO</span>
              </button>

              <button
                onClick={() => setActiveTab('classes')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'classes' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 mr-3" />
                Quản lý lớp học
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'students' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 mr-3" />
                Quản lý học viên
              </button>

              <button
                onClick={() => setActiveTab('teachers')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'teachers' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4 mr-3" />
                Hồ sơ giáo viên
              </button>

              <button
                onClick={() => setActiveTab('grades_view')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'grades_view' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4 mr-3" />
                Quản lý điểm số
              </button>

              <button
                onClick={() => setActiveTab('attendance_view')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'attendance_view' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <ClipboardList className="w-4 h-4 mr-3" />
                Điểm danh & Lịch học
              </button>

              <div className="pt-4 mt-4 border-t border-slate-800">
                <p className="px-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Hệ thống</p>
                <button
                  onClick={() => setIsChangePassModalOpen(true)}
                  className="w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                >
                  <Key className="w-4 h-4 mr-3 text-slate-400" />
                  Đổi mật khẩu
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-red-955 hover:text-red-300 transition-colors mt-1 text-rose-400 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Đăng xuất
                </button>
              </div>
            </nav>
            
            <div className="p-4 text-center text-[11px] text-slate-500 border-t border-slate-800">
              Cao đẳng HIC © 2026
            </div>
          </aside>

          {/* --- MOBILE NAVIGATION --- */}
          <header className="md:hidden bg-slate-900 text-slate-200 flex items-center justify-between p-4 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 bg-indigo-650 rounded-lg text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-sm">HIC Portal</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setActiveTab('ai_advising')} 
                className={`p-2 rounded-lg ${activeTab === 'ai_advising' ? 'text-amber-400 bg-slate-800' : 'text-slate-450'}`}
                title="Trợ lý AI"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button onClick={() => setIsChangePassModalOpen(true)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
                <Key className="w-4 h-4" />
              </button>
              <button onClick={handleLogout} className="p-2 hover:bg-rose-955 rounded-lg text-rose-400">
                <LogOut className="w-4 h-4" />
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-200">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </header>

          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-900 border-b border-slate-800 text-slate-300 p-4 space-y-1">
              <button onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} className={`w-full flex items-center p-3 rounded-xl text-sm ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : ''}`}>
                <Layers className="w-4 h-4 mr-3" /> Dashboard
              </button>
              <button onClick={() => { setActiveTab('ai_advising'); setMobileMenuOpen(false); }} className={`w-full flex items-center p-3 rounded-xl text-sm ${activeTab === 'ai_advising' ? 'bg-indigo-600 text-white' : ''}`}>
                <Sparkles className="w-4 h-4 mr-3 text-amber-400" /> Trợ lý Học thuật AI
              </button>
              <button onClick={() => { setActiveTab('classes'); setMobileMenuOpen(false); }} className={`w-full flex items-center p-3 rounded-xl text-sm ${activeTab === 'classes' ? 'bg-indigo-600 text-white' : ''}`}>
                <BookOpen className="w-4 h-4 mr-3" /> Quản lý lớp học
              </button>
              <button onClick={() => { setActiveTab('students'); setMobileMenuOpen(false); }} className={`w-full flex items-center p-3 rounded-xl text-sm ${activeTab === 'students' ? 'bg-indigo-600 text-white' : ''}`}>
                <Users className="w-4 h-4 mr-3" /> Quản lý học viên
              </button>
              <button onClick={() => { setActiveTab('teachers'); setMobileMenuOpen(false); }} className={`w-full flex items-center p-3 rounded-xl text-sm ${activeTab === 'teachers' ? 'bg-indigo-600 text-white' : ''}`}>
                <UserCheck className="w-4 h-4 mr-3" /> Hồ sơ giáo viên
              </button>
              <button onClick={() => { setActiveTab('grades_view'); setMobileMenuOpen(false); }} className={`w-full flex items-center p-3 rounded-xl text-sm ${activeTab === 'grades_view' ? 'bg-indigo-600 text-white' : ''}`}>
                <Award className="w-4 h-4 mr-3" /> Quản lý điểm số
              </button>
              <button onClick={() => { setActiveTab('attendance_view'); setMobileMenuOpen(false); }} className={`w-full flex items-center p-3 rounded-xl text-sm ${activeTab === 'attendance_view' ? 'bg-indigo-600 text-white' : ''}`}>
                <ClipboardList className="w-4 h-4 mr-3" /> Điểm danh & Lịch học
              </button>
            </div>
          )}

          {/* ================= CONTENT MAIN ================= */}
          <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-full">
            
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {activeTab === 'dashboard' && 'Bảng điều khiển & Thống kê'}
                  {activeTab === 'ai_advising' && 'Cố vấn Học thuật AI'}
                  {activeTab === 'classes' && 'Hệ thống lớp học & Khóa học'}
                  {activeTab === 'students' && 'Danh sách quản lý Học viên'}
                  {activeTab === 'teachers' && 'Danh mục hồ sơ Giảng viên'}
                  {activeTab === 'grades_view' && 'Bảng điểm & Khảo thí'}
                  {activeTab === 'attendance_view' && 'Sổ điểm danh & Thời khóa biểu'}
                </h1>
                <p className="text-sm text-slate-500 mt-1">Hệ thống quản lý đào tạo trực tuyến - Cao đẳng HIC</p>
              </div>

              <div className="flex items-center space-x-3 bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-sm self-start">
                <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-500 uppercase">Vai trò hiện tại:</span>
                <span className="text-sm font-bold text-indigo-650">{getRoleLabel(currentUser.role).text}</span>
              </div>
            </div>

            {/* ================= TAB: DASHBOARD ================= */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Thống kê nhanh */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="p-3 bg-indigo-50 text-indigo-650 rounded-xl">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">Khóa học hiện có</p>
                      <h3 className="text-2xl font-bold text-slate-800">{courses.length} ngành</h3>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="p-3 bg-sky-50 text-sky-650 rounded-xl">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">Số lượng lớp mở</p>
                      <h3 className="text-2xl font-bold text-slate-800">{classes.length} lớp học</h3>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">Tổng số học viên</p>
                      <h3 className="text-2xl font-bold text-slate-800">{students.length} học viên</h3>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">Tổng số giáo viên</p>
                      <h3 className="text-2xl font-bold text-slate-800">{teachers.length} thầy cô</h3>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Bản tin AI và Hồ sơ cá nhân */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                    <h2 className="text-base font-bold text-slate-850 flex items-center">
                      <User className="w-5 h-5 mr-2 text-indigo-600" />
                      Hồ sơ cá nhân của bạn
                    </h2>
                    
                    <div className="flex flex-col items-center py-4 border-y border-slate-100">
                      <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-150 flex items-center justify-center text-3xl font-bold mb-3">
                        {currentUser.name.charAt(0)}
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{currentUser.name}</h3>
                      <span className="text-xs text-slate-400 mt-1">{currentUser.email}</span>
                    </div>

                    <div className="space-y-3.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Tên đăng nhập:</span>
                        <span className="font-mono font-semibold">{currentUser.username}</span>
                      </div>
                      {currentUser.studentId && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Mã học viên HIC:</span>
                          <span className="font-semibold text-indigo-600">{currentUser.studentId}</span>
                        </div>
                      )}
                      {currentUser.teacherId && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Mã giảng viên HIC:</span>
                          <span className="font-semibold text-teal-650">{currentUser.teacherId}</span>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => setActiveTab('ai_advising')}
                      className="w-full py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-650 text-xs font-bold rounded-xl transition-all flex items-center justify-center border border-indigo-150 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 mr-2 text-indigo-600 animate-pulse" /> Trò chuyện với Cố vấn AI
                    </button>
                  </div>

                  {/* Bản đồ quyền hạn */}
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-base font-bold text-slate-850 flex items-center mb-4">
                        <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                        Danh sách Phân quyền & Vai trò HIC - v3.0 AI Enabled
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                              <th className="py-2.5">Nghiệp vụ / Chức năng</th>
                              <th className="py-2.5 text-center">Quản trị viên</th>
                              <th className="py-2.5 text-center">Cán bộ</th>
                              <th className="py-2.5 text-center">Giảng viên</th>
                              <th className="py-2.5 text-center">Học viên</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            <tr>
                              <td className="py-2.5 font-medium">Trò chuyện học vụ cùng Trợ lý AI HIC</td>
                              <td className="text-center text-emerald-600 font-bold">✔</td>
                              <td className="text-center text-emerald-600 font-bold">✔</td>
                              <td className="text-center text-emerald-600 font-bold">✔</td>
                              <td className="text-center text-emerald-600 font-bold">✔</td>
                            </tr>
                            <tr>
                              <td className="py-2.5 font-medium">Phân tích học lực tự động bằng AI</td>
                              <td className="text-center text-emerald-600 font-bold">✔</td>
                              <td className="text-center text-emerald-600 font-bold">✔</td>
                              <td className="text-center text-emerald-600 font-bold">✔</td>
                              <td className="text-center text-emerald-600 font-bold">✔</td>
                            </tr>
                            <tr>
                              <td className="py-2.5 font-medium">Mở lớp học, đăng ký lớp học cho SV</td>
                              <td className="text-center text-emerald-600 font-bold">✔</td>
                              <td className="text-center text-emerald-600 font-bold">✔</td>
                              <td className="text-center text-slate-300">✖</td>
                              <td className="text-center text-slate-300">✖</td>
                            </tr>
                            <tr>
                              <td className="py-2.5 font-medium">Lập lịch học, Điểm danh theo buổi</td>
                              <td className="text-center text-emerald-600 font-bold">✔</td>
                              <td className="text-center text-emerald-600 font-bold">✔</td>
                              <td className="text-center text-emerald-600 font-bold">✔</td>
                              <td className="text-center text-slate-300">✖</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-150 text-indigo-900 text-xs p-4 rounded-xl mt-4">
                      <strong>Tính năng AI đột phá:</strong> Giờ đây bạn có thể yêu cầu **Cố vấn học tập AI** phân tích tiến độ, soạn giáo án hoặc giải đáp về các quy định đào tạo một cách tự động thông qua nút liên kết AI trong hệ thống.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB: TRỢ LÝ HỌC THUẬT AI ================= */}
            {activeTab === 'ai_advising' && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  
                  {/* Cột Trái: Quick Prompt Buttons */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 text-indigo-650">
                      <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                      <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-800">Tác vụ nhanh</h3>
                    </div>
                    <p className="text-xs text-slate-500">Bấm vào gợi ý dưới đây để AI tự động soạn thảo & phân tích dựa theo hồ sơ của bạn:</p>

                    <div className="space-y-2 pt-2">
                      {currentUser.role === 'student' ? (
                        <>
                          <button 
                            onClick={() => setUserAiInput("Hãy phân tích chi tiết kết quả học tập của tôi, dự báo điểm GPA của tôi và gợi ý cách học để đạt loại Giỏi học kỳ sau.")}
                            className="w-full text-left p-3 border border-slate-150 hover:border-indigo-400 hover:bg-slate-50/50 rounded-xl text-xs text-slate-700 transition-all cursor-pointer"
                          >
                            📈 Phân tích kết quả học tập & Đề xuất phương pháp học tập
                          </button>
                          <button 
                            onClick={() => setUserAiInput("Kiểm tra tỷ lệ chuyên cần của tôi và cảnh báo nếu có môn học nào có nguy cơ bị cấm thi do vắng nhiều.")}
                            className="w-full text-left p-3 border border-slate-150 hover:border-indigo-400 hover:bg-slate-50/50 rounded-xl text-xs text-slate-700 transition-all cursor-pointer"
                          >
                            ⚠️ Kiểm tra chuyên cần & Cảnh báo cấm thi
                          </button>
                          <button 
                            onClick={() => setUserAiInput("Làm sao để tôi có thể đăng ký tham gia thêm các dự án thực tế của khoa để nâng cao tay nghề lập trình?")}
                            className="w-full text-left p-3 border border-slate-150 hover:border-indigo-400 hover:bg-slate-50/50 rounded-xl text-xs text-slate-700 transition-all cursor-pointer"
                          >
                            💻 Tư vấn đăng ký dự án thực hành / NCKH
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => setUserAiInput("Hãy soạn thảo một thư thông báo nhắc nhở sinh viên nộp bài tập cuối kỳ môn Lập trình React một cách nghiêm túc, thời hạn 24h.")}
                            className="w-full text-left p-3 border border-slate-150 hover:border-indigo-400 hover:bg-slate-50/50 rounded-xl text-xs text-slate-700 transition-all cursor-pointer"
                          >
                            📧 Soạn thông báo nhắc nhở nộp bài cho sinh viên
                          </button>
                          <button 
                            onClick={() => setUserAiInput("Xây dựng giúp tôi đề cương bài giảng 15 buổi cho môn 'Lập trình ứng dụng React JS cơ bản cho sinh viên CNTT'.")}
                            className="w-full text-left p-3 border border-slate-150 hover:border-indigo-400 hover:bg-indigo-50/50 rounded-xl text-xs text-slate-700 transition-all cursor-pointer"
                          >
                            📝 Lập đề cương chi tiết bài giảng 15 buổi
                          </button>
                          <button 
                            onClick={() => setUserAiInput("Làm thế nào để áp dụng kỹ thuật Gamification (trò chơi hóa) vào giảng dạy môn 'Mật mã học' giúp sinh viên b bớt buồn ngủ?")}
                            className="w-full text-left p-3 border border-slate-150 hover:border-indigo-400 hover:bg-slate-50/50 rounded-xl text-xs text-slate-700 transition-all cursor-pointer"
                          >
                            🎯 Tư vấn đổi mới phương pháp giảng dạy tích cực
                          </button>
                        </>
                      )}
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-150 text-[11px] text-slate-500">
                      <strong>AI Context:</strong> Trợ lý tự động liên kết với hồ sơ người dùng <strong>{currentUser.name}</strong> để đưa ra câu trả lời chính xác nhất.
                    </div>
                  </div>

                  {/* Cột Phải: Khung Chatbot */}
                  <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[520px]">
                    
                    {/* Header Chat */}
                    <div className="p-4 border-b border-slate-150 bg-slate-50/50 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-800">Cố vấn Học tập HIC AI</h4>
                          <p className="text-[10px] text-emerald-600 flex items-center font-bold">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping mr-1.5"></span>
                            Đang hoạt động • Gemini 3.1 Flash
                          </p>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          if (window.confirm("Bạn muốn xóa cuộc hội thoại này để bắt đầu cuộc trò chuyện mới?")) {
                            setAiChatHistory([
                              { role: 'model', parts: [{ text: "Tôi đã sẵn sàng cho cuộc hội thoại mới. Bạn cần hỗ trợ gì về học vụ Cao đẳng HIC?" }] }
                            ]);
                          }
                        }}
                        className="text-xs text-slate-400 hover:text-rose-500 font-bold flex items-center transition-colors cursor-pointer"
                      >
                        Xóa lịch sử chat
                      </button>
                    </div>

                    {/* Danh sách tin nhắn */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {aiChatHistory.map((msg, index) => {
                        const isUser = msg.role === 'user';
                        return (
                          <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start space-x-2`}>
                            {!isUser && (
                              <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-650 shrink-0">
                                <Bot className="w-4 h-4" />
                              </div>
                            )}
                            <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                              isUser 
                                ? 'bg-indigo-600 text-white rounded-tr-none' 
                                : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                            }`}>
                              <span className="whitespace-pre-line">{msg.parts[0].text}</span>
                            </div>
                            {isUser && (
                              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 text-xs font-bold">
                                {currentUser.name.charAt(0)}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {isAiLoading && (
                        <div className="flex justify-start items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-650 shrink-0">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3 text-sm rounded-tl-none flex items-center space-x-2">
                            <span className="text-xs text-slate-500">Cố vấn AI đang phân tích dữ liệu</span>
                            <div className="flex space-x-1">
                              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100"></span>
                              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-200"></span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Ô nhập tin nhắn */}
                    <form onSubmit={handleSendAiMessage} className="p-3 border-t border-slate-150 bg-slate-50/50 flex space-x-2">
                      <input 
                        type="text"
                        value={userAiInput}
                        onChange={(e) => setUserAiInput(e.target.value)}
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                        placeholder="Đặt câu hỏi cho AI (ví dụ: 'Hãy gợi ý lập thời khóa biểu tự học môn React'...)"
                        disabled={isAiLoading}
                      />
                      <button 
                        type="submit"
                        disabled={isAiLoading || !userAiInput.trim()}
                        className="bg-indigo-600 hover:bg-indigo-750 disabled:bg-slate-200 text-white py-2.5 px-4 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>

                  </div>

                </div>
              </div>
            )}

            {/* ================= TAB: QUẢN LÝ LỚP HỌC & ĐĂNG KÝ HỌC ================= */}
            {activeTab === 'classes' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Điều khiển */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:max-w-md">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={classSearch}
                      onChange={(e) => setClassSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm"
                      placeholder="Tìm lớp: Tên lớp, địa điểm, học kỳ..."
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                    <select
                      value={classFilterCourse}
                      onChange={(e) => setClassFilterCourse(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2.5 focus:outline-none"
                    >
                      <option value="All">Tất cả Khóa học</option>
                      {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>

                    {hasAccess(['admin', 'staff']) ? (
                      <button
                        onClick={() => handleOpenClassModal('add')}
                        className="py-2.5 px-4 bg-indigo-650 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl shadow-md flex items-center cursor-pointer"
                      >
                        <Plus className="w-4 h-4 mr-1.5" /> Tạo lớp học mới
                      </button>
                    ) : (
                      <span className="text-xs text-rose-500 bg-rose-50 px-3 py-2.5 rounded-xl border border-rose-100 font-semibold">Chỉ xem dữ liệu</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Danh sách lớp */}
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-150 bg-slate-50/50">
                      <h3 className="text-sm font-bold text-slate-800">Danh mục lớp học hiện tại</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 text-xs font-bold border-b border-slate-200 uppercase">
                            <th className="py-3 px-4">Mã / Tên Lớp</th>
                            <th className="py-3 px-4">Giáo viên phụ trách</th>
                            <th className="py-3 px-4">Sĩ số</th>
                            <th className="py-3 px-4">Học kỳ / Địa điểm</th>
                            <th className="py-3 px-4 text-right">Hành động</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredClasses.length > 0 ? (
                            filteredClasses.map(cls => {
                              const enrolledCount = enrollments.filter(e => e.classId === cls.id).length;
                              const teacher = teachers.find(t => t.id === cls.teacherId);
                              const course = courses.find(c => c.id === cls.courseId);
                              return (
                                <tr 
                                  key={cls.id} 
                                  onClick={() => setSelectedClassId(cls.id)}
                                  className={`cursor-pointer transition-colors ${selectedClassId === cls.id ? 'bg-indigo-50/50 hover:bg-indigo-50' : 'hover:bg-slate-50/50'}`}
                                >
                                  <td className="py-4 px-4">
                                    <div className="font-mono font-bold text-indigo-655">{cls.id}</div>
                                    <div className="font-bold text-slate-800 text-xs mt-0.5">{cls.name}</div>
                                    <div className="text-[10px] text-slate-400">{course ? course.name : 'Khóa khác'}</div>
                                  </td>
                                  <td className="py-4 px-4 text-xs">
                                    <div className="font-medium text-slate-800">{teacher ? teacher.name : 'Chưa phân công'}</div>
                                    <div className="text-[10px] text-slate-400">{teacher ? teacher.degree : ''}</div>
                                  </td>
                                  <td className="py-4 px-4 text-xs font-semibold">
                                    <span className={`${enrolledCount >= cls.capacity ? 'text-rose-600' : 'text-emerald-600'}`}>
                                      {enrolledCount}
                                    </span>
                                    <span className="text-slate-400"> / {cls.capacity}</span>
                                  </td>
                                  <td className="py-4 px-4 text-xs">
                                    <div className="font-bold text-slate-700">{cls.term}</div>
                                    <div className="flex items-center text-[10px] text-slate-400 mt-1">
                                      <MapPin className="w-3 h-3 mr-1" /> {cls.location}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center justify-end space-x-1">
                                      {hasAccess(['admin', 'staff']) && (
                                        <>
                                          <button 
                                            onClick={() => handleOpenClassModal('edit', cls)}
                                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded"
                                          >
                                            <Edit className="w-3.5 h-3.5" />
                                          </button>
                                          <button 
                                            onClick={() => handleDeleteClass(cls.id, cls.name)}
                                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="5" className="py-8 text-center text-slate-400">Không tìm thấy lớp học nào.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Chi tiết Lớp học được chọn & Quản lý Đăng ký Học viên */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col space-y-4">
                    {(() => {
                      const selectedClass = classes.find(c => c.id === selectedClassId);
                      if (!selectedClass) return <div className="text-slate-400 text-center py-8">Hãy chọn một lớp học để quản lý.</div>;
                      
                      const enrolledCount = enrollments.filter(e => e.classId === selectedClassId).length;
                      const enrolledStudents = enrollments.filter(e => e.classId === selectedClassId).map(e => students.find(s => s.id === e.studentId));
                      const teacher = teachers.find(t => t.id === selectedClass.teacherId);
                      
                      // Lấy danh sách học viên chưa tham gia lớp này
                      const availableStudents = students.filter(st => st.status === 'Đang học' && !enrollments.some(e => e.classId === selectedClassId && e.studentId === st.id));

                      return (
                        <>
                          <div className="border-b border-slate-100 pb-3">
                            <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">
                              {selectedClass.id}
                            </span>
                            <h3 className="font-extrabold text-slate-800 text-sm mt-1">{selectedClass.name}</h3>
                            <p className="text-xs text-slate-500 mt-1">Giáo viên: <strong>{teacher ? teacher.name : 'Chưa xếp'}</strong></p>
                            <p className="text-xs text-slate-400 mt-0.5">Thời gian: {selectedClass.startDate} đến {selectedClass.endDate}</p>
                          </div>

                          {/* Thêm nhanh học viên (Chỉ Admin / Staff) */}
                          {hasAccess(['admin', 'staff']) && (
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 space-y-2">
                              <label className="block text-xs font-bold text-slate-600">Thêm học viên vào lớp</label>
                              <div className="flex gap-2">
                                <select 
                                  id="add-student-select"
                                  className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                                >
                                  <option value="">-- Chọn học viên --</option>
                                  {availableStudents.map(s => (
                                    <option key={s.id} value={s.id}>{s.name} ({s.id})</option>
                                  ))}
                                </select>
                                <button
                                  onClick={() => {
                                    const selectEl = document.getElementById('add-student-select');
                                    if (selectEl && selectEl.value) {
                                      handleEnrollStudent(selectEl.value);
                                      selectEl.value = "";
                                    } else {
                                      showToast('Vui lòng chọn học viên!', 'error');
                                    }
                                  }}
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 rounded-lg flex items-center justify-center cursor-pointer"
                                  title="Thêm"
                                >
                                  <UserPlus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Danh sách học viên lớp */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-xs font-bold text-slate-700">Thành viên lớp ({enrolledCount}/{selectedClass.capacity})</h4>
                              <button
                                onClick={() => handleExportCSV(selectedClassId)}
                                className="text-[10px] text-indigo-650 font-bold hover:underline flex items-center cursor-pointer"
                              >
                                <Download className="w-3 h-3 mr-1" /> Xuất danh sách (CSV)
                              </button>
                            </div>

                            <div className="max-h-60 overflow-y-auto space-y-1.5 border border-slate-100 rounded-xl p-2 bg-slate-50/50">
                              {enrolledStudents.length > 0 ? (
                                enrolledStudents.map(st => {
                                  if (!st) return null;
                                  return (
                                    <div key={st.id} className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-150">
                                      <div>
                                        <p className="text-xs font-bold text-slate-800">{st.name}</p>
                                        <p className="text-[10px] font-mono text-slate-500">{st.id} | {st.email}</p>
                                      </div>
                                      {hasAccess(['admin', 'staff']) && (
                                        <button
                                          onClick={() => handleCancelEnrollment(st.id, st.name)}
                                          className="p-1 hover:bg-rose-50 text-rose-500 rounded cursor-pointer"
                                          title="Hủy đăng ký"
                                        >
                                          <X className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  );
                                })
                              ) : (
                                <p className="text-xs text-slate-400 text-center py-4">Chưa có học viên nào đăng ký.</p>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

              </div>
            )}

            {/* ================= TAB: QUẢN LÝ HỌC VIÊN ================= */}
            {activeTab === 'students' && (
              <div className="space-y-5 animate-fade-in">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:max-w-md">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm"
                      placeholder="Tra cứu học viên: Tên, Mã, SĐT, CCCD..."
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                    <select
                      value={studentFilterStatus}
                      onChange={(e) => setStudentFilterStatus(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2"
                    >
                      <option value="All">Tất cả Trạng thái</option>
                      <option value="Đang học">Đang học</option>
                      <option value="Bảo lưu">Bảo lưu</option>
                      <option value="Tốt nghiệp">Tốt nghiệp</option>
                    </select>

                    {hasAccess(['admin', 'staff']) ? (
                      <button
                        onClick={() => handleOpenStudentModal('add')}
                        className="py-2.5 px-4 bg-indigo-650 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl shadow-md flex items-center cursor-pointer"
                      >
                        <Plus className="w-4 h-4 mr-1.5" /> Thêm học viên mới
                      </button>
                    ) : (
                      <span className="text-xs text-rose-500 bg-rose-50 px-3 py-2 rounded-xl border border-rose-100 font-semibold">Chỉ xem</span>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                          <th className="py-4 px-4">Mã HV</th>
                          <th className="py-4 px-4">Họ và Tên</th>
                          <th className="py-4 px-4">Ngày sinh / GT</th>
                          <th className="py-4 px-4">CCCD / Lớp</th>
                          <th className="py-4 px-4">Liên hệ</th>
                          <th className="py-4 px-4 text-center">Trạng thái</th>
                          <th className="py-4 px-4 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-4 font-mono font-bold text-slate-900">{student.id}</td>
                              <td className="py-4 px-4 font-semibold text-slate-850">{student.name}</td>
                              <td className="py-4 px-4">
                                <span className="block text-slate-800">{student.dob}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${student.gender === 'Nam' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}`}>
                                  {student.gender}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <span className="block text-xs font-mono text-slate-500">{student.cccd}</span>
                                <span className="text-xs font-semibold text-indigo-655">{student.class || 'HIC-K15'}</span>
                              </td>
                              <td className="py-4 px-4 text-xs space-y-1">
                                <div className="flex items-center text-slate-600">
                                  <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" /> {student.phone}
                                </div>
                                <div className="flex items-center text-slate-600">
                                  <Mail className="w-3.5 h-3.5 mr-1 text-slate-400" /> {student.email}
                                </div>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                                  student.status === 'Đang học' ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' : 
                                  student.status === 'Bảo lưu' ? 'bg-amber-50 text-amber-700 border border-amber-150' : 
                                  'bg-slate-100 text-slate-600 border border-slate-200'
                                }`}>
                                  {student.status}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex items-center justify-end space-x-1.5">
                                  <button
                                    onClick={() => handleTriggerAiAnalysis(student.id)}
                                    className="px-2 py-1 bg-gradient-to-r from-amber-500 to-indigo-600 text-white rounded text-[10px] font-black flex items-center shadow-sm cursor-pointer"
                                    title="AI Đánh giá học tập"
                                  >
                                    <Sparkles className="w-3 h-3 mr-1 animate-pulse" /> AI Evaluation
                                  </button>
                                  {hasAccess(['admin', 'staff']) ? (
                                    <>
                                      <button onClick={() => handleOpenStudentModal('edit', student)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded cursor-pointer">
                                        <Edit className="w-4 h-4" />
                                      </button>
                                      <button onClick={() => handleDeleteStudent(student.id, student.name)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded cursor-pointer">
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </>
                                  ) : null}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="py-12 text-center text-slate-400">Không tìm thấy học viên nào trùng khớp.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB: HỒ SƠ GIÁO VIÊN ================= */}
            {activeTab === 'teachers' && (
              <div className="space-y-5 animate-fade-in">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:max-w-md">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={teacherSearch}
                      onChange={(e) => setTeacherSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm"
                      placeholder="Tra cứu giáo viên: Tên, Chuyên môn, Email..."
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                    <select
                      value={teacherFilterDept}
                      onChange={(e) => setTeacherFilterDept(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2"
                    >
                      <option value="All">Tất cả Khoa/Phòng</option>
                      {departments.filter(d => d !== 'All').map((dept, idx) => (
                        <option key={idx} value={dept}>{dept}</option>
                      ))}
                    </select>

                    {hasAccess(['admin']) ? (
                      <button
                        onClick={() => handleOpenTeacherModal('add')}
                        className="py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center cursor-pointer"
                      >
                        <Plus className="w-4 h-4 mr-1.5" /> Thêm giảng viên mới
                      </button>
                    ) : (
                      <span className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-xl border border-amber-150 font-semibold">Chỉ Admin quản lý hồ sơ giảng viên</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                      <div key={teacher.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                {teacher.id}
                              </span>
                              <span className="text-xs font-bold text-teal-600 block mt-1">{teacher.degree}</span>
                            </div>

                            <div className="flex items-center space-x-1">
                              {hasAccess(['admin']) ? (
                                <>
                                  <button onClick={() => handleOpenTeacherModal('edit', teacher)} className="p-1.5 text-indigo-600 hover:bg-slate-50 rounded cursor-pointer">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => handleDeleteTeacher(teacher.id, teacher.name)} className="p-1.5 text-rose-600 hover:bg-slate-50 rounded cursor-pointer">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">Chỉ xem</span>
                              )}
                            </div>
                          </div>

                          <h3 className="text-base font-extrabold text-slate-800 mb-1">{teacher.name}</h3>
                          <p className="text-xs font-semibold text-slate-500 mb-4">{teacher.department}</p>

                          <div className="space-y-2 border-t border-slate-100 pt-3 text-sm">
                            <div className="flex items-start">
                              <Briefcase className="w-4 h-4 mr-2.5 text-slate-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="block text-[10px] text-slate-400 font-bold uppercase">Chuyên môn sâu</span>
                                <span className="text-slate-800 font-medium text-xs">{teacher.specialty}</span>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <Mail className="w-4 h-4 mr-2.5 text-slate-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="block text-[10px] text-slate-400 font-bold uppercase">Email công vụ</span>
                                <span className="text-slate-700 font-mono text-xs">{teacher.email}</span>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <Phone className="w-4 h-4 mr-2.5 text-slate-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="block text-[10px] text-slate-400 font-bold uppercase">Điện thoại di động</span>
                                <span className="text-slate-700 text-xs">{teacher.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-1 md:col-span-2 py-12 text-center text-slate-400">Không tìm thấy giáo viên nào.</div>
                  )}
                </div>
              </div>
            )}

            {/* ================= TAB: QUẢN LÝ ĐIỂM SỐ ================= */}
            {activeTab === 'grades_view' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Nếu là HỌC VIÊN: Xem bảng điểm học tập của riêng họ */}
                {currentUser.role === 'student' ? (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-4">
                      <div>
                        <h2 className="text-lg font-bold text-slate-850">Bảng kết quả học tập toàn khóa</h2>
                        <p className="text-xs text-slate-500">Mã học viên: {currentUser.studentId} | Họ tên: {currentUser.name}</p>
                      </div>
                      
                      {/* Thống kê học lực toàn khóa */}
                      {(() => {
                        const { gpa, avgTraining, rating, count } = calculateCumulativeGPA(currentUser.studentId);
                        return (
                          <div className="flex flex-wrap gap-3 items-center">
                            <button
                              onClick={() => handleTriggerAiAnalysis(currentUser.studentId)}
                              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-indigo-650 hover:from-amber-600 hover:to-indigo-750 text-white rounded-xl text-xs font-black flex items-center shadow-sm cursor-pointer animate-pulse"
                            >
                              <Sparkles className="w-4 h-4 mr-2" /> AI Phân tích học tập
                            </button>
                            <div className="text-center px-4 py-1.5 bg-indigo-50 border border-indigo-150 rounded-xl">
                              <span className="block text-[10px] font-bold text-slate-500">GPA TÍCH LŨY</span>
                              <span className="text-base font-extrabold text-indigo-600">{gpa}</span>
                            </div>
                            <div className="text-center px-4 py-1.5 bg-emerald-50 border border-emerald-150 rounded-xl">
                              <span className="block text-[10px] font-bold text-slate-500">XẾP LOẠI CHUNG</span>
                              <span className="text-base font-extrabold text-emerald-600">{rating}</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-200">
                            <th className="py-3 px-4">Lớp học / Môn học</th>
                            <th className="py-3 px-4">Kỳ học</th>
                            <th className="py-3 px-4 text-center">Điểm rèn luyện</th>
                            <th className="py-3 px-4 text-center">Điểm kiểm tra (40%)</th>
                            <th className="py-3 px-4 text-center">Điểm cuối khóa (60%)</th>
                            <th className="py-3 px-4 text-center">Điểm tổng kết</th>
                            <th className="py-3 px-4 text-center">Kết quả</th>
                            <th className="py-3 px-4 text-center">Xếp loại</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {grades.filter(g => g.studentId === currentUser.studentId).map((g, idx) => {
                            const cls = classes.find(c => c.id === g.classId);
                            const { summaryScore, classification, result } = calculateGradeResult(g.testScore, g.finalScore, g.trainingScore);
                            return (
                              <tr key={idx} className="hover:bg-slate-50/50">
                                <td className="py-4 px-4">
                                  <div className="font-bold text-slate-800">{cls ? cls.name : 'N/A'}</div>
                                  <div className="text-[10px] text-slate-400 font-mono">{g.classId}</div>
                                </td>
                                <td className="py-4 px-4 text-xs text-slate-600">{g.term}</td>
                                <td className="py-4 px-4 text-center font-semibold text-slate-700">{g.trainingScore}</td>
                                <td className="py-4 px-4 text-center font-semibold text-slate-700">{g.testScore}</td>
                                <td className="py-4 px-4 text-center font-semibold text-slate-700">{g.finalScore}</td>
                                <td className="py-4 px-4 text-center font-bold text-indigo-650">{summaryScore}</td>
                                <td className="py-4 px-4 text-center">
                                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${result === 'Đạt' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                    {result}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-center font-semibold text-slate-700">{classification}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  /* Nếu người dùng là GIẢNG VIÊN, CÁN BỘ, ADMIN: Xem danh sách và nhập điểm */
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-150 bg-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-850 text-sm">Bảng quản lý điểm lớp học</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Chọn lớp để thực hiện kiểm tra và điều chỉnh điểm số học viên</p>
                      </div>

                      <div className="flex gap-2">
                        <select
                          value={selectedClassId}
                          onChange={(e) => setSelectedClassId(e.target.value)}
                          className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2 focus:outline-none"
                        >
                          {classes.map(c => <option key={c.id} value={c.id}>{c.name} ({c.id})</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 text-xs font-bold border-b border-slate-200 uppercase">
                            <th className="py-3 px-4">Mã / Học viên</th>
                            <th className="py-3 px-4 text-center">Điểm rèn luyện</th>
                            <th className="py-3 px-4 text-center">Điểm kiểm tra (40%)</th>
                            <th className="py-3 px-4 text-center">Điểm cuối khóa (60%)</th>
                            <th className="py-3 px-4 text-center">Điểm tổng kết</th>
                            <th className="py-3 px-4 text-center">Xếp loại học kỳ</th>
                            <th className="py-3 px-4 text-center">Kết quả</th>
                            <th className="py-3 px-4 text-right">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(() => {
                            const enrolledStudentIds = enrollments.filter(e => e.classId === selectedClassId).map(e => e.studentId);
                            const classStudents = students.filter(st => enrolledStudentIds.includes(st.id));
                            
                            if (classStudents.length === 0) {
                              return (
                                <tr>
                                  <td colSpan="8" className="py-8 text-center text-slate-400">Lớp học này chưa có học viên đăng ký tham gia.</td>
                                </tr>
                              );
                            }

                            return classStudents.map(st => {
                              const g = grades.find(grade => grade.studentId === st.id && grade.classId === selectedClassId) || {
                                trainingScore: 80, testScore: 0, finalScore: 0
                              };
                              const { summaryScore, classification, result } = calculateGradeResult(g.testScore, g.finalScore, g.trainingScore);
                              
                              return (
                                <tr key={st.id} className="hover:bg-slate-50/50">
                                  <td className="py-4 px-4">
                                    <div className="font-bold text-slate-800">{st.name}</div>
                                    <div className="text-[10px] text-slate-400 font-mono">{st.id}</div>
                                  </td>
                                  <td className="py-4 px-4 text-center font-bold text-slate-700">{g.trainingScore}</td>
                                  <td className="py-4 px-4 text-center font-medium text-slate-650">{g.testScore}</td>
                                  <td className="py-4 px-4 text-center font-medium text-slate-650">{g.finalScore}</td>
                                  <td className="py-4 px-4 text-center font-extrabold text-indigo-650">{summaryScore}</td>
                                  <td className="py-4 px-4 text-center">
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                      classification === 'Xuất sắc' ? 'bg-purple-100 text-purple-800' :
                                      classification === 'Giỏi' ? 'bg-indigo-100 text-indigo-800' :
                                      classification === 'Khá' ? 'bg-teal-100 text-teal-800' :
                                      classification === 'Trung bình' ? 'bg-amber-100 text-amber-800' :
                                      'bg-rose-100 text-rose-800'
                                    }`}>
                                      {classification}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 text-center">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                      result === 'Đạt' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                                    }`}>
                                      {result}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                      <button
                                        onClick={() => handleTriggerAiAnalysis(st.id)}
                                        className="px-2 py-1 bg-gradient-to-r from-amber-500 to-indigo-600 text-white rounded text-[10px] font-black flex items-center shadow-sm cursor-pointer"
                                        title="Yêu cầu AI đánh giá"
                                      >
                                        <Sparkles className="w-3 h-3 mr-1 animate-pulse" /> AI Eval
                                      </button>
                                      {hasAccess(['admin', 'staff', 'teacher']) ? (
                                        <button
                                          onClick={() => handleOpenGradeModal(st.id, selectedClassId)}
                                          className="py-1 px-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded text-xs font-bold cursor-pointer"
                                        >
                                          Sửa điểm
                                        </button>
                                      ) : null}
                                    </div>
                                  </td>
                                </tr>
                              );
                            });
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ================= TAB: QUẢN LÝ LỊCH HỌC & ĐIỂM DANH ================= */}
            {activeTab === 'attendance_view' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Lựa chọn lớp học */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Điểm danh lớp học & Lịch giảng dạy</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Xác lập thời khóa biểu và theo dõi chuyên cần</p>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={selectedClassId}
                      onChange={(e) => setSelectedClassId(e.target.value)}
                      className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2 focus:outline-none"
                    >
                      {classes.map(c => <option key={c.id} value={c.id}>{c.name} ({c.id})</option>)}
                    </select>

                    {hasAccess(['admin', 'staff', 'teacher']) && (
                      <button
                        onClick={() => {
                          setNewSchedule({ ...newSchedule, classId: selectedClassId });
                          setIsScheduleModalOpen(true);
                        }}
                        className="py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" /> Thêm buổi học
                      </button>
                    )}
                  </div>
                </div>

                {/* Danh sách các buổi học & Giao diện Điểm danh chi tiết */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Cột trái: Thời khóa biểu / Danh sách các buổi học */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                    <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Thời khóa biểu lớp</h4>
                    
                    <div className="space-y-2.5 max-h-96 overflow-y-auto">
                      {schedules.filter(s => s.classId === selectedClassId).length > 0 ? (
                        schedules.filter(s => s.classId === selectedClassId).map((sched, idx) => {
                          const trackedCount = attendance.filter(a => a.scheduleId === sched.id).length;
                          return (
                            <div 
                              key={sched.id} 
                              onClick={() => setSelectedScheduleId(sched.id)}
                              className={`p-3 border rounded-xl space-y-1.5 transition-all cursor-pointer ${
                                selectedScheduleId === sched.id ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-150 hover:border-indigo-400 bg-slate-50/50'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                  Buổi {idx + 1}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" /> {sched.date}
                                </span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-800">{sched.topic}</h5>
                              
                              <div className="flex justify-between items-center pt-2 border-t border-slate-100 mt-1 text-[10px] text-slate-400">
                                <span>
                                  Đã điểm danh: {trackedCount > 0 ? `${trackedCount} học viên` : 'Chưa điểm danh'}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-xs text-slate-400 text-center py-8">Lớp học chưa được tạo lịch học nào.</p>
                      )}
                    </div>
                  </div>

                  {/* Cột phải: Form thực hiện Điểm danh hoặc xem kết quả điểm danh lớp */}
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                    {(() => {
                      const selectedSched = schedules.find(s => s.id === selectedScheduleId);
                      if (!selectedSched) return <div className="text-slate-400 text-center py-12">Chưa chọn lịch học nào hoặc chưa có buổi học được tạo.</div>;

                      const enrolledStudentIds = enrollments.filter(e => e.classId === selectedClassId).map(e => e.studentId);
                      const classStudents = students.filter(st => enrolledStudentIds.includes(st.id));

                      // Trạng thái điểm danh hiện tại trong database
                      const currentSchedAttendance = attendance.filter(a => a.scheduleId === selectedScheduleId);

                      return (
                        <>
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
                                Buổi học được chọn điểm danh
                              </span>
                              <h4 className="font-extrabold text-slate-800 text-sm mt-1">{selectedSched.topic}</h4>
                              <p className="text-xs text-slate-400 mt-1">Ngày học: {selectedSched.date}</p>
                            </div>
                          </div>

                          {/* Bảng điểm danh thực tế */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs font-bold text-slate-650 bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                              <span>Học viên lớp ({classStudents.length})</span>
                              <span>Trạng thái chuyên cần</span>
                            </div>

                            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                              {classStudents.map(st => {
                                const attendanceRecord = currentSchedAttendance.find(a => a.studentId === st.id);
                                const currentStatus = attendanceRecord ? attendanceRecord.status : 'Present';

                                return (
                                  <div key={st.id} className="flex justify-between items-center p-2.5 bg-white border border-slate-150 rounded-xl hover:bg-slate-50/30">
                                    <div>
                                      <p className="text-xs font-bold text-slate-800">{st.name}</p>
                                      <p className="text-[9px] font-mono text-slate-500">{st.id}</p>
                                    </div>

                                    {/* Chọn trạng thái nhanh */}
                                    <div className="flex gap-1.5">
                                      {[
                                        { key: 'Present', label: 'Có mặt', color: 'peer-checked:bg-emerald-500 peer-checked:text-white border-emerald-500 text-emerald-700' },
                                        { key: 'Excused', label: 'Có phép', color: 'peer-checked:bg-amber-500 peer-checked:text-white border-amber-500 text-amber-700' },
                                        { key: 'Absent', label: 'Vắng', color: 'peer-checked:bg-rose-500 peer-checked:text-white border-rose-500 text-rose-700' }
                                      ].map(opt => (
                                        <label key={opt.key} className="cursor-pointer text-[10px] font-bold">
                                          <input
                                            type="radio"
                                            name={`attendance-${st.id}-${selectedScheduleId}`}
                                            value={opt.key}
                                            checked={currentStatus === opt.key}
                                            disabled={!hasAccess(['admin', 'staff', 'teacher'])}
                                            onChange={(e) => {
                                              // Cập nhật điểm danh tức thì trong state
                                              const updatedAttendance = attendance.filter(a => !(a.scheduleId === selectedScheduleId && a.studentId === st.id));
                                              setAttendance([...updatedAttendance, {
                                                scheduleId: selectedScheduleId,
                                                studentId: st.id,
                                                status: e.target.value
                                              }]);
                                              showToast(`Đã ghi nhận điểm danh: ${st.name}`, 'info');
                                            }}
                                            className="sr-only peer"
                                          />
                                          <span className={`px-2 py-1 border rounded-lg transition-all ${opt.color} hover:bg-slate-50 block`}>
                                            {opt.label}
                                          </span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Thống kê tỷ lệ chuyên cần của cả lớp trong buổi này */}
                          <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-slate-100 text-center">
                            <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl">
                              <span className="block text-[9px] font-bold">CÓ MẶT</span>
                              <span className="text-base font-bold">
                                {currentSchedAttendance.filter(a => a.status === 'Present').length}
                              </span>
                            </div>
                            <div className="p-2 bg-amber-50 text-amber-800 rounded-xl">
                              <span className="block text-[9px] font-bold">CÓ PHÉP</span>
                              <span className="text-base font-bold">
                                {currentSchedAttendance.filter(a => a.status === 'Excused').length}
                              </span>
                            </div>
                            <div className="p-2 bg-rose-50 text-rose-800 rounded-xl">
                              <span className="block text-[9px] font-bold">VẮNG MẶT</span>
                              <span className="text-base font-bold">
                                {currentSchedAttendance.filter(a => a.status === 'Absent').length}
                              </span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

              </div>
            )}

          </main>
        </div>
      )}

      {/* ================= MODALS & DIALOGS ================= */}
      
      {/* 0. Modal Phân tích Học tập bằng AI (Gemini Response) */}
      {aiAnalysisModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-150 animate-fade-in max-h-[85vh] flex flex-col">
            <div className="bg-gradient-to-r from-indigo-700 via-violet-800 to-indigo-900 text-white p-5 flex justify-between items-center shrink-0">
              <h3 className="font-extrabold text-base flex items-center">
                <Sparkles className="w-5 h-5 mr-2.5 text-amber-400 animate-pulse" />
                HIC Academic AI • Đánh giá kết quả học tập chuyên sâu
              </h3>
              <button onClick={() => { setAiAnalysisModalOpen(false); setAiAnalysisContent(''); }} className="text-slate-300 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {isAiAnalysisLoading ? (
                <div className="py-16 flex flex-col items-center justify-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-250 border-t-indigo-600 rounded-full animate-spin"></div>
                    <Sparkles className="w-6 h-6 text-amber-500 absolute top-5 left-5 animate-pulse" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-800 text-sm">Đang nạp dữ liệu điểm rèn luyện & chuyên cần học tập...</p>
                    <p className="text-xs text-slate-400 mt-1">Trí tuệ nhân tạo Gemini đang tổng hợp báo cáo và thiết lập lộ trình học vụ riêng cho bạn.</p>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none text-slate-700 space-y-4">
                  <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200/50 text-xs text-amber-850 flex items-start mb-2">
                    <Bot className="w-5 h-5 mr-3 text-amber-500 shrink-0" />
                    <p><strong>Lưu ý từ AI Advisor:</strong> Báo cáo này được tự động phát sinh tức thời dựa trên kho dữ liệu điểm số, tỷ lệ lên lớp của bạn tại hệ thống Cao đẳng HIC. Khuyên dùng bạn thảo luận thêm với giáo viên chủ nhiệm.</p>
                  </div>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {aiAnalysisContent}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
              <button
                onClick={() => { setAiAnalysisModalOpen(false); setAiAnalysisContent(''); }}
                className="py-2 px-5 bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-150 cursor-pointer"
              >
                Đồng ý, Đóng báo cáo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Đổi mật khẩu Modal */}
      {isChangePassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 animate-fade-in">
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base flex items-center">
                <Lock className="w-4 h-4 mr-2" /> Đổi mật khẩu tài khoản
              </h3>
              <button onClick={() => { setIsChangePassModalOpen(false); setChangePassError(''); }} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="p-6 space-y-4">
              {changePassError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                  <span>{changePassError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  required
                  value={changePassForm.oldPassword}
                  onChange={(e) => setChangePassForm({ ...changePassForm, oldPassword: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                  placeholder="Nhập mật khẩu cũ"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Mật khẩu mới</label>
                <input
                  type="password"
                  required
                  value={changePassForm.newPassword}
                  onChange={(e) => setChangePassForm({ ...changePassForm, newPassword: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                  placeholder="Từ 3 kí tự trở lên"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  required
                  value={changePassForm.confirmPassword}
                  onChange={(e) => setChangePassForm({ ...changePassForm, confirmPassword: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>

              <div className="flex space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsChangePassModalOpen(false); setChangePassError(''); }}
                  className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Hủy thao tác
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Cập nhật mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Thêm / Sửa học viên Modal */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-indigo-950 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-indigo-400" />
                {studentFormMode === 'add' ? 'Thêm mới Hồ sơ Học viên HIC' : 'Cập nhật Hồ sơ Học viên'}
              </h3>
              <button onClick={() => setIsStudentModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Mã học viên *</label>
                  <input
                    type="text"
                    required
                    disabled={studentFormMode === 'edit'}
                    value={currentStudentData.id}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, id: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-mono font-bold disabled:bg-slate-50"
                    placeholder="HV001"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={currentStudentData.name}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, name: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Ngày sinh *</label>
                  <input
                    type="date"
                    required
                    value={currentStudentData.dob}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, dob: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Giới tính *</label>
                  <select
                    value={currentStudentData.gender}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, gender: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Số CCCD (12 số) *</label>
                  <input
                    type="text"
                    required
                    maxLength={12}
                    value={currentStudentData.cccd}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, cccd: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-mono"
                    placeholder="012345678912"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={currentStudentData.phone}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                    placeholder="Nhập SĐT liên lạc"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Địa chỉ Email *</label>
                  <input
                    type="email"
                    required
                    value={currentStudentData.email}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, email: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                    placeholder="email@hic.edu.vn"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Lớp hành chính *</label>
                  <input
                    type="text"
                    required
                    value={currentStudentData.class}
                    onChange={(e) => setCurrentStudentData({ ...currentStudentData, class: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                    placeholder="Ví dụ: CNTT-K15"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Trạng thái học tập *</label>
                  <div className="flex gap-4 p-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                    {['Đang học', 'Bảo lưu', 'Tốt nghiệp'].map(statusOpt => (
                      <label key={statusOpt} className="flex-1 flex items-center justify-center py-2 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="studentStatus"
                          value={statusOpt}
                          checked={currentStudentData.status === statusOpt}
                          onChange={(e) => setCurrentStudentData({ ...currentStudentData, status: e.target.value })}
                          className="mr-2 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="font-semibold text-slate-700">{statusOpt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsStudentModalOpen(false)}
                  className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-indigo-650 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Lưu thông tin học viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Thêm / Sửa lớp học Modal */}
      {isClassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 animate-fade-in">
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-400" />
                {classFormMode === 'add' ? 'Mở lớp giảng dạy mới tại HIC' : 'Cấu hình thông tin lớp học'}
              </h3>
              <button onClick={() => setIsClassModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClass} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Mã lớp học *</label>
                  <input
                    type="text"
                    required
                    disabled={classFormMode === 'edit'}
                    value={currentClassData.id}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, id: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-mono font-bold disabled:bg-slate-50"
                    placeholder="LH001"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Tên lớp học *</label>
                  <input
                    type="text"
                    required
                    value={currentClassData.name}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, name: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                    placeholder="Kỹ thuật lập trình React"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Ngành / Khóa học *</label>
                  <select
                    value={currentClassData.courseId}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, courseId: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Học kỳ mở lớp *</label>
                  <select
                    value={currentClassData.term}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, term: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Kỳ I - 2026">Kỳ I - 2026</option>
                    <option value="Kỳ II - 2026">Kỳ II - 2026</option>
                    <option value="Kỳ III - 2026">Kỳ III - 2026</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Giáo viên phụ trách *</label>
                  <select
                    value={currentClassData.teacherId}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, teacherId: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    {teachers.map(t => <option key={t.id} value={t.id}>{t.name} ({t.degree})</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Sĩ số giới hạn mở lớp *</label>
                  <input
                    type="number"
                    required
                    min={5}
                    max={100}
                    value={currentClassData.capacity}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, capacity: parseInt(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Ngày bắt đầu *</label>
                  <input
                    type="date"
                    required
                    value={currentClassData.startDate}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, startDate: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Ngày kết thúc *</label>
                  <input
                    type="date"
                    required
                    value={currentClassData.endDate}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, endDate: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Địa điểm tổ chức học tập *</label>
                  <input
                    type="text"
                    required
                    value={currentClassData.location}
                    onChange={(e) => setCurrentClassData({ ...currentClassData, location: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                    placeholder="Ví dụ: Phòng máy thực hành 403 - Tòa nhà HIC"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsClassModalOpen(false)}
                  className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-indigo-655 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Mở lớp học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Nhập điểm và rèn luyện cho Học viên Modal */}
      {isGradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 animate-fade-in">
            <div className="bg-indigo-950 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Cập nhật điểm thi & rèn luyện
              </h3>
              <button onClick={() => setIsGradeModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="p-6 space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150 text-xs space-y-1">
                <p className="font-bold text-slate-705">Thông tin học tập học viên</p>
                <p>Mã học viên: <strong className="font-mono text-slate-800">{currentGradeForm.studentId}</strong></p>
                <p>Lớp học phần: <strong className="font-mono text-slate-800">{currentGradeForm.classId}</strong></p>
                <p>Kỳ học ghi nhận: <strong className="text-indigo-600">{currentGradeForm.term}</strong></p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-650 uppercase mb-1.5">Điểm rèn luyện học kỳ (0 - 100) *</label>
                <input
                  type="number"
                  required
                  min={0}
                  max={100}
                  value={currentGradeForm.trainingScore}
                  onChange={(e) => setCurrentGradeForm({ ...currentGradeForm, trainingScore: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-655 uppercase mb-1.5">Điểm thi kiểm tra giữa kỳ (Hệ 10) *</label>
                <input
                  type="number"
                  required
                  step="0.1"
                  min={0}
                  max={10}
                  value={currentGradeForm.testScore}
                  onChange={(e) => setCurrentGradeForm({ ...currentGradeForm, testScore: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-655 uppercase mb-1.5">Điểm thi cuối khóa học phần (Hệ 10) *</label>
                <input
                  type="number"
                  required
                  step="0.1"
                  min={0}
                  max={10}
                  value={currentGradeForm.finalScore}
                  onChange={(e) => setCurrentGradeForm({ ...currentGradeForm, finalScore: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-semibold"
                />
              </div>

              <div className="flex space-x-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsGradeModalOpen(false)}
                  className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-indigo-650 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Ghi nhận điểm thi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Thêm Lịch học / Buổi học mới Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 animate-fade-in">
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Thêm buổi học mới vào lớp
              </h3>
              <button onClick={() => setIsScheduleModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSchedule} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-650 uppercase mb-1.5">Lớp học phần liên kết</label>
                <input
                  type="text"
                  disabled
                  value={classes.find(c => c.id === selectedClassId)?.name || ''}
                  className="w-full px-3.5 py-2 border border-slate-150 rounded-xl text-sm bg-slate-50 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-655 uppercase mb-1.5">Ngày tổ chức buổi học *</label>
                <input
                  type="date"
                  required
                  value={newSchedule.date}
                  onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-655 uppercase mb-1.5">Nội dung chi tiết / Chủ đề học tập *</label>
                <textarea
                  required
                  rows={3}
                  value={newSchedule.topic}
                  onChange={(e) => setNewSchedule({ ...newSchedule, topic: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                  placeholder="Ví dụ: Giới thiệu Hooks, State Management nâng cao..."
                />
              </div>

              <div className="flex space-x-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Hủy thao tác
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Xác nhận thêm lịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Thêm / Sửa giáo viên Modal */}
      {isTeacherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-teal-950 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base flex items-center">
                <UserCheck className="w-5 h-5 mr-2" />
                {teacherFormMode === 'add' ? 'Thêm mới Giáo viên HIC' : 'Cập nhật hồ sơ Giáo viên'}
              </h3>
              <button onClick={() => setIsTeacherModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacher} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Mã giảng viên *</label>
                  <input
                    type="text"
                    required
                    disabled={teacherFormMode === 'edit'}
                    value={currentTeacherData.id}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, id: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-mono font-bold disabled:bg-slate-50"
                    placeholder="GV001"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Họ và tên giảng viên *</label>
                  <input
                    type="text"
                    required
                    value={currentTeacherData.name}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, name: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                    placeholder="ThS. Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase mb-1">Học vị / Học hàm *</label>
                  <select
                    value={currentTeacherData.degree}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, degree: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Thạc sĩ">Thạc sĩ</option>
                    <option value="Tiến sĩ">Tiến sĩ</option>
                    <option value="Phó Giáo sư, Tiến sĩ">Phó Giáo sư, Tiến sĩ</option>
                    <option value="Giáo sư, Tiến sĩ">Giáo sư, Tiến sĩ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Khoa / Đơn vị quản lý *</label>
                  <select
                    value={currentTeacherData.department}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, department: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Khoa Công nghệ thông tin">Khoa Công nghệ thông tin</option>
                    <option value="Khoa An toàn thông tin">Khoa An toàn thông tin</option>
                    <option value="Khoa Công nghệ phần mềm">Khoa Công nghệ phần mềm</option>
                    <option value="Khoa Khoa học máy tính">Khoa Khoa học máy tính</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Số điện thoại di động *</label>
                  <input
                    type="tel"
                    required
                    value={currentTeacherData.phone}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-semibold"
                    placeholder="0912xxxxxx"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Địa chỉ Email liên hệ *</label>
                  <input
                    type="email"
                    required
                    value={currentTeacherData.email}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, email: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-mono"
                    placeholder="teacher@hic.edu.vn"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-650 uppercase mb-1">Hướng chuyên môn sâu *</label>
                  <input
                    type="text"
                    required
                    value={currentTeacherData.specialty}
                    onChange={(e) => setCurrentTeacherData({ ...currentTeacherData, specialty: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
                    placeholder="Thị giác máy tính, Bảo mật phần mềm ứng dụng, v.v."
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTeacherModalOpen(false)}
                  className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Lưu hồ sơ giảng viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Hàm bổ trợ hiển thị role label
const getRoleLabel = (role) => {
  switch (role) {
    case 'admin': return { text: 'Quản trị viên', color: 'bg-red-100 text-red-800 border-red-200' };
    case 'staff': return { text: 'Cán bộ đào tạo', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    case 'teacher': return { text: 'Giảng viên', color: 'bg-green-100 text-green-800 border-green-200' };
    case 'student': return { text: 'Học viên HIC', color: 'bg-purple-100 text-purple-800 border-purple-200' };
    default: return { text: 'Học viên', color: 'bg-gray-100 text-gray-800 border-gray-200' };
  }
};