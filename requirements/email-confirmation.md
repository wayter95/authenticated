# Confirmação de Email

> ## Caso de sucesso

1. ⛔️ Recebe uma requisição do tipo **POST** na rota **/api/login/verification**
2. ⛔️ Valida dados obrigatórios **token**
3. ⛔️ Valida que o campo **token** é válido
4. ⛔️ **Busca** o usuário com o token fornecidos
5. ⛔️ Verifica se o usuario esta ativo 
6. ⛔️ **Atualiza** os dados do usuário para ativado
7. ⛔️ Retorna **200** com o token de acesso, o id e  o nome do usuário

> ## Exceções

1. ⛔️ Retorna erro **404** se a API não existir
2. ⛔️ Retorna erro **400** se o token não for fornecido pelo client
3. ⛔️ Retorna erro **400** se o campo token for um token inválido
4. ⛔️ Retorna erro **401** se não encontrar um usuário com os dados fornecidos
5. ⛔️ Retorna erro **500** se der erro ao tentar gerar o token de acesso
6. ⛔️ Retorna erro **500** se der erro ao tentar atualizar o usuário com o token de acesso gerado