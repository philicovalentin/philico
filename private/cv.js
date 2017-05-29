var isClientFirst = true;
var isDivVisible = true;


Template.cv.helpers({
    personalinfo: function () {
        return Personalinfo.find({ createdBy : this._id })
    },
    cleanemail: function (data){
        console.log("cleanemail data: " + data)
        if(data){
            var emailString = data.toString();
            var cleanString = emailString.slice(0,emailString.indexOf("@"));
            return cleanString;
        }
    },
    isEqual: function (var1, var2) {
        console.log("is equal? var1: "+var1+" var2 "+var2);
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
    }
    
    /*setFirstClientFalse: function (){
        //console.log("fonction set "+ firstClientBool);
        //var myDocument1=Personalinfo.findOne({'experiencesClient._id':this._id}).email;
        console.log("set 1st client false ");
         //Meteor.call('CVClientBoolean', firstClientBool,  myDocument1);
        return Session.set("isFirstClient",false);
    },
    
    setFirstClientTrue: function (){
        console.log("First client set to: True");
        //var myDocument1=Personalinfo.findOne({'experiencesClient._id':this._id}).email;
         //Meteor.call('CVClientBoolean', firstClientBool,  myDocument1);
        return Session.set("isFirstClient",true);
    },
    
    checkOfTheClient: function(){
        var isTrue= Session.get("isFirstClient");
        console.log("Enter check of the client "+ isTrue);
        return isTrue;
    }*/

});

Template.cv.events({ /*
	click .savecvinformation: function () { 
        var allinfos = Personalinfo.findOne({ email : this.email});
        var texinfo = "";
        // Create a simple tex file
        //                  HEADER                  //
        texinfo += "\\"+"documentclass[8pt,a4paper]{moderncv}\n";
        texinfo += "\\"+"moderncvtheme[blue]{philico}\n";
        texinfo += "\\"+"usepackage[utf8]{inputenc}\n";
        texinfo += "\\"+"usepackage[T1]{fontenc}\n";
        texinfo += "\\"+"usepackage[a4paper, margin=1.78 cm]{geometry}\n";
        texinfo += "\\"+"definecolor{lightblue}{rgb}{0.22,0.45,0.70}\n";
        texinfo += "\\"+"usepackage{fontspec}\n";
        texinfo += "\\"+"defaultfontfeatures{Ligatures=TeX}\n";
        texinfo += "\\"+"setromanfont{Verdana}\n";
        texinfo += "\\"+"familyname{}\n";
        texinfo += "\\"+"firstname{}\n";

        //               NAME AND PICTURE           //
        texinfo += "\\"+"title{" + allinfos.firstNameup + " " + allinfos.familyNameup + "}\n";
        texinfo += "\\"+"cv{" + allinfos.positionPhilico + "}\n";
        texinfo += "\\"+"photoh[100pt]{" + "photos/" + allinfos.firstName + allinfos.familyName + "}\n";
        texinfo += "\\"+"logo[128pt]{logo_philico}\n";
        texinfo += "\\"+"begin{document}\n";
        texinfo += "\\"+"pagenumbering{gobble}\n";
        texinfo += "\\"+"maketitle\n";
        texinfo += "\\"+"def \\"+"intersection{3 mm}\n";
        texinfo += "\\"+"def \\"+"leftcolumn{20 em}\n";
        texinfo += "\\"+"def \\"+"rightcolumn{25 em}\n";
        texinfo += "\\"+"def  \\"+"interminipage{5 mm}\n";
        texinfo += "\\"+"def \\"+"interinfo{3mm}\n";
        texinfo += "\\"+"vspace{\\"+"intersection}\n";
        texinfo += "\\"+"addvspace{\\"+"interminipage}\n";

        //               PERSONNAL INFO             //
        texinfo += "\\"+"section{PERSONAL INFORMATION}\n";
        texinfo += "\\"+"addvspace{\\"+"interminipage}\n";
        //we avoid sending empty strings that can cause bugs in latex
        if(allinfos.birthDatedisplayed){
            texinfo += "\\"+"cvinfoentry{Birthday}{" + allinfos.birthDatedisplayed + "}{}{}\n";
        } //we call the function \cvinfoentry from the philicostyle.sty
        if(allinfos.nationality1){
            texinfo += "\\"+"cvinfoentry{Nationality}{" + allinfos.nationality1 + "}{}{}\n";
        }
        if(allinfos.addressStreet && allinfos.addressNumber && allinfos.addressZip && allinfos.addressCity && allinfos.addressCountry){
            texinfo += "\\"+"cvinfoentry{Address}{" + allinfos.addressStreet + " " + allinfos.addressNumber +"}{" + allinfos.addressZip + " " + allinfos.addressCity + "}{" + allinfos.addressCountry +"}\n";
        }
        if(allinfos.mobilecountryCode && allinfos.mobilePhone && allinfos.email){
            texinfo += "\\"+"cvinfoentry{Contact}{" + allinfos.mobilecountryCode + " " + allinfos.mobilePhone + "}{" + allinfos.email + "}{}\n";
        }


        texinfo += "\\"+"section{CORE COMPETENCIES}\n";
        texinfo += "\\"+"addvspace{" + "\\" + "interminipage}\n";



        allinfos.competencies.forEach(function(compt_info){
            if (compt_info.communicationSkills){
                texinfo += "\\" + "cvcoreentry{Communication and Analytical Skills}{" + compt_info.communicationSkills + "}\n";
            }
            if (compt_info.businessSkills){
                texinfo += "\\" + "cvcoreentry{Business Expertise}{" + compt_info.businessSkills + "}\n";
            }
            if (compt_info.technicalSkills){
                texinfo += "\\" + "cvcoreentry{Technical Expertise}{" + compt_info.technicalSkills + "}\n";
            }
        }
        );

        texinfo += "\\"+"section{PROJECT EXPERIENCE}\n";
        texinfo += "\\"+"addvspace{" + "\\" + "interminipage}\n";

        if(allinfos.experiences){
            allinfos.experiences.forEach(function(exp_info){
                if(exp_info.projectCompany){
                    texinfo += "\\" + "subsection{" + "\\" + "footnotesize{" + "\\" + "bfseries " + exp_info.projectCompany + "}}\n";
                }
                if(exp_info.projectStartdate && exp_info.projectEnddate && exp_info.projectClient && exp_info.projectClientcity && exp_info.projectClientdepartment && exp_info.projectTitle && exp_info.projectDescription){
                    texinfo += "\\" + "cvproentry{" + exp_info.projectStartdate + " - " + exp_info.projectEnddate + "}{" + exp_info.projectClient + ", " + exp_info.projectClientcity + " - " + exp_info.projectClientdepartment + "}{" + exp_info.projectTitle + "}{" + exp_info.projectDescription + "}\n";
                }
            });
        }   



        texinfo += "\\"+"section{EMPLOYEMENT HISTORY}\n";
        texinfo += "\\"+"addvspace{" + "\\" + "interminipage}\n";


        allinfos.employments.forEach(function(emp_info){
                if(emp_info.employmentStartdate && emp_info.employmentEnddate && emp_info.employmentCompany && emp_info.employmentCity && emp_info.employmentPosition){
                    texinfo += "\\"+"cvempentry{"+ emp_info.employmentStartdate + " - " + emp_info.employmentEnddate + "}{" + emp_info.employmentCompany + ", " + emp_info.employmentCity + "}{" + emp_info.employmentPosition + "}\n";
                }
        });

        texinfo += "\\"+"section{DEGREES}\n";
        texinfo += "\\"+"addvspace{" + "\\" + "interminipage}\n";

        if(allinfos.degrees){
            allinfos.degrees.forEach(function(deg_info){
                if(deg_info.degreeUniversity){
                    texinfo += "\\" + "cvdegreeentry{" + deg_info.degreeDate + "}{" + deg_info.degreeUniversity + ", " + deg_info.degreeCity + "}{"+ deg_info.degree + "}\n"}
                else{
                    texinfo += "\\" + "cvdegreeentry{" + deg_info.degreeDate + "}{" + deg_info.degree + "}{}\n";
                }

            });
        }



        texinfo += "\\"+"section{LANGUAGES}\n";
        texinfo += "\\"+"addvspace{" + "\\" + "interminipage}\n";
        if(allinfos.languages){
            allinfos.languages.forEach(function(lang_info){
                texinfo += "\\" + "cvlangentry{" + lang_info.languageItem + "}{" + lang_info.languageSkill + "}\n";
            });
        }

        texinfo += "\\"+"end{document}\n";


        Meteor.call("addLatex",texinfo,this.email);
        Router.go(/tex/+this.email);
	},*/

});