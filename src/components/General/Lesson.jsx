import React from 'react';
import styles from './Lesson.module.sass';
import Paper from "@material-ui/core/Paper";
import TimetableService from "../../services/TimetableService";


const Lesson = ({ lesson, user }) => {
    const getLessonTypeClass = (type) => {
        switch (type) {
            case 0:
                return styles.lessonTypeLk
            case 1:
                return styles.lessonTypeLb
            case 2:
                return styles.lessonTypePz
            default:
                break;
        }
    }

    return (
        <Paper elevation={3} className={styles.lesson}>
            <div className={styles.lessonMainInfoHeader}>
                <h6>{lesson.subject.name}</h6>
            </div>
            <div className={styles.lessonMainInfoBody}>
                <div className={styles.lessonMainInfo}>
                    <p>{`${lesson.teacher.secondName} ${lesson.teacher.firstName[0]}. ${lesson.teacher.thirdName[0]}.`}</p>
                    <p>{TimetableService.getFullClassTime(lesson.classTime)}</p>
                </div>
                <div className={styles.lessonBricks}>
                    <div className={`${styles.lessonType} ${getLessonTypeClass(lesson.type)}`}>{TimetableService.getFullLessonType(lesson.type)}</div>
                    <div className={styles.lessonClassroom}>{lesson.classroomNumber}-{lesson.hall}</div>
                    {!user.role && lesson.additional && <div className={styles.lessonAdd}>Доп</div>}
                    <div className={styles.lessonGroup}>
                        {user.role ? (
                            lesson.group.map((group, index) => {
                                return (
                                    <div key={index} >
                                        {group}
                                    </div>
                                );
                            })) : (
                                <></>
                            )}
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default Lesson;