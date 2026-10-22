# 🌿 The Little Herb Garden

**Date:** 22 October 2026 · day 1 of **Frontend Development**

![Two raised beds full of herbs, with a bee](images/garden.svg)

A small static website about a made-up herb garden. The home page shows eight
herbs, with every field from each herb's JSON on its card, and every card opens
its own page with the same data and an illustration. Plain HTML, CSS and vanilla
JavaScript — no build step, no dependencies.

## Start here

Click a link to open that file in Zed.

| Open | What it is |
| --- | --- |
| [index.html](index.html) | The home page: intro, the eight cards, Visit, About |
| [herbs/](herbs) | The folder of herb pages |
| [style.css](style.css) | How the whole site looks |
| [app.js](app.js) | One script for every page: builds the cards and fills the herb pages, both from the per-herb JSON |
| [data/herbs.json](data/herbs.json) | The list the home page reads |
| [images/garden.svg](images/garden.svg) | The garden picture |

## The herbs

Click a picture or a page link to open that herb; the last column opens its JSON.

| Picture | Herb | Life | Page | Data |
| --- | --- | --- | --- | --- |
| [![Basil](images/herbs/basil.svg)](herbs/basil.html) | **Basil** — *Ocimum basilicum* — soft, glossy leaves; tomatoes, pesto and anything summery | annual | [Open](herbs/basil.html) | [JSON](data/herbs/basil.json) |
| [![Spearmint](images/herbs/spearmint.svg)](herbs/spearmint.html) | **Spearmint** — *Mentha spicata* — bright, serrated leaves; it runs, so give it a pot; fresh tea | perennial | [Open](herbs/spearmint.html) | [JSON](data/herbs/spearmint.json) |
| [![Rosemary](images/herbs/rosemary.svg)](herbs/rosemary.html) | **Rosemary** — *Salvia rosmarinus* — woody, needle-like leaves that smell of pine; roast vegetables | perennial | [Open](herbs/rosemary.html) | [JSON](data/herbs/rosemary.json) |
| [![Thyme](images/herbs/thyme.svg)](herbs/thyme.html) | **Thyme** — *Thymus vulgaris* — a low, creeping evergreen for gritty, sunny soil; soups and stews | perennial | [Open](herbs/thyme.html) | [JSON](data/herbs/thyme.json) |
| [![Lavender](images/herbs/lavender.svg)](herbs/lavender.html) | **Lavender** — *Lavandula angustifolia* — grey leaves and purple spikes that hum with bees | perennial | [Open](herbs/lavender.html) | [JSON](data/herbs/lavender.json) |
| [![Sage](images/herbs/sage.svg)](herbs/sage.html) | **Sage** — *Salvia officinalis* — velvety leaves with a savoury, slightly bitter taste; butter sauces | perennial | [Open](herbs/sage.html) | [JSON](data/herbs/sage.json) |
| [![Chamomile](images/herbs/chamomile.svg)](herbs/chamomile.html) | **Chamomile** — *Matricaria chamomilla* — daisy-like flowers that bloom more the more you pick | annual | [Open](herbs/chamomile.html) | [JSON](data/herbs/chamomile.json) |
| [![Chives](images/herbs/chives.svg)](herbs/chives.html) | **Chives** — *Allium schoenoprasum* — hollow grassy leaves and edible pink pompoms | perennial | [Open](herbs/chives.html) | [JSON](data/herbs/chives.json) |

### At a glance

One line per herb: life, sun, season, and what it is good for.

- **Basil** (*Ocimum basilicum*) — annual · full sun · summer · tomatoes, pesto and anything summery.
- **Spearmint** (*Mentha spicata*) — perennial · full sun to part shade · spring to autumn · fresh tea, and it spreads everywhere.
- **Rosemary** (*Salvia rosmarinus*) — perennial · full sun · all year · potatoes, bread and roast vegetables.
- **Thyme** (*Thymus vulgaris*) — perennial · full sun · spring to autumn · soups and stews; bees love the flowers.
- **Lavender** (*Lavandula angustifolia*) — perennial · full sun · summer · scent for the wardrobe, a feast for bees.
- **Sage** (*Salvia officinalis*) — perennial · full sun · spring to autumn · butter sauces and tea.
- **Chamomile** (*Matricaria chamomilla*) — annual · full sun · summer · a calming cup of tea.
- **Chives** (*Allium schoenoprasum*) — perennial · full sun to part shade · spring to summer · bread and butter, eggs, potatoes.

## The pages

Two kinds of page, and both matter:

- **Home** — [index.html](index.html): the intro, the eight herb cards (the list
  from [data/herbs.json](data/herbs.json), the content from each herb's own
  JSON), and the Visit and About sections.
- **Herb pages** — [herbs/](herbs): one file per herb. Each page names its herb
  with `data-herb`, and [app.js](app.js) fetches `data/herbs/<slug>.json` to
  render the illustration, common and latin name, description, and a facts box
  that walks every field in the JSON: family, kitchen use, sun, season, life,
  varieties, growing conditions, planting, harvest & storage, pests & diseases
  and nutritional highlights. Nested objects become their own group and arrays
  become lists. Editing the JSON changes the card and the page.
  Example: [basil.html](herbs/basil.html).

## Run it

You need [Node.js](https://nodejs.org/) first — installing it also gives you
`npx`.

1. Open a terminal in this project's folder.
2. Start the server:

   ```sh
   npx serve
   ```

3. Open the address it prints, usually http://localhost:3000.
4. When you are done, stop the server with `Ctrl+C`.

Do not open `index.html` by double-clicking: a `file://` page is not the Web,
and the browser will refuse to fetch the JSON files.

> ⚠️ **Keep Node.js updated.** Node runs JavaScript on your machine, so an
> outdated copy is a security risk. Critical flaws are found and patched
> regularly — update to the latest LTS as soon as you can.

**What you need**

- a GitHub account
- Git
- an editor
- a browser (Firefox recommended)
- [Node.js](https://nodejs.org/) (the LTS version), which brings `npx`

**Get your own copy**

1. Fork this repository to your GitHub account.
2. Clone your fork, not this repository:

   ```sh
   git clone https://github.com/<your-name>/culs-frontend-day1.git
   cd culs-frontend-day1
   ```

## Project layout

```text
index.html      the home page
herbs/          one page per herb
style.css       how it looks
app.js          what it does: cards and herb pages, from the JSON
data/           the herb list, as JSON
data/herbs/     one JSON file per herb
images/         the logo and the garden picture
images/herbs/   one illustration per herb
```

| Path | What lives there | Why it is a separate place |
| --- | --- | --- |
| [herbs/](herbs) | `basil.html`, `spearmint.html`, … | Each herb has its own address, and the page renders whatever is in `data/herbs/<slug>.json`, so the JSON stays the single source for that page's content. |
| [data/herbs/](data/herbs) | `basil.json`, `spearmint.json`, … | One small record per herb: editing a herb touches one file, and the file name matches the page name. [data/herbs.json](data/herbs.json) stays the short list the home page reads. |
| [images/herbs/](images/herbs) | `basil.svg`, `spearmint.svg`, … | Keeps the eight matching illustrations together and apart from the site's original logo and garden drawing. The file name is the same slug used for the page and the JSON. |

## Add a ninth herb

1. Copy any file in [data/herbs/](data/herbs), rename it with the new slug, and edit its values.
2. Add a matching entry to [data/herbs.json](data/herbs.json) so the home page shows a card.
3. Copy a page in [herbs/](herbs), rename it to match, and change its `data-herb` value; [app.js](app.js) renders the rest from the JSON.
4. Drop an illustration in [images/herbs/](images/herbs) using the same slug.

The three names must agree, because `app.js` derives them from the herb name:
`herbs/<slug>.html`, `data/herbs/<slug>.json`, `images/herbs/<slug>.svg`.

## Your mission

The original day-1 exercise shipped with a few deliberate bugs, and they are all
fixed here. Use the same loop to keep practising:

1. Inspect before you change anything: the page, the Console, the Network panel, the Inspector (`Ctrl+Shift+I`).
2. Pick one problem and find out why it happens.
3. Fix it, reload (`Ctrl+R`), verify.
4. Commit that one fix, with a message that says what you fixed.
5. Repeat.

**Done when**

- [ ] the Console shows no unexplained errors
- [ ] the Network panel shows no missing files
- [ ] every link on the page goes where it says
- [ ] `git status` is clean, and `git push` has sent your commits to GitHub
