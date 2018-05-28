!function(i,t,e,a){i.extend(i.fn,{accrue:function(r){return r=i.extend({calculationMethod:o},i.fn.accrue.options,r),this.each(function(){var e=i(this);e.find(".form").length||e.append('<div class="form"></div>');c(e,r,"amount"),c(e,r,"rate"),c(e,r,"term");if("compare"==r.mode)c(e,r,"rate_compare");if(".results"===r.response_output_div){0==e.find(".results").length&&e.append('<div class="results"></div>');var a=e.find(".results")}else a=i(r.response_output_div);switch(r.mode){case"basic":var n=o;break;case"compare":n=l;break;case"amortization":n=s}n(e,r,a),"button"==r.operation?(0==e.find("button").length&&e.find(".form").append('<button class="accrue-calculate">'+r.button_label+"</button>"),e.find("button, input[type=submit]").each(function(){i(this).click(function(t){t.preventDefault(),n(e,r,a)})})):e.find("input, select").each(function(){i(this).bind("keyup change",function(){n(e,r,a)})}),e.find("form").each(function(){i(this).submit(function(t){t.preventDefault(),n(e,r,a)})})})}}),i.fn.accrue.options={mode:"basic",operation:"keyup",default_values:{amount:"$7,500",rate:"7%",rate_compare:"1.49%",term:"36m"},field_titles:{amount:"Loan Amount",rate:"Rate (APR)",rate_compare:"Comparison Rate",term:"Term"},button_label:"Calculate",field_comments:{amount:"",rate:"",rate_compare:"",term:"Format: 12m, 36m, 3y, 7y"},response_output_div:".results",response_basic:"<p><strong>Monthly Payment:</strong><br />$%payment_amount%</p><p><strong>Number of Payments:</strong><br />%num_payments%</p><p><strong>Total Payments:</strong><br />$%total_payments%</p><p><strong>Total Interest:</strong><br />$%total_interest%</p>",response_compare:"Save $%savings% in interest!",error_text:"Please fill in all fields.",callback:function(t,e){}};var c=function(t,e,a){var n=t.find("."+a).length?t.find("."+a):t.find(".accrue-"+a).length?t.find(".accrue-"+a):t.find("input[name~="+a+"]").length?t.find("input[name~="+a+"]"):"";return"string"!=typeof n?n.val():"term_compare"!=a&&(t.find(".form").append('<div class="accrue-field-'+a+'"><p><label>'+e.field_titles[a]+':</label><input type="text" class="'+a+'" value="'+e.default_values[a]+'" />'+(0<e.field_comments[a].length?"<small>"+e.field_comments[a]+"</small>":"")+"</p></div>"),t.find("."+a).val())},o=function(t,e,a){var n=i.loanInfo({amount:c(t,e,"amount"),rate:c(t,e,"rate"),term:c(t,e,"term")});if(0!==n){var r=e.response_basic.replace("%payment_amount%",n.payment_amount_formatted).replace("%num_payments%",n.num_payments).replace("%total_payments%",n.total_payments_formatted).replace("%total_interest%",n.total_interest_formatted);a.html(r)}else a.html(e.error_text);e.callback(t,n)},l=function(t,e,a){var n=c(t,e,"term_compare");!1===n&&(n=c(t,e,"term"));var r=i.loanInfo({amount:c(t,e,"amount"),rate:c(t,e,"rate"),term:c(t,e,"term")}),o=i.loanInfo({amount:c(t,e,"amount"),rate:c(t,e,"rate_compare"),term:n}),l={loan_1:r,loan_2:o};if(0!==r&&0!==o){0<r.total_interest-o.total_interest?l.savings=r.total_interest-o.total_interest:l.savings=0;var s=e.response_compare.replace("%savings%",l.savings.toFixed(2)).replace("%loan_2_payment_amount%",o.payment_amount_formatted).replace("%loan_2_num_payments%",o.num_payments).replace("%loan_2_total_payments%",o.total_payments_formatted).replace("%loan_2_total_interest%",o.total_interest_formatted).replace("%loan_1_payment_amount%",r.payment_amount_formatted).replace("%loan_1_num_payments%",r.num_payments).replace("%loan_1_total_payments%",r.total_payments_formatted).replace("%loan_1_total_interest%",r.total_interest_formatted);a.html(s)}else a.html(e.error_text);e.callback(t,l)},s=function(t,e,a){var n=i.loanInfo({amount:c(t,e,"amount"),rate:c(t,e,"rate"),term:c(t,e,"term")});if(0!==n){var r='<table class="accrue-amortization"><tr><th class="accrue-payment-number">#</th><th class="accrue-payment-amount">Payment Amt.</th><th class="accrue-total-interest">Total Interest</th><th class="accrue-total-payments">Total Payments</th><th class="accrue-balance">Balance</th></tr>',o=n.payment_amount-n.original_amount/n.num_payments,l=n.payment_amount-o;counter_interest=0,counter_payment=0,counter_balance=parseInt(n.original_amount);for(var s=0;s<n.num_payments;s++){counter_interest+=o,counter_payment+=n.payment_amount,counter_balance-=l;var m="td";s==n.num_payments-1&&(m="th"),r=r+"<tr><"+m+' class="accrue-payment-number">'+(s+1)+"</"+m+"><"+m+' class="accrue-payment-amount">$'+n.payment_amount_formatted+"</"+m+"><"+m+' class="accrue-total-interest">$'+counter_interest.toFixed(2)+"</"+m+"><"+m+' class="accrue-total-payments">$'+counter_payment.toFixed(2)+"</"+m+"><"+m+' class="accrue-balance">$'+counter_balance.toFixed(2)+"</"+m+"></tr>"}r+="</table>",a.html(r)}else a.html(e.error_text);e.callback(t,n)};i.loanInfo=function(t){var e=(void 0!==t.amount?t.amount:0).replace(/[^\d.]/gi,""),a=(void 0!==t.rate?t.rate:0).replace(/[^\d.]/gi,""),n=void 0!==t.term?t.term:0;n=n.match("y")?12*parseInt(n.replace(/[^\d.]/gi,"")):parseInt(n.replace(/[^\d.]/gi,""));var r=a/1200,o=e*(r/(1-Math.pow(1+r,-1*n)));return 0<e*a*n?{original_rate:a,original_term:n,original_amount:e,payment_amount:o,payment_amount_formatted:o.toFixed(2),num_payments:n,total_payments:o*n,total_payments_formatted:(o*n).toFixed(2),total_interest:o*n-e,total_interest_formatted:(o*n-e).toFixed(2)}:0}}(jQuery,window,document),$(function(){var t=function(){var t=parseFloat($(".result.one").html().replace("$","")),e=parseFloat($(".result.two").html().replace("$","")),a=parseFloat($(".result.three").html().replace("$",""));isNaN(t)&&(t=0),isNaN(e)&&(e=0),isNaN(a)&&(a=0);var n=t+e+a;"NaN"===n&&(n=0),$(".result-total-savings").html(n)};$(".calculator.home-equity-one").accrue({mode:"compare",response_output_div:".result.one",response_compare:"$%savings%",error_text:"",callback:t}),$(".calculator.home-equity-two").accrue({mode:"compare",response_output_div:".result.two",response_compare:"$%savings%",error_text:"",callback:t}),$(".calculator.home-equity-three").accrue({mode:"compare",response_output_div:".result.three",response_compare:"$%savings%",error_text:"",callback:t}),$(".numbers-only").keyup(function(){var t=$(this).val().replace(/[^0-9.]/g,"");$(this).val(t)})});var valid_email=function(t){return-1!=String(t).search(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)},contact_submit=function(t){$(t).find("input[type=submit]").attr("disabled","disabled");var e={name:$(t).find("input[name=name]").val(),email:$(t).find("input[name=email]").val(),phone:$(t).find("input[name=phone]").val(),best_time:$(t).find("input[name=best-time]").val(),current_member:$(t).find("input[name=current-member]").val(),message:$(t).find("textarea").val()},a=$.param(e),n=[],r=$(t).find(".error");return r.html(""),e.name.length<2&&n.push("Please provide a name."),valid_email(e.email)||n.push("Please provide a valid email address."),0==n.length?$.post("/send.php",a,function(t){"success"===t?location.href="/thanks.html":r.html("There was a problem submitting the form. Please call us for further assistance.").slideDown(400)}):(r.html(""),$.each(n,function(t,e){0===t?r.append(e):r.append("<br>"+e)}),r.is(":hidden")&&r.slideDown(400)),!1};$(document).ready(function(){$("form#contact").submit(function(t){t.preventDefault(),contact_submit(this)})});