var isClientFirst = true; //boolean to check if the client is the first of the employer
var isDivVisible = true; //boolean to check if the section can have a page break
var saveCVDetails=0; //boolean for tick when saved

Template.cv.helpers({    
    personalinfo: function () {
        return Personalinfo.find({ createdBy : this._id })
    },
    cleanphone: function (code, data){
        if(data){
            //we display the phone number differently depending on the country
            if(code=="+41"){
                var phoneString = data.toString();
                var cleanString1 = phoneString.slice(0,2);
                var cleanString2 = phoneString.slice(2,5);
                var cleanString3 = phoneString.slice(5,7);
                var cleanString4 = phoneString.slice(7,9);
                var cleanString=" "+cleanString1+" "+cleanString2+" "+cleanString3+" "+cleanString4;
                return cleanString;
            }
            if(code=="+33"){
                var phoneString = data.toString();
                var cleanString1 = phoneString.slice(0,1);
                var cleanString2 = phoneString.slice(1,3);
                var cleanString3 = phoneString.slice(3,5);
                var cleanString4 = phoneString.slice(5,7);
                var cleanString5 = phoneString.slice(7,9);
                var cleanString=" "+cleanString1+" "+cleanString2+" "+cleanString3+" "+cleanString4+" "+cleanString5;
                return cleanString;
            }
            if(code=="+352"){
                var phoneString = data.toString();
                var cleanString1 = phoneString.slice(0,2);
                var cleanString2 = phoneString.slice(2,5);
                var cleanString3 = phoneString.slice(5,8);
                var cleanString=" "+cleanString1+" "+cleanString2+" "+cleanString3;
                return cleanString;
            }
             if(code=="+44"){
                var phoneString = data.toString();
                var cleanString1 = phoneString.slice(0,5);
                var cleanString2 = phoneString.slice(2,10);
                var cleanString=" "+cleanString1+" "+cleanString2;
                return cleanString;
            }
            else {
                return data;
            }
        }
    },
    cleanemail: function (data){
        if(data){
            var emailString = data.toString();
            var cleanString = emailString.slice(0,emailString.indexOf("@"));
            return cleanString;
        }
    },
    isEqual: function (var1, var2) {
        return var1 == var2;
    },

    setBoolClient: function(valueClient){
        isClientFirst = valueClient;
    }, 

    getBoolClient: function(){
        return isClientFirst;
    },

    setDivBool: function(valueBool){
        isDivVisible = valueBool;
    },

    getDivBool: function(){
        return isDivVisible ;
    },
    adminpersonalinfo: function () {
        return Personalinfo.find({}, {sort: {fullName: 1}}) 
    },
    savedCVDetails: function () {
            return saveCVDetails;
    },
    showSpinner:function () {
        return Meteor.call('getSpinner',this._id);  
    },
     getImage: function () {
        var myDocument1 = Personalinfo.findOne({ createdBy: this.email });
         if(!myDocument1)return;
         //here we load the picture in binary, then slice it to convert it in base64 without overloading the browser stack. the image tag in html display directly the image in base 64
        var buffer=myDocument1.picture;
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


});

Template.cv.events({ 
    'click .generate-pdf': function(event, tmpl) {
        event.preventDefault();
        //the meteor function generate_pdf is in private/resume.js
        Meteor.call('resume/generate_pdf',this._id, function(err, res) {
            if (err) {
                console.error(err);
            } else if (res) {
                window.open("data:application/pdf;base64, " + res);
            }
        })
    },
    "submit .displayDetails": function (event) {
        event.preventDefault();
        var isAnon = event.target.anoncheck.checked;
        var CVparagraphPadding = event.target.CVparagraphPadding.value;
        if(CVparagraphPadding==' '){
            CVparagraphPadding=12; //default value to avoid empty field
        }
        var CVInfoparagraphPadding = event.target.CVInfoparagraphPadding.value;
        if(CVInfoparagraphPadding==' '){
            CVInfoparagraphPadding=10;
        }
        var CVtitlePadding = event.target.CVtitlePadding.value;
        if(CVtitlePadding==' '){
            CVtitlePadding=15;
        }
        var CVaftertitlePadding = event.target.CVaftertitlePadding.value;
        if(CVaftertitlePadding==' '){
            CVaftertitlePadding=15;
        }
        var CVTextSize = event.target.CVTextSize.value;
        if(CVTextSize==' '){
            CVTextSize=18;
        }
        var CVTitleSize = event.target.CVTitleSize.value;
        if(CVTitleSize==' '){
            CVTitleSize=21;
        }
        var roundBorder =event.target.roundBorder.value;
        if(roundBorder==' '){
            roundBorder=5;
        }
        Meteor.call("showDetails",this.email, isAnon,CVInfoparagraphPadding, CVparagraphPadding, CVtitlePadding,CVaftertitlePadding, CVTextSize,CVTitleSize,roundBorder);
        saveCVDetails=true;
    },

   
});