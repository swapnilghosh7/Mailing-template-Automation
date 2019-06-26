import sys
import os
import tkinter as tk
from tkinter import *
# import pandas as pd
import xlrd
import datetime

m = tk.Tk()
# m.geometry("500X500")
m.title('html creator')

# m.pack()
# E = Entry(m,path)

path ='F:/Downloads/Financial Sample.xlsx'
wb = xlrd.open_workbook(path)
sh = wb.sheet_by_name('20May19')
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
# print(sh.ncols)	
# sheet = wb.sheet_by_index(0)
# m = tk.Tkinter()
# sheet.ncols
# df = pd.read_excel (r'F:/Downloads/Financial Sample.xlsx') #for an earlier version of Excel, you may need to use the file extension of 'xls'
# print (df)
# print(sh.cell_value(0,1))
name = None
for i in range(sh.nrows):
	if(i==0):
		continue
	for j in range(sh.ncols):
		if(j == 0):
			name = sh.cell_value(i,j)
			continue
			# elif(j == n):
			# 	continue
		
		data = """<a href='"""+sh.cell_value(i,j)+"""'>"""+	name + """</a><br/>"""
		print(name)
		print(sh.cell_value(i,j))
		a =  open(htmlTitle+".html", "a")
		a.write(data)
		


# m.mainloop()