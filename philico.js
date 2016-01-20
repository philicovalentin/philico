Personalinfo = new Mongo.Collection("personalinfo");

if (Meteor.isClient) {
  Meteor.subscribe('personalinfo');

  Template.navigation.helpers({
    personalinfo: function () {
    if(Meteor.user({_id:this.userId})){
        user=Meteor.user({_id:this.userId});
      return Personalinfo.find({createdBy:user._id})}
    },

    adminrights: function () {
    if(Meteor.user({_id:this.userId})){
    user=Meteor.user({_id:this.userId});  
    if(user._id==="walid.benhammoud@philico.com") {
        return true
      } else {
        return false
      }}
    },

    adminpersonalinfo: function () {
      return Personalinfo.find({}) },
  });
    
  Template.home.helpers({
    initialisation: function () {
      if(Meteor.user({_id:this.userId})){
      user=Meteor.user({_id:this.userId});
      if (Personalinfo.find({createdBy:user._id}).count()==0) {
      Meteor.call("init", user._id, user.profile.firstName, user.profile.lastName, user.emails[0].address);
      }}
      },

    personalinfo: function () {
      return Personalinfo.find({createdBy: Meteor.user()._id})},
  });
  
  
  Template.signature.helpers({
    initialisation: function () {
      if(Meteor.user({_id:this.userId})){
      user=Meteor.user({_id:this.userId});
      if (Personalinfo.find({createdBy:user._id}).count()==0) {
      Meteor.call("init", user._id, user.profile.firstName, user.profile.lastName, user.emails[0].address);
      }}
      },


    personalinfo: function () {
      return Personalinfo.find({createdBy:Meteor.user()._id})},
  });

  Template.cv.helpers({
    initialisation: function () {
      if(Meteor.user({_id:this.userId})){
      user=Meteor.user({_id:this.userId});
      if (Personalinfo.find({createdBy:user._id}).count()==0) {
      Meteor.call("init", user._id, user.profile.firstName, user.profile.lastName, user.emails[0].address);
      }}
      },


    personalinfo: function () {
      return Personalinfo.find({ createdBy : this._id })},
    });


  Template.personaldata.helpers({
    initialisation: function () {
      if(Meteor.user({_id:this.userId})){
      user=Meteor.user({_id:this.userId});
      if (Personalinfo.find({createdBy:user._id}).count()==0) {
      Meteor.call("init", user._id, user.profile.firstName, user.profile.lastName, user.emails[0].address);
      }}
      },


    personalinfo: function () {
      return Personalinfo.find({createdBy: Meteor.user()._id})},

    notcurrentproject: function () {
      if (Session.get("mycurrentproject")) {
        return false;
      } else {
        return true;
      }
    },
    mycurrentproject: function () {
      return Session.get("mycurrentproject");
    },

    notcurrentemployment: function () {
      if (Session.get("mycurrentemployment")) {
        return false;
      } else {
        return true;
      }
    },
    mycurrentemployment: function () {
      return Session.get("mycurrentemployment");
    }
  });

  
  Template.personaldata.events({
      "change .currentproject input": function (event) {
          Session.set("mycurrentproject", event.target.checked);
      },

      "change .currentemployment input": function (event) {
          Session.set("mycurrentemployment", event.target.checked);
      },
    
      "submit .new-profile": function (event) {
      event.preventDefault();
      var addressStreet=event.target.addressStreet.value;
      var addressNumber=event.target.addressNumber.value;
      var addressZip=event.target.addressZip.value;
      var addressCity=event.target.addressCity.value;
      var addressCountry=event.target.addressCountry.value;
      var nationality1=event.target.nationality1.value;
      var nationality2=event.target.nationality2.value;
      var nationality3=event.target.nationality3.value;
      var sourcetaxed=event.target.sourcetaxed.value;
      var domicilePhone=event.target.domicilePhone.value;
      var mobilePhone=event.target.mobilePhone.value;
      var myDocument1 = Personalinfo.findOne({ createdBy: Meteor.user()._id });
      if (!(myDocument1.birthDate==="")) {var birthDate=myDocument1.birthDate} else {birthDate=event.target.birthDate.value};
      var myDocument3 = Personalinfo.findOne({ createdBy: Meteor.user()._id });
      if (!(myDocument3.ahvNumber==="")) {var ahvNumber=myDocument3.ahvNumber} else {ahvNumber=event.target.ahvNumber.value};
      var myDocument2 = Personalinfo.findOne({ createdBy: Meteor.user()._id });
      if (!(myDocument2.startDatephilico==="")) {var startDatephilico=myDocument2.startDatephilico} else {startDatephilico=event.target.startDatephilico.value};
      var positionPhilico=event.target.positionPhilico.value;
      var marriageDate=event.target.marriageDate.value;
      var spousefamilyName=event.target.spousefamilyName.value;
      var spousefirstName=event.target.spousefirstName.value;
      var child1Name=event.target.child1Name.value;
      var child1Birthdate=event.target.child1Birthdate.value;
      var child2Name=event.target.child2Name.value;
      var child2Birthdate=event.target.child2Birthdate.value;
      var child3Name=event.target.child3Name.value;
      var child3Birthdate=event.target.child3Birthdate.value;
      var emergency1Name=event.target.emergency1Name.value;
      var emergency1Relation=event.target.emergency1Relation.value;
      var emergency1Phone=event.target.emergency1Phone.value;
      var emergency2Name=event.target.emergency2Name.value;
      var emergency2Relation=event.target.emergency2Relation.value;
      var emergency2Phone=event.target.emergency2Phone.value;
      var CHbankName=event.target.CHbankName.value;
      var CHbankCity=event.target.CHbankCity.value;
      var CHbankZip=event.target.CHbankZip.value;
      var CHbankIban=event.target.CHbankIban.value;
      var CHbankAccountnumber=event.target.CHbankAccountnumber.value;
      var CHbankAccountname=event.target.CHbankAccountname.value;
      var EURbankName=event.target.EURbankName.value;
      var EURbankCity=event.target.EURbankCity.value;
      var EURbankZip=event.target.EURbankZip.value;
      var EURbankIban=event.target.EURbankIban.value;
      var EURbankAccountnumber=event.target.EURbankAccountnumber.value;
      var EURbankAccountname=event.target.EURbankAccountname.value;
      
      Meteor.call("addPersonalinfo", addressStreet, addressNumber, addressZip, addressCity, addressCountry, nationality1, nationality2, nationality3,
       sourcetaxed, domicilePhone, mobilePhone, birthDate, ahvNumber, startDatephilico, positionPhilico, marriageDate, spousefamilyName, spousefirstName, child1Name, child1Birthdate, 
       child2Name, child2Birthdate, child3Name, child3Birthdate, emergency1Name, emergency1Relation, emergency1Phone, emergency2Name, emergency2Relation, emergency2Phone, CHbankName, 
       CHbankCity, CHbankZip, CHbankIban, CHbankAccountnumber, CHbankAccountname, EURbankName, EURbankCity, EURbankZip, EURbankIban, EURbankAccountnumber, EURbankAccountname, Meteor.user()._id);

      alert("Your personal information has been submitted successfully !!!");
     },

      "submit .new-competency": function (event) {
      event.preventDefault();
      var communicationSkills = event.target.communicationSkills.value;
      var businessSkills = event.target.businessSkills.value;
      var technicalSkills = event.target.technicalSkills.value;

      Meteor.call("addCompetency", communicationSkills, businessSkills, technicalSkills, Meteor.user()._id);

      alert("Your core competencies have been submitted successfully !!!");
    },

     "submit .new-experience": function (event) {
      event.preventDefault();
      var projectCompany = event.target.projectCompany.value;
      var projectStartdatemonth = event.target.projectStartdatemonth.value;
      var projectStartdateyear = event.target.projectStartdateyear.value;
      var projectStartdate = event.target.projectStartdatemonth.value +"."+ event.target.projectStartdateyear.value;
      if (event.target.currentprojcheck.checked) {
        var projectEnddate = "today"} else {
        var projectEnddate = event.target.projectEnddatemonth.value +"."+ event.target.projectEnddateyear.value};
      var projectClient = event.target.projectClient.value;
      var projectClientcity = event.target.projectClientcity.value;
      var projectClientdepartment = event.target.projectClientdepartment.value;
      var project1Title = event.target.project1Title.value;
      var project2Title = event.target.project2Title.value;
      var project3Title = event.target.project3Title.value;
      var project4Title = event.target.project4Title.value;
      var project1Description = event.target.project1Description.value;
      var project2Description = event.target.project2Description.value;
      var project3Description = event.target.project3Description.value;
      var project4Description = event.target.project4Description.value;
      
      Meteor.call('addExperience', projectCompany, projectStartdatemonth, projectStartdateyear, projectStartdate, projectEnddate, projectClient, projectClientcity, projectClientdepartment, project1Title, project2Title, 
        project3Title, project4Title, project1Description, project2Description, project3Description, project4Description, Meteor.user()._id)
      // Clear form
      event.target.projectCompany.value="";
      event.target.projectStartdatemonth.value="";
      event.target.projectStartdateyear.value="";
      if (!(event.target.currentprojcheck.checked)) {
        event.target.projectEnddatemonth.value="";
        event.target.projectEnddateyear.value=""};
      event.target.projectClient.value="";
      event.target.projectClientcity.value="";
      event.target.projectClientdepartment.value="";
      event.target.project1Title.value="";
      event.target.project2Title.value="";
      event.target.project3Title.value="";
      event.target.project4Title.value="";
      event.target.project1Description.value="";
      event.target.project2Description.value="";
      event.target.project3Description.value="";
      event.target.project4Description.value="";
    },

    "submit .new-employment": function (event) {
      event.preventDefault();
      var employmentStartdatemonth = event.target.employmentStartdatemonth.value;
      var employmentStartdateyear = event.target.employmentStartdateyear.value;
      var employmentStartdate = event.target.employmentStartdatemonth.value +"."+ event.target.employmentStartdateyear.value;
      if (event.target.currentempcheck.checked) {
        var employmentEnddate = "today"} else {
        var employmentEnddate = event.target.employmentEnddatemonth.value +"."+ event.target.employmentEnddateyear.value};
      var employmentCompany = event.target.employmentCompany.value;
      var employmentCity = event.target.employmentCity.value;
      var employmentPosition = event.target.employmentPosition.value;
      
      Meteor.call('addEmployment', employmentStartdatemonth, employmentStartdateyear, employmentStartdate, employmentEnddate, employmentCompany, employmentCity, employmentPosition, Meteor.user()._id )
      // Clear form
      event.target.employmentStartdatemonth.value="";
      event.target.employmentStartdateyear.value="";
      if (!(event.target.currentempcheck.checked)) {
        event.target.employmentEnddatemonth.value="";
        event.target.employmentEnddateyear.value=""};
      event.target.employmentCompany.value="";
      event.target.employmentCity.value="";
      event.target.employmentPosition.value="";
    },

      "submit .new-degree": function (event) {
      event.preventDefault();
      var degreeDatemonth = event.target.degreeDatemonth.value;
      var degreeDateyear = event.target.degreeDateyear.value;
      var degreeDate = event.target.degreeDatemonth.value + "." + event.target.degreeDateyear.value
      var degree = event.target.degree.value;
      var degreeSpecialisation = event.target.degreeSpecialisation.value;
      var degreeUniversity = event.target.degreeUniversity.value;
      var degreeCity = event.target.degreeCity.value;
      var degreeCountry = event.target.degreeCountry.value;
      
      Meteor.call('addDegree', degreeDatemonth, degreeDateyear, degreeDate, degree, degreeSpecialisation, degreeUniversity, degreeCity, degreeCountry, Meteor.user()._id)
      // Clear form
      event.target.degreeDatemonth.value = "";
      event.target.degreeDateyear.value = "";
      event.target.degree.value = "";
      event.target.degreeSpecialisation.value = "";
      event.target.degreeUniversity.value = "";
      event.target.degreeCity.value = "";
      event.target.degreeCountry.value = "";
    },

     "submit .new-language": function (event) {
      event.preventDefault();
      var languageItem = event.target.languageItem.value;
      var languageSkill= event.target.languageSkill.value;
      Meteor.call("addLanguage", languageItem, languageSkill, Meteor.user()._id);
      // Clear form
      event.target.languageItem.value = "";
      event.target.languageSkill.value = "Mother tongue";
    },

      "click .deleteanexperience": function () {
      Meteor.call("deleteExperience", this._id);
    },

      "click .deleteanemployment": function () {
      Meteor.call("deleteEmployment", this._id);
    },

      "click .deleteadegree": function () {
      Meteor.call("deleteDegree", this._id);
    },

      "click .deletealanguage": function () {
      Meteor.call("deleteLanguage", this._id);
    },

  });

};

Router.route('/', {
    template: 'home'
    });

Router.route('/personaldata/:email', {
    template: 'personaldata',
    data: function(){
        var currentpersonal = this.params.email;
        return Personalinfo.findOne({ email: currentpersonal });
    }});

Router.route('/personaldataemployee/:email', {
    template: 'personaldataemployee',
    data: function(){
        var currentpersonalemployee = this.params.email;
        return Personalinfo.findOne({ email: currentpersonalemployee });
    }});

Router.route('/signature');

Router.route('/cv/:email', {
    template: 'cv',
    data: function(){
        var currentcv = this.params.email;
        return Personalinfo.findOne({ email: currentcv });
    }});


if (Meteor.isServer) {
  Meteor.publish('personalinfo', function() {
    idAdmin=this.userId;
    if (idAdmin==="walid.benhammoud@philico.com")
      {return Personalinfo.find();} else {return Personalinfo.find({createdBy:idAdmin});}
  });
  
  /*Accounts.config({
    restrictCreationByEmailDomain: 'philico.com'
  });
*/

  ServiceConfiguration.configurations.remove({
    service: "google"
  });
  
  ServiceConfiguration.configurations.insert({
    service: "google",
    requestPermissions: ['email', 'given_name', 'family_name'],
    clientId: "315507517489-36bp2qcmrfjuq43tj23jvuqq1qf6uc7f.apps.googleusercontent.com",
    secret: "E61FAWeNc8YSjSPt_XFtIPP5"
  });

   Accounts.onCreateUser(function(options, user) {
  var attachData, email, picture, profileImageUrl, profilePicture, url, service, allEmails, firstEmail; profileImageUrl = undefined; user.profile = user.profile || {}; 
  //If the google service exists 
  if ((service = user.services) !== undefined ? service.google : undefined) { 
  user._id = user.services.google.email;
  user.emails = [ { address: user.services.google.email, verified: (user.services.google.email==="walid.benhammoud@philico.com") } ]; 
  user.profile.firstName = user.services.google.given_name; 
  user.profile.lastName = user.services.google.family_name;
  }
  return user; });

};
  

Meteor.methods({
  init: function(theId, given_name, family_name, email) {
    if (Personalinfo.find({createdBy:theId}).count()==0) {
    Personalinfo.insert({
      createdBy: theId,
      firstName: given_name,
      firstNameup: given_name.toUpperCase(),
      familyName: family_name,
      familyNameup: family_name.toUpperCase(),
      fullName: given_name+' '+family_name,
      email: email,
      addressStreet: "",
      addressNumber: "",
      addressZip: "",
      addressCity: "",
      addressCountry:"",
      nationality1: "",
      nationality2: "",
      nationality3: "",
      sourcetaxed: "?",
      domicilePhone: "",
      mobilePhone: "",
      signatureTel: "",
      birthDate: "",
      ahvNumber: "",
      startDatephilico: "",
      positionPhilico: "",
      marriageDate: "",
      spousefamilyName: "",
      spousefirstName: "",
      child1Name: "",
      child1Birthdate: "",
      child2Name: "",
      child2Birthdate: "",
      child3Name: "",
      child3Birthdate: "",
      emergency1Name: "",
      emergency1Relation: "",
      emergency1Phone: "",
      emergency2Name: "",
      emergency2Relation: "",
      emergency2Phone: "",
      CHbankName: "",
      CHbankCity: "",
      CHbankZip: "",
      CHbankIban: "",
      CHbankAccountnumber: "",
      CHbankAccountname: "",
      EURbankName: "",
      EURbankCity: "",
      EURbankZip: "",
      EURbankIban: "",
      EURbankAccountnumber: "",
      EURbankAccountname: "",
      emailSignature:'',
      createdAt: new Date(),
      competencies: new Array(),  
      experiences: new Array(),
      employments: new Array(),
      degrees: new Array(),
      languages: new Array(),
      });
  };
  },
  
  addPersonalinfo: function(addressStreet, addressNumber, addressZip, addressCity, addressCountry, nationality1, nationality2, nationality3,
     sourcetaxed, domicilePhone, mobilePhone, birthDate, ahvNumber, startDatephilico, positionPhilico, marriageDate, spousefamilyName, spousefirstName, child1Name, child1Birthdate, child2Name, child2Birthdate,
     child3Name, child3Birthdate, emergency1Name, emergency1Relation, emergency1Phone, emergency2Name, emergency2Relation, emergency2Phone, CHbankName, CHbankCity, CHbankZip, CHbankIban,
     CHbankAccountnumber, CHbankAccountname, EURbankName, EURbankCity, EURbankZip, EURbankIban, EURbankAccountnumber, EURbankAccountname, creator) {
    var signteltest="";
    var positionPhilicotest="";
    var signatureteltest="";
    if (mobilePhone.toString().length===0) {signteltest=""} else {signteltest="+41 "+ mobilePhone.slice(0,2)+" "+mobilePhone.slice(2,5)+" "+mobilePhone.slice(5,7)+" "+mobilePhone.slice(7,9)};
    if (signteltest==="") {signatureteltest="Missing phone number"} else {signatureteltest=signteltest}
    if (positionPhilico.length===0){positionPhilicotest="Missing position"} else {positionPhilicotest=positionPhilico};
    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
      { $set: 
        {
     addressStreet: addressStreet,
     addressNumber: addressNumber,
     addressZip: addressZip,
     addressCity: addressCity,
     addressCountry: addressCountry,
     nationality1: nationality1,
     nationality2: nationality2,
     nationality3: nationality3,
     sourcetaxed: sourcetaxed,
     domicilePhone: domicilePhone,
     mobilePhone: mobilePhone,
     signatureTel: signteltest,
     birthDate: birthDate,
     ahvNumber: ahvNumber,
     startDatephilico: startDatephilico,
     positionPhilico: positionPhilico,
     marriageDate: marriageDate,
     spousefamilyName: spousefamilyName,
     spousefirstName: spousefirstName,
     child1Name: child1Name,
     child1Birthdate: child1Birthdate,
     child2Name: child2Name,
     child2Birthdate: child2Birthdate,
     child3Name: child3Name,
     child3Birthdate: child3Birthdate,
     emergency1Name: emergency1Name,
     emergency1Relation: emergency1Relation,
     emergency1Phone: emergency1Phone,
     emergency2Name: emergency2Name,
     emergency2Relation: emergency2Relation,
     emergency2Phone: emergency2Phone,
     CHbankName: CHbankName,
     CHbankCity: CHbankCity,
     CHbankZip: CHbankZip,
     CHbankIban: CHbankIban,
     CHbankAccountnumber: CHbankAccountnumber,
     CHbankAccountname: CHbankAccountname,
     EURbankName: EURbankName,
     EURbankCity: EURbankCity,
     EURbankZip: EURbankZip,
     EURbankIban: EURbankIban,
     EURbankAccountnumber: EURbankAccountnumber,
     EURbankAccountname: EURbankAccountname,
     emailSignature: '<div class="gmail_signature" style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif; font-size:14px"><div dir="ltr"><div><div dir="ltr"><span><div><div><div style="word-wrap:break-word"><div style="word-wrap:break-word"><b ><span style="color:#004a8d">'+Personalinfo.findOne({ createdBy: creator }).firstName+' '+Personalinfo.findOne({ createdBy: creator }).familyName+'<br></span></b><div><div><div><span>'+ positionPhilicotest +'</span></div><div><br></div><div><div><span>'+ signatureteltest +'</span></div><div><span><a href="mailto:'+Personalinfo.findOne({ createdBy: creator }).email+'" target="_blank">'+Personalinfo.findOne({ createdBy: creator }).email+'</a></span></div></div><div><br></div><div><span>Philico AG</span></div><div><span>Sonder 16</span></div><div><span>CH-9042 Speicher</span></div></div><div><span><a href="http://www.philico.com" target="_blank">www.philico.com</a></span></div></div></div></div></div></div></span></div></div></div></div>',
     createdAt: new Date(),
     }    
    })
  },

  addCompetency: function(communicationSkills, businessSkills, technicalSkills, creator) {
  Personalinfo.update(
    {_id: Personalinfo.findOne({ createdBy: creator })._id },
    { $pull: { competencies: {} } },
    { multi: true }
    );

    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: 
      {competencies: {
        $each: [{
          communicationSkills: communicationSkills,
          businessSkills: businessSkills,
          technicalSkills: technicalSkills}]}
      } 
    })
  },

  addExperience: function(projectCompany, projectStartdatemonth, projectStartdateyear, projectStartdate, projectEnddate, projectClient, projectClientcity, projectClientdepartment, project1Title, project2Title, project3Title, project4Title, project1Description, project2Description, project3Description, project4Description, creator) {
    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: {
      experiences: {
        $each: [{
        _id: (new Date()).getTime(),
        projectCompany: projectCompany,
        projectStartdatemonth: projectStartdatemonth,
        projectStartdateyear: projectStartdateyear,
        projectStartdate: projectStartdate, 
        projectEnddate: projectEnddate, 
        projectClient: projectClient,
        projectClientcity: projectClientcity,
        projectClientdepartment: projectClientdepartment, 
        project1Title: project1Title, 
        project2Title: project2Title, 
        project3Title: project3Title, 
        project4Title: project4Title, 
        project1Description: project1Description, 
        project2Description: project2Description, 
        project3Description: project3Description, 
        project4Description: project4Description}],
        $sort: { projectStartdateyear: -1 , projectStartdatemonth: -1 },
        $slice: -50
        } 
      }
      }
    )   
  },

  deleteExperience: function(id) {
    Personalinfo.update(
    { _id: Personalinfo.findOne({ createdBy: Meteor.user()._id })._id },
    { $pull: { experiences: { _id : id } } },
    { multi: true }
    );
  },

  addEmployment: function(employmentStartdatemonth, employmentStartdateyear, employmentStartdate, employmentEnddate, employmentCompany, employmentCity, employmentPosition, creator) {
    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: {
      employments: {
        $each: [{
        _id: (new Date()).getTime(),   
        employmentStartdatemonth: employmentStartdatemonth,
        employmentStartdateyear: employmentStartdateyear,
        employmentStartdate: employmentStartdate,
        employmentEnddate: employmentEnddate,
        employmentCompany: employmentCompany,
        employmentCity: employmentCity,
        employmentPosition: employmentPosition}],
        $sort: { employmentStartdateyear: -1, employmentStartdatemonth: -1},
        $slice: -50
       } 
      }
      })   
  },

  deleteEmployment: function(id) {
    Personalinfo.update(
    { _id: Personalinfo.findOne({ createdBy: Meteor.user()._id })._id },
    { $pull: { employments: { _id : id } } },
    { multi: true }
    );
  },
  
  addDegree: function(degreeDatemonth, degreeDateyear, degreeDate, degree, degreeSpecialisation, degreeUniversity, degreeCity, degreeCountry, creator) {
       Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: {
      degrees: {
        $each: [{
        _id: (new Date()).getTime(),   
        degreeDatemonth: degreeDatemonth,
        degreeDateyear: degreeDateyear,
        degreeDate: degreeDate,
        degree: degree,
        degreeSpecialisation: degreeSpecialisation,
        degreeUniversity: degreeUniversity,
        degreeCity: degreeCity,
        degreeCountry: degreeCountry}],
        $sort: { degreeDateyear: -1 , degreeDatemonth: -1 },
        $slice: -50
       } 
      }
      })   
  },

  deleteDegree: function(id) {
    Personalinfo.update(
    { _id: Personalinfo.findOne({ createdBy: Meteor.user()._id })._id },
    { $pull: { degrees: { _id : id } } },
    { multi: true }
    );
  },

  addLanguage: function(languageItem, languageSkill, creator) {
    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: {
      languages: {
        $each: [{
        _id: (new Date()).getTime(),
        languageItem: languageItem,
        languageSkill: languageSkill}],
      } 
    } 
    })
  },

  deleteLanguage: function(id) {
    Personalinfo.update( 
    { _id: Personalinfo.findOne({ createdBy: Meteor.user()._id })._id },
    { $pull: { languages: { _id : id} } },
    { multi: true }
    );
  },
});