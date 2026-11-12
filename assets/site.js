/* Krishna Montessori pitch website. No external JS libraries. All forms are in demo mode. */
(() => {
  'use strict';
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Responsive navigation
  const menuButton = $('#menu-toggle');
  const mobileNav = $('#mobile-nav');
  const closeMenu = () => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Open menu');
    mobileNav.classList.remove('is-open');
  };
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const nowOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded',String(nowOpen));
      menuButton.setAttribute('aria-label',nowOpen ? 'Close menu':'Open menu');
      mobileNav.classList.toggle('is-open',nowOpen);
    });
    $$('.mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
    window.addEventListener('resize',()=>{if(window.innerWidth>1050)closeMenu()});
  }
  const year = $('#year'); if(year) year.textContent = new Date().getFullYear();

  // Progressive animations
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('js-ready');
    const revealObserver = new IntersectionObserver((entries,obs)=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');obs.unobserve(entry.target)}});
    },{threshold:.06,rootMargin:'0px 0px 20px 0px'});
    $$('.reveal').forEach(el=>revealObserver.observe(el));
  }

  // Interactive Learning Path Finder (local state only)
  const AGE_OPTIONS=[
    {id:'under3',title:'Under 3',hint:'A little explorer'},
    {id:'3-4',title:'3–4 years',hint:'So much to discover'},
    {id:'4-6',title:'4–6 years',hint:'Curious & growing'},
    {id:'6-9',title:'6–9 years',hint:'Ready for new ideas'},
    {id:'9-12',title:'9–12 years',hint:'Independent thinker'}
  ];
  const INTEREST_OPTIONS=[
    {id:'programs',title:'Learning programs',hint:'Curriculum & pathways'},
    {id:'life',title:'School life',hint:'Activities & environment'},
    {id:'tour',title:'School tour',hint:'See the school'},
    {id:'admissions',title:'Admissions',hint:'Enrollment & next steps'}
  ];
  const PATHS={
    under3:{title:'Start with a friendly conversation',desc:'This sample site does not establish an official pathway for children under three. Reach out for verified age eligibility and available programs.',label:'Ask about programs',href:'/contact/',pill:'Under 3 · Age confirmation needed'},
    '3-4':{title:'Explore Early Discovery',desc:'A gentle sample pathway for a curious young learner — where sensory experiences, playful routines, and independence take root.',label:'Discover Early Discovery',href:'/programs/#early',pill:'Ages 3–4 · Sample pathway'},
    '4-6':{title:'Explore Kindergarten',desc:'A joyful sample pathway for imagination, hands-on activities, early literacy, and growing independence.',label:'Discover Kindergarten',href:'/programs/#kindergarten',pill:'Ages 4–6 · Sample pathway'},
    '6-9':{title:'Explore Elementary',desc:'A sample pathway for bigger questions, collaborative projects, and a love of learning through discovery.',label:'Discover Elementary',href:'/programs/#elementary',pill:'Ages 6–9 · Sample pathway'},
    '9-12':{title:'Explore Elementary',desc:'A sample learning journey with more independent thinking, problem-solving, and thoughtful creative challenges.',label:'Discover Elementary',href:'/programs/#elementary',pill:'Ages 9–12 · Sample pathway'}
  };

  $$('[data-finder]').forEach(card=>{
    const state={step:1,age:'',interest:''};
    const body=$('[data-finder-body]',card);
    const indicator=$('.finder-step-indicator',card);
    const progress=$('.finder-track-progress',card);
    const progressUpdate=()=>{
      indicator.textContent = `STEP 0${state.step} / 03`;
      progress.style.width = `${state.step*100/3}%`;
    };
    const choiceMarkup=(item,selected)=>`<button type="button" class="finder-choice ${selected?'selected':''}" data-choice="${item.id}" aria-pressed="${selected}"><strong>${item.title}</strong><small>${item.hint}</small></button>`;
    function render(){
      progressUpdate();
      if(state.step===1){
        body.innerHTML=`<div class="finder-question"><h3>How old is your little explorer?</h3><p class="finder-hint">Choose their current age range to get started.</p><div class="finder-options">${AGE_OPTIONS.map(v=>choiceMarkup(v,v.id===state.age)).join('')}</div><div class="finder-nav"><span class="finder-note">No personal details required</span><button type="button" class="finder-next" data-next ${!state.age?'disabled':''}>Next step <span>↗</span></button></div></div>`;
      } else if(state.step===2){
        body.innerHTML=`<div class="finder-question"><h3>What are you curious about?</h3><p class="finder-hint">We'll point you toward something relevant.</p><div class="finder-options">${INTEREST_OPTIONS.map(v=>choiceMarkup(v,v.id===state.interest)).join('')}</div><div class="finder-nav"><button type="button" class="finder-back" data-back>← Back</button><button type="button" class="finder-next" data-next ${!state.interest?'disabled':''}>See my path <span>↗</span></button></div></div>`;
      } else {
        const path=PATHS[state.age]||PATHS.under3;
        const special={
          tour:{title:"Let's plan a little visit!",desc:'A school tour is a great way to explore learning spaces and ask questions. This demo includes a sample tour-request experience.',label:'Preview school tour',href:'/admissions/#book-tour'},
          life:{title:'Peek into school life',desc:'Get inspired by hands-on learning, creative projects, outdoor play, and a welcoming learning environment.',label:'Explore school life',href:'/school-life/'},
          admissions:{title:'Explore the next steps',desc:'Learn how the admissions journey could work, then try a school visit request or ask a question.',label:'View admissions',href:'/admissions/#book-tour'}
        };
        const answer=state.interest==='programs'?path:(special[state.interest]||path);
        const secondary=state.interest==='programs'?'Preview school tour':'Explore the programs';
        const secondaryHref=state.interest==='programs'?'/admissions/#book-tour':path.href;
        body.innerHTML=`<div class="finder-result"><div class="result-icon">✳</div><span class="result-kicker">YOUR SUGGESTED NEXT STEP</span><h3>${answer.title}</h3><p>${answer.desc}</p><p class="finder-note">${path.pill}. Illustrative recommendation only — not an official placement or offer.</p><div class="finder-result-actions"><a class="btn btn-primary" href="${answer.href}"><span>${answer.label}</span><span class="button-arrow">↗</span></a><a class="btn btn-outline" href="${secondaryHref}"><span>${secondary}</span><span class="button-arrow">↗</span></a></div><div class="finder-nav"><button class="finder-back" type="button" data-restart>↶ Start again</button></div></div>`;
      }
    }
    card.addEventListener('click',ev=>{
      const el=ev.target.closest('button'); if(!el || !card.contains(el))return;
      if(el.dataset.choice){
        if(state.step===1)state.age=el.dataset.choice;
        else state.interest=el.dataset.choice;
        render();
      }else if(el.hasAttribute('data-next') && !el.disabled){state.step=Math.min(3,state.step+1);render()}
      else if(el.hasAttribute('data-back')){state.step=Math.max(1,state.step-1);render()}
      else if(el.hasAttribute('data-restart')){state.step=1;state.age='';state.interest='';render()}
    });
    render();
  });

  // Filterable gallery and event listing
  function wireFilter(wrapperSelector, buttonSelector, itemSelector) {
    const wrapper=$(wrapperSelector); if(!wrapper)return;
    const buttons=$$(buttonSelector,wrapper);
    const items=$$(itemSelector);
    buttons.forEach(button=>button.addEventListener('click',()=>{
      const value=button.dataset.filter;
      buttons.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
      items.forEach(item=>{const show=value==='all'||item.dataset.category===value;item.classList.toggle('is-hidden',!show);item.setAttribute('aria-hidden',String(!show))});
    }));
  }
  wireFilter('[data-gallery-filter]','[data-filter]','[data-gallery-item]');
  wireFilter('[data-event-filter]','[data-filter]','[data-event-item]');

  // Accessible modal, for real interactive demo previews
  const overlay=$('#global-overlay');
  const modalContent=$('#modal-content');
  let prevFocused=null;
  const closeModal=()=>{
    if(!overlay || overlay.hidden)return;
    overlay.hidden=true;overlay.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    if(prevFocused&&typeof prevFocused.focus==='function')prevFocused.focus();
    prevFocused=null;
  };
  const openModal=(html)=>{
    if(!overlay||!modalContent)return;
    prevFocused=document.activeElement;
    modalContent.innerHTML=html;
    overlay.hidden=false;overlay.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    const close=$('[data-close-modal]',overlay);if(close)close.focus();
  };
  if(overlay){
    $$('[data-close-modal]',overlay).forEach(btn=>btn.addEventListener('click',closeModal));
    document.addEventListener('keydown',e=>{
      if(overlay.hidden)return;
      if(e.key==='Escape'){closeModal();return}
      if(e.key==='Tab'){
        const focusables=$$('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])',overlay).filter(el=>el.getClientRects().length>0);
        if(!focusables.length)return;
        const first=focusables[0],last=focusables[focusables.length-1];
        if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus()}
        else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus()}
      }
    });
  }
  $$('[data-gallery-item]').forEach(button=>button.addEventListener('click',()=>{
    const image=button.dataset.image;
    const caption=button.dataset.caption;
    const source=button.dataset.photoSource;
    openModal(`<span class="modal-kicker">PHOTOGRAPHY / GALLERY PREVIEW</span><h2 id="modal-title">${esc(caption)}</h2><img class="modal-photo" src="https://images.unsplash.com/${encodeURIComponent(image)}?auto=format&fit=crop&w=1200&q=85" alt="${esc(caption)}"><p class="modal-source">Stock photograph for concept visualization; not a Krishna photo. <a href="${esc(source)}" target="_blank" rel="noopener noreferrer"><u>See original image ↗</u></a></p>`);
  }));
  const EVENT_DETAIL={
    open:['Meet & Explore: Open House','COMMUNITY','An example open house where families could discover classrooms, meet educators, and get a feel for the learning experience.'],
    makers:['Little Makers Week','CREATIVITY','A playful sample event about creativity, making, experimentation, and sharing ideas.'],
    picnic:['Together in the Sunshine','FAMILY','A conceptual family gathering for movement, play, laughter, and connecting with others.'],
    reading:['A Thousand Little Stories','LITERACY','An example of how a reading celebration could be documented in the news and events section.'],
    garden:['Nature Discovery Day','EXPLORATION','An example retrospective about curiosity, observing nature, and exploring outdoors.'],
    art:['Our Little Art Gallery','ART',"A fictional creative showcase highlighting color, imagination, and children's hands-on work."]
  };
  $$('[data-event-open]').forEach(btn=>btn.addEventListener('click',()=>{
    const key=btn.dataset.eventOpen;
    const data=EVENT_DETAIL[key];if(!data)return;
    const upcoming=['open','makers','picnic'].includes(key);
    openModal(`<span class="modal-kicker">${data[1]} / FICTIONAL EVENT ${upcoming?'IDEA':'RECAP'}</span><h2 id="modal-title">${data[0]}</h2><p>${data[2]}</p><div class="modal-notice">Concept-only event, not on an actual Krishna schedule. This interaction is provided solely to demonstrate a future events and RSVP experience.</div>${upcoming?'<div class="modal-action-row"><button class="btn btn-primary" type="button" data-simulate-rsvp>Preview RSVP <span class="button-arrow">↗</span></button></div>':''}`);
  }));
  if(overlay){overlay.addEventListener('click',e=>{
    if(e.target.closest('[data-simulate-rsvp]')){
      openModal('<div class="modal-confirm"><span>✳</span><h2 id="modal-title">You\'re on the list… <em>in this demo!</em></h2><p>This is a simulated RSVP confirmation. No registration has been stored or sent.</p><button type="button" class="btn btn-primary" data-close-modal>Wonderful! <span class="button-arrow">✓</span></button></div>');
      const newClose=$('[data-close-modal]',modalContent);if(newClose)newClose.addEventListener('click',closeModal);
    }
  })}

  // Forms are deliberately local-only; do not send or store personally identifiable data.
  const dateField=$('#tour-date');
  if(dateField){
    const d=new Date(); const yy=d.getFullYear();const mm=String(d.getMonth()+1).padStart(2,'0');const dd=String(d.getDate()).padStart(2,'0');
    dateField.min=`${yy}-${mm}-${dd}`;
  }
  $$('[data-demo-form]').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const status=$('.form-status',form);
      if(!form.checkValidity()){
        if(status)status.textContent='Please complete the required fields to preview this interaction.';
        form.reportValidity();return;
      }
      if(status)status.textContent='Demo interaction completed — nothing was sent.';
      const type=form.dataset.formName;
      const messages={
        tour:['Request preview complete!','In a live Krishna website, an admissions team could review your selected visit date and reply. For this concept, no data was collected, stored, or sent.'],
        contact:['Message preview complete!','This demonstrates the contact form confirmation state. No message was sent or stored.'],
        newsletter:['Signup preview complete!','This demonstrates a newsletter signup experience. Your email was not collected, sent, or saved.']
      };
      const msg=messages[type]||messages.contact;
      openModal(`<div class="modal-confirm"><span>✳</span><h2 id="modal-title">${msg[0]}</h2><p>${msg[1]}</p><button type="button" class="btn btn-primary" data-close-modal>All done <span class="button-arrow">✓</span></button></div>`);
      const close=$('[data-close-modal]',modalContent);if(close)close.addEventListener('click',closeModal);
      form.reset();
    });
  });
})();
