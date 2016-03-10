  Template.projectassessment.helpers({
    personalinfo: function () {
      return Personalinfo.find({createdBy: this._id});
    }
    });

  Template.projectassessment.events({
    "submit .new-assessment": function (event) {
      event.preventDefault();
      var positionPhilico= event.target.positionPhilico.value;
      var coachName = event.target.coachName.value;
      var projectName = event.target.projectName.value;
      var objectivesDate = event.target.objectivesDate.value;
      var objectivesWith = event.target.objectivesWith.value;
      var positionDifficulty = event.target.positionDifficulty.value;
      var manDays = event.target.manDays.value;
      var assessmentFrom = event.target.assessmentFrom.value;
      var assessmentTo = event.target.assessmentTo.value;
      var assessmentDate = event.target.assessmentDate.value;
      var assessmentBy = event.target.assessmentBy.value;
      var assessmentType = event.target.assessmentType.value;
      var pcpClient = event.target.pcpClient.value;
      var pcpEducation = event.target.pcpEducation.value;
      var pcpInternal = event.target.pcpInternal.value;
      var projectDescription = event.target.projectDescription.value;
      var projectIndividualRole = event.target.projectIndividualRole.value;
      var projectObjectives = event.target.projectObjectives.value;
      var overallSelfEvaluation = event.target.overallSelfEvaluation.value;
      var overallCoachstrengths = event.target.overallCoachstrengths.value;
      var overallCoachweaknesses = event.target.overallCoachweaknesses.value;
      var overallPerformanceRating = event.target.overallPerformanceRating.value;
      var consultingSelfEvaluation = event.target.consultingSelfEvaluation.value;
      var consultingCoachstrengths = event.target.consultingCoachstrengths.value;
      var consultingCoachweaknesses = event.target.consultingCoachweaknesses.value;
      var consultingclientcentricityrating = event.target.consultingclientcentricityrating.value;
      var consultingnegotiationrating = event.target.consultingnegotiationrating.value;
      var consultingmethodologyrating = event.target.consultingmethodologyrating.value;
      var consultinganalyticalrating = event.target.consultinganalyticalrating.value;
      var consultingmanagementrating = event.target.consultingmanagementrating.value;
      var technicalSelfEvaluation = event.target.technicalSelfEvaluation.value;
      var technicalCoachstrengths = event.target.technicalCoachstrengths.value;
      var technicalCoachweaknesses = event.target.technicalCoachweaknesses.value;
      var technicalbroadavaloqrating = event.target.technicalbroadavaloqrating.value;
      var technicaldeepavaloqrating = event.target.technicaldeepavaloqrating.value;
      var technicalskillsrating = event.target.technicalskillsrating.value;
      var technicalobjectmodellingrating = event.target.technicalobjectmodellingrating.value;
      var functionalSelfEvaluation = event.target.functionalSelfEvaluation.value;
      var functionalCoachstrengths = event.target.functionalCoachstrengths.value;
      var functionalCoachweaknesses = event.target.functionalCoachweaknesses.value;
      var functionalbroadbankingrating = event.target.functionalbroadbankingrating.value;
      var functionalspecificbankingrating = event.target.functionalspecificbankingrating.value;
      var functionalexperiencerating = event.target.functionalexperiencerating.value;
      var functionalmarketrating = event.target.functionalmarketrating.value;
      var softSelfEvaluation = event.target.softSelfEvaluation.value;
      var softCoachstrengths = event.target.softCoachstrengths.value;
      var softCoachweaknesses = event.target.softCoachweaknesses.value;
      var softsocialrating = event.target.softsocialrating.value;
      var softleadershiprating = event.target.softleadershiprating.value;
      var softseniorityrating = event.target.softseniorityrating.value;
      var softpressurerating = event.target.softpressurerating.value;
      var finalRating = event.target.finalRating.value;
      var myDocument = Personalinfo.findOne({ createdBy: this.email });

      Meteor.call('addInterimAssessment', myDocument.fullName, positionPhilico, coachName, projectName, objectivesDate, objectivesWith, positionDifficulty, manDays, assessmentFrom,
      assessmentTo, assessmentDate, assessmentBy, assessmentType, pcpClient, pcpEducation, pcpInternal, projectDescription, projectIndividualRole,
      projectObjectives, overallSelfEvaluation, overallCoachstrengths, overallCoachweaknesses, overallPerformanceRating, consultingSelfEvaluation, 
      consultingCoachstrengths, consultingCoachweaknesses, consultingclientcentricityrating, consultingnegotiationrating, consultingmethodologyrating, 
      consultinganalyticalrating, consultingmanagementrating, technicalSelfEvaluation, technicalCoachstrengths, technicalCoachweaknesses, 
      technicalbroadavaloqrating, technicaldeepavaloqrating, technicalskillsrating, technicalobjectmodellingrating, functionalSelfEvaluation, 
      functionalCoachstrengths, functionalCoachweaknesses, functionalbroadbankingrating, functionalspecificbankingrating, 
      functionalexperiencerating, functionalmarketrating, softSelfEvaluation, softCoachstrengths, softCoachweaknesses, softsocialrating, 
      softleadershiprating, softseniorityrating, softpressurerating, finalRating, myDocument.email, myDocument._id);
      alert("Your assessment has been submitted successfully !!!");
    },

    "click #clickme": function (event) {
      event.preventDefault();
      Meteor.call('addNewVersion', this.email);
    },

    "click #print": function () {
      event.preventDefault();
      window.open('/projectassessmentprintable/'+this._id, "_blank");
    },
})