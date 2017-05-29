Meteor.methods({
    'getSpinner': function(creator){
        if (Meteor.isServer) {
            return spinnerState;
        }
    },

    'resume/generate_pdf': function(creator) {

        if (Meteor.isServer) {

            var myDocument1 = Personalinfo.findOne({_id:creator}); 
            //display the spinner while generating the pdf
            Meteor.call('setSpinnerTrue', myDocument1.email);
            // SETUP
            // Grab required packages
            var fs      = Npm.require('fs');
            var Future = Npm.require('fibers/future');
            var webshot = Npm.require('webshot');
            var fut = new Future();
            var fileName = "resume.pdf";

            // GENERATE HTML STRING
            var css = Assets.getText('style.css');
            SSR.compileTemplate('layout', Assets.getText('layout.html'));
            Template.layout.helpers({
                getDocType: function() {
                    return "<!DOCTYPE html>";
                }
            });
            SSR.compileTemplate('resume', Assets.getText('resume.html'));

            // PREPARE DATA
            var data=myDocument1;
            var html_string = SSR.render('layout', {
                css: css,
                template: "resume",
                data: data
            });
            var options = {
                "paperSize": {
                    "format": "A4",
                    "orientation": "portrait",
                    "margin": "0.8cm"
                },
                siteType: 'html'
            };


            // Commence Webshot
            webshot(html_string, fileName, options, function(err) {
                fs.readFile(fileName, function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    fs.unlinkSync(fileName);
                    fut.return(data);

                });
            });

            let pdfData = fut.wait();
            //remove the spinner
            Meteor.call('setSpinnerFalse', myDocument1.email);
            let base64String = new Buffer(pdfData).toString('base64');
            return base64String;
        }

    }
});

//the booleans in the pdf need to be a string (any string for true and empty string '' for false) and not a true/false: don't ask why ¯\(°_o)/¯
var isClientFirst = "BOOLEAN";
var isDivVisible = "BOOLEAN";

/*---------------- global meteor functions to be accessed for the PDF generation -------------*/
Template.registerHelper( 'cleanemail', ( data ) => {
    if(data){
        var emailString = data.toString();
        var cleanString = emailString.slice(0,emailString.indexOf("@"));
        return cleanString;
    }
});
Template.registerHelper( 'cleanphone', (code, data) => {
    if(data){
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
            var cleanString1 = phoneString.slice(0,3);
            var cleanString2 = phoneString.slice(3,6);
            var cleanString3 = phoneString.slice(6,9);
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
});

Template.registerHelper( 'isEqual', ( var1, var2) => {
    return var1 == var2;
});

Template.registerHelper( 'getBoolClient', ( ) => {
    return isClientFirst;
});

Template.registerHelper( 'getDivBool', () => {
    return isDivVisible ;
});

Template.registerHelper( 'setFirstClientFalse', () => {
    isClientFirst="";
});

Template.registerHelper( 'setFirstClientTrue', () => {
    isClientFirst="BOOLEAN";
});
Template.registerHelper( 'setisDivVisibleFalse', () => {
    isDivVisible="";
});
Template.registerHelper( 'setisDivVisibleTrue', () => {
    isDivVisible="BOOLEAN";
});

Template.registerHelper( 'getImage', (creator) => {
    var myDocument1 = Personalinfo.findOne({ createdBy: creator });
    var buffer=myDocument1.picture;
    //here we load the picture in binary, then slice it to convert it in base64 without overloading the browser stack. the image tag in html display directly the image in base 64
    var CHUNK_SIZE = 0x8000; //arbitrary number
    var index = 0;
    var length = buffer.length;
    var result = '';
    var slice;
    while (index < length) { //we need to slice the string in multiple part to avoid overflowding the browser memory
        slice = buffer.subarray(index, Math.min(index + CHUNK_SIZE, length)); 
        result += String.fromCharCode.apply(null, slice);
        index += CHUNK_SIZE;
    }
    return(new Buffer(result,'binary').toString('base64'));
});

