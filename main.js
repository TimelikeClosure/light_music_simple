var user="-5LvL6u1OwtkZhzSVHrgm3Hii2D4sygTvCrZ9uhN";
var bridge_address = "http://192.168.1.99/api";
var light_array= {};

$(document).ready(function(){
	get_light_list();
});


function create_light_list(light_list){
	var temp_array = [];
	for(var i in light_list){
		
		var light_dom_element = create_light_dom_element(light_list[i]);
		temp_array.push(light_dom_element);
		light_list[i].dom_element = light_dom_element;
		light_list[i].id = parseInt(i);
		add_light_to_array(light_list[i]);

	}
	$("#light-list").append(temp_array);
}

function add_light_to_array(light){
	console.log(light);
	light_array[light.id]=light;
}

function create_light_dom_element(light){
	var light_container = $("<div>",{
		class: 'light-container'
	});
	var light_name = $("<div>",{
		class: 'light-name',
		text: light.name
	});
	var light_type = $("<div>",{
		class: 'light-type',
		text: light.type
	});
	var light_icon = $("<i>").addClass("light-icon fa fa-lightbulb-o").attr('aria-hidden','true');
	if(!light.state.reachable){
		light_icon.addClass('light-unreachable');
	}
	else if(light.state.on){
		light_icon.addClass('light-on');
	} else{
		light_icon.addClass('light-off');
	}
	light_icon.click(function(){
		register_event(light.id,{on:!light.state.on},player.currentTime);
		toggle_light(light);
	});
	light_container.append(light_icon, light_name, light_type);	
	return light_container;
}
function toggle_light(light, direct_trigger){
	if(direct_trigger==undefined){
		direct_trigger = false;
	}
	console.log('current state: '+light.state);
	alter_light(light,{on:!light.state.on});
}
function get_light_list(){
	var params = {
		url: bridge_address + '/'+user+'/lights',
		method: 'GET',
		success_callback: function(response){
          create_light_list(response);
		},
		error_callback: function(response){
			console.log('error: ',response);
		}
	};
	ajax_call(params);
}

function ajax_call(url,data,method,success_callback,error_callback){
	//console.log('calling url '+url+' with data ',data);
	if(typeof url=='object'){
		data = url.data;
		if(url.method == undefined){
			method = 'POST'
		} else{
			method = url.method;
		}
		success_callback = url.success_callback;
		error_callback = url.error_callback;
		url = url.url;
	}
	if(success_callback == undefined){
		success_callback = function(response){
			//console.log('success',response);
		}
	}
	if(error_callback == undefined){
		error_callback = function(response){
			console.error('error: ');
			console.error(response);
		}
	}
	$.ajax({
		url: url,
		data: JSON.stringify(data),
		method: method,
		dataType: 'json',
		processData: false,
    	contentType: 'application/json',
		success: success_callback,
		error: error_callback
	});
}

function alter_light(light,properties){
	if(!light.state.reachable){
		return;
	}
	var light_id = light.id;
	console.log('light '+light_id+' saving ',properties);
	var params = {
		url: bridge_address + '/'+user+'/lights/'+light_id+'/state',
		data: properties,
		method: 'PUT',
		success_callback: function(response){
			//console.log('success: ',response);
			if(response[0].success != undefined){
				
				for(var i in response[0].success){
					var response_array = i.split('/');
					light_array[response_array[2]][response_array[3]][response_array[4]] = response[0].success[i];
				}
				display_light_update(response_array,response[0].success[i],light);
			}
			
		},
		error_callback: function(response){
			console.error('error: ',response);
		}
	};
	ajax_call(params);

}
function display_light_update(light_data, new_state, light){
	light.state[light_data[4]] = new_state;
	if(light_data[3]=='state'){
		switch(light_data[4]){
			case 'on':
				var new_onoff = 'light-'+((new_state) ? 'on' : 'off');
				light.dom_element.find('.light-on,.light-off').removeClass('light-on light-off').addClass(new_onoff);
			case 'hue':
			case 'bri':
		}
	}
}