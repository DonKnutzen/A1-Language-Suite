# Basket — shared shopping and household budgets

Basket's static front end is hosted in this folder using the repository's existing GitHub Pages publication. No extra GitHub subscription or Supabase project is created.

- Shopping lists and household invitations
- Email/password sign-in with email confirmation
- Receipt scanning and review, stored product prices and spending
- Shared monthly and category budgets

Private data and receipt images remain in the existing Basket API at `https://basket-together.airychime12.chatgpt.site`. The page includes only a public Supabase connection key. GitHub does not store account credentials, receipts or household records. Authentication and household permissions are checked by the backend for every data request.

## Source and rebuilding

The authored application, backend code, tests and lockfile are preserved under `source/`. Install its pinned dependencies with `pnpm install --frozen-lockfile`, then run `pnpm build:pages`. Copy the generated files from `source/outputs/pages/` to this directory and commit the change. Do not commit `node_modules`, environment files, receipt data or service-role keys.

## Email and existing accounts

The email-confirmation and password-reset redirects must allow this folder's `account-complete.html` as well as the backend's `/account-complete`. Email delivery to partner addresses needs working SMTP configuration in Supabase; default Supabase mail has restrictions. Those administrative settings remain pending access.

Language Suite and Pokémon currently use two separate existing Supabase projects. Basket reuses the Pokémon project's email authentication. The connected account cannot administer the Language Suite project, so existing language accounts and progress have not been moved. The number of projects remains two. A data-preserving consolidation is required before claiming one shared account system for all three apps.
