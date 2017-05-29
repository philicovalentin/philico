//booleans to display the tick when saving the form
var saveAllCVDetails = 0;

Template.settings.helpers({

    adminpersonalinfo: function () {
        return Personalinfo.find({}, {sort: {fullName: 1}}) 
    },

    savedAllCVDetails: function () {
            return saveAllCVDetails;
    },

});

Template.settings.events({
    "submit .displayAllDetails": function (event) {
        event.preventDefault();
        var CVAllInfoparagraphPadding = event.target.CVAllInfoparagraphPadding.value;
        var CVAllparagraphPadding = event.target.CVAllparagraphPadding.value;
        var CVAlltitlePadding = event.target.CVAlltitlePadding.value;
        var CVAllaftertitlePadding = event.target.CVAllaftertitlePadding.value;
        var CVAllTextSize = event.target.CVAllTextSize.value;
        var CVAllTitleSize = event.target.CVAllTitleSize.value;
        var AllroundBorder = event.target.AllroundBorder.value;
        Meteor.call("showAllDetails", CVAllInfoparagraphPadding, CVAllparagraphPadding, CVAlltitlePadding,CVAllaftertitlePadding, CVAllTextSize,CVAllTitleSize,AllroundBorder);
        saveAllCVDetails=true;
    }
});