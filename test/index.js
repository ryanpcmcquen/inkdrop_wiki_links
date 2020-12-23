const thisPackage = "wiki_links";

test.serial.cb(thisPackage, (t) => {
    global.window.inkdrop.packages.setPackageMainModule = (name, p) => {
        t.is(name, thisPackage);
        t.is(p instanceof Object, true);
        t.is(typeof p.activate, "function");
        t.is(typeof p.deactivate, "function");
        t.end();
    };

    require(`../lib/${thisPackage}`);
});
