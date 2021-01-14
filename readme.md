this project is composed by 2 main part
* Part 1 "front end" Made with vue js you need this software as shown below to run it:
- node js 12
- vue cli
 open the front end folder named forums in cmd then type this command:
-> npm run serve 
the front end server will open on localhost with a default port (8080 by default it will increment if the port is taking by other software)
* Part 2 "Back End" Made with spring boot you will need this software as shown below to run it:
- jdk 1.8 
- spring suite tool or jetbrain intellij (you can run it with cmd too)
steps :
1- open sts (spring suite tool)
2- import the folder named "ForumServerSide" as a maven project
3- update maven (force update if you had errors in pom.xml)
4- now you can run the project as a spring project
5- the back end server will open at localhost:8070 on defalut config but you can override thoese settings 
in the file src/main/resources/application.properties

Important:
You can use any database you want but you must configure the connection setting in application.properties file
by default this app configured with mysql database we have export a script you can import this script named "forumsdb.sql"
at mysql database
you can use wamp or xamp as mysql servers 
