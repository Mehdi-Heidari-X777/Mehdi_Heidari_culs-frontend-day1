// One script for the whole site.
//
// Home page: reads data/herbs.json for the list, then loads each herb's own
// file (data/herbs/<slug>.json) and shows every field on its card.
// Herb page: the page names its herb with data-herb, and the same kind of file
// fills the page.

const SAFE_SLUG = /^[a-z0-9-]+$/

const FACTS = [
  ["Family", "family"],
  ["In the kitchen", "use"],
  ["Sun", "sun"],
  ["Season", "season"],
]

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function element(tag, className, text) {
  const node = document.createElement(tag)
  node.className = className
  node.textContent = text
  return node
}

function picture(className, src, alt) {
  const img = document.createElement("img")
  img.className = className
  img.src = src
  img.alt = alt
  img.width = 400
  img.height = 300
  return img
}

function fact(term, value) {
  const dd = element("dd", "", "")
  if (typeof value === "string") {
    dd.textContent = value
  } else {
    dd.append(value)
  }
  return [element("dt", "", term), dd]
}

function factsOf(herb, className) {
  const facts = element("dl", className, "")
  for (const [term, key] of FACTS) {
    if (herb[key]) {
      facts.append(...fact(term, herb[key]))
    }
  }
  if (herb.life) {
    facts.append(...fact("Life", element("span", "life", herb.life)))
  }
  return facts
}

async function loadJson(path) {
  const response = await fetch(path)
  if (!response.ok) {
    const problem = new Error(`${response.status} ${response.statusText}`)
    problem.status = response.status
    throw problem
  }
  return response.json()
}

function herbSlug(name) {
  const slug = slugify(name)
  if (!SAFE_SLUG.test(slug)) {
    throw new Error(`bad herb name: ${name}`)
  }
  return slug
}

// ---- Home page ----

function card(slug, herb) {
  const item = element("li", "card", "")
  const link = element("a", "card-link", "")
  link.href = `herbs/${slug}.html`

  const body = element("div", "card-body", "")
  body.append(
    element("h3", "name", herb.name),
    element("p", "latin", herb.latin))
  if (herb.description) {
    body.append(element("p", "description", herb.description))
  }
  body.append(factsOf(herb, "facts card-facts"))

  link.append(picture("card-picture", `images/herbs/${slug}.svg`, ""), body)
  item.append(link)
  return item
}

async function showCards(list) {
  const index = await loadJson("data/herbs.json")
  const entries = await Promise.all(
    index.map(async (entry) => {
      const slug = herbSlug(entry.name)
      return { slug, herb: await loadJson(`data/herbs/${slug}.json`) }
    }))

  list.replaceChildren(...entries.map(({ slug, herb }) => card(slug, herb)))

  const count = document.querySelector("#herbs .count")
  if (count) {
    count.textContent = `${entries.length} herbs grow here.`
  }
}

// ---- Herb page ----

function dataLink(name) {
  const p = element("p", "data-link", "")
  const link = element("a", "", "See this herb's data (JSON)")
  link.href = `../data/herbs/${name}.json`
  p.append(link)
  return p
}

function fillHerb(article, slug, herb) {
  document.title = `${herb.name} — The Little Herb Garden`

  const parts = [
    element("h1", "herb-name", herb.name),
    element("p", "herb-latin", herb.latin),
    picture("herb-picture", `../images/herbs/${slug}.svg`,
      `${herb.name} growing in a terracotta pot`),
  ]
  if (herb.description) {
    parts.push(element("p", "herb-intro", herb.description))
  }
  parts.push(factsOf(herb, "facts"), dataLink(slug))

  article.replaceChildren(...parts)
}

async function showHerb(article) {
  const slug = article.dataset.herb
  if (!slug || !SAFE_SLUG.test(slug)) {
    throw new Error("not-found")
  }
  fillHerb(article, slug, await loadJson(`../data/herbs/${slug}.json`))
}

// ---- Errors ----

function herbMessage(problem) {
  return problem.status === 404 || problem.message === "not-found"
    ? "That herb is not in the garden."
    : `The herb could not be loaded (${problem.message}).`
}

function failHerb(article, problem) {
  const back = element("p", "", "")
  const link = element("a", "", "See which herbs do grow here")
  link.href = "../index.html#herbs"
  back.append(link)
  article.replaceChildren(
    element("h1", "herb-name", "Hmm, no herb here"),
    element("p", "herb-error", herbMessage(problem)),
    back)
}

function failCards(problem) {
  const count = document.querySelector("#herbs .count")
  if (count) {
    count.textContent = `The herbs could not be loaded (${problem.message}).`
  }
}

// ---- Start ----

const herbPage = document.querySelector("#herb")
const cardList = document.querySelector("#herbs-list")

if (herbPage) {
  showHerb(herbPage).catch((problem) => failHerb(herbPage, problem))
} else if (cardList) {
  showCards(cardList).catch(failCards)
}
