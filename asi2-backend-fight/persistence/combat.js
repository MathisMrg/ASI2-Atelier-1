class StatelessCombatPersistence {

    store = new Map();
    constructor() {}

    addCombat(combat) {
        this.store.set(combat.id, combat);
    }

    /**
     *
     * @param id Identifiant du combat
     * @returns {Combat | undefined}
     */
    getCombat(id) {
        return this.store.get(id);
    }

    removeCombat(id) {
        this.store.delete(id)
    }

    getCombatByUserId(userId) {
        return Array.of(this.store.values())
            .filter(combat => combat.requester !== userId && combat.fighter !== userId);
    }
}

module.exports = StatelessCombatPersistence;