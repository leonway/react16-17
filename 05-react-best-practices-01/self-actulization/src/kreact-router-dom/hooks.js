import {useContext} from 'react'
import { RouterContext } from './RouterContext'

export const useHistory = ()=>{
  const store = useContext(RouterContext)
  console.log(store);
  return store.history
}
export const useLocation = ()=>{
  return useContext(RouterContext).location
}
export const useRouteMatch = ()=>{
  return useContext(RouterContext).match
}
export const useParams = ()=>{
  const match = useContext(RouterContext).match
  return match?match.params:{}
}
