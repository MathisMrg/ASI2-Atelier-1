const crypto = require('crypto');

class CombatService {
    constructor(combatPersistence) {
        this.persistence = combatPersistence;
    }

    createBattleRoom(data) {
        this.#validateCombatCreationRequest(data);
        let combat = new Combat(data.requesterId, data.fighterId);
        this.persistence.addCombat(combat);
        return combat;
    }

    selectCard(data) {
        this.#validateCombatRequest(data);
        this.#validateSelectionData(data);

        let combat = this.persistence.getCombat(data.id);
        this.persistence.addCombat(combat.addCard(data.userId, data.card));
        return combat;
    }

    startFight(data) {
        this.#validateCombatRequest(data)

        let combat = this.persistence.getCombat(data.id);
        this.persistence.addCombat(combat.startFight());
        return combat;
    }

    processMove(data) {
        this.#validateCombatRequest(data)
        let combat = this.persistence.getCombat(data.id);
        this.persistence.addCombat(combat.processMove(data))
        return combat;
    }

    #validateCombatRequest(data) {
        if (!data.combatId) {
            throw new Error("L'id de combat n'a pas été renseigné");
        }

        if (!this.persistence.getCombat(data.combatId)) {
            throw new Error("Le combat n'existe pas")
        }
    }

    #validateSelectionData(data) {
        if (!data.userId) {
            throw new Error("Identifiant utilisateur manquant")
        }

        if (!data.card.id) {
            throw new Error("Veuillez sélectionner une carte !")
        }
    }

    #validateCombatCreationRequest(data) {
        if (!data.requesterId) {
            throw new Error("Identifiant utilisateur manquant");
        }
        if (!data.fighterId) {
            throw new Error("Aucun challenger n'a été inclus dans la requête");
        }
    }
}

module.exports = CombatService;