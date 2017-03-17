Template.home.helpers({
  
  initialisation: function () {
    if(Meteor.user({_id:this.userId})){
    user=Meteor.user({_id:this.userId});
    if (Personalinfo.find({createdBy:user._id}).count()==0) {
    Meteor.call("init", user._id, user.profile.firstName, user.profile.lastName, user.emails[0].address, "");
    }}
  },

  personalinfo: function () {
    return Personalinfo.find({createdBy: Meteor.user()._id})
  },

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

  signaturecheck: function () {
    if (Session.get("signature")) {
      return true;
    } else {
      return false;
    }
  },

  signature: function () {
    return Session.get("signature");
  },

  adminrights: function () {
    if(Meteor.user({_id:this.userId})){
      user=Meteor.user({_id:this.userId});  
      if(user._id==="walid.benhammoud@philico.com" || user._id==="fabian.knecht@philico.com" || user._id==="alex.mueller@philico.com" || user._id==="fabien.roth@philico.com"|| user._id==="valentin.mercier@philico.com") {
          return true
        } else {
          return false
      }
    }
  },

});

Template.home.events({
  
  "change .newemployee input": function (event) {
      Session.set("newemployee", event.target.checked);
  },

  "change .signature input": function (event) {
      Session.set("signature", event.target.checked);
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