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
		if (Session.get("sortbyscore") === "") {
			Session.set("sortbyscore", "1");
		}
		else {
			Session.set("sortbyscore", "");
		}
	},
	'click #filtertwo': function(event) {
		if (Session.get("filtertwo") === "") {
			Session.set("filtertwo", 2);
		}
		else {
			Session.set("filtertwo", "");
		}
	}
});

Template.profiles.helpers({
	person: function() {
		if (Session.get("sortbyscore") != "" && Session.get("filtertwo") != "") {
			return Profiles.find({
				uid: Meteor.userId(),
				sortbyscore: Session.get("filtertwo")
			}, {
				sort: {
					sortbyscore: Session.get("sortbyscore")
				}
			});
		}
	}
});