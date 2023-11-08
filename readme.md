npm i express
express
npm i uninstall jade
npm i nodemon
npm i ejs
npm i mysql
npm i express-session
npm i express-rate-limit
npm i multer
npm i fs
npm i fast-csv
import finalcapstone.sql


routes:

localhost:3000 = student login
localhost:3000/student/dashboard = student dashboard
localhost:3000/teacher/login = teacherlogin
localhost:3000/teacher/dashboard = teacher dashboard
localhost:3000/admin/login = adminlogin
localhost:3000/admin/dashboard = admin dashboard
localhost:3000/admin/create-section = create section
localhost:3000/admin/index-section = create section
localhost:3000/admin/index-teacher = index teacher
localhost:3000/admin/index-department = index department
localhost:3000/admin/create/student = create student
localhost:3000/teacher/view-subject/:id = subject view teacher side


mga wala pang design

/admin/view-subject/:id
/admin/edit-subject/:id
/admin/edit-section/:id
/admin/index-teacher
/admin/create-teacher-account
/admin/edit/teacher-account/:id
/admin/index-department
/admin/edit-department/:id
/teacher/view-subject/:id
/teacher/announcement/
/teacher/announcement/view/:id
/teacher/announcement/edit/:id
/teacher/lesson/modules
/teacher/lesson/view-lesson/:id
/teacher/lesson/edit-lesson/:id
localhost:3000/admin/create/student 
localhost:3000/admin/index/student 
localhost:3000/admin/view/student/:id
localhost:3000/admin/edit/student/:id

branch 1  - created admin login and dashboard
branch 2  - created student login and dashboard
branch 3  - created teacher login and dashboard
branch 4  - modified admin login and dashboard
branch 5  - subject create page was done
branch 6  - index page for all subject was created
branch 7  - corrected all routes
branch 8  - optimized version in fetching data for admin/index/subject
branch 9  - added visibility in the create subject form
branch 10 - created a view function for the subject
branch 11 - created delete function for admin-subject
branch 12 - created edit function, post function not usable
branch 13 - modified the sql to concat the teacher name
branch 14 - updated the database and other functions
branch 15 - updated edit form
branch 16 - edit function working
branch 17 - create for section not working
branch 18 - create section working
branch 19 - index section created and working
branch 20 - delete function created and updated readme
branch 21 - view section function created
branch 22 - application routing updated
branch 23 - added edit function, 50% done
branch 24 - edit function 100% done, index section and create section updated routing, updated db
branch 25 - edited view-section table
branch 26 - updated controller for teacher login, and added inputfield for teacherlogin
branch 27 - updated login controller on github
branch 28 - updated readme
branch 29 - createad a console.log to verify the data that needs to be placed in the form
branch 30 - create teacher account for admin
branch 31 - create-department for admin
branch 32 - index page for admin-departments
branch 33 - teacher create admin
branch 34 - teacher index page
branch 35 - teacher details page
branch 36 - teacher edit details page
branch 37 - delete teacher account function
branch 38 - create department page
branch 39 - index department page
branch 40 - edit department page
branch 41 - delete department function
branch 42 - updated edit function for teacher account details, suffix view in index-teacher and view-teacher-account
branch 43 - view subject for teacher page created
branch 44 - working session teacher lesson module
branch 45 - done working create lesson and view lesson
branch 46 - teacher-lesson-modules not working
branch 47 - lesson module view now working
branch 48 - teacher view lesson page created
branch 49 - updated create section,edit section, index section, lesson modules, view lesson
branch 50 - changed how visibility is viewed, modified create, edit subject, create and edit teacher account how  they view visibility
branch 51 - created edit function for teacher lesson.
branch 52 - created delete function for teacher lesson.
branch 53 - created teacher announcement create page
branch 54 - created teacher index page for announcement
branch 55 - created teacher delete announcement function
branch 56 - created view announcement page for teacher side
branch 57 - created edit announcement page for teacher side
branch 58 - updated sql constraints, edited edit section & index section & index subject controller, and edited edit-section & index-subject ejs 
branch 59 - created admin create student list by uploading a csv file.
branch 60 - created index page for student details
branch 61 - created view page for student details
branch 62 - created edit page for student details
branch 63 - created delete function for student details
branch 64 - created another form for student for student details
branch 65 - modified the csv upload to also generate student login data modified student dashboard page to display available subjects, and create-student logic
branch 66 - view lessons now available
branch 67 - view lesson now available
branch 68 - created classmates page 
branch 69 - created students page for teacher
branch 70 - created students attendance for teacher
branch 71 - attendance now working
branch 72 - edit attendance now working, updated create grades, and index attendance
branch 73 - working create grades, but does not work when grades[i] === null