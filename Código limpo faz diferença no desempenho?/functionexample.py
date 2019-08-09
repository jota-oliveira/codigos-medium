#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Não fazer
def saveForm(form):
	requiredFields = ['item1', 'item5']

	for fieldName in requiredFields:
		if fieldName not in form:
			return 'Invalid form!'

	# Persist
	return 'Form saved'

# Fazer
def formIsValid(form):
	requiredFields = ['item1', 'item5']

	for fieldName in requiredFields:
		if fieldName not in form:
			return False

	return True

def saveFormBetter(form):
	if not formIsValid(form):
		return 'Invalid form'

	# Persist
	return 'Form saved'

if __name__ == "__main__":
	print(saveFormBetter({
		'item1': 'a',
		'item2': 'b',
		'item3': 'c',
		'item4': 'd',
		'item5': 'e',
	}))
