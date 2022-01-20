## File Structure

### `components`

Reusable React components meant to be utilized by our pages and other components.

### `interfaces`

TypeScript interfaces that are used throughout the codebase.

### `pages`

The directory containing all of our Next.js pages. Basically, the routes are defined by the file structure of this drectory, with `index.tsx` being the root route. `_app.tsx` Is basically a wrapper around the whole project, and each page will be rendered inside of it. Read about how the Next.js `pages` directory works [here](https://nextjs.org/docs/basic-features/pages).

### `requests`

Contains utilities functions for making requests for data.

### `styled`

[Styled Components](https://emotion.sh/docs/styled) to be used by components in the `components` directory. We have this directory to separate the styling of our components from their functionality. These files should be named according to the file in the `components` folder that they are used by (e.g. `styled/layout.tsx` contains all the styled components used by `components/layout.tsx`). `theme.ts` also lives here (for now) since it is mostly accessed by the files in this directory.

### `types`

TypeScript types that are used throughout the codebase.
