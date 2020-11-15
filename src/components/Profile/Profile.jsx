import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import userIsAuthenticatedRedirect from "../wrappers/userIsAuthenticatedRedirect";
import AuthService from "../../services/AuthService";

import { getAdditionals } from "../../actions";

import StudentProfile from "./StudentProfile";
import TeacherProfile from "./TeacherProfile";
import { withRouter } from "react-router";

function Profile() {
  const [studnumber, setStudnumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [role, setRole] = useState("");
  const [course, setCourse] = useState("");
  const [group, setGroup] = useState("");
  const [groupPart, setGroupPart] = useState("");
  const [department, setDepartment] = useState("");
  const [rank, setRank] = useState("");
  const [additionals, setAdditional] = useState([]);
  const [subjects, setSubject] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [teacherInfo, setTeacherInfo] = useState({})
  const [image, setImage] = useState('')

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = AuthService.getToken();
        const user = AuthService.getUser();

        const res = await axios.get("http://localhost:3333/api/user", {
          headers: {
            Authorization: token,
          },
        });

        const subjectList = await axios.get(
          "http://localhost:3333/api/subject", {}
        );
        setSubjectList(subjectList.data)

        switch (res.data.userId.role) {
          case 0:
            setStudentId(res.data._id)
            setStudnumber(user.studnumber);
            setRole(user.role);
            setFirstName(user.firstName);
            setSecondName(user.secondName);
            setThirdName(user.thirdName);
            setCourse(res.data.course);
            setGroup(res.data.group);
            setGroupPart(res.data.groupPart);
            break;
          case 1:
            setStudentId(res.data.id)
            setStudnumber(user.studnumber);
            setRole(user.role);
            setFirstName(user.firstName);
            setSecondName(user.secondName);
            setThirdName(user.thirdName);
            setDepartment(res.data.department);
            setRank(res.data.rank);
            setAdditional(res.data.additionals);
            setSubject(res.data.subjects);
            setTeacherInfo(user.userId);
            dispatch(getAdditionals(res.data.additionals));
            setImage(res.data.image);
            break;
          case 2:
            setStudentId(res.data.id)
            setStudnumber(user.studnumber);
            setRole(user.role);
            setFirstName(user.firstName);
            setSecondName(user.secondName);
            setThirdName(user.thirdName);
            setDepartment(res.data.department);
            setRank(res.data.rank);
            setAdditional(res.data.additionals);
            setSubject(res.data.subjects);
            setTeacherInfo(user.userId);
            setImage(res.data.image);
            dispatch(getAdditionals(res.data.additionals));
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [dispatch]);



  return (
    <div>
      {role ? (
        <TeacherProfile
          studentId={studentId}
          studnumber={studnumber}
          role={role}
          firstName={firstName}
          secondName={secondName}
          thirdName={thirdName}
          department={department}
          rank={rank}
          additionals={additionals}
          subjects={subjects}
          subjectList={subjectList}
          teacherInfo={teacherInfo}
          image={image}
        />
      ) : (
          <StudentProfile
            studentId={studentId}
            studnumber={studnumber}
            role={role}
            firstName={firstName}
            secondName={secondName}
            thirdName={thirdName}
            course={course}
            group={group}
            groupPart={groupPart}

          />
        )}
    </div>
  );
}

export default userIsAuthenticatedRedirect(withRouter(Profile));
