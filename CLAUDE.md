# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start Metro bundler
npx expo start --clear

# Run on Android (rebuilds native)
npx expo run:android

# Run on iOS
npx expo run:ios

# Type check
pnpm typecheck
```

> After changing `babel.config.js` or installing native modules, always use `npx expo run:android` (not just `expo start`) to rebuild the native layer.

## Architecture

### Directory structure

```
src/
├── app/          # Navigation and routing only
│   └── navigation/
└── ui/           # All presentation code
    ├── components/   # Shared primitives
    ├── screens/      # Feature screens
    ├── styles/       # Theme and variant utilities
    └── utils/        # Pure helpers
```

### Path aliases

| Alias | Resolves to |
|---|---|
| `@ui/*` | `src/ui/*` |
| `@app/*` | `src/app/*` |
| `@assets/*` | `src/assets/*` |

Both `tsconfig.json` (for TS) and `babel.config.js` (for Metro) must be kept in sync.

### Navigation

Two-level nested stack navigator:

- **AuthStack** (`src/app/navigation/AuthStack.tsx`) — top-level: `Greetings` → `Onboarding`
- **OnboardingStack** (`src/ui/screens/Onboarding/OnboardingStack.tsx`) — nested inside `Onboarding` screen, manages all onboarding steps

Each stack exports three types: `*ScreenProps<TRoute>`, `*NavigationProps`, and `*RouteProps`. Steps import types from `OnboardingStack.tsx` directly (not from a barrel) to avoid circular dependencies.

### Onboarding flow

The onboarding steps are driven by `OnboardingProvider` (context), which uses `onboardingNavigation` (a `createNavigationContainerRef`) to navigate imperatively. The order of steps is defined in `src/ui/screens/Onboarding/steps/index.tsx` as `orderSteps: Array<keyof OnboardingStackParamList>`.

The `NavigationIndependentTree` + `NavigationContainer` wrapping inside `OnboardingStack` is intentional — it isolates the nested navigator from the root navigation tree.

### Styling

- **Theme** is defined in `src/ui/styles/theme/index.tsx` — colors (lime, gray, black, white, support), font family (HostGrotesk), and font sizes.
- **`createVariants`** (`src/ui/styles/utils/createVariants.ts`) is a custom CVA-like utility for React Native StyleSheets. It takes `base`, `variants`, and `defaultVariants`, and returns a function that merges styles. Used in Button, FormGroup, RadioGroup.
- Components keep their styles in a co-located `styles.ts` file.

### Component conventions

- Logic is extracted to `use*Controller.ts` hooks when a component has non-trivial state/behavior (e.g., `useAppInputController.ts`, `useSignInBottomSheetController.ts`).
- Props interfaces are defined in `I*.ts` files when shared across files (e.g., `ISignInBottomSheet.ts`).
- `AppText`, `AppButton`, `AppInput`, `FormGroup`, `RadioGroup` are the base primitives — prefer these over raw RN components.
