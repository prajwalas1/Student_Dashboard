import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch , useSelector} from "react-redux";
import { useState } from 'react';
import "../styles/DashBoard.css";

const DashBoard = () => {
    const dispatch = useDispatch();
    const [Clicked , setClicked] = useState({});
    const enrolledCourses = useSelector((state) => state.enrolledCourses);

    const removeCourseHandler = (courseId) => {
        dispatch({type: "ENROLL_OUT" , payload: courseId});
    };

    
  const courseCompletedHandler = (courseId) => {
    dispatch({ type: "MARK_COMPLETED", payload: courseId });
    setClicked((prevStatus) => ({
      ...prevStatus,
      [courseId]: true,
    }));
  };
  return (
    <div className='wrapper'>
        <div className='page-title'>
            <h2>Dashboard</h2>
            <Link to = {"/"} className="close-button">
                &#x274C; 
            </Link>
        </div>
        <section className='wrapper'>
            {
            enrolledCourses.length > 0 ? (
                <section>
                    <span className='sub-heading'>Enrolled Courses :</span>
                    <div>
                        {enrolledCourses.map((course,index) => (
                            <div key={index} className='courses-list'>
                                <div className="courses">
                                    <div className="courses-detail">
                                        <h4>{course.name}</h4>
                                        <h4>{course.instructor}</h4>
                                    </div>
                                    <span onClick={() => removeCourseHandler(course)} className='coursor-pointer'>
                                       &#x274C;
                                    </span>
                                    <div className="sub-container">
                                        <div className="date-progress-container">
                                            <h4>Due Date : 18 Jan 2024</h4>
                                            <progress id='progress' value={Clicked[course.id] ? "100" : "0"}
                                            max="100"></progress>
                                        </div>
                                        <img 
                                          src={course.thumbnail}
                                          alt='course.name'
                                          className='thumbnail'
                                          />
                                    </div>
                                    {!Clicked[course.id] && (
                                        <button className='enroll-button'
                                         onClick={() => courseCompletedHandler(course.id)}>
                                           Mark as Complete
                                        </button>
                                    )}
                                    {
                                        Clicked[course.id] && (
                                            <h3 className='completed'>Completed!!</h3>
                                        )
                                    }
                                </div>
                            </div>
                        ))}

                    </div>
                    </section>
            ) : (
                <p>No enrolled courses yet .</p>
            )
                        }
                        
 
        </section>
    </div>
  )
}

export default DashBoard;