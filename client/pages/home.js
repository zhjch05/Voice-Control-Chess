Template.home.rendered = function(){
	//create dict
	alpha = ['a','b','c','d','e','f','g','h']
	num = ['1', '2' , '3' , '4', '5' , '6' , '7' , '8'];
	result=[],idx=0,dict="",piecefrom='',pieceto='';
	for(var i = 0;i<alpha.length;i++)
	{
		for(var j = 0;j<num.length;j++)
		{
			result[idx++]=alpha[i]+num[j];
		}
	}

	//get rid of the logs things
	game = new Chess()/*,
	  statusEl = $('#status'),
	  fenEl = $('#fen'),
	  pgnEl = $('#pgn')*/;

	// do not pick up pieces if the game is over
	// only pick up pieces for the side to move
	var onDragStart = function(source, piece, position, orientation) {
	  if (game.game_over() === true ||
	      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
	      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
	    return false;
	  }
	};

	var onDrop = function(source, target) {
	  // see if the move is legal
	  var move = game.move({
	    from: source,
	    to: target,
	    promotion: 'q' // NOTE: always promote to a queen for example simplicity
	  });

	  // illegal move
	  if (move === null) return 'snapback';
	  updateStatus();
	};

	// update the board position after the piece snap 
	// for castling, en passant, pawn promotion
	var onSnapEnd = function() {
	  myboard.position(game.fen());
	};

	updateStatus = function() {
	  console.log("updateStatus");
	  var status = '';

	  var moveColor = 'White';
	  if (game.turn() === 'b') {
	    moveColor = 'Black';
	  }

	  // checkmate?
	  if (game.in_checkmate() === true) {
	    var msg = new SpeechSynthesisUtterance('Checkmate');
		window.speechSynthesis.speak(msg);
	    status = 'Game over, ' + moveColor + ' is in checkmate.';
	  }

	  // draw?
	  else if (game.in_draw() === true) {
	    status = 'Game over, drawn position';
	    var msg = new SpeechSynthesisUtterance('The game is a draw');
		window.speechSynthesis.speak(msg);
	  }

	  // game still on
	  else {
	    status = moveColor + ' to move';

	    // check?
	    if (game.in_check() === true) {
	    var msg = new SpeechSynthesisUtterance('Check');
		window.speechSynthesis.speak(msg);
	      status += ', ' + moveColor + ' is in check';
	    }
	  }

	  // statusEl.html(status);
	  // fenEl.html(game.fen());
	  // pgnEl.html(game.pgn());
	};

	var cfg = {
	  draggable: true,
	  position: 'start',
	  onDragStart: onDragStart,
	  onDrop: onDrop,
	  onSnapEnd: onSnapEnd
	};
	myboard = new ChessBoard('board', cfg);
	updateStatus();


///////////////////////////////////////////////////////////////////////////
// VOICE RECOGNITION

	final_transcript = '';
	var recognizing = false;


	if ('webkitSpeechRecognition' in window) {
		console.log("webkit is available!");
		var recognition = new webkitSpeechRecognition();
	    recognition.continuous = true;
	    recognition.interimResults = true;
 
	    recognition.onstart = function() {
	      recognizing = true;
	    };
 
	    recognition.onerror = function(event) {
	      console.log(event.error);
	    };
 
	    recognition.onend = function() {
	      recognizing = false;
	    };
 
	    recognition.onresult = function(event) {
			myevent = event;
	      var interim_transcript = '';
	      for (var i = event.resultIndex; i < event.results.length; ++i) {
			  console.log("i="+i);

			//Stops the dictation if it sees the phrase "stop dictation"
			if(event.results[i][0].transcript.includes("stop dictation")){
			  	recognition.stop();
			}

	        if (event.results[i].isFinal) {

	          final_transcript += 

	          event.results[i][0].transcript.trim() +".\n";
			  console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
			  var mycmd = final_transcript;
			  performMove(mycmd);
	        } else {
	          interim_transcript += 
	 
	          event.results[i][0].transcript;
			  console.log('interim events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));

	        }
	      }
	      //final_transcript = capitalize(final_transcript);
	      final_span.innerHTML = linebreak(final_transcript);
	      interim_span.innerHTML = linebreak(interim_transcript);
    	  
	    };
	}
	
	var two_line = /\n\n/g;
	var one_line = /\n/g;
	function linebreak(s) {
	  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
	}
 
	function capitalize(s) {
	  return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
	}
 
	startDictation = function(event) {
	  if (recognizing) {
	    recognition.stop();
	    return;
	  }
	  final_transcript = '';
	  recognition.lang = 'en-US';
	  recognition.start();
	  final_span.innerHTML = '';
	  interim_span.innerHTML = '';
	}

	performMove = function(MYcmd){
		
	  $('#icommand').val('');
		//parse goes there
		var cmd = MYcmd;
		//split/trim
		cmd = cmd.trim();
		cmd = cmd.toLowerCase();
		cmd = cmd.replace(/\s+/g, '');
		if(cmd.indexOf("to")>-1)
	
		{
			var string1 = cmd.substring(0,cmd.indexOf("to"));
			var string2 = cmd.substring(cmd.indexOf("to")+2);
			for(var i=0;i<result.length;i++)
			{
				if(string1.indexOf(result[i])>-1)
				{
					dict+=result[i];
					dict+="-";
					piecefrom=result[i];
					break;
				}
			}
			if(dict.indexOf("-")<=-1)
			{
				alert("Failed");
				console.log("Failure. dict="+dict);
			}
			var indicator=false;
			for(var i=0;i<result.length;i++)
			{
				if(string2.indexOf(result[i])>-1)
				{
					dict+=result[i];
					indicator = true;
					pieceto=result[i];
					break;
				}
			}
			if(indicator === false)
			{
				alert("Failed");
				console.log("Failure. dict="+dict);
			}
		}
		else if(cmd.indexOf("takes")>-1)
		{
			var string1 = cmd.substring(0,cmd.indexOf("takes"));
			var string2 = cmd.substring(cmd.indexOf("takes")+2);
			for(var i=0;i<result.length;i++)
			{
				if(string1.indexOf(result[i])>-1)
				{
					dict+=result[i];
					dict+="-";
					piecefrom=result[i];
					break;
				}
			}
			if(dict.indexOf("-")<=-1)
			{
				alert("Failed");
				console.log("Failure. dict="+dict);
			}
			var indicator=false;
			for(var i=0;i<result.length;i++)
			{
				if(string2.indexOf(result[i])>-1)
				{
					dict+=result[i];
					indicator = true;
					pieceto=result[i];
					break;
				}
			}
			if(indicator === false)
			{
				alert("Failed");
				console.log("Failure. dict="+dict);
			}
		}
		else if(cmd.indexOf("take")>-1)
		{
			var string1 = cmd.substring(0,cmd.indexOf("take"));
			var string2 = cmd.substring(cmd.indexOf("take")+4);
			for(var i=0;i<result.length;i++)
			{
				if(string1.indexOf(result[i])>-1)
				{
					dict+=result[i];
					dict+="-";
					piecefrom=result[i];
					break;
				}
			}
			if(dict.indexOf("-")<=-1)
			{
				alert("Failed");
				console.log("Failure. dict="+dict);
			}
			var indicator=false;
			for(var i=0;i<result.length;i++)
			{
				if(string2.indexOf(result[i])>-1)
				{
					dict+=result[i];
					indicator = true;
					pieceto=result[i];
					break;
				}
			}
			if(indicator === false)
			{
				alert("Failed");
				console.log("Failure. dict="+dict);
			}
		}
		console.log("Dict is now ->  :"+dict);
		//test if legal
		var piece1=game.get(piecefrom);
		if(piece1 === null)
		{
			var msg = new SpeechSynthesisUtterance('No piece there');
			window.speechSynthesis.speak(msg);
			return;
		}
	  	if(game.game_over() === true)
	  	{
	  		alert("Illegal move -- game is already over");
	  		return;
	  	}
	  	else if(piece1.color != game.turn())
	  	{
	  		var msg = new SpeechSynthesisUtterance('It is not your turn');
			window.speechSynthesis.speak(msg);	
	  	}
	  	else //correct turn
	  	{

	  		var move = game.move({
	    	from: piecefrom,
	    	to: pieceto,
	   		promotion: 'q' // NOTE: always promote to a queen for example simplicity
	  		});
	  		if (move === null) 
	  		{
	  			alert("Illegal move -- no pass");
	  			return;
	  		}

	  		myboard.position(game.fen());
	  		updateStatus();
	  		var msg = new SpeechSynthesisUtterance(cmd);
	  		
			window.speechSynthesis.speak(msg);
	  			
	  	}
	}
};


Template.home.events({

	'click #start_button': function(event){
		startDictation(event);
	},

	'submit #homeform': function(event){
		var cmd = event.target.inputcommand.value;
		event.preventDefault();
		performMove(cmd);
	}
});