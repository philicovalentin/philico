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
    if(user._id==="walid.benhammoud@philico.com" || user._id==="fabian.knecht@philico.com" || user._id==="alex.mueller@philico.com" || user._id==="fabien.roth@philico.com") {
        return true
      } else {
        return false
      }}
    },

    adminpersonalinfo: function () {
      return Personalinfo.find({}) },

    employees: function () {
      return Personalinfo.find().count();
    },
  });

  Template.home.events({
      "change .newemployee input": function (event) {
          Session.set("newemployee", event.target.checked);
      },

      "submit .new-employee": function (event) {
      event.preventDefault();
      var firstName=event.target.firstName.value;
      var familyName=event.target.familyName.value;
      var email=event.target.email.value;
      var subcontractor=event.target.subcontractor.value;
      Meteor.call("init", email, firstName, familyName, email, subcontractor);
      alert("A new employee has been created successfully !!!");
    }
  });
    
  Template.home.helpers({
    initialisation: function () {
      if(Meteor.user({_id:this.userId})){
      user=Meteor.user({_id:this.userId});
      if (Personalinfo.find({createdBy:user._id}).count()==0) {
      Meteor.call("init", user._id, user.profile.firstName, user.profile.lastName, user.emails[0].address, "");
      }}
      },

    personalinfo: function () {
      return Personalinfo.find({createdBy: Meteor.user()._id})},

    addnewemployeecheck: function () {
      if (Session.get("newemployee")) {
        return true;
      } else {
        return false;
      }
    },

    newemployee: function () {
      return Session.get("newemployee");
    },

    adminrights: function () {
    if(Meteor.user({_id:this.userId})){
    user=Meteor.user({_id:this.userId});  
    if(user._id==="walid.benhammoud@philico.com" || user._id==="fabian.knecht@philico.com" || user._id==="alex.mueller@philico.com" || user._id==="fabien.roth@philico.com") {
        return true
      } else {
        return false
      }}
    },

  });
  
  
  Template.signature.helpers({
    initialisation: function () {
      if(Meteor.user({_id:this.userId})){
      user=Meteor.user({_id:this.userId});
      if (Personalinfo.find({createdBy:user._id}).count()==0) {
      Meteor.call("init", user._id, user.profile.firstName, user.profile.lastName, user.emails[0].address, "");
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
      Meteor.call("init", user._id, user.profile.firstName, user.profile.lastName, user.emails[0].address, "");
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
      Meteor.call("init", user._id, user.profile.firstName, user.profile.lastName, user.emails[0].address, "");
      }}
      },


    personalinfo: function () {
      return Personalinfo.find({createdBy: this._id})},

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
    },
    sourcetaxedIsunknown: function () {
      if (Personalinfo.findOne({ createdBy: this.email })){
      var myDocument1 = Personalinfo.findOne({ createdBy: this.email });
      return myDocument1.sourcetaxed==="?"}
    },
    sourcetaxedIsyes: function () {
      if (Personalinfo.findOne({ createdBy: this.email })){
      var myDocument1 = Personalinfo.findOne({ createdBy: this.email });
      return myDocument1.sourcetaxed==="Yes"}
    },
    sourcetaxedIsno: function () {
      if (Personalinfo.findOne({ createdBy: this.email })){
      var myDocument1 = Personalinfo.findOne({ createdBy: this.email });
      return myDocument1.sourcetaxed==="No"}
    },
  });

  Template.personaldataemployee.events({
    "submit .displayDetails": function (event) {
      event.preventDefault();
      var displayPhoto=event.target.displayPhoto.value;
      var displayAddress=event.target.displayAddress.value;
      var displayContact=event.target.displayContact.value;
      Meteor.call("showDetails", this.email, displayPhoto, displayAddress, displayContact);
      alert("Your preferences have been submitted successfully !!!");
    },
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
      var firstName=event.target.firstName.value;
      var familyName=event.target.familyName.value;
      var email=event.target.email.value;
      var addressStreet=event.target.addressStreet.value;
      var addressNumber=event.target.addressNumber.value;
      var addressZip=event.target.addressZip.value;
      var addressCity=event.target.addressCity.value;
      var addressCountry=event.target.addressCountry.value;
      var myDocument1 = Personalinfo.findOne({ createdBy: this.email });
      
      if (myDocument1.nationality1==="" && event.target.nationality1.value==="") {nationality1=""} else {
      if (myDocument1.nationality1!=="" && event.target.nationality1.value==="") {nationality1=myDocument1.nationality1} else {
      if (event.target.nationality1.value==="delete") {nationality1=""} else {
      if (myDocument1.nationality1!==event.target.nationality1.value && event.target.nationality1.value!=="delete" && event.target.nationality1.value!=="") {nationality1=event.target.nationality1.value.charAt(0).toUpperCase() + event.target.nationality1.value.slice(1).toLowerCase()}}}};
      
      if (myDocument1.nationality2==="" && event.target.nationality2.value==="") {nationality2=""} else {
      if (myDocument1.nationality2!=="" && event.target.nationality2.value==="") {nationality2=myDocument1.nationality2} else {
      if (event.target.nationality2.value==="delete") {nationality2=""} else {
      if (myDocument1.nationality2!==event.target.nationality2.value && event.target.nationality2.value!=="delete" && event.target.nationality2.value!=="") {nationality2=event.target.nationality2.value.charAt(0).toUpperCase() + event.target.nationality2.value.slice(1).toLowerCase()}}}};
      
      if (myDocument1.nationality3==="" && event.target.nationality3.value==="") {nationality3=""} else {
      if (myDocument1.nationality3!=="" && event.target.nationality3.value==="") {nationality3=myDocument1.nationality3} else {
      if (event.target.nationality3.value==="delete") {nationality3=""} else {
      if (myDocument1.nationality3!==event.target.nationality3.value && event.target.nationality3.value!=="delete" && event.target.nationality3.value!=="") {nationality3=event.target.nationality3.value.charAt(0).toUpperCase() + event.target.nationality3.value.slice(1).toLowerCase()}}}};
      
      var sourcetaxed=event.target.sourcetaxed.value;
      var domicilecountryCode=event.target.domicilecountryCode.value;
      var domicilePhone=event.target.domicilePhone.value;
      var mobilecountryCode=event.target.mobilecountryCode.value;
      var mobilePhone=event.target.mobilePhone.value;
      var birthDate=event.target.birthDate.value;
      var ahvNumber=event.target.ahvNumber.value;
      var startDatephilico=event.target.startDatephilico.value;
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
      var emergency1firstName=event.target.emergency1firstName.value;
      var emergency1familyName=event.target.emergency1familyName.value;
      var emergency1Relation=event.target.emergency1Relation.value;
      var emergency1Phone=event.target.emergency1Phone.value;
      var emergency2firstName=event.target.emergency2firstName.value;
      var emergency2familyName=event.target.emergency2familyName.value;
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
      
      Meteor.call("addPersonalinfo", firstName, familyName, email, addressStreet, addressNumber, addressZip, addressCity, addressCountry, nationality1, nationality2, nationality3,
       sourcetaxed, domicilecountryCode, domicilePhone, mobilecountryCode, mobilePhone, birthDate, ahvNumber, startDatephilico, positionPhilico, marriageDate, spousefamilyName, spousefirstName, child1Name, child1Birthdate, 
       child2Name, child2Birthdate, child3Name, child3Birthdate, emergency1firstName, emergency1familyName, emergency1Relation, emergency1Phone, emergency2firstName, emergency2familyName, emergency2Relation, emergency2Phone, CHbankName, 
       CHbankCity, CHbankZip, CHbankIban, CHbankAccountnumber, CHbankAccountname, EURbankName, EURbankCity, EURbankZip, EURbankIban, EURbankAccountnumber, EURbankAccountname, Meteor.user()._id);

      alert("Your personal information has been submitted successfully !!!");
     },

      "submit .new-competency": function (event) {
      event.preventDefault();
      var communicationSkills = event.target.communicationSkills.value;
      var businessSkills = event.target.businessSkills.value;
      var technicalSkills = event.target.technicalSkills.value;

      Meteor.call("addCompetency", communicationSkills, businessSkills, technicalSkills, this.email);

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
      var projectClientcountry = event.target.projectClientcountry.value;
      var projectClientdepartment = event.target.projectClientdepartment.value;
      var projectTitle = event.target.projectTitle.value;
      var projectDescription = event.target.projectDescription.value;
      
      Meteor.call('addExperience', projectCompany, projectStartdatemonth, projectStartdateyear, projectStartdate, projectEnddate, projectClient, projectClientcity, projectClientcountry, projectClientdepartment, projectTitle, 
        projectDescription, this.email)
      // Clear form
      event.target.projectCompany.value="";
      event.target.projectStartdatemonth.value="";
      event.target.projectStartdateyear.value="";
      if (!(event.target.currentprojcheck.checked)) {
        event.target.projectEnddatemonth.value="";
        event.target.projectEnddateyear.value=""};
      event.target.projectClient.value="";
      event.target.projectClientcity.value="";
      event.target.projectClientcountry.value="";
      event.target.projectClientdepartment.value="";
      event.target.projectTitle.value="";
      event.target.projectDescription.value="";
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
      var employmentCountry = event.target.employmentCountry.value;
      var employmentPosition = event.target.employmentPosition.value;
      
      Meteor.call('addEmployment', employmentStartdatemonth, employmentStartdateyear, employmentStartdate, employmentEnddate, employmentCompany, employmentCity, employmentCountry, employmentPosition, this.email )
      // Clear form
      event.target.employmentStartdatemonth.value="";
      event.target.employmentStartdateyear.value="";
      if (!(event.target.currentempcheck.checked)) {
        event.target.employmentEnddatemonth.value="";
        event.target.employmentEnddateyear.value=""};
      event.target.employmentCompany.value="";
      event.target.employmentCity.value="";
      event.target.employmentCountry.value;
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
      
      Meteor.call('addDegree', degreeDatemonth, degreeDateyear, degreeDate, degree, degreeSpecialisation, degreeUniversity, degreeCity, degreeCountry, this.email)
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
      Meteor.call("addLanguage", languageItem, languageSkill, this.email);
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

Router.route('/personaldataemployee/:email', {
    template: 'personaldataemployee',
    data: function(){
        var currentpersonal = this.params.email;
        return Personalinfo.findOne({ email: currentpersonal });
    }});

Router.route('/personaldata/:email', {
    template: 'personaldata',
    data: function(){
        var currentpersonal = this.params.email;
        return Personalinfo.findOne({ email: currentpersonal });
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
    if (idAdmin==="walid.benhammoud@philico.com" || idAdmin==="fabian.knecht@philico.com" || idAdmin==="alex.mueller@philico.com" || idAdmin==="fabien.roth@philico.com")
      {return Personalinfo.find();} else {return Personalinfo.find({createdBy:idAdmin});}
  });
  
  /*Accounts.config({
    restrictCreationByEmailDomain: 'philico.com'
  });*/


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
  user.emails = [ { address: user.services.google.email, verified: (user.services.google.email==="walid.benhammoud@philico.com") || (user.services.google.email==="fabian.knecht@philico.com") || (user.services.google.email==="fabien.roth@philico.com") || (user.services.google.email==="alex.mueller@philico.com")} ]; 
  user.profile.firstName = user.services.google.given_name; 
  user.profile.lastName = user.services.google.family_name;
  }
  return user; });

};
  

Meteor.methods({
  showDetails: function(theemail, displayornotphoto, displayornotaddress, displayornotcontact) {
    if (displayornotphoto==="yes") {resultphoto=true} else {resultphoto=false};
    if (displayornotaddress==="yes") {resultaddress=true} else {resultaddress=false};
    if (displayornotcontact==="yes") {resultcontact=true} else {resultcontact=false};
    Personalinfo.update(Personalinfo.findOne({ createdBy: theemail })._id,
      { $set: 
        { displayPhoto: resultphoto,
          displayPhotovar: displayornotphoto,
          displayAddress: resultaddress,
          displayAddressvar: displayornotaddress,
          displayContact: resultcontact,
          displayContactvar: displayornotcontact}
      })
  },

  init: function(theId, given_name, family_name, email, subcontractor) {
    if (Personalinfo.find({createdBy:theId}).count()==0) {
    Personalinfo.insert({
      displayPhoto:true,
      displayPhotovar:"yes",
      displayAddress:true,
      displayAddressvar:"yes",
      displayContact:true,
      displayContactvar:"yes",
      subcontractor: subcontractor,
      createdBy: theId,
      firstName: given_name,
      firstNameup: given_name.toUpperCase(),
      familyName: family_name,
      familyNameup: family_name.toUpperCase(),
      fullName: given_name+' '+family_name,
      email: email,
      sourcetaxed: "?",
      });
  };
  },
  
  addPersonalinfo: function(firstName, familyName, email, addressStreet, addressNumber, addressZip, addressCity, addressCountry, nationality1, nationality2, nationality3,
     sourcetaxed, domicilecountryCode, domicilePhone, mobilecountryCode, mobilePhone, birthDate, ahvNumber, startDatephilico, positionPhilico, marriageDate, spousefamilyName, spousefirstName, child1Name, child1Birthdate, child2Name, child2Birthdate,
     child3Name, child3Birthdate, emergency1firstName, emergency1familyName, emergency1Relation, emergency1Phone, emergency2firstName, emergency2familyName, emergency2Relation, emergency2Phone, CHbankName, CHbankCity, CHbankZip, CHbankIban,
     CHbankAccountnumber, CHbankAccountname, EURbankName, EURbankCity, EURbankZip, EURbankIban, EURbankAccountnumber, EURbankAccountname, creator) {
    var signatureteltest="";
    if (mobilePhone.toString().length===0) {signteltest=""} else {signteltest="+" + mobilecountryCode + mobilePhone};
    if (signteltest==="") {signatureteltest="<span style='color:red'>Missing phone number</span>"} else {signatureteltest="<span>"+signteltest+"</span>"};
    var positionPhilicotest="";
    if (positionPhilico.length===0){positionPhilicotest="<span style='color:red'>Missing position</span>"} else {positionPhilicotest="<span>"+positionPhilico+"</span>"};
    Personalinfo.update(Personalinfo.findOne({ createdBy: email })._id,
      { $set: 
        {
     firstName: firstName,
     firstNameup: firstName.toUpperCase(),
     familyName: familyName,
     familyNameup: familyName.toUpperCase(),
     fullName: firstName+' '+familyName,
     email: email,
     addressStreet: addressStreet,
     addressNumber: addressNumber,
     addressZip: addressZip,
     addressCity: addressCity.charAt(0).toUpperCase() + addressCity.slice(1).toLowerCase(),
     addressCountry: addressCountry.charAt(0).toUpperCase() + addressCountry.slice(1).toLowerCase(),
     nationality1: nationality1,
     nationality2: nationality2,
     nationality3: nationality3,
     sourcetaxed: sourcetaxed,
     domicilecountryCode: "+"+domicilecountryCode,
     domicilePhone: domicilePhone,
     mobilecountryCode: "+"+mobilecountryCode,
     mobilePhone: mobilePhone,
     signatureTel: signteltest,
     birthDate: birthDate,
     birthDatedisplayed: moment(birthDate).format("MMMM Do, YYYY"), 
     ahvNumber: ahvNumber,
     startDatephilico: startDatephilico,
     startDatephilicodisplayed: moment(startDatephilico).format("MMMM Do, YYYY"),
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
     emergency1firstName: emergency1firstName,
     emergency1familyName: emergency1familyName,
     emergency1Relation: emergency1Relation,
     emergency1Phone: emergency1Phone,
     emergency2firstName: emergency2firstName,
     emergency2familyName: emergency2familyName,
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
     emailSignature: '<div class="gmail_signature" style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif; font-size:14px"><div><b><span style="color:#004a8d">'+Personalinfo.findOne({ createdBy: creator }).firstName+' '+Personalinfo.findOne({ createdBy: creator }).familyName+'<br></span></b></div><div>'+ positionPhilicotest +'</div><br><div><a href="tel:' + '+' + mobilecountryCode + mobilePhone + '" target="_blank">' + signteltest +'</a></div><div><a href="mailto:'+Personalinfo.findOne({ createdBy: creator }).email+'" target="_blank">'+Personalinfo.findOne({ createdBy: creator }).email+'</a></div><br><div><span>Philico AG</span></div><div><span>Sonder 16</span></div><div><span>CH-9042 Speicher</span></div><div><span><a href="http://www.philico.com" target="_blank">www.philico.com</a></span></div></div>',
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
          technicalSkills: technicalSkills,
          communicationSkillsHTML: communicationSkills.replace(/\r?\n/g, '<br />'),
          businessSkillsHTML: businessSkills.replace(/\r?\n/g, '<br />'),
          technicalSkillsHTML: technicalSkills.replace(/\r?\n/g, '<br />')}]}
      } 
    })
  },

  addExperience: function(projectCompany, projectStartdatemonth, projectStartdateyear, projectStartdate, projectEnddate, projectClient, projectClientcity, projectClientcountry, projectClientdepartment, projectTitle, projectDescription, creator) {
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
        projectClientcountry: projectClientcountry,
        projectClientdepartment: projectClientdepartment, 
        projectTitle: projectTitle,  
        projectDescription: projectDescription, 
        projectDescriptionHTML: projectDescription.replace(/\r?\n/g, '<br />')}],
        $sort: { projectStartdateyear: -1 , projectStartdatemonth: -1 },
        $slice: -50
        } 
      }
      }
    )   
  },

  deleteExperience: function(id) {
    Personalinfo.update(
    { },
    { $pull: { experiences: { _id : id } } },
    { multi: true }
    );
  },

  addEmployment: function(employmentStartdatemonth, employmentStartdateyear, employmentStartdate, employmentEnddate, employmentCompany, employmentCity, employmentCountry, employmentPosition, creator) {
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
        employmentCountry, employmentCountry,
        employmentPosition: employmentPosition,
        employmentPositionHTML: employmentPosition.replace(/\r?\n/g, '<br />')}],
        $sort: { employmentStartdateyear: -1, employmentStartdatemonth: -1},
        $slice: -50
       } 
      }
      })   
  },

  deleteEmployment: function(id) {
    Personalinfo.update(
    { },
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
    { },
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
    { },
    { $pull: { languages: { _id : id} } },
    { multi: true }
    );
  },
});