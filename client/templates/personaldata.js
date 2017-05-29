var checkPhoneIsWrong = function (phNum, countryCode) {
    switch(countryCode){
        case "41":
            if (phNum.length!=9){
                return true;}
            else {return false};
            break;
        case "33":
            if (phNum.length!=9){
                return true;}
            else {return false};
            break;
        default:
            return false;
            break;
    }
} ;


//booleans to draw a tick when each form is saved
var saveInfo = 0;
var saveInternal = 0;
var saveComp = 0;
var saveInternship=0;
var saveExp =0;
var saveEmp = 0;
var saveDegree=0;
var saveLanguage=0;

Session.set("countBox",1); //global variable for adding multiple project experiences
Session.set("pictureName",''); //global variable to display the picture file name when uploading it
Session.set("newEmployer", false);
Session.set("newClient", false);
Session.set("mycurrentproject", false);

Template.personaldata.helpers({

    personalinfo: function () {
        return Personalinfo.find({createdBy: this._id})
    },
    newEmployerStatut: function () {
        return Session.get("newEmployer");    
    },
    newClientStatut: function () {
        return Session.get("newClient");    
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

    /*------------ Functions to check if the tick needs to be drawn when saving each fom -----*/
    savedInfo: function () {
        return saveInfo;
    },
    savedInternal: function () {
        return saveInternal;
    },
    savedComp: function () {
        return saveComp;
    },
    savedExp: function () {
        return saveExp;
    },
    savedEmp: function () {
        return saveEmp;
    },
    savedDegree: function () {
        return saveDegree;
    },
    savedLanguage: function () {
        return saveLanguage;
    },
    savedInternship: function () {
        return saveInternship;
    },


    mycurrentemployment: function () {
        return Session.get("mycurrentemployment");
    },

    isEqual: function (var1, var2) {
        return var1 == var2;
    },
    noParentClient: function (ID) {
        if (Personalinfo.findOne({"experiencesClientProject.idExpClientProject":ID})){
            return false;
        }
        else {
            return true;
        }
    },
    noParentCompany: function (ID) {
        if (Personalinfo.findOne({"experiencesClient.idExp":ID})){
            return false;
        }
        else {
            return true;
        }
    },

    /*----------- Functions to check if each field is in edit ------------------ */
    'editValueExpDescription' : function(){
        return Session.get("TargetValueDescription" + this._id);
    },
    'editValueExpTitle' : function(){
        return Session.get("TargetValueExpTitle" + this._id);
    },
    'editValueprojectClient' : function(){
        return Session.get("TargetValueprojectClient" + this._id);
    },
    'editValueprojectClientcity' : function(){
        return Session.get("TargetValueprojectClientcity" + this._id);
    },
    'editValueprojectClientdepartment' : function(){
        return Session.get("TargetValueprojectClientdepartment" + this._id);
    },
    'editValueprojectStartdate' : function(){
        return Session.get("TargetValueprojectStartdate" + this._id);
    },
    'editValueprojectEnddate' : function(){
        return Session.get("TargetValueprojectEnddate" + this._id);
    },
    'editValueprojectCompany' : function(){
        return Session.get("TargetValueprojectCompany" + this._id);
    },


    cleanDateMonth: function (data){
        var dateString = data.toString();
        var cleanString = dateString.slice(0,dateString.indexOf("."));
        return cleanString;
    },
    cleanDateYear: function (data){
        var dateString = data.toString();
        var cleanString = dateString.slice(dateString.indexOf(".")+1,7);
        return cleanString;
    },
    'editNewproject' : function(){
        return Session.get("editAddNewProject");
    },

    getImage: function () {
        var myDocument1 = Personalinfo.findOne({ createdBy: this.email });
        var buffer=myDocument1.picture;
        //here we load the picture in binary, then slice it to convert it in base64 without overloading the browser stack. the image tag in html display directly the image in base 64
        var CHUNK_SIZE = 0x8000; //arbitrary number
        var index = 0;
        var length = buffer.length;
        var result = '';
        var slice;
        while (index < length) {
            slice = buffer.subarray(index, Math.min(index + CHUNK_SIZE, length)); 
            result += String.fromCharCode.apply(null, slice);
            index += CHUNK_SIZE;
        }
        return btoa(result);
    },

    //format iban to display
    cleanIban: function (data){
        if(data){
            var ibanString = data.toString();
            ibanString=ibanString.replace(/\s+/g, '');

            var cleanString1 = ibanString.slice(0,4)+" ";
            var cleanString2 = ibanString.slice(4,8)+" ";
            var cleanString3 = ibanString.slice(8,12)+" ";
            var cleanString4 = ibanString.slice(12,16)+" ";
            var cleanString5 = ibanString.slice(16,20)+" ";
            var cleanString6 = ibanString.slice(20,34);
            return cleanString1+cleanString2+cleanString3+cleanString4+cleanString5+cleanString6;
        }
    },

    //display the name of the picture
    namePicture: function(){
        return Session.get("pictureName");  
    },
});



Template.personaldata.events({

    //function to store the picture
    'change .imageUploadClick' : function(event,template){ 
        var file = event.target.files[0]; //assuming 1 file only
        if (!file) return;
        if (file.size/1024>1500){
            alert("Please select a picture less than 1.5 MB");
            return;
        }

        //we get the file's name, remove the path and store it in pictureName
        var fullPath = event.currentTarget.value;
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            Session.set("pictureName",filename);
        }
        var creator=this.email;
        var reader = new FileReader(); //create a reader according to HTML5 File API
        reader.onload = function(event){          
            var buffer = new Uint8Array(reader.result) // convert to binary

            Meteor.call('saveFile', buffer, creator);
        }
        reader.readAsArrayBuffer(file); //read the file as arraybuffer
    },

    //set the variable to remove the end date
    "change .currentproject input": function (event) {
        Session.set("mycurrentproject", event.target.checked);
    },

    "change .currentemployment input": function (event) {
        Session.set("mycurrentemployment", event.target.checked);
    },

    "submit .new-profile": function (event) {
        event.preventDefault();
        var checkDomicilePhone=event.target.domicilePhone.value;
        var countrycodeDomicile=event.target.domicilecountryCode.value;
        var checkMobilePhone= event.target.mobilePhone.value;
        var countrycodeMobile=event.target.mobilecountryCode.value;
        if (checkDomicilePhone.length>0 && checkPhoneIsWrong(checkDomicilePhone,countrycodeDomicile)) {
            alert("Please enter a valid domicile phone number using the format 781234567 (without the 0 at the beginning)")}
        else if (checkMobilePhone.length>0 && checkPhoneIsWrong(checkMobilePhone,countrycodeMobile)) {
            alert("Please enter a valid mobile phone number using the format 781234567 (without the 0 at the beginning)")}
        else {
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
            //we check if the users enters a different phone number from the one in the DB and if the event default value (choose here) is not taken by the function
            if ((!myDocument1.domicilePhone || event.target.domicilePhone.value!==myDocument1.domicilePhone || event.target.domicilecountryCode.value!==myDocument1.domicilecountryCode.substring(1) )&&event.target.domicilecountryCode.value!=="Choose here") {
                var domicilecountryCode=event.target.domicilecountryCode.value} else {
                    if (myDocument1.domicilecountryCode){
                        var domicilecountryCode=myDocument1.domicilecountryCode.substring(1)}
                    else{
                        var domicilecountryCode="41"}
                };
            var domicilePhone=checkDomicilePhone;

            if ((!myDocument1.mobilePhone || event.target.mobilePhone.value!==myDocument1.mobilePhone || event.target.mobilecountryCode.value!==myDocument1.mobilecountryCode.substring(1) )&&event.target.mobilecountryCode.value!=="Choose here") {
                var mobilecountryCode=event.target.mobilecountryCode.value} else {
                    if (myDocument1.mobilecountryCode){
                        var mobilecountryCode=myDocument1.mobilecountryCode.substring(1)}
                    else{
                        var mobilecountryCode="41"
                        }};
            var mobilePhone=checkMobilePhone;

            var birthDate=event.target.birthDate.value;
            var ahvNumber=event.target.ahvNumber.value;
            var startDatephilico=event.target.startDatephilico.value;
            var positionPhilico=event.target.positionPhilico.value;
            if (positionPhilico=="Choose here"){
                positionPhilico="Consultant";
            };
            var isJunior=false;
            if (positionPhilico==="Junior Consultant"){
                isJunior=true;
            }

            var subcontract = event.target.subcontractorcheck.value;
            if (subcontract=="Choose here"){
                subcontract="";
            }
            Meteor.call("addPersonalinfo", firstName, familyName, email, addressStreet, addressNumber, addressZip, addressCity, addressCountry, nationality1, nationality2, nationality3,
                        sourcetaxed, domicilecountryCode, domicilePhone, mobilecountryCode, mobilePhone, birthDate, ahvNumber, startDatephilico, positionPhilico,isJunior,subcontract,Meteor.user()._id);

            saveInfo=true;
        };
    },

    "submit .new_internal": function(event){
        event.preventDefault();

        var myDocument1 = Personalinfo.findOne({ createdBy: this.email });
        var checkEmergencyPhone1 = event.target.emergency1Phone.value;
        var checkEmergencyPhone2 = event.target.emergency2Phone.value;
        var emergencyCountry1 = event.target.emergency1countryCode.value;
        var emergencyCountry2 = event.target.emergency2countryCode.value;
        if (checkEmergencyPhone1.length>0 && checkPhoneIsWrong(checkEmergencyPhone1,emergencyCountry1)) {
            alert("Please enter your emergency phone number 1 using the format 781234567 (without the 0 at the beginning)")}
        else if (checkEmergencyPhone2.length>0 && checkPhoneIsWrong(checkEmergencyPhone2,emergencyCountry2)) {
            alert("Please enter your emergency phone number 2 using the format 781234567 (without the 0 at the beginning)")}
        else {
            var emergency1Phone=checkEmergencyPhone1;
            var emergency2Phone=checkEmergencyPhone2;
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
            if((!myDocument1.emergency1Phone || event.target.emergency1Phone.value!==myDocument1.emergency1Phone || event.target.emergency1countryCode.value!==myDocument1.emergency1countryCode.substring(1) )&&event.target.emergency1countryCode.value!=="Choose here") {
                var emergency1countryCode=event.target.emergency1countryCode.value} else {
                    if (myDocument1.emergency1countryCode){
                        var emergency1countryCode=myDocument1.emergency1countryCode.substring(1)}
                    else{
                        var emergency1countryCode="41"
                        }};  
            var emergency2firstName=event.target.emergency2firstName.value;
            var emergency2familyName=event.target.emergency2familyName.value;
            var emergency2Relation=event.target.emergency2Relation.value;
            if((!myDocument1.emergency2Phone || event.target.emergency2Phone.value!==myDocument1.emergency2Phone || event.target.emergency2countryCode.value!==myDocument1.emergency2countryCode.substring(1) )&&event.target.emergency2countryCode.value!=="Choose here") {
                var emergency2countryCode=event.target.emergency2countryCode.value} else {
                    if (myDocument1.emergency2countryCode){
                        var emergency2countryCode=myDocument1.emergency2countryCode.substring(1)}
                    else {
                        var emergency2countryCode="41"
                        }};
            var CHbankName=event.target.CHbankName.value;
            var CHbankCity=event.target.CHbankCity.value;
            var CHbankZip=event.target.CHbankZip.value;
            var CHbankIban=event.target.CHbankIban.value;
            CHbankIban=CHbankIban.replace(/\s+/g, '');
            var CHbankAccountnumber=event.target.CHbankAccountnumber.value;
            var CHbankAccountname=event.target.CHbankAccountname.value;
            var EURbankName=event.target.EURbankName.value;
            var EURbankCity=event.target.EURbankCity.value;
            var EURbankZip=event.target.EURbankZip.value;
            var EURbankIban=event.target.EURbankIban.value;
            EURbankIban=EURbankIban.replace(/\s+/g, '');
            var EURbankAccountnumber=event.target.EURbankAccountnumber.value;
            var EURbankAccountname=event.target.EURbankAccountname.value;
            //to create method to add the internal information
            Meteor.call("addInternalinfo",this.email, marriageDate, spousefamilyName, spousefirstName, child1Name, child1Birthdate, 
                        child2Name, child2Birthdate, child3Name, child3Birthdate, emergency1firstName, emergency1familyName, emergency1Relation, emergency1countryCode, emergency1Phone, emergency2firstName, emergency2familyName, emergency2Relation, emergency2countryCode, emergency2Phone, CHbankName, 
                        CHbankCity, CHbankZip, CHbankIban, CHbankAccountnumber, CHbankAccountname, EURbankName, EURbankCity, EURbankZip, EURbankIban, EURbankAccountnumber, EURbankAccountname, Meteor.user()._id);
            saveInternal=true;
        }; 
    },


    "submit .new-competency": function (event) {
        event.preventDefault();
        var communicationSkills = event.target.communicationSkills.value;
        var businessSkills = event.target.businessSkills.value;
        var technicalSkills = event.target.technicalSkills.value;
        Meteor.call("addCompetency", communicationSkills, businessSkills, technicalSkills, this.email);
        saveComp=true;
    },

    "submit .new-internship": function (event) {
        event.preventDefault();
        var internshipStartdatemonth = event.target.internshipStartdatemonth.value;
        var internshipStartdateyear = event.target.internshipStartdateyear.value;
        var internshipStartdate = event.target.internshipStartdatemonth.value +"."+ event.target.internshipStartdateyear.value;

        var internshipEnddate = event.target.internshipEnddatemonth.value +"."+ event.target.internshipEnddateyear.value;
        var internshipCompany = event.target.internshipCompany.value;
        var internshipCity = event.target.internshipCity.value;
        var internshipCountry = event.target.internshipCountry.value;
        var internshipPosition = event.target.internshipPosition.value;

        Meteor.call('addInternship', internshipStartdatemonth, internshipStartdateyear, internshipStartdate, internshipEnddate, internshipCompany, internshipCity, internshipCountry, internshipPosition, this.email )
        // Clear form
        event.target.internshipStartdatemonth.value="";
        event.target.internshipStartdateyear.value="";

        event.target.internshipEnddatemonth.value="";
        event.target.internshipEnddateyear.value="";
        event.target.internshipCompany.value="";
        event.target.internshipCity.value="";
        event.target.internshipCountry.value;
        event.target.internshipPosition.value="";
        saveInternship=true;
    },

    "submit .new-experience": function (event, template) {
        event.preventDefault();
        var idCompany=(new Date()).getTime();
        var myDocument1 = Personalinfo.findOne({ createdBy: this.email });

        if(Session.get("newEmployer")){
            var projectCompany = event.target.projectCompany.value;
            var idCompany=(new Date()).getTime();
        }
        else {
            var idCompany = template.$(".employer").val();
            var projectCompany = "new";
        }
        if(Session.get("newClient")){
            var projectStartdatemonth = event.target.projectStartdatemonth.value;
            var projectStartdateyear = event.target.projectStartdateyear.value;
            var projectStartdate = event.target.projectStartdatemonth.value +"."+ event.target.projectStartdateyear.value;
            if (event.target.currentprojcheck.checked) {
                var projectEnddate = "today"} else {
                    var projectEnddate = event.target.projectEnddatemonth.value +"."+ event.target.projectEnddateyear.value};
            var projectClient = event.target.projectClient.value;
            var projectClientcity = event.target.projectClientcity.value;
            var projectClientdepartment = event.target.projectClientdepartment.value;
            var idExpClient=(new Date()).getTime();
        }
        else {
            var projectClient = "new";
            var projectStartdatemonth; //we won't use those variables but we need to declare them to pass them to method.js
            var projectStartdateyear;
            var projectStartdate;
            var projectEnddate ;
            var projectClientcity;
            var idExpClient = template.$(".client").val();
        }


        var projectTitle = event.target.projectTitle0.value;
        var projectDescription = event.target.projectDescription0.value;


        Meteor.call('addExperience', projectCompany, projectStartdatemonth, projectStartdateyear, projectStartdate, projectEnddate, projectClient, projectClientcity, projectClientdepartment, idCompany, idExpClient,  this.email);
        Meteor.call('addProjectExperience', projectTitle,projectDescription, idExpClient, this.email);
        /*var countBox= Session.get("counter");
        if (typeof countBox == 'undefined'){
            countBox=1;
        };*/
        //iteration over the number of new projects to save them on the DB
        //if(countBox>0){
        /*for(var i=0;i<countBox;i++){
                var projectTitle=$(event.target).find('[name=projectTitle'+i+']').val();
                var projectDescription=$(event.target).find('[name=projectDescription'+i+']').val();
                Meteor.call('addProjectExperience', projectTitle,projectDescription, idExpClient, this.email);
                $(event.target).find('[name=projectTitle'+i+']').val('');
                $(event.target).find('[name=projectDescription'+i+']').val('');

            };*/

        //empty form
        if(Session.get("newEmployer")){
            event.target.projectCompany.value='';
        }
        if(Session.get("newClient")){
            event.target.projectStartdatemonth.value='';
            event.target.projectStartdateyear.value='';
            if(!event.target.currentprojcheck.checked){
                event.target.projectEnddatemonth.value='';
                event.target.projectEnddateyear.value='';
            }
            event.target.currentprojcheck.checked=false;


            event.target.projectClient.value='';
            event.target.projectClientcity.value='';
            event.target.projectClientdepartment.value='';
        }
        event.target.projectTitle0.value='';
        event.target.projectDescription0.value='';
        template.$(".client").prop('selectedIndex', 0);
        Session.set("newClient",0);
        template.$(".employer").prop('selectedIndex', 0);
        Session.set("newEmployer",0);
        Session.set("mycurrentproject", false);
        saveExp=true;
        //};

    },

    //function to display the entry menu for position
    "change .employer": function (event, template) {
        var companyName = template.$(".employer").val();
        if(companyName=="New"){
            Session.set("newEmployer",1);
        }
        else{
            //Meteor.call("addNewExperience", companyName, this._id);
            Session.set("newEmployer",0);
        }

    },
    "change .client": function (event, template) {
        var clientName = template.$(".client").val();
        if(clientName=="New"){
            Session.set("newClient",1);
        }
        else{
            //Meteor.call("addNewExperience", companyName, this._id);
            Session.set("newClient",0);
            Session.set("mycurrentproject", false);
        }

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

        Meteor.call('addEmployment', employmentStartdatemonth, employmentStartdateyear, employmentStartdate, employmentEnddate, employmentCompany, employmentCity, employmentPosition, this.email )
        // Clear form
        event.target.employmentStartdatemonth.value="";
        event.target.employmentStartdateyear.value="";
        if (!(event.target.currentempcheck.checked)) {
            event.target.employmentEnddatemonth.value="";
            event.target.employmentEnddateyear.value=""};
        event.target.employmentCompany.value="";
        event.target.employmentCity.value="";
        event.target.employmentPosition.value="";
        saveEmp=true;
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
        Meteor.call('addDegree', degreeDatemonth, degreeDateyear, degreeDate, degree, degreeSpecialisation, degreeUniversity, degreeCity,  this.email)
        // Clear form
        event.target.degreeDatemonth.value = "";
        event.target.degreeDateyear.value = "";
        event.target.degree.value = "";
        event.target.degreeSpecialisation.value = "";
        event.target.degreeUniversity.value = "";
        event.target.degreeCity.value = "";
        saveDegree=true;
    },

    "submit .new-language": function (event) {
        event.preventDefault();
        var languageItem = event.target.languageItem.value;
        var languageSkill= event.target.languageSkill.value;
        if(languageSkill!=="Choose here") {
            Meteor.call("addLanguage", languageItem, languageSkill, this.email);
            event.target.languageItem.value = "";
            saveLanguage=true;
        }

    },
    "click .deleteanInternship": function () {
        Meteor.call("deleteInternship", this._id);
    },

    "click .deleteanexperience": function () {
        Meteor.call("deleteExperience", this._id);
    },

    "click .deleteaclient": function () {
        Meteor.call("deleteClient", this._id);

    },

    "click .deleteaproject": function () {
        Meteor.call("deleteProject", this._id);
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
    'dblclick #spanIdDescXp' : function(e,t){
        return Session.set("TargetValueDescription" + this._id,true)//hide the span and we set the input 
    },

    //save the edited experiences
    "submit .edit-experienceDesc": function(event) { 
        event.preventDefault();
        var newValueXp = event.target.editExpDesc.value;
        var idCurrentDocument = this._id;
        var myDocument1 = Personalinfo.findOne({'experiencesClientProject._id':this._id});
        Meteor.call("editElement", idCurrentDocument, newValueXp, myDocument1.email, "ID1");
        return Session.set("TargetValueDescription" + this._id,false); //we hide the input and we put the span again*/
    },
    'dblclick #spanIdTitleXp' : function(e,t){
        return Session.set("TargetValueExpTitle" + this._id,true)//hide the span and we set the input 
    },
    "submit .edit-experienceTitle": function(event) { 
        event.preventDefault();
        var newValueXp = event.target.editTitleInput.value;
        var idCurrentDocument = this._id;
        var myDocument1 = Personalinfo.findOne({'experiencesClientProject._id':this._id});
        Meteor.call("editElement", idCurrentDocument, newValueXp, myDocument1.email, "ID2");
        return Session.set("TargetValueExpTitle" + this._id,false); //we hide the input and we put the span again*/
    },
    'dblclick #spanIdprojectClient' : function(e,t){
        return Session.set("TargetValueprojectClient" + this._id,true)//hide the span and we set the input 
    },
    "submit .edit-projectClient": function(event) { 
        event.preventDefault();
        var newValueXp = event.target.editprojectClientInput.value;
        var idCurrentDocument = this._id;
        var myDocument1 = Personalinfo.findOne({'experiencesClient._id':this._id});
        Meteor.call("editElement", idCurrentDocument, newValueXp, myDocument1.email, "ID3");
        return Session.set("TargetValueprojectClient" + this._id,false); //we hide the input and we put the span again*/
    },
    'dblclick #spanIdprojectClientcity' : function(e,t){
        return Session.set("TargetValueprojectClientcity" + this._id,true)//hide the span and we set the input 
    },
    "submit .edit-projectClientcity": function(event) { 
        event.preventDefault();
        var newValueXp = event.target.editprojectClientcity.value;
        var idCurrentDocument = this._id;
        var myDocument1 = Personalinfo.findOne({'experiencesClient._id':this._id});
        Meteor.call("editElement", idCurrentDocument, newValueXp, myDocument1.email, "ID4");
        return Session.set("TargetValueprojectClientcity" + this._id,false); //we hide the input and we put the span again*/
    },
    'dblclick #spanIdprojectClientdepartment' : function(e,t){
        return Session.set("TargetValueprojectClientdepartment" + this._id,true)//hide the span and we set the input 
    },
    "submit .edit-projectClientdepartment": function(event) { 
        event.preventDefault();
        var newValueXp = event.target.editprojectClientdepartment.value;
        var idCurrentDocument = this._id;
        var myDocument1 = Personalinfo.findOne({'experiencesClient._id':this._id});
        Meteor.call("editElement", idCurrentDocument, newValueXp, myDocument1.email, "ID5");
        return Session.set("TargetValueprojectClientdepartment" + this._id,false); //we hide the input and we put the span again*/
    },
    'dblclick #spanIdprojectStartdate' : function(e,t){
        return Session.set("TargetValueprojectStartdate" + this._id,true)//hide the span and we set the input 
    },
    "submit .edit-projectStartdate": function(event) { 
        event.preventDefault();
        // we need to save months and years and the whole date...
        var newValueMonth = event.target.editprojectStartdatemonth.value;
        var newValueYear = event.target.editprojectStartdateyear.value;
        var newValue = newValueMonth+"."+newValueYear;
        var idCurrentDocument = this._id;
        var myDocument1 = Personalinfo.findOne({'experiencesClient._id':this._id});
        Meteor.call("editElement", idCurrentDocument, newValueMonth, myDocument1.email, "ID9");
        Meteor.call("editElement", idCurrentDocument, newValueYear, myDocument1.email, "ID10");
        Meteor.call("editElement", idCurrentDocument, newValue, myDocument1.email, "ID11");
        return Session.set("TargetValueprojectStartdate" + this._id,false); //we hide the input and we put the span again*/
    },
    'dblclick #spanIdprojectEnddate' : function(e,t){
        return Session.set("TargetValueprojectEnddate" + this._id,true)//hide the span and we set the input 
    },
    "submit .edit-projectEnddate": function(event) { 
        event.preventDefault();
        var newValueXp = event.target.editprojectEnddatemonth.value +"."+ event.target.editprojectEnddateyear.value;
        var idCurrentDocument = this._id;
        var myDocument1 = Personalinfo.findOne({'experiencesClient._id':this._id});
        Meteor.call("editElement", idCurrentDocument, newValueXp, myDocument1.email, "ID7");
        return Session.set("TargetValueprojectEnddate" + this._id,false); //we hide the input and we put the span again*/
    },
    'dblclick #spanIdprojectCompany' : function(e,t){
        return Session.set("TargetValueprojectCompany" + this._id,true)//hide the span and we set the input 
    },
    "submit .edit-projectCompany": function(event) { 
        event.preventDefault();
        var newValueXp = event.target.editprojectCompany.value;
        var idCurrentDocument = this._id;
        var myDocument1 = Personalinfo.findOne({'experiences._id':this._id});
        Meteor.call("editElement", idCurrentDocument, newValueXp, myDocument1.email, "ID8");
        return Session.set("TargetValueprojectCompany" + this._id,false); //we hide the input and we put the span again*/
    },
    /*'click #plus': function(e,t){
        Session.set('IDClientNewProject', this._id);
        return Session.set("editAddNewProject", true);
    },
    "submit .edit-newExperience": function(event) { 
        event.preventDefault();
        var newXpTitle = event.target.editNewTitle.value;
        var newXpDesc = event.target.editNewExpDesc.value;
        var idClient= Session.get('IDClientNewProject');
        var idCurrentDocument = Personalinfo.findOne(this._id);
        var myDocument1 = Personalinfo.findOne({'experiences._id':this._id});
        Meteor.call('addProjectExperience', newXpTitle,newXpDesc, idClient, idCurrentDocument.email);
        return Session.set("editAddNewProject", false); //we hide the input and we put the span again*/
    /*},*/

});