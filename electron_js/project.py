import sys
import os
import tkinter
import templateGenerator as tg


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

my_list = []

# E = Entry(m, bd=5, width=50)

path ='June19-Mailing.xlsx'

tg.genertateTemplate(path,selection,R1,R2,C1,C2,templateName)
