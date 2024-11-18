# ASI2 - ATELIER 1

## Membres du groupe
- CHEVEREAU Lazare
- DOHOU Medhy
- SPINAR Grégory
- MALEK Mathis

## Comment lancer le projet

- faire un ```docker compose up -d```

- Executer la requete curl pour le bon fonctionnement de la generation de description
```
curl http://localhost:11434/api/pull -d '{
  "name": "qwen2:0.5b"
}'
```

ou

```
Invoke-RestMethod -Uri "http://localhost:11434/api/pull" -Method Post -Body '{"name": "qwen2:0.5b"}' -ContentType "application/json"
```

- Lancer les 4 java en utilisant l'onglet java projects de vscode ou bien avec intellij

- Aller dans le repertoir du frontend, executer ```npm i```, puis ```npm start``` (version de node v20.15.0)

## Lancer le projet sous forme de docker 

build tous les projets avec la commande suivante :
```bash
mvn clean install -DskipTests
```

lancer le docker-compose avec la commande suivante :
```bash
docker-compose up -d --force-recreate --build
```


## Réalisation inviduel

- Medhy : Diagramme d'achitecture, generation carte partie microservice ( image, stats, texte generation ), correctif backend, utilisation message broker

- Gregory : Diagramme d'achitecture, tableau comparatif des framework front, page de connexion, page achat et vente, utilisation store redux

- Lazare : Diagramme d'achitecture, tableau comparatif des bus, cardGeneration partie monolitique, ajout de notification front et back, ajout de migration flyway, correctif backend

- Mathis : Diagramme d'achitecture, page de creation d'utilisateur, de connexion, de vente, de creation de carte, msie en place et utilisation store redux, correctif front et back

## Lien du git

- https://github.com/MathisMrg/ASI2-Atelier-1

## Liste des elements réaliser

Dev :
- Generation d'une card : image, stats, description + notif utilisateurs
- Une connexion basique de l’utilisateur
- Un écran d’accueil
- La possibilité d’acheter des cartes parmi une liste
- La possibilité de vendre les cartes parmi une liste
- Interactions frontend - backend
- Utilisation d'un store redux, de active mq, de springboot

Doc :
- Decoupage en composant React
- tableau récapitulatif des bus de communication
- tableau comparatif des principaux Framework FrontEnd
- diagramme d'architecture

## Liste des éléments non-réalisés

Bonus :
- Pipeline gitlab
- Utilisation de material

## Parcours de test

- Creer un utilisateur (retenir first name et password)
- cliquer sur login
- se connecter avec l'utilisateur creer
- cliquer sur sell
- selectionner un carte et la vendre
- retourner dans sell et constater que la carte n'y est plus
- retourner sur la home page puis cliquer sur create
- creer une nouvelle carte
- attendre les notifications
- retourner sur la page d'acceuil et aller voir la carte generer dans sell
- se deconnecter, creer un nouvelle utilisateur, se connecter, cliquer sur buy, acheter la carte en vente, aller dans buy puis sell pour verifier
