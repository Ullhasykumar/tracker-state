
var commArr;
var state_name = document.getElementById("state_name");


function fetchAllData() 
{
	var request= new XMLHttpRequest();
	request.open('GET','https://api.covid19india.org/data.json');
	request.send();
	request.onload= function() {
		commArr = JSON.parse(request.responseText);
		console.log(commArr);
		fetchStates(commArr.statewise);
		//displayResults(commArr.statewise);
	}
	
}
function fetchStates(stateData)
{

	for(var i=0;i<stateData.length;i++)
	{
		var option = document.createElement("OPTION");
		option.innerHTML =stateData[i].state;
		option.value = stateData[i].state;
		state_name.options.add(option);
		if(stateData[i].state=="Total")
		{
			option.selected=true;
			displayResults(stateData[i]);
		}
		
		
	}
	
	
}
function displayResults(obj)
{
	document.getElementById('active').innerHTML=obj.active;
	document.getElementById('confirm').innerHTML=obj.confirmed;
	document.getElementById('recover').innerHTML=obj.recovered;
	document.getElementById('death').innerHTML=obj.deaths;
	document.getElementById('new_confirm').innerHTML=obj.deltaconfirmed;
	document.getElementById('new_recover').innerHTML=obj.deltarecovered;
	document.getElementById('new_death').innerHTML=obj.deltadeaths;

}

state_name.addEventListener('change',function(event){
	for(var i=0;i<commArr.statewise.length;i++)
	{
		if(commArr.statewise[i].state==event.target.value)
		{
			displayResults(commArr.statewise[i])
		}
	}
	
})
fetchAllData();