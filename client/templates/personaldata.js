Template.personaldata.helpers({
  personalinfo: function () {
    return Personalinfo.find({createdBy: this._id})
  },

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
  }

});


  
Template.personaldata.events({
  "submit .displayDetails": function (event) {
    event.preventDefault();
    var displayPhoto=event.target.displayPhoto.value;
    var displayAddress=event.target.displayAddress.value;
    var displayContact=event.target.displayContact.value;
    Meteor.call("showDetails", this.email, displayPhoto, displayAddress, displayContact);
    alert("Your preferences have been submitted successfully !!!");
  },

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
      var imageId=this.image.slice(18,this.image.length)
    }
    
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