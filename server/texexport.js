var fs = Npm.require('fs');
var fail = function(response) {
  response.statusCode = 404;
  response.end();
};

Router.route('/tex/:email', {
    where: 'server',
    action: function(){
       var currenttex = this.params.email; 
       var latexText = Personalinfo.findOne({email:this.params.email}).latexContent;
       var filename = 'cv_'+Personalinfo.findOne({email:this.params.email}).familyName+'.tex';
       var headers = {
        'Content-Type': 'application/x-tex',
        'Content-Disposition': "attachment; filename=" + filename
      };
      this.response.writeHead(200, headers);
      return this.response.end(latexText);
    }
});