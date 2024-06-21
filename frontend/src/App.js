import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import About from './components/About';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Header from './components/Header';
import Mission from './components/Mission';
import Support from './components/Support';
import CampaignForm from './components/CampaignForm';
import EducationProjects from './components/EducationProjects';
import Login from './components/Login';
import Signup from './components/Signup';
import Donate from './components/Donate';
import Admin from './components/Admin';
import MyCampaigns from './components/MyCampaigns';
import { AuthProvider } from "./components/AuthContext";
import ResetPassword from './components/resetpassword';
import SideNav from './components/SideNav';
import Dashboard from './components/Dashboard';
import TopNav from './components/TopNav';
import './global.css';
import MyProfile from './components/MyProfile';
import EditProfileModal from './components/EditProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
});

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainLayout><Banner /></MainLayout>} />
            <Route path="/about" element={<MainLayout><About /></MainLayout>} />
            <Route path="/mission" element={<MainLayout><Mission /></MainLayout>} />
            <Route path="/support" element={<MainLayout><Support /></MainLayout>} />
            <Route path="/campaign" element={<ProtectedRoute><MainLayout><CampaignForm /></MainLayout></ProtectedRoute>} />
            <Route path="/education-projects" element={<MainLayout><EducationProjects /></MainLayout>} />
            <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
            <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
            <Route path="/resetp" element={<MainLayout><ResetPassword /></MainLayout>} />
            <Route path="/donate" element={<MainLayout><Donate /></MainLayout>} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout><Admin /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
            <Route path="/my-campaigns" element={<ProtectedRoute><MainLayout><MyCampaigns /></MainLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><MainLayout><MyProfile /></MainLayout></ProtectedRoute>} />
            <Route path="/edit-profile" element={<ProtectedRoute><MainLayout><EditProfileModal /></MainLayout></ProtectedRoute>} />
          </Routes>
          <ToastContainer /> {/* Render ToastContainer once */}
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

const MainLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

const AdminLayout = ({ children }) => (
  <Container fluid className="min-vh-100 d-flex flex-column">
    <Row className="flex-fill">
      <Col md={2} className="p-4">
        <SideNav />
      </Col>
      <Col md={10} className="p-4">
        <TopNav />
        <div style={{ marginTop: '20px' }}>{children}</div>
      </Col>
    </Row>
  </Container>
);

export default App;