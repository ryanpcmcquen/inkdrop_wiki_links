import wikiLinkParser from "./wiki_link_parser";

export default function (processor) {
    const Parser = this.Parser;
    const inlineTokenizers = Parser.prototype.inlineTokenizers;
    const inlineMethods = Parser.prototype.inlineMethods;

    inlineTokenizers.wiki = wikiLinkParser;
    inlineMethods.splice(inlineMethods.indexOf("text"), 0, "wiki");
}
