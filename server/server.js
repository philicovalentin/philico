Meteor.publish('personalinfo', function() {
    idUser=this.userId;
    if (idUser==="walid.benhammoud@philico.com" || 
        idUser==="fabian.knecht@philico.com" || 
        idUser==="alex.mueller@philico.com" || 
        idUser==="fabien.roth@philico.com")
      {return Personalinfo.find()} else {return Personalinfo.find({createdBy:idUser})}
  });
  
  Meteor.publish("images", function() { 
    idAdmin=this.userId;
    if (idAdmin==="walid.benhammoud@philico.com" || idAdmin==="fabian.knecht@philico.com" || idAdmin==="alex.mueller@philico.com" || idAdmin==="fabien.roth@philico.com")
      {return Images.find({})} else {return Images.find({owner:idAdmin})}
  });
  
  Accounts.config({
    restrictCreationByEmailDomain: 'philico.com'
  });

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