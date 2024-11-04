const crypto = require('crypto');

class CombatService {
    constructor(combatPersistence) {
        this.persistence = combatPersistence;
    }

    createBattleRoom(data) {
        // TODO : Ajouter condition de création battle room
        this.#validateCombatCreationRequest(data);
        let combat = new Combat(data.requesterId, data.fighterId);
        this.persistence.addCombat(combat);
        return combat;
    }

    selectCard(data) {
        this.#validateCombatRequest(data);
        this.#validateSelectionData(data);

        let combat = this.persistence.getCombat(data.id);
        combat.addCard(data.userId, data.cardId)
    }

    startFight(data) {
        this.#validateCombatRequest(data)

    }

    processMove(data) {
        this.#validateCombatRequest(data)

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

        if (!data.cardId) {
            throw new Error("Veuillez sélectionner une carte !")
        }
    }

    #validateCombatCreationRequest(data) {
        return data.requesterId && data.fighterId;
    }
}

module.exports = CombatService;