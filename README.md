# ASI2 - ATELIER 1

## Membres du groupe
- CHEVEREAU Lazare
- DOHOU Medhy
- SPINAR Grégory
- MALEK Mathis

## Réalisation inviduel

- Medhy : Node Backend-fight, mise a jour monolithe, mise a jour Diagramme d'achitecture

- Gregory : Node backend-fight, Front page Creation de combat et combat, mise a jour Diagramme d'achitecture

- Lazare : Mise a jour monolithe, dockerisation, proxy, loadbalancing, sauvegarde des chats

- Mathis : Node backend-chat, backend java log microservice, front chat, sauvegarde des chats

## Lien du git

- https://github.com/MathisMrg/ASI2-Atelier-1

## Liste des elements réaliser

Dev :
- Réaliser un backend Node.js de combat + association de joueurs
- Réaliser un backend Node.js de chat
- Recuperation et sauvegarde de l'historique des chats
- Message privé
- Front Combat et Chat
- Conteuneurisation, proxy, loadbalancing
- Backend qui permet de logger dans un fichier les messages des queues

Doc :

PDF contenant 
- Avantages/inconvénients de node.js pour le projet
- Diagramme de séquences lors d'un jeu entre deux joueurs
- Architecture technique de votre application

- Fiche auto-évaluation à jour 
- Video

Bonus :
- loadbalancing

## Liste des éléments non-réalisés

Rien

## Comment lancer le projet

### Depuis Github Container Registry
1. Il suffit de lancer le docker-compose avec la commande suivante :
```bash
docker compose up -d --pull always --force-recreate
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