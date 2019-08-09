#!/usr/bin/env python
# -*- coding: utf-8 -*-

fruits = ['Abacaxi', 'Goiaba', 'Banana']
print({ fruit.lower(): fruit for fruit in fruits})

# Resultado em tela será:
# {'abacaxi': 'Abacaxi', 'goiaba': 'Goiaba', 'banana': 'Banana'}
