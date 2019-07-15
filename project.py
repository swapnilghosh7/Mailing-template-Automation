import sys
import os
import tkinter
import templateGenerator as tg


# import pandas as pd 

from tkinter import *
selection = 1
m=tkinter.Tk()
m.title('zip creator Extractor')
m.geometry("400x500")

variable = IntVar()

option = StringVar()
my_list = []

E = Entry(m, bd=5, width=50)

path ='June19-Mailing.xlsx'


l1 = Label(m, text = "Please Enter Number of Section")
l1.pack(side= LEFT)
l1.place(x=10,y=10)
# button
E1= Entry(m, bd=5, width=5)
E1.pack(side= LEFT)
E1.place(x=80,y=10)


def getNumber():
	number = E1.get()
	E1.destroy()
	l1.destroy()
	button.destroy()
	if(number.isnumeric()):
		number = int(number,10)
		entries = []
		for i in range(0,number):
				newrow = []
				# textCol = str(j+1) + "1 Coloumn"
				
				l2 = Label(m, text = "Enter number of coloumn",wraplength=100).grid(row=i, column=1)
				# button
				E2 = Entry(m, bd=5, width=5)
				E2.grid(row=i, column=2)


				l3 = Label(m, text = "Start and End Row Number",wraplength=100).grid(row=i, column=3)
				# button
				E3 = Entry(m, bd=5, width=5)
				E3.grid(row=i, column=4) 
				E4 = Entry(m, bd=5, width=5)
				E4.grid(row=i, column=5)
				newrow.append(E2)
				newrow.append(E3)
				newrow.append(E4)
				entries.append(newrow)

		print(entries)

		button1 = Button(m,text='submit', command = lambda : getValues()).grid(row=i+1, column=3)

	def getValues():
		for entry in entries:
			# x = E2.get()
			for index, obj in enumerate(entry):
				print(index,obj.get())
				if(index == 0):
					selection = obj.get()
				if(index == 1):
					R1 = obj.get()
				if(index == 2):
					R2 = boj.get()
			# y = self.E3.get()
			# z = self.E4.get()
			# print(E2.get())
			tg.genertateTemplate(path,selection,R1,R2)
		



		
button = Button(m,text='submit',command = getNumber)
button.pack(side = BOTTOM)
button.place(x=200,y=120)

m.mainloop()