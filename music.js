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
	//set the player variable to the audio player element.  We need the CORE JS element, not the jquery one
	//this is triggered whenever the time changes.  
	//this happens either when the user changes the seek head on the player
	//or when the audio is playing.  It typically updates every 10th of a second	
	//attach a "timeupdate" event handler to the audio player, and have it call check_current_time

	//this is triggered whenever the playhead is moved
	//this can mean we are travelling to an earlier time in the song
	//attach a "seeked" handler to the audio player, and have it call handle_playhead_change



	//attach a click handler to the recording button, and have it execute the toggle_recording function
}
function toggle_recording(){
	//toggle the currently_recording boolean by inverting its value
	//if we are currently_recording
	//change the record button's class to have bootstrap's danger class (red!), and then change its text to indicate we are recording
	//else
	//if we aren't recording, toggle both off

}
function check_current_time(e){
	//console.log(e);
	//if the player is paused
	//don't want it to change lights if it isn't playing.  this would happen if we were seeking while the player was paused


	//check if the current script item's time is now BEFORE the player's current time.  That means we have passed the time it should be played and then play that event.  It's done as a while loop because there could be multiple items at the exact same time index
	//get a variable pointing to our current light script item
	//tell the light to alter its current state based on the script item at the current position
	//keep incrementing out position.  oonce this while loop ends, it will be pointing to the right place

}
function handle_playhead_change(){
	//the playhead was scrolled manually.  figure out where we are at the moment for the next time we press play


}
function find_current_light_script_position(seekTime){
	//initialize our variable i
	//get the length of the script
	//keep iterating while our current item has a time before the player's current time.  We need to keep iterating i until we find a time AFTER the player's current time
	//increment the i counter so we can check the next item, since the items we are on have already passed

	//return the index of the appropriate light script index
}
function register_event(light_id,lightProperties,eventTime){
	//check if the currently_recording flag is true.  if we aren't recording, no need to continue in this function
	//return from the function
	//end if statement

	//find where we currently are in the light script based on the event time
	//create out light_script_object
	//and fill in the time,
	//the light id
	//and the state changes


}
function play_script_event(light_id, event){
	//call the alter_light function, pass in the light's id and the light's properties to change (The event)
}

