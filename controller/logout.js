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