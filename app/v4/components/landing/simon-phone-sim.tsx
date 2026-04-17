"use client"

import { useEffect, useRef, useState } from "react"

const STYLES = `
#sph-root *{box-sizing:border-box;margin:0;padding:0;}
#sph-root .phone{width:390px;border-radius:54px;background:#000;box-shadow:0 0 0 1px #3a3a3a,0 0 0 3px #111,0 0 0 5px #3a3a3a,0 50px 140px rgba(0,0,0,0.95),inset 0 1px 0 rgba(255,255,255,0.04);position:relative;overflow:hidden;font-family:'Nunito Sans',ui-sans-serif,sans-serif;}
#sph-root .phone::before{content:'';position:absolute;left:-5px;top:108px;width:4px;height:32px;background:#2a2a2a;border-radius:3px 0 0 3px;box-shadow:0 46px 0 #2a2a2a,0 84px 0 #2a2a2a;z-index:200;}
#sph-root .phone::after{content:'';position:absolute;right:-5px;top:140px;width:4px;height:64px;background:#2a2a2a;border-radius:0 3px 3px 0;z-index:200;}
#sph-root .sph-di{position:absolute;top:13px;left:50%;transform:translateX(-50%);width:124px;height:34px;background:#000;border-radius:20px;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 16px;}
#sph-root .sph-di-cam{width:11px;height:11px;border-radius:50%;background:#111;border:1.5px solid #222;}
#sph-root .sph-di-dot{width:8px;height:8px;border-radius:50%;background:#001a0a;border:1px solid #0d4a1a;}
#sph-root .screen{border-radius:53px;overflow:hidden;position:relative;display:flex;flex-direction:column;height:740px;}
#sph-root .map-full{position:absolute;inset:0;width:100%;height:100%;z-index:0;overflow:hidden;}
#sph-root .map-full canvas{position:absolute;inset:0;display:block;}
#sph-root .status-bar{position:relative;z-index:20;height:52px;background:#000;display:flex;align-items:flex-end;justify-content:space-between;padding:0 26px 9px;flex-shrink:0;}
#sph-root .sb-time{font-size:15px;font-weight:800;color:#fff;letter-spacing:-0.3px;}
#sph-root .sb-icons{display:flex;align-items:center;gap:6px;}
#sph-root .app-header{position:relative;z-index:20;background:#000;padding:10px 20px 13px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
#sph-root .app-title{font-size:18px;font-weight:800;color:#fff;letter-spacing:-0.3px;}
#sph-root .hdr-right{display:flex;align-items:center;gap:12px;}
#sph-root .hdr-icon svg{width:20px;height:20px;stroke:#666;fill:none;stroke-width:1.8;}
#sph-root .avatar-w{position:relative;}
#sph-root .avatar-img{width:36px;height:36px;border-radius:50%;overflow:hidden;border:2px solid #222;}
#sph-root .avatar-img img{width:100%;height:100%;object-fit:cover;display:block;}
#sph-root .avatar-dot{position:absolute;bottom:1px;right:1px;width:10px;height:10px;border-radius:50%;background:#22c55e;border:2.5px solid #000;}
#sph-root .map-spacer{flex:1;position:relative;z-index:1;}
#sph-root .bottom-sheet{position:relative;z-index:20;background:#0d0d0d;border-radius:22px 22px 0 0;flex-shrink:0;}
#sph-root .sheet-handle{width:36px;height:4px;background:#2a2a2a;border-radius:2px;margin:10px auto 0;}
#sph-root .sheet-head{padding:10px 18px 0;display:flex;justify-content:space-between;align-items:center;}
#sph-root .vehicle-plate{font-size:22px;font-weight:800;color:#fff;letter-spacing:0.5px;}
#sph-root .plate-meta{display:flex;align-items:center;gap:6px;margin-top:2px;}
#sph-root .plate-time{font-size:11px;font-weight:700;color:#22c55e;}
#sph-root .plate-label{font-size:11px;color:#444;}
#sph-root .view-maps{display:flex;align-items:center;gap:4px;font-size:11px;color:#555;background:none;border:none;cursor:pointer;font-family:inherit;}
#sph-root .view-maps svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:1.8;}
#sph-root .tabs{display:flex;padding:10px 18px 0;border-bottom:0.5px solid #1c1c1c;gap:24px;}
#sph-root .sph-tab{font-size:13px;font-weight:700;color:#444;padding-bottom:8px;cursor:pointer;position:relative;}
#sph-root .sph-tab.active{color:#22c55e;}
#sph-root .sph-tab.active::after{content:'';position:absolute;bottom:-0.5px;left:0;right:0;height:2px;background:#22c55e;border-radius:2px;}
#sph-root .info-rows{padding:2px 0;}
#sph-root .irow{display:flex;align-items:center;justify-content:space-between;padding:9px 18px;border-bottom:0.5px solid #151515;}
#sph-root .irow:last-child{border-bottom:none;}
#sph-root .row-l{display:flex;align-items:center;gap:9px;font-size:12px;color:#555;}
#sph-root .row-l svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:1.8;flex-shrink:0;}
#sph-root .row-r{text-align:right;}
#sph-root .row-val{font-size:13px;font-weight:600;color:#ddd;}
#sph-root .row-sub{font-size:10px;color:#3a3a3a;margin-top:1px;}
#sph-root .en-ruta{background:#22c55e;color:#052a10;border-radius:20px;padding:3px 12px;font-size:11px;font-weight:800;}
#sph-root .detenido{background:#fb923c;color:#3a1800;border-radius:20px;padding:3px 12px;font-size:11px;font-weight:800;}
#sph-root .nav-bar{background:#0a0a0a;border-top:0.5px solid #1a1a1a;display:flex;padding:8px 0 20px;flex-shrink:0;position:relative;z-index:20;}
#sph-root .nav-item{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;}
#sph-root .nav-item svg{width:20px;height:20px;stroke:#2e2e2e;fill:none;stroke-width:1.8;}
#sph-root .nav-lbl{font-size:9px;font-weight:700;color:#2e2e2e;}
#sph-root .home-bar{height:26px;display:flex;align-items:center;justify-content:center;background:#000;flex-shrink:0;position:relative;z-index:20;}
#sph-root .home-line{width:110px;height:4px;background:#222;border-radius:3px;}

/* ── Light mode overrides ─────────────────────────────────────────────── */
html.light #sph-root .phone{background:#e2e2e2;box-shadow:0 0 0 1px #c0c0c0,0 0 0 3px #d8d8d8,0 0 0 5px #b8b8b8,0 40px 120px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.6);}
html.light #sph-root .phone::before{background:#c0c0c0;box-shadow:0 46px 0 #c0c0c0,0 84px 0 #c0c0c0;}
html.light #sph-root .phone::after{background:#c0c0c0;}
html.light #sph-root .sph-di{background:#1a1a1a;}
html.light #sph-root .status-bar{background:#f8f8f8;}
html.light #sph-root .sb-time{color:#111;}
html.light #sph-root .sb-icons svg rect,html.light #sph-root .sb-icons svg path,html.light #sph-root .sb-icons svg line{stroke:#111;}
html.light #sph-root .app-header{background:#f8f8f8;}
html.light #sph-root .app-title{color:#111;}
html.light #sph-root .hdr-icon svg{stroke:#999;}
html.light #sph-root .hdr-icon button svg{stroke:#999;}
html.light #sph-root .avatar-img{border-color:#ddd;}
html.light #sph-root .avatar-dot{border-color:#f8f8f8;}
html.light #sph-root .bottom-sheet{background:#fff;}
html.light #sph-root .sheet-handle{background:#e0e0e0;}
html.light #sph-root .vehicle-plate{color:#111;}
html.light #sph-root .plate-label{color:#aaa;}
html.light #sph-root .view-maps{color:#aaa;}
html.light #sph-root .tabs{border-bottom-color:#ececec;}
html.light #sph-root .sph-tab{color:#ccc;}
html.light #sph-root .irow{border-bottom-color:#f2f2f2;}
html.light #sph-root .row-l{color:#aaa;}
html.light #sph-root .row-val{color:#222;}
html.light #sph-root .row-sub{color:#ccc;}
html.light #sph-root .nav-bar{background:#f8f8f8;border-top-color:#ececec;}
html.light #sph-root .nav-item svg{stroke:#ccc;}
html.light #sph-root .nav-lbl{color:#ccc;}
html.light #sph-root .home-bar{background:#f8f8f8;}
html.light #sph-root .home-line{background:#ddd;}
`

const WORLD = 2200
const ROUTE: {x:number;y:number}[] = [
  {x:900,y:800},{x:900,y:600},{x:1100,y:600},{x:1100,y:400},
  {x:1300,y:400},{x:1300,y:600},{x:1500,y:600},{x:1500,y:800},
  {x:1300,y:800},{x:1300,y:1000},{x:1100,y:1000},{x:900,y:1000},
  {x:900,y:800},
]
const SPD_CYCLE = [0,0,18,32,42,52,58,60,55,48,40,30,20,10,0,0,22,38,50,58,62,60,52,42,30,18,0]
const DIRS = ['Norte','Noreste','Este','Sureste','Sur','Noroeste']

// Dark map palette
const D = {
  base:'#1a2035', block:'#1c2848', park:'#162820', parkText:'#1e4230',
  lake:'#111d32', avFill:'#2c3518', avLane:'#4a5e28', stLane:'#243470',
  grid:'#1c2a52', label:'#485e18', stLabel:'#2a3c62', district:'rgba(100,160,220,0.28)',
}
// Light map palette
const L = {
  base:'#e8ecf0', block:'#d8dce6', park:'#c8e6c9', parkText:'#388e3c',
  lake:'#bbdefb', avFill:'#cfd8dc', avLane:'#90a4ae', stLane:'#90caf9',
  grid:'#dde1ea', label:'#546e7a', stLabel:'#5c7a9e', district:'rgba(60,100,160,0.18)',
}

function lerp(a:number,b:number,t:number){return a+(b-a)*t}
function nowTime(){const n=new Date();return n.getHours().toString().padStart(2,'0')+':'+n.getMinutes().toString().padStart(2,'0')}

export function SimonPhoneSim() {
  const [activeTab, setActiveTab] = useState(0)
  const [clock, setClock] = useState(nowTime)
  const [statusText, setStatusText] = useState('En ruta')
  const [enRuta, setEnRuta] = useState(true)
  const [dir, setDir] = useState('Calle 63 # 24 – 10')
  const [coords, setCoords] = useState('4.65100, -74.06200')
  const [speed, setSpeed] = useState('-- km/h')
  const [today, setToday] = useState('47.3 km')
  const [total, setTotal] = useState('125.847 km')

  const [isDark, setIsDark] = useState(true)
  const mapWrapRef = useRef<HTMLDivElement>(null)
  const cvsRef     = useRef<HTMLCanvasElement>(null)
  const screenRef  = useRef<HTMLDivElement>(null)
  const sheetRef   = useRef<HTMLDivElement>(null)
  const isDarkRef  = useRef(true)

  // Detect theme changes — update both ref (for canvas loop) and state (for re-render)
  useEffect(() => {
    function update() {
      const dark = !document.documentElement.classList.contains('light')
      isDarkRef.current = dark
      setIsDark(dark)
    }
    update()
    const obs = new MutationObserver(update)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  function toggleTheme() {
    document.documentElement.classList.toggle('light')
  }

  useEffect(() => {
    const mapWrap = mapWrapRef.current!
    const cvs     = cvsRef.current!
    const screen  = screenRef.current!
    const sheet   = sheetRef.current!

    let W=0, H=0, ctx:CanvasRenderingContext2D
    let camX=0, camY=0, tCamX=0, tCamY=0
    let headerH=0, sheetH=0
    let ri=0, rt=0
    let carWX=ROUTE[0].x, carWY=ROUTE[0].y
    const trail:{wx:number;wy:number}[]=[]
    let dispSpd=0, tgtSpd=42, spdTimer=0, spdIdx=5
    let todayKm=47.3, totalKm=125.847
    let lat=4.65100, lng=-74.06200, coordTimer=0
    let panelTimer=0, dotPulse=0, dirIdx=0
    let rafId=0

    function measure(){
      const sb=screen.querySelector('.status-bar') as HTMLElement
      const ah=screen.querySelector('.app-header') as HTMLElement
      headerH=(sb?.offsetHeight??52)+(ah?.offsetHeight??57)
      const nb=screen.querySelector('.nav-bar') as HTMLElement
      const hb=screen.querySelector('.home-bar') as HTMLElement
      sheetH=(sheet?.offsetHeight??220)+(nb?.offsetHeight??72)+(hb?.offsetHeight??26)
    }

    function initCvs(){
      W=mapWrap.clientWidth; H=mapWrap.clientHeight
      const dpr=window.devicePixelRatio||1
      cvs.width=W*dpr; cvs.height=H*dpr
      cvs.style.width=W+'px'; cvs.style.height=H+'px'
      ctx=cvs.getContext('2d')!
      ctx.scale(dpr,dpr)
      measure()
    }

    function drawWorld(ox:number,oy:number){
      const p = isDarkRef.current ? D : L
      ctx.fillStyle=p.base; ctx.fillRect(0,0,W,H)
      const blocks=[[0,0,280,1100],[300,40,300,560],[300,720,300,400],[640,40,280,640],[640,760,280,560],[960,40,280,560],[960,760,280,560],[1280,40,320,640],[1280,760,320,560],[1640,40,380,1880]]
      blocks.forEach(([bx,by,bw,bh])=>{ctx.fillStyle=p.block;ctx.fillRect(bx-ox,by-oy,bw,bh)})
      ;[[20,100,200,920],[320,1120,200,640]].forEach(([px,py,pw,ph])=>{ctx.fillStyle=p.park;ctx.fillRect(px-ox,py-oy,pw,ph);ctx.fillStyle=p.parkText;ctx.font='11px sans-serif';ctx.fillText('Parque',px-ox+6,py-oy+18)})
      ctx.fillStyle=p.lake;ctx.beginPath();ctx.ellipse(1740-ox,1720-oy,140,140,0,0,Math.PI*2);ctx.fill()
      const avs=[{x1:0,y1:340,x2:WORLD,y2:340},{x1:0,y1:1560,x2:WORLD,y2:1560},{x1:300,y1:0,x2:300,y2:WORLD},{x1:1280,y1:0,x2:1280,y2:WORLD}]
      avs.forEach(a=>{const h=a.y1===a.y2;ctx.fillStyle=p.avFill;if(h)ctx.fillRect(0,a.y1-oy-8,W,16);else ctx.fillRect(a.x1-ox-8,0,16,H);ctx.fillStyle=p.avLane;if(h)ctx.fillRect(0,a.y1-oy-2.5,W,5);else ctx.fillRect(a.x1-ox-2.5,0,5,H)})
      const secs=[{x1:0,y1:640,x2:WORLD,y2:640},{x1:0,y1:960,x2:WORLD,y2:960},{x1:0,y1:1240,x2:WORLD,y2:1240},{x1:600,y1:0,x2:600,y2:WORLD},{x1:1000,y1:0,x2:1000,y2:WORLD},{x1:1640,y1:0,x2:1640,y2:WORLD}]
      secs.forEach(s=>{const h=s.y1===s.y2;ctx.fillStyle=p.stLane;if(h)ctx.fillRect(0,s.y1-oy-2,W,4);else ctx.fillRect(s.x1-ox-2,0,4,H)})
      for(let y=200;y<WORLD;y+=200){ctx.fillStyle=p.grid;ctx.fillRect(0,y-oy-1,W,2)}
      for(let x=200;x<WORLD;x+=200){ctx.fillStyle=p.grid;ctx.fillRect(x-ox-1,0,2,H)}
      ctx.font='9px sans-serif'
      ;[{x:10,y:330,t:'Av. Calle 127',c:p.label},{x:10,y:630,t:'Calle 122',c:p.stLabel},{x:10,y:950,t:'Calle 120',c:p.stLabel},{x:10,y:1550,t:'Av. Calle 116',c:p.label}].forEach(l=>{const sy=l.y-oy;if(sy>-20&&sy<H+20){ctx.fillStyle=l.c;ctx.fillText(l.t,l.x-ox,sy)}})
      ctx.font='bold 11px sans-serif'
      ;[{x:60,y:600,lines:['BENJAMÍN','HERRERA']},{x:1050,y:340,lines:['RAFAEL URIBE']},{x:80,y:1000,lines:['EL CAMPÍN']}].forEach(d=>{const sx=d.x-ox,sy=d.y-oy;ctx.fillStyle=p.district;d.lines.forEach((l,i)=>{if(sy>-30&&sy<H+30)ctx.fillText(l,sx,sy+i*13)})})
      ;[{x:340,y:1040,t:'Movistar Arena'},{x:360,y:1520,t:'Est. El Campín'}].forEach(p=>{const sx=p.x-ox,sy=p.y-oy;if(sx>-30&&sx<W+30&&sy>-30&&sy<H+30){ctx.fillStyle='#7c3aed';ctx.beginPath();ctx.arc(sx,sy,8,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 8px sans-serif';ctx.fillText('M',sx,sy);ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.fillStyle='#a78bfa';ctx.font='9px sans-serif';ctx.fillText(p.t,sx+12,sy+3)}})
    }

    function drawGPS(sx:number,sy:number){
      if(trail.length>1){for(let i=1;i<trail.length;i++){const a=(i/trail.length)*0.55;ctx.beginPath();ctx.moveTo(trail[i-1].wx-camX,trail[i-1].wy-camY);ctx.lineTo(trail[i].wx-camX,trail[i].wy-camY);ctx.strokeStyle=`rgba(34,197,94,${a*0.5})`;ctx.lineWidth=1.8;ctx.setLineDash([4,5]);ctx.stroke();ctx.setLineDash([])}}
      const g=ctx.createRadialGradient(sx,sy,2,sx,sy,28);g.addColorStop(0,'rgba(34,197,94,0.5)');g.addColorStop(1,'rgba(34,197,94,0)');ctx.beginPath();ctx.arc(sx,sy,28,0,Math.PI*2);ctx.fillStyle=g;ctx.fill()
      const pr=11+Math.sin(dotPulse)*5;ctx.beginPath();ctx.arc(sx,sy,pr,0,Math.PI*2);ctx.strokeStyle=`rgba(34,197,94,${0.4-Math.sin(dotPulse)*0.15})`;ctx.lineWidth=1.5;ctx.stroke()
      ctx.beginPath();ctx.arc(sx,sy,8,0,Math.PI*2);ctx.fillStyle='#22c55e';ctx.fill()
      ctx.beginPath();ctx.arc(sx,sy,4.5,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill()
      ctx.beginPath();ctx.arc(sx,sy,2.2,0,Math.PI*2);ctx.fillStyle='#22c55e';ctx.fill()
      if(dispSpd>0){const lx=sx+16,ly=sy-14;const isDark=isDarkRef.current;ctx.fillStyle=isDark?'rgba(0,0,0,0.85)':'rgba(255,255,255,0.92)';ctx.beginPath();ctx.roundRect(lx-5,ly-13,58,19,5);ctx.fill();ctx.fillStyle='#0ed4a3';ctx.font='bold 12px sans-serif';ctx.fillText(dispSpd+' km/h',lx,ly)}
      dotPulse+=0.065
    }

    function updateCar(){
      if(!W)return
      const cur=ROUTE[ri],nxt=ROUTE[(ri+1)%ROUTE.length]
      rt+=0.0025
      if(rt>=1){rt=0;ri=(ri+1)%ROUTE.length;todayKm=parseFloat((todayKm+.06).toFixed(2));totalKm=parseFloat((totalKm+.06).toFixed(3));dirIdx=(dirIdx+1)%DIRS.length}
      carWX=lerp(cur.x,nxt.x,rt);carWY=lerp(cur.y,nxt.y,rt)
      trail.push({wx:carWX,wy:carWY});if(trail.length>55)trail.shift()
      const visCY=((headerH)+(H-sheetH))/2
      tCamX=Math.max(0,Math.min(WORLD-W,carWX-W/2))
      tCamY=Math.max(0,Math.min(WORLD-H,carWY-visCY))
      camX=lerp(camX,tCamX,0.04);camY=lerp(camY,tCamY,0.04)
      spdTimer++;if(spdTimer>=100){spdTimer=0;spdIdx=(spdIdx+1)%SPD_CYCLE.length;tgtSpd=SPD_CYCLE[spdIdx]}
      if(dispSpd<tgtSpd)dispSpd=Math.min(dispSpd+1,tgtSpd);else if(dispSpd>tgtSpd)dispSpd=Math.max(dispSpd-1,tgtSpd)
      coordTimer++;if(coordTimer>=120){coordTimer=0;lat=parseFloat((4.651+(carWY/WORLD-0.5)*-0.08).toFixed(5));lng=parseFloat((-74.062+(carWX/WORLD-0.5)*0.10).toFixed(5))}
      panelTimer++;if(panelTimer>=90||panelTimer===1){panelTimer=0;const mv=dispSpd>0;setSpeed(mv?dispSpd+' km/h':'-- km/h');setCoords(lat.toFixed(5)+', '+lng.toFixed(5));setToday(todayKm.toFixed(1)+' km');setTotal(totalKm.toFixed(3)+' km');setDir('Calle 63 hacia el '+DIRS[dirIdx]);setStatusText(mv?'En ruta':'Detenido');setEnRuta(mv)}
    }

    function tick(){
      updateCar()
      drawWorld(camX,camY)
      drawGPS(carWX-camX,carWY-camY)
      rafId=requestAnimationFrame(tick)
    }

    const t0=setTimeout(()=>{
      initCvs()
      camX=ROUTE[0].x-W/2;camY=ROUTE[0].y-H/2;tCamX=camX;tCamY=camY
      tick()
    },120)

    const clkInterval=setInterval(()=>setClock(nowTime()),10000)

    return ()=>{clearTimeout(t0);cancelAnimationFrame(rafId);clearInterval(clkInterval)}
  },[])

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:STYLES}}/>
      <div id="sph-root">
        <div className="phone">
          <div className="sph-di"><div className="sph-di-cam"/><div className="sph-di-dot"/></div>
          <div className="screen" ref={screenRef}>

            <div className="map-full" ref={mapWrapRef}>
              <canvas ref={cvsRef}/>
            </div>

            <div className="status-bar">
              <span className="sb-time">{clock}</span>
              <div className="sb-icons">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M1.42 9a16 16 0 0 1 21.16 0M5 12.55a11 11 0 0 1 14.08 0M10.54 16.1a6 6 0 0 1 2.92 0M12 20h.01"/></svg>
                <svg width="22" height="13" viewBox="0 0 26 13"><rect x="0" y="1" width="22" height="11" rx="2" fill="none" stroke="#fff" strokeWidth="1.5"/><path d="M23 5v3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><rect x="1.5" y="2.5" width="15" height="8" rx="1" fill="#fff"/></svg>
              </div>
            </div>

            <div className="app-header">
              <span className="app-title">Mapa</span>
              <div className="hdr-right">
                <button className="hdr-icon" onClick={toggleTheme} style={{background:'none',border:'none',cursor:'pointer',padding:0}} aria-label="Cambiar tema">
                  {isDark
                    ? <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>
                    : <svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  }
                </button>
                <div className="hdr-icon"><svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
                <div className="avatar-w">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <div className="avatar-img"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt=""/></div>
                  <div className="avatar-dot"/>
                </div>
              </div>
            </div>

            <div className="map-spacer"/>

            <div className="bottom-sheet" ref={sheetRef}>
              <div className="sheet-handle"/>
              <div className="sheet-head">
                <div>
                  <div className="vehicle-plate">DEF 123</div>
                  <div className="plate-meta">
                    <span className="plate-time">Hace 01 min</span>
                    <span className="plate-label">· Última actualización</span>
                  </div>
                </div>
                <button className="view-maps">
                  <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  Ver mapas
                </button>
              </div>
              <div className="tabs">
                {['Información','Comandos'].map((t,i)=>(
                  <div key={t} className={`sph-tab${activeTab===i?' active':''}`} onClick={()=>setActiveTab(i)}>{t}</div>
                ))}
              </div>
              <div className="info-rows">
                <div className="irow">
                  <div className="row-l"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>Estado</div>
                  <div className={enRuta?'en-ruta':'detenido'}>{statusText}</div>
                </div>
                <div className="irow">
                  <div className="row-l"><svg viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>Dirección</div>
                  <div className="row-val">{dir}</div>
                </div>
                <div className="irow">
                  <div className="row-l"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Ubicación</div>
                  <div className="row-r">
                    <div className="row-val">Bogotá, Cundinamarca</div>
                    <div className="row-sub">{coords}</div>
                  </div>
                </div>
                <div className="irow">
                  <div className="row-l"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10"/><polyline points="12 6 12 12 16 14"/></svg>Velocidad</div>
                  <div className="row-val">{speed}</div>
                </div>
                <div className="irow">
                  <div className="row-l"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>Distancia recorrida</div>
                  <div className="row-r">
                    <div className="row-val">{today}</div>
                    <div className="row-sub">{total}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-bar">
              <div className="nav-item" style={{color:'#22c55e'}}>
                <svg viewBox="0 0 24 24" stroke="#22c55e"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="nav-lbl" style={{color:'#22c55e'}}>Mapa</span>
              </div>
              <div className="nav-item"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg><span className="nav-lbl">Guantera</span></div>
              <div className="nav-item"><svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg><span className="nav-lbl">Reportes</span></div>
              <div className="nav-item"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg><span className="nav-lbl">Ajustes</span></div>
            </div>
            <div className="home-bar"><div className="home-line"/></div>

          </div>
        </div>
      </div>
    </>
  )
}
