Personalinfo = new Mongo.Collection("personalinfo");


if (Meteor.isClient) {
  Meteor.subscribe('');
  /*Meteor.subscribe('personalinfo');*/

  Template.navigation.helpers({
    initialisation: function () {
    if (!(Personalinfo.findOne({ createdBy: Meteor.userId() }))) {
    Personalinfo.insert({
      createdBy: Meteor.user()._id,
      finame: Meteor.user().services.google.given_name,
      finameup: Meteor.user().services.google.given_name.toUpperCase(),
      faname: Meteor.user().services.google.family_name,
      fanameup: Meteor.user().services.google.family_name.toUpperCase(),
      email: Meteor.user().services.google.email,
      street: "",
      addnbr: "",
      zip: "",
      city: "",
      addcountry:"",
      nationality1: "",
      nationality2: "",
      nationality3: "",
      sourcetaxed: "?",
      dnumber: "",
      mnumber: "",
      signaturetel: "",
      birth: "",
      ahv: "",
      sdate: "",
      phposition: "",
      mdate: "",
      sfaname: "",
      sfiname: "",
      ch1name: "",
      ch1bdate: "",
      ch2name: "",
      ch2bdate: "",
      ch3name: "",
      ch3bdate: "",
      em1name: "",
      relation1: "",
      phone1: "",
      em2name: "",
      relation2: "",
      phone2: "",
      bankname: "",
      bankplace: "",
      bankzip: "",
      iban: "",
      accnbr: "",
      accname: "",
      eurbankname: "",
      eurbankplace: "",
      eurbankzip: "",
      euriban: "",
      euraccnbr: "",
      euraccname: "",
      signature:'',
      createdAt: new Date(),
      competencies: new Array(),  
      experiences: new Array(),
      employments: new Array(),
      degrees: new Array(),
      languages: new Array(),
    });
  console.log('A new collection was created for you')
  }
    },

    personalinfo: function () {
      return Personalinfo.find({ createdBy: Meteor.user()._id})},

    adminrights: function () {
      if(Meteor.user().services.google.email==="fabian.knecht@philico.com" || Meteor.user().services.google.email==="fabien.roth@philico.com" || Meteor.user().services.google.email==="alex.mueller@philico.com" || Meteor.user().services.google.email==="walid.benhammoud@philico.com") 
        {return true} else {return false} },

    adminpersonalinfo: function () {
      return Personalinfo.find({}) },
  });
    
  
  Template.home.helpers({
    personalinfo: function () {
      return Personalinfo.find({createdBy: Meteor.user()._id})},
  });
  
  
  Template.signature.helpers({    
    personalinfo: function () {
      return Personalinfo.find({createdBy: Meteor.user()._id})},
  });

  Template.cv.helpers({  
    personalinfo: function () {
      return Personalinfo.find({ createdBy : this._id })},
    });


  Template.personaldata.helpers({
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
      var street=event.target.street.value;
      var addnbr=event.target.addnbr.value;
      var zip=event.target.zip.value;
      var city=event.target.city.value;
      var addcountry=event.target.addcountry.value;
      var nationality1=event.target.nationality1.value;
      var nationality2=event.target.nationality2.value;
      var nationality3=event.target.nationality3.value;
      var sourcetaxed=event.target.sourcetaxed.value;
      var dnumber=event.target.dnumber.value;
      var mnumber=event.target.mnumber.value;
      var myDocument1 = Personalinfo.findOne({ createdBy: Meteor.user()._id });
      if (!(myDocument1.birth==="")) {var birth=myDocument1.birth} else {birth=event.target.birth.value};
      var myDocument3 = Personalinfo.findOne({ createdBy: Meteor.user()._id });
      if (!(myDocument3.ahv==="")) {var ahv=myDocument3.ahv} else {ahv=event.target.ahv.value};
      var myDocument2 = Personalinfo.findOne({ createdBy: Meteor.user()._id });
      if (!(myDocument2.sdate==="")) {var sdate=myDocument2.sdate} else {sdate=event.target.sdate.value};
      var phposition=event.target.phposition.value;
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
      
      Meteor.call("addPersonalinfo", street, addnbr, zip, city, addcountry, nationality1, nationality2, nationality3,
       sourcetaxed, dnumber, mnumber, birth, ahv, sdate, phposition, mdate, sfaname, sfiname, ch1name, ch1bdate, 
       ch2name, ch2bdate, ch3name, ch3bdate, em1name, relation1, phone1, em2name, relation2, phone2, bankname, 
       bankplace, bankzip, iban, accnbr, accname, eurbankname, eurbankplace, eurbankzip, euriban, euraccnbr, euraccname, Meteor.user()._id);

      alert("Your personal information has been submitted successfully !!!");
     },

      "submit .new-competency": function (event) {
      event.preventDefault();
      var comskill = event.target.comskill.value;
      var businessskill = event.target.businessskill.value;
      var technicalskill = event.target.technicalskill.value;

      Meteor.call("addCompetency", comskill, businessskill, technicalskill, Meteor.user()._id);

      alert("Your core competencies have been submitted successfully !!!");
    },

     "submit .new-experience": function (event) {
      event.preventDefault();
      var company = event.target.company.value;
      var stdatemonth = event.target.stdatemonth.value;
      var stdateyear = event.target.stdateyear.value;
      var stdate = event.target.stdatemonth.value +"."+ event.target.stdateyear.value;
      if (event.target.currentprojcheck.checked) {
        var enddate = "today"} else {
        var enddate = event.target.enddatemonth.value +"."+ event.target.enddateyear.value};
      var customer = event.target.customer.value;
      var customercity = event.target.customercity.value;
      var department = event.target.department.value;
      var projecttitle1 = event.target.projecttitle1.value;
      var projecttitle2 = event.target.projecttitle2.value;
      var projecttitle3 = event.target.projecttitle3.value;
      var projecttitle4 = event.target.projecttitle4.value;
      var projectdescription1 = event.target.projectdescription1.value;
      var projectdescription2 = event.target.projectdescription2.value;
      var projectdescription3 = event.target.projectdescription3.value;
      var projectdescription4 = event.target.projectdescription4.value;
      
      Meteor.call('addExperience', company, stdatemonth, stdateyear, stdate, enddate, customer, customercity, department, projecttitle1, projecttitle2, 
        projecttitle3, projecttitle4, projectdescription1, projectdescription2, projectdescription3, projectdescription4, Meteor.user()._id)
      // Clear form
      event.target.company.value="";
      event.target.stdatemonth.value="";
      event.target.stdateyear.value="";
      if (!(event.target.currentprojcheck.checked)) {
        event.target.enddatemonth.value="";
        event.target.enddateyear.value=""};
      event.target.customer.value="";
      event.target.customercity.value="";
      event.target.department.value="";
      event.target.projecttitle1.value="";
      event.target.projecttitle2.value="";
      event.target.projecttitle3.value="";
      event.target.projecttitle4.value="";
      event.target.projectdescription1.value="";
      event.target.projectdescription2.value="";
      event.target.projectdescription3.value="";
      event.target.projectdescription4.value="";
    },

    "submit .new-employment": function (event) {
      event.preventDefault();
      var empstdatemonth = event.target.empstdatemonth.value;
      var empstdateyear = event.target.empstdateyear.value;
      var empstdate = event.target.empstdatemonth.value +"."+ event.target.empstdateyear.value;
      if (event.target.currentempcheck.checked) {
        var empenddate = "today"} else {
        var empenddate = event.target.empenddatemonth.value +"."+ event.target.empenddateyear.value};
      var empcompany = event.target.empcompany.value;
      var empcity = event.target.empcity.value;
      var empposition = event.target.empposition.value;
      
      Meteor.call('addEmployment', empstdatemonth, empstdateyear, empstdate, empenddate, empcompany, empcity, empposition, Meteor.user()._id )
      // Clear form
      event.target.empstdatemonth.value="";
      event.target.empstdateyear.value="";
      if (!(event.target.currentempcheck.checked)) {
        event.target.empenddatemonth.value="";
        event.target.empenddateyear.value=""};
      event.target.empcompany.value="";
      event.target.empcity.value="";
      event.target.empposition.value="";
    },

      "submit .new-degree": function (event) {
      event.preventDefault();
      var ddatemonth = event.target.ddatemonth.value;
      var ddateyear = event.target.ddateyear.value;
      var ddate = event.target.ddatemonth.value + "." + event.target.ddateyear.value
      var dip = event.target.dip.value;
      var spec = event.target.spec.value;
      var uni = event.target.uni.value;
      var dipcity = event.target.dipcity.value;
      var dipcountry = event.target.dipcountry.value;
      
      Meteor.call('addDegree', ddatemonth, ddateyear, ddate, dip, spec, uni, dipcity, dipcountry, Meteor.user()._id)
      // Clear form
      event.target.ddatemonth.value = "";
      event.target.ddateyear.value = "";
      event.target.dip.value = "";
      event.target.spec.value = "";
      event.target.uni.value = "";
      event.target.dipcity.value = "";
      event.target.dipcountry.value = "";
    },

     "submit .new-language": function (event) {
      event.preventDefault();
      var langue = event.target.langue.value;
      var skill= event.target.skill.value;
      Meteor.call("addLanguage", langue, skill, Meteor.user()._id);
      // Clear form
      event.target.langue.value = "";
      event.target.skill.value = "Mother tongue";
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

Router.route('/personaldata');
Router.route('/signature');

Router.route('/cv/:_id', {
    template: 'cv',
    data: function(){
        var currentcv = this.params._id;
        return Personalinfo.findOne({ _id: currentcv });
    }});


if (Meteor.isServer) {

  Meteor.publish('personaldata', function() {
  if (Personalinfo.findOne().email==="walid.benhammoud@philico.com" || Personalinfo.findOne().email==="fabian.knecht@philico.com" || Personalinfo.findOne().email==="alex.mueller@philico.com" || Personalinfo.findOne().email==="fabien.roth@philico.com")
  {return Personalinfo.find()} else {return Personalinfo.find({owner: this.userId})}});

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

};
  

Meteor.methods({
  addPersonalinfo: function(street, addnbr, zip, city, addcountry, nationality1, nationality2, nationality3,
     sourcetaxed, dnumber, mnumber, birth, ahv, sdate, phposition, mdate, sfaname, sfiname, ch1name, ch1bdate, ch2name, ch2bdate,
     ch3name, ch3bdate, em1name, relation1, phone1, em2name, relation2, phone2, bankname, bankplace, bankzip, iban,
     accnbr, accname, eurbankname, eurbankplace, eurbankzip, euriban, euraccnbr, euraccname, creator) {
    var signteltest="";
    var phpositiontest="";
    var signatureteltest="";
    if (mnumber.toString().length===0) {signteltest=""} else {signteltest="+41 "+ mnumber.slice(0,2)+" "+mnumber.slice(2,5)+" "+mnumber.slice(5,7)+" "+mnumber.slice(7,9)};
    if (signteltest==="") {signatureteltest="Missing phone number"} else {signatureteltest=signteltest}
    if (phposition.length===0){phpositiontest="Missing position"} else {phpositiontest=phposition};
    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
      { $set: 
        {
     street: street,
     addnbr: addnbr,
     zip: zip,
     city: city,
     addcountry: addcountry,
     nationality1: nationality1,
     nationality2: nationality2,
     nationality3: nationality3,
     sourcetaxed: sourcetaxed,
     dnumber: dnumber,
     mnumber: mnumber,
     signaturetel: signteltest,
     birth: birth,
     ahv: ahv,
     sdate: sdate,
     phposition: phposition,
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
     signature: '<div class="gmail_signature" style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif; font-size:14px"><div dir="ltr"><div><div dir="ltr"><span><div><div><div style="word-wrap:break-word"><div style="word-wrap:break-word"><b ><span style="color:#004a8d">'+Personalinfo.findOne({ createdBy: creator }).finame+' '+Personalinfo.findOne({ createdBy: creator }).faname+'<br></span></b><div><div><div><span>'+ phpositiontest +'</span></div><div><br></div><div><div><span>'+ signatureteltest +'</span></div><div><span><a href="mailto:'+Personalinfo.findOne({ createdBy: creator }).email+'" target="_blank">'+Personalinfo.findOne({ createdBy: creator }).email+'</a></span></div></div><div><br></div><div><span>Philico AG</span></div><div><span>Sonder 16</span></div><div><span>CH-9042 Speicher</span></div></div><div><span><a href="http://www.philico.com" target="_blank">www.philico.com</a></span></div></div></div></div></div></div></span></div></div></div></div>',
     createdAt: new Date(),
     }    
    })
  },

  addCompetency: function(comskill, businessskill, technicalskill, creator) {
  Personalinfo.update(
    {_id: Personalinfo.findOne({ createdBy: creator })._id },
    { $pull: { competencies: {} } },
    { multi: true }
    );

    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: 
      {competencies: {
        $each: [{
          comskill: comskill,
          businessskill: businessskill,
          technicalskill: technicalskill}]}
      } 
    })
  },

  addExperience: function(company, stdatemonth, stdateyear, stdate, enddate, customer, customercity, department, projecttitle1, projecttitle2, projecttitle3, projecttitle4, projectdescription1, projectdescription2, projectdescription3, projectdescription4, creator) {
    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: {
      experiences: {
        $each: [{
        _id: (new Date()).getTime(),
        company: company,
        stdatemonth: stdatemonth,
        stdateyear: stdateyear,
        stdate: stdate, 
        enddate: enddate, 
        customer: customer,
        customercity: customercity,
        department: department, 
        projecttitle1: projecttitle1, 
        projecttitle2: projecttitle2, 
        projecttitle3: projecttitle3, 
        projecttitle4: projecttitle4, 
        projectdescription1: projectdescription1, 
        projectdescription2: projectdescription2, 
        projectdescription3: projectdescription3, 
        projectdescription4: projectdescription4}],
        $sort: { stdateyear: -1 , stdatemonth: -1 },
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

  addEmployment: function(empstdatemonth, empstdateyear, empstdate, empenddate, empcompany, empcity, empposition, creator) {
    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: {
      employments: {
        $each: [{
        _id: (new Date()).getTime(),   
        empstdatemonth: empstdatemonth,
        empstdateyear: empstdateyear,
        empstdate: empstdate,
        empenddate: empenddate,
        empcompany: empcompany,
        empcity: empcity,
        empposition: empposition}],
        $sort: { empstdateyear: -1, empstdatemonth: -1},
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
  
  addDegree: function(ddatemonth, ddateyear, ddate, dip, spec, uni, dipcity, dipcountry, creator) {
       Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: {
      degrees: {
        $each: [{
        _id: (new Date()).getTime(),   
        ddatemonth: ddatemonth,
        ddateyear: ddateyear,
        ddate: ddate,
        dip: dip,
        spec: spec,
        uni: uni,
        dipcity: dipcity,
        dipcountry: dipcountry}],
        $sort: { ddateyear: -1 , ddatemonth: -1 },
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

  addLanguage: function(langue, skill, creator) {
    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: {
      languages: {
        $each: [{
        _id: (new Date()).getTime(),
        langue: langue,
        skill: skill}],
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