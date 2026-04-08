export default class dh2e_commActor extends Actor {

    prepareData() {

        // In case some steps need to be overwritten later

        super.prepareData();
    }

    prepareDerivedData() {

        const actorData = this.system;

        // Add posibility for switch statment on the different Actor types

        this._preparePlayerCharacterData(actorData);
    }

    _preparePlayerCharacterData(actorData) {

        // Calculation of Base Character Values

        this._setCharacterValues(actorData);
    }

    async _setCharacterValues(data) {

        // Calculation of values here!

    }

    setNote(note) {

        // Methods to update Character Notes

        this.update({ "system.note": note });
    }

    addLogEntry(Entry) {

        // Add a Log Entry to the Character Event Log

        let log = this.system.log;
        log.push(Entry);
        this.update({ "system.log": log});
    }
}