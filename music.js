$(document).ready(initialize_music_sync);
var light_script = [];
var player;
var currently_recording = false;
var sample_light_script_object = {
	time: 10345.2,
	light_id: 2,
	state: {
		on: true
	}
};

var sample_light_script = [
	{
		time: 2000,
		light_id: 2,
		state: {
			on: true
		}
	},
{
	time: 4000,
	light_id: 2,
	state: {
		on: false
	}
}
];

var current_light_script_position = 0;
function initialize_music_sync(){

	//this provides a link to our audio player.  this is a core JS element rather than jQuery element
	player = document.getElementById('audio-player');  //set the player variable to the audio player element.  We need the CORE JS element, not the jquery one
	//this is triggered whenever the time changes.  
	//this happens either when the user changes the seek head on the player
	//or when the audio is playing.  It typically updates every 10th of a second	
	$("#audio-player").on('timeupdate',check_current_time); //attach a "timeupdate" event handler to the audio player, and have it call check_current_time

	//this is triggered whenever the playhead is moved
	//this can mean we are travelling to an earlier time in the song
	$("#audio-player").on('seeked',function(){  //attach a "seeked" handler to the audio player, and have it call handle_playhead_change
		handle_playhead_change();  
	});

	$("#recording-button").click(toggle_recording);  //attach a click handler to the recording button, and have it execute the toggle_recording function
}
function toggle_recording(){
	currently_recording = !currently_recording;  //toggle the currently_recording boolean by inverting its value
	if(currently_recording){  //if we are currently_recording
		$("#recording-button").addClass('btn-danger').text('RECORDING');  //change the record button's class to have bootstrap's danger class (red!), and then change its text to indicate we are recording
	} else{  //else
		$("#recording-button").removeClass('btn-danger').text('not recording'); //if we aren't recording, toggle both off
	}
}
function check_current_time(e){
	//console.log(e);
	if(player.paused){  //if the player is paused
		return; //don't want it to change lights if it isn't playing.  this would happen if we were seeking while the player was paused
	}
	console.log('the current time is '+player.currentTime);
	while(current_light_script_position < light_script.length && light_script[current_light_script_position].time<=player.currentTime){ //check if the current script item's time is now BEFORE the player's current time.  That means we have passed the time it should be played and then play that event.  It's done as a while loop because there could be multiple items at the exact same time index
		var current_script_item = light_script[current_light_script_position]; //get a variable pointing to our current light script item
		alter_light(light_array[current_script_item.light_id] , current_script_item.state);  //tell the light to alter its current state based on the script item at the current position
		current_light_script_position++;  //keep incrementing out position.  oonce this while loop ends, it will be pointing to the right place
	}
}
function handle_playhead_change(){
	current_light_script_position = find_current_light_script_position(player.currentTime);  //the playhead was scrolled manually.  figure out where we are at the moment for the next time we press play
	console.log('playhead changed, now '+current_light_script_position);

}
function find_current_light_script_position(seekTime){
	var i=0;		//initialize our variable i
	var l = light_script.length;  //get the length of the script
	while(i<l && light_script[i].time<seekTime){ //keep iterating while our current item has a time before the player's current time.  We need to keep iterating i until we find a time AFTER the player's current time
		i++;   //increment the i counter so we can check the next item, since the items we are on have already passed
	}
	return i;  //return the index of the appropriate light script index
}
function register_event(light_id,lightProperties,eventTime){
	if(!currently_recording){ //check if the currently_recording flag is true.  if we aren't recording, no need to continue in this function
		return;			//return from the function
	}	//end if statement
	console.log('saving event: '+light_id+' at '+eventTime,lightProperties);
	var i = find_current_light_script_position(eventTime); //find where we currently are in the light script based on the event time
	var light_script_object = {   //create out light_script_object 
		time: eventTime,			//and fill in the time,
		light_id: light_id,			//the light id
		state: lightProperties		//and the state changes
	};
	light_script.splice(i,0,light_script_object);
}
function play_script_event(light_id, event){
	alter_light(light_array[light_id],event); //call the alter_light function, pass in the light's id and the light's properties to change (The event)
}

