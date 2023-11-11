const mysql = require('mysql');
var express = require('express');

exports.getlogout = async (req, res) => {
    res.render('/');
}

exports.postlogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
        } else {
            console.log('logout na')
            res.redirect('/'); // Redirect to your login page after logout
        }
    });
}

exports.postadminlogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
        } else {
            console.log('logout na')
            res.redirect('/admin'); // Redirect to your login page after logout
        }
    });
}


exports.postteacherlogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
        } else {
            console.log('logout na')
            res.redirect('/teacher'); // Redirect to your login page after logout
        }
    });
}


// ////////////////////////////////////////////////

// Admin Logout

//       <% if (admin_id) { %>

//         <form id="logoutForm" action="/admin-logout" method="post">
//           <a href="javascript:void(0);" class="nav_link" onclick="document.getElementById('logoutForm').submit();">
//               <i class='bx bx-log-out nav_icon'></i>
//               <span class="nav_name">SignOut</span>
//           </a>
//       </form>

//         <% } else { %>
//           <a href="/admin" class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">Login</span> </a>
//           <% } %>


// ////////////////////////////////////////////////

// Student logout

//       <% if (studentID) { %>

//         <form id="logoutForm" action="/logout" method="post">
//           <a href="javascript:void(0);" class="nav_link" onclick="document.getElementById('logoutForm').submit();">
//               <i class='bx bx-log-out nav_icon'></i>
//               <span class="nav_name">SignOut</span>
//           </a>
//       </form>
      
//         <% } else { %>
//           <a href="/" class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">Login</span> </a>
//           <% } %>


// ///////////////////////////////////////////////

// Teacher Logout

//       <% if (teacherid) { %>

//         <form id="logoutForm" action="/teacher-logout" method="post">
//           <a href="javascript:void(0);" class="nav_link" onclick="document.getElementById('logoutForm').submit();">
//               <i class='bx bx-log-out nav_icon'></i>
//               <span class="nav_name">SignOut</span>
//           </a>
//       </form>
      

//         <% } else { %>
//           <a href="/teacher" class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">Login</span> </a>
//           <% } %>