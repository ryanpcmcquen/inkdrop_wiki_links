const package = "wiki_links";

test.serial.cb(package, (t) => {
    global.window.inkdrop.packages.setPackageMainModule = (name, p) => {
        t.is(name, package);
        t.is(p instanceof Object, true);
        t.is(typeof p.activate, "function");
        t.is(typeof p.deactivate, "function");
        t.end();
    };

    require(`../lib/${package}`);
});
