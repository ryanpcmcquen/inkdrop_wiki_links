function locator(value, fromIndex) {
    return value.indexOf("[", fromIndex);
}

// https://regex101.com/r/Tsi5wM/1
const RE_WIKI = /\[([^\]]+)\]{2}/gm;

function tokenizer(eat, value, silent) {
    const match = RE_WIKI.exec(value);
    if (match) {
        if (silent || match.length < 1 || !match[1]) {
            return true;
        }
        // debugger;
        // if (!match[1]) {
        // return true;
        // }

        const result = eat(match[0])({
            type: "wiki_link",
            value: match[1].trim(),
        });
        // debugger;
        return result;
    }
}

tokenizer.locator = locator;
tokenizer.notInLink = false;

export default tokenizer;
