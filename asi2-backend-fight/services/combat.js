const crypto = require('crypto');
const Combat = require("../models/combat.js")

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

        let combat = this.fetchCombat(data.combatId);
        combat.addCard(data.userId, data.card);
        this.persistence.addCombat(combat);
        console.log(JSON.stringify(combat));
        return combat;
    }

    startFight(data) {
        this.#validateCombatRequest(data)

        let combat = this.fetchCombat(data.combatId);
        console.log("Combat à démarré : "+JSON.stringify(combat));
        combat.startFight();
        this.persistence.addCombat(combat);
        return combat;
    }

    processMove(data) {
        this.#validateCombatRequest(data)
        let combat = this.fetchCombat(data.combatId);
        console.log("Le combat de l'attaque : "+JSON.stringify(combat));
        this.persistence.addCombat(combat.processMove(data))
        return combat;
    }

    #validateCombatRequest(data) {
        if (!data.combatId) {
            throw new Error("L'id de combat n'a pas été renseigné");
        }
    }

    #validateSelectionData(data) {
        if (!data.userId) {
            throw new Error("Identifiant utilisateur manquant")
        }

        if (!data.card) {
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

    getCombatOf(userId) {
        return this.persistence.getCombatByUserId(userId);
    }

    fetchCombat(id) {
        let result = this.persistence.getCombat(id);
        if (!result) {
            throw new Error("Ce combat n'existe pas");
        }
        return result;
    }
}

module.exports = CombatService;