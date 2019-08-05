import sys
import os
import xlrd

for index,x in enumerate(sys.argv):
	if (index == 1):
		selection = x
	if (index == 2):
		R1 = x
	if (index == 3):
		R2 = x
	if (index == 4):
		C1 = x
	if (index == 5):
		C2 = x

selection = int(selection,10)
R1 = int(R1,10)
R2 = int(R2,10)
C1 = int(C1,10)
C2 = int(C2,10)

path ='June19-Mailing.xlsx'

wb = xlrd.open_workbook(path)
sh = wb.sheet_by_name("28 June'19")


templateName = "preview"

doubleColHtml = """<td align='center'><table>\n"""
if(selection > 1):
	data = doubleColHtml
	imgPlaceholder = "https://via.placeholder.com/274x315.png?text=Preview"
else:
	data = """<tr><td colspan="3"> &nbsp;</td></tr>\n"""
	imgPlaceholder = "https://via.placeholder.com/600x400.png?text=Preview"

a =  open(templateName+".txt", "w+")
a.write(data)

for i in range(R1-1,R2-1,selection):
	a.write("<tr>")
	for j in range(0,selection):
		col = i + j
		data = """\n<td align="center"><a href='"""+sh.cell_value(col,C1-1)+"""'><img src='"""+imgPlaceholder+"""'></a></td>"""
		if(selection>1):
			data = data + """ <td> &nbsp;</td> """

		a =  open(templateName+".txt", "a")
		a.write(data)
	a.write("""</tr>\n <tr><td colspan="3"> &nbsp;</td></tr>""")

if(selection > 1):
	a =  open(templateName+".txt", "a")
	a.write("""</table></td>""")