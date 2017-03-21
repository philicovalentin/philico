Template.cv.helpers({
	personalinfo: function () {
      	return Personalinfo.find({ createdBy : this._id })
  	},
    
});

Template.cv.events({ 
	'click .savecvinformation': function () { 
  var allinfos = Personalinfo.findOne({ email : this.email});
       var texinfo = "";
       // Create a simple tex file
       texinfo += "\\"+"documentclass[8pt,a4paper]{moderncv}";
       texinfo += "\\"+"moderncvtheme[blue]{philico}";
       texinfo += "\\"+"usepackage[utf8]{inputenc}";
       texinfo += "\\"+"usepackage[T1]{fontenc}";
       texinfo += "\\"+"usepackage[a4paper, margin=1.78 cm]{geometry}";
       texinfo += "\\"+"definecolor{lightblue}{rgb}{0.22,0.45,0.70}";
       texinfo += "\\"+"usepackage{fontspec}";
       texinfo += "\\"+"defaultfontfeatures{Ligatures=TeX}";
       texinfo += "\\"+"setromanfont{Verdana}";
       texinfo += "\\"+"familyname{}";
       texinfo += "\\"+"firstname{}";
       texinfo += "\\"+"title{" + allinfos.firstNameup + " " + allinfos.familyNameup + "}";
       texinfo += "\\"+"cv{"+allinfos.positionPhilico+"}";
       texinfo += "\\"+"photoh[100pt]{" + "photos/" + allinfos.firstName + allinfos.familyName + "}";
       texinfo += "\\"+"logo[128pt]{logo_philico}";
       texinfo += "\\"+"begin{document}";
       texinfo += "\\"+"pagenumbering{gobble}";
       texinfo += "\\"+"maketitle";
       texinfo += "\\"+"def \\"+"intersection {3 mm}";
       texinfo += "\\"+"def \\"+"leftcolumn {20 em}";
       texinfo += "\\"+"def \\"+"rightcolumn {25 em}";
       texinfo += "\\"+"def  \\"+"interminipage {5 mm}";
       texinfo += "\\"+"def \\"+"interinfo {3mm}";
       texinfo += "\\"+"vspace{\\"+"intersection}";
       texinfo += "\\"+"addvspace{\\"+"interminipage}";
       texinfo += "\\"+"section{PERSONAL INFORMATION}";
       texinfo += "\\"+"addvspace{\\"+"interminipage}";
       texinfo += "\\"+"cvinfoentry{Birthday}{" + allinfos.birthDatedisplayed + "}{}{}";
       texinfo += "\\"+"cvinfoentry{Nationality}{" + allinfos.nationality1 + "}{}{}";
       texinfo += "\\"+"cvinfoentry{Address}{" + allinfos.addressStreet + " " + allinfos.addressNumber +"}{" + allinfos.addressZip + " " + allinfos.addressCity + "}{" + allinfos.addressCountry +"}";
       texinfo += "\\"+"cvinfoentry{Contact}{" + allinfos.mobilecountryCode + " " + allinfos.mobilePhone + "}{" + allinfos.email + "}{}";
   
       // TODO: Fetching Core Competencies
       
       texinfo += "\\"+"section{CORE COMPETENCIES}";
       texinfo += "\\"+"addvspace{" + "\\" + "interminipage}";
       
       
       /*
       allinfos.competencies.forEach(function(compt_info){
           if (compt_info.communicationSkills){
               texinfo += "\\" + "cvcoreentry{Communication and Analytical Skills}{" + compt_info.communicationSkills + "}";
           }
           if (compt_info.businessSkills){
               texinfo += "\\" + "cvcoreentry{Business Expertise}{" + compt_info.businessSkills + "}";
           }
           if (compt_info.technicalSkills){
               texinfo += "\\" + "cvcoreentry{Technical Expertise}{" + compt_info.technicalSkills + "}";
           }
       }
       );*/
       
       // TODO: Fetch Project Experiences
       
       // TODO: Fetch Employement history
       
       // TODO: Fetch Degres
       
       // TODO: Fetch Language
       
       
       /*texinfo += " " + allinfos.familyName;
       texinfo += " " + allinfos.nationality1;*/
        texinfo += "\\"+"end{document}";
        
        Meteor.call("addLatex",texinfo,this.email);
        Router.go(/tex/+this.email);
	},
    
});