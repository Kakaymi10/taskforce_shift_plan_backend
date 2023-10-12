// routes/superadmin.js
const app = express()
const express = require('express');
const { Role } = require('./models/role');
const { authUser , authRole} = require('./../middlewares/superAdminAuth');
const { default: app } = require('../..');
const { ROLE } = require('../../models/role');


app.get('/superadmin', authUser, authRole(ROLE.SUPER_ADMIN), (req, res) => {
  res.send('Welcome to the Super Admin Page')
})
app.get('/admin', authUser, authRole(Role.ADMIN), (req, res) => {
  res.send('Admin Dashboard')
})
app.get('/manager', authUser, (req, res) => {
  res.send('Manager Dashboard')
})
module.exports = router;
