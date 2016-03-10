Template.cv.helpers({
	personalinfo: function () {
      	return Personalinfo.find({ createdBy : this._id })
  	},
});