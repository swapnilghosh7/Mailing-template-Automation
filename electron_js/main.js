let $ = require('./jquery-3.4.1.min.js')
let fs = require('fs')
var http = require('http')
let moment = require('moment')
const fileDialog = require('file-dialog')
var dialog = require('nw-dialog')

let {PythonShell} = require('python-shell')
let templateName;
const spawnSync = require("child_process").spawnSync;


dateStr = moment().format('D-MMM-YYYY');

let stripSectionHtmlTemplate = $('.stripSection').html();
let bannerSectionHtmlTemplate = $('.bannerSection').html();
let sectionHtmlTemplate = $('.mailingSectionWrap').html();

let banner = 1;
$(document).on('click','.addMoreBanner', function(){
	$("<div class='bannerSection mb-3 col-sm-12'>"+bannerSectionHtmlTemplate+"</div>").insertBefore('.bannerSection');
});
$(document).on('click','.addMoreStrip', function(){
	$("<div class='stripSection htmlsection mb-3 col-sm-12'>"+stripSectionHtmlTemplate+"</div>").insertBefore($(this).parent("div"));
});
$(document).on('click','.addMoreSection', function(){
	
	$("<div class='mailingSectionWrap htmlsection'>"+sectionHtmlTemplate+"</div>").insertBefore($(this).parent("div"));
});
$(document).on('click','.removeBanner', function(){
	$(this).parent('.bannerSection').remove();
});
$(document).on('click','.removeStrip', function(){
	$(this).parent('.stripSection').remove();
});
$(document).on('click','.removeSection', function(){
	$(this).parents('.mailingSectionWrap').remove();
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
let utmLogo;
let logoUrl;
let logoHtml;
let bannerHtml;



// *******************************getting value on click of submit****************
$(".frontSubmitBtn,.frontPreviewBtn").on('click',function(){
	if(!$(".templateNameInput").prop("disabled"))
	{
		templateName = $(".templateNameInput").val();
	}
	subline = $(".subject_line").find("input").val();
	utmLogo = $(".logoUtm").val();
	logoUrl = ($(".logoInput").val())?$(".logoInput").val():"https://www.eduonix.com/assets/images/edu_logo_single.png";
	
	logoHtml = rowGenerator(utmLogo,logoUrl);
	if($(this).hasClass('frontPreviewBtn')){
		bannerHtml = htmlRowPreviewGen(".htmlsection")
	}
	else{
		bannerHtml = htmlRowGen(".htmlsection");
	}
	

	let htmlFinal = `<!DOCTYPE html>
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
	                <td colspan="3" align="center" style="background-color: #ffffff; text-align: center; padding: 10px;">`+logoHtml+`
	                </td></tr>` + bannerHtml +`<tr> <td style="background-color: #000;">
	                    <table width="640">
	                        <tr>
	                            <td align="center" style="background-color:#000; color:#fff;">
	                                <table>
	                                    <tr>
	                                        <td align="center"
	                                            style="padding:20px; padding-bottom: 0px; font-family: Arial;"> <span
	                                                style="color:#fff; display:inline-block; vertical-align: top; padding-top: 5px;">Learn
	                                                With Us:</span>
	                                            <a href="https://www.facebook.com/EDUonix" target="_blank"><img
	                                                    src="https://www.eduonix.com/mailing_img/fb_k.png"></a>
	                                            <a href="https://twitter.com/Tutor_Eduonix" target="_blank"><img
	                                                    src="https://www.eduonix.com/mailing_img/tw_k.png"></a>
	                                            <a href="https://www.youtube.com/c/eduonix?sub_confirmation=1"
	                                                target="_blank"><img
	                                                    src="https://www.eduonix.com/mailing_img/yt_k.png"></a>
	                                            <a href="https://www.linkedin.com/company/eduonix-learning-solutions-pvt-ltd/"
	                                                target="_blank"><img
	                                                    src="https://www.eduonix.com/mailing_img/in_k.png"></a>
	                                            <a href="https://www.instagram.com/eduonix/" target="_blank"><img
	                                                    src="https://www.eduonix.com/mailing_img/int_k.png"></a>
	                                        </td>
	                                    </tr>
	                                    <tr>
	                                        <td align="center"
	                                            style="font-size: 10px; padding: 10px 20px 30px 20px; font-family: Arial;line-height:15px;">
	                                            &copy; 2019 Eduonix Learning Solutions Pvt. Ltd. All Rights Reserved. <a
	                                                href="https://www.eduonix.com/terms-and-conditions" target="_blank"
	                                                style="color:#fff; text-decoration:none;">Terms And Conditions </a>| <a
	                                                href="https://www.eduonix.com/privacy-policy" target="_blank"
	                                                style="color:#fff; text-decoration:none;">Privacy Policy</a> | <a
	                                                href="https://www.eduonix.com/sitemap" target="_blank"
	                                                style="color:#fff; text-decoration:none;">Sitemap</a>
	                                            <br> <a
	                                                href="https://www.eduonix.com/offers/emails/jul19/template_30july19_ind.html"
	                                                style="color:#fff; font-family: Arial;">View In Browser</a></td>
	                                    </tr>
	                                </table>
	                            </td>
	                        </tr>
	                    </table>
	                </td>
	            </tr>
	        </table>
	    </center>
	</body>

	</html>`

	console.log(htmlFinal);
	if($(this).hasClass('frontPreviewBtn')){
		$(".previewSection").html(htmlFinal);
	}
	else{
		crateHtmlFile(htmlFinal);

	}

	

});

// **********************Radio Button End********************

// **********************************Html Template*************************
function htmlRowGen(targetElement){
	let htmlDataRow = "";
	 $(targetElement).each(function(){
	 	if($(this).hasClass("mailingSectionWrap"))
	 	{
	 		let valueList = [];
	 		coloumn = $(this).find(".col-num").val();
	 		R1 = $(this).find(".row-start").val();
	 		R2 = $(this).find(".row-end").val();
	 		C1 = $(this).find(".utm-col").val();
	 		C2 = $(this).find(".img-col").val();
	 		valueList.push(coloumn,R1,R2,C1,C2,templateName);
	 		
	 		// let options = {args: valueList}
			// PythonShell.run('project.py', options, function  (err, results)  {
			//  if  (err)  throw err;
			// 	 console.log('project.py finished.');
			// });
			var result = spawnSync("python project.py",valueList,{ stdio: 'inherit',shell: true });
			console.log(result);
			var data = fs.readFileSync('temp.txt', 'utf8')
			htmlDataRow = htmlDataRow + data;
			console.log(htmlDataRow);
	 	}
	 	else{
			let utm_link = $(this).find('.utmLink').val();
			let img_url = $(this).find('.img_url').val();
			htmlDataRow = htmlDataRow + rowGeneratorWidtr(utm_link, img_url);

	 	}


	});

	return htmlDataRow;

}

// ************************************Html Preview Section **************************
function htmlRowPreviewGen(targetElement){
	let htmlDataRow = "";
	 $(targetElement).each(function(){
	 	if($(this).hasClass("mailingSectionWrap"))
	 	{
	 		let valueList = [];
	 		coloumn = $(this).find(".col-num").val();
	 		R1 = $(this).find(".row-start").val();
	 		R2 = $(this).find(".row-end").val();
	 		C1 = $(this).find(".utm-col").val();
	 		C2 = $(this).find(".img-col").val();
	 		valueList.push(coloumn,R1,R2,C1,C2,templateName);
	 		console.log(valueList);
	 		// let options = {args: valueList}
			// PythonShell.run('project.py', options, function  (err, results)  {
			//  if  (err)  throw err;
			// 	 console.log('project.py finished.');
			// });
			var result = spawnSync("python preview.py",valueList,{ stdio: 'inherit',shell: true });
			var data = fs.readFileSync('preview.txt', 'utf8')
			htmlDataRow = htmlDataRow + data;
			console.log(htmlDataRow);
	 	}
	 	else{
			let utm_link = $(this).find('.utmLink').val();
			let img_url;
			if($(this).hasClass("stripSection")){
				img_url = "https://via.placeholder.com/400x50.png?text=Strip";
			}
			else if($(this).hasClass("bannerSection"))
			{
				img_url = "https://via.placeholder.com/600x400.png?text=Banner";
			}
			htmlDataRow = htmlDataRow + rowGeneratorWidtr(utm_link, img_url);

	 	}


	});

	return htmlDataRow;

}


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
function rowGeneratorWidtr(utm,imgUrl){
	let data = `<tr>    
                <td colspan="3">&nbsp;</td>
            </tr><tr>
                <td colspan="3" align="center">`;
	let endData = "";
	if(utm != ""){
		data = data+"<a href='"+utm+"'>"
		endData = "</a>";
	}
	if(imgUrl != "")
	{
		endData = endData + "</td></tr>"
		data = data + "<img src='"+imgUrl+"'>"+endData;
	}
	data = data +`<tr>    
                <td colspan="3">&nbsp;</td>
            </tr>`
	return data;
}
//================================== Creating HTML
function crateHtmlFile(htmlFinal){
	fs.writeFile(templateName, htmlFinal, function(err) {
    if(err) {
        return alert(err)
    }
    else{
  //   	fs.readFile('./'+templateName, function (err, html) {
  //   if (err) {
  //       throw err; 
  //   }       
  //   http.createServer(function(request, response) {  
  //       response.writeHeader(200, {"Content-Type": "text/html"});  
  //       response.write(html);  
  //       response.end();  
		//     }).listen(8080);
		// }); 
		alert("file sAVED");
	}
  });
}

// ============================Creating Html===============
// function save data
$(document).on('click',".frontSaveBtn",function(){
	saveData();
});

function saveData(){
	// $("input").each(function(){
	// 	$(this).val($(this).val());
	// });
	dialog.saveFileDialog(function(result) {
	    alert(result)
	})

	// You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
	// fileDialog({
 //    save: true,
 //    accept: '.html'
 //  }, function (data) {
 //    console.log(data)
 //  });
}
$(document).on('click',".frontOpenBtn",function(){
	openFile();
});

function openFile(){
	fileDialog({
    multiple: true,
    accept: '.html'
  }, function (data) {
    console.log(data)
  });
}
