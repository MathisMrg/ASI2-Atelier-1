class Combat {
    #maxCardsPerFighter;
    constructor(requesterId, fighterId) {
        this.id = crypto.randomUUID();
        this.#maxCardsPerFighter = 4;
        this.requester = requesterId;
        this.fighter = fighterId;
        this.nextTurn = (Math.random() % 2) === 1 ? requesterId : fighterId;
        this.started = false;
        this.userCards = {};
        this.isCombatReady = false;
        this.participants = new Set();
        this.participants.add(requesterId);
        this.participants.add(fighterId);

        this.userCards[requesterId] = new Map();
        this.userCards[fighterId] = new Map();
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
        if (!this.participants.has(userId)) throw new Error("Cet utilisateur ne fait pas partie du combat")
        if (this.userCards[userId].keys().size === this.#maxCardsPerFighter) throw new Error("Nombre maximal de cartes atteinte !")

        if (!userCards) throw new Error("Cet utilisateur ne fait pas partie du combat")
        if (userCards.size === this.#maxCardsPerFighter) throw new Error("Nombre maximal de cartes atteinte !")

        this.userCards[userId][card.id] = card;
        this.isCombatReady = this.#allUserSelectedCards();
    }

    processMove(move) {
        if (move.userId !== this.nextTurn) throw new Error("Ce n'est pas le tour de ce joueur")
        let attackedId = move.userId === this.requester ? this.fighter : this.requester;
        return this.#processAttack(move.userId, attackedId, move)
    }

    #processAttack(attackerId, attackedId, move) {
        let cardsAttacker = this.userCards[attackerId];
        let cardsAttacked = this.userCards[attackedId];
        let cardAttacker = cardsAttacker[move.attackerCardId];
        let cardAttacked = cardsAttacked[move.attackedCardId];

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
        return Array.from(Object.values(this.userCards)).every((v) => Object.keys(v).length === this.#maxCardsPerFighter);
    }
}

module.exports = Combat;