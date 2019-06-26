# importing the required python libraries
# generally all libraries are present but if not we can install using 'pip(python installer)'
# command pip install "package_name"
import os,zipfile,tkinter,time,shutil,sys 

# tkinter ia used for gui representation of your project
# In this line we have imported all the functionality from tkinter
from tkinter import *
# FOR SETIING UP GUI
m = tkinter.Tk()
# title of gui box
m.title('zip creator Extractor')
# size of gui box
m.geometry("400x200")

# for showing results
l2= Label(m, text="")

# declaring and initiating variables start
count = 0
countFolder = 0
countzip = 0
# declairing and initiating variables ended
extension = ".zip"
# when we use tk for initializing int we use intvar function
variable = IntVar()
# now setting up the variable value to 1
variable.set(1)
# for setting up label above rdio button
Radiohead = Label(m, text="select your choice")
# for locking its position
Radiohead.pack()
# giving the position of label
Radiohead.place(x=10,y=70)


# Radiobutton function is used for creating radio button
RadioBtnOne = Radiobutton(m,text="create",variable = variable, value=1)
RadioBtnOne.pack()
RadioBtnOne.place(x=10,y=90)

RadioBtnTwo = Radiobutton(m,text="Extract",variable = variable, value=2)
RadioBtnTwo.pack()
RadioBtnTwo.place(x=110,y=90)

def quit_loop():
	global selection
	selection = variable.get()
	if selection == 1:
		createZip()
	else:
		extractZip()

def clear_text(self):
	self.placeholder = Label(self, text="")
	self.placeholder.pack()

def createZip():
	global l2
	global countFolder
	global countzip
# cget is used for getting text from label
	if(l2.cget("text") != ""):
		clear_text(l2)

	# outside  if loop
	root = E1.get()

	try:
		for item in os.listdir(root):
			if os.path.isdir(os.path.join(root,item)):
				countFolder +=1
				dir_name = root +"/" + item
				shutil.make_archive(dir_name, 'zip', root,item,dir_name)
		for item in os.listdir(root):
			if item.endswith(extension):
				countFolder +=1
		if countFolder == countzip and countFolder !=0:
			l2 = Label(m,text="Completed")
			l2.place(x=10, y=150)
		elif countFolder == 0:
			l2 = Label(m,text="No folder")
			l2.place(x=10, y=150)

	except Exception as e:
		l2 = Label(m,text=e)
		l2.place(x=10,y=150)


def extractZip():
	global count
	global l2

	clear_text(l2)
	try:
		dir_name = E1.get()
		os.chdir(dir_name)
		zipCount = 0
		for item in os.listdir(dir_name):
			if item.endswith(extension):
				file_name = os.path.abspath(item)
				zipref = zipfile.ZipFile(file_name)
				zipref.extractall(dir_name+'/extracted')
				zipref.close()
				zipCount += 1

		if zipCount > 0:
			l2 = Label(m,text="successful")
			l2.place(x=10, y=150)
		else:
			l2 = Label(m,text="No Zip File")
			l2.place(x=10, y=150)

	except Exception as e:
		l2 = Label(m,text=e)
		l2.place(x=10,y=150)

l1 = Label(m, text = "Enter Path")
l1.pack(side= LEFT)
l1.place(x=10,y=10)

E1= Entry(m, bd=5, width=50)
E1.pack(side= LEFT)
E1.place(x=80,y=10)


button = Button(m,text='submit',command = quit_loop)
button.pack(side = BOTTOM)
button.place(x=200,y=120)

m.mainloop()