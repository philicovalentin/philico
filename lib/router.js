Router.route('/', {
    template: 'home',
    data: function(){
       if(Meteor.user({_id:this.userId})){
            user=Meteor.user({_id:this.userId});  
           //if the user is not admin -> go to personaldata.html, otherwise home.html
            if(user._id==="walid.benhammoud@philico.com" || user._id==="fabian.knecht@philico.com" || user._id==="alex.mueller@philico.com" || user._id==="fabien.roth@philico.com"|| user._id==="marc-antoine.pallaud@gmail.com" || user._id==="valentin.mercier@philico.com") {
                Router.go('home');
            } else {
                Router.go('/personaldata/'+user._id);
            }
        }}});
    if (Meteor.isClient) {
    Router.onBeforeAction(function () {
    // all properties available in the route function
    // are also available here such as this.params
    if (!Meteor.userId() && !Meteor.isServer) {
    // if the user is not logged in, render the Login template
    Router.go('/'); 
    this.next();
} else {
             // otherwise don't hold up the rest of hooks or our route/action function
             // from running
             this.next();
}
});
};

Router.route('/home', {
    template: 'home',
    data: function(){
        var currentpersonal = this.params.email;
        return Personalinfo.findOne({ email: currentpersonal });
    }});

Router.route('/personaldataemployee/:email', {
    template: 'personaldataemployee',
    data: function(){
        var currentpersonal = this.params.email;
        return Personalinfo.findOne({ email: currentpersonal });
    }});

Router.route('/personaldata/:email', {
    template: 'personaldata',
    data: function(){
        var currentpersonal = this.params.email;
        return Personalinfo.findOne({ email: currentpersonal });
    }
});

Router.route('/signature');

Router.route('/projectassessment/:email', {
    template: 'projectassessment',
    data: function(){
        var currentpersonal = this.params.email;
        return Personalinfo.findOne({ email: currentpersonal });
    }});

Router.route('/projectassessmentprintable/:_id', {
    template: 'projectassessmentprintable',
    waitOn: function () {
        return Meteor.subscribe('personalinfo');
    },
    data: function(){
        if (this.ready()) {
            var mydocument=Personalinfo.findOne({ assessmentfinals: { $elemMatch: {_id:parseInt(this.params._id)}}},{assessmentfinals: { $elemMatch: {_id:parseInt(this.params._id)}}});
            for(var i= 0; i < mydocument.assessmentfinals.length; i++)
            {
                if (mydocument.assessmentfinals[i]._id=== parseInt(this.params._id)) {j=i};
            }
            return mydocument.assessmentfinals[j];
        }
    }});

Router.route('/cv/:email', {
    template: 'cv',
    data: function(){
        var currentcv = this.params.email;
        return Personalinfo.findOne({ email: currentcv });
    }});
Router.route('/settings/:email', {
    template: 'settings',  data: function(){
        var currentcv = this.params.email;
        return Personalinfo.findOne({ email: currentcv });
    }});

Router.route('/settings', {
    template: 'settings',  data: function(){
        return Personalinfo.findOne({email: Meteor.userId() });
    }});