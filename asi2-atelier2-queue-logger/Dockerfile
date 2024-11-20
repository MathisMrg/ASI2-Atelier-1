#Par facilité des dépendances que l'on utilise et qui ne sont pas sur un nexus (tel que le common)
# on utilise le build sans dockerfile (pas de multi stage build)

FROM openjdk:21-jdk
RUN groupadd -r app && useradd --no-log-init -r -g app app
WORKDIR /app
RUN chown app:app /app
USER app
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]

