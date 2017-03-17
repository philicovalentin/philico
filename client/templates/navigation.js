Template.navigation.helpers({

  personalinfo: function () {
    if(Meteor.user({_id:this.userId})){
        user=Meteor.user({_id:this.userId});
      return Personalinfo.find({createdBy:user._id})
    }
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

  adminpersonalinfo: function () {
    return Personalinfo.find({}, {sort: {fullName: 1}}) 
  }

});