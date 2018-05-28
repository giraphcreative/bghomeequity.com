


$(function(){

	var updateTotal = function() {	
		var resultOne = parseFloat( $(".result.one").html().replace( '$', '' ) );
		var resultTwo = parseFloat( $(".result.two").html().replace( '$', '' ) );
		var resultThree = parseFloat( $(".result.three").html().replace( '$', '' ) );
		if ( isNaN( resultOne ) ) {
			resultOne = 0;
		}
		if ( isNaN( resultTwo ) ) {
			resultTwo = 0;
		}
		if ( isNaN( resultThree ) ) {
			resultThree = 0;
		}
		var totalSavings = resultOne + resultTwo + resultThree;
		if ( totalSavings === 'NaN' ) {
			totalSavings = 0;
		}
		$(".result-total-savings").html( totalSavings );
	}

	$(".calculator.home-equity-one").accrue({
		mode: "compare",
		response_output_div: ".result.one",
		response_compare:"$%savings%",
		error_text:"",
		callback: updateTotal
	});

	$(".calculator.home-equity-two").accrue({
		mode: "compare",
		response_output_div: ".result.two",
		response_compare:"$%savings%",
		error_text:"",
		callback: updateTotal
	});

	$(".calculator.home-equity-three").accrue({
		mode: "compare",
		response_output_div: ".result.three",
		response_compare:"$%savings%",
		error_text:"",
		callback: updateTotal
	});

	$(".numbers-only").keyup(function(){
		var fixed=$(this).val().replace(/[^0-9.]/g,"");
		$(this).val( fixed );
	});

});

