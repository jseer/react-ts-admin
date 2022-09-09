import { TypedUseSelectorHook, useDispatch, useSelector, shallowEqual } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = (selector) => useSelector(selector, shallowEqual)