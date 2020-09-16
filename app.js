const mustacheExpress = require('mustache-express');
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const bodyParser = require('body-parser');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port',(process.env.PORT || 8000))


// __HOME PAGE ROUTES__//
app.get('/', (req,res) => {
  res.redirect('/Home')
})

app.get('www.', (req,res) => {
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

app.get('/InsuranceSpecialist', (req,res) => {
  res.render('insuranceSpecialist')
})

app.get('/RoofInstallation', (req,res) => {
  res.render('roofInstallation')
})

app.get('/FamilyOwned', (req,res) => {
  res.render('familyOwned')
})

app.get('/StormDamage', (req,res) => {
  res.render('stormDamage')
})

// ________Gallery Routes________//
app.get('/Gallery', (req,res) => {
  res.render('gallery')
})

//________FAQ ROUTES________//
app.get('/FAQ', (req,res)=>{
  res.render('faq')
})

//________Coming Soon______??
app.get('/ComingSoon', (req,res)=> {
  res.render('comingsoon')
})

//______Commercial Roofing______//
app.get('/CommercialRoofing', (req, res)=>{
  res.render('commercialRoofing')
})

app.get('/ResidentialRoofing', (req, res) =>{
  res.render('residentialRoofing')
})


app.get('/ShingleSelector', (req, res) =>{
  res.render('shingleSelector')
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
      user: 'SerenityRoofingWebsite@gmail.com',
      pass: 'Serenity2020!'
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: ' consumer%2B5e3b4f3bc548f200168b5560@broadly.com',
    subject: req.body.subject,
    text:
    `
    fullname: ${req.body.name}
    email:(${req.body.email})
    phone number: (${req.body.phone})
    address:(${req.body.address})
    leaks: (${req.body.leaks})
    completion date:(${req.body.date})
    insurenace claim: (${req.body.insurance})
    says: ${req.body.message}
    `
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      console.log(error, response)
      res.send('contact-failure');
    }
    else {
      res.send('contact-success');
    }
  });
});

app.listen(app.get('port'), function(){
  console.log("we are live on port ", app.get('port'));
});
