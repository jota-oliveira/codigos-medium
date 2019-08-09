#!/usr/bin/env python
# -*- coding: utf-8 -*-


# Não faça isso!
def getSomething(type):
	if(type == "x"):
		return "x text"
	elif(type == "y"):
		return "y text"	

	return "Não encontrado"

# Faça isso =)
def getSomethingBetter(type):
	itemsAvailable = {"x": "x text", "y": "y text"}
	return itemsAvailable[type] if type in itemsAvailable else "Não encontrado"


if __name__ == "__main__":
	print(getSomething("y"))
	print(getSomething("j"))
	print(getSomethingBetter("x"))
	print(getSomethingBetter("d"))
