import wikiLinkParser from "./wiki_link_parser";

export default function (processor) {
    const Parser = this.Parser;

    const inlineTokenizers = Parser.prototype.inlineTokenizers;
    const inlineMethods = Parser.prototype.inlineMethods;

    inlineTokenizers.wiki_link = wikiLinkParser;
    inlineMethods.splice(
        inlineMethods.indexOf("linkReference"),
        0,
        "wiki_link"
    );
}
