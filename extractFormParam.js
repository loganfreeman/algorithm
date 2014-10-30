
var url = 'http://login.scheng.dev/admin.php?op=Form&encounter_id=104000004158&vars[protocolID]=104000000323&vars[eventID]=104000000119&vars[RelTask]=104000000138&vars[CRFtype]=104000000014&vars[crfID]=104000003412&vars[crfForm]=1999058252&vars[subjectnumber]=PA-SpecimenDemo&title=Data%20Clarification%20Form/%20/%20PA-SpecimenDemo%20/%20LCC%20Occlusion'
var params = url.split('&');
var dataMap = [];
var dataMapPattern = /data_map\[\d+\]=\d+/;
var vars = [];
var varPattern = /vars\[\S+\]=\S+/;
params.forEach(function(line){
	//console.log(line);
	if(line.match(dataMapPattern)){
		console.log(line);
	}
	if(line.match(varPattern)){
		console.log(line);
	}
})