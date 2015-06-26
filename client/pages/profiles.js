Template.profiles.events({
	'submit #profilesform': function(event){
		event.preventDefault();
		var firstnameVar = event.target.firstname.value;
		var lastnameVar = event.target.lastname.value;
		var selfscoreVar = event.target.selfscore.value;
		Profiles.insert({
			uid:Meteor.userId(),
			firstname: firstnameVar,
			lastname: lastnameVar,
			selfscore: selfscoreVar
		});
		alert("Done!");
	}
});

Template.profiles.helpers({
	person: function(){
		return Profiles.find({uid:Meteor.userId()});
	}
});