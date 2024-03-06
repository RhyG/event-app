# Event App (name WIP)

- [Stack](#stack)
- [Project Structure](#project-structure)
  - [Feature folders](#feature-folders)
  - [The `core` folder](#the-core-folder)
  - [Other notes](#other-notes)
- [Architecture Overview (DURRY)](#architecture-overview-durry)
  - [Example feature implementation following arch](#example-feature-implementation-following-arch)
  - [Global state](#where-does-global-state-live-in-all-this)
- [Navigation](#navigation)
  - [Declaring New Screens](#declaring-new-screens)
- [Theming and Reusable Components](#theming-and-reusable-components)
- [Testing Strategy](#testing-strategy)

## Stack

- React Native w/ Expo
- Typescript
- Tanstack Query
- Supabase
- React Navigation
- Zustand

## Project Structure

This is an overview of the main project folders, an in depth architecture will come later. The app uses feature folders:

```bash
.
├── app/
│   ├── features             # app features
│   ├── core                 # core app functionality/
│   │   ├── ui/
│   │   │   ├── components/  # reusable components
│   │   │   └── theme/       # tokens and theme files
│   │   ├── lib/             # libraries and shared code for whole app
│   │   └── modules/         # self-contained core modules and facades
│   ├── i18n/                # internationalisation
│   ├── navigation/          # app navigator and nav types
│   └── tests/               # test utilities
├── assets/                  # app assets - used by expo
└── supabase/                # supabase serverless functions
```

### Feature folders

A feature folder contains all the code for a single feature of the app. A feature is a self-contained piece of functionality, and will hold all the interfaces, logic and UI for that feature. Feature folders will typically contain the following folders:

- `/api` - API files, including Tanstack Query hooks used throughout the feature or imported by other features.
- `/components` - React components used throughout the feature or imported by other features.
- `/hooks` - React hooks used throughout the feature or imported by other features.
- `/screens` - Feature screens.
- `/types` - Types used throughout the feature or imported by other features.

But can contain any other folders needed. The overall idea is that a feature folder will be structured in the way that best suits the feature.

Another key aspect of the project structure is that feature screen folders act as self-contained modules for that screen. This means that any components, utils, types, hooks etc used _exclusively_ by that screen should live in that screen folder. Only when something is used by multiple screens within a feature, or it is consumed by other features implementing that feature, should it move outside the screen folder.

For example, take the event screen. Its folder might contain the following files:

```
/features/events/screens/EventScreen/
├── EventScreen.tsx
├── useEventDetails.ts
├── EventCard.tsx
└── EventScreenHeader.tsx
```

The only thing exported from this folder is the `EventScreen.tsx` component, everything else within there exists solely for that screen.

**Under review - I want to avoid barrel files entirely**
The `index.ts` file in the root of a feature folder then acts as the public interface for a feature. Only things used outside the feature should be added here, and it's important to consider circular dependencies and other barrel file related issues when adding them.

### The `core` folder

`/app/core` is where shared, non feature specific, functionality lives. It's important to consider if something is truly shared before adding it here. I swear to fuck if this just blows out into a big old dumping ground of shit I'm moving to the bush to farm witchetty grubs for a living.

Where applicable, files within the `lib` folder should be _domain_ specific, rather than single use files. E.g. `date.ts` will contain all date functions.

### Other notes

- BIG FILES ARE FINE. Monitors are fuck off huge these days so who cares if a file is a few hundred lines, so long as its still relatively easy to reason about and pertains to a certain domain it's fine. Only exception is React screens and components, where files should try and stay under 250 lines, and anything over starts to be a good indicator that a component should be split or it's not using hooks properly.
- Don't be DRY be MOIST. Don't abstract things "just in case", abstract only when there's clear re-use of something, and an abstraction doesn't require extra work to make work for multiple cases. Repeating something twice isn't a huge deal.
- Functions, interfaces, variables etc should live as close to where they are consumed as possible. If they are only used by one component, it should live in that component file. If that component file is getting too big, it should live in a file next to that component file.

## Architecture Overview (DURRY)

App follows the DURRY architecture:

- Domain-driven
- Unified
- Reasonable
- React
- Yarchitecture

Feature arch is split into four main parts:

- API files - These are the files responsible for communicating with BE services. These files do nothing but send requests and receives responses, then either returning the data or throwing an error if something went wrong. They should be relatively lean and not contain any business logic.
- Services - These are the files responsible for the business logic of the feature. For the most part these are what are implementing the API files. They handle errors, manipulate data, and act as the brains of much of the code. They should be framework agnostic, and not contain React specific code whatsoever. Their inputs and outputs should be clear as possible, and they should be easily testable.
- Hooks - These are the files that take the services and turn them into something React can use. In a way these act as the `ViewModel` for views, and provide for the React views the data and functions they need to render.
- Views - These are the React files rendering the UI. They should be as "dumb" as possible in that they contain no business logic, only logic related to rendering the UI. They should otherwise implement the hooks to get what they need.

The flow of data through a feature should hopefully be as standardised and clear as possible, with data entering the API via an API file, being validated and transformed by a service file, translated into something React can render by a hook, then being rendered by a view.

### Example feature implementation following arch

Taking the event creation screen as an example, when implementing it the thought process should be:

1. Functions responsible for talking to the BE should be implemented in the `api` folder.
2. Calling those API functions, runtime validation, and any other business logic should be implemented in the `service` file e.g. `EventCreationService.ts`.
3. Hooking that service up to any React state or form submission would then happen in a hook, e.g. `useCreateEvent.ts`. This might return a status variable, an `onSubmit` function and form validation.
4. The screen would then use that hook to render the UI, and handle any UI specific logic.

### Where does global state live in all this?

Right now, there isn't any. All state is async and managed by Tanstack Query. Zustand was installed when I thought I'd need some, but I changed my mind and so far it hasn't been needed. Along the same lines as the app arch, and following React best practices, state should be as local as possible. Only if it's truly, truly global should it be managed by a global state manager.

## Navigation

Like any app this uses `react-navigation`, I considered Expo Router but new things are scary and I dunno if I love file based routing all that much, plus I have no plans for web support.

Managing app navigation in a clean and scalable way is hard, and navigation types are a cunnavathing to get right. I've tried some new things to attempt to get it as clean and easy to reason about as possible, they are:

- Letting screen files own all information about a screen, including name and param types. In all other RN projects I've worked on, the screen names are string literals (not awful with intellisense but I've had to refactor them enough to want to avoid them), the param types then live in a separate navigation types file, and then the screen is implemented into the navigator. To avoid this I've done the following:
  - Declared the screen, screen name and param types in the screen file itself. A screen file will export the screen, a const asserted screen name e.g. `const EventDetailsScreenName = "EventDetailsScreen" as const;` and the param types e.g. `type EventDetailsScreenParams = { eventId: string };`. This means that the screen file is the single source of truth for all this information.
  - Used the screen name export to declare the `RootStackParamList` keys. E.g. `type RootStackParamList = { [EventDetailsScreenName]: EventDetailsScreenParams; }`. This means avoiding maintaining two separate places for the screen name.
- Using exported screen names when navigating. E.g. `navigation.navigate(EventDetailsScreenName, { eventId: "123" });`. This means that if a screen name changes, it's only changed in one place.

### Declaring New Screens

To adhere to this navigation approach, when declaring a new screen the following steps should be taken:

1. Declare the screen, screen name, and any params in the screen file:

```tsx
export const EditEventScreen({ navigation, route }: ScreenProp<typeof EditEventScreenName>) {
  return <></>
}

export const EditEventScreenName = "EditEventScreen" as const;
export type EditEventScreenParams = { eventId: string };
```

2. Add the screen name to the `RootStackParamList` type:

```typescript
import { EditEventScreenName, EditEventScreenParams } from '@feature/events';

type RootStackParamList = {
  [EditEventScreenName]: EditEventScreenParams;
};
```

3. Add the screen to the navigator:

```tsx
import { EditEventScreen, EditEventScreenName } from '@feature/events';

export function AppNavigator() {
  return (
    <RootStack.Navigator id="RootStack" initialRouteName="TabNavigator">
      <RootStack.Screen name={EditEventScreenName} component={EditEventScreen} />
    </RootStack.Navigator>
  );
}
```

4. Navigate using the exported screen name:

```typescript
import { EditEventScreenName } from '@feature/events';

navigation.navigate(EditEventScreenName, { eventId: '123' });
```

## Theming and Reusable Components

The app uses a theme file and design tokens to manage the app's design system. It's still early days, and this is expected to grow, but for the most parts screens and features should use design tokens and exported components to implement UI. This means that the UI should be consistent and easy to change.

Right now the theme contains tokens for colours, spacing, typography, shadows and component specific tokens (e.g. input borders and spacing). It also contains the entire colour palette (ripped off of Tailwind) but this should only be used when necessary, and otherwise UI should use tokens and not colour literals.

There's also a few re-usable components, but the main ones worth mentioning are:

- The two box components `<HBox />` and `<VBox />`. These are inspired by the `VStack` and `HStack` components in SwiftUI, and are used to create consistent spacing and layout in the app, and should be used in place of the `<View />` component in most scenarios. They accept props for margin, padding, flex alignment and flex gap. All these props then implement the theme spacing and don't accept string or number literals in order to avoid going willy nilly with design. All other styles should be applied via the `style` prop. Example usage:

```tsx
function Component() {
  return (
    <VBox gap="base" pv="medium">
      <HBox p="sm" justifyContent="center" alignItems="center" gap="small">
        <Text>Some text</Text>
        <Text>Some more text</Text>
      </HBox>

      <Button label="Press me" />
    </VBox>
  );
}
```

- The `<Text />` component. This is a wrapper around the `Text` component from RN, and is used to apply consistent typography styles to text. It accepts a `preset` prop which is used to apply a style from the theme, as well as the usual `size`, `weight`, `colour` etc props.

## Testing Strategy

No tests are written yet, but the approach will be:

- Unit test things in `/core`. Given that these are core functionality used throughout the app, they should be well tested.
- Integration test screens. The goal is to avoid redundant tests, and test as a user would use the app. This means:
  - Not testing components, hooks etc used only by a screen as these are covered by the screen test.
  - Only testing components, hooks etc used by multiple screens.
  - User centric assertions. E.g. "Should show a toast message when the submit button is pressed" and not "Should call the submit function and update state" or "Should render correctly".
- Test API and service files.
- E2E happy path test features.

Testing is:

- Jest + RNTL for unit and integration tests.
- Maestro for E2E.
