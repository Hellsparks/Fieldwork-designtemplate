// Keep render failures visible instead of leaving an empty preview.
class ReferenceErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, attempt: 0 };
  }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) {
    console.error('Fieldwork ' + (this.props.viewer ? 'viewer' : 'reference') + ' failed:', error, info.componentStack);
  }
  render() {
    if (!this.state.error) return <React.Fragment key={this.state.attempt}>{this.props.children}</React.Fragment>;
    const viewer = this.props.viewer;
    return <section role="alert" aria-labelledby={viewer ? 'viewer-failure-title' : 'reference-failure-title'} style={{
      background: 'var(--fw-background, #191C17)', color: 'var(--fw-text, #F5F3EC)',
      border: '1px solid var(--fw-border, #64675C)', padding: '32px',
      margin: viewer ? '0' : '24px', fontFamily: 'Arial, Helvetica, sans-serif',
      lineHeight: 1.6, maxWidth: '100%', boxSizing: 'border-box'
    }}>
      <p style={{fontFamily: 'monospace'}}>FIELDWORK / RUNTIME ERROR</p>
      <h1 id={viewer ? 'viewer-failure-title' : 'reference-failure-title'} style={{fontSize: '24px'}}>{viewer ? 'The model viewer could not render.' : 'The reference could not render.'}</h1>
      <p>{viewer ? 'The rest of the reference is still available. Retry to reset the viewer.' : 'A runtime error interrupted the page. The error below can help identify the failure.'}</p>
      <pre style={{whiteSpace: 'pre-wrap', overflowWrap: 'anywhere'}}>{String(this.state.error?.message || this.state.error)}</pre>
      <button type="button" onClick={() => this.setState(state => ({error: null, attempt: state.attempt + 1}))} style={{padding: '12px 20px', cursor: 'pointer', font: 'inherit'}}>Retry {viewer ? 'viewer' : 'reference'}</button>
    </section>;
  }
}

const sections = [['themes','Themes & modes'],['overview','Introduction'],['color','Color'],['typography','Typography'],['layout','Layout & spacing'],['controls','Interactive controls'],['motion','Motion & navigation'],['files','3D model viewer'],['window','Application window'],['phone','Phone application'],['components','Components'],['patterns','Product patterns'],['guidelines','Usage guidelines']];
const indexChildren = {
  motion: [['motion-example-1','Sidebar'],['motion-example-2','Dropdown menus'],['motion-example-3','Disclosures'],['motion-example-4','Tabs'],['motion-example-5','Dialogs'],['motion-example-6','Popups & notifications']],
  files: [['model-inspector','Mesh inspector'],['spatial-files','Spatial folders']],
  window: [['window-frame','Window frame'],['window-menu','Application menus']],
  phone: [['phone-demo','Interactive app'],['phone-patterns','Mobile patterns']]
};
const indexDestinations = sections.flatMap(item => [item, ...(indexChildren[item[0]] || [])]);

function SystemIndex({active, navigate}) {
  const [expanded, setExpanded] = React.useState({});
  React.useEffect(() => {
    const parent = sections.find(([id]) => indexChildren[id]?.some(([child]) => child === active));
    if (parent) setExpanded(old => old[parent[0]] ? old : {...old, [parent[0]]:true});
  }, [active]);
  return <nav aria-label="Design system">{sections.map(([id,label]) => {
    const children = indexChildren[id];
    const open = !!expanded[id];
    const selected = active === id || children?.some(([child]) => child === active);
    return <div className="fw-index-group" key={id}>
      <div className="fw-index-row"><a href={'#'+id} onClick={event=>navigate(event,id)} aria-current={active===id?'location':undefined} data-parent-active={selected}><span className="nav-dot"/>{label}</a>
        {children && <button type="button" className="fw-index-toggle" aria-label={(open?'Collapse ':'Expand ')+label+' subpoints'} aria-expanded={open} aria-controls={'index-'+id} onClick={()=>setExpanded(old=>({...old,[id]:!old[id]}))}><span className="fw-chevron" aria-hidden="true">›</span></button>}
      </div>
      {children && <div id={'index-'+id} className="fw-index-children" hidden={!open}>{children.map(([child,title])=><a key={child} href={'#'+child} onClick={event=>navigate(event,child)} aria-current={active===child?'location':undefined}>{title}</a>)}</div>}
    </div>;
  })}</nav>;
}

const referenceRepairs = `
.rail nav a:not([aria-current]):not(:hover){background:transparent}.rail{max-height:calc(100dvh - 80px);overflow-y:auto}.fw-index-row{display:flex;align-items:center}.rail .fw-index-row>a{flex:1;min-width:0}.fw-index-toggle{flex-shrink:0;width:32px;min-height:44px;border:0;background:transparent;color:var(--fw-muted);cursor:pointer}.rail .fw-index-children{margin-left:18px;border-left:1px solid var(--fw-border);padding-left:8px}.rail .fw-index-children a{font-size:11px;min-height:36px;padding:8px}.rail a[aria-current=location]{color:var(--fw-text);background:var(--fw-surface)}.rail .fw-index-row a[data-parent-active=true] .nav-dot{background:var(--fw-control-active)}.fw-index-toggle:focus-visible{outline:2px solid var(--fw-focus);outline-offset:-2px}@media(max-width:900px){.rail{max-height:none}.fw-index-group{flex-shrink:0}}
.motion-disclosure{min-width:0;max-width:100%;white-space:normal;overflow-wrap:anywhere}
.motion-disclosure>span{min-width:0}
.form-stack input#notifications{width:24px;height:24px;flex-shrink:0}
.fw-file-location-title{font:12px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;color:var(--fw-muted);margin:0 0 16px}
.fw-browser-search{position:relative}
.fw-search-label{display:block;font:10px/1.5 ui-monospace,Consolas,monospace;color:var(--fw-muted);margin-bottom:4px}
`;

const palette = [['Paper','background','#F5F3EC'],['Linen','surface','#ECEAE2'],['Chalk','raised','#FFFDF7'],['Ink','text','#252820'],['Ash','muted','#64675C'],['Signal','accent','#DA4B27']];
const records = [{name:'Production deploy',id:'RUN-1042',status:'Passed',time:'24s'},{name:'API integration tests',id:'RUN-1041',status:'Failed',time:'1m 12s'},{name:'Preview build',id:'RUN-1040',status:'Passed',time:'38s'}];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "themeScheme": "fieldwork",
  "darkMode": true,
  "motionDuration": 240
}/*EDITMODE-END*/;
const TWEAK_SCHEMA = /*TWEAK-SCHEMA-BEGIN*/{
  "themeScheme": {"kind":"enum","options":["fieldwork","vector","foundry","olive"]},
  "darkMode": {"kind":"boolean"},
  "motionDuration": {"kind":"number","min":120,"max":400,"step":20,"unit":"ms"}
}/*TWEAK-SCHEMA-END*/;
// Original palettes, not extracted brand specifications. Ordering matches themeRoles.
const themeRoles = ['background','surface','raised','text','muted','border','accent','accent-hover','on-accent','button-hover','focus'];
const themeSchemes = {
  fieldwork: {name:'Fieldwork',tag:'01 / Signal orange',note:'The original warm, utilitarian foundation. Blacksmith-adjacent in spirit; not a verified brand match.',light:['#F5F3EC','#ECEAE2','#FFFDF7','#252820','#64675C','#D2D3C7','#DA4B27','#BF3D1C','#FFFFFF','#A93216','#345F87'],dark:['#191B18','#232620','#2C3028','#F0F0E5','#AFB4A6','#484D42','#F57951','#F57951','#1C2119','#FF9574','#9CC7F0']},
  vector: {name:'Vector',tag:'02 / Acid signal',note:'Marathon-inspired sci-fi energy: sharp acid accents and cool graphite. Original colors; no game assets or official brand claims.',light:['#F1F3E9','#E5E9DA','#FAFCF3','#192119','#59634E','#C8CFBC','#C4E830','#455900','#FFFFFF','#344400','#4F398A'],dark:['#101510','#1B231A','#242E22','#EDF4DB','#AFBE9B','#43503C','#D5FA39','#D5FA39','#192000','#E6FF82','#C1A7FF']},
  foundry: {name:'Foundry',tag:'03 / Monochrome',note:'Greyscale industrial. Tonal contrast, exposed structure, and no decorative signal color.',light:['#F1F1F1','#E5E5E5','#FFFFFF','#202020','#606060','#CCCCCC','#595959','#3D3D3D','#FFFFFF','#242424','#454545'],dark:['#151515','#212121','#2B2B2B','#EEEEEE','#AFAFAF','#4A4A4A','#D5D5D5','#D5D5D5','#171717','#FFFFFF','#DDDDDD']},
  olive: {name:'Olive',tag:'04 / Field equipment',note:'Military-equipment inspired: canvas, olive drab, and amber identification marks. Keep operational statuses explicit.',light:['#F0EDDF','#E5E0CD','#FAF7EA','#282C20','#62664F','#CBCBB7','#8A7438','#5D622D','#FFFFFF','#44491D','#385D7A'],dark:['#1B2017','#262E20','#303A28','#EEEEDD','#B5B99F','#505B43','#C2C78D','#C2C78D','#202717','#DDE2A8','#A5C5DF']}
};
function themeValues(scheme,mode) {
  const values=Object.fromEntries(themeRoles.map((role,i)=>[role,themeSchemes[scheme][mode][i]]));
  return {...values,inverse:values.text,'on-inverse':values.background,...(mode==='dark'?{success:'#A8D6B1',warning:'#EAD08E',danger:'#FFB4A4',info:'#A9CDED','success-bg':'#263C2C','warning-bg':'#3E3521','danger-bg':'#432C27','info-bg':'#283745',scrim:'#00000099','shadow-overlay':'0 4px 16px #00000055'}:{success:'#386348',warning:'#795A12',danger:'#B02E25',info:'#345F87','success-bg':'#E3EBDD','warning-bg':'#F1E9CF','danger-bg':'#F5E2DB','info-bg':'#E1E8EF',scrim:'#25282066','shadow-overlay':'0 4px 16px #2528201A'})};
}
const themeEnhancements = `
.btn{color:var(--fw-on-accent)}.btn:hover{background:var(--fw-button-hover)}.btn.secondary:hover{background:var(--fw-surface)}.btn.secondary{color:var(--fw-text)}.btn:disabled{background:var(--fw-surface);color:var(--fw-muted)}
.badge{background:var(--fw-success-bg)}.badge.failed{background:var(--fw-danger-bg)}.badge.warning{background:var(--fw-warning-bg)}.badge.info{background:var(--fw-info-bg)}
.theme-lab{padding:0 0 32px;margin-bottom:32px;border-bottom:1px solid var(--fw-border)}.theme-heading{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-bottom:20px}.theme-heading h2{font-size:24px;margin-top:6px}.theme-mode{display:flex;gap:4px;padding:3px;background:var(--fw-surface);border:1px solid var(--fw-border)}.theme-mode button{min-height:44px;padding:0 14px;border:1px solid transparent;background:transparent;color:var(--fw-muted);font:12px var(--fw-mono)}.theme-mode button[aria-pressed=true]{background:var(--fw-raised);border-color:var(--fw-muted);color:var(--fw-text)}.theme-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.theme-card{text-align:left;padding:0;background:var(--fw-raised);border:1px solid var(--fw-border);color:var(--fw-text);min-width:0}.theme-card[aria-pressed=true]{outline:2px solid var(--fw-text);outline-offset:2px}.theme-preview{height:58px;display:flex;gap:4px;align-items:center;padding:12px;border-bottom:1px solid var(--fw-border)}.theme-preview i{display:block;height:22px;flex:1}.theme-card strong{display:flex;justify-content:space-between;font-size:14px;font-weight:500;padding:12px 12px 4px}.theme-card small{display:block;font:10px/1.5 var(--fw-mono);padding:0 12px 12px;color:var(--fw-muted)}.theme-description{font-size:12px;color:var(--fw-muted);margin-top:16px;max-width:85ch}.theme-status{font:11px var(--fw-mono);margin-top:12px;color:var(--fw-text)}
@media(max-width:640px){.theme-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.theme-heading{align-items:flex-start;flex-direction:column}.theme-heading h2{font-size:22px}}
`;
function ThemeSelector({scheme,mode,onScheme,onMode}) {
  return <section className="theme-lab" id="themes" aria-labelledby="theme-title">
    <div className="theme-heading"><div><div className="eyebrow muted">Appearance / four schemes × two modes</div><h2 id="theme-title">Same system. Different terrain.</h2></div><div className="theme-mode" role="group" aria-label="Color mode">{['light','dark'].map(m=><button key={m} id={'mode-'+m} aria-pressed={mode===m} onClick={()=>onMode(m)}>{m==='light'?'Light':'Dark'}</button>)}</div></div>
    <div className="theme-grid" role="group" aria-label="Theme scheme">{Object.entries(themeSchemes).map(([key,t])=><button id={'theme-'+key} key={key} className="theme-card" aria-pressed={scheme===key} onClick={()=>onScheme(key)}><span className="theme-preview" aria-hidden="true" style={{background:t[mode][0]}}>{[1,2,3,6].map(i=><i key={i} style={{background:t[mode][i]}}/>)}</span><strong>{t.name}<span aria-hidden="true">{scheme===key?'↗':'+'}</span></strong><small>{t.tag}</small></button>)}</div>
    <p className="theme-description">{themeSchemes[scheme].note}</p><p className="theme-status" id="theme-status" role="status">{themeSchemes[scheme].name} / {mode} — applied to all components. Preferences are local and reset on reload.</p>
  </section>;
}

const styles = `
:root{--fw-background:#F5F3EC;--fw-surface:#ECEAE2;--fw-raised:#FFFDF7;--fw-text:#252820;--fw-muted:#64675C;--fw-border:#D2D3C7;--fw-accent:#DA4B27;--fw-accent-hover:#BF3D1C;--fw-on-accent:#FFFFFF;--fw-inverse:#252820;--fw-on-inverse:#F5F3EC;--fw-success:#386348;--fw-warning:#795A12;--fw-danger:#B02E25;--fw-info:#345F87;--fw-focus:#345F87;--fw-sans:Arial,Helvetica,sans-serif;--fw-mono:ui-monospace,SFMono-Regular,Consolas,monospace;--fw-type-display:64px;--fw-type-heading:32px;--fw-type-subheading:24px;--fw-type-body:16px;--fw-type-ui:14px;--fw-type-label:12px;--fw-line-display:1.02;--fw-line-heading:1.15;--fw-line-body:1.6;--fw-tracking-display:-0.045em;--fw-tracking-heading:-0.025em;--fw-tracking-label:0.06em;--fw-space-1:4px;--fw-space-2:8px;--fw-space-3:12px;--fw-space-4:16px;--fw-space-6:24px;--fw-space-8:32px;--fw-space-12:48px;--fw-space-16:64px;--fw-space-24:96px;--fw-radius-control:2px;--fw-radius-panel:0px;--fw-radius-pill:999px;--fw-control-height:44px;--fw-duration-fast:120ms;--fw-duration-normal:180ms;--fw-shadow-overlay:0 4px 16px #2528201A;--fw-scrim:#25282066}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:32px}body{margin:0;background:var(--fw-background);color:var(--fw-text);font:16px/1.6 var(--fw-sans)}a{color:inherit;text-decoration:none}button,input,select{font:inherit}button,a,input,select{touch-action:manipulation}button{cursor:pointer}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:2px solid var(--fw-focus);outline-offset:3px}h1,h2,h3,p{margin:0}h1{font-size:var(--fw-type-display);font-weight:500;line-height:var(--fw-line-display);letter-spacing:var(--fw-tracking-display)}h2{font-size:var(--fw-type-heading);font-weight:500;line-height:var(--fw-line-heading);letter-spacing:var(--fw-tracking-heading)}h3{font-size:20px;line-height:1.3;font-weight:500}p{max-width:65ch}.mono,.eyebrow{font:12px/1.5 var(--fw-mono)}.eyebrow{text-transform:uppercase;letter-spacing:.06em}.muted{color:var(--fw-muted)}.skip{position:fixed;top:-80px;left:16px;background:var(--fw-inverse);color:var(--fw-on-inverse);padding:12px;z-index:5}.skip:focus{top:12px}.topbar{height:80px;border-bottom:1px solid var(--fw-border);display:flex;align-items:center;justify-content:space-between;padding:0 32px}.brand{display:flex;align-items:center;gap:12px;font-size:23px;font-weight:600;letter-spacing:-.7px}.brand-mark{width:27px;height:27px;background:var(--fw-text);display:grid;grid-template-columns:repeat(3,1fr);gap:3px;padding:5px;transform:rotate(-8deg)}.brand-mark i{background:var(--fw-background)}.top-meta{display:flex;gap:24px;align-items:center}.version{border:1px solid var(--fw-border);padding:4px 8px}.shell{display:grid;grid-template-columns:224px minmax(0,1fr);max-width:1600px;margin:auto}.rail{border-right:1px solid var(--fw-border);padding:40px 24px;align-self:start;position:sticky;top:0;height:calc(100vh - 20px);display:flex;flex-direction:column}.rail-label{margin:0 0 16px 12px;color:var(--fw-muted)}.rail nav{display:grid;gap:4px}.rail nav a{min-height:44px;padding:10px 12px;font-size:14px;display:flex;align-items:center;gap:10px}.rail nav a:hover{background:var(--fw-surface)}.rail nav a[aria-current]{background:var(--fw-surface)}.nav-dot{height:5px;width:5px;background:var(--fw-accent);opacity:0}.rail nav a[aria-current] .nav-dot{opacity:1}.rail-bottom{margin-top:auto;padding:24px 12px 0;border-top:1px solid var(--fw-border)}.rail-bottom p{font-size:12px;line-height:1.6;margin-top:8px}.main{padding:46px 48px 0;min-width:0}.intro-meta{display:flex;justify-content:space-between;margin-bottom:32px}.live{display:flex;gap:7px;align-items:center}.live:before{content:'';width:6px;height:6px;background:var(--fw-success)}.intro-title{display:flex;justify-content:space-between;gap:24px}.intro-title p{margin-top:24px;font-size:17px;color:var(--fw-muted);max-width:490px}.index-stamp{align-self:flex-end;white-space:nowrap;border-top:1px solid var(--fw-text);padding-top:8px}.hero-specimen{margin-top:40px;display:grid;grid-template-columns:1.2fr 1fr;min-height:260px;border:1px solid var(--fw-border)}.specimen-copy{padding:28px;display:flex;flex-direction:column;justify-content:space-between;background:var(--fw-surface)}.specimen-copy h2{font-size:36px;max-width:320px;line-height:1.08;letter-spacing:-.035em;margin:26px 0}.specimen-foot{display:flex;justify-content:space-between;border-top:1px solid var(--fw-border);padding-top:14px}.diagram{background:var(--fw-accent);position:relative;overflow:hidden;display:grid;place-items:center;min-height:250px}.diagram svg{width:190px;height:190px}.diagram .corner{position:absolute;font:10px var(--fw-mono);color:var(--fw-text);background:var(--fw-background);padding:3px 5px}.corner.tl{top:16px;left:16px}.corner.br{bottom:16px;right:16px}.principles{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding:24px 0 0}.principles h3{font:12px var(--fw-mono);margin-bottom:8px}.principles p{font-size:13px;color:var(--fw-muted);line-height:1.6}section{scroll-margin-top:32px}.section{padding:56px 0;border-bottom:1px solid var(--fw-border)}.section-heading{display:flex;justify-content:space-between;align-items:flex-start;gap:24px;margin-bottom:28px}.section-heading .eyebrow{color:var(--fw-muted);margin-bottom:10px}.section-heading>p{max-width:310px;font-size:14px;color:var(--fw-muted);padding-top:25px}.swatches{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));border:1px solid var(--fw-border)}.swatch{min-width:0}.swatch+.swatch{border-left:1px solid var(--fw-border)}.swatch-color{height:92px}.swatch-info{padding:12px;font-size:13px}.swatch-info code{display:block;color:var(--fw-muted);font:11px var(--fw-mono);margin-top:5px}.section-note{margin-top:16px;font-size:12px;color:var(--fw-muted)}.type-row{display:grid;grid-template-columns:170px 1fr;gap:20px;border-top:1px solid var(--fw-border);padding:24px 0;align-items:center}.type-label{font:12px/1.7 var(--fw-mono);color:var(--fw-muted)}.type-display{font-size:56px;letter-spacing:-.045em;line-height:1.1}.type-heading{font-size:32px;letter-spacing:-.025em;line-height:1.2}.type-mono{font:12px var(--fw-mono);letter-spacing:.06em}.split{display:grid;grid-template-columns:1fr 1fr;gap:24px}.panel{border:1px solid var(--fw-border);padding:24px;background:var(--fw-raised)}.panel h3{margin-bottom:10px}.panel p{font-size:14px;color:var(--fw-muted)}.btn{display:inline-flex;align-items:center;justify-content:center;gap:16px;min-height:44px;padding:0 16px;border:1px solid transparent;border-radius:2px;background:var(--fw-accent-hover);color:white;font:600 14px var(--fw-mono);transition:background 120ms}.btn:hover{background:#A93216}.btn:active{transform:translateY(1px)}.btn.secondary{background:transparent;border-color:var(--fw-muted);color:var(--fw-text)}.btn.secondary:hover{background:var(--fw-surface)}.btn:disabled{background:var(--fw-surface);color:var(--fw-muted);border-color:var(--fw-border);cursor:not-allowed;transform:none}.btn-row{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0 12px}.small-label{display:block;font:12px var(--fw-mono);margin-bottom:8px}.field{width:100%;min-height:44px;background:var(--fw-raised);color:var(--fw-text);border:1px solid var(--fw-muted);border-radius:2px;padding:10px 12px;font-size:16px}.field[aria-invalid=true]{border-color:var(--fw-danger)}.error{font-size:13px;color:var(--fw-danger);margin-top:8px}.success{font-size:13px;color:var(--fw-success);margin-top:8px}.form-stack{display:grid;gap:20px;margin-top:24px}.check-line{display:flex;align-items:center;gap:10px;font-size:14px;min-height:44px}.check-line input{accent-color:var(--fw-success);width:18px;height:18px}.badge{font:12px var(--fw-mono);padding:5px 8px;color:var(--fw-success);background:#E3EBDD;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}.badge.failed{color:var(--fw-danger);background:#F5E2DB}.badge.warning{color:var(--fw-warning);background:#F1E9CF}.badge.info{color:var(--fw-info);background:#E1E8EF}.spacing-list{display:flex;flex-direction:column;gap:12px;margin-top:24px}.spacing-item{display:grid;grid-template-columns:44px 1fr 40px;align-items:center;gap:16px;font:12px var(--fw-mono)}.spacing-bar{background:var(--fw-text);height:12px;max-width:100%}.layout-sketch{display:grid;grid-template-columns:35px 1fr;gap:8px;height:150px;margin:24px 0;background:var(--fw-surface);padding:12px;border:1px solid var(--fw-border)}.layout-sketch>div{border:1px solid var(--fw-muted)}.layout-sketch .sketch-content{padding:12px;display:grid;gap:8px}.sketch-content div{background:var(--fw-border)}.demo-head{display:flex;align-items:center;justify-content:space-between;gap:16px}.toolbar{display:flex;gap:16px;justify-content:space-between;align-items:flex-end;margin:24px 0}.search-wrap{width:280px;max-width:100%}.filters{display:flex;gap:4px}.filter{min-height:44px;border:1px solid transparent;padding:8px 14px;background:transparent;color:var(--fw-muted);font:12px var(--fw-mono)}.filter[aria-pressed=true]{border-color:var(--fw-text);color:var(--fw-text);background:var(--fw-surface)}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;text-align:left;white-space:nowrap}th{font:12px var(--fw-mono);color:var(--fw-muted);padding:12px 16px;border-block:1px solid var(--fw-border);background:var(--fw-surface)}td{font-size:14px;padding:16px;border-bottom:1px solid var(--fw-border)}td:last-child,th:last-child{text-align:right}.row-id{display:block;font:11px var(--fw-mono);color:var(--fw-muted);margin-top:4px}.empty{padding:40px;text-align:center}.empty .btn{margin-top:16px}.guides{display:grid;grid-template-columns:1fr 1fr;gap:32px}.guides ul{padding-left:18px;font-size:14px;line-height:1.8;margin-bottom:0}.guides h3{font:12px var(--fw-mono)}details{border-top:1px solid var(--fw-border);padding:16px 0}summary{cursor:pointer;font-size:14px;min-height:44px;display:list-item;align-content:center}details p{font-size:14px;color:var(--fw-muted);margin:8px 0 16px}.footer{padding:32px 0;display:flex;gap:20px;justify-content:space-between;color:var(--fw-muted);font:11px var(--fw-mono)}.token-code{display:block;overflow:auto;white-space:pre;background:var(--fw-surface);border:1px solid var(--fw-border);padding:20px;font:12px/1.8 var(--fw-mono);margin-top:20px}
@media(min-width:1600px){.main{padding-inline:64px}}@media(max-width:1024px){.shell{grid-template-columns:180px minmax(0,1fr)}.rail{padding:32px 12px}.main{padding:32px 24px 0}h1{font-size:52px}.index-stamp{display:none}.section-heading>p{max-width:240px}.swatches{grid-template-columns:repeat(3,1fr)}.swatch:nth-child(4){border-left:0}.swatch:nth-child(n+4){border-top:1px solid var(--fw-border)}.split{grid-template-columns:1fr}.type-row{grid-template-columns:120px 1fr}.type-display{font-size:44px}.toolbar{align-items:flex-start;flex-direction:column}}
@media(max-width:640px){:root{--fw-type-display:40px;--fw-type-heading:28px;--fw-line-display:1.05}.topbar{padding:0 20px;height:68px}.top-meta .eyebrow{display:none}.shell{display:block}.rail{position:static;height:auto;padding:16px 20px;border-right:0;border-bottom:1px solid var(--fw-border)}.rail-label,.rail-bottom{display:none}.rail nav{display:flex;overflow-x:auto;gap:4px;padding-bottom:4px}.rail nav a{white-space:nowrap;padding:8px}.main{padding:28px 20px 0}.intro-meta{font-size:10px;margin-bottom:24px}.intro-title p{font-size:16px}h1{font-size:40px;line-height:1.05}h2{font-size:28px}.hero-specimen{grid-template-columns:1fr}.diagram{min-height:220px}.specimen-copy h2{font-size:32px}.principles{grid-template-columns:1fr;gap:20px}.section{padding:40px 0}.section-heading{display:block}.section-heading>p{max-width:none;padding-top:14px}.swatch-color{height:72px}.swatch-info{padding:10px 8px}.type-row{grid-template-columns:1fr;gap:12px}.type-display{font-size:40px}.guides{grid-template-columns:1fr}.panel{padding:20px}.demo-head{align-items:flex-start;flex-direction:column}.footer{flex-direction:column}.intro-meta .live{font-size:10px}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important}}
`;
function SectionHeading({number,title,description}) { return <div className="section-heading"><div><div className="eyebrow">/ {number} — Foundations</div><h2>{title}</h2></div><p>{description}</p></div>; }
function Mark(){return <span className="brand-mark" aria-hidden="true">{Array.from({length:9},(_,i)=><i key={i}/>)}</span>}
function LayoutSection() {
  return <section className="section" id="layout">
    <SectionHeading number="03" title="Structure, not clutter." description="A 4px foundation. Spacious between ideas, compact where the work happens." />
    <div className="split">
      <div className="panel"><div className="eyebrow muted">Spacing scale / px</div><div className="spacing-list">
        {[4,8,12,16,24,32,48,64,96].map(n=><div className="spacing-item" key={n}><span>{String(n).padStart(2,'0')}</span><div className="spacing-bar" style={{width:n*2}}/><span>{n/4}×</span></div>)}
      </div></div>
      <div className="panel"><div className="eyebrow muted">Responsive framework</div><div className="layout-sketch" aria-hidden="true"><div/><div className="sketch-content"><div/><div/><div/></div></div><h3>A stable frame. Flexible content.</h3><p>224px navigation rail. 48px content gutter. On small screens, a single column and 20px gutters keep every action within reach.</p><p className="section-note mono">CONTROL 2px / PANEL 0px / BORDER 1px</p></div>
    </div>
  </section>;
}
function ComponentsSection() {
  const [project,setProject]=React.useState('My workspace');
  const [region,setRegion]=React.useState('us-east');
  const [notifications,setNotifications]=React.useState(true);
  const [saved,setSaved]=React.useState(null);
  const [error,setError]=React.useState('');
  const [count,setCount]=React.useState(0);
  function save(event) {
    event.preventDefault();
    if(project.trim().length<3){setError('Enter a workspace name with at least 3 characters.');document.getElementById('workspace-name').focus();return;}
    setError('');setSaved({project:project.trim(),region,notifications});
  }
  const dirty=saved && (saved.project!==project.trim() || saved.region!==region || saved.notifications!==notifications);
  return <section className="section" id="components">
    <SectionHeading number="04" title="Small parts. One language." description="Consistent controls with clear states. Try the examples: these are working, local interactions."/>
    <div className="split">
      <div className="panel"><div className="eyebrow muted">01 / Actions</div><div className="btn-row"><button id="counter-button" className="btn" onClick={()=>setCount(n=>n+1)}>Run action <span aria-hidden="true">↗</span></button><button id="counter-reset" className="btn secondary" onClick={()=>setCount(0)}>Reset</button></div><p id="counter-status" role="status">{count===0?'No actions run. Try the primary button.':`${count} local action${count===1?'':'s'} completed.`}</p><div className="btn-row"><button className="btn" disabled aria-describedby="disabled-reason">Deploy</button></div><p id="disabled-reason">Disabled example: connect a repository to deploy.</p><div style={{borderTop:'1px solid var(--fw-border)',marginTop:24,paddingTop:24}}><div className="eyebrow muted">02 / Status</div><div className="btn-row"><span className="badge">✓ Passed</span><span className="badge failed">× Failed</span><span className="badge warning">! Pending</span><span className="badge info">i Information</span></div><p>Always pair color with a readable status. Reserve orange for emphasis, not outcomes.</p></div></div>
      <div className="panel"><div className="eyebrow muted">03 / Settings form</div><form className="form-stack" onSubmit={save} noValidate>
        <div><label htmlFor="workspace-name" className="small-label">Workspace name</label><input id="workspace-name" className="field" value={project} onChange={e=>{setProject(e.target.value);setError('');}} aria-invalid={!!error} aria-describedby={error?'workspace-error':'workspace-help'}/>{error?<div className="error" id="workspace-error" role="alert">{error}</div>:<div id="workspace-help" className="section-note" style={{marginTop:8}}>Use a descriptive name, at least 3 characters.</div>}</div>
        <div><label htmlFor="region" className="small-label">Default region</label><select id="region" className="field" value={region} onChange={e=>setRegion(e.target.value)}><option value="us-east">US East</option><option value="eu-west">EU West</option><option value="ap-south">Asia Pacific</option></select></div>
        <label className="check-line"><input id="notifications" type="checkbox" checked={notifications} onChange={e=>setNotifications(e.target.checked)}/> Send build notifications</label>
        <div><button className="btn" type="submit" id="save-settings">Save preferences <span aria-hidden="true">→</span></button><p className="section-note">Demo only · preferences reset on reload.</p></div>
        {saved && <div id="saved-settings" role="status" className="success" style={{borderTop:'1px solid var(--fw-border)',paddingTop:16}}>{dirty?'Unsaved changes. Last saved: ': '✓ Saved locally: '}{saved.project} · {saved.region} · notifications {saved.notifications?'on':'off'}.</div>}
      </form></div>
    </div>
    <p className="section-note mono">STATES / Default → hover → focus → active · Invalid → corrected → saved</p>
  </section>;
}
function PatternsSection() {
  const [query,setQuery]=React.useState('');
  const [filter,setFilter]=React.useState('All');
  const visible=records.filter(r=>(filter==='All'||r.status===filter)&&r.name.toLowerCase().includes(query.toLowerCase().trim()));
  function reset(){setQuery('');setFilter('All');document.getElementById('record-search').focus();}
  return <section className="section" id="patterns">
    <SectionHeading number="05" title="From parts to product." description="A reusable data-view pattern: clear title, scoped search, explicit filters, and a recoverable empty state."/>
    <div className="panel"><div className="demo-head"><div><div className="eyebrow muted" style={{marginBottom:8}}>Pattern / Data view</div><h3>Recent runs</h3></div><span className="mono muted">SAMPLE DATA · IN-MEMORY</span></div><div className="toolbar"><div className="search-wrap"><label className="small-label" htmlFor="record-search">Search runs</label><input className="field" id="record-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name…" type="search"/></div><div className="filters" role="group" aria-label="Filter runs by status">{['All','Passed','Failed'].map(f=><button id={'filter-'+f.toLowerCase()} className="filter" aria-pressed={filter===f} key={f} onClick={()=>setFilter(f)}>{f}</button>)}</div></div>
    <div className="table-wrap" role="region" aria-label="Run results" tabIndex="0"><table><thead><tr><th scope="col">Run / identifier</th><th scope="col">Status</th><th scope="col">Duration</th></tr></thead><tbody>{visible.map(r=><tr key={r.id}><td>{r.name}<span className="row-id">{r.id}</span></td><td><span className={'badge '+(r.status==='Failed'?'failed':'')}>{r.status==='Failed'?'×':'✓'} {r.status}</span></td><td className="mono">{r.time}</td></tr>)}</tbody></table>{visible.length===0&&<div className="empty" id="no-results"><h3>No matching runs.</h3><p style={{margin:'8px auto'}}>Try another name or clear your filters.</p><button id="clear-filters" className="btn secondary" onClick={reset}>Clear filters</button></div>}</div><p id="result-count" className="section-note mono" role="status">{visible.length} of {records.length} runs shown</p>
    </div>
  </section>;
}
const starterSnippet = ':root {\n  --fw-background: #F5F3EC;\n  --fw-text: #252820;\n  --fw-accent: #DA4B27;\n  --fw-accent-hover: #BF3D1C;\n  --fw-border: #D2D3C7;\n  --fw-radius-control: 2px;\n}';
function GuidelinesSection({scheme,mode,values}) {
  const starterSnippet='/* Fieldwork: '+scheme+' / '+mode+'. Full primitives: tokens.css */\n:root {\n  color-scheme: '+mode+';\n'+Object.entries(values).map(([k,v])=>'  --fw-'+k+': '+v+';').join('\n')+'\n}';
  const [copyMessage,setCopyMessage]=React.useState('');
  React.useEffect(()=>setCopyMessage(''),[scheme,mode]);
  async function copy(){try{await navigator.clipboard.writeText(starterSnippet);setCopyMessage('Starter snippet copied. Full tokens are in tokens.css.');}catch{setCopyMessage('Clipboard unavailable. Select and copy the visible snippet below.');}}
  return <section className="section" id="guidelines">
    <SectionHeading number="06" title="Keep the system honest." description="Rules that travel with you, whether you’re building a landing page or your next application."/>
    <div className="guides"><div><h3>↗ DO / Make it useful</h3><ul><li>Use the selected scheme’s semantic neutrals.</li><li>Give every page one clear primary task.</li><li>Use structural lines instead of decorative cards.</li><li>Pair semantic color with a text label.</li><li>Design the empty, error, and focus states.</li></ul></div><div><h3>× DON'T / Add noise</h3><ul><li>Fill every surface with the accent color.</li><li>Use fake metrics or decorative charts.</li><li>Mix arbitrary radii, shadows, or typefaces.</li><li>Hide necessary actions behind hover.</li><li>Trade legibility for a “technical” aesthetic.</li></ul></div></div>
    <div style={{marginTop:32}}><details><summary>Accessibility & interaction contract</summary><p>Target WCAG 2.2 AA: 4.5:1 for normal text, visible keyboard focus, labelled fields, and at least 44px action targets. Light palettes use dark button fills with white labels. Dark palettes use bright fills with ink labels; never keep white labels on acid or pale accents. Respect reduced motion. This is a starting contract, not an accessibility certification.</p></details><details><summary>What is this style called?</summary><p>Industrial minimalism or utilitarian tech design are useful descriptors. It combines Swiss-inspired editorial hierarchy, exposed grids, and monospace annotations. “Developer-tool aesthetic” describes the audience, rather than a formal design movement.</p></details><details><summary>How close is this to Blacksmith?</summary><p>This is an original direction inspired by your reference, not a Blacksmith brand kit. The website’s text was accessible, but its rendered visual styling was not verified. Colors, typography, illustrations, and component rules here are original proposals.</p></details><details open><summary>Use this in your next app</summary><p>Start with DESIGN.md for the full system specification, then copy tokens.css for portable semantic variables and opt-in button, field, and panel primitives. App.jsx provides working React examples. No external fonts, paid assets, backend, or persistence are required.</p><div className="btn-row"><button id="copy-tokens" className="btn secondary" onClick={copy}>Copy starter tokens <span aria-hidden="true">↗</span></button></div><div className="section-note" role="status">{copyMessage}</div><code className="token-code">{starterSnippet}</code></details></div>
  </section>;
}

const controlStyles = `
:root { --fw-control-active: var(--fw-accent-hover); --fw-control-on: var(--fw-on-accent); --fw-control-off: var(--fw-surface); --fw-control-boundary: var(--fw-muted); }
.fw-control { display:flex; align-items:center; gap:12px; min-height:48px; cursor:pointer; color:var(--fw-text); font:14px/1.5 var(--fw-sans); }
.fw-control input { flex-shrink:0; margin:0; appearance:none; background:var(--fw-control-off); border:1px solid var(--fw-control-boundary); cursor:pointer; }
.fw-control input:checked { background:var(--fw-control-active); border-color:var(--fw-control-active); }
.fw-control input:focus-visible,.fw-range:focus-visible,.fw-segment button:focus-visible,.fw-stepper button:focus-visible { outline:2px solid var(--fw-focus); outline-offset:4px; }
.fw-control--switch input { width:44px; height:24px; border-radius:2px; position:relative; }
.fw-control--switch input::after { content:''; position:absolute; top:3px; left:3px; width:16px; height:16px; background:var(--fw-muted); transition:transform 120ms; }
.fw-control--switch input:checked::after { transform:translateX(20px); background:var(--fw-control-on); }
.fw-control--check input { width:22px; height:22px; border-radius:2px; display:grid; place-content:center; }
.fw-control--check input:checked::after { content:''; width:10px; height:5px; border:solid var(--fw-control-on); border-width:0 0 2px 2px; transform:translateY(-1px) rotate(-45deg); }
.fw-control--radio input { width:22px; height:22px; border-radius:50%; display:grid; place-content:center; }
.fw-control--radio input:checked::after { content:''; width:8px; height:8px; border-radius:50%; background:var(--fw-control-on); }
.fw-control:has(input:disabled) { color:var(--fw-muted); cursor:not-allowed; }
.fw-control input:disabled { cursor:not-allowed; border-style:dashed; background:var(--fw-surface); }
.fw-control input:disabled::after { background:var(--fw-muted); }
.fw-control-copy { flex:1; }.fw-control-copy small { display:block; color:var(--fw-muted); font-size:12px; }
.fw-state { font:11px var(--fw-mono); color:var(--fw-muted); }
.fw-control:has(input:checked:not(:disabled)) .fw-state { color:var(--fw-text); }
.fw-range { appearance:none; width:100%; height:8px; margin:18px 0; border:1px solid var(--fw-muted); border-radius:0; background:linear-gradient(to right,var(--fw-control-active) 0%,var(--fw-control-active) var(--fw-range-fill,50%),var(--fw-control-off) var(--fw-range-fill,50%),var(--fw-control-off) 100%); cursor:pointer; }
.fw-range::-webkit-slider-thumb { appearance:none; width:20px; height:24px; background:var(--fw-control-active); border:2px solid var(--fw-control-on); border-radius:2px; box-shadow:0 0 0 1px var(--fw-muted); }
.fw-range::-moz-range-thumb { width:16px; height:20px; background:var(--fw-control-active); border:2px solid var(--fw-control-on); border-radius:2px; }
.fw-range:disabled { filter:grayscale(1); cursor:not-allowed; background:var(--fw-surface); }
.fw-range:disabled::-webkit-slider-thumb { background:var(--fw-muted); }
.fw-segment { display:flex; border:1px solid var(--fw-muted); padding:3px; gap:3px; }
.fw-segment button { flex:1; min-height:44px; border:0; background:transparent; color:var(--fw-text); font:12px var(--fw-mono); cursor:pointer; }
.fw-segment button[aria-pressed=true] { background:var(--fw-control-active); color:var(--fw-control-on); }
.fw-stepper { display:inline-flex; align-items:center; border:1px solid var(--fw-muted); }
.fw-stepper button { width:44px; min-height:44px; background:var(--fw-surface); color:var(--fw-text); border:0; font-size:20px; cursor:pointer; }
.fw-stepper button:hover:not(:disabled) { background:var(--fw-control-active); color:var(--fw-control-on); }
.fw-stepper button:disabled { color:var(--fw-muted); cursor:not-allowed; }
.fw-stepper output { min-width:60px; text-align:center; font:16px var(--fw-mono); }
.control-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; }
.control-grid .panel { min-width:0; }.control-grid h3 { margin:12px 0 8px; font-size:22px; font-weight:500; }
.control-grid fieldset { border:0; padding:0; margin:0; min-width:0; }.control-grid legend { padding:0; }
.control-divider { border-top:1px solid var(--fw-border); margin-top:12px; padding-top:12px; }
.range-heading { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-top:20px; }
.range-heading output { font:14px var(--fw-mono); color:var(--fw-text); }
.range-extents { display:flex; justify-content:space-between; color:var(--fw-muted); font:11px var(--fw-mono); }
.control-summary { margin-top:16px; padding:24px; border:1px solid var(--fw-border); background:var(--fw-surface); display:flex; align-items:center; justify-content:space-between; gap:24px; }
.control-summary p { margin:8px 0 0; font:12px/1.8 var(--fw-mono); }
@media(max-width:760px) { .control-grid{grid-template-columns:1fr}.control-summary{align-items:flex-start;flex-direction:column} }
@media(prefers-reduced-motion:reduce) { .fw-control--switch input::after{transition:none} }
`;

function SwitchControl({id,label,description,checked,onChange,disabled=false}) {
  return <label className="fw-control fw-control--switch" htmlFor={id}>
    <input id={id} type="checkbox" role="switch" checked={checked} onChange={e=>onChange?.(e.target.checked)} disabled={disabled}/>
    <span className="fw-control-copy">{label}{description && <small>{description}</small>}</span>
    <span className="fw-state" aria-hidden="true">{disabled?'LOCKED':checked?'ON':'OFF'}</span>
  </label>;
}
function ControlsSection() {
  const defaults={sync:true,alerts:false,logs:true,traces:false,policy:'balanced',capacity:65,timeout:30,view:'List',workers:3};
  const [state,setState]=React.useState(defaults);
  const update=(key,value)=>setState(s=>({...s,[key]:value}));
  const [resetNote,setResetNote]=React.useState('');
  return <section className="section" id="controls">
    <SectionHeading number="04A" title="State, made visible." description="Switches, selections, and precision controls. Active color follows your scheme in light and dark; labels and shapes carry the meaning."/>
    <div className="control-grid">
      <div className="panel"><div className="eyebrow muted">01 / Switches</div><h3>Immediate decisions.</h3><p>Use a switch for a setting that takes effect immediately.</p>
        <SwitchControl id="control-sync" label="Background sync" description="Keep local sample records up to date." checked={state.sync} onChange={v=>update('sync',v)}/>
        <SwitchControl id="control-alerts" label="Run notifications" checked={state.alerts} onChange={v=>update('alerts',v)}/>
        <div className="control-divider"><SwitchControl id="control-locked" label="Organization policy" description="Disabled example: managed by your administrator." checked={false} disabled/></div>
      </div>
      <div className="panel"><fieldset><legend className="eyebrow muted">02 / Checkboxes</legend><h3>Choose independently.</h3><p>Select any combination of diagnostic attachments.</p>
        {[['logs','Build logs'],['traces','Performance traces']].map(([key,label])=><label key={key} className="fw-control fw-control--check"><input id={'control-'+key} type="checkbox" checked={state[key]} onChange={e=>update(key,e.target.checked)}/><span className="fw-control-copy">{label}</span><span className="fw-state" aria-hidden="true">{state[key]?'SELECTED':'NOT SELECTED'}</span></label>)}
        <label className="fw-control fw-control--check control-divider"><input type="checkbox" disabled/><span className="fw-control-copy">Security archive<small>Disabled example: requires elevated access.</small></span><span className="fw-state">LOCKED</span></label>
      </fieldset></div>
      <div className="panel"><fieldset><legend className="eyebrow muted">03 / Radio group</legend><h3>One clear choice.</h3><p>Sample execution policy. Select one option.</p>
        {['efficient','balanced','performance'].map(value=><label key={value} className="fw-control fw-control--radio"><input id={'policy-'+value} type="radio" name="control-policy" value={value} checked={state.policy===value} onChange={()=>update('policy',value)}/><span className="fw-control-copy" style={{textTransform:'capitalize'}}>{value}</span><span className="fw-state" aria-hidden="true">{state.policy===value?'ACTIVE':'—'}</span></label>)}
      </fieldset></div>
      <div className="panel"><div className="eyebrow muted">04 / Range sliders</div><h3>Fine-tune the signal.</h3>
        <div className="range-heading"><label htmlFor="control-capacity">Capacity limit</label><output id="capacity-value" htmlFor="control-capacity">{state.capacity}%</output></div>
        <input className="fw-range" id="control-capacity" type="range" min="0" max="100" step="5" value={state.capacity} aria-valuetext={state.capacity+' percent'} style={{'--fw-range-fill':state.capacity+'%'}} onChange={e=>update('capacity',Number(e.target.value))}/><div className="range-extents"><span>0%</span><span>100%</span></div>
        <div className="range-heading"><label htmlFor="control-timeout">Timeout</label><output id="timeout-value" htmlFor="control-timeout">{state.timeout}s</output></div>
        <input className="fw-range" id="control-timeout" type="range" min="10" max="120" step="10" value={state.timeout} aria-valuetext={state.timeout+' seconds'} style={{'--fw-range-fill':((state.timeout-10)/110*100)+'%'}} onChange={e=>update('timeout',Number(e.target.value))}/><div className="range-extents"><span>10s</span><span>120s</span></div>
      </div>
      <div className="panel"><div className="eyebrow muted">05 / Segmented selection</div><h3>A compact alternative.</h3><p id="view-label">Sample view preference</p><div className="fw-segment" role="group" aria-labelledby="view-label">{['List','Grid','Compact'].map(view=><button key={view} id={'view-'+view.toLowerCase()} aria-pressed={state.view===view} onClick={()=>update('view',view)}>{view}</button>)}</div><p className="section-note">Use buttons for a local preference, not tabs without panels.</p></div>
      <div className="panel"><div className="eyebrow muted">06 / Number stepper</div><h3>Bounded adjustments.</h3><p id="workers-label">Concurrent workers · 1–8</p><div className="fw-stepper" role="group" aria-labelledby="workers-label"><button id="worker-minus" aria-label="Remove one worker" disabled={state.workers===1} onClick={()=>update('workers',state.workers-1)}>−</button><output id="workers-value" aria-live="polite">{state.workers}</output><button id="worker-plus" aria-label="Add one worker" disabled={state.workers===8} onClick={()=>update('workers',state.workers+1)}>+</button></div><p className="section-note">Actions disable at the minimum and maximum.</p></div>
    </div>
    <div className="control-summary"><div><div className="eyebrow">Live configuration / local demo</div><p id="control-summary">Sync {state.sync?'ON':'OFF'} · Alerts {state.alerts?'ON':'OFF'} · Attachments {[state.logs&&'logs',state.traces&&'traces'].filter(Boolean).join(' + ')||'none'}<br/>{state.policy} · {state.capacity}% capacity · {state.timeout}s timeout · {state.view} view · {state.workers} workers</p><span className="section-note" role="status">{resetNote}</span></div><button className="btn secondary" id="reset-controls" onClick={()=>{setState(defaults);setResetNote('Default configuration restored.');}}>Reset controls ↺</button></div>
    <p className="section-note mono">ACTIVE / Theme fill + contrasting mark. OFF / Neutral track + explicit label. FOCUS / Independent outline. DISABLED / Neutral + reason.</p>
  </section>;
}

// Motion primitives mirror tokens.css; demo-only layout remains local.
const motionStyles = `
:root { --fw-duration-expand:240ms; --fw-ease-standard:cubic-bezier(.2,0,0,1); --fw-motion-offset:8px; }
.fw-motion { --fw-duration-expand:calc(var(--ocd-tweak-motion-duration,${TWEAK_DEFAULTS.motionDuration}) * 1ms); }
.fw-sidebar { width:176px; flex-shrink:0; overflow:hidden; background:var(--fw-surface); border-right:1px solid var(--fw-border); transition:width var(--fw-duration-expand) var(--fw-ease-standard); }
.fw-sidebar[data-expanded=false] { width:56px; }
.fw-sidebar button { display:flex; align-items:center; gap:12px; width:100%; min-height:44px; padding:0 16px; background:transparent; border:0; color:var(--fw-text); text-align:left; white-space:nowrap; font:12px var(--fw-mono); }
.fw-sidebar button[aria-current=page] { background:var(--fw-control-active); color:var(--fw-control-on); }
.fw-sidebar .fw-nav-label { opacity:1; transition:opacity var(--fw-duration-fast,120ms); }
.fw-sidebar[data-expanded=false] .fw-nav-label { opacity:0; }
.fw-collapse { height:0; overflow:hidden; transition:height calc(var(--fw-duration-expand) * 1.333) var(--fw-ease-standard); }
.fw-collapse[data-open=true] { height:var(--fw-collapse-height,auto); }
.fw-collapse > div { display:flow-root; }
.fw-dialog { margin:auto; box-sizing:border-box; width:min(520px,calc(100vw - 32px)); max-height:calc(100dvh - 48px); overflow:auto; padding:0; border:1px solid var(--fw-muted); border-radius:0; background:var(--fw-raised); color:var(--fw-text); box-shadow:var(--fw-shadow-overlay); }
.fw-dialog[open] { animation:fw-enter var(--fw-duration-normal,180ms) var(--fw-ease-standard); }
.fw-dialog::backdrop { background:var(--fw-scrim,#0009); }
.fw-dialog header,.fw-dialog .dialog-body,.fw-dialog footer { padding:24px; }
.fw-dialog header { border-bottom:1px solid var(--fw-border); display:flex; justify-content:space-between; gap:16px; align-items:flex-start; }
.fw-dialog h3 { margin:8px 0 0; font-size:24px; font-weight:500; }
.fw-dialog footer { display:flex; justify-content:flex-end; gap:8px; border-top:1px solid var(--fw-border); flex-wrap:wrap; }
.fw-dialog p { font-size:14px; line-height:1.6; color:var(--fw-muted); }
.fw-dialog label { display:block; margin-bottom:8px; font:12px var(--fw-mono); }
.fw-dialog input { width:100%; min-height:44px; padding:12px; border:1px solid var(--fw-muted); background:var(--fw-background); color:var(--fw-text); font:16px var(--fw-sans); }
.fw-dialog button:focus-visible,.fw-dialog input:focus-visible { outline:2px solid var(--fw-focus); outline-offset:3px; }
.dialog-action { min-height:44px; padding:0 16px; border:1px solid var(--fw-muted); background:transparent; color:var(--fw-text); font:600 14px var(--fw-mono); cursor:pointer; }
.dialog-action:hover { background:var(--fw-surface); }
.dialog-action.primary { border-color:transparent; background:var(--fw-accent-hover); color:var(--fw-on-accent); }
.dialog-action.primary:hover { background:var(--fw-button-hover); }
.dialog-action.danger { border-color:var(--fw-danger); color:var(--fw-danger); }
.dialog-error { color:var(--fw-danger)!important; }
.modal-launchers { display:flex; flex-wrap:wrap; gap:12px; margin-top:24px; }
@media(prefers-reduced-motion:reduce) { .fw-dialog[open] { animation:none; } }
.popup-anchor { position:relative; display:inline-flex; max-width:100%; }
.fw-info-popup { position:absolute; bottom:calc(100% + 8px); left:0; z-index:8; width:min(300px,calc(100vw - 88px)); padding:16px; border:1px solid var(--fw-muted); background:var(--fw-raised); color:var(--fw-text); box-shadow:var(--fw-shadow-overlay); animation:fw-enter var(--fw-duration-normal) var(--fw-ease-standard); }
.fw-info-popup h4 { margin:0 0 8px; font-size:16px; }
.fw-info-popup p { margin:0 0 12px; font-size:14px; line-height:1.6; color:var(--fw-muted); }
@keyframes fw-popup-enter { from { transform:translateY(8px); } to { transform:translateY(0); } }
.fw-info-popup,.fw-tooltip { animation-name:fw-popup-enter; }
.dialog-action:disabled { opacity:.55; cursor:not-allowed; background:var(--fw-surface); color:var(--fw-muted); border-color:var(--fw-border); }
.popup-demo-tools { display:flex; flex-wrap:wrap; align-items:center; gap:16px; margin:24px 0; }
.fw-tooltip { position:absolute; top:calc(100% + 8px); left:0; z-index:9; width:max-content; max-width:min(260px,calc(100vw - 88px)); padding:8px 12px; border:1px solid var(--fw-muted); background:var(--fw-raised); color:var(--fw-text); font:12px/1.5 var(--fw-mono); box-shadow:var(--fw-shadow-overlay); animation:fw-popup-enter var(--fw-duration-fast) var(--fw-ease-standard); pointer-events:auto; }
.fw-toast-stack { display:grid; gap:8px; min-height:96px; margin-top:24px; }
.fw-toast { display:flex; align-items:flex-start; gap:12px; padding:16px; border:1px solid var(--fw-muted); border-left:3px solid var(--fw-info); background:var(--fw-raised); color:var(--fw-text); animation:fw-enter var(--fw-duration-normal) var(--fw-ease-standard); }
.fw-toast-copy { flex:1; min-width:0; }
.fw-toast strong { font-size:14px; font-weight:600; }
.fw-toast p { font-size:14px; color:var(--fw-muted); margin:8px 0; line-height:1.5; }
.fw-toast .dialog-action { padding:0 12px; }
.fw-sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip-path:inset(50%); white-space:nowrap; }
@media(prefers-reduced-motion:reduce) { .fw-info-popup,.fw-tooltip,.fw-toast { animation:none; } }

.fw-chevron { display:inline-block; transition:transform var(--fw-duration-normal,180ms) var(--fw-ease-standard); }
[aria-expanded=true] .fw-chevron { transform:rotate(90deg); }
.fw-popover { position:absolute; z-index:5; top:calc(100% + 8px); right:0; width:216px; padding:4px; background:var(--fw-raised); border:1px solid var(--fw-muted); box-shadow:var(--fw-shadow-overlay); animation:fw-enter var(--fw-duration-normal,180ms) var(--fw-ease-standard); }
.fw-popover button { display:block; width:100%; text-align:left; min-height:44px; background:transparent; color:var(--fw-text); border:0; padding:0 12px; font:12px var(--fw-mono); }
.fw-popover button:hover,.fw-popover button:focus-visible { background:var(--fw-surface); }
.fw-tabs { display:flex; border-bottom:1px solid var(--fw-border); }
.fw-tabs [role=tab] { flex:1; min-height:44px; padding:8px; background:transparent; border:0; border-bottom:2px solid transparent; color:var(--fw-muted); font:12px var(--fw-mono); }
.fw-tabs [aria-selected=true] { border-bottom-color:var(--fw-control-active); color:var(--fw-text); }
.fw-tab-panel { animation:fw-enter var(--fw-duration-normal,180ms) var(--fw-ease-standard); }
.fw-motion button:focus-visible { outline:2px solid var(--fw-focus); outline-offset:-3px; }
@keyframes fw-enter { from { opacity:0; transform:translateY(var(--fw-motion-offset)); } to { opacity:1; transform:translateY(0); } }
.fw-motion[data-reduced=true] *, .fw-motion[data-reduced=true] *::after { transition:none!important; animation:none!important; }
@media(prefers-reduced-motion:reduce) { .fw-sidebar,.fw-nav-label,.fw-collapse,.fw-chevron,.fw-popover,.fw-tab-panel { transition:none!important; animation:none!important; } }
.motion-toolbar { display:flex; justify-content:space-between; align-items:center; gap:24px; margin-bottom:24px; padding:16px 0; border-block:1px solid var(--fw-border); }
.motion-toolbar p { margin:0; font:12px/1.8 var(--fw-mono); color:var(--fw-muted); }
.motion-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px; }
.motion-card { min-width:0; border:1px solid var(--fw-border); background:var(--fw-raised); }
.motion-caption { padding:24px; border-bottom:1px solid var(--fw-border); }
.motion-caption h3 { margin:8px 0; font-size:24px; font-weight:500; }
.motion-caption p { margin:0; color:var(--fw-muted); font-size:14px; }
.motion-spec { padding:12px 24px; border-top:1px solid var(--fw-border); color:var(--fw-muted); font:10px/1.6 var(--fw-mono); }
.motion-stage { padding:24px; min-height:230px; position:relative; }
.motion-shell { display:flex; min-height:230px; }
.motion-workspace { padding:24px 16px; min-width:0; flex:1; }
.motion-workspace h4 { font-size:18px; margin:12px 0; font-weight:500; }
.motion-workspace p { font-size:12px; color:var(--fw-muted); }
.motion-line { height:6px; background:var(--fw-border); margin:14px 0; }
.motion-disclosure { width:100%; display:flex; justify-content:space-between; gap:8px; align-items:center; min-height:52px; border:0; border-bottom:1px solid var(--fw-border); padding:0 0; background:transparent; color:var(--fw-text); font:14px var(--fw-sans); text-align:left; }
.motion-disclosure-copy { padding:16px 0; font-size:14px; line-height:1.6; color:var(--fw-muted); }
.motion-menu-anchor { position:relative; width:max-content; margin-left:auto; }
.motion-choice { margin-top:32px; padding:16px; background:var(--fw-surface); font:12px/1.8 var(--fw-mono); }
.motion-tab-body { padding:24px 0 0; font-size:14px; line-height:1.6; }
.motion-tab-body p { color:var(--fw-muted); }
@media(max-width:900px) { .motion-grid { grid-template-columns:1fr; } }
@media(max-width:640px) { .motion-toolbar { align-items:flex-start; flex-direction:column; gap:8px; } .fw-sidebar { width:148px; } .motion-caption,.motion-stage { padding:16px; } }
`;

function MotionSidebar() {
  const [expanded,setExpanded]=React.useState(true);
  const [page,setPage]=React.useState('Overview');
  return <div className="motion-shell">
    <nav className="fw-sidebar" data-expanded={expanded} aria-label="Sample workspace">
      <button id="motion-sidebar-toggle" aria-label={expanded?'Collapse sample sidebar':'Expand sample sidebar'} aria-expanded={expanded} aria-controls="motion-sidebar-items" onClick={()=>setExpanded(v=>!v)}><span aria-hidden="true">{expanded?'←':'→'}</span><span className="fw-nav-label">Collapse</span></button>
      <div id="motion-sidebar-items">{['Overview','Deployments','Settings'].map((name,i)=><button key={name} id={'motion-nav-'+i} aria-label={name} aria-current={page===name?'page':undefined} onClick={()=>setPage(name)}><span aria-hidden="true">{['◫','↗','⊞'][i]}</span><span className="fw-nav-label" aria-hidden="true">{name}</span></button>)}</div>
    </nav>
    <div className="motion-workspace" id="motion-workspace" role="status"><span className="eyebrow muted">Sample workspace</span><h4>{page}</h4><p>{page==='Overview'?'Your workspace at a glance.':page==='Deployments'?'Local deployment activity.':'Workspace preferences.'}</p><div className="motion-line"/><div className="motion-line" style={{width:'65%'}}/><p>{expanded?'Expanded navigation':'Compact navigation'} · selection preserved</p></div>
  </div>;
}

function MotionDropdown() {
  const [open,setOpen]=React.useState(false);
  const [environment,setEnvironment]=React.useState('Preview');
  const trigger=React.useRef(null);
  const wrapper=React.useRef(null);
  React.useEffect(()=>{
    if (!open) return;
    const outside=e=>{if(!wrapper.current?.contains(e.target))setOpen(false);};
    document.addEventListener('pointerdown',outside);
    return ()=>document.removeEventListener('pointerdown',outside);
  },[open]);
  const close=()=>{setOpen(false);trigger.current?.focus();};
  return <div className="motion-stage">
    <div ref={wrapper} className="motion-menu-anchor" onKeyDown={e=>{if(e.key==='Escape'&&open){e.preventDefault();close();}}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}}>
      <button className="btn secondary" id="motion-menu-trigger" ref={trigger} aria-expanded={open} aria-controls="motion-menu-options" onClick={()=>setOpen(v=>!v)}>Environment <span aria-hidden="true" className="fw-chevron">›</span></button>
      {open&&<div className="fw-popover" id="motion-menu-options" role="group" aria-label="Sample environment">{['Preview','Staging','Production'].map(name=><button key={name} id={'motion-env-'+name.toLowerCase()} aria-pressed={environment===name} onClick={()=>{setEnvironment(name);close();}}>{environment===name?'✓ ':''}{name}</button>)}</div>}
    </div>
    <div className="motion-choice" id="motion-environment" role="status">ENVIRONMENT / {environment}<br/><span className="muted">Local selection only. No deployment.</span></div>
    <p className="section-note">Enter to open. Tab through options. Escape to close.</p>
  </div>;
}

function FluidCollapse({open,id,children}) {
  const content=React.useRef(null);
  const [height,setHeight]=React.useState(0);
  React.useLayoutEffect(()=>{
    const node=content.current;
    const measure=()=>setHeight(node.getBoundingClientRect().height);
    measure();
    const observer=new ResizeObserver(measure);
    observer.observe(node);
    return ()=>observer.disconnect();
  },[]);
  return <div className="fw-collapse" id={id} data-open={open} inert={open?undefined:''} aria-hidden={!open} style={{'--fw-collapse-height':height+'px'}}><div ref={content}>{children}</div></div>;
}

function MotionPopups() {
  const [infoOpen,setInfoOpen]=React.useState(false);
  const [tipOpen,setTipOpen]=React.useState(false);
  const [tipDismissed,setTipDismissed]=React.useState(false);
  const [paused,setPaused]=React.useState(false);
  const [notices,setNotices]=React.useState([]);
  const [announcement,setAnnouncement]=React.useState('');
  const infoTrigger=React.useRef(null);
  const infoPanel=React.useRef(null);
  const infoRoot=React.useRef(null);
  const queueTrigger=React.useRef(null);
  const noticeTrigger=React.useRef(null);
  const tipTimer=React.useRef(null);
  React.useEffect(()=>()=>clearTimeout(tipTimer.current),[]);
  React.useEffect(()=>{
    if(!infoOpen)return;
    infoPanel.current?.querySelector('button')?.focus();
    const outside=event=>{if(!infoRoot.current?.contains(event.target))setInfoOpen(false);};
    const escape=event=>{if(event.key==='Escape'){event.preventDefault();setInfoOpen(false);infoTrigger.current?.focus();}};
    const focusOutside=event=>{if(!infoRoot.current?.contains(event.target))setInfoOpen(false);};
    document.addEventListener('pointerdown',outside);
    document.addEventListener('keydown',escape);
    document.addEventListener('focusin',focusOutside);
    return ()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);document.removeEventListener('focusin',focusOutside);};
  },[infoOpen]);
  const dismiss=(id,restore=true)=>{
    setNotices(items=>items.filter(item=>item.id!==id));
    if(restore)requestAnimationFrame(()=>(id==='queue'?queueTrigger:noticeTrigger).current?.focus());
  };
  const toggleQueue=()=>{
    const next=!paused;setPaused(next);
    const title=next?'Sample queue paused':'Sample queue resumed';
    setNotices(items=>[{id:'queue',title,previous:paused},...items.filter(item=>item.id!=='queue')]);
    setAnnouncement(title+'. Undo is available in the notification preview.');
  };
  const notify=()=>{
    setNotices(items=>[{id:'info',title:'Preview notification'},...items.filter(item=>item.id!=='info')]);
    setAnnouncement('Preview notification. Local example only; no service is connected.');
  };
  return <div className="motion-stage">
    <span className="eyebrow muted">ANCHORED / NON-BLOCKING</span>
    <p>Small context, without interrupting the task.</p>
    <div className="popup-demo-tools">
      <div className="popup-anchor" ref={infoRoot}>
        <button className="dialog-action" id="popup-info-trigger" ref={infoTrigger} aria-haspopup="dialog" aria-expanded={infoOpen} aria-controls="popup-info-panel" onClick={()=>setInfoOpen(value=>!value)}>Queue details ⓘ</button>
        {infoOpen&&<div className="fw-info-popup" id="popup-info-panel" role="dialog" aria-modal="false" aria-labelledby="popup-info-title" ref={infoPanel}>
          <h4 id="popup-info-title">Sample processing queue</h4><p>Two concurrent jobs. Queue state is simulated and lasts until reload. Use the pause control below to try a reversible change.</p>
          <button className="dialog-action" id="popup-info-close" onClick={()=>{setInfoOpen(false);infoTrigger.current?.focus();}}>Got it</button>
        </div>}
      </div>
      <div className="popup-anchor" onMouseEnter={()=>{clearTimeout(tipTimer.current);setTipDismissed(false);setTipOpen(true);}} onMouseLeave={()=>{tipTimer.current=setTimeout(()=>setTipOpen(false),120);}} onFocus={()=>{setTipDismissed(false);setTipOpen(true);}} onBlur={()=>setTipOpen(false)} onKeyDown={e=>{if(e.key==='Escape'){setTipDismissed(true);setTipOpen(false);e.stopPropagation();}}}>
        <button className="dialog-action" id="popup-tip-trigger" aria-describedby={tipOpen&&!tipDismissed?'popup-tooltip':undefined}>Local demo ⓘ</button>
        {tipOpen&&!tipDismissed&&<span className="fw-tooltip" role="tooltip" id="popup-tooltip">No backend. State resets when you reload.</span>}
      </div>
    </div>
    <p id="popup-queue-state">Sample queue: <strong>{paused?'Paused':'Running'}</strong></p>
    <div className="popup-demo-tools">
      <button className="dialog-action" ref={queueTrigger} id="popup-queue-toggle" onClick={toggleQueue}>{paused?'Resume sample queue':'Pause sample queue'}</button>
      <button className="dialog-action" ref={noticeTrigger} id="popup-notify" onClick={notify} disabled={notices.some(item=>item.id==='info')}>Show notification</button>
    </div>
    <span className="eyebrow muted">NOTIFICATION PREVIEW / NO AUTO-DISMISS</span>
    <div className="fw-sr-only" role="status" aria-live="polite">{announcement}</div>
    <div className="fw-toast-stack" aria-label="Sample notifications">
      {!notices.length&&<p className="muted">No notifications. Try pausing the queue.</p>}
      {notices.map(notice=><div className="fw-toast" key={notice.id} id={'popup-toast-'+notice.id}>
        <div className="fw-toast-copy"><strong>{notice.title}</strong><p>{notice.id==='queue'?'Local queue state updated. Undo restores the previous state.':'Local example only. No service is connected.'}</p>
          {notice.id==='queue'&&<button className="dialog-action" id="popup-undo" onClick={()=>{setPaused(notice.previous);setAnnouncement('Change undone. Sample queue '+(notice.previous?'paused.':'running.'));dismiss('queue');}}>Undo</button>}
        </div>
        <button className="dialog-action" id={'popup-dismiss-'+notice.id} aria-label={'Dismiss '+notice.title.toLowerCase()} onClick={()=>dismiss(notice.id)}>×</button>
      </div>)}
    </div>
  </div>;
}

function MotionModals() {
  const dialog=React.useRef(null);
  const opener=React.useRef(null);
  const [kind,setKind]=React.useState('settings');
  const [name,setName]=React.useState('Fieldwork sandbox');
  const [draft,setDraft]=React.useState(name);
  const [error,setError]=React.useState('');
  const [archived,setArchived]=React.useState(false);
  const [message,setMessage]=React.useState('No service connected. Changes last until reload.');
  const launch=(event,type)=>{
    opener.current=event.currentTarget;
    setKind(type);setDraft(name);setError('');
    // Wait for the dialog contents to commit before choosing initial focus.
    requestAnimationFrame(()=>{dialog.current.showModal();dialog.current.querySelector(type==='settings'?'input':'[data-cancel]')?.focus();});
  };
  const close=()=>dialog.current.close();
  const restore=()=>opener.current?.focus();
  const submit=event=>{
    event.preventDefault();
    if(kind==='settings'){
      if(!draft.trim()){setError('Enter a workspace name.');dialog.current.querySelector('input').focus();return;}
      setName(draft.trim());setMessage('Workspace name updated locally.');
    }else{setArchived(true);setMessage('Sample workspace archived locally. Use Restore to undo.');}
    close();
  };
  return <div className="motion-stage">
    <span className="eyebrow muted">LOCAL SAMPLE / WORKSPACE</span>
    <h4 id="modal-workspace-name">{name}</h4>
    <p id="modal-workspace-state">{archived?'Archived — sample workspace is inactive.':'Active — sample workspace is available.'}</p>
    <div className="modal-launchers">
      <button className="dialog-action" id="modal-settings-open" onClick={e=>launch(e,'settings')}>Edit workspace ↗</button>
      <button className="dialog-action" id="modal-archive-open" onClick={e=>{if(archived){setArchived(false);setMessage('Sample workspace restored locally.');}else launch(e,'archive');}}>{archived?'Restore workspace':'Archive workspace'}</button>
    </div>
    <p className="section-note" id="modal-feedback" role="status">{message}</p>
    <dialog ref={dialog} className="fw-dialog" id="motion-dialog" aria-labelledby="motion-dialog-title" aria-describedby="motion-dialog-description" onClose={restore} onKeyDown={event=>{
      if(event.key!=='Tab')return;
      const items=Array.from(dialog.current.querySelectorAll('button:not(:disabled),input:not(:disabled),[tabindex="0"]'));
      const first=items[0],last=items[items.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }}>
      <form onSubmit={submit} noValidate>
        <header><div><span className="eyebrow muted">{kind==='settings'?'01 / Edit settings':'02 / Confirm action'}</span><h3 id="motion-dialog-title">{kind==='settings'?'Workspace settings':'Archive workspace?'}</h3></div><button type="button" className="dialog-action" aria-label="Close dialog" onClick={close}>×</button></header>
        <div className="dialog-body">
          <p id="motion-dialog-description">{kind==='settings'?'Change the name shown in this local example. Nothing is sent to a server.':'This marks the sample workspace inactive. You can restore it from the example after closing this dialog.'}</p>
          {kind==='settings'&&<><label htmlFor="modal-name">Workspace name</label><input id="modal-name" value={draft} maxLength={80} onChange={e=>{setDraft(e.target.value);setError('');}} aria-invalid={!!error} aria-describedby={error?'modal-name-error':undefined}/>{error&&<p className="dialog-error" id="modal-name-error" role="alert">{error}</p>}</>}
        </div>
        <footer><button type="button" data-cancel className="dialog-action" id="modal-cancel" onClick={close}>Cancel</button><button type="submit" id="modal-submit" className={'dialog-action '+(kind==='settings'?'primary':'danger')}>{kind==='settings'?'Save changes':'Archive workspace'}</button></footer>
      </form>
    </dialog>
  </div>;
}

function MotionAccordion() {
  const [opened,setOpened]=React.useState(0);
  const items=[['Deployment rules','Preview builds run in an isolated workspace. Production deployments require an explicit approval.'],['Retention policy','Keep sample build logs for 30 days. This example changes no stored data.'],['Access boundaries','Assign the smallest useful role. Review access before enabling production actions.']];
  return <div className="motion-stage">{items.map(([title,copy],i)=><div key={title}>
    <h4 style={{margin:0}}><button className="motion-disclosure" id={'motion-accordion-'+i} aria-expanded={opened===i} aria-controls={'motion-disclosure-'+i} onClick={()=>setOpened(opened===i?null:i)}>{title}<span className="fw-chevron" aria-hidden="true">›</span></button></h4>
    <FluidCollapse id={'motion-disclosure-'+i} open={opened===i}><div className="motion-disclosure-copy">{copy}</div></FluidCollapse>
  </div>)}</div>;
}

function MotionTabs() {
  const [tab,setTab]=React.useState(0);
  const names=['Activity','Configuration','Access'];

  const choose=i=>{setTab(i);document.getElementById('motion-tab-'+i)?.focus();};
  const onKey=(e,i)=>{
    let next;
    if(e.key==='ArrowRight')next=(i+1)%3;
    if(e.key==='ArrowLeft')next=(i+2)%3;
    if(e.key==='Home')next=0;
    if(e.key==='End')next=2;
    if(next!==undefined){e.preventDefault();choose(next);}
  };
  return <div className="motion-stage">
    <div className="fw-tabs" role="tablist" aria-label="Sample project detail">{names.map((name,i)=><button key={name} role="tab" id={'motion-tab-'+i} aria-selected={tab===i} aria-controls={'motion-tab-panel-'+i} tabIndex={tab===i?0:-1} onKeyDown={e=>onKey(e,i)} onClick={()=>setTab(i)}>{name}</button>)}</div>
    {names.map((name,i)=><div key={name} hidden={tab!==i} id={'motion-tab-panel-'+i} role="tabpanel" aria-labelledby={'motion-tab-'+i} tabIndex={0}>{tab===i&&<div className="fw-tab-panel motion-tab-body"><strong>{['Latest workspace activity','Project configuration','Project access'][i]}</strong><p>{['Sample / Preview build completed. No service connected.','Runtime: Node.js · Region: Local sandbox · Branch: main','Maintainer: edit configuration. Viewer: inspect activity.'][i]}</p></div>}</div>)}
  </div>;
}

function MotionSection() {
  const [reduced,setReduced]=React.useState(false);
  const examples=[
    ['01 / Spatial · 240 ms','A rail that makes room.','Collapse the labels, not the navigation. The selected destination stays put.',<MotionSidebar/>, 'WIDTH / 176 → 56 PX · EASE STANDARD'],
    ['02 / Overlay · 180 ms','Menus, without the drama.','A short fade and 8px arrival. Dismissal is immediate so focus never waits.',<MotionDropdown/>, 'OPACITY + TRANSLATE / 8 → 0 PX'],
    ['03 / Disclosure · 320 ms','Details that flow, not jump.','Measured content height moves the surrounding layout smoothly. Reverse direction at any point.',<MotionAccordion/>, 'MEASURED HEIGHT / 0 → CONTENT · CHEVRON / 90°'],
    ['04 / Content · 180 ms','A quieter change of context.','Panels enter once. Keyboard arrows, Home, and End move between tabs.',<MotionTabs/>, 'PANEL FADE + 8 PX · NO BOUNCE'],
    ['05 / Dialog · 180 ms','One task. A clear way back.','Edit a local workspace or confirm an archive. Focus stays inside until you finish or dismiss.',<MotionModals/>, 'NATIVE DIALOG · ESCAPE / CANCEL · FOCUS RESTORED'],
    ['06 / Popups · 180 ms','Context, not interruption.','An info popover, a focusable tooltip trigger, and dismissible notifications with a real Undo.',<MotionPopups/>, 'POPOVER · TOOLTIP · NOTIFICATION / UNDO']
  ];
  return <section className="section fw-motion" id="motion" data-reduced={reduced}>
    <SectionHeading number="04B" title="Motion with a purpose." description="Show where things go, what changed, and how to get back. Six working patterns, built for every Fieldwork scheme—not decorative loops."/>
    <div className="motion-toolbar"><p>120 MS / FEEDBACK · 180 MS / ARRIVAL · 240 MS / EXPANSION<br/>System reduced-motion preferences always take priority.</p><SwitchControl id="motion-reduce" label="Reduce demo motion" checked={reduced} onChange={setReduced}/></div>
    <div className="motion-grid">{examples.map(([label,title,description,example,spec],i)=><article id={'motion-example-'+(i+1)} className="motion-card" key={label}><div className="motion-caption"><div className="eyebrow muted">{label}</div><h3>{title}</h3><p>{description}</p></div>{example}<div className="motion-spec">{spec}</div></article>)}</div>
    <p className="section-note mono">REUSE / .fw-sidebar · .fw-popover · .fw-collapse · .fw-tabs · .fw-tab-panel — contracts in DESIGN.md, portable styles in tokens.css.</p>
  </section>;
}


// Spatial browsing is a local sample: no disk access, uploads, or persistence.
const initialFiles = [
  {id:'projects',parent:'root',name:'Projects',kind:'folder',note:'Active product work'},
  {id:'assets',parent:'root',name:'Assets',kind:'folder',note:'Shared visual resources'},
  {id:'archive',parent:'root',name:'Archive',kind:'folder',note:'Previous explorations'},
  {id:'readme',parent:'root',name:'Readme.md',kind:'MD',size:'2 KB',content:'# Workspace\n\nA place for useful things.\n\nOpen Projects to explore the Fieldwork sample. Select any file to inspect it. Everything here is local sample data.'},
  {id:'grid',parent:'root',name:'Grid-study.svg',kind:'SVG',size:'4 KB',content:'Structural grid / 8 × 8\nSquare geometry. One signal color. A shared visual language.'},
  {id:'notes',parent:'root',name:'Field-notes.txt',kind:'TXT',size:'1 KB',content:'01 / Make the structure visible.\n02 / Let the work lead.\n03 / Keep a clear way back.'},
  {id:'fieldwork',parent:'projects',name:'Fieldwork',kind:'folder',note:'Reusable interface system'},
  {id:'brief',parent:'projects',name:'Project-brief.md',kind:'MD',size:'3 KB',content:'# Fieldwork brief\n\nCreate useful software with quiet foundations, intentional contrast, and repeatable patterns.'},
  {id:'tokens',parent:'fieldwork',name:'Tokens.css',kind:'CSS',size:'8 KB',content:':root {\n  /* Sample excerpt — not the complete token library */\n  --fw-radius-panel: 0px;\n  --fw-control-height: 44px;\n  --fw-space-4: 16px;\n}'},
  {id:'spec',parent:'fieldwork',name:'Design-system.md',kind:'MD',size:'12 KB',content:'# System principles\n\nIndustrial minimalism. Technical precision. Human by nature.\n\nUse semantic colors, accessible states, and purposeful motion.'},
  {id:'symbols',parent:'assets',name:'Symbols.svg',kind:'SVG',size:'6 KB',content:'Symbol study / square, cross, and grid.\nOriginal geometric sample.'},
  {id:'old',parent:'archive',name:'Exploration-01.txt',kind:'TXT',size:'1 KB',content:'Archived concept / retain the useful parts, remove the rest.'}
];
const fileBrowserStyles = `
:root{--fw-spatial-depth:22px;--fw-spatial-tilt:-12deg}
#files,#themes,#overview,.main>.section{scroll-margin-top:90px}
.rail{overflow-y:auto;max-height:calc(100dvh - 72px)}
.fw-browser{border:1px solid var(--fw-border);background:var(--fw-raised);min-width:0}
.fw-browser button,.fw-browser input{font:12px var(--fw-mono)}
.fw-browser button{cursor:pointer}
.fw-browser button:focus-visible,.fw-browser input:focus-visible{outline:2px solid var(--fw-focus);outline-offset:-3px}
.fw-browser-top,.fw-browser-tools,.fw-browser-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px;border-bottom:1px solid var(--fw-border);flex-wrap:wrap}
.fw-browser-top{background:var(--fw-surface)}
.fw-browser-title{display:flex;align-items:center;gap:12px;font:12px var(--fw-mono);letter-spacing:.06em}
.fw-browser-signal{width:8px;height:8px;background:var(--fw-control-active)}
.fw-browser-actions{display:flex;gap:4px;flex-wrap:wrap}
.fw-browser .fb-button{border:1px solid var(--fw-muted);background:transparent;color:var(--fw-text);padding:0 12px;min-height:44px}
.fw-browser .fb-button:hover{background:var(--fw-surface)}
.fw-browser .fb-button[aria-pressed=true]{background:var(--fw-control-active);color:var(--fw-control-on);border-color:var(--fw-control-active)}
.fw-browser .fb-button:disabled{color:var(--fw-muted);border-color:var(--fw-border);cursor:not-allowed}
.fw-browser-search{display:flex;align-items:center;gap:12px;flex:1;min-width:180px;max-width:300px}
.fw-browser input{min-height:44px;min-width:0;width:100%;padding:12px;border:1px solid var(--fw-muted);background:var(--fw-background);color:var(--fw-text);box-sizing:border-box}
.fw-browser-crumbs{display:flex;align-items:center;gap:4px;flex-wrap:wrap;padding:12px 16px;border-bottom:1px solid var(--fw-border)}
.fw-browser-crumbs button{border:0;background:transparent;color:var(--fw-muted);min-height:36px;padding:0 8px}
.fw-browser-crumbs button[aria-current]{color:var(--fw-text);font-weight:bold}
.fw-browser-body{display:grid;grid-template-columns:140px minmax(0,1fr)}
.fw-browser-locations{border-right:1px solid var(--fw-border);padding:20px 8px;background:var(--fw-background)}
.fw-browser-locations>span{display:block;padding:0 8px 12px;font:10px var(--fw-mono);color:var(--fw-muted)}
.fw-browser-locations button{display:flex;align-items:center;gap:8px;text-align:left;width:100%;padding:12px 8px;min-height:44px;background:none;border:1px solid transparent;color:var(--fw-muted)}
.fw-browser-locations button[aria-current]{color:var(--fw-text);border-color:var(--fw-border);background:var(--fw-surface)}
.fw-browser-content{min-width:0;position:relative;background:radial-gradient(circle at center,var(--fw-border) 1px,transparent 1px);background-size:24px 24px}
.fw-file-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));padding:24px 16px;gap:16px;min-height:350px;align-content:start}
.fw-file-card{display:flex;flex-direction:column;align-items:center;gap:8px;min-width:0;padding:12px 4px;border:1px solid transparent;background:transparent;color:var(--fw-text);text-align:center}
.fw-file-card:hover,.fw-file-card[aria-pressed=true]{border-color:var(--fw-muted);background:var(--fw-surface)}
.fw-file-card strong{font:500 13px var(--fw-sans);overflow-wrap:anywhere;line-height:1.4}
.fw-file-card small{font:10px/1.5 var(--fw-mono);color:var(--fw-muted)}
.fw-file-art{display:block;position:relative;width:86px;height:86px;perspective:450px;margin:4px auto 10px}
.fw-file-object{position:absolute;inset:12px 6px;transform:rotateX(10deg) rotateY(var(--fw-spatial-tilt));transform-style:preserve-3d;transition:transform var(--fw-duration-expand,240ms) var(--fw-ease-standard,ease)}
.fw-file-card:hover .fw-file-object{transform:rotateX(0deg) rotateY(-4deg) translateY(-5px)}
.fw-folder-back{position:absolute;inset:3px 0 0;background:var(--fw-surface);border:1px solid var(--fw-muted)}
.fw-folder-back:before{content:'';position:absolute;width:36%;height:9px;top:-9px;left:-1px;background:var(--fw-surface);border:1px solid var(--fw-muted);border-bottom:0}
.fw-folder-paper{position:absolute;inset:12px 7px 4px;border:1px solid var(--fw-muted);background:var(--fw-raised);transform:translateZ(6px) rotate(-5deg)}
.fw-folder-front{position:absolute;inset:22px 0 -5px;background:var(--fw-surface);border:1px solid var(--fw-control-active);border-top:3px solid var(--fw-control-active);transform:translateZ(var(--fw-spatial-depth)) rotateX(-18deg);transform-origin:bottom;box-shadow:0 8px 8px var(--fw-scrim)}
.fw-document-face{position:absolute;inset:-2px 10px -2px;background:var(--fw-raised);border:1px solid var(--fw-muted);transform:translateZ(10px);box-shadow:5px 5px 0 var(--fw-surface),6px 6px 0 var(--fw-border);display:flex;flex-direction:column;justify-content:space-between;padding:10px 6px;font:10px var(--fw-mono);color:var(--fw-muted)}
.fw-document-face b{color:var(--fw-text);font-size:16px}
.fw-browser[data-view=flat] .fw-file-object{transform:none!important}
.fw-browser[data-view=flat] .fw-folder-front,.fw-browser[data-view=flat] .fw-folder-paper,.fw-browser[data-view=flat] .fw-document-face{transform:none;box-shadow:none}
.fw-browser-foot{border-top:1px solid var(--fw-border);border-bottom:0;font:10px/1.5 var(--fw-mono);color:var(--fw-muted)}
.fw-file-inspector{padding:24px;border-top:1px solid var(--fw-border);background:var(--fw-background)}
.fw-file-inspector header{display:flex;align-items:start;justify-content:space-between;gap:16px;margin-bottom:20px}
.fw-file-inspector h3{margin:8px 0;font-size:24px;overflow-wrap:anywhere}
.fw-file-inspector pre{white-space:pre-wrap;overflow-wrap:anywhere;margin:16px 0 24px;padding:20px;background:var(--fw-surface);border:1px solid var(--fw-border);font:12px/1.8 var(--fw-mono)}
.fw-browser-form{display:flex;gap:8px;align-items:end;flex-wrap:wrap;padding:16px;border-bottom:1px solid var(--fw-border)}
.fw-browser-form label{display:grid;gap:8px;flex:1;font:12px var(--fw-mono);min-width:160px}
.fw-browser-error{color:var(--fw-danger);font:12px var(--fw-mono);flex-basis:100%;margin:4px 0}
.fw-browser-empty{padding:40px 24px;min-height:250px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center}
@media(max-width:700px){.fw-browser-body{grid-template-columns:1fr}.fw-browser-locations{display:flex;gap:4px;overflow:auto;border-right:0;border-bottom:1px solid var(--fw-border);padding:8px}.fw-browser-locations>span{display:none}.fw-browser-locations button{width:auto;flex-shrink:0}.fw-file-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.fw-browser-search{max-width:none}.fw-file-inspector{padding:16px}}
@media(prefers-reduced-motion:reduce){.fw-file-object{transition:none!important;transform:none!important}.fw-folder-front,.fw-folder-paper,.fw-document-face{transform:none;box-shadow:none}}
`;
function FileArt({kind}) {
  return <span className="fw-file-art" aria-hidden="true"><span className="fw-file-object">{kind==='folder'?<><span className="fw-folder-back"/><span className="fw-folder-paper"/><span className="fw-folder-front"/></>:<span className="fw-document-face"><span>↗</span><b>{kind}</b><span>────<br/>───</span></span>}</span></span>;
}

// Dependency-free mesh inspection. Files stay in memory; no upload or persistence.
function sampleMesh() {
  const v=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
  const faces=[[0,2,1],[0,3,2],[4,5,6],[4,6,7],[0,1,5],[0,5,4],[3,7,6],[3,6,2],[1,2,6],[1,6,5],[0,4,7],[0,7,3]];
  const obj=v.map(p=>'v '+p.join(' ')).concat(faces.map(f=>'f '+f.map(i=>i+1).join(' '))).join('\n');
  return {...decodeMesh(new TextEncoder().encode(obj).buffer,'calibration.obj'),name:'Calibration cube · sample'};
}
function decodeMesh(buffer,name) {
  const triangles=[];
  const add=t=>{if(t.flat().every(Number.isFinite))triangles.push(t);else throw Error('The file contains invalid coordinates.');if(triangles.length>40000)throw Error('This lightweight viewer supports up to 40,000 triangles. Simplify the mesh and try again.');};
  if(/\.obj$/i.test(name)) {
    const vertices=[];
    for(const line of new TextDecoder().decode(buffer).split(/\r?\n/)) {
      const parts=line.split('#')[0].trim().split(/\s+/);
      if(parts[0]==='v')vertices.push(parts.slice(1,4).map(Number));
      if(parts[0]==='f') {
        const points=parts.slice(1).filter(p=>!p.startsWith('#')).map(p=>{const i=Number(p.split('/')[0]);return vertices[i<0?vertices.length+i:i-1];});
        if(points.some(p=>!p||p.length!==3))throw Error('An OBJ face references a missing vertex.');
        for(let i=1;i<points.length-1;i++)add([points[0],points[i],points[i+1]]);
      }
    }
  } else if(/\.stl$/i.test(name)) {
    const data=new DataView(buffer);
    const count=buffer.byteLength>=84?data.getUint32(80,true):0;
    if(count>0 && 84+count*50===buffer.byteLength) {
      if(count>40000)throw Error('This lightweight viewer supports up to 40,000 triangles.');
      for(let i=0;i<count;i++){const start=84+i*50+12;add([0,1,2].map(j=>[0,1,2].map(k=>data.getFloat32(start+j*12+k*4,true))));}
    } else {
      const text=new TextDecoder().decode(buffer);
      const points=[...text.matchAll(/vertex\s+([-+\deE.]+)\s+([-+\deE.]+)\s+([-+\deE.]+)/gi)].map(m=>m.slice(1).map(Number));
      if(points.length%3)throw Error('The STL has an incomplete triangle.');
      for(let i=0;i<points.length;i+=3)add(points.slice(i,i+3));
    }
  } else throw Error('Choose an OBJ or STL file. GLB, textures, and materials are not supported in this viewer.');
  if(!triangles.length)throw Error('No mesh faces found. Choose an OBJ or STL containing triangles.');
  const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  for(const t of triangles)for(const p of t)for(let k=0;k<3;k++){min[k]=Math.min(min[k],p[k]);max[k]=Math.max(max[k],p[k]);}
  const extent=Math.max(...max.map((n,i)=>n-min[i]));
  if(!extent)throw Error('The model has no measurable size.');
  return {name,triangles:triangles.map(t=>t.map(p=>p.map((n,i)=>(n-(min[i]+max[i])/2)*2/extent)))};
}
function ModelViewer({idPrefix = 'model'} = {}) {
  const [mesh,setMesh]=React.useState(sampleMesh);
  const [rotation,setRotation]=React.useState([-.35,.65]);
  const [zoom,setZoom]=React.useState(100);
  const [wire,setWire]=React.useState(false);
  const [error,setError]=React.useState('');
  const [busy,setBusy]=React.useState(false);
  const canvas=React.useRef(null),drag=React.useRef(null);
  const reset=()=>{setRotation([-.35,.65]);setZoom(100);};
  React.useEffect(()=>{
    const el=canvas.current;
    const draw=()=>{
      const box=el.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
      el.width=box.width*dpr;el.height=box.height*dpr;
      const ctx=el.getContext('2d');ctx.scale(dpr,dpr);
      const css=getComputedStyle(el),ink=css.getPropertyValue('--fw-muted').trim(),accent=css.getPropertyValue('--fw-accent').trim(),surface=css.getPropertyValue('--fw-raised').trim();
      const w=box.width,h=box.height,scale=Math.min(w,h)*.23*zoom/100;
      ctx.strokeStyle=ink;ctx.globalAlpha=.16;ctx.lineWidth=1;
      for(let x=w/2%32;x<w;x+=32){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
      for(let y=h/2%32;y<h;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}ctx.globalAlpha=1;
      const [a,b]=rotation;
      const transform=p=>{const x=p[0]*Math.cos(b)+p[2]*Math.sin(b),z=-p[0]*Math.sin(b)+p[2]*Math.cos(b);return [x,p[1]*Math.cos(a)-z*Math.sin(a),p[1]*Math.sin(a)+z*Math.cos(a)];};
      const faces=mesh.triangles.map(t=>t.map(transform)).sort((a,b)=>a.reduce((s,p)=>s+p[2],0)-b.reduce((s,p)=>s+p[2],0));
      for(const t of faces){
        const projected=t.map(p=>[w/2+p[0]*scale*4/(4-p[2]),h/2-p[1]*scale*4/(4-p[2])]);
        ctx.beginPath();projected.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();
        if(!wire){ctx.fillStyle=surface;ctx.fill();ctx.fillStyle=accent;const u=t[1].map((n,i)=>n-t[0][i]),v=t[2].map((n,i)=>n-t[0][i]);const normal=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];const len=Math.hypot(...normal)||1;ctx.globalAlpha=.25+.5*Math.abs((normal[0]*.3+normal[1]*.6+normal[2]*.7)/len);ctx.fill();ctx.globalAlpha=1;}
        ctx.strokeStyle=wire?accent:ink;ctx.lineWidth=wire?1:.5;ctx.stroke();
      }
    };
    draw();const observer=new ResizeObserver(draw);observer.observe(el);
    return()=>observer.disconnect();
  });
  async function load(file) {
    if(!file)return;
    setError('');setBusy(true);
    try {if(file.size>10*1024*1024)throw Error('Choose a file smaller than 10 MB.');const next=decodeMesh(await file.arrayBuffer(),file.name);setMesh(next);reset();}
    catch(e){setError(e.message);}finally{setBusy(false);}
  }
  return <div className="fw-model-viewer" id={idPrefix+'-inspector'}>
    <style>{`.fw-model-viewer{border:1px solid var(--fw-border);margin-bottom:32px;background:var(--fw-surface)}.fw-model-head,.fw-model-toolbar,.fw-model-footer{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px;border-bottom:1px solid var(--fw-border);flex-wrap:wrap}.fw-model-head h3{margin:0;font-size:18px}.fw-model-toolbar button{min-height:44px}.fw-model-canvas{width:100%;height:400px;display:block;touch-action:none;cursor:grab;background:var(--fw-background)}.fw-model-canvas:active{cursor:grabbing}.fw-model-footer{border-top:1px solid var(--fw-border);border-bottom:0;font-size:12px}.fw-model-toolbar label{display:flex;gap:12px;align-items:center}.fw-model-file{max-width:100%;font:inherit}.fw-model-error{padding:16px;color:var(--fw-danger);background:var(--fw-danger-bg)}.fw-model-help{padding:0 16px;color:var(--fw-muted);font-size:13px}.fw-model-viewer :focus-visible{outline:2px solid var(--fw-focus);outline-offset:3px}@media(max-width:600px){.fw-model-canvas{height:300px}.fw-model-toolbar{align-items:flex-start;flex-direction:column}}`}</style>
    <div className="fw-model-head"><div><span className="eyebrow muted">LOCAL / MESH INSPECTOR</span><h3>3D model viewer</h3></div><span className="mono muted">OBJ + STL / NO UPLOAD</span></div>
    <div className="fw-model-toolbar"><label className="mono">Open model <input className="fw-model-file" aria-label="Open 3D model" type="file" accept=".obj,.stl" disabled={busy} onChange={e=>{load(e.target.files[0]);e.target.value='';}}/></label><button className="btn secondary" type="button" onClick={()=>{setMesh(sampleMesh());setError('');reset();}}>Load sample</button></div>
    {error&&<div className="fw-model-error" role="alert">{error} Your current model is unchanged.</div>}
    <canvas ref={canvas} className="fw-model-canvas" tabIndex="0" aria-label="Interactive 3D model. Drag to orbit. Arrow keys rotate; plus and minus zoom; Home resets view." onPointerDown={e=>{e.currentTarget.focus();e.currentTarget.setPointerCapture(e.pointerId);drag.current=[e.clientX,e.clientY];}} onPointerMove={e=>{if(!drag.current)return;const dx=e.clientX-drag.current[0],dy=e.clientY-drag.current[1];drag.current=[e.clientX,e.clientY];setRotation(([a,b])=>[a+dy*.01,b+dx*.01]);}} onPointerUp={()=>drag.current=null} onPointerCancel={()=>drag.current=null} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home'].includes(e.key))e.preventDefault();if(e.key.startsWith('Arrow'))setRotation(([a,b])=>[a+(e.key==='ArrowUp'?-.1:e.key==='ArrowDown'?.1:0),b+(e.key==='ArrowLeft'?-.1:e.key==='ArrowRight'?.1:0)]);if(e.key==='+'||e.key==='=')setZoom(z=>Math.min(200,z+10));if(e.key==='-')setZoom(z=>Math.max(50,z-10));if(e.key==='Home')reset();}}>Your browser needs Canvas 2D to display this model.</canvas>
    <div className="fw-model-toolbar"><button id={idPrefix+'-wire'} className="btn secondary" type="button" aria-pressed={wire} onClick={()=>setWire(v=>!v)}>{wire?'✓ Wireframe':'Wireframe'}</button><label className="mono" htmlFor={idPrefix+'-zoom'}>Zoom <input id={idPrefix+'-zoom'} className="fw-range" style={{'--fw-range-fill':`${(zoom-50)/150*100}%`,width:'min(180px,40vw)',flexShrink:0}} type="range" min="50" max="200" step="10" value={zoom} onChange={e=>setZoom(Number(e.target.value))}/><output htmlFor={idPrefix+'-zoom'}>{zoom}%</output></label><button id={idPrefix+'-reset'} className="btn secondary" type="button" onClick={reset}>Reset view</button></div>
    <div className="fw-model-footer" role="status"><span>{busy?'Reading local file…':mesh.name}</span><span>{mesh.triangles.length.toLocaleString()} TRIANGLES · {wire?'WIREFRAME':'SOLID'}</span></div>
    <p className="fw-model-help">Drag or use arrow keys to orbit · + / − to zoom · Home to reset. Geometry only; no materials or textures. Up to 10 MB / 40,000 triangles. Files remain local and reset on reload.</p>
  </div>;
}
function FileBrowser() {
  return <section className="section" id="files">
    <SectionHeading number="04C" title="Inspect the shape of your work." description="Open a local OBJ or STL, orbit the geometry, and inspect its mesh. No uploads, accounts, or external services."/>
    <ReferenceErrorBoundary viewer><ModelViewer/></ReferenceErrorBoundary>
    <details className="fw-spatial-example"><summary className="mono" style={{padding:'16px 0',cursor:'pointer'}}>Related pattern / spatial folder browser</summary><SpatialFileBrowser/></details>
  </section>;
}

function SpatialFileBrowser() {
  const [files,setFiles]=React.useState(initialFiles);
  const [trail,setTrail]=React.useState(['root']);
  const [cursor,setCursor]=React.useState(0);
  const [query,setQuery]=React.useState('');
  const [view,setView]=React.useState('spatial');
  const [selected,setSelected]=React.useState(null);
  const [creating,setCreating]=React.useState(false);
  const [name,setName]=React.useState('');
  const [error,setError]=React.useState('');
  const [notice,setNotice]=React.useState('Sample workspace / changes reset on reload.');
  const folder=trail[cursor];
  const current=files.find(f=>f.id===folder);
  const file=files.find(f=>f.id===selected);
  const children=files.filter(f=>f.parent===folder);
  const visible=children.filter(f=>f.name.toLowerCase().includes(query.toLowerCase()));
  const crumbs=[];
  let ancestor=current;
  while(ancestor){crumbs.unshift(ancestor);ancestor=files.find(f=>f.id===ancestor.parent);}
  const openFolder=id=>{
    if(id!==folder){setTrail(t=>[...t.slice(0,cursor+1),id]);setCursor(cursor+1);}
    setQuery('');setSelected(null);setCreating(false);setError('');
    requestAnimationFrame(()=>document.getElementById('file-location-title')?.focus({preventScroll:true}));
  };
  const travel=offset=>{setCursor(cursor+offset);setQuery('');setSelected(null);setCreating(false);};
  const inspect=id=>{setSelected(id);setName(files.find(f=>f.id===id).name);setError('');setCreating(false);requestAnimationFrame(()=>document.getElementById('file-detail-title')?.focus({preventScroll:true}));};
  const closeDetail=()=>{const id=selected;setSelected(null);requestAnimationFrame(()=>document.getElementById('file-'+id)?.focus({preventScroll:true}));};
  const validate=(value,parent,except)=>!value.trim()?'Enter a name.':/[\\/]/.test(value)?'Use a name without slashes.':files.some(f=>f.parent===parent&&f.id!==except&&f.name.toLowerCase()===value.trim().toLowerCase())?'That name already exists in this folder.':'';
  const create=e=>{e.preventDefault();const problem=validate(name,folder);setError(problem);if(problem)return;setFiles(f=>[...f,{id:'folder-'+Date.now(),parent:folder,name:name.trim(),kind:'folder',note:'New local folder'}]);setNotice('Created '+name.trim()+'.');setCreating(false);setName('');requestAnimationFrame(()=>document.getElementById('new-folder')?.focus());};
  const rename=e=>{e.preventDefault();const problem=validate(name,file.parent,file.id);setError(problem);if(problem)return;setFiles(fs=>fs.map(f=>f.id===file.id?{...f,name:name.trim()}:f));setNotice('Renamed to '+name.trim()+'.');};
  return <section className="section" 
 id="spatial-files"
>
    <SectionHeading number="04C.1"
 title="A little room to explore." description="Spatial files, familiar navigation. Local sample folders with a flat alternative. This example does not read your disk."/>
    <div className="fw-browser" data-view={view}>
      <div className="fw-browser-top"><div className="fw-browser-title"><span className="fw-browser-signal"/>FIELDWORK / EXPLORER</div><span className="eyebrow muted">LOCAL SAMPLE · NO DISK ACCESS</span></div>
      <div className="fw-browser-tools"><div className="fw-browser-actions"><button className="fb-button" id="files-back" aria-label="Back to previous folder" disabled={cursor===0} onClick={()=>travel(-1)}>←</button><button className="fb-button" id="files-forward" aria-label="Forward to next folder" disabled={cursor===trail.length-1} onClick={()=>travel(1)}>→</button><button className="fb-button" aria-label="Up one folder" disabled={folder==='root'} onClick={()=>openFolder(current?.parent||'root')}>↑</button></div><label className="fw-browser-search"><span className="fw-search-label">Search current folder</span><input id="file-search" placeholder="Search this folder…" value={query} onChange={e=>setQuery(e.target.value)}/></label><div className="fw-browser-actions" role="group" aria-label="File display">{['spatial','flat'].map(v=><button key={v} id={'files-view-'+v} className="fb-button" aria-pressed={view===v} onClick={()=>setView(v)}>{v==='spatial'?'3D':'Flat'}</button>)}<button id="new-folder" className="fb-button" onClick={()=>{setCreating(!creating);setName('');setError('');setSelected(null);requestAnimationFrame(()=>document.getElementById('folder-name')?.focus());}}>+ Folder</button></div></div>
      <nav className="fw-browser-crumbs" aria-label="Folder breadcrumbs"><button onClick={()=>openFolder('root')} aria-current={folder==='root'?'page':undefined}>Workspace</button>{crumbs.map(c=><React.Fragment key={c.id}><span aria-hidden="true">/</span><button onClick={()=>openFolder(c.id)} aria-current={c.id===folder?'page':undefined}>{c.name}</button></React.Fragment>)}</nav>
      {creating&&<form className="fw-browser-form" onSubmit={create}><label htmlFor="folder-name">New folder name<input id="folder-name" value={name} onChange={e=>setName(e.target.value)} maxLength={80} aria-invalid={!!error} aria-describedby={error?'folder-error':undefined}/></label><button className="fb-button" type="submit">Create folder</button><button className="fb-button" type="button" onClick={()=>{setCreating(false);document.getElementById('new-folder')?.focus();}}>Cancel</button>{error&&<p id="folder-error" role="alert" className="fw-browser-error">{error}</p>}</form>}
      <div className="fw-browser-body"><nav className="fw-browser-locations" aria-label="File locations"><span>LOCATIONS</span>{[{id:'root',name:'Workspace'},...files.filter(f=>f.parent==='root'&&f.kind==='folder')].map(f=><button key={f.id} id={'location-'+f.id} aria-current={folder===f.id?'page':undefined} onClick={()=>openFolder(f.id)}><span aria-hidden="true">{f.id==='root'?'⊞':'▱'}</span>{f.name}</button>)}</nav><div className="fw-browser-content"><h3 className="fw-file-location-title" id="file-location-title" tabIndex={-1}>{current?.name||'Workspace'} contents</h3>{visible.length?<div className="fw-file-grid">{visible.map(f=><button key={f.id} id={'file-'+f.id} className="fw-file-card" aria-label={(f.kind==='folder'?'Open folder ':'Inspect file ')+f.name} aria-pressed={selected===f.id} onClick={()=>f.kind==='folder'?openFolder(f.id):inspect(f.id)}><FileArt kind={f.kind}/><strong>{f.name}{f.starred?' ★':''}</strong><small>{f.kind==='folder'?files.filter(n=>n.parent===f.id).length+' items':f.kind+' / '+f.size}</small></button>)}</div>:<div className="fw-browser-empty"><strong>{query?'No matching files.':'An open space.'}</strong><span className="muted">{query?'Try another name or clear your search.':'Create a folder to start organizing.'}</span>{query?<button className="fb-button" onClick={()=>setQuery('')}>Clear search</button>:<button className="fb-button" onClick={()=>{setCreating(true);setName('');requestAnimationFrame(()=>document.getElementById('folder-name')?.focus());}}>Create a folder</button>}</div>}</div></div>
      {file&&<aside className="fw-file-inspector" aria-labelledby="file-detail-title"><header><div><span className="eyebrow muted">FILE INSPECTOR / {file.kind} / {file.size}</span><h3 id="file-detail-title" tabIndex={-1}>{file.name}</h3></div><button id="file-close" className="fb-button" onClick={closeDetail}>Close ×</button></header><button id="file-star" className="fb-button" aria-pressed={!!file.starred} onClick={()=>setFiles(fs=>fs.map(f=>f.id===file.id?{...f,starred:!f.starred}:f))}>{file.starred?'★ Starred':'☆ Star file'}</button><pre>{file.content}</pre><form className="fw-browser-form" onSubmit={rename}><label htmlFor="file-rename">Rename file<input id="file-rename" value={name} onChange={e=>setName(e.target.value)} maxLength={80} aria-invalid={!!error} aria-describedby={error?'file-error':undefined}/></label><button id="file-save" className="fb-button" type="submit">Save name</button>{error&&<p id="file-error" className="fw-browser-error" role="alert">{error}</p>}</form></aside>}
      <div className="fw-browser-foot"><span>{visible.length} OF {children.length} ITEMS / {view==='spatial'?'SPATIAL VIEW':'FLAT VIEW'}</span><span role="status" id="file-status">{notice}</span></div>
    </div><p className="section-note mono">SINGLE CLICK / OPEN FOLDER OR INSPECT FILE · BACK / FORWARD / BREADCRUMBS · KEYBOARD / TAB + ENTER</p>
  </section>;
}


// Standalone application chrome: local simulation, no native OS integration.
const windowStyles = `
.fw-window{border:1px solid var(--fw-muted);background:var(--fw-raised);color:var(--fw-text);position:relative;min-width:0}
.fw-window-titlebar{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--fw-border);background:var(--fw-surface);min-height:44px;padding-left:16px;gap:8px}
.fw-window-title{font:12px var(--fw-mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;flex:1}
.fw-window-actions{display:flex;flex-shrink:0}.fw-window button{cursor:pointer;font:12px var(--fw-mono);color:var(--fw-text)}
.fw-window-actions button{width:44px;min-height:44px;border:0;border-left:1px solid var(--fw-border);background:transparent;font-size:18px}
.fw-window button:hover{background:var(--fw-surface)}.fw-window-actions button:last-child:hover{background:var(--fw-danger-bg);color:var(--fw-danger)}
.fw-window-menubar{display:flex;gap:0;padding:0;border:0;flex-wrap:nowrap;flex-shrink:0;margin-right:auto}
.fw-window-menu-anchor{position:relative}.fw-window-menu-trigger{min-height:44px;padding:0 12px;border:0;background:transparent}.fw-window-menu-trigger[aria-expanded=true]{background:var(--fw-control-active);color:var(--fw-control-on)}
.fw-window-menu{position:absolute;top:100%;left:0;z-index:10;min-width:200px;max-width:calc(100vw - 80px);padding:4px;background:var(--fw-raised);border:1px solid var(--fw-muted);box-shadow:var(--fw-shadow-overlay)}
.fw-window-menu button{display:block;min-height:44px;width:100%;text-align:left;border:0;background:transparent;padding:8px 12px}
.fw-window-body{padding:24px;min-height:240px}.fw-window[data-maximized=true] .fw-window-body{min-height:400px}.fw-window-body h3{font-size:24px;font-weight:500;margin:12px 0}.fw-window-body p{color:var(--fw-muted);font-size:14px;line-height:1.6}
.fw-window-document{border:1px solid var(--fw-border);padding:16px;margin-top:24px}.fw-window-status{padding:12px 16px;border-top:1px solid var(--fw-border);font:12px/1.5 var(--fw-mono);color:var(--fw-muted)}
.fw-window :focus-visible{outline:2px solid var(--fw-focus);outline-offset:-3px}
@media(max-width:640px){.fw-window-body{padding:16px}.fw-window-titlebar{padding-left:8px;gap:4px}.fw-window-title{flex:0 0 18px;font-size:0}.fw-window-title:before{content:'◫';font-size:14px}.fw-window-menu-trigger{padding:0 8px}.fw-window-menu{min-width:170px}.fw-window-actions button{width:36px}}
`;
function ApplicationWindow() {
  const [menu,setMenu]=React.useState(null);
  const [closed,setClosed]=React.useState(false);
  const [minimized,setMinimized]=React.useState(false);
  const [maximized,setMaximized]=React.useState(false);
  const [grid,setGrid]=React.useState(true);
  const [documentName,setDocumentName]=React.useState('Untitled model');
  const [notice,setNotice]=React.useState('Ready · local demonstration');
  const [help,setHelp]=React.useState(false);
  const wrapper=React.useRef(null);
  const triggers=React.useRef({});
  const reopen=React.useRef(null);
  const closeMenu=()=>{const name=menu;setMenu(null);triggers.current[name]?.focus();};
  React.useEffect(()=>{
    if(!menu)return;
    const outside=e=>{if(!wrapper.current?.contains(e.target))setMenu(null);};
    document.addEventListener('pointerdown',outside);
    return()=>document.removeEventListener('pointerdown',outside);
  },[menu]);
  const run=action=>{setMinimized(false);action();closeMenu();};
  const actions={
    File:[['New document',()=>{setDocumentName('Untitled model');setHelp(false);setNotice('New local document created.');}],['Open sample',()=>{setDocumentName('Bracket-study.obj');setHelp(false);setNotice('Sample document opened. No disk access.');}]],
    Options:[[grid?'✓ Show construction grid':'Show construction grid',()=>{setGrid(v=>!v);setNotice(grid?'Construction grid hidden.':'Construction grid shown.');}],['Reset window layout',()=>{setMaximized(false);setMinimized(false);setGrid(true);setNotice('Window layout reset.');}]],
    Help:[['Application help',()=>{setHelp(true);setNotice('Help opened in the document area.');}],['About this example',()=>{setHelp(true);setNotice('Fieldwork application chrome · local simulation only.');}]]
  };
  return <section className="section" id="window">
    <style>{windowStyles}</style>
    <SectionHeading number="04D" title="A frame for focused work." description="Standalone application chrome, built from Fieldwork tokens. File, Options, and Help menus with simulated minimize, maximize, and close controls."/>
    <p className="section-note mono">LOCAL DEMO / These controls affect this example, not your operating-system window.</p>
    {closed ? <div className="fw-panel"><h3>Example window closed.</h3><p>Your sample document is retained.</p><button id="window-reopen" className="btn secondary" ref={reopen} onClick={()=>{setClosed(false);requestAnimationFrame(()=>document.getElementById('window-minimize')?.focus());}}>Reopen window</button></div> :
    <div className="fw-window" id="window-frame" data-maximized={maximized}>
      <div className="fw-window-titlebar">
        <div className="fw-window-menubar" id="window-menu" ref={wrapper} aria-label="Application commands" onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setMenu(null);}} onKeyDown={e=>{if(e.key==='Escape'&&menu){e.preventDefault();closeMenu();}}}>
          {Object.entries(actions).map(([name,items])=><div className="fw-window-menu-anchor" key={name}>
            <button className="fw-window-menu-trigger" id={'window-menu-'+name.toLowerCase()} ref={el=>triggers.current[name]=el} aria-expanded={menu===name} aria-controls={'window-options-'+name} onClick={()=>setMenu(menu===name?null:name)}>{name}</button>
            {menu===name&&<div className="fw-window-menu" id={'window-options-'+name} role="group" aria-label={name+' commands'}>{items.map(([label,action],i)=><button id={'window-command-'+name.toLowerCase()+'-'+i} key={i} aria-pressed={name==='Options'&&i===0?grid:undefined} onClick={()=>run(action)}>{label}</button>)}</div>}
          </div>)}
        </div>
      <span className="fw-window-title" title={'Fieldwork / '+documentName}>◫ Fieldwork / {documentName}</span>
      <div className="fw-window-actions">
        <button id="window-minimize" aria-label={minimized?'Restore window':'Minimize window'} aria-expanded={!minimized} aria-controls="window-content" onClick={()=>{setMinimized(v=>!v);setMenu(null);}}>{minimized?'↥':'−'}</button>
        <button id="window-maximize" aria-label={maximized?'Restore window size':'Maximize example window'} aria-pressed={maximized} onClick={()=>{setMaximized(v=>!v);setMinimized(false);}}>{maximized?'❐':'□'}</button>
        <button id="window-close" aria-label="Close example window" onClick={()=>{setClosed(true);setMenu(null);requestAnimationFrame(()=>reopen.current?.focus());}}>×</button>
      </div></div>
      <div id="window-content" hidden={minimized}>
        <div className="fw-window-body" id="window-document" style={grid?{backgroundImage:'linear-gradient(var(--fw-border) 1px,transparent 1px),linear-gradient(90deg,var(--fw-border) 1px,transparent 1px)',backgroundSize:'32px 32px'}:undefined}>
          <div className="fw-window-document" style={{background:'var(--fw-raised)'}}><span className="eyebrow muted">{help?'APPLICATION / HELP':'SAMPLE / DOCUMENT'}</span><h3>{help?'Work within the frame.':documentName}</h3>
          <p>{help?'Use File to create a document or open a sample. Options controls the grid and window layout. Tab moves through commands; Escape closes an open menu. No files are saved or uploaded.':'A quiet work surface, familiar application commands, and a clear window boundary. Open a sample from File to change this shared document.'}</p>
          {help&&<button className="btn secondary" id="window-help-back" onClick={()=>{setHelp(false);triggers.current.Help?.focus();}}>Back to document</button>}</div>
        </div><div className="fw-window-status" role="status" id="window-status">{notice} · {maximized?'Expanded':'Standard'} layout</div>
      </div>
    </div>}
  </section>;
}

const phoneStyles = `
.fw-phone-stage{display:grid;grid-template-columns:minmax(0,430px) minmax(180px,1fr);gap:var(--fw-space-8);align-items:start}
.fw-phone{border:1px solid var(--fw-muted);background:var(--fw-background);min-width:0;position:relative;font:16px/1.5 var(--fw-sans);color:var(--fw-text)}
.fw-phone *{box-sizing:border-box}.fw-phone [hidden]{display:none!important}
.fw-phone-top,.fw-phone-bottom{display:flex;align-items:center;justify-content:space-between;padding:var(--fw-space-3) var(--fw-space-4);border-bottom:1px solid var(--fw-border);background:var(--fw-raised)}
.fw-phone-brand{font:600 14px var(--fw-mono);letter-spacing:var(--fw-tracking-label)}
.fw-phone-body{height:640px;overflow-y:auto;overscroll-behavior:contain;padding:var(--fw-space-4);scroll-padding:var(--fw-space-4)}
.fw-phone h3{font:500 32px/1.15 var(--fw-sans);letter-spacing:var(--fw-tracking-heading);margin:var(--fw-space-3) 0 var(--fw-space-4)}
.fw-phone h4{font:500 20px/1.3 var(--fw-sans);margin:var(--fw-space-4) 0 var(--fw-space-2)}
.fw-phone p{margin:var(--fw-space-2) 0 var(--fw-space-4)}
.fw-phone small,.fw-phone-caption{font:12px/1.5 var(--fw-mono);color:var(--fw-muted)}
.fw-phone button,.fw-phone input,.fw-phone select,.fw-phone textarea{font:inherit}
.fw-phone button{cursor:pointer}.fw-phone button:disabled{cursor:not-allowed}
.fw-phone :focus-visible{outline:2px solid var(--fw-focus);outline-offset:2px}
.fw-phone-input{display:block;width:100%;min-height:44px;padding:var(--fw-space-3);background:var(--fw-raised);border:1px solid var(--fw-muted);border-radius:var(--fw-radius-control);color:var(--fw-text);margin:var(--fw-space-2) 0 var(--fw-space-4)}
.fw-phone label{display:block}.fw-phone-row{display:flex;align-items:center;justify-content:space-between;gap:var(--fw-space-3)}
.fw-phone-metrics{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--fw-border);margin:var(--fw-space-4) 0}
.fw-phone-metrics>div{padding:var(--fw-space-3);border-right:1px solid var(--fw-border)}.fw-phone-metrics>div:last-child{border:0}.fw-phone-metrics strong{display:block;font-size:24px;font-weight:500}
.fw-phone-filters{display:flex;gap:var(--fw-space-2);margin-bottom:var(--fw-space-4)}
.fw-phone-quiet{background:transparent;border:1px solid var(--fw-border);color:var(--fw-text);padding:var(--fw-space-2) var(--fw-space-3);min-height:44px;border-radius:var(--fw-radius-control)}
.fw-phone-quiet[aria-pressed=true]{background:var(--fw-control-active);color:var(--fw-control-on);border-color:var(--fw-control-active)}
.fw-phone-card{display:block;text-align:left;width:100%;color:var(--fw-text);background:var(--fw-raised);border:1px solid var(--fw-border);padding:var(--fw-space-4);margin-bottom:var(--fw-space-3)}
.fw-phone-card:hover{border-color:var(--fw-muted)}.fw-phone-card strong{display:block;font-weight:500;font-size:19px;margin:var(--fw-space-2) 0}.fw-phone-card .fw-phone-row{font:12px var(--fw-mono)}
.fw-phone-tag{font:12px var(--fw-mono);padding:var(--fw-space-1) var(--fw-space-2);background:var(--fw-surface);color:var(--fw-muted)}
.fw-phone-tag[data-done=true]{color:var(--fw-success);background:var(--fw-success-bg)}
.fw-phone-check{display:flex!important;align-items:center;gap:var(--fw-space-3);min-height:56px;border-bottom:1px solid var(--fw-border)}
.fw-phone-check input{width:24px;height:24px;accent-color:var(--fw-control-active);flex-shrink:0}
.fw-phone-bottom{border-bottom:0;border-top:1px solid var(--fw-border);padding:var(--fw-space-2);gap:var(--fw-space-1)}
.fw-phone-bottom button{flex:1;min-width:0;min-height:56px;border:0;border-top:2px solid transparent;color:var(--fw-muted);background:transparent;font:12px var(--fw-mono)}
.fw-phone-bottom button[aria-current=page]{border-color:var(--fw-control-active);color:var(--fw-text);background:var(--fw-surface)}
.fw-phone-bottom span{display:block;font:20px var(--fw-sans);margin-bottom:var(--fw-space-1)}
.fw-phone-notice{font:12px/1.5 var(--fw-mono);padding:var(--fw-space-3);border-left:2px solid var(--fw-info);background:var(--fw-info-bg);color:var(--fw-info);margin:var(--fw-space-3) 0}
.fw-phone .btn{font:600 13px var(--fw-mono);min-height:44px}.fw-phone .fw-model-viewer{margin-bottom:0}.fw-phone .fw-model-canvas{height:260px}.fw-phone .fw-model-toolbar{flex-direction:column;align-items:flex-start}.fw-phone .fw-model-head{gap:var(--fw-space-2)}.fw-phone .fw-model-file{width:100%}.fw-phone .fw-model-toolbar label{display:flex;flex-wrap:wrap;max-width:100%}
.fw-phone-dialog{width:min(400px,calc(100vw - 32px));max-height:85dvh;overflow-y:auto;background:var(--fw-raised);color:var(--fw-text);border:1px solid var(--fw-muted);padding:var(--fw-space-6);font:16px/1.5 var(--fw-sans)}
.fw-phone-dialog::backdrop{background:var(--fw-scrim)}.fw-phone-dialog h3{margin-top:0}.fw-phone-dialog label{display:block}.fw-phone-dialog .btn{min-height:44px}
.fw-phone-patterns{border-top:1px solid var(--fw-border);padding-top:var(--fw-space-4)}.fw-phone-patterns li{margin-bottom:var(--fw-space-4);color:var(--fw-muted)}
@media(max-width:1100px){.fw-phone-stage{grid-template-columns:minmax(0,430px);justify-content:center}}
@media(max-width:480px){.fw-phone-body{height:590px;padding:var(--fw-space-3)}.fw-phone-top{padding:var(--fw-space-3)}.fw-phone .fw-model-toolbar{padding:var(--fw-space-3)}.fw-phone .fw-model-toolbar label{gap:var(--fw-space-2)}}
`;

const phoneInitialJobs = [
  {id:'WO-024',title:'Inspect drive assembly',area:'North plant / Line 02',priority:'High',done:false,checks:[false,false,false],note:''},
  {id:'WO-025',title:'Check coolant housing',area:'North plant / Line 04',priority:'Normal',done:false,checks:[true,false,false],note:''},
  {id:'WO-023',title:'Verify mounting plate',area:'Workshop / Bench 03',priority:'Normal',done:true,checks:[true,true,true],note:'Mounting points verified.'}
];
function PhoneApplication({scheme,mode,onScheme,onMode}) {
  const [jobs,setJobs]=React.useState(phoneInitialJobs);
  const [tab,setTab]=React.useState('Work');
  const [selected,setSelected]=React.useState(null);
  const [query,setQuery]=React.useState('');
  const [filter,setFilter]=React.useState('Open');
  const [events,setEvents]=React.useState([]);
  const [alerts,setAlerts]=React.useState(true);
  const [notice,setNotice]=React.useState('');
  const [draft,setDraft]=React.useState({title:'',area:'',priority:'Normal'});
  const [formError,setFormError]=React.useState('');
  const modal=React.useRef(null),addButton=React.useRef(null),heading=React.useRef(null),body=React.useRef(null);
  const job=jobs.find(item=>item.id===selected);
  const openCount=jobs.filter(item=>!item.done).length;
  const patch=(id,change)=>setJobs(old=>old.map(item=>item.id===id?{...item,...change}:item));
  const changeTab=next=>{setTab(next);setNotice('');};
  React.useEffect(()=>{heading.current?.focus({preventScroll:true});if(body.current)body.current.scrollTop=0;},[tab,selected]);
  const log=(text,id,undo)=>{setEvents(old=>[{key:Date.now()+Math.random(),text,id,undo},...old]);if(alerts)setNotice(text);};
  const complete=()=>{patch(job.id,{done:true});log('Completed '+job.title,job.id,true);};
  const visible=jobs.filter(item=>(filter==='All'||(filter==='Done'?item.done:!item.done))&&(item.title+' '+item.id+' '+item.area).toLowerCase().includes(query.toLowerCase()));
  const addJob=event=>{event.preventDefault();if(!draft.title.trim()||!draft.area.trim()){setFormError('Enter a work order name and location.');return;}
    const id='WO-'+String(Math.max(...jobs.map(item=>Number(item.id.slice(3))))+1).padStart(3,'0');
    setJobs(old=>[...old,{...draft,title:draft.title.trim(),area:draft.area.trim(),id,done:false,checks:[false,false,false],note:''}]);
    log('Created '+draft.title.trim(),id,false);setDraft({title:'',area:'',priority:'Normal'});setFilter('Open');setQuery('');setSelected(id);modal.current.close();
  };
  return <section className="section" id="phone">
    <style>{phoneStyles}</style>
    <SectionHeading number="04E" title="The system. In your pocket." description="Fieldwork Inspect / a connected phone-app example for work orders, geometry review, and field notes. Sample records; everything stays in memory."/>
    <div className="fw-phone-stage">
      <div className="fw-phone" id="phone-demo" aria-label="Fieldwork Inspect phone application">
        <header className="fw-phone-top"><span className="fw-phone-brand">↗ FIELDWORK <small>/ INSPECT</small></span><span className="fw-phone-tag">LOCAL DEMO</span></header>
        <div className="fw-phone-body" ref={body}>
          <div hidden={tab!=='Work'}>
            {!job ? <>
              <div className="fw-phone-row"><span className="fw-phone-caption">NORTH PLANT / OPERATIONS</span><button id="phone-add" ref={addButton} className="fw-phone-quiet" aria-label="New work order" onClick={()=>{setFormError('');modal.current.showModal();}}>＋ New</button></div>
              <h3 ref={tab==='Work'?heading:null} tabIndex="-1">Work orders<span style={{color:'var(--fw-accent)'}}>.</span></h3>
              <p className="muted">A clear view of what needs doing.</p>
              <div className="fw-phone-metrics"><div><strong id="phone-open-count">{openCount}</strong><small>OPEN</small></div><div><strong>{jobs.filter(item=>item.done).length}</strong><small>DONE</small></div><div><strong>{jobs.filter(item=>!item.done&&item.priority==='High').length}</strong><small>PRIORITY</small></div></div>
              <label className="fw-phone-caption" htmlFor="phone-search">FIND A WORK ORDER</label><input id="phone-search" className="fw-phone-input" type="search" placeholder="Name, location, or ID" value={query} onChange={e=>setQuery(e.target.value)}/>
              <div className="fw-phone-filters" aria-label="Work order filters">{['Open','Done','All'].map(value=><button id={'phone-filter-'+value.toLowerCase()} key={value} className="fw-phone-quiet" aria-pressed={filter===value} onClick={()=>setFilter(value)}>{value}</button>)}</div>
              <div id="phone-job-list">{visible.map(item=><button id={'phone-job-'+item.id} className="fw-phone-card" key={item.id} onClick={()=>setSelected(item.id)}><span className="fw-phone-row"><span>{item.id} / {item.priority.toUpperCase()}</span><span className="fw-phone-tag" data-done={item.done}>{item.done?'✓ Done':'○ Open'}</span></span><strong>{item.title}</strong><span className="fw-phone-row"><span>{item.area}</span><span aria-hidden="true">↗</span></span></button>)}</div>
              {!visible.length&&<div className="fw-phone-card"><h4>No matching work orders</h4><p>Try another search or show every record.</p><button className="fw-phone-quiet" id="phone-clear" onClick={()=>{setQuery('');setFilter('All');}}>Clear filters</button></div>}
            </> : <>
              <button id="phone-back" className="fw-phone-quiet" onClick={()=>setSelected(null)}>← Work orders</button>
              <p className="fw-phone-caption">{job.id} / {job.priority.toUpperCase()} PRIORITY</p>
              <h3 id="phone-detail-title" ref={tab==='Work'?heading:null} tabIndex="-1">{job.title}</h3><p className="muted">{job.area}</p>
              <span className="fw-phone-tag" data-done={job.done} id="phone-job-status">{job.done?'✓ Done':'○ Open'}</span>
              <h4>Inspection checklist</h4><fieldset style={{border:0,padding:0,margin:0}}><legend className="fw-phone-caption">{job.checks.filter(Boolean).length} OF 3 VERIFIED</legend>{['Check housing for damage','Verify all mounting points','Confirm free movement'].map((label,i)=><label className="fw-phone-check" key={label}><input id={'phone-check-'+i} type="checkbox" checked={job.checks[i]} disabled={job.done} onChange={e=>patch(job.id,{checks:job.checks.map((v,k)=>k===i?e.target.checked:v)})}/>{label}</label>)}</fieldset>
              <h4>Field notes</h4><label className="fw-phone-caption" htmlFor="phone-note">OBSERVATIONS / SAVED IN MEMORY</label><textarea id="phone-note" className="fw-phone-input" rows="3" placeholder="What did you find?" value={job.note} onChange={e=>patch(job.id,{note:e.target.value})}/>
              <details><summary className="fw-phone-quiet">Related geometry / OBJ + STL</summary><p>Open Models to inspect the sample or a local file. The sample is illustrative, not an attachment to this order.</p><button className="fw-phone-quiet" onClick={()=>changeTab('Models')}>Open model viewer ↗</button></details>
              <p className="fw-phone-caption">{job.done?'This work order is complete. Reopen to edit its checklist.':'Verify all three checks to complete this work order.'}</p>
              <button id="phone-complete" className="btn" style={{width:'100%'}} disabled={!job.done&&!job.checks.every(Boolean)} onClick={()=>job.done?(patch(job.id,{done:false}),log('Reopened '+job.title,job.id,false)):complete()}>{job.done?'Reopen work order':'Complete inspection'}</button>
            </>}
          </div>
          <div hidden={tab!=='Models'}><span className="fw-phone-caption">GEOMETRY / LOCAL FILES</span><h3 ref={tab==='Models'?heading:null} tabIndex="-1">Model inspector.</h3><p className="muted">Orbit, zoom, and check the mesh.</p><ReferenceErrorBoundary viewer><ModelViewer idPrefix="phone-model"/></ReferenceErrorBoundary></div>
          <div hidden={tab!=='Activity'}><span className="fw-phone-caption">THIS SESSION</span><h3 ref={tab==='Activity'?heading:null} tabIndex="-1">Activity.</h3><p className="muted">A local record of changes, not a server audit log.</p><div id="phone-activity-list">{events.length?events.map(event=><div className="fw-phone-card" key={event.key}><small>{event.id}</small><p>{event.text}</p>{event.undo&&<button className="fw-phone-quiet phone-undo" onClick={()=>{patch(event.id,{done:false});setEvents(old=>old.map(item=>item.key===event.key?{...item,text:'Completion undone',undo:false}:item));setNotice('Work order reopened.');}}>Undo completion</button>}<button className="fw-phone-quiet" onClick={()=>{setSelected(event.id);changeTab('Work');}}>View order ↗</button></div>):<div className="fw-phone-card"><h4>No changes yet</h4><p>Complete or create a work order to see it here.</p><button className="fw-phone-quiet" onClick={()=>changeTab('Work')}>Go to work orders</button></div>}</div></div>
          <div hidden={tab!=='Settings'}><span className="fw-phone-caption">PERSONALIZE / THIS SESSION</span><h3 ref={tab==='Settings'?heading:null} tabIndex="-1">Settings.</h3><h4>Appearance</h4><label htmlFor="phone-scheme">Color scheme</label><select id="phone-scheme" className="fw-phone-input" value={scheme} onChange={e=>onScheme(e.target.value)}>{Object.entries(themeSchemes).map(([id,value])=><option value={id} key={id}>{value.name}</option>)}</select><label className="fw-phone-check"><input id="phone-dark" type="checkbox" checked={mode==='dark'} onChange={e=>onMode(e.target.checked?'dark':'light')}/>Dark mode {mode==='dark'?'on':'off'}</label><p className="fw-phone-caption">Appearance is shared with the whole reference. Your work stays intact.</p><h4>Notifications</h4><label className="fw-phone-check"><input type="checkbox" id="phone-alerts" checked={alerts} onChange={e=>setAlerts(e.target.checked)}/>Show in-app action messages</label><p className="fw-phone-caption">No push notifications or device permissions.</p><details><summary className="fw-phone-quiet">Help & app information</summary><p>Fieldwork Inspect is a local example. Work orders, notes, preferences, and imported models reset on reload. No accounts, uploads, or background sync.</p></details></div>
          <div id="phone-notice" role="status" aria-live="polite">{notice&&<div className="fw-phone-notice">{notice}<button className="fw-phone-quiet" aria-label="Dismiss action message" onClick={()=>setNotice('')}>×</button></div>}</div>
        </div>
        <nav className="fw-phone-bottom" aria-label="Phone application">{[['Work','▤'],['Models','◇'],['Activity','↺'],['Settings','⚙']].map(([name,icon])=><button id={'phone-tab-'+name.toLowerCase()} key={name} aria-current={tab===name?'page':undefined} onClick={()=>changeTab(name)}><span aria-hidden="true">{icon}</span>{name}</button>)}</nav>
        <dialog className="fw-phone-dialog" ref={modal} aria-labelledby="phone-create-title" onClose={()=>addButton.current?.focus({preventScroll:true})}>
          <form onSubmit={addJob} noValidate><h3 id="phone-create-title">New work order</h3><p>Added to this local demo only.</p><label htmlFor="phone-new-title">Work order name</label><input autoFocus id="phone-new-title" className="fw-phone-input" maxLength="80" value={draft.title} aria-invalid={!!formError&&!draft.title.trim()} aria-describedby={formError?'phone-form-error':undefined} onChange={e=>setDraft({...draft,title:e.target.value})}/><label htmlFor="phone-new-area">Location</label><input id="phone-new-area" className="fw-phone-input" maxLength="80" value={draft.area} aria-invalid={!!formError&&!draft.area.trim()} onChange={e=>setDraft({...draft,area:e.target.value})}/><label htmlFor="phone-new-priority">Priority</label><select id="phone-new-priority" className="fw-phone-input" value={draft.priority} onChange={e=>setDraft({...draft,priority:e.target.value})}><option>Normal</option><option>High</option></select>{formError&&<p role="alert" id="phone-form-error" style={{color:'var(--fw-danger)'}}>{formError}</p>}<div className="fw-phone-row"><button type="button" className="btn secondary" onClick={()=>modal.current.close()}>Cancel</button><button id="phone-create" className="btn" type="submit">Create order</button></div></form>
        </dialog>
      </div>
      <aside className="fw-phone-patterns" id="phone-patterns"><span className="eyebrow muted">PATTERNS / IN CONTEXT</span><h3>Built for the field.</h3><p className="muted">The same system, adapted to a smaller working surface. Not a scaled-down desktop window.</p><ol><li>Persistent bottom navigation with a separate detail/back path.</li><li>Shared records power lists, counts, checklists, notes, and activity.</li><li>Search, status filters, and recoverable empty states.</li><li>Validated creation dialog with keyboard dismissal.</li><li>Touch-ready model inspection and the shared zoom range.</li><li>Four schemes, two modes. No product-state reset.</li></ol><p className="mono muted">TRY / Complete an inspection, then undo it in Activity.</p></aside>
    </div>
  </section>;
}

function App(){
 const [active,setActive]=React.useState('themes');
 const navigateSection=(event,id)=>{
   event?.preventDefault();
   const target=document.getElementById(id);
   if(!target)return;
   // Index destinations can live inside collapsed foundation groups.
   for(let parent=target.parentElement;parent;parent=parent.parentElement){
     if(parent.tagName==='DETAILS')parent.open=true;
   }
   setActive(id);
   target.setAttribute('tabindex','-1');
   target.focus({preventScroll:true});
   
   target.style.scrollMarginTop='96px';
   target.scrollIntoView({block:'start',behavior:'instant'});
   requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));
   
 };
 React.useEffect(()=>{
   const update=()=>{
     let current='themes';
     for(const [id] of indexDestinations){const node=document.getElementById(id);if(node && !node.closest('details:not([open])') && node.getBoundingClientRect().top<=180)current=id;}
   if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-4)current='guidelines';
     setActive(current);
   };
   // Capture section links before the preview shell's generic hash handler.
   const follow=event=>{
     const link=event.target.closest?.('.rail a[href^="#"], .brand[href^="#"]');
     if(!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)return;
     const id=link.getAttribute('href').slice(1);
     if(!indexDestinations.some(([section])=>section===id))return;
     event.preventDefault();
     event.stopImmediatePropagation();
     navigateSection(null,id);
   };
   window.addEventListener('click',follow,true);
   window.addEventListener('scroll',update,{passive:true});
   return()=>{window.removeEventListener('click',follow,true);window.removeEventListener('scroll',update);};
 },[]);
 const [scheme,setScheme]=React.useState(TWEAK_DEFAULTS.themeScheme);
 const [mode,setMode]=React.useState(TWEAK_DEFAULTS.darkMode?'dark':'light');
 React.useEffect(()=>{setScheme(TWEAK_DEFAULTS.themeScheme);setMode(TWEAK_DEFAULTS.darkMode?'dark':'light');},[TWEAK_DEFAULTS.themeScheme,TWEAK_DEFAULTS.darkMode]);
 const values=themeValues(scheme,mode);
 const activeThemeCSS=':root{color-scheme:'+mode+';'+Object.entries(values).map(([k,v])=>'--fw-'+k+':'+v).join(';')+'}';
 const livePalette=palette.map(([name,token])=>[token==='accent'?'Signal':token==='text'?'Ink':token.charAt(0).toUpperCase()+token.slice(1),token,values[token]]);
 return <><style>{styles + themeEnhancements + controlStyles + motionStyles + fileBrowserStyles + referenceRepairs + activeThemeCSS}</style><a className="skip" href="#main">Skip to content</a><header className="topbar"><a href="#overview" className="brand" onClick={event=>navigateSection(event,'overview')}><Mark/>fieldwork<span className="mono muted">/ system</span></a><div className="top-meta"><span className="eyebrow muted">Built for what comes next</span><span className="version mono">v0.1</span></div></header><div className="shell"><aside className="rail"><div className="rail-label eyebrow">System index</div><SystemIndex active={active} navigate={navigateSection}/><div className="rail-bottom"><div className="eyebrow">A practical foundation.</div><p className="muted">Original by design.<br/>Reusable by default.</p><p className="mono muted">DESIGN SYSTEM / 001</p></div></aside>
<main className="main" id="main"><ThemeSelector scheme={scheme} mode={mode} onScheme={setScheme} onMode={setMode}/><section id="overview"><div className="intro-meta eyebrow"><span>/ Field notes № 001</span><span className="live">Living reference</span></div><div className="intro-title"><div><h1>Less decoration.<br/>More direction.</h1><p>A considered system for useful software. Warm surfaces, precise typography, and an industrial backbone.</p></div><div className="index-stamp mono">FORM FOLLOWS FUNCTION ↗</div></div><div className="hero-specimen"><div className="specimen-copy"><div className="eyebrow">The design language</div><h2>Technical precision.<br/>Human by nature.</h2><div className="specimen-foot mono"><span>Industrial minimalism</span><span>↗</span></div></div><div className="diagram" aria-hidden="true"><span className="corner tl">FIG. 01 / STRUCTURE</span><svg viewBox="0 0 200 200" fill="none"><path d="M20 20h160v160H20zM20 60h160M20 100h160M20 140h160M60 20v160M100 20v160M140 20v160" stroke="#252820" strokeOpacity=".25"/><path d="M40 160V40h120v40H80v20h60v40H80v20z" fill="#252820"/><path d="M20 20l160 160M180 20L20 180" stroke="#F5F3EC" strokeOpacity=".5" strokeDasharray="3 4"/><circle cx="100" cy="100" r="78" stroke="#252820" strokeWidth="1"/></svg><span className="corner br">UTILITY OVER ORNAMENT</span></div></div><div className="principles"><div><h3>01 / Quiet foundations</h3><p>Paper tones and structural lines let the work take the foreground.</p></div><div><h3>02 / Intentional contrast</h3><p>One signal color. Clear hierarchy. Every emphasis earns its place.</p></div><div><h3>03 / Built to repeat</h3><p>Portable tokens and consistent rules, from first screen to full product.</p></div></div></section><section className="section" id="color"><SectionHeading number="01" title="A restrained palette." description={`${themeSchemes[scheme].name} / ${mode}. Semantic roles stay stable as the palette changes.`}/><div className="swatches">{livePalette.map(([name,token,hex])=><div className="swatch" key={name}><div className="swatch-color" style={{background:hex}}/><div className="swatch-info">{name}<code>{hex}</code><code>--fw-{token}</code></div></div>)}</div><p className="section-note mono">RULE 01 / Neutral by default. Accent with intent. Never use color alone to communicate state.</p></section><section className="section" id="typography"><SectionHeading number="02" title="Say it clearly." description="A neutral sans for ideas. A monospace for instructions, annotations, and the details."/><div className="type-row"><div className="type-label">DISPLAY / 64<br/>500 · 1.02 · −.045em</div><div className="type-display">Make useful things.</div></div><div className="type-row"><div className="type-label">HEADING / 32<br/>500 · 1.15 · −.025em</div><div className="type-heading">Clarity is a feature.</div></div><div className="type-row"><div className="type-label">BODY / 16<br/>400 · 1.6 · 0</div><p>Give complex ideas room to breathe. Use plain language, useful labels, and a comfortable reading rhythm.</p></div><div className="type-row"><div className="type-label">LABEL / 12<br/>400 · 1.5 · .06em</div><div className="type-mono">/ PRECISE BY DESIGN — NOT BY ACCIDENT</div></div><p className="section-note">Arial / Helvetica + system monospace. No font downloads required. Display specimen is 56px here; page headlines use 64px.</p></section><LayoutSection/><ControlsSection/><MotionSection/><FileBrowser /><ApplicationWindow/>
<PhoneApplication scheme={scheme} mode={mode} onScheme={setScheme} onMode={setMode}/><ComponentsSection/><PatternsSection/><GuidelinesSection scheme={scheme} mode={mode} values={values}/><footer className="footer"><span>FIELDWORK / AN ORIGINAL DESIGN SYSTEM</span><span>Useful by design. Ready to build on. ↗</span></footer></main></div></>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<ReferenceErrorBoundary><App /></ReferenceErrorBoundary>);
