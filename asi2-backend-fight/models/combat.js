class Combat {
    #maxCardsPerFighter;
    constructor(requesterId, fighterId) {
        this.id = crypto.randomUUID();
        this.#maxCardsPerFighter = 4;
        this.requester = requesterId;
        this.fighter = fighterId;
        this.nextTurn = (Math.random() % 2) === 1 ? requesterId : fighterId;
        this.started = false;
        this.userCards = new Map();

        this.userCards.set(requesterId, new Map());
        this.userCards.set(fighterId, new Map());
    }

    startFight() {
        if (this.started) {
            throw new Error("Ce combat à déjà été démarré!");
        }

        if (! this.#allUserSelectedCards()) {
            throw new Error("Tous les joueurs n'ont pas choisi leurs cartes")
        }
        this.started = true;
    }

    addCard(userId, card) {
        let userCards = this.userCards.get(userId);

        if (!userCards) throw new Error("Cet utilisateur ne fait pas partie du combat")
        if (userCards.length === this.#maxCardsPerFighter) throw new Error("Nombre maximal de cartes atteinte !")

        userCards.set(card.id, card);
        this.userCards.set(userId, userCards);
    }

    processMove(move) {
        if (move.userId !== this.nextTurn) throw new Error("Ce n'est pas le tour de ce joueur")
        let attackedId = move.userId === this.requester ? this.fighter : this.requester;
        return this.#processAttack(move.userId, attackedId, move)
    }

    #processAttack(attackerId, attackedId, move) {
        let cardsAttacker = this.userCards.get(attackerId);
        let cardsAttacked = this.userCards.get(attackedId);
        let cardAttacker = cardsAttacker.get(move.attackerCardId);
        let cardAttacked = cardsAttacked.get(move.attackedCardId);

        if (! cardAttacker || ! cardAttacked) {
            throw new Error("Cette carte n'est pas présente sur le terrain!")
        }

        if (cardAttacker.hp === 0) {
            throw new Error("Cette carte ne peut pas attaquer car elle est hors-jeu !")
        }

        if (cardAttacked.hp === 0) {
            throw new Error("Cette carte ne peut pas être attaquée car elle est hors-jeu !")
        }

        if (cardAttacker.attack > cardAttacked.hp) {
            cardAttacked.hp = 0;
        } else {
            cardAttacked.hp -= cardAttacker.attack;
        }

        this.nextTurn = attackedId;

        return this;
    }

    #allUserSelectedCards() {
        return Array.from(this.userCards.values()).every((v) => v.length === this.#maxCardsPerFighter);
    }
}