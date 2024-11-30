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
        return Array.from(this.store.values())
            .filter(combat => {
                console.log(combat);
                return combat.requester === userId || combat.fighter === userId
            });
    }
}

module.exports = StatelessCombatPersistence;