import { DH2E_COMM } from "./modules/config.js";
import dh2e_commActor from "./modules/objects/dh2e_commActor.js";
import dh2e_commCharacterSheet from "./modules/sheets/dh2e_commcharacterSheet.js";

Hooks.once("init", async () => {
    
    console.log("DH2E-COMM | Initializing Dark Heresy 2nd Edition - Community Version");
    
    // Setting up the Global Configuration Object
    CONFIG.DH2E_COMM = DH2E_COMM;
    CONFIG.INIT = true;
    CONFIG.ACTOR.documentClass = dh2e_commActor;

    // Register custom Sheets and unregister the start Sheets
    // Items.unregisterSheet("core", ItemSheet);
    
    const DocumentSheetConfig = foundry.application.apps.DocumentSheetConfig;
    DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.appv1.sheets.ActorSheet);
    DocumentSheetConfig.registerSheet(Actor, "dh2e-comm", dh2e_commCharacterSheet, { types: ["character"], makeDefault: true, label: "DH2E_COMM.SheetClassCharacter"});

    // Load all Partial Handlebad files
    preloadHandlebarsTemplates();

    // Register additional Handlebar Helpers
    registerHandlebarsHelpers();
});

Hooks.once("ready", async () => {
    
    // Finished initialization phase and release lock
    CONFIG.INIT = false;

    // Only execute when run as Gamemaster
    if (!Gamepad.user.isGM) return;
});

function preloadHandlebarsTemplates() {
    
    const templatePaths = [
        
        "systems/dh2e-comm/templates/partials/character-sheet-character.hbs",
        "systems/dh2e-comm/templates/partials/character-sheet-background.hbs",
        "systems/dh2e-comm/templates/partials/character-sheet-skill.hbs",
        "systems/dh2e-comm/templates/partials/character-sheet-combat.hbs",
        "systems/dh2e-comm/templates/partials/character-sheet-progression.hbs",
    ];

    return foundry.applications.handlebars.loadTemplates(templatePaths);
};

function registerHandlebarsHelpers() {
    
    Handlebars.registerHelper("equals", function(v1, v2) { return (v1 === v2)});

    Handlebars.registerHelper("contains", function(element, search) { return (element.includes(search))});

    Handlebars.registerHelper("concat", function(s1, s2, s3 = "") { return s1 + s2 + s3;});

    Handlebars.registerHelper("isGreater", function(p1, p2) { return (p1 > p2)});

    Handlebars.registerHelper("isEqualORGreater", function(p1, p2) { return (p1 >= p2)});

    Handlebars.registerHelper("ifOR", function(conditional1, conditional2) { return (conditional1 || conditional2)});

    Handlebars.registerHelper("doLog", function(value) { console.log(value)});

    Handlebars.registerHelper("toBoolean", function(string) { return (string === "true")});
    
    Handlebars.registerHelper("for", function(from, to, incr, content) {

        let result = "";
        for (let i = from; i < to; i += incr)
            result += content.fn(i);

        return result;
    });

    Handlebars.registerHelper("times", function(n, content) {

        let result = "";

        for (let i = 0; i < n; i++)
            result += content.fn(i);
    });

    Handlebars.registerHelper("notEmpty", function(value) {
        
        if (value == 0 || value == "0") return true;
        if (value == null || value == "") return false;
        return true;
    });
}


/* -------------------------------------------------- */
/*                 General Functions                  */
/* -------------------------------------------------- */