pgadmin http://localhost:8080/ 
 
host/server: postgres
ports: 5432
Username: admin
Password:admin  

npx prisma generate
npx prisma migrate dev --name init

yarn start:dev