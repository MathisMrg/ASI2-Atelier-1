#Par facilité des dépendances que l'on utilise et qui ne sont pas sur un nexus (tel que le common)
# on utilise le build sans dockerfile (pas de multi stage build)

FROM openjdk:21-jdk
#RUN groupadd -r app && useradd --no-log-init -r -g app app
#USER app
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENV SERVER_PORT=8080
ENV SERVER_ADDRESS=0.0.0.0
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]

