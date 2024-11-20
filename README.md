# ASI2 - ATELIER 1

## Membres du groupe
- CHEVEREAU Lazare
- DOHOU Medhy
- SPINAR Grégory
- MALEK Mathis

## Comment lancer le projet


### Depuis Github Container Registry
1. Il suffit de lancer le docker-compose avec la commande suivante :
```bash
docker compose up -d --force-recreate
```
2. Puis se rendre sur: `http://localhost:80/`

### Depuis les sources
1. Build tous les projets java (impossible depuis docker à cause du projet common qui est hors contexte)
```bash
mvn clean install -DskipTests
```
2. Lancer le docker-compose avec la commande suivante :
```bash
docker compose -f local-compose.yml up -d --force-recreate --build
```
3. Puis se rendre sur: `http://localhost:80/`



## Ollama tooltip

Depuis docker compose le pull du model a été fait par nos soins *(cf. compose.yml)* mais sinon, utilisez la commande suivante :


- Executer la requete curl pour le bon fonctionnement de la generation de description
```
curl http://localhost:11434/api/pull -d '{
  "name": "qwen2:0.5b"
}'
```

ou sur PowerShell

```
Invoke-RestMethod -Uri "http://localhost:11434/api/pull" -Method Post -Body '{"name": "qwen2:0.5b"}' -ContentType "application/json"
```

## Réalisation inviduel

- Medhy : Diagramme d'achitecture, generation carte partie microservice ( image, stats, texte generation ), correctif backend, utilisation message broker

- Gregory : Diagramme d'achitecture, tableau comparatif des framework front, page de connexion, page achat et vente, utilisation store redux

- Lazare : Diagramme d'achitecture, tableau comparatif des bus, cardGeneration partie monolitique, ajout de notification front et back, ajout de migration flyway, correctif backend, containerisation, proxy (nginx)

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

Bonus :
- Pipeline GitHub

## Liste des éléments non-réalisés

Bonus :
- Utilisation de material

## Parcours de test

- Créer un utilisateur (retenir first name et password)
- cliquer sur login
- se connecter avec l'utilisateur créé
- cliquer sur sell
- sélectionner un carte et la vendre
- retourner dans sell et constater que la carte n'y est plus
- retourner sur la home page puis cliquer sur create
- créer une nouvelle carte
- attendre les notifications
- retourner sur la page d'accueil et aller voir la carte générée dans "sell"
- se déconnecter, créer un nouvel utilisateur, se connecter, cliquer sur buy, acheter la carte en vente, aller dans "buy" puis "sell" pour verifier
