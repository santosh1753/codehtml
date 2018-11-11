function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function startTime() {
    var today = new Date();
    var date = today.getFullYear() + '/' + (((today.getMonth() + 1) < 10) ? '0' : '') + (today.getMonth() + 1) + '/' + ((today.getDate() < 10) ? '0' : '') + today.getDate();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = date+ "      "+ h + ":" + m + ":" + s;
    t = setTimeout(function () {
        startTime()
    }, 500);
}
startTime();

var data = [{"ServiceName":"TallySite","ServiceStatus":"Running"},{"ServiceName":"GSTN","ServiceStatus":"Running"},{"ServiceName":"MPLS","ServiceStatus":"Running"}];

var serviceList = '<tr>'+
			      '<td class="site-name">Tally Site</td>'+
				  '<td class="show-status"><span class="status-text"></span><span class="status blink"></span></td>'+
			   '</tr>';
var wrapper = $(".status-table").find("tbody");

//RREMOVE ONCE API DONE NO NEED TO ADD ANY WHERE I ALLREADY ADDED IN SUCCESS CALL

// TO HERE
checkStatus();
function checkStatus(){
	$.ajax({
		type: "GET",
		url: "http://13.232.5.20:8000/webportal/status",
		success: function(data) {
			$("tbody tr").remove()
			for(var i=0;i < data.length ;i++) {
			   var services = data[i].Services;
			   var Status = data[i].Status
			   $(wrapper).append(serviceList);
			   $(wrapper).find("tr:last .site-name").text(services);
			   if(Status == "Available"){
				  $(wrapper).find("tr:last .status").addClass("success");
				  $(wrapper).find("tr:last .status-text").text("Available");
			   } else {
				  $(wrapper).find("tr:last .status").addClass("failure");
				  $(wrapper).find("tr:last .status-text").text("Status Not Available");
			   }
			}
		}
	});
	setTimeout(function(){
		checkStatus();
	},500000); // CHANGE TIME WAHT YOU WANT
}
