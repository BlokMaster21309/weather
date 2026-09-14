# Weather App: Live Data, Your Idea

Build a useful, surprising, or unusually delightful weather app. This starter already turns a U.S. ZIP code into a National Weather Service forecast. Your job is to turn that live data into an experience worth using.

You might answer a question such as:

- How far would someone have to travel to find sunshine?
- When is the best weather window for a run, game, photo shoot, or dog walk?
- When will it rain—and how confident should the user be?
- What will the weather be along a road trip?
- How can an ordinary forecast feel funny, calm, dramatic, beautiful, or specific to one audience?

You may also pitch your own idea. A conventional forecast is fine if the interface and visual design are genuinely your own.

## Start the project

1. Open a terminal in this repository.
2. Run `npm install` once.
3. Run `npm start` whenever you want to work.
4. Open the local URL printed in the terminal.

The page reloads automatically when you save. Stop the server with `Control+C`.

## How the starter works

Open `script.js` and follow the three `addEventListener()` button handlers:

1. **Get place** reads the ZIP code, asks Zippopotam.us for its latitude and longitude, then asks `api.weather.gov/points/{latitude},{longitude}` for the daily and hourly forecast URLs. The forecast buttons become available when those URLs are found.
2. **Get forecast** fetches the daily forecast URL. It displays the complete response as indented JSON and builds a small summary from the first five forecast periods.
3. **Get Hourly Forecast** fetches the hourly forecast URL. It displays the complete response as indented JSON and summarizes the first eight hours with their times.

Getting a place and then one forecast makes three requests in total. The summary loops show a small example of selecting data and putting it on the page. Choose which data matters for your idea and change the summaries to build your own presentation. `styles.css` is linked but contains no style rules; the starter uses browser defaults and a simple side-by-side table. Read the [NWS API documentation](https://www.weather.gov/documentation/services-web-api) to decide what your app needs.

> The National Weather Service covers the United States and its territories. The ZIP-code helper is only a convenient starting input; you may switch to coordinates, browser geolocation, a map, city buttons, a route, or another sensible input.

## Minimum project requirements

Your finished app must:

- use live weather data to serve a clear purpose or concept;
- transform the API data rather than merely printing raw JSON;
- use asynchronous JavaScript (`fetch`, `async`, and `await`);
- have a coherent visual system: intentional typography, color, spacing, and hierarchy;
- credit code, content, images, and AI assistance both in code comments and in the finished site;
- be published and submitted as both a working site link and a source-code link.

An excellent app will:

- have a unique and highly polished visual identity
- demonstrate thoughtful interaction design, including graceful handling of unusual inputs and recovery from errors
- have clean, responsive design, working well on mobile and desktop, and across multiple screen sizes

## Assessment: Digital Creation

Your whole site is assessed on the **Digital Creation** standard. The three rows below describe the evidence in this project; they are aspects of that overall assessment, not separate point totals.

| Aspect                     | Meeting the Standard (3)                                                                                                                                                                                                                                                                                                           | Mastery (4)                                                                                                                                                                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Appearance**             | Your site has an intentional, consistent visual design. You apply contrast, repetition, alignment, and grouping (CRAG). You choose typography and colors, maintain readable contrast, and design for narrow screens rather than leaving browser defaults.                                                                          | Your visual choices work together to communicate the app's purpose and personality. Careful typography, spacing, color, and hierarchy guide attention; layouts show attention to detail across screen sizes and interface states.                                                                                  |
| **Function**               | Your app serves a clear purpose. Controls have clear labels and affordances and produce the expected result.                                                                                                                                                                                                                       | The app achieves its purpose with a thoughtful, efficient interaction flow. Loading, empty, and error states help the user understand what is happening. It handles unusual inputs and recovery gracefully, and its interactions show care for the user's experience.                                              |
| **Working use of the API** | Your app successfully requests live weather data with asynchronous JavaScript and selects, transforms, and presents relevant values for your concept. The result goes beyond the starter's JSON dump. You can explain the request → response → output flow and acknowledge data sources and AI assistance on the site and in code. | You use API data thoughtfully to answer your chosen question through meaningful comparison, filtering, calculation, or another purposeful transformation. Your code is clear and well commented; it handles missing data and failed requests, and you can explain and verify how the output follows from the data. |

A working copy of the starter is a starting point, not a finished Digital Creation submission. Mastery comes from the quality and purpose of your decisions, not simply adding more features.

## Suggested milestones

1. **Trace the starter.** Read the starter code. Use the shape of the code to make one small "hello world" change, such as adding the temperature to the current summary output.
2. **Choose a user and question.** What will be your approach to a weather app? Choose a focus and a user, and write a one-sentence question that your app will answer. What will make your app unique? Your app could be as simple as answering the question "When should I walk my dog?" or "What's the
   weather like for my family?" for tracking a family spread across multiple ZIP codes. You might also choose a more unusual question, such as "Where is the next sunny day?" or "When will it be ideal weather to fly a kite?"
3. **Sketch before styling.** Make a rough mobile layout and identify the most important information.
4. **Build the data logic.** Filter, compare, calculate, or combine forecast periods to answer your question. You might have to fetch more than
   one forecast URL, or you might combine data from multiple periods depending on what your app does. You can use AI to help you build data logic, but you should have at least one clear set of data fetching logic that you can walk through and explain in your own words.
5. **Design the states and the UI.** Make loading, error, no-result, and success states feel intentional. How will a user know what to do? Is it clear how to use your app?
6. **Test and revise.** Try multiple ZIP codes, keyboard-only use, a phone-sized screen. Put in intentionally bad data (i.e. a 3 digit zip code) and
   see what happens.
7. **Publish and explain.** Check the live URL and be prepared to explain your data flow and design choices.

## Project shape

```text
.
├── index.html          # page structure and accessible labels
├── styles.css          # empty stylesheet; design it yourself
├── script.js           # API requests, data logic, and rendering
├── citations.html      # visible source and AI acknowledgments
├── AGENTS.md           # guardrails for coding agents
├── package.json        # npm start command
└── .github/workflows/  # automatic GitHub Pages deployment
```

## Technical notes

- Do not put API keys or other secrets in browser JavaScript or commit them to GitHub.
- Treat API data as uncertain: properties can be absent, services can be slow, and requests can fail.
- Avoid hammering a public service while developing. Fetch in response to a deliberate user action.
- Keep functions focused. Separating “get data,” “choose data,” and “display data” makes experimentation easier.
- If you use a coding agent, keep its generated-code fences and update `citations.html` during the same work session. The repository includes matching instructions for Codex, Copilot, and other assistants.

## Publishing

Every push to `main` runs the included GitHub Pages action. In **Settings → Pages**, set **Source** to **GitHub Actions** if needed. The site URL will have this shape:

`https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

## Starter sources

- [National Weather Service API](https://www.weather.gov/documentation/services-web-api)
- [Zippopotam.us ZIP code API](https://www.zippopotam.us/)

Starter revised for IACS Web Design 2, 2026–2027.
