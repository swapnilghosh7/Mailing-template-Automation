let $ = require('./jquery-3.4.1.min.js')
let fs = require('fs')	
$('.frontSubmitBtn').on('click',()=>{
	$('.bannerUrl').each(function(){
		$(".result").append($(this).val()+"<br/>")
	})
	crateHtmlFile()
})

// Creating HTML
function crateHtmlFile(){
	fs.writeFile('xyz.html', "Hey there!", function(err) {
    if(err) {
        return alert(err)
    }
    console.log("The file was saved!")
	}) 
}

