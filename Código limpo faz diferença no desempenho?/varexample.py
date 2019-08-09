#!/usr/bin/env python
# -*- coding: utf-8 -*-


def saveForm(form):

    # O nome da função de validação ja é claro o suficiente.
    # não é necessario atribuir uma variável do tipo:
    # formIsValid = formIsValid(form).
    # Nesse caso não atribua variável!
	if not formIsValid(form):
		return 'Invalid form'

	# Persist Process...
	return 'Form saved'

def getSomethingBetter(type):

    # Agora usarei um exemplo dado anteriormente para você ver onde aplicar varíaveis.
    # É melhor você descrever que esse objeto logo abaixo são os itens disponíveis:
	itemsAvailable = {"x": "x text", "y": "y text"}
    # e retorná-lo dessa forma.
	return itemsAvailable[type] if type in itemsAvailable else "Não encontrado"
    # Do que você fazê-lo diretamente, embora vá funcionar:
    # return itemsAvailable[type] if type in {"x": "x text", "y": "y text"} else "Não encontrado"
    # Pelo simples fato de que colabora com o entendimento do que se está fazendo.


def calculatePercentage(totalValue, percentageToCalculate):
    # Para questões simples e curtas, também não é necessário
    # criar uma varíavel só para receber o total final.
    # além disso, não chame esse método de calculate apenas,
    # ou os parâmetros de x e y. Quando mais claros forem, melhor.
    return totalValue * (percentageToCalculate / 100)


# Falando em nomear coisas, o caso abaixo é muito comum
# mas desnecessário. O objeto em si já é customer (cliente)
# portanto, não há nenhuma necessidade de ficar escrevendo
# que o nome dentro desse objeto é do cliente, assim como idade
# ou qualquer outra coisa.
customer = {
    customerName: "João Henrique",
    customerAge: 25
}

# O mais correto seria essa forma:
customer = {
    name: "João Henrique",
    age: 25
}
