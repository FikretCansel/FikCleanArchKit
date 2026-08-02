cd D:\fik\FikCleanArchKit2\fik-clean-arch-kit\apps\backend\auth
.\mvnw -f ..\..\..\packages\backend\auth-core\pom.xml clean install
pause
.\mvnw -f ..\..\..\packages\backend\catalog-core\pom.xml clean install
pause
.\mvnw spring-boot:run