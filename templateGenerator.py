def genertateTemplate(path,selection,R1,R2,C1=1,C2=2):

	selection = int(selection,10)
	R1 = int(R1,10)
	R2 = int(R2,10)
	C1 = int(C1,10)
	C2 = int(C2,10)
	print('insideGT')
	import xlrd
	import datetime

	wb = xlrd.open_workbook(path)
	sh = wb.sheet_by_name("28 June'19")
	# sh = wb.sheet_names()
	# print(sh)
	# sheet = wb.sheet_by_index(1)
	x = datetime.datetime.now()
	dateToday = x.strftime("%d")+x.strftime("%b")+x.strftime("%y")
	htmlTitle = "template"+dateToday


	doubleColHtml = """<td align='center'><table>\n"""
	if(selection > 1):
		data = doubleColHtml
	else:
		data = """<tr><td colspan="3"> &nbsp;</td></tr>\n"""

	a =  open(htmlTitle+".html", "a")
	a.write(data)
	for i in range(R1-1,R2-1,selection):
		a.write("<tr>")
		for j in range(0,selection):
			col = i + j
			data = """\n<td><a href='"""+sh.cell_value(col,C1)+"""'><img src='"""+sh.cell_value(col,C2)+"""'></a></td>"""
			if(selection>1):
				data = data + """ <td> &nbsp;</td> """

			a =  open(htmlTitle+".html", "a")
			a.write(data)
		a.write("""</tr>\n""")

	if(selection > 1):
		a =  open(htmlTitle+".html", "a")
		a.write("""</table></td>""")