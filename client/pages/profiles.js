Template.profiles.events({
	'submit #profilesform': function(event) {
		event.preventDefault();
		var firstnameVar = event.target.firstname.value;
		var lastnameVar = event.target.lastname.value;
		var selfscoreVar = event.target.selfscore.value;
		Profiles.insert({
			uid: Meteor.userId(),
			firstname: firstnameVar,
			lastname: lastnameVar,
			selfscore: selfscoreVar
		});
		alert("Done!");
	},
	'click #sorybyS': function(event) {
		Session.set("sortbyscore", "1");
	}
});

Template.profiles.helpers({
	person: function() {
		if (Session.get("sortbyscore") === "") return Profiles.find({
			uid: Meteor.userId()
		});
		else {
			return Profiles.find({
				uid: Meteor.userId()
			}, {
				sort: {
					selfscore: Session.get("sortbyscore")
				}
			});
		}
	}
});