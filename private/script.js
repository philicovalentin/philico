var isClientFirst = true;
var isDivVisible = true;


Template.registerHelper( 'cleanemail', ( data ) => {
  //console.log("cleanemail data: " + data)
    if(data){
        var emailString = data.toString();
        var cleanString = emailString.slice(0,emailString.indexOf("@"));
        return cleanString;
    }
});

/*
personalinfo = function () {
    return Personalinfo.find({ createdBy : this._id })
}*/
/*cleanemail = function (data){
    console.log("cleanemail data: " + data)
    if(data){
        var emailString = data.toString();
        var cleanString = emailString.slice(0,emailString.indexOf("@"));
        return cleanString;
    }
}*/
Template.registerHelper( 'isEqual', ( var1, var2) => {
    console.log("is equal? var1: "+var1+" var2 "+var2);
    return var1 == var2;
});
/*isEqual= function (var1, var2) {
    console.log("is equal? var1: "+var1+" var2 "+var2);
    return var1 == var2;
}*/

Template.registerHelper( 'setBoolClient', ( valueClient ) => {
//setBoolClient= function(valueClient){
    isClientFirst = valueClient;
});

Template.registerHelper( 'getBoolClient', ( ) => {
//getBoolClient= function(){
    return isClientFirst;
});

Template.registerHelper( 'setDivBool', ( valueBool ) => {
//setDivBool= function(valueBool){
    isDivVisible = valueBool;
});

Template.registerHelper( 'getDivBool', () => {
//getDivBool= function(){
    return isDivVisible ;
});

Template.registerHelper( 'setFirstClientFalse', () => {
//setFirstClientFalse= function (){
    //console.log("fonction set "+ firstClientBool);
    //var myDocument1=Personalinfo.findOne({'experiencesClient._id':this._id}).email;
    console.log("set 1st client false ");
    //Meteor.call('CVClientBoolean', firstClientBool,  myDocument1);
    return Session.set("isFirstClient",false);
});

Template.registerHelper( 'setFirstClientTrue', () => {
//setFirstClientTrue= function (){
    console.log("First client set to: True");
    //var myDocument1=Personalinfo.findOne({'experiencesClient._id':this._id}).email;
    //Meteor.call('CVClientBoolean', firstClientBool,  myDocument1);
    return Session.set("isFirstClient",true);
});

Template.registerHelper( 'checkOfTheClient', ( ) => {
//checkOfTheClient= function(){
    var isTrue= Session.get("isFirstClient");
    console.log("Enter check of the client "+ isTrue);
    return isTrue;
});
