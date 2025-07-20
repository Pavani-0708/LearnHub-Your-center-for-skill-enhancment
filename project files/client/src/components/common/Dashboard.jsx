import React, { useState } from 'react';
import NavBar from './NavBar';
import UserHome from "./UserHome";
import { Container } from 'react-bootstrap';
import AddCourse from '../user/teacher/AddCourse';
import StudentHome from '../user/student/StudentHome';
import AdminHome from '../admin/AdminHome';
import EnrolledCourses from '../user/student/EnrolledCourses';
import CourseContent from '../user/student/CourseContent';
import AllCourses from '../admin/AllCourses';

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'home':
        return <UserHome />;
      case 'addcourse':
        return <AddCourse />;
      case 'enrolledcourse':
        return <EnrolledCourses />;
      case 'courseSection':
        return <CourseContent />;
      case 'courses':
        return <AllCourses />;
      default:
        return <UserHome />;
    }
  };

  return (
    <>
      <div className="dashboard-bg">
        <NavBar setSelectedComponent={setSelectedComponent} />
        <Container className='dashboard-box my-4'>
          {renderSelectedComponent()}
        </Container>
      </div>

      <style jsx>{`
        .dashboard-bg {
          background: linear-gradient(to right, #e0eafc, #cfdef3);
          min-height: 100vh;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .dashboard-box {
          background-color: #ffffff;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        h1, h2, h3 {
          color: #333;
        }

        .btn, button {
          background: linear-gradient(90deg, #36d1dc, #5b86e5);
          color: white !important;
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          transition: 0.3s ease-in-out;
          font-weight: 500;
        }

        .btn:hover, button:hover {
          background: linear-gradient(90deg, #ffafbd, #ffc3a0);
          color: black !important;
        }
      `}</style>
    </>
  );
};

export default Dashboard;