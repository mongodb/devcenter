## File Structure

### `api-requests`

Requests to the Strapi API to get our content.
### `components`

Reusable React components meant to be utilized by our pages and other components.

Generally, each component will have its own directory. The Card component is a good example of files you might find in a component's directory. `card.tsx` is the main component, `styles.ts` contains styling, `utils.ts` contains uility functions, and `types.ts` contains types and interfaces used by the component. Sometimes components will have helper components in their directory as well (like `secondary-tag.tsx` for Card).

The main component is imported into and exported from `index.ts`, along with any other types, styles, utilities, or components that need to be available outside this component directory. As an example, `components/card` exports the `Card` component along with the utility function `getCardProps`.


### `config`

Configuration code and variables for use with API requests or services.

### `data`
Hard-coded data to be used throughout the codebase.

### `interfaces`

TypeScript interfaces that are used throughout the codebase.

### `mockdata`

Mock data used in unit tests.

### `page-templates`

Next.js page templates. These are used when a number of pages have very similar content, but don't exactly work with Next's dynamic routing.

### `pages`

The directory containing all of our Next.js pages. Basically, the routes are defined by the file structure of this drectory, with `index.tsx` being the root route. `_app.tsx` Is basically a wrapper around the whole project, and each page will be rendered inside of it. Read about how the Next.js `pages` directory works [here](https://nextjs.org/docs/basic-features/pages).

### `scripts`

One-off scripts not tied to the UI.

### `service`

Services that the pages and components utilize to get/process data.

### `styled`

[Styled Components](https://emotion.sh/docs/styled) and global styling used throughout the codebase.

### `types`

TypeScript types that are used throughout the codebase.

### `utils`

A variety of utility functions that are used throughout the codebase.
