Template.home.events({
     'click #spbutton': function(event){
          startDictation(event);
     },
     
     'submit #homeform': function(event){
          var cmd = event.target.inputcommand.value;
          event.preventDefault();
          analyzer(cmd);
     }
});

//@param: content, put the content into the log space.
function makeLog(content) {
   //append content
   $('#logspace').append('<br/><br/>' + content);
   //auto scroll
   $('#scrollpanel').animate({
       scrollTop: $('#logspace').height()
   }, "slow");
};

function analyzer(MYcmd){
     var cmd = preProcess(MYcmd);
     if(cmd.indexOf('cancel')>-1){
          return;
     }
     else if(cmd.indexOf('confirm')>-1){
          action(cmd);
     }
     else {
          autoSense(cmd);
     }
}

function preProcess(content){
     content = content.trim();
     content = content.toLowerCase();
     content = content.replace(/\s+/g, ' ');
     return content;
}

function action(MYcmd){
     if(MYcmd.search(/to|take/)>-1){
          performMove(MYcmd);
     }
}

function performMove(MYcmd){
     var results = MYcmd.match(/[a-h]\d/ig);
     if(results.length > 2){
          makeLog('There seems more pieces than two you typed.');
     }
     else if(results.length === 1){
          makeLog('There seems only one piece you typed.');
     }
     else if(results.length === 2){
          var isLegal = testLegal(results[0],results[1]);
     }
     return false;
}

function testLegal(piecefrom,pieceto){
     
}