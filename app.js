var createError = require('http-errors')
var express = require('express')
var cors = require('cors')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var mongoose = require('mongoose')
var config = require('config')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/api/users')
var customersRouter = require('./routes/api/customer')
var gymRouter = require('./routes/api/gymDetails')
var trainerRouter = require('./routes/api/trainerDetails')
var mealRouter = require('./routes/api/meal_api')
var foodRouter = require('./routes/api/food_api')
var WaterIntakeRouter = require('./routes/api/waterIntake')
var exerciseRouter = require('./routes/api/excercise_api')
var SelectexerciseRouter = require('./routes/api/selectExercise_api')
var CreatePlanRouter = require('./routes/api/createPlan')
var ConversationRouter = require('./routes/conversation')
var MessageRouter = require('./routes/message')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/customer', customersRouter)
app.use('/api/gym', gymRouter)
app.use('/api/trainer', trainerRouter)
app.use('/api/meal', mealRouter)
app.use('/api/food', foodRouter)
app.use('/api/waterIntake', WaterIntakeRouter)
app.use('/api/excercise', exerciseRouter)
app.use('/api/SelectExcercise', SelectexerciseRouter)
app.use('/api/createPlan', CreatePlanRouter)
app.use('/api/conversation', ConversationRouter)
app.use('/api/message', MessageRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

mongoose
  .connect(config.get('db'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Mongo....'))
  .catch((error) => console.log(error.message))
module.exports = app

module.exports = app
