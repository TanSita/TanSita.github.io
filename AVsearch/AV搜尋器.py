# -*- coding: utf8 -*-

import requests
import re
import json
import shutil
from urllib import parse
from bs4 import BeautifulSoup
import os
import string
from robobrowser import RoboBrowser
#/usr/local/lib/python3.5/site-packages/bs4/__init__.py:166 
#164~166 那一大段註解 就是warning的來源
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import math

driver = webdriver.PhantomJS('/usr/local/bin/PhantomJS')

# driver = webdriver.Firefox()
# driver.set_window_position(640, 0)
# driver.set_window_size(640, 800)

delaytime = 3
data = open('database.js','a')
# data.write("var postData = new Array();\n")

for i in range(15,20,1):
	output = ""
	output += "postData["+str(i)+"] = '"
	output += '{ "Videos":[ '
	for j in range(i*100+1,i*100+101,1):
		print(j)
		url = "http://www.thisav.com/videos?o=mr&type=&c=0&t=a&page=" + str(j)
		driver.get(url)
		time.sleep(delaytime)
		if delaytime==3:
			delaytime = 1
		PageSource = driver.page_source

		soup = BeautifulSoup(str(PageSource),"html.parser")

		links = soup.find_all("a")


		for link in links:
			if "href" in link.attrs:
				if "http://www.thisav.com/video/" in link['href']:
					lala = re.search('<img alt="(.*?)"',str(link))
					if lala!=None:
						output += '{"title":"'
						temp = lala.group(1).replace("'","’").replace("\t","").replace("\n","").replace(" ","")
						output += temp #title
						output += '","link":"'
						lala = re.search('<a href="(.*?)"',str(link))
						output += lala.group(1)
						output += '"},'

	output = output[:-1] 
	output += "]}';\n\n"

	data.write(output)

driver.quit()

