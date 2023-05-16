import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { metamaskSlice } from './metamaskSlice.ts';
import { bridgeSlice } from './bridgeSlice.ts';

// GLOBAL STORE:

const store = configureStore({
    reducer: {
        // slices here:
        metamask: metamaskSlice.reducer,
        bridge:bridgeSlice.reducer
    },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// HOOKS: (instead of plain `useDispatch` and `useSelector`)
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector