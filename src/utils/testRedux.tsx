import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PropsWithChildren, ReactElement } from 'react'
import { Provider } from 'react-redux'

// As a basic setup, import your same slice reducers
import { mainReducer } from 'store/rootReducer'
import type { RootState, Store } from 'store/store'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: Store
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},

    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: mainReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
): ExtendedRenderOptions {
  function Wrapper({ children }: PropsWithChildren): ReactElement {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
