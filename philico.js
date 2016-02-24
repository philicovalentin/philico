Personalinfo = new Mongo.Collection("personalinfo");
var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
 stores: [imageStore]
});

Images.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

Images.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});


if (Meteor.isClient) {
  Meteor.subscribe('personalinfo');
  Meteor.subscribe('images');

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
      'click #clickme': function () {
        window.open('/cv/walidosbh@gmail.com', "_self");
        console.log("1");
        window.focus();
        console.log("1.5");
        setTimeout(function(){ window.print(); }, 7000);
        console.log("2");
        window.onfocus=function(){ window.open('/', "_self");};
        console.log("3");
      },

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
    personalinfo: function () {
      return Personalinfo.find({createdBy:Meteor.user()._id})},
  });

  Template.cv.helpers({
    personalinfo: function () {
      return Personalinfo.find({ createdBy : this._id })},
    });

  Template.personaldata.helpers({
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

    'click #clickme': function () {
        event.preventDefault();
        Router.go('/personaldata/'+this.email);
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
      if (!myDocument1.domicilePhone || event.target.domicilePhone.value!==myDocument1.domicilePhone || (event.target.domicilecountryCode.value!==myDocument1.domicilecountryCode.substring(1) && event.target.domicilePhone.value!==myDocument1.domicilePhone)) {
        var domicilecountryCode=event.target.domicilecountryCode.value} else {
          var domicilecountryCode=myDocument1.domicilecountryCode.substring(1)};
      var domicilePhone=event.target.domicilePhone.value;
      if (!myDocument1.mobilePhone || event.target.mobilePhone.value!==myDocument1.mobilePhone || (event.target.mobilecountryCode.value!==myDocument1.mobilecountryCode.substring(1) && event.target.mobilePhone.value!==myDocument1.mobilePhone)) {
        var mobilecountryCode=event.target.mobilecountryCode.value} else {
          var mobilecountryCode=myDocument1.mobilecountryCode.substring(1)};
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

      'change .myFileInput': function(event, template) {
        event.preventDefault();
        var email=this.email;
        if (this.image){
        var imageId=this.image.slice(18,this.image.length)}
        FS.Utility.eachFile(event, function(file) {
          var extension=file.name.substr(file.name.length - 4);
          if (extension!==".png" && extension!==".jpg" && extension!==".gif" && extension!==".tif") {
           alert("File must be '.jpg', '.png', '.gif', '.tif'. Verify your file !!!")}
          else{
          Images.insert(file, function (err, fileObj) {
            if (err) {
              alert("Error !!!")
            } else {
               // handle success depending what you need to do
              if (imageId){
              Images.remove({_id: imageId});
            };
              location.reload();
              Meteor.call("addimage", email, {"image": "/cfs/files/images/" + fileObj._id}, fileObj._id);
              alert("Your photo has been submitted successfully !!!")  
            }
          })
        }
       })
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

  Template.projectassessment.helpers({
    personalinfo: function () {
      return Personalinfo.find({createdBy: this._id})}
    });

  Template.projectassessment.events({
    "submit .new-assessment": function (event) {
      event.preventDefault();
      var positionPhilico= event.target.positionPhilico.value;
      var coachName = event.target.coachName.value;
      var projectName = event.target.projectName.value;
      var objectivesDate = event.target.objectivesDate.value;
      var objectivesWith = event.target.objectivesWith.value;
      var positionDifficulty = event.target.positionDifficulty.value;
      var manDays = event.target.manDays.value;
      var assessmentFrom = event.target.assessmentFrom.value;
      var assessmentTo = event.target.assessmentTo.value;
      var assessmentDate = event.target.assessmentDate.value;
      var assessmentBy = event.target.assessmentBy.value;
      var assessmentType = event.target.assessmentType.value;
      var pcpClient = event.target.pcpClient.value;
      var pcpEducation = event.target.pcpEducation.value;
      var pcpInternal = event.target.pcpInternal.value;
      var projectDescription = event.target.projectDescription.value;
      var projectIndividualRole = event.target.projectIndividualRole.value;
      var projectObjectives = event.target.projectObjectives.value;
      var overallSelfEvaluation = event.target.overallSelfEvaluation.value;
      var overallCoachstrengths = event.target.overallCoachstrengths.value;
      var overallCoachweaknesses = event.target.overallCoachweaknesses.value;
      var overallPerformanceRating = event.target.overallPerformanceRating.value;
      var consultingSelfEvaluation = event.target.consultingSelfEvaluation.value;
      var consultingCoachstrengths = event.target.consultingCoachstrengths.value;
      var consultingCoachweaknesses = event.target.consultingCoachweaknesses.value;
      var consultingclientcentricityrating = event.target.consultingclientcentricityrating.value;
      var consultingnegotiationrating = event.target.consultingnegotiationrating.value;
      var consultingmethodologyrating = event.target.consultingmethodologyrating.value;
      var consultinganalyticalrating = event.target.consultinganalyticalrating.value;
      var consultingmanagementrating = event.target.consultingmanagementrating.value;
      var technicalSelfEvaluation = event.target.technicalSelfEvaluation.value;
      var technicalCoachstrengths = event.target.technicalCoachstrengths.value;
      var technicalCoachweaknesses = event.target.technicalCoachweaknesses.value;
      var technicalbroadavaloqrating = event.target.technicalbroadavaloqrating.value;
      var technicaldeepavaloqrating = event.target.technicaldeepavaloqrating.value;
      var technicalskillsrating = event.target.technicalskillsrating.value;
      var technicalobjectmodellingrating = event.target.technicalobjectmodellingrating.value;
      var functionalSelfEvaluation = event.target.functionalSelfEvaluation.value;
      var functionalCoachstrengths = event.target.functionalCoachstrengths.value;
      var functionalCoachweaknesses = event.target.functionalCoachweaknesses.value;
      var functionalbroadbankingrating = event.target.functionalbroadbankingrating.value;
      var functionalspecificbankingrating = event.target.functionalspecificbankingrating.value;
      var functionalexperiencerating = event.target.functionalexperiencerating.value;
      var functionalmarketrating = event.target.functionalmarketrating.value;
      var softSelfEvaluation = event.target.softSelfEvaluation.value;
      var softCoachstrengths = event.target.softCoachstrengths.value;
      var softCoachweaknesses = event.target.softCoachweaknesses.value;
      var softsocialrating = event.target.softsocialrating.value;
      var softleadershiprating = event.target.softleadershiprating.value;
      var softseniorityrating = event.target.softseniorityrating.value;
      var softpressurerating = event.target.softpressurerating.value;
      var finalRating = event.target.finalRating.value;

      Meteor.call('addInterimAssessment', positionPhilico, coachName, projectName, objectivesDate, objectivesWith, positionDifficulty, manDays, assessmentFrom,
      assessmentTo, assessmentDate, assessmentBy, assessmentType, pcpClient, pcpEducation, pcpInternal, projectDescription, projectIndividualRole,
      projectObjectives, overallSelfEvaluation, overallCoachstrengths, overallCoachweaknesses, overallPerformanceRating, consultingSelfEvaluation, 
      consultingCoachstrengths, consultingCoachweaknesses, consultingclientcentricityrating, consultingnegotiationrating, consultingmethodologyrating, 
      consultinganalyticalrating, consultingmanagementrating, technicalSelfEvaluation, technicalCoachstrengths, technicalCoachweaknesses, 
      technicalbroadavaloqrating, technicaldeepavaloqrating, technicalskillsrating, technicalobjectmodellingrating, functionalSelfEvaluation, 
      functionalCoachstrengths, functionalCoachweaknesses, functionalbroadbankingrating, functionalspecificbankingrating, 
      functionalexperiencerating, functionalmarketrating, softSelfEvaluation, softCoachstrengths, softCoachweaknesses, softsocialrating, 
      softleadershiprating, softseniorityrating, softpressurerating, finalRating, this.email);
      alert("Your assessment has been submitted successfully !!!");
    },

    "submit .new-version": function (event) {
      event.preventDefault();
      Meteor.call('addNewVersion', this.email);
    },
  })


};

Router.route('/', {
    template: 'home'});

Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params
  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    Router.go('/'); 
    this.next();
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
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
    }
 });

Router.route('/signature');
Router.route('/projectassessment/:email', {
    template: 'projectassessment',
    data: function(){
        var currentpersonal = this.params.email;
        return Personalinfo.findOne({ email: currentpersonal });
    }});

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
  
  Meteor.publish("images", function() { 
    idAdmin=this.userId;
    if (idAdmin==="walid.benhammoud@philico.com" || idAdmin==="fabian.knecht@philico.com" || idAdmin==="alex.mueller@philico.com" || idAdmin==="fabien.roth@philico.com")
      {return Images.find({})} else {return Images.find({owner:idAdmin})}
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
  user.profile.profile_picture = user.services.google.picture;
  }
  return user; });

};
  

Meteor.methods({
  addimage: function (theemail, imagesURL, id) {
    Personalinfo.update(
      { _id: Personalinfo.findOne({ createdBy: theemail })._id},
      { $set: imagesURL})
    Images.update(
      { _id: id},
      { $set: 
        { owner: theemail } 
      })
  },

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
      emailSignature: '<div class="gmail_signature" style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif; font-size:14px"><div><b><span style="color:#004a8d">'+given_name+' '+family_name+'<br></span></b></div><div><span style="color:red">Missing phone number</span></div><br><div><a href="tel:+" target="_blank"><span style="color:red">Missing position</span></a></div><div><a href="mailto:'+email+'" target="_blank">'+email+'</a></div><br><div><span>Philico AG</span></div><div><span>Sonder 16</span></div><div><span>CH-9042 Speicher</span></div><div><span><a href="http://www.philico.com" target="_blank">www.philico.com</a></span></div></div>',
      assessment: [{
          _id: (new Date()).getTime(),
          fullName: given_name+' '+family_name,
          positionPhilico: null,
          coachName : null,
          projectName : null,
          objectivesDate : null,
          objectivesWith : null,
          positionDifficulty : null,
          manDays : null,
          assessmentFrom : null,
          assessmentTo : null,
          assessmentDate : null,
          assessmentBy : null,
          assessmentType : null,
          pcpClient : null,
          pcpEducation : null,
          pcpInternal : null,
          projectDescription : null,
          projectIndividualRole : null,
          projectObjectives : null,
          overallSelfEvaluation : null,
          overallCoachstrengths : null,
          overallCoachweaknesses : null,
          overallPerformanceRating : null,
          consultingSelfEvaluation : null,
          consultingCoachstrengths : null,
          consultingCoachweaknesses : null,
          consultingclientcentricityrating : null,
          consultingnegotiationrating : null,
          consultingmethodologyrating : null,
          consultinganalyticalrating : null,
          consultingmanagementrating : null,
          technicalSelfEvaluation : null,
          technicalCoachstrengths : null,
          technicalCoachweaknesses : null,
          technicalbroadavaloqrating : null,
          technicaldeepavaloqrating : null,
          technicalskillsrating : null,
          technicalobjectmodellingrating : null,
          functionalSelfEvaluation : null,
          functionalCoachstrengths : null,
          functionalCoachweaknesses : null,
          functionalbroadbankingrating : null,
          functionalspecificbankingrating : null,
          functionalexperiencerating : null,
          functionalmarketrating : null,
          softSelfEvaluation : null,
          softCoachstrengths : null,
          softCoachweaknesses : null,
          softsocialrating : null,
          softleadershiprating : null,
          softseniorityrating : null,
          softpressurerating : null,
          finalRating : null,
          createdAt: new Date(),
        }],
      assessmentfinals: new Array(),
      });
  };
  },
  
  addPersonalinfo: function(firstName, familyName, email, addressStreet, addressNumber, addressZip, addressCity, addressCountry, nationality1, nationality2, nationality3,
     sourcetaxed, domicilecountryCode, domicilePhone, mobilecountryCode, mobilePhone, birthDate, ahvNumber, startDatephilico, positionPhilico, marriageDate, spousefamilyName, spousefirstName, child1Name, child1Birthdate, child2Name, child2Birthdate,
     child3Name, child3Birthdate, emergency1firstName, emergency1familyName, emergency1Relation, emergency1Phone, emergency2firstName, emergency2familyName, emergency2Relation, emergency2Phone, CHbankName, CHbankCity, CHbankZip, CHbankIban,
     CHbankAccountnumber, CHbankAccountname, EURbankName, EURbankCity, EURbankZip, EURbankIban, EURbankAccountnumber, EURbankAccountname, creator) {
    var signatureteltest="";
    if (mobilePhone.toString().length===0) {signteltest=""} else {signteltest="+" + mobilecountryCode + " " + mobilePhone};
    if (signteltest==="") {signatureteltest='<span style="color:red">Missing phone number</span>'} else {signatureteltest="<span>"+signteltest+"</span>"};
    var positionPhilicotest="";
    if (positionPhilico.length===0){positionPhilicotest='<span style="color:red">Missing position</span>'} else {positionPhilicotest="<span>"+positionPhilico+"</span>"};
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
     signatureTel: signatureteltest,
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
     emailSignature: '<div class="gmail_signature" style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif; font-size:14px"><div><b><span style="color:#004a8d">'+Personalinfo.findOne({ createdBy: creator }).firstName+' '+Personalinfo.findOne({ createdBy: creator }).familyName+'<br></span></b></div><div>'+ positionPhilicotest +'</div><br><div><a href="tel:' + '+' + mobilecountryCode + mobilePhone + '" target="_blank">' + signatureteltest +'</a></div><div><a href="mailto:'+Personalinfo.findOne({ createdBy: creator }).email+'" target="_blank">'+Personalinfo.findOne({ createdBy: creator }).email+'</a></div><br><div><span>Philico AG</span></div><div><span>Sonder 16</span></div><div><span>CH-9042 Speicher</span></div><div><span><a href="http://www.philico.com" target="_blank">www.philico.com</a></span></div></div>',
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

  addInterimAssessment: function(coachName, projectName, objectivesDate, objectivesWith, positionDifficulty, manDays, assessmentFrom,
      assessmentTo, assessmentDate, assessmentBy, assessmentType, pcpClient, pcpEducation, pcpInternal, projectDescription, projectIndividualRole,
      projectObjectives, overallSelfEvaluation, overallCoachstrengths, overallCoachweaknesses, overallPerformanceRating, consultingSelfEvaluation, 
      consultingCoachstrengths, consultingCoachweaknesses, consultingclientcentricityrating, consultingnegotiationrating, consultingmethodologyrating, 
      consultinganalyticalrating, consultingmanagementrating, technicalSelfEvaluation, technicalCoachstrengths, technicalCoachweaknesses, 
      technicalbroadavaloqrating, technicaldeepavaloqrating, technicalskillsrating, technicalobjectmodellingrating, functionalSelfEvaluation, 
      functionalCoachstrengths, functionalCoachweaknesses, functionalbroadbankingrating, functionalspecificbankingrating, 
      functionalexperiencerating, functionalmarketrating, softSelfEvaluation, softCoachstrengths, softCoachweaknesses, softsocialrating, 
      softleadershiprating, softseniorityrating, softpressurerating, finalRating, email) {

  Personalinfo.update(
    {_id: Personalinfo.findOne({ createdBy: email })._id },
    { $pull: { assessment: {} } },
    { multi: true }
    );

  Personalinfo.update(Personalinfo.findOne({ createdBy: email })._id,
    { $push: {
      assessment: {
        $each: [{
          _id: (new Date()).getTime(),
          fullName: Personalinfo.findOne({ createdBy: email }).fullName,
          positionPhilico: positionPhilico,
          coachName : coachName,
          projectName : projectName,
          objectivesDate : objectivesDate,
          objectivesWith : objectivesWith,
          positionDifficulty : positionDifficulty,
          manDays : manDays,
          assessmentFrom : assessmentFrom,
          assessmentTo : assessmentTo,
          assessmentDate : assessmentDate,
          assessmentBy : assessmentBy,
          assessmentType : assessmentType,
          pcpClient : pcpClient.replace(/\r?\n/g, '<br />'),
          pcpEducation : pcpEducation.replace(/\r?\n/g, '<br />'),
          pcpInternal : pcpInternal.replace(/\r?\n/g, '<br />'),
          projectDescription : projectDescription.replace(/\r?\n/g, '<br />'),
          projectIndividualRole : projectIndividualRole.replace(/\r?\n/g, '<br />'),
          projectObjectives : projectObjectives.replace(/\r?\n/g, '<br />'),
          overallSelfEvaluation : overallSelfEvaluation.replace(/\r?\n/g, '<br />'),
          overallCoachstrengths : overallCoachstrengths.replace(/\r?\n/g, '<br />'),
          overallCoachweaknesses : overallCoachweaknesses.replace(/\r?\n/g, '<br />'),
          overallPerformanceRating : overallPerformanceRating,
          consultingSelfEvaluation : consultingSelfEvaluation.replace(/\r?\n/g, '<br />'),
          consultingCoachstrengths : consultingCoachstrengths.replace(/\r?\n/g, '<br />'),
          consultingCoachweaknesses : consultingCoachweaknesses.replace(/\r?\n/g, '<br />'),
          consultingclientcentricityrating : consultingclientcentricityrating,
          consultingnegotiationrating : consultingnegotiationrating,
          consultingmethodologyrating : consultingmethodologyrating,
          consultinganalyticalrating : consultinganalyticalrating,
          consultingmanagementrating : consultingmanagementrating,
          technicalSelfEvaluation : technicalSelfEvaluation.replace(/\r?\n/g, '<br />'),
          technicalCoachstrengths : technicalCoachstrengths.replace(/\r?\n/g, '<br />'),
          technicalCoachweaknesses : technicalCoachweaknesses.replace(/\r?\n/g, '<br />'),
          technicalbroadavaloqrating : technicalbroadavaloqrating,
          technicaldeepavaloqrating : technicaldeepavaloqrating,
          technicalskillsrating : technicalskillsrating,
          technicalobjectmodellingrating : technicalobjectmodellingrating,
          functionalSelfEvaluation : functionalSelfEvaluation.replace(/\r?\n/g, '<br />'),
          functionalCoachstrengths : functionalCoachstrengths.replace(/\r?\n/g, '<br />'),
          functionalCoachweaknesses : functionalCoachweaknesses.replace(/\r?\n/g, '<br />'),
          functionalbroadbankingrating : functionalbroadbankingrating,
          functionalspecificbankingrating : functionalspecificbankingrating,
          functionalexperiencerating : functionalexperiencerating,
          functionalmarketrating : functionalmarketrating,
          softSelfEvaluation : softSelfEvaluation.replace(/\r?\n/g, '<br />'),
          softCoachstrengths : softCoachstrengths.replace(/\r?\n/g, '<br />'),
          softCoachweaknesses : softCoachweaknesses.replace(/\r?\n/g, '<br />'),
          softsocialrating : softsocialrating,
          softleadershiprating : softleadershiprating,
          softseniorityrating : softseniorityrating,
          softpressurerating : softpressurerating,
          finalRating : finalRating,
          createdAt: new Date(),
        }],
    }
    } 
    })
  },

  addNewVersion: function (email) {
  Personalinfo.update(
    {_id: Personalinfo.findOne({ createdBy: email })._id },
    { $pull: { assessmentfinals: {} } },
    { multi: true }
    );

    Personalinfo.update(Personalinfo.findOne({ createdBy: email })._id,
    { $push: {
      assessmentfinals: {
        $each: [{
          _id: (new Date()).getTime(),
          createdAt: new Date(),
          fullName: Personalinfo.findOne({ createdBy: email }).assessment[0].fullName,
          positionPhilico: Personalinfo.findOne({ createdBy: email }).assessment[0].positionPhilico,
          coachName : Personalinfo.findOne({ createdBy: email }).assessment[0].coachName,
          projectName : Personalinfo.findOne({ createdBy: email }).assessment[0].projectName,
          objectivesDate : Personalinfo.findOne({ createdBy: email }).assessment[0].objectivesDate,
          objectivesWith : Personalinfo.findOne({ createdBy: email }).assessment[0].objectivesWith,
          positionDifficulty : Personalinfo.findOne({ createdBy: email }).assessment[0].positionDifficulty,
          manDays : Personalinfo.findOne({ createdBy: email }).assessment[0].manDays,
          assessmentFrom : Personalinfo.findOne({ createdBy: email }).assessment[0].assessmentFrom,
          assessmentTo : Personalinfo.findOne({ createdBy: email }).assessment[0].assessmentTo,
          assessmentDate : Personalinfo.findOne({ createdBy: email }).assessment[0].assessmentDate,
          assessmentBy : Personalinfo.findOne({ createdBy: email }).assessment[0].assessmentBy,
          assessmentType : Personalinfo.findOne({ createdBy: email }).assessment[0].assessmentType,
          pcpClient : Personalinfo.findOne({ createdBy: email }).assessment[0].pcpClient,
          pcpEducation : Personalinfo.findOne({ createdBy: email }).assessment[0].pcpEducation,
          pcpInternal : Personalinfo.findOne({ createdBy: email }).assessment[0].pcpInternal,
          projectDescription : Personalinfo.findOne({ createdBy: email }).assessment[0].projectDescription,
          projectIndividualRole : Personalinfo.findOne({ createdBy: email }).assessment[0].projectIndividualRole,
          projectObjectives : Personalinfo.findOne({ createdBy: email }).assessment[0].projectObjectives,
          overallSelfEvaluation : Personalinfo.findOne({ createdBy: email }).assessment[0].overallSelfEvaluation,
          overallCoachstrengths : Personalinfo.findOne({ createdBy: email }).assessment[0].overallCoachstrengths,
          overallCoachweaknesses : Personalinfo.findOne({ createdBy: email }).assessment[0].overallCoachweaknesses,
          overallPerformanceRating : Personalinfo.findOne({ createdBy: email }).assessment[0].overallPerformanceRating,
          consultingSelfEvaluation : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingSelfEvaluation,
          consultingCoachstrengths : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingCoachstrengths,
          consultingCoachweaknesses : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingCoachweaknesses,
          consultingclientcentricityrating : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingclientcentricityrating,
          consultingnegotiationrating : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingnegotiationrating,
          consultingmethodologyrating : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingmethodologyrating,
          consultinganalyticalrating : Personalinfo.findOne({ createdBy: email }).assessment[0].consultinganalyticalrating,
          consultingmanagementrating : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingmanagementrating,
          technicalSelfEvaluation : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalSelfEvaluation,
          technicalCoachstrengths : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalCoachstrengths,
          technicalCoachweaknesses : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalCoachweaknesses,
          technicalbroadavaloqrating : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalbroadavaloqrating,
          technicaldeepavaloqrating : Personalinfo.findOne({ createdBy: email }).assessment[0].technicaldeepavaloqrating,
          technicalskillsrating : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalskillsrating,
          technicalobjectmodellingrating : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalobjectmodellingrating,
          functionalSelfEvaluation : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalSelfEvaluation,
          functionalCoachstrengths : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalCoachstrengths,
          functionalCoachweaknesses : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalCoachweaknesses,
          functionalbroadbankingrating : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalbroadbankingrating,
          functionalspecificbankingrating : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalspecificbankingrating,
          functionalexperiencerating : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalexperiencerating,
          functionalmarketrating : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalmarketrating,
          softSelfEvaluation : Personalinfo.findOne({ createdBy: email }).assessment[0].softSelfEvaluation,
          softCoachstrengths : Personalinfo.findOne({ createdBy: email }).assessment[0].softCoachstrengths,
          softCoachweaknesses : Personalinfo.findOne({ createdBy: email }).assessment[0].softCoachweaknesses,
          softsocialrating : Personalinfo.findOne({ createdBy: email }).assessment[0].softsocialrating,
          softleadershiprating : Personalinfo.findOne({ createdBy: email }).assessment[0].softleadershiprating,
          softseniorityrating : Personalinfo.findOne({ createdBy: email }).assessment[0].softseniorityrating,
          softpressurerating : Personalinfo.findOne({ createdBy: email }).assessment[0].softpressurerating,
          finalRating : Personalinfo.findOne({ createdBy: email }).assessment[0].finalRating,
          finalinterimDate: Personalinfo.findOne({ createdBy: email }).assessment[0].createdAt,
        }],
    }
    } 
    })
  },
});