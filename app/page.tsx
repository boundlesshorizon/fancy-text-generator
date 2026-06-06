'use client'
import { useState, useEffect } from 'react'

const transforms: { name: string; fn: (t: string) => string }[] = [
  { name: "Bold Serif", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D41A : c.charCodeAt(0) - 65 + 0x1D400)) },
  { name: "Italic Serif", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D622 : c.charCodeAt(0) - 65 + 0x1D608)) },
  { name: "Bold Italic Serif", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D656 : c.charCodeAt(0) - 65 + 0x1D63C)) },
  { name: "Script", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D4EA : c.charCodeAt(0) - 65 + 0x1D4D0)) },
  { name: "Bold Script", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D4EE : c.charCodeAt(0) - 65 + 0x1D4D0)) },
  { name: "Double Struck", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D552 : c.charCodeAt(0) - 65 + 0x1D538)) },
  { name: "Monospace", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D68A : c.charCodeAt(0) - 65 + 0x1D670)) },
  { name: "Fraktur", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D51E : c.charCodeAt(0) - 65 + 0x1D504)) },
  { name: "Bold Fraktur", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D586 : c.charCodeAt(0) - 65 + 0x1D56C)) },
  { name: "Sans Serif", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D5BA : c.charCodeAt(0) - 65 + 0x1D5A0)) },
  { name: "Bold Sans", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D5EE : c.charCodeAt(0) - 65 + 0x1D5D4)) },
  { name: "Italic Sans", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D622 : c.charCodeAt(0) - 65 + 0x1D608)) },
  { name: "Bold Italic Sans", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D656 : c.charCodeAt(0) - 65 + 0x1D63C)) },
  { name: "Fullwidth", fn: t => t.replace(/[!-~]/g, c => String.fromCodePoint(c.charCodeAt(0) - 33 + 0xFF01)) },
  { name: "Upside Down", fn: t => t.split('').map(c => 'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz'['abcdefghijklmnopqrstuvwxyz'.indexOf(c.toLowerCase())] || c).reverse().join('') },
  { name: "Tiny Caps", fn: t => t.replace(/[a-z]/g, c => 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ'['abcdefghijklmnopqrstuvwxyz'.indexOf(c)]) },
  { name: "Bubble", fn: t => t.replace(/[a-zA-Z]/g, c => { const i = 'abcdefghijklmnopqrstuvwxyz'.indexOf(c.toLowerCase()); return i >= 0 ? String.fromCodePoint(0x24D0 + i) : c }) },
  { name: "Filled Bubble", fn: t => t.replace(/[a-zA-Z]/g, c => { const i = 'abcdefghijklmnopqrstuvwxyz'.indexOf(c.toLowerCase()); return i >= 0 ? String.fromCodePoint(0x24B6 + i) : c }) },
  { name: "Strikethrough", fn: t => t.split('').map(c => c + '\u0336').join('') },
  { name: "Underline", fn: t => t.split('').map(c => c + '\u0332').join('') },
  { name: "Double Underline", fn: t => t.split('').map(c => c + '\u0333').join('') },
  { name: "Overline", fn: t => t.split('').map(c => c + '\u0305').join('') },
  { name: "Slash Through", fn: t => t.split('').map(c => c + '\u0338').join('') },
  { name: "Vaporwave", fn: t => [...t].map(c => c + ' ').join('').trim() },
  { name: "Zalgo Light", fn: t => t.split('').map(c => c + '\u0301\u0302').join('') },
  { name: "Zalgo Heavy", fn: t => t.split('').map(c => c + '\u0301\u0302\u0308\u0324\u0330').join('') },
  { name: "Dotted", fn: t => t.split('').map(c => c + '\u0307').join('') },
  { name: "Cross Above", fn: t => t.split('').map(c => c + '\u033D').join('') },
  { name: "Wavy Case", fn: t => t.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('') },
  { name: "Superscript", fn: t => t.split('').map(c => ('aehijklmnoprstuvwxyz'.includes(c) ? 'ᵃᵉʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ'['aehijklmnoprstuvwxyz'.indexOf(c)] : c)).join('') },
  { name: "Square Caps", fn: t => t.replace(/[a-zA-Z]/g, c => { const i = 'abcdefghijklmnopqrstuvwxyz'.indexOf(c.toLowerCase()); return i >= 0 ? String.fromCodePoint(0x1F130 + i) : c }) },
  { name: "Mirror", fn: t => t.split('').map(c => 'ɒbcdɘfϱhijklmnoqpᴚꙅTUvwxYZ'['abcdefghijklmnopqrstuvwxyz'.indexOf(c.toLowerCase())] || c).join('') },
  { name: "Reverse", fn: t => t.split('').reverse().join('') },
  { name: "Spaced Out", fn: t => t.split('').join(' ') },
  { name: "Brackets", fn: t => t.split('').map(c => c === ' ' ? ' ' : `[${c}]`).join('') },
  { name: "Parentheses", fn: t => t.split('').map(c => c === ' ' ? ' ' : `(${c})`).join('') },
  { name: "Curly Brackets", fn: t => t.split('').map(c => c === ' ' ? ' ' : `{${c}}`).join('') },
  { name: "Arrow Right", fn: t => t.split('').join(' → ') },
  { name: "Arrow Left", fn: t => t.split('').join(' ← ') },
  { name: "Star Separator", fn: t => t.split('').join(' ★ ') },
  { name: "Dot Separator", fn: t => t.split('').join(' · ') },
  { name: "Dash Separator", fn: t => t.split('').join(' — ') },
  { name: "Heart Separator", fn: t => t.split('').join(' ♥ ') },
  { name: "Diamond Separator", fn: t => t.split('').join(' ◆ ') },
  { name: "Wave Separator", fn: t => t.split('').join(' ~ ') },
  { name: "Cross Separator", fn: t => t.split('').join(' ✞ ') },
  { name: "Snowflake", fn: t => `❄ ${t.split('').join(' ❄ ')} ❄` },
  { name: "Star Wrap", fn: t => `★ ${t} ★` },
  { name: "Heart Wrap", fn: t => `♥ ${t} ♥` },
  { name: "Fire Wrap", fn: t => `🔥 ${t} 🔥` },
  { name: "Crown Wrap", fn: t => `👑 ${t} 👑` },
  { name: "Lightning Wrap", fn: t => `⚡ ${t} ⚡` },
  { name: "Music Wrap", fn: t => `♪ ${t} ♪` },
  { name: "Arrow Wrap", fn: t => `» ${t} «` },
  { name: "Tilde Wrap", fn: t => `~•~ ${t} ~•~` },
  { name: "Small Caps", fn: t => t.toUpperCase() },
  { name: "Lowercase", fn: t => t.toLowerCase() },
  { name: "Alternating CAPS", fn: t => t.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('') },
  { name: "Aesthetic", fn: t => t.split('').join('\u200B') },
  { name: "Double Strike Bold", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D552 : c.charCodeAt(0) - 65 + 0x1D538)) },
  { name: "Cursive", fn: t => t.replace(/[a-zA-Z]/g, c => String.fromCodePoint((c >= 'a' && c <= 'z') ? c.charCodeAt(0) - 97 + 0x1D4EA : c.charCodeAt(0) - 65 + 0x1D4D0)) },
  { name: "Rose Wrap", fn: t => `🌹 ${t} 🌹` },
  { name: "Diamond Wrap", fn: t => `💎 ${t} 💎` },
  { name: "Moon Wrap", fn: t => `🌙 ${t} 🌙` },
  { name: "Sun Wrap", fn: t => `☀️ ${t} ☀️` },
  { name: "Butterfly Wrap", fn: t => `🦋 ${t} 🦋` },
  { name: "Rainbow Wrap", fn: t => `🌈 ${t} 🌈` },
  { name: "Angel Wrap", fn: t => `👼 ${t} 👼` },
  { name: "Skull Wrap", fn: t => `💀 ${t} 💀` },
  { name: "Sword Wrap", fn: t => `⚔️ ${t} ⚔️` },
  { name: "Sparkle Wrap", fn: t => `✨ ${t} ✨` },
  { name: "Clover Wrap", fn: t => `🍀 ${t} 🍀` },
  { name: "Ghost Wrap", fn: t => `👻 ${t} 👻` },
  { name: "Alien Wrap", fn: t => `👽 ${t} 👽` },
  { name: "Ninja Wrap", fn: t => `🥷 ${t} 🥷` },
  { name: "Dragon Wrap", fn: t => `🐉 ${t} 🐉` },
  { name: "Dagger Separator", fn: t => t.split('').join(' † ') },
  { name: "Bullet Separator", fn: t => t.split('').join(' • ') },
  { name: "Pipe Separator", fn: t => t.split('').join(' | ') },
  { name: "Plus Separator", fn: t => t.split('').join(' + ') },
  { name: "Colon Separator", fn: t => t.split('').join(' : ') },
  { name: "Semicolon Separator", fn: t => t.split('').join(' ; ') },
  { name: "Asterisk Separator", fn: t => t.split('').join(' * ') },
  { name: "Hash Separator", fn: t => t.split('').join(' # ') },
  { name: "At Separator", fn: t => t.split('').join(' @ ') },
  { name: "Caret Separator", fn: t => t.split('').join(' ^ ') },
  { name: "Box Wrap", fn: t => `【 ${t} 】` },
  { name: "Angle Wrap", fn: t => `「 ${t} 」` },
  { name: "Double Angle Wrap", fn: t => `《 ${t} 》` },
  { name: "Corner Wrap", fn: t => `『 ${t} 』` },
  { name: "Lenticular Wrap", fn: t => `〖 ${t} 〗` },
  { name: "Tortoise Wrap", fn: t => `〔 ${t} 〕` },
  { name: "Wave Wrap", fn: t => `〰 ${t} 〰` },
  { name: "Dotted Above Below", fn: t => t.split('').map(c => c + '\u0307\u0323').join('') },
  { name: "Tilde Above", fn: t => t.split('').map(c => c + '\u0303').join('') },
  { name: "Inverted Breve", fn: t => t.split('').map(c => c + '\u0311').join('') },
  { name: "Double Overline", fn: t => t.split('').map(c => c + '\u033F').join('') },
  { name: "Zigzag Above", fn: t => t.split('').map(c => c + '\u0341').join('') },
  { name: "Currency Symbols", fn: t => t.replace(/[a-zA-Z]/g, c => '₳฿₵₫€₣₲₴₭£₥₦₱₹₪₸₮₩¥'['abcdefghijklmnopqrstuvwxy'.indexOf(c.toLowerCase())] || c) },
  { name: "Greek Letters", fn: t => t.replace(/[a-zA-Z]/g, c => 'αβχδεφγηιξκλμνοπθρστυωψχζ'['abcdefghijklmnopqrstuvwxyz'.indexOf(c.toLowerCase())] || c) },
  { name: "Morse Code", fn: t => t.split('').map(c => ({'a':'·−','b':'−···','c':'−·−·','d':'−··','e':'·','f':'··−·','g':'−−·','h':'····','i':'··','j':'·−−−','k':'−·−','l':'·−··','m':'−−','n':'−·','o':'−−−','p':'·−−·','q':'−−·−','r':'·−·','s':'···','t':'−','u':'··−','v':'···−','w':'·−−','x':'−··−','y':'−·−−','z':'−−··'}[c.toLowerCase()] || c)).join(' ') },
]

export default function Home() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  const preview = input || 'Preview Text'

  const handleCopy = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <main style={{ background: '#09090f', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>

      {/* STICKY HEADER */}
      <div style={{ borderBottom: '1px solid #1a1a2e', background: '#09090f', position: 'sticky', top: 0, zIndex: 10, padding: '14px 20px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: '#f5c842', fontWeight: 700, fontSize: '16px' }}>✦ FancyText.io</div>
            <div style={{ color: '#444', fontSize: '11px' }}>Free fancy text generator</div>
          </div>
          <span style={{ background: '#1a1a2e', color: '#666', padding: '4px 12px', borderRadius: '999px', fontSize: '11px' }}>{transforms.length} styles</span>
        </div>
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 20px' }}>

        {/* HERO */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '10px' }}>
            Fancy Text <span style={{ background: 'linear-gradient(90deg, #f5c842, #ff8800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Generator</span>
          </h1>
          <p style={{ color: '#555', fontSize: '14px' }}>Type anything below — copy any style for Instagram, Twitter, TikTok & more</p>
        </div>

        {/* INPUT */}
        <div style={{ position: 'relative', marginBottom: '40px' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your text here..."
            rows={3}
            style={{
              width: '100%', background: '#111118', border: '1px solid #1e1e30',
              borderRadius: '12px', padding: '16px 20px', color: '#fff',
              fontSize: '1.1rem', outline: 'none', resize: 'none',
              fontFamily: 'sans-serif', boxSizing: 'border-box'
            }}
            onFocus={e => e.target.style.borderColor = '#f5c842'}
            onBlur={e => e.target.style.borderColor = '#1e1e30'}
          />
          {input && (
            <button
              onClick={() => setInput('')}
              style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: '12px' }}
            >✕ Clear</button>
          )}
        </div>

        {/* RESULTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {transforms.map(({ name, fn }) => {
            const result = fn(preview)
            return (
              <div key={name}
                style={{
                  background: '#111118', border: '1px solid #1e1e30',
                  borderRadius: '12px', padding: '16px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px'
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,200,66,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e1e30')}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '10px', color: '#444', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>{name}</div>
                  <div style={{ fontSize: '1.05rem', color: '#ddd', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{result}</div>
                </div>
                <button
                  onClick={() => handleCopy(result, name)}
                  style={{
                    flexShrink: 0, fontSize: '12px', fontWeight: 600,
                    padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    background: copied === name ? '#00ff88' : '#1e1e30',
                    color: copied === name ? '#000' : '#ccc',
                    transition: 'all 0.15s'
                  }}
                >
                  {copied === name ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )
          })}
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: 'center', marginTop: '60px', color: '#2a2a3a', fontSize: '12px' }}>
          © 2026 FancyText.io · Free forever
        </div>

      </div>
    </main>
  )
}