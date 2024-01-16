import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Courses.css";

const Courses = ({courses}) => {
  const [search , setSearch] = useState("");

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

 const searchResults = courses.filter((course) => {
   const courseFilteredByCourseName = course.name.toLowerCase().includes(search.trim().toLowerCase());
   const coursesFilteredByInstructorName = course.instructor
   .toLowerCase()
   .includes(search.trim().toLowerCase());

   return courseFilteredByCourseName || coursesFilteredByInstructorName ;
 });
  return (
    <div className='container'>
      <h1>Course List</h1>
     <div className='wrapper'>
        <div className='search-bar'>
            <input type='text' onChange={searchHandler} placeholder='search...'/>
        </div>
        {searchResults.map((course) => (
          <div key={course.id}>
            <Link to={`/course/${course.id}`} className='course-item'>
              <div className="course-heading">
                <h3>{course.name}</h3>
                <span>{course.instructor}</span>
              </div>
              <span className='description'>{course.description}</span>
            </Link>
          </div>
        ))}
        {!searchResults.length && (
          <div className='no-result'>
            <span>No result found!</span>
          </div>
        )}
     </div>
    </div>
  )
}

export default Courses;