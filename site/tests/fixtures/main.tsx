import {createRoot} from 'react-dom/client'
import {Interactions} from './interactions'
import {Example} from './example'
import '../../styles/globals.css'

const root = document.getElementById('root')
if (root)
  createRoot(root).render(
    window.location.pathname === '/example' ? <Example /> : <Interactions />,
  )
