const express = require( 'express' );
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // parse JSON request body

const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const payrollRoutes = require('./routes/payroll.routes');
const performanceRoutes = require( './routes/performance.routes' );

app.use('/api/auth', authRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);

module.exports = app;
