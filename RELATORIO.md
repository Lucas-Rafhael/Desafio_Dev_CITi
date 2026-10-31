1. O que foi feito

- Ajustei e finalizei a API para loja Folhagem & Cia, cobrindo o possível. O resultado cobre tudo o que foi pedido por padrão e os casos bônus:
CRUD de Plantas + Validação no PATCH: Rotas de criar, ler, atualizar parcialmente e deletar. Travei com erro 400 qualquer envio de campo com tipo ou valor inválido no PATCH.
- Filtros por Query String (GET /plantas): Busca por nome sem ligar para maiúsculas/minúsculas (`contains` + `mode: 'insensitive'`), filtro por luminosidade (`SOMBRA`, `MEDIA_SOMBRA`, `SOL_PLENO`) e filtro de `petFriendly` (`true`/`false`).
- Ordenação Bônus: Suporte a `?ordem=preco` ou `?ordem=nome` pra entregar tudo ordenado direto do banco.
Rota /plantas/esgotadas: Endpoint dedicado pra puxar só o que tá com `estoque: 0`.

2. Como foi feito

A ideia aqui foi não complicar o que podia ser simples. Em vez de criar um monte de arquivo extra sem necessidade:
- Repositório genérico e modelos padrões: Clonei o repositório de template, e a partir do que já tinha nele sobre controller, routes, repositories fui trabalhando em cima ajustando ao pedido no treinamento, principalmente para não ir muito longe e acabar complicando algo já simples e bem guiado.
- Extensões instaladas: A maioria das extensões, desde o docker ao thunder, já estavam instalados na minha máquina, bastando rodar e setar elas para o repositório atual.
- Bug Fix: A medida em que revisava o código manualmente e pensando na lógica dele fui ajustando os erros maiores, mas principalmente na parte dos testes é que os outros acabaram perceptíveis e fui ajustando diretamente até chegar ao resultado esperado.
- Commits: Me atentei para deixar os commits de forma organizada e simples, tirando algumas ressalvas que por deixar alguns arquivos sem salvar acabou um pouco diferente.

3. Dificuldades e partes exaustivas

Como eu já tinha uma boa noção de Node, TypeScript e Prisma, no geral o desenvolvimento foi bem suave. Mas claro que teve umas partes meio chatas e uns tropeços no caminho:
- O bug erro 500 no /esgotadas: Quando fui testar no Insomnia o `GET /plantas/esgotadas`, bateu erro 500 na hora. Demorei um minutinho pra me tocar de que o Express estava achando que a palavra "esgotadas" era o parâmetro `:id` da rota de buscar por ID (`/plantas/:id`). Mudei a ordem no `routes.ts` colocando o `/esgotadas` para cima e resolvi na hora.
- Problemas com a ordenação: Fiquei um pouco pensativo na parte de ordenação como ficaria melhor sem destrinchar muito, acabei pesquisando no Gemini formas de enums em casos específicos variados para procurar uma lógica de código em si e através dela usar nessa parte.
- Validações manuais: Ficar checando campo por campo no PATCH e nos query params para se é string,  boolean, se está dentro do Enum. A parte mais desgastante junto com algumas verificações no próprio código antes de chegar na parte dos testes

4. Uso de Inteligência Artificial

Usei o Gemini como um parceiro de código durante o processo. Ele serviu principalmente para:
- Entender rápido por que o TypeScript reclamava em alguns pontos específicos sem precisar ler e subtrair as longas mensagens de erro.
- Me relembrar algumas formas lógicas de comando e implementação em casos exemplos específicos.
- Ajudar a enxugar a sintaxe do controller para não encher o código de variáveis desnecessárias e caminhos longos de mais.