const mustacheExpress = require('mustache-express')
const express = require('express')
const nodemailer = require('nodemailer');
const app = express()
const bodyParser = require('body-parser');

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './views')
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));


// __________HOME PAGE ROUTES_________//
app.get('/', (req,res) => {
  res.redirect('/Home')
})

app.get('/Home', (req,res) => {
  res.render('home')
})

// __________ABOUT US ROUTES_________//
app.get('/AboutUs', (req,res) => {
  res.render('aboutus')
})
// __________SERVICE PAGE ROUTES_________//
app.get('/Services', (req,res) => {
  res.render('services')
})

app.get('/RoofRepair', (req,res) => {
  res.render('roofRepair')
})

app.get('/RoofInstallation', (req,res) => {
  res.render('RoofInstallation')
})

app.get('/RoofLeakRepair', (req,res) => {
  res.render('roofLeakRepair')
})

app.get('/EmergencyRepair', (req,res) => {
  res.render('emergencyRepair')
})

app.get('/RoofManagement', (req,res) => {
  res.render('roofManagement')
})

app.get('/RoofCoating', (req,res) => {
  res.render('roofCoating')
})

// ________Gallery Routes________//
app.get('/Gallery', (req,res) => {
  res.render('gallery')
})


//_______ContactUs Routes_______//
app.get('/ContactUs', (req,res) => {
  res.render('contact')
})

// POST route from contact form
app.post('/ContactForm', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'michaelbaxter1707@gmail.com',
      pass: 'reese1707'
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: 'michaelbaxter1707@gmail.com',
    subject: req.body.subject,
    text: `${req.body.name} (${req.body.email}) (${req.body.phone}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.send('contact-failure');
    }
    else {
      res.send('contact-success');
    }
  });
});

app.listen(3000, () =>{
  console.log('We are live on channel 3000')
})
