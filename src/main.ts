import initApp from './app'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
      <canvas id="screen" />
  </div>
`

initApp(document.querySelector<HTMLCanvasElement>('#screen')!)
