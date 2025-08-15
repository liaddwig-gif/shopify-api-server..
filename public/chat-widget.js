// public/chat-widget.js
(function(){
  const baseUrl = window.SHOPIFY_CHAT_BACKEND || 'https://REPLACE_WITH_YOUR_SERVER';
  function createWidget(){
    const btn = document.createElement('button');
    btn.innerText = 'שאל את החנות';
    btn.style.position = 'fixed'; btn.style.bottom='20px'; btn.style.right='20px'; btn.style.zIndex=9999; btn.style.padding='10px 14px'; btn.style.borderRadius='8px';
    document.body.appendChild(btn);
    const box = document.createElement('div'); box.style.position='fixed'; box.style.bottom='70px'; box.style.right='20px'; box.style.width='320px'; box.style.height='400px'; box.style.background='white'; box.style.border='1px solid #ccc'; box.style.display='none'; box.style.flexDirection='column'; box.style.zIndex=9999;
    document.body.appendChild(box);
    const header=document.createElement('div'); header.innerText='חנות — צ׳אט'; header.style.padding='8px'; header.style.fontWeight='bold'; box.appendChild(header);
    const messages=document.createElement('div'); messages.style.flex='1'; messages.style.overflow='auto'; messages.style.padding='8px'; box.appendChild(messages);
    const inputWrap=document.createElement('div'); inputWrap.style.display='flex'; inputWrap.style.padding='8px'; box.appendChild(inputWrap);
    const input=document.createElement('input'); input.placeholder='כתוב כאן...'; input.style.flex='1'; input.style.marginRight='8px'; inputWrap.appendChild(input);
    const send=document.createElement('button'); send.innerText='שלח'; inputWrap.appendChild(send);
    btn.addEventListener('click', ()=>{ box.style.display = box.style.display === 'none' ? 'flex' : 'none'; });
    async function postMessage(text){ const p=document.createElement('div'); p.innerText='אתה: '+text; messages.appendChild(p);
      try { const resp = await fetch(baseUrl + '/api/chat', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ message: text, session_id: 'shopify_guest' }) }); const j = await resp.json(); const r=document.createElement('div'); r.innerText='חנות: '+(j.reply||j.error||'אין תגובה'); messages.appendChild(r); messages.scrollTop = messages.scrollHeight; } catch(e){ const r=document.createElement('div'); r.innerText='חנות: שגיאת חיבור'; messages.appendChild(r); }
    }
    send.addEventListener('click', ()=>{ if(input.value.trim()){ postMessage(input.value.trim()); input.value=''; } });
    input.addEventListener('keydown', (e)=>{ if(e.key==='Enter' && input.value.trim()){ postMessage(input.value.trim()); input.value=''; } });
  }
  if(document.readyState==='complete' || document.readyState==='interactive') createWidget(); else document.addEventListener('DOMContentLoaded', createWidget);
})();
