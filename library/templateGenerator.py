def genertateTemplate():


	wb = xlrd.open_workbook(path)
	sh = wb.sheet_by_name("28 June'19")
	# sh = wb.sheet_names()
	# print(sh)
	# sheet = wb.sheet_by_index(1)
	x = datetime.datetime.now()
	dateToday = x.strftime("%d")+x.strftime("%b")+x.strftime("%y")
	htmlTitle = "template"+dateToday
	txt = """<!DOCTYPE html>
	<html>
	<head>
		<title>"""+htmlTitle+"""</title>
		<link rel="stylesheet" type="text/css" href="login.css">
	</head>
	<body>"""
	f = open(htmlTitle+".html", "w+")
	f.write(txt)
	n = 2


	doubleColHtml = """<table><tr>"""
	section = 1
	if(selection == 1):
		a =  open(htmlTitle+".txt", "w+")
		a.write('')
		name = None
		for h in range(0,section):
			
			for i in range(sh.nrows):
				a =  open(htmlTitle+".txt", "a+")
				
				if(i==0):
					continue
				else:
					a.write("""<tr>\n""")
					for j in range(i,i+2):
						if(j == 0):
							name = sh.cell_value(i,j)
							continue
							# elif(j == n):
							# 	continue
						
						data = """<td><a href='"""+sh.cell_value(j,1)+"""'><img src='https://www.eduonix.com/mailing_img/mailings_"""+dateToday+"/"+sh.cell_value(j,2)+"""'></a></td>"""
						print(data)
						# print(sh.cell_value(i,j))
						a =  open(htmlTitle+".txt", "a+")
						a.write(data)
					a.write("""</tr>\n""")