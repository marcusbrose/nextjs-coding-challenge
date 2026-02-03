# Coding Challenge #2 C4

## High-level approach

- Built a Next.js application with server-side API routes for search
- Searchable data is normalized, enriched and stored locally
- Implemented client-side search interface with filtering
- Structured the app with separation of concerns between API layer and UI components
- Used shadcn/ui components for fast prototyping and including accessability features
- Processing functions, index and analytics storage are located outside app directory to be commonly used

## Assumptions

- Search should be case-insensitive for better user experience
- Users expect instand updating search results without manual submission
- Relevance scoring prioritizes exact matches over partial matches
- Performance is acceptable for datasets under 10k items
- The UI is accessible via keyboard navigation
- Tanstack query handles retry functionality

## Design Decisions (Search/Relevance)

- Search Strategy: Implemented multi-field fuzzy and token based search across relevant text fields
- State: Implemented tanstack query for search result state management
- Relevance Scoring: Weighted exact matches higher than partial matches, with title/name fields having higher priority
- Debouncing: Added 300ms debounce to prevent excessive API calls during typing
- Error Handling: Graceful degradation when search service is unavailable

## Limitations and "What I would do next"

### Current Limitations
- Search doesn't scale beyond moderate dataset sizes
- Filter UI components cannot be cleared easily
- Search and filter values are not persisted on page refresh
- Stop words are ignored completely

### Next Steps
- Implement server-side search with proper indexing (Open Search/Elasticsearch/Algolia)
- Add search autocomplete and suggestions
- Implement advanced filtering and faceted search
- Add search result caching and pagination
- Stop word could be use for a fallback

### “New items every minute”
- Add new items to processing queue, decouple ingestion from processing
- Preparatory processing in background processes, not during insertion
- Workers can process in parallel
- Batch update the search index / replace the entire search index, every minute, if new processed items exist

## Improvements / Next steps

### API search endpoint
- Implement proper search indexing for large datasets
- Add pagination and result limiting
- Extend API response model to inclide match highlight e.g. by returning matching tokens

### UI
- Sort controls inside results table header per column
- Persist all search params to URL params
- Implement responsive design with tailwind, e.g. for mobile devices
- Datepicker with only one date

## Testing approach
- Unit tests for each preprocessing function
- Edge case and boundary testing
- Performance tests for large datasets, unless index is replaced by proper server-side search
- Integration tests with real data samples
- E2E test (Playwrite) simulating UI interactions

## Trade-offs
- Development Speed vs. Robustness
- Basic relevance algorithm optimized for speed over precision
- Storage doesn't persist across sessions
- Basic Error Handling and fallback mechanisms
- No caching

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

