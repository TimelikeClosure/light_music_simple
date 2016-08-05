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
	player = document.getElementById('audio-player');
	//this is triggered whenever the time changes.  
	//this happens either when the user changes the seek head on the player
	//or when the audio is playing.  It typically updates every 10th of a second	
	$("#audio-player").on('timeupdate',check_current_time);

	//this is triggered whenever the playhead is moved
	//this can mean we are travelling to an earlier time in the song
	$("#audio-player").on('seeked',function(){
		handle_playhead_change();
	});

	$("#recording-button").click(toggle_recording);
}
function toggle_recording(){
	currently_recording = !currently_recording;
	if(currently_recording){
		$("#recording-button").addClass('btn-danger').text('RECORDING');
	} else{
		$("#recording-button").removeClass('btn-danger').text('not recording');
	}
}
function check_current_time(e){
	//console.log(e);
	if(player.paused){
		return; //don't want it to change lights if it isn't playing.  this would happen if we were seeking while the player was paused
	}
	console.log('the current time is '+player.currentTime);
	while(current_light_script_position < light_script.length && light_script[current_light_script_position].time<=player.currentTime){
		var current_script_item = light_script[current_light_script_position];
		alter_light(light_array[current_script_item.light_id] , current_script_item.state);
		current_light_script_position++;
	}
}
function handle_playhead_change(){
	current_light_script_position = find_current_light_script_position(player.currentTime);
		console.log('playhead changed, now '+current_light_script_position);

}
function find_current_light_script_position(seekTime){
	var i=0;
	var l = light_script.length;
	while(i<l && light_script[i].time<seekTime){
		i++;
	}
	return i;
}
function register_event(light_id,lightProperties,eventTime){
	if(!currently_recording){
		return;
	}
	console.log('saving event: '+light_id+' at '+eventTime,lightProperties);
	var i = find_current_light_script_position(eventTime);
	var light_script_object = {
		time: eventTime,
		light_id: light_id,
		state: lightProperties
	};
	light_script.splice(i,0,light_script_object);
}
function play_script_event(light_id, event){
	alter_light(light_array[light_id],event);
}

