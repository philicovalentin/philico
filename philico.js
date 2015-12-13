Personalinfo = new Mongo.Collection("personalinfo");
Competencies = new Mongo.Collection("competencies");
Experiences = new Mongo.Collection("experiences");
Employments = new Mongo.Collection("employments");
Degrees = new Mongo.Collection("degrees");
Languages = new Mongo.Collection("languages");


/*var imageStore = new FS.Store.GridFS("images");

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
});*/

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    
    initialisation: function () {
      if (Personalinfo.find({ _id: Meteor.user().emails[0].address}).count() === 0) {
      Personalinfo.insert({
        _id: Meteor.user().emails[0].address,
        email: Meteor.user().emails[0].address,
        finame: "",
        faname: "",
        street: "",
        zip: "",
        city: "",
        nationality1: "",
        nationality2: "",
        nationality3: "",
        sourcetaxed: "no",
        dnumber: "",
        mnumber: "",
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
        competencies: new Array(),  
        experiences: new Array(),
        employments: new Array(),
        degrees: new Array(),
        languages: new Array(),
      });
    }
    },

    personalinfo: function () {
      return Personalinfo.find({_id: Meteor.user().emails[0].address})},

    competencies: function () {
      return Competencies.find({owner: Meteor.user().emails[0].address})},

    experiences: function () {
      return Experiences.find({owner: Meteor.user().emails[0].address})},

    employments: function () {
      return Employments.find({owner: Meteor.user().emails[0].address})},

    degrees: function () {
      return Degrees.find({owner: Meteor.user().emails[0].address})},

    languages: function () {
      return Languages.find({owner: Meteor.user().emails[0].address})},
   
  });


  
Template.body.events({
 /* "submit .new-cv": function (event) {
    function genPDF() {
  html2canvas(document.body, {
    onrendered: function (canvas) {

      var image = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(image, 'JPEG',20,20);
      doc.save('test.pdf');
      }
    });
    }
  },*/

    "submit .newcv": function(event) {
      event.preventDefault();
      Blaze.saveAsPDF(Template.cvtemp, {
      filename: "cv.pdf", // optional, default is "document.pdf"
       // optional, render the template with this data context
      x: 0, // optional, left starting position on resulting PDF, default is 4 units
      y: 0, // optional, top starting position on resulting PDF, default is 4 units
      orientation: "portrait", // optional, "landscape" or "portrait" (default)
      unit: "in", // optional, unit for coordinates, one of "pt", "mm" (default), "cm", or "in"
      format: "letter" // optional, see Page Formats, default is "a4"
    });
    },

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
      event.preventDefault();
      var finame=event.target.finame.value;
      var faname=event.target.faname.value;
      var street=event.target.street.value;
      var zip=event.target.zip.value;
      var city=event.target.city.value;
      var nationality1=event.target.nationality1.value;
      var nationality2=event.target.nationality2.value;
      var nationality3=event.target.nationality3.value;
      var sourcetaxed=event.target.sourcetaxed.value;
      var dnumber=event.target.dnumber.value;
      var mnumber=event.target.mnumber.value;
      var birth=event.target.birth.value;
      var ahv=event.target.ahv.value;
      var sdate=event.target.sdate.value;
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
      
      Meteor.call("addPersonalinfo", finame, faname, street, zip, city, nationality1, nationality2, nationality3,
       sourcetaxed, dnumber, mnumber, birth, ahv, sdate, phposition, mdate, sfaname, sfiname, ch1name, ch1bdate, 
       ch2name, ch2bdate, ch3name, ch3bdate, em1name, relation1, phone1, em2name, relation2, phone2, bankname, 
       bankplace, bankzip, iban, accnbr, accname, eurbankname, eurbankplace, eurbankzip, euriban, euraccnbr, euraccname);
      
      event.target.finame.value="";
      event.target.faname.value="";
      event.target.street.value="";
      event.target.zip.value="";
      event.target.city.value="";
      event.target.nationality1.value="";
      event.target.nationality2.value="";
      event.target.nationality3.value="";
      event.target.sourcetaxed.value="?";
      event.target.dnumber.value="";
      event.target.mnumber.value="";
      event.target.birth.value="";
      event.target.ahv.value="";
      event.target.sdate.value="";
      event.target.mdate.value="";
      event.target.sfaname.value="";
      event.target.sfiname.value="";
      event.target.ch1name.value="";
      event.target.ch1bdate.value="";
      event.target.ch2name.value="";
      event.target.ch2bdate.value="";
      event.target.ch3name.value="";
      event.target.ch3bdate.value="";
      event.target.em1name.value="";
      event.target.relation1.value="";
      event.target.phone1.value="";
      event.target.em2name.value="";
      event.target.relation2.value="";
      event.target.phone2.value="";
      event.target.bankname.value="";
      event.target.bankplace.value="";
      event.target.bankzip.value="";
      event.target.iban.value="";
      event.target.accnbr.value="";
      event.target.accname.value="";
      event.target.eurbankname.value="";
      event.target.eurbankplace.value="";
      event.target.eurbankzip.value="";
      event.target.euriban.value="";
      event.target.euraccnbr.value="";
      event.target.euraccname.value="";
        },

      "submit .new-competency": function (event) {
      event.preventDefault();
      var comskill = event.target.comskill.value;
      var businessskill = event.target.businessskill.value;
      var technicalskill = event.target.technicalskill.value;

      Meteor.call("addCompetency", comskill, businessskill, technicalskill);
      // Clear form
      event.target.comskill.value = "";
      event.target.businessskill.value = "";
      event.target.technicalskill.value = "";
    },

     "submit .new-experience": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      var company = event.target.company.value;
      var stdate = event.target.stdate.value;
      var enddate = event.target.enddate.value;
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
      
      Meteor.call('addExperience', company, stdate, enddate, customer, customercity, department, projecttitle1, projecttitle2, 
        projecttitle3, projecttitle4, projectdescription1, projectdescription2, projectdescription3, projectdescription4)
      // Clear form
      event.target.company.value="";
      event.target.stdate.value="";
      event.target.enddate.value="";
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
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      var empstdate = event.target.empstdate.value;
      var empenddate = event.target.empenddate.value;
      var empcompany = event.target.empcompany.value;
      var empcity = event.target.empcity.value;
      var empposition = event.target.empposition.value;
      
      Meteor.call('addEmployment', empstdate, empenddate, empcompany, empcity, empposition )
      // Clear form
      event.target.empstdate.value="";
      event.target.empenddate.value="";
      event.target.empcompany.value="";
      event.target.empcity.value="";
      event.target.empposition.value="";

    },

      "submit .new-degree": function (event) {
      event.preventDefault();
      var ddate = event.target.ddate.value;
      var dip = event.target.dip.value;
      var uni = event.target.uni.value;
      
      Meteor.call('addDegree', ddate, dip, uni)
      // Clear form
      event.target.ddate.value = "";
      event.target.dip.value = "";
      event.target.uni.value = "";
    },

     "submit .new-language": function (event) {
      event.preventDefault();
      var langue = event.target.langue.value;
      var skill= event.target.skill.value;
      Meteor.call("addLanguage", langue, skill);
      // Clear form
      event.target.langue.value = "";
      event.target.skill.value = "mothertongue";
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
  

Accounts.ui.config({
  passwordSignupFields: "EMAIL_ONLY"
});
 
/*Template.register.events({
        'submit form': function(event) {
            event.preventDefault();
            var message = document.getElementById("regmail");
            message.innerHTML= "";
            var emailVar = event.target.registerEmail.value;
            var passwordVar = event.target.registerPassword.value;
            if (emailVar.indexOf('@philico.com') == -1) {message.innerHTML= "Please use your Philico's email address"}
           else{
            Accounts.createUser({
            _id: emailVar,
            email: emailVar,
            password: passwordVar
        });
        }
        }
    });*/

};

if (Meteor.isServer) {
  Meteor.startup(function() {
    return Meteor.methods({
      removeAllPosts: function() {
        return Experiences.remove({});
      }
    });
  });
  };
  

Meteor.methods({

  addPersonalinfo: function(finame, faname, street, zip, city, nationality1, nationality2, nationality3,
     sourcetaxed, dnumber, mnumber, birth, ahv, sdate, phposition, mdate, sfaname, sfiname, ch1name, ch1bdate, ch2name, ch2bdate,
     ch3name, ch3bdate, em1name, relation1, phone1, em2name, relation2, phone2, bankname, bankplace, bankzip, iban,
     accnbr, accname, eurbankname, eurbankplace, eurbankzip, euriban, euraccnbr, euraccname) {
    Personalinfo.update(Meteor.user().emails[0].address,
      { $set: 
        {
     finame: finame,
     faname: faname,
     street: street,
     zip: zip,
     city: city,
     nationality1: nationality1,
     nationality2: nationality2,
     nationality3: nationality3,
     sourcetaxed: sourcetaxed,
     dnumber: dnumber,
     mnumber: mnumber,
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
     createdAt: new Date(),
     }    
    })
  },

  addCompetency: function(comskill, businessskill, technicalskill) {
    var myDocument = Competencies.findOne({ owner: Meteor.user().emails[0].address });
    if (myDocument) {
      var deletedcomskill = myDocument.comskill;
      var deletedbusinessskill = myDocument.businessskill;
      var deletedtechnicalskill = myDocument.technicalskill;
      Competencies.remove({owner: Meteor.user().emails[0].address});
      Personalinfo.update(
    {_id: Meteor.user().emails[0].address },
    { $pull: { competencies: [deletedcomskill, deletedbusinessskill, deletedtechnicalskill ] } },
    { multi: true }
    )
    };

    Competencies.insert({
      owner: Meteor.user().emails[0].address,
      comskill: comskill,
      businessskill: businessskill,
      technicalskill: technicalskill,
      createdAt: new Date(),
    });

    Personalinfo.update(Meteor.user().emails[0].address,
    { $addToSet: {competencies: [comskill, businessskill, technicalskill ] } }
    )
  },

  addExperience: function(company, stdate, enddate, customer, customercity, department, projecttitle1, projecttitle2, 
        projecttitle3, projecttitle4, projectdescription1, projectdescription2, projectdescription3, projectdescription4) {
    Experiences.insert({
        owner: Meteor.user().emails[0].address,
        company: company, 
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
        projectdescription4: projectdescription4,
        createdAt: new Date(),  
      });

    Personalinfo.update(Meteor.user().emails[0].address,
    { $addToSet: {experiences: [company, stdate, enddate, customer, customercity, department, projecttitle1, projecttitle2, 
        projecttitle3, projecttitle4, projectdescription1, projectdescription2, projectdescription3, projectdescription4 ] } }
    )   
  },

  deleteExperience: function(id) {
    var myDocument = Experiences.findOne({ _id: id });
    if (myDocument) {
        var deletedcompany= myDocument.company;
        var deletedstdate= myDocument.stdate; 
        var deletedenddate= myDocument.enddate; 
        var deletedcustomer= myDocument.customer;
        var deletedcutomercity= myDocument.customercity;
        var deleteddepartment= myDocument.department;
        var deletedprojecttitle1= myDocument.projecttitle1;
        var deletedprojecttitle2= myDocument.projecttitle2; 
        var deletedprojecttitle3= myDocument.projecttitle3; 
        var deletedprojecttitle4= myDocument.projecttitle4; 
        var deletedprojectdescription1= myDocument.projectdescription1; 
        var deletedprojectdescription2= myDocument.projectdescription2; 
        var deletedprojectdescription3= myDocument.projectdescription3; 
        var deletedprojectdescription4= myDocument.projectdescription4;
    }
    Personalinfo.update(
    { _id: Meteor.user().emails[0].address },
    { $pull: { experiences: [deletedcompany, deletedstdate, deletedenddate, deletedcustomer, deletedcustomercity, 
      deleteddepartment, deletedprojecttitle1, deletedprojecttitle2, deletedprojecttitle3, deletedprojecttitle4, 
      deletedprojectdescription1, deletedprojectdescription2, deletedprojectdescription3, deletedprojectdescription4 ] } },
    { multi: true }
    );
    Experiences.remove(id);
  },

  addEmployment: function(empstdate, empenddate, empcompany, empposition) {
    Employments.insert({
          owner: Meteor.user().emails[0].address,
          empstdate: empstdate,
          empenddate: empenddate,
          empcompany: empcompany,
          empcity: empcity,
          empposition: empposition,
          createdAt: new Date(),            // current time
      });

    Personalinfo.update(Meteor.user().emails[0].address,
    { $addToSet: {employments: [empstdate, empenddate, empcompany, empcity, empposition ] } }
    )   
  },

  deleteEmployment: function(id) {
    var myDocument = Employments.findOne({ _id: id });
    if (myDocument) {
      var deletedempstdate = myDocument.empstdate;
      var deletedempenddate = myDocument.empenddate;
      var deletedempcompany = myDocument.empcompany;
      var deletedempcity = myDocument.empcity;
      var deletedempposition = myDocument.empposition;
    }
    Personalinfo.update(
    { _id: Meteor.user().emails[0].address },
    { $pull: { employments: [deletedempstdate, deletedempenddate, deletedempcompany, deletedempcity, deletedempposition ] } },
    { multi: true }
    );
    Employments.remove(id);
  },
  
  addDegree: function(ddate, dip, uni) {
    Degrees.insert({
          owner: Meteor.user().emails[0].address,
          ddate: ddate,
          dip: dip,
          uni: uni,
          createdAt: new Date(),            // current time
      });

    Personalinfo.update(Meteor.user().emails[0].address,
    { $addToSet: {degrees: [ddate, dip, uni ] } }
    )   
  },

  deleteDegree: function(id) {
    var myDocument = Degrees.findOne({ _id: id });
    if (myDocument) {
      var deletedddate = myDocument.ddate;
      var deleteddip = myDocument.dip;
      var deleteduni = myDocument.uni;
    }
    Personalinfo.update(
    { _id: Meteor.user().emails[0].address },
    { $pull: { degrees: [deletedddate, deleteddip, deleteduni ] } },
    { multi: true }
    );
    Degrees.remove(id);
  },

  addLanguage: function(langue, skill) {
    Languages.insert({
          owner: Meteor.user().emails[0].address,
          langue: langue,
          skill: skill,
          createdAt: new Date(),            // current time
      });
    Personalinfo.update(Meteor.user().emails[0].address,
    { $addToSet: {languages: [ langue, skill ] } } 
    )
  },

  deleteLanguage: function(id) {
    var myDocument = Languages.findOne({ _id: id });
    if (myDocument) {
      var deletedlanguage = myDocument.langue;
      var deletedskill = myDocument.skill;

    Personalinfo.update( 
    { _id: Meteor.user().emails[0].address },
    { $pull: { languages: [ deletedlanguage, deletedskill ] } },
    { multi: true }
    );
    Languages.remove(id);
  }
  },

});
