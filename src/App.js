import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; 
import Header from "./components/Header";
import Courses from "./components/Courses";
import CoursesDetails from "./components/CoursesDetails";
import DashBoard from "./components/DashBoard";

const App = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://alemeno-courses-default-rtdb.asia-southeast1.firebasedatabase.app/courses.json/"
        );

        const responseData = response.data;
        const loadedCourses = [];

        for (const key in responseData) {
          const studentsData = responseData[key].students;
          const studentsArray = [];
          for (const studentKey in studentsData) {
            studentsArray.push({
              name: studentsData[studentKey].name,
              email: studentsData[studentKey].email,
            });
          }

          const syllabusData = responseData[key].syllabus;
          const syllabusArray = [];
          for (const syllabusKey in syllabusData) {
            syllabusArray.push({
              week: syllabusData[syllabusKey].week,
              topic: syllabusData[syllabusKey].topic,
              content: syllabusData[syllabusKey].content,
            });
          }

          loadedCourses.push({
            id: key,
            name: responseData[key].name,
            instructor: responseData[key].instructor,
            description: responseData[key].description,
            prerequisites: responseData[key].prerequisites,
            schedule: responseData[key].schedule,
            duration: responseData[key].duration,
            enrollmentStatus: responseData[key].enrollmentStatus,
            location: responseData[key].location,
            thumbnail: responseData[key].thumbnail,
            students: studentsArray,
            syllabus: syllabusArray,
          });
        }

        setCourses(loadedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Courses courses={courses} />} />
        
        <Route
          path="/course/:id"
          element={<CoursesDetails courses={courses} />}
        />
        <Route path="/dashboard" element={<DashBoard/>} />
      </Routes>
      
    </BrowserRouter>
  );
};

export default App;
