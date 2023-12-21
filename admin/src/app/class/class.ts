export class Person {
    id: string;
    firstname?: string;
    lastname?: string;
    birthday?: Date;
    cccd?: string;
    image?: string;
    importfile?: File;
    address?: string;
    phonenumber?: string;
    email?: string;
    sex?: string;
  }
  export class Account {
    id: string;
    personId?: string;
    username?: string;
    password?: string;
    role?: string;
    status?: number;
    online?: boolean;
    person?:Person;
  }
  export class Course {
    id: string;
    name?: string;
    price?: number;
    teacherSalaryPerLesson?: number;
    detail?: string;
    duration?: number;
    numberOfLesson?: number;
    numberOfLessonPerWeek?: number;
    maxNumberStudents?: number;
    courseFor?: string;
    certificateScore?: number;
    image?: string;
    importFile?: File;
    allowedTeachingCourse?: string;
  }
  export class Lesson {
    id: string;
    name?: string;
    importFile?: File;
    slideUrl?: string;
    courseId?: string;
  }
  export class Classes {
    id: string;
    name?: string;
    duration?: number;
    startDate?: Date;
    endDate?: Date;
    status?: number;
    teacherId?: string;
  }
  export class Purchase {
    id: string;
    courseId?: string;
    userId?: string;
    purchaseDate?: Date;
    status?: number;
  }
  export class ActivedLesson {
    id: string;
    classId?: string;
    lessonId?: string;
    startDate?: Date;
    status?: number;
    recordedClassVideo?: string;
  }
  export class TeacherSalary {
    id: string;
    activedLessonId?: string;
    totalGained?: number;
    status?: number;
  }
  export class TeacherAllowedTeachingCourse {
    id: string;
    CourseId?: string;
    userId?: string;
  }
  export class Attendant {
    id: string;
    userId?: string;
    classId?: string;
    totalCcore?: number;
  }
  export class CheckedAttendent {
    id: string;
    attendantId?: string;
    activedLessonId?: string;
  }
  export class Freetimetable {
    id: string;
    userId?: string;
    dayInWeek?: number;
    daytime?: Date;
    status?: number;
  }
  export class PopQuiz {
    id: string;
    question?: string;
    answer1?: string;
    answer2?: string;
    answer3?: string;
    answer4?: string;
    correctanswer?: string;
    score?: number;
    lessonId?: string;
  }
  export class Assignment {
    id: string;
    question?: string;
    answer?: string;
    comment?: string;
    score?: number;
    lessonId?: string;
  }
  export class Certificate {
    id: string;
    userId?: string;
    courseId?: string;
    image?: string;
    issueDate?: Date;
  }
  export class Room {
    id: string;
    name?: string;
    createDate?: Date;
    status?: number;
  }
  export class ActivedPopQuiz {
    id: string;
    popquizId?: string;
    userId?: string;
    activedLessonId?: string;
    doneDate?: Date;
    score?: number;
    answer?: string;
  }
  export class ActivedAssignment {
    id: string;
    assignmentId?: string;
    userId?: string;
    activedLessonId?: string;
    doneDate?: Date;
    score?: number;
    answer?: string;
    assignmentFile?: string;
  }
  export class RoomAttendant {
    roomId?: string;
    userId?: string;
  }
  export class Chat {
    id: string;
    roomId?: string;
    mesOrder?: string;
    userId?: string;
    username?: string;
    createdDate?: Date;
    content?: string;
    messageType?: string;
  }
export class SignInRequest{
    username: string;
    password:string;
}                 
export interface pagination{
    pageSize: number;
    currentPage: number;
   
}
export interface SearchTemp{
    username?:string;
    lastname?:string;
    phonenumber?:string;
    name?:string;
    id?:string;
}