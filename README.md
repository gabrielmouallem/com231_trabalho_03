# com231_trabalho_03
Gabriel José Mouallem Rodrigues - 2017017731
Gabriel Zanon Arantes - 2017019431

Para fazer com que este projeto funcione você precisa:

- Do NodeJS instalado
- Ionic Framework Instalado
- MongoDB e MongoDB Compass Instalados
- Via terminal windows (colocar a pasta /bin do mongo do PATH) ou linux execute:
    - mongo
    - use countries_db
- Acessar a pasta /data_to_mongo_app/ e execute dentro dela o comando "npm install"
- Acessar a pasta /nodejs_server/ e execute dentro dela o comando "npm install"

Para rodar o projeto siga os passos abaixo:

- Abra o MongoDB Compass, a página conecte-se ao host estará aberta, apenas clique em conectar no canto inferior direito
- Acesse a pasta /nodejs_server/ e execute dentro dela o comando:
    - Windows:
        - node .\server.ts
    - Linux:
        - node server.ts
- Acesse a pasta /data_to_mongo_app/ e execute dentro dela o comando "ionic serve"

** Com esse último comando a aplicação ja estará rodando no seu navegador de preferência