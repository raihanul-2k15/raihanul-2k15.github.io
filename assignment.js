function validOrNot() {
	var r=document.getElementById("roll").value;
	if (isNaN(r)) {
		document.getElementById("btnGo").disabled=true;
	} else {
		document.getElementById("btnGo").disabled=false;
	}
}
function do_assignment() {
	const TOTAL=40;
	const CLASS_INTERVAL=5;
	const A=10;
	var all_marks=[20,15,14,13,18,10,14,19,19,19,0,13,13,20,20,17,15,4,16,20,0,20,18,9,17,14,15,15,9,16,10,20,0,19,0,10,16,0,18,18,14,19,20,14,17,10,17,0,17,16,14,11,13,16,16,14,14,15,17,18,
					19,18,17,11,15,9,15,14,17,19,17,18,15,20,20,20,16,16,20,16,18,17,19,19,18,19,20,19,11,20,20,19,16,19,20,18,0,10,15,16,19,19,17,19,11,20,16,19,20,13,12,20,20,14,17,19,11,7,14,19];
	var roll=+document.getElementById("roll").value;
	var statusObj=document.getElementById("status");
	if (isNaN(roll)) {
		statusObj.innerHTML="Status: Enter valid roll."
		statusObj.color="red";
		return "error";
	}
	if (roll <0 || roll >120) {
		statusObj.innerHTML="Status: Enter roll within 1 and 120."
		statusObj.color="red";
		return "error";
	}

	statusObj.innerHTML="Status: Roll valid. Processing...";
	statusObj.style.color="blue";
	var marks=[];
	for (var i=-1;i<TOTAL-1;i++) {
		marks.push(all_marks[(roll+i)%all_marks.length]);
	}
	var f=[0,0,0,0];
	for (var i=0;i<TOTAL;i++) {
		if (marks[i]>=0 && marks[i]<=5) {
			f[0]++;
		} else if (marks[i]>=6 && marks[i]<=10) {
			f[1]++;
		} else if (marks[i]>=11 && marks[i]<=15) {
			f[2]++;
		} else if (marks[i]>=16 && marks[i]<=20) {
			f[3]++;
		}
	}
	var N=40;
	document.getElementById("answers").style.display="block";
	for (var i=0;i<4;i++) {
		document.getElementById("freq_"+i).innerHTML=f[i];
	}
	var d=[-1.5,-0.5,0.5,1.5];
	var sum_fd_1=0,sum_fd_2=0,sum_fd_3=0,sum_fd_4=0;
	for (var r=0;r<4;r++) { // take one row
		var temp=f[r]*d[r];
		sum_fd_1+=temp;
		document.getElementById("fd_1_"+r).innerHTML=temp.toFixed(2);
		temp=f[r]*Math.pow(d[r],2);
		sum_fd_2+=temp;
		document.getElementById("fd_2_"+r).innerHTML=temp.toFixed(2);
		temp=f[r]*Math.pow(d[r],3);
		sum_fd_3+=temp;
		document.getElementById("fd_3_"+r).innerHTML=temp.toFixed(2);
		temp=f[r]*Math.pow(d[r],4);
		sum_fd_4+=temp;
		document.getElementById("fd_4_"+r).innerHTML=temp.toFixed(2);
	}
	document.getElementById("sum_fd_1").innerHTML=sum_fd_1.toFixed(2);
	document.getElementById("sum_fd_2").innerHTML=sum_fd_2.toFixed(2);
	document.getElementById("sum_fd_3").innerHTML=sum_fd_3.toFixed(2);
	document.getElementById("sum_fd_4").innerHTML=sum_fd_4.toFixed(2);

	// Table populated. Now answering other questions

	// raw moments
	var u1Bar=(sum_fd_1 * CLASS_INTERVAL) / N;
	var u2Bar=(sum_fd_2 * Math.pow(CLASS_INTERVAL,2)) / N;
	var u3Bar=(sum_fd_3 * Math.pow(CLASS_INTERVAL,3)) / N;
	var u4Bar=(sum_fd_4 * Math.pow(CLASS_INTERVAL,4)) / N;
	document.getElementById("1_r_m").innerHTML=u1Bar.toFixed(2);
	document.getElementById("2_r_m").innerHTML=u2Bar.toFixed(2);
	document.getElementById("3_r_m").innerHTML=u3Bar.toFixed(2);
	document.getElementById("4_r_m").innerHTML=u4Bar.toFixed(2);

	// central moments
	 var u1=0;
	 var u2=u2Bar-Math.pow(u1Bar,2);
	 var u3=u3Bar-3*u1Bar*u2Bar+2*Math.pow(u1Bar,3);
	 var u4=u4Bar-4*u1Bar*u3Bar+6*u2Bar*Math.pow(u1Bar,2)-3*Math.pow(u1Bar,4);
	document.getElementById("1_c_m").innerHTML=u1.toFixed(2);
	document.getElementById("2_c_m").innerHTML=u2.toFixed(2);
	document.getElementById("3_c_m").innerHTML=u3.toFixed(2);
	document.getElementById("4_c_m").innerHTML=u4.toFixed(2);

	// mean and standard deviation
	var mean=A + CLASS_INTERVAL * sum_fd_1 / N;
	var standard_deviation=Math.sqrt(sum_fd_2/N - Math.pow(sum_fd_1/N,2))*CLASS_INTERVAL;
	document.getElementById("mean").innerHTML=mean.toFixed(2);
	document.getElementById("standard_deviation").innerHTML=standard_deviation.toFixed(2);

	// skewness
	var skewness=u3/Math.pow(standard_deviation,3);
	document.getElementById("skewness").innerHTML=skewness.toFixed(2);

	// kurtosis
	var kurtosis = u4 / Math.pow(u2,2) - 3;
	document.getElementById("kurtosis").innerHTML=kurtosis.toFixed(2);

	// done
	statusObj.innerHTML="Status: Done";
	statusObj.style.color="black";
}