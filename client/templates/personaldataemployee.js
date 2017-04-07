Template.personaldataemployee.events({
	'click #clickmedata': function () {
	    event.preventDefault();
	    Router.go('/personaldata/'+this.email);
	},

	'click #clickmesignature': function () {
	    event.preventDefault();
	    Router.go('/signature');
	},

});