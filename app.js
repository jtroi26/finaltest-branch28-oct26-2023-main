var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

//routes instantiation
//login routes
var adminLoginRouter = require('./routes/admin-login');
var teacherLoginRouter = require('./routes/teacher-login');
var studentLoginRouter = require('./routes/student-login');

// logout routes
var logoutRouter = require('./routes/logout');

// dashboard routes
var adminDashboardRouter = require('./routes/admin-dashboard');
var teacherDashboardRouter = require('./routes/teacher-dashboard');
var studentDashboardRouter = require('./routes/student-dashboard');

// admin subject functions routes
var adminIndexSubjectRouter = require('./routes/admin-index-subject');
var adminCreateSubjectRouter = require('./routes/admin-create-subject');
var adminViewSubjectRouter = require('./routes/admin-view-subject');
var adminEditSubjectRouter = require('./routes/admin-edit-subject');
var adminDeleteSubjectRouter = require('./routes/admin-delete-subject');

// admin section functions routes
var adminIndexSectionRouter = require('./routes/admin-index-section');
var adminCreateSectionRouter = require('./routes/admin-create-section');
var adminEditSectionRouter = require('./routes/admin-edit-section');
var adminViewSectionRouter = require('./routes/admin-view-section');
var adminDeleteSectionRouter = require('./routes/admin-delete-section');

// admin teacher functions routes
var adminIndexTeacherRouter = require('./routes/admin-index-teacher');
var adminCreateTeacherRouter = require('./routes/admin-create-teacher-account');
var adminViewTeacherRouter = require('./routes/admin-view-teacher-account');
var adminEditTeacherRouter = require('./routes/admin-edit-teacher-account');
var adminDeleteTeacherRouter = require('./routes/admin-delete-teacher-account');

// admin department routes
var adminCreateDepartmentRouter = require('./routes/admin-create-department');
var adminIndexDepartmentRouter = require('./routes/admin-index-department');
var adminEditDepartmentRouter = require('./routes/admin-edit-department');
var adminDeleteDepartmentRouter = require('./routes/admin-delete-department');

// admin create student
var adminCreateStudentRouter = require('./routes/admin-create-student');
var adminIndexStudentRouter = require('./routes/admin-index-student');
var adminViewStudentRouter = require('./routes/admin-view-student');
var adminEditStudentRouter = require('./routes/admin-edit-student');
var adminDeleteStudentRouter = require('./routes/admin-delete-student');

// teacher subject-> lesson routes
var teacherViewSubject = require('./routes/teacher-view-subject');
var teacherLessonModules = require('./routes/teacher-lesson-modules');
var teacherCreateLesson = require('./routes/teacher-create-lesson');
var teacherViewLesson = require('./routes/teacher-view-lesson');
var teacherEditLesson = require('./routes/teacher-edit-lesson');
var teacherDeleteLesson = require('./routes/teacher-delete-lesson');

// teacher create announcement routes
var teacherCreateAnnouncement = require('./routes/teacher-create-announcement');
var teacherIndexAnnouncement = require('./routes/teacher-index-announcement');
var teacherViewAnnouncement = require('./routes/teacher-view-announcement');
var teacherEditAnnouncement = require('./routes/teacher-edit-announcement');
var teacherDeleteAnnouncement = require('./routes/teacher-delete-announcement');

// student lesson view
var studentSubjectViewRouter = require('./routes/student-view-subject');
var studentLessonsViewRouter = require('./routes/student-view-lessons');
var studentLessonViewRouter = require('./routes/student-view-lesson');
var studentClassmatesViewRouter = require('./routes/student-view-classmates');
var studentAnnouncementsViewRouter = require('./routes/student-view-announcement');

// teacher view students
var teacherViewStudents = require('./routes/teacher-view-students');
var teacherCreateStudentAttendance = require('./routes/teacher-create-attendance');
var teacherIndexStudentAttendance = require('./routes/teacher-index-attendance');
var teacherEditStudentAttendance = require('./routes/teacher-edit-attendance');

//teacher create grades
var teacherCreateGrades = require('./routes/teacher-create-grades');


var app = express();

const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: oneDay, // 60 secs in milliseconds
  },
}));

//port listener
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

//routing the routes

// login
app.use('/', adminLoginRouter);
app.use('/', teacherLoginRouter);
app.use('/', studentLoginRouter);

// logout
app.use('/', logoutRouter);

// dashboard
app.use('/', adminDashboardRouter);
app.use('/', teacherDashboardRouter);
app.use('/', studentDashboardRouter);

// admin create subject functions
app.use('/', adminIndexSubjectRouter);
app.use('/', adminCreateSubjectRouter);
app.use('/', adminViewSubjectRouter);
app.use('/', adminEditSubjectRouter);
app.use('/', adminDeleteSubjectRouter);

// admin create section functions
app.use('/', adminCreateSectionRouter);
app.use('/', adminEditSectionRouter);
app.use('/', adminIndexSectionRouter);
app.use('/', adminViewSectionRouter);
app.use('/', adminDeleteSectionRouter);

// admin teacher create functions
app.use('/', adminIndexTeacherRouter);
app.use('/', adminCreateTeacherRouter);
app.use('/', adminViewTeacherRouter);
app.use('/', adminEditTeacherRouter);
app.use('/', adminDeleteTeacherRouter);

// admin create departments functions
app.use('/', adminCreateDepartmentRouter);
app.use('/', adminIndexDepartmentRouter);
app.use('/', adminEditDepartmentRouter);
app.use('/', adminDeleteDepartmentRouter);

// admin create student functions
app.use('/', adminCreateStudentRouter);
app.use('/', adminIndexStudentRouter);
app.use('/', adminViewStudentRouter);
app.use('/', adminEditStudentRouter);
app.use('/', adminDeleteStudentRouter);

// teacher subject - > lesson routes
app.use('/', teacherViewSubject);
app.use('/', teacherLessonModules);
app.use('/', teacherCreateLesson);
app.use('/', teacherViewLesson);
app.use('/', teacherEditLesson);
app.use('/', teacherDeleteLesson);

// teacher announcement functions routes
app.use('/', teacherCreateAnnouncement);
app.use('/', teacherIndexAnnouncement);
app.use('/', teacherDeleteAnnouncement);
app.use('/', teacherViewAnnouncement);
app.use('/', teacherEditAnnouncement);

// student lesson
app.use('/', studentSubjectViewRouter);
app.use('/', studentLessonsViewRouter);
app.use('/', studentLessonViewRouter);
app.use('/', studentClassmatesViewRouter);
app.use('/', studentAnnouncementsViewRouter);

// teacher view students and attendance
app.use('/', teacherViewStudents);
app.use('/', teacherCreateStudentAttendance);
app.use('/', teacherIndexStudentAttendance);
app.use('/', teacherEditStudentAttendance);

// teacher create grades
app.use('/', teacherCreateGrades);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
