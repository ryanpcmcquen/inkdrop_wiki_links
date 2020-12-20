function locator(value, fromIndex) {
    return value.indexOf("$", fromIndex);
}

// https://regex101.com/r/Tsi5wM/1
const RE_WIKI = /\[{2}([^\]]+)\]{2}?/gm;

// const db = inkdrop.main.dataStore.getLocalDB();
// const utils = db.utils;

function tokenizer(eat, value, silent) {
    const match = RE_WIKI.exec(value);
    if (match) {
        if (silent) {
            return true;
        }
        // console.log(db);
        // debugger;

        return eat(match[0])({
            type: "text",
            value: match[1].trim(),
        });
    }
}

tokenizer.locator = locator;
tokenizer.notInLink = true;

export default tokenizer;
