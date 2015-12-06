Personalinfo = new Mongo.Collection("personalinfo");
Languages = new Mongo.Collection("languages");
Degrees = new Mongo.Collection("degrees");
Experiences = new Mongo.Collection("experiences");
/*Accounts = new Mongo.Collection("accounts");
*/

var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
 stores: [imageStore]
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
  // This code only runs on the client
  Template.body.helpers({
    
    personalinfo: function () {
      return Personalinfo.find()},

    languages: function () {
       return Languages.find()},

    degrees: function () {
      return Degrees.find({checked: {$ne: true}});},

    experiences: function () {
      return Experiences.find({checked: {$ne: true}});},

  });

  Template.dashboard.helpers ({
      emailVar: function(){
      return Session.get("emailVar");
      }
  });
  
  
Template.body.events({
    "change .myFileInput": function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function (err, fileObj) {
          if (err){
             // handle error
          } else {
             // handle success depending what you need to do
            var userId = Meteor.userId();
            var imagesURL = {
              "profile.image": "/Philico/philico/images/" + fileObj._id
            };
            Meteor.users.update(userId, {$set: imagesURL});
          }
        })
      })
    },
    
    "submit .new-profile": function (event) {
      // Prevent default browser form submit
      if (event.target.accname.value=="")
        {return false;}
      else {
    event.preventDefault();
    var finame=event.target.finame.value;
    var faname=event.target.faname.value;
    var street=event.target.street.value;
    var zip=event.target.zip.value;
    var city=event.target.city.value;
    var nationality=event.target.nationality.value;
    var sourcetax=(event.target.sourcetaxed===true);
    var dnumber=event.target.dnumber.value;
    var mnumber=event.target.mnumber.value;
    var birth=event.target.birth.value;
    var ahv=event.target.ahv.value;
    var sdate=event.target.sdate.value;
    var mdate=event.target.mdate.value;
    var sfaname=event.target.sfaname.value;
    var sfiname=event.target.sfiname.value;
    var ch1name=event.target.ch1name.value;
    var ch1bdate=event.target.ch1bdate.value;
    var ch2name=event.target.ch2name.value;
    var ch2bdate=event.target.ch2bdate.value;
    var ch3name=event.target.ch3name.value;
    var ch3bdate=event.target.ch3bdate.value;
    var em1name=event.target.em1name.value;
    var relation1=event.target.relation1.value;
    var phone1=event.target.phone1.value;
    var em2name=event.target.em2name.value;
    var relation2=event.target.relation2.value;
    var phone2=event.target.phone2.value;
    var bankname=event.target.bankname.value;
    var bankplace=event.target.bankplace.value;
    var bankzip=event.target.bankzip.value;
    var iban=event.target.iban.value;
    var accnbr=event.target.accnbr.value;
    var accname=event.target.accname.value;
    var eurbankname=event.target.eurbankname.value;
    var eurbankplace=event.target.eurbankplace.value;
    var eurbankzip=event.target.eurbankzip.value;
    var euriban=event.target.euriban.value;
    var euraccnbr=event.target.euraccnbr.value;
    var euraccname=event.target.euraccname.value;
    
   

    Personalinfo.insert({
     faname: faname,
     street: street,
     zip: zip,
     city: city,
     nationality: nationality,
     sourcetax: sourcetax,
     dnumber: dnumber,
     mnumber: mnumber,
     birth: birth,
     ahv: ahv,
     sdate: sdate,
     mdate: mdate,
     sfaname: sfaname,
     sfiname: sfiname,
     ch1name: ch1name,
     ch1bdate: ch1bdate,
     ch2name: ch2name,
     ch2bdate: ch2bdate,
     ch3name: ch3name,
     ch3bdate: ch3bdate,
     em1name: em1name,
     relation1: relation1,
     phone1: phone1,
     em2name: em2name,
     relation2: relation2,
     phone2: phone2,
     bankname: bankname,
     bankplace: bankplace,
     bankzip: bankzip,
     iban: iban,
     accnbr: accnbr,
     accname: accname,
     eurbankname: eurbankname,
     eurbankplace: eurbankplace,
     eurbankzip: eurbankzip,
     euriban: euriban,
     euraccnbr: euraccnbr,
     euraccname: euraccname,
     createdAt: new Date(),
     owner: Meteor.userId(),
     /*username: Meteor.user().username*/  // username of logged in user
    });

    event.target.finame.value;
    event.target.faname.value;
    event.target.street.value;
    event.target.zip.value;
    event.target.city.value;
    event.target.nationality.value;
    /*if(sourcetax==true){sourcetaxed=checked};*/
    event.target.dnumber.value;
    event.target.mnumber.value;
    event.target.birth.value;
    event.target.ahv.value;
    event.target.sdate.value;
    event.target.mdate.value;
    event.target.sfaname.value;
    event.target.sfiname.value;
    event.target.ch1name.value;
    event.target.ch1bdate.value;
    event.target.ch2name.value;
    event.target.ch2bdate.value;
    event.target.ch3name.value;
    event.target.ch3bdate.value;
    event.target.em1name.value;
    event.target.relation1.value;
    event.target.phone1.value;
    event.target.em2name.value;
    event.target.relation2.value;
    event.target.phone2.value;
    event.target.bankname.value;
    event.target.bankplace.value;
    event.target.bankzip.value;
    event.target.iban.value;
    event.target.accnbr.value;
    event.target.accname.value;
    event.target.eurbankname.value;
    event.target.eurbankplace.value;
    event.target.eurbankzip.value;
    event.target.euriban.value;
    event.target.euraccnbr.value;
    event.target.euraccname.value;
  }},



    "submit .new-language": function (event) {
      // Prevent default browser form submit
      if (event.target.langue.value=="" || event.target.skill.value=="")
        {return false;}
      else {
      event.preventDefault();
      // Get value from form element
      var langue = event.target.langue.value;
      var skill= event.target.skill.value;
      // Insert a task into the collection
        Languages.insert({
          langue: langue,
          skill: skill,
          createdAt: new Date(),            // current time
          owner: Meteor.userId(),           // _id of logged in user
        /*username: Meteor.user().username*/  // username of logged in user
      });
      // Clear form
      event.target.langue.value = "";
      event.target.skill.value = "";
    }},

     "submit .new-degree": function (event) {
      // Prevent default browser form submit
      if (event.target.ddate.value=="" && event.target.dip.value=="" && event.target.uni.value=="")
        {return false;}
      else {
      event.preventDefault();
      // Get value from form element
      var ddate = event.target.ddate.value;
      var dip = event.target.dip.value;
      var uni = event.target.uni.value;
      // Insert a task into the collection
        Degrees.insert({
          ddate: ddate,
          dip: dip,
          uni: uni,
          createdAt: new Date(), 
          owner: Meteor.userId(),
        /*username: Meteor.user().username*/
      });
      // Clear form
      event.target.ddate.value = "";
      event.target.dip.value = "";
      event.target.uni.value = "";
    }},

     "submit .new-experience": function (event) {
      // Prevent default browser form submit
      if (event.target.stdate.value=="" && event.target.enddate.value=="" && event.target.company.value=="" && event.target.jobtitle.value=="" && event.target.explanation.value=="")
        {return false;}
      else {
      event.preventDefault();
      // Get value from form element
      var stdate = event.target.stdate.value;
      var enddate = event.target.enddate.value;
      var company = event.target.company.value;
      var jobtitle = event.target.jobtitle.value;
      var explanation = event.target.explanation.value;
      // Insert a task into the collection
      Experiences.insert({
        stdate: stdate,
        enddate: enddate,
        company: company,
        jobtitle: jobtitle,
        explanation: explanation,
        createdAt: new Date(),
        owner: Meteor.userId(),   
        /*username: Meteor.user().username*/
      });
      // Clear form
      event.target.stdate.value = "";
      event.target.enddate.value = "";
      event.target.company.value = "";
      event.target.jobtitle.value = "";
      event.target.explanation.value = "";
    }},
  });
  
Template.language.events({  
  "click .delete": function () {
    Languages.remove(this._id);
  }
});

Template.degree.events({
  "click .delete": function () {
    Degrees.remove(this._id);
  }
});

Template.experience.events({
  "click .delete": function () {
    Experiences.remove(this._id);
  }
});
 
Template.register.events({
        'submit form': function(event) {
            event.preventDefault();
            var message = document.getElementById("regmail");
            message.innerHTML= "";
            var emailVar = event.target.registerEmail.value;
            var passwordVar = event.target.registerPassword.value;
            if (emailVar.indexOf('@philico.com') == -1) {message.innerHTML= "Please use your Philico's email address"}
           else{
            Accounts.createUser({
            email: emailVar,
            password: passwordVar
        });
        }
        }
    });

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
    }
});


Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

}
