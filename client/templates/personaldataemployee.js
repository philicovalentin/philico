Template.personaldataemployee.helpers({
   isEqual: function (var1, var2) {
        return var1 == var2;
    },
    getImage: function () {
        var myDocument1 = Personalinfo.findOne({ createdBy: Meteor.user()._id });
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
});

Template.personaldataemployee.events({
	'click #clickmedata': function (event) {
	    event.preventDefault();
	    Router.go('/personaldata/'+this.email);
	},

	'click #clickmesignature': function (event) {
	    event.preventDefault();
	    Router.go('/signature');
	},

});