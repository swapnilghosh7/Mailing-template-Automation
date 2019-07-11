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
	if(number.isnumeric()):
		number = int(number,10)
		for i in range(0,number):

				# textCol = str(j+1) + "1 Coloumn"
				variable.set(i)
				print(variable.get())
				

				RadiobuttonWrapOne = Radiobutton(m, text= "1 Coloumn", variable = variable,value= 1,var = option)
				RadiobuttonWrapOne.grid(row = i+1, column=1)

				RadiobuttonWrapTwo = Radiobutton(m, text= "2 Coloumn", variable = variable,value= 2, var = option)
				RadiobuttonWrapTwo.grid(row = i+1, column=2)
				
				RadiobuttonWrapThree = Radiobutton(m, text= "3 Coloumn", variable = variable,value= 3, var = option)
				RadiobuttonWrapThree.grid(row = i+1, column=3)

		# tg.genertateTemplate(path,selection)
		button1 = Button(m,text='submit', command = lambda: getValues(number) )
		button1.place(x=200,y=120)

def getValues(number):
		for i in range(0,number):
			print(variable.get())
			if(variable.get() == i):
			
				selection = variable.get()
				print(selection)
			# tg.genertateTemplate(path,selection)

		
button = Button(m,text='submit',command = getNumber)
button.pack(side = BOTTOM)
button.place(x=200,y=120)

m.mainloop()