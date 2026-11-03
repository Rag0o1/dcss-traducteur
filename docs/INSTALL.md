# Installation, browser by browser

The add-on is made only of **content scripts** (no background page, no browser-specific API), so the same folder works in Firefox and in every Chromium-based browser. Nothing is installed from a store: you load the unzipped folder (the one that contains `manifest.json`).

First, get the folder: download this repository (green **Code** button → *Download ZIP*) or a release zip, and **unzip it somewhere permanent** (the browser keeps pointing to that folder; if you move or delete it, the add-on stops working).

## Firefox (desktop)
1. Type `about:debugging` in the address bar → **This Firefox**.
2. **Load Temporary Add-on…** → pick `manifest.json` in the folder.
3. Open or reload (`F5`) the game page.

*Limit:* a temporary add-on is removed when Firefox closes — repeat steps 1–3 next time. After editing a file, click **Reload** next to the add-on, then `F5`.

**Permanent install on Firefox** (optional): release Firefox only accepts signed add-ons. Options: use **Firefox Developer Edition / Nightly / ESR** and set `xpinstall.signatures.required` to `false` in `about:config`, then install a zip renamed `.xpi` (`about:addons` → gear → *Install Add-on From File…*); or sign it yourself as an unlisted add-on on addons.mozilla.org (a free developer account, add a `browser_specific_settings.gecko.id` to `manifest.json`).

## Google Chrome, Microsoft Edge, Brave, Opera, Vivaldi, Chromium
1. Open the extensions page: `chrome://extensions` (Edge: `edge://extensions`, Brave: `brave://extensions`, Opera: `opera://extensions`, Vivaldi: `vivaldi://extensions`).
2. Turn on **Developer mode** (top right, or bottom left on Edge).
3. Click **Load unpacked** and choose the folder that contains `manifest.json`.
4. Open or reload (`F5`) the game page.

Unlike Firefox, an unpacked extension **stays installed** between restarts (Chrome may show a "disable developer mode extensions" notice at start-up: ignore or dismiss it). After editing a file click the ⟳ **reload** icon on the extension card, then `F5`.

## Safari (macOS / iOS)
Safari cannot load a raw folder. Convert it with Apple's tool (needs Xcode):
`xcrun safari-web-extension-converter /path/to/folder`, then build and run the generated app and enable the extension in Safari → Settings → Extensions. Not tested by the author.

## Mobile
* **Firefox for Android**: only add-ons from the official collection are installable on release builds; Firefox **Nightly** lets you use a custom add-on collection (Settings → About → tap the logo 5 times → *Custom Add-on collection*), which requires a signed add-on. Not tested.
* **Chrome for Android / iOS browsers** do not support extensions (use Kiwi Browser or similar on Android: same *Load unpacked* steps, not tested).

## Check that it works
Open the game, press `F12` → **Console**: you should see `Base de traduction chargée : … textes` and no red error. Messages in the log, menus and descriptions should be in French.

## Using it on another WebTiles server
By default it only runs on `crawl.xtahua.com` and `crawl.develz.org`. To add a server, edit `manifest.json` and add a line in `"matches"`:
```json
"matches": [
  "*://crawl.xtahua.com/*",
  "*://crawl.develz.org/*",
  "*://your.server.example/*"
],
```
then reload the extension. (The translation targets DCSS **0.34 / 0.35**; other versions will leave more text in English.)

## Settings
`OPTIONS.js` → `nomsDeSorts: "anglais"` (default, spell names stay English like the official game) or `"francais"`. Reload the extension and the page after a change.

## Troubleshooting
* **Nothing is translated**: wrong site (see above), extension not loaded (check the extensions page), or you opened the game in a private window (extensions are disabled there unless allowed).
* **Red error in the console after you edited a file**: a forgotten comma, quote or brace — the console shows the file and the line.
* **Text is in English after an update**: reload the extension *and* the page; `Ctrl+F5` if the browser cached the page.
* **Chrome: "Manifest file is missing or unreadable"**: you selected the zip, or the parent folder — select the unzipped folder that directly contains `manifest.json`.
