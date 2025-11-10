import { useState, useEffect } from 'react';

const PAIN_POINTS = [
  "Unfair workload",
  "Interrupted during meetings",
  "Promotion denied",
  "Unclear responsibilities",
  "Lack of recognition"
];

const ROLES = [
  "Manager",
  "Colleague",
  "Direct Report",
  "HR",
  "Other"
];

const MODES = [
  "Written",
  "Verbal",
  "Email",
  "Teams/Zoom",
  "Phone call"
];

// Simple script generator (stub)
function generateScripts({ painPoint, role, mode, context }) {
  const template = [
    `In a professional, respectful way, address "${painPoint}" with your ${role} via ${mode}. Use this sample: "${context || 'Describe your situation briefly here.'}"`,
    `Politely bring up "${painPoint}" in a ${mode} conversation with your ${role}. For instance: "${context || 'Give short context.'}"`,
    `Express your thoughts on "${painPoint}" to your ${role} through ${mode}, focusing on solutions. Ex: "${context || 'Explain what happened clearly.'}"`
  ];
  return template;
}

export default function Home() {
  const [painPoint, setPainPoint] = useState('');
  const [role, setRole] = useState('');
  const [mode, setMode] = useState('');
  const [context, setContext] = useState('');
  const [scripts, setScripts] = useState([]);
  const [credits, setCredits] = useState(2);
  const [showBuy, setShowBuy] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('zero_conflict_credits');
    setCredits(stored ? Number(stored) : 2);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('zero_conflict_credits', credits);
  }, [credits]);

  const handleGenerate = () => {
    if (!painPoint || !role || !mode) return alert('Please complete all dropdowns.');
    if (credits <= 0) {
      setShowBuy(true);
      return;
    }
    setScripts(generateScripts({ painPoint, role, mode, context }));
    setCredits(c => c - 1);
  };

  const handleBuy = pack => {
    window.open('mailto:services@kryptonpath.com?subject=ZeroConflict%20Payment%20Link%20Request&body=I%20want%20to%20buy%20the%20' + pack + '%20pack.', '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh', fontFamily: 'Inter,sans-serif', background: 'linear-gradient(135deg,#5f2c82,#49a09d)', color: '#fff', paddingBottom: '4rem'
    }}>
      <div style={{
        maxWidth: 420, margin: '2rem auto', padding: '2rem', background: 'rgba(20,20,40,0.96)', borderRadius: 18, boxShadow: '0 6px 30px rgba(0,0,0,0.19)'
      }}>
        <img src="/zero-conflict-logo.png" alt="Zero Conflict" style={{ width: 80, margin: '0 auto 1rem', display: 'block' }} />
        <h1 style={{textAlign:'center',marginBottom:0}}>Zero Conflict</h1>
        <p style={{textAlign:'center',marginTop:6,marginBottom:24}}>AI Dialogue Engine for Workplace Communication</p>
        <label>1. Select the corporate pain point:</label>
        <select value={painPoint} onChange={e=>setPainPoint(e.target.value)} style={{width:'100%',marginBottom:8}}>
          <option value="">Choose a common workplace challenge</option>
          {PAIN_POINTS.map(p=>(<option key={p}>{p}</option>))}
        </select>
        <label>2. What is your role in this conversation?</label>
        <select value={role} onChange={e=>setRole(e.target.value)} style={{width:'100%',marginBottom:8}}>
          <option value="">Identify your role and audience</option>
          {ROLES.map(r=>(<option key={r}>{r}</option>))}
        </select>
        <label>3. What is the communication mode?</label>
        <select value={mode} onChange={e=>setMode(e.target.value)} style={{width:'100%',marginBottom:8}}>
          <option value="">How will you deliver the message?</option>
          {MODES.map(m=>(<option key={m}>{m}</option>))}
        </select>
        <label>4. Provide brief context:</label>
        <textarea value={context} onChange={e=>setContext(e.target.value)} placeholder="Optional. E.g. My manager frequently interrupts me during project updates..." style={{width:'100%',minHeight:50,marginBottom:12}} />
        <button onClick={handleGenerate} style={{
          width:'100%', background:'#9132a8', color:'#fff', fontWeight:600, border:'none', padding:12, borderRadius:8, marginBottom:12, cursor:'pointer'
        }}>Generate Zero-Conflict Script</button>
        <p style={{textAlign:'center',fontSize:14,margin:'5px 0 0',color:'#ffcd58'}}>Credits left: {credits} {credits===0 ? "(Buy more to continue)" : credits<=2 ? "(You are using free credits!)" : null}</p>

        {!!scripts.length && <div>
          <hr style={{margin:'16px 0'}}/>
          <h3>Script Options</h3>
          {scripts.map((s,i)=>(
            <div key={i} style={{background:'#32325d',margin:'14px 0',padding:14,borderRadius:7}}>
              <p style={{margin:0}}>{s}</p>
              <button onClick={()=>navigator.clipboard.writeText(s)} style={{
                marginTop:5,padding:'6px 11px',background:'#e4c680',color:'#251a55',border:'none',borderRadius:5,fontWeight:600
              }}>Copy Script</button>
            </div>
          ))}
        </div>}
      </div>

      {/* Buy credits modal */}
      {showBuy && <div style={{
        position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(15,12,20,0.82)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50
      }}>
        <div style={{
          background:'#fff', color:'#31214e', padding:'2rem 1.4rem',borderRadius:14, maxWidth:340, width:'100%', fontWeight:500, boxShadow:'0 0 24px #0006'
        }}>
          <h2 style={{textAlign:'center'}}>Buy More Credits</h2>
          <ul style={{listStyle:'none',padding:0,fontSize:16}}>
            <li>
              <b>10 Credits</b>: ₹199
              <button onClick={()=>handleBuy('10-199')} style={{margin:'0 0 0 12px', background:'#3a1859',color:'#ffdf16',border:'none',padding:'4px 11px',borderRadius:6}}>Buy</button>
            </li>
            <li>
              <b>50 Credits</b>: ₹399
              <button onClick={()=>handleBuy('50-399')} style={{margin:'0 0 0 12px', background:'#3a1859',color:'#ffdf16',border:'none',padding:'4px 11px',borderRadius:6}}>Buy</button>
            </li>
            <li>
              <b>100 Credits</b>: ₹799
              <button onClick={()=>handleBuy('100-799')} style={{margin:'0 0 0 12px', background:'#3a1859',color:'#ffdf16',border:'none',padding:'4px 11px',borderRadius:6}}>Buy</button>
            </li>
          </ul>
          <p style={{marginTop:18}}>After you select, a payment link will be sent by <b>kryptonpath.com</b>.<br/>For help: <a href="mailto:services@kryptonpath.com" style={{color:'#6620d1'}}>services@kryptonpath.com</a></p>
          <a href="https://www.instagram.com/kryptonpath?igsh=MTdtem9jMXd5amluNw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <button style={{
              marginTop:8, background:'#ba1e6c', color:'#fff', padding:'10px 14px', border:'none', borderRadius:8, fontWeight:700, width:'100%'
            }}>DM on Instagram</button>
          </a>
          <button onClick={()=>setShowBuy(false)} style={{marginTop:14,background:'#eee',color:'#61317f',border:'none',padding:'6px 0',width:'100%',borderRadius:6}}>Cancel</button>
        </div>
      </div>}

      <footer style={{textAlign:'center',marginTop:38,color:'#eee',fontSize:15}}>
        <div>Powered by <a href="https://kryptonpath.com" style={{color:'#ffd145'}}>kryptonpath.com</a></div>
        <div>Contact: <a href="mailto:services@kryptonpath.com" style={{color:'#99cbe6'}}>services@kryptonpath.com</a></div>
        <div>
          <a href="https://www.instagram.com/kryptonpath?igsh=MTdtem9jMXd5amluNw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{color:'#ffbaf3'}}>
            DM on Instagram @kryptonpath
          </a>
        </div>
      </footer>
    </div>
  );
}
