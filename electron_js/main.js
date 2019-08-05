let $ = require('./jquery-3.4.1.min.js')
let fs = require('fs')
let moment = require('moment')
let {PythonShell} = require('python-shell')
let templateName;
const spawnSync = require("child_process").spawnSync;


dateStr = moment().format('D-MMM-YYYY');

let banner = 1;
$('.addMoreBanner').on('click', function(){
	let htmlTemp = $('.bannerSection').html();
	$("<div class='bannerSection mb-3 col-sm-12'>"+htmlTemp+"</div>").insertBefore('.bannerSection');
});
$('.addMoreStrip').on('click', function(){
	let htmlTemp = $('.stripSection').html();
	$("<div class='stripSection mb-3 col-sm-12'>"+htmlTemp+"</div>").insertBefore($(this).parent("div"));
});
$('.addMoreSection').on('click', function(){
	let htmlTemp = $('.mailingSectionWrap').html();
	$("<div class='mailingSectionWrap htmlsection'>"+htmlTemp+"</div>").insertBefore($(this).parent("div"));
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
let utmLogo;
let logoUrl;
let logoHtml;
let bannerHtml;



// *******************************getting value on click of submit****************
$(".frontSubmitBtn").on('click',function(){
	if(!$(".templateNameInput").prop("disabled"))
	{
		templateName = $(".templateNameInput").val();
	}
	subline = $(".subject_line").find("input").val();
	utmLogo = $(".logoUtm").val();
	logoUrl = ($(".logoInput").val())?$(".logoInput").val():"https://www.eduonix.com/assets/images/edu_logo_single.png";
	
	logoHtml = rowGenerator(utmLogo,logoUrl);

	bannerHtml = htmlRowGen(".htmlsection");

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
	                </td></tr>` + bannerHtml +` <td style="background-color: #000;">
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

	crateHtmlFile(htmlFinal);

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
	 		
	 		let options = {args: valueList}
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
	return data;
}
// Creating HTML
function crateHtmlFile(htmlFinal){
	fs.writeFile(templateName, htmlFinal, function(err) {
    if(err) {
        return alert(err)
    }
    console.log("The file was saved!")
	}) 
}


