import sys
import os
import tkinter
import templateGenerator as tg


# import pandas as pd 

from tkinter import *
selection = 1
m=tkinter.Tk()
m.title('zip creator Extractor')
m.geometry("600x300")

# --- create canvas with scrollbar ---

def on_configure(event):
    # update scrollregion after starting 'mainloop'
    # when all widgets are in canvas
    canvas.configure(scrollregion=canvas.bbox('all'))

canvas = tkinter.Canvas(m)
canvas.pack(side=tkinter.LEFT)
# --- put frame in canvas ---

frame = tkinter.Frame(canvas)
canvas.create_window((0,0), window=frame, anchor='nw')

# --- add widgets in frame ---

scrollbar = tkinter.Scrollbar(frame, command=canvas.yview)
scrollbar.pack(side=tkinter.LEFT, fill='y')

canvas.configure(width=200, height=200, yscrollcommand = scrollbar.set)

# update scrollregion after starting 'mainloop'
# when all widgets are in canvas
canvas.bind('<Configure>', on_configure)


variable = IntVar()
startTxt = """<head>
    <title>Eduonix</title>
    <META NAME="robots" CONTENT="noindex">
    <link rel="shortcut icon" href="https://www.eduonix.com/assets/images/favicon.ico">
</head>

<body>
    <center>
        <table cellspacing="0" cellpadding="0" border="0" width="640" style="background-color: #fff;">
        """

option = StringVar()
my_list = []

E = Entry(frame, bd=5, width=50)

path ='June19-Mailing.xlsx'


l1 = Label(frame, text = "Please Enter Number of Section")
l1.pack(side= LEFT)
l1.place(x=10,y=10)
# button
E1= Entry(frame, bd=5, width=5)
E1.pack(side= LEFT)
E1.place(x=80,y=10)


def getEntryField():
	entryStrip = []
	utmLinkLabel = Label(frame, text = "Enter Utm Link",wraplength=100).pack(side=LEFT)
	EntryStripUtm = Entry(frame, bd=2, width=100).pack(side=tkinter.LEFT)

	utmLinkLabel = Label(frame, text = "Enter Img Link",wraplength=100).pack(side=tkinter.LEFT)
	EntryStripImg = Entry(frame, bd=2, width=100).pack(side=tkinter.LEFT)


def getNumber():
	number = E1.get()
	E1.destroy()
	l1.destroy()
	button.destroy()
	if(number.isnumeric()):
		number = int(number,10)
		entries = []
		for i in range(0,number):
				buttonStrip = Button(frame, text='Add Strip', command = lambda : getEntryField()).pack(side = TOP)

				newrow = []
				# textCol = str(j+1) + "1 Coloumn"
				
				l2 = Label(frame, text = "Enter number of coloumn",wraplength=100).grid(row=i, column=1)
				# button
				E2 = Entry(frame, bd=5, width=5)
				E2.grid(row=i, column=2)


				l3 = Label(frame, text = "Start and End Row Number",wraplength=100).grid(row=i, column=3)
				# button
				E3 = Entry(frame, bd=5, width=5)
				E3.grid(row=i, column=4) 
				E4 = Entry(frame, bd=5, width=5)
				E4.grid(row=i, column=5)

				l4 = Label(frame, text = "Start and End Coloumn Number",wraplength=100).grid(row=i, column=6)
				# button
				E5 = Entry(frame, bd=5, width=5)
				E5.grid(row=i, column=7) 
				E6 = Entry(frame, bd=5, width=5)
				E6.grid(row=i, column=8)


				newrow.append(E2)
				newrow.append(E3)
				newrow.append(E4)
				newrow.append(E5)
				newrow.append(E6)
				entries.append(newrow)



		button1 = Button(frame, text='submit', command = lambda : getValues()).grid(row=i+1, column=3)

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
					R2 = obj.get()
				if(index == 3):
					C1 = obj.get()
				if(index == 4):
					C2 = obj.get()
			tg.genertateTemplate(path,selection,R1,R2,C1,C2)

		
button = Button(frame, text='submit',command = getNumber)
button.pack(side = BOTTOM)
button.place(x=200,y=120)

m.mainloop()