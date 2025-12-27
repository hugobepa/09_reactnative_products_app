#https://hub.docker.com/u/klerith
https://github.com/Klerith/tesloshop-backend

0. Abrir docker desktop 
1. comprobar terminal: docker --version
2. bajar se github
3. dentro archivo bajado clonar ".env.template" a ".env"
4. levantar y crear imagenes docker en terminal: docker compose up -d
5. abrir postman y llenar BBDD con seed:

   http://localhost:3000/api/seed
5. mirar .env copiar datos:


- DB_PASSWORD=MySecr3tPassWord@as2
- DB_NAME=TesloDB
- DB_HOST=TesloDB
- DB_PORT=5432
- DB_USERNAME=postgres 

  
6. abrir tableplus: 
      - crear nueva conexion: signo "+" arriba  
				- selecionar tipo BBDD: POSTGRES
				- CREATE
	   - pantalla creacion:
	           - name: Teslo-Expo-Dev
				- user: postgres
				- password: MySecr3tPassWord@as2
				- database: TesloDB
		- test
		- conectar
	
5. Documentación de los endpoints disponibles:

   http://localhost:3000/api


