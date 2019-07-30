let $ = require('./jquery-3.4.1.min.js')
let fs = require('fs')
let moment = require('moment')
let {PythonShell} = require('python-shell')
let templateName;
// let valueList = new array();

dateStr = moment().format('D-MMM-YYYY');


$('.frontSubmitBtn').on('click',()=>{
	crateHtmlFile()
});
let banner = 1;
$('.addMoreBanner').on('click', function(){
	let htmlTemp = $('.bannerSection').html();
	$("<div class='bannerSection mb-3 col-sm-12'>"+htmlTemp+"</div>").insertAfter('.bannerSection');
});
$('.addMoreStrip').on('click', function(){
	let htmlTemp = $('.stripSection').html();
	$("<div class='stripSection mb-3 col-sm-12'>"+htmlTemp+"</div>").insertAfter('.stripSection');
});
$('.removeBanner').on('click', function(){
	$(this).parent('.bannerSection').remove();
});
$('.removeStrip').on('click', function(){
	$(this).parent('.bannerSection').remove();
});

// ***********************Checkboxes*******************
$('.logoCheckBox').on('click',()=>{
	let value = $('.logoCheckBox').is(":checked");
	$('.logoInput').prop("disabled", !value);
});
$('.templateName').on('click',()=>{
	let value = $('.templateName').is(":checked");
	$('.templateNameInput').prop("disabled", !value);
});
// ***********************Checkbox End*******************
// **********************Radio Button ********************
$("input[type='radio'].radioCountry").click(function(){
            let radioValue = $("input[name='radioCountry']:checked").val();
			templateName = "template_"+dateStr+"_"+radioValue+".html";
            $(".templateNameInput").val(templateName);
});

// *****************Initialization of value*************************
let subline;



// *******************************getting value on click of submit****************
$(".frontSubmitBtn").on('click',function(){
	if(!$(".templateNameInput").prop("disabled"))
	{
		templateName = $(".templateNameInput").val();
	}
	subline = $(".subject_line").find("input").val();













	htmlTemp = `<!DOCTYPE html>
<html>

<head>
    <title>Eduonix</title>
    <META NAME="robots" CONTENT="noindex">
    <link rel="shortcut icon" href="https://www.eduonix.com/assets/images/favicon.ico">
</head>

<body>
    <center>
        <table cellspacing="0" cellpadding="0" border="0" width="640" style="background-color: #fff;">
            <tr>
                <td style="display:none; background-color: #fff; color:#fff;"><span class="subline"
                        style="display:none; background-color: #fff; color:#fff;">`+ subline + `</span></td>
            </tr>
            <tr>
                <td colspan="3" align="center" style="background-color: #ffffff; text-align: center; padding: 10px;">`

	console.log(htmlTemp);
});

// **********************Radio Button End********************

// **********************************Html Template*************************



// ********************************Functions*************************
function rowGenerator(utm,imgUrl){
	let data = "";
	let endData = "";
	if(utm != ""){
		data = data+"<a href='"+utm+"'>"
		endData = "</a>";
	}
	if(imgUrl != "")
	{
		data = data + "<img src='"+imgUrl+"'>"+endData;
	}
	return data;
}

// Creating HTML
function crateHtmlFile(){
	console.log(templateName);
	fs.writeFile(templateName, "Hey there!", function(err) {
    if(err) {
        return alert(err)
    }
    console.log("The file was saved!")
	}) 
}

// let options = {args: valueList}

// PythonShell.run('project.py', options, function  (err, results)  {
//  if  (err)  throw err;
//  console.log('project.py finished.');
//  console.log('results', results);
// });
