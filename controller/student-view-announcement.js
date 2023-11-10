const mysql = require("mysql");

const conn = {
      host: 'localhost',
      database: 'finalcapstone',
      user: 'root',
      password: ''
};

exports.getAnnouncementPage = (req, res) => {
      res.render('student-view-announcement');
};
