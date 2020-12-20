import wikiLinkParser from "./wiki_link_parser";

export default function (processor) {
    const Parser = this.Parser;
    // debugger;
    const inlineTokenizers = Parser.prototype.inlineTokenizers;
    const inlineMethods = Parser.prototype.inlineMethods;

    inlineTokenizers.wiki_link = wikiLinkParser;
    // debugger;
    inlineMethods.splice(inlineMethods.indexOf("reference"), 0, "wiki_link");
}
