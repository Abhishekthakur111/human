var express = require('express');
var router = express.Router();
const authcontroller = require('../controller/admincontroller/authcontroller');
const checkadminsession = require('../helper/helper');
const cms = require('../controller/admincontroller/cmscontroller');
const contact = require('../controller/admincontroller/contactcontroller');
const Prompt = require('../controller/admincontroller/promptcontroller');
const usercontroller = require('../controller/admincontroller/usercontroller')



//router for login 
router.get('/login',authcontroller.login);
router.post('/loginpost',authcontroller.loginpost);

// Use the middleware for all routes in the router
router.use(checkadminsession.checkAdminSession);

// router for admin
router.get('/dashboard',authcontroller.dashboard);


//router for auth
router.get('/profile', authcontroller.profile);
router.post('/profileupdate',authcontroller.edit_profile);
router.get('/password', authcontroller.password);
router.post('/updatepassword',authcontroller.updatepassword);
router.get('/logout', authcontroller.logout);

//router for user
router.get('/userlist',usercontroller.user_list);
router.get('/view/:id', usercontroller.view);
router.post('/delete/:id',usercontroller.user_delete);
router.post('/status', usercontroller.user_status);



//router for cms
router.get('/privacypolicy', cms.privacy);
router.post('/privacypolicy', cms.privacy_update);
router.get('/aboutus', cms.aboutus);
router.post('/aboutus', cms.aboutusupdate);
router.get('/term&conditions',cms.term);
router.post('/term&conditions', cms.terms);

// router for contact Us
router.get('/contacts',contact.getcontacts);
router.post('/deletecontact/:id',contact.deletecontact);
router.get('/viewcontact/:id',contact.contactview);
 
//router for convbersation
router.post('/createpromt', Prompt.create_Prompt);

router.get('/prompt',Prompt.get_Prompt);
router.post('/deleteprompt/:id',Prompt.deletePrompt);
router.get('/editpromt/:id',Prompt.editpage);
router.post('/editprompts/:id', Prompt.Promptedit);
router.get('/addPrompt',Prompt.addPrompt);
router.get('/promtdetail/:id',Prompt.promtView);








module.exports = router;
