(() => {
  const cats = window.SKS_CATEGORIES || [];
  const root = document.getElementById('career-page');
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const categoryId = params.get('category');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const slug = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const hash = s => [...s].reduce((a,c) => ((a * 31) + c.charCodeAt(0)) >>> 0, 7);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const all = cats.flatMap((cat, ci) => cat.careers.map((name, i) => ({name, cat, ci, i})));
  const entry = all.find(x => slug(x.name) === id && (!categoryId || x.cat.id === categoryId));
  if (!entry) {
    root.innerHTML = '<div class="career-not-found"><h1>Career profile not found</h1><p>This career link may be incorrect.</p><a href="index.html#categories">Browse all careers →</a></div>';
    return;
  }

  const {name, cat} = entry;
  document.title = `${name} | SURAJ SKS`;
  const n = name.toLowerCase(), c = cat.title.toLowerCase();
  let d;
  if (/architect|building|interior|landscape|urban|town planner|garden|space planner/.test(n+' '+c)) d='space';
  else if (/draft|cad|bim|structural|civil|mechanical|electrical|piping|technical drawing|engineering/.test(n+' '+c)) d='technical';
  else if (/fashion|apparel|costume|footwear|handbag|textile|fabric|garment/.test(n+' '+c)) d='fashion';
  else if (/jewell|gemstone|gold ornament|silver jewellery|accessor/.test(n+' '+c)) d='jewellery';
  else if (/animation|cartoon|character|creature|storyboard|visual development|game|comic|manga|webtoon|concept artist/.test(n+' '+c)) d='character';
  else if (/portrait|figure|fine artist|pencil|charcoal|graphite|watercolor|watercolour|acrylic|oil painter|pastel|mural|painting/.test(n+' '+c)) d='fineart';
  else if (/illustrat|medical|scientific|anatom|botanical|wildlife|zoolog|geological|archaeological|forensic|cartograph|map |astronomy|paleont|historical reconstruction/.test(n+' '+c)) d='illustration';
  else if (/tattoo|mehndi|henna|mandala|rangoli|calligraphy|ornamentation|pattern artist/.test(n+' '+c)) d='decorative';
  else if (/3d |3d$|model|sculpt|render|visualization|visualisation|texture artist/.test(n+' '+c)) d='threeD';
  else if (/automotive|automobile|vehicle|transportation|aircraft|marine|train|mobility|motorcycle|bicycle/.test(n+' '+c)) d='vehicle';
  else if (/graphic|logo|brand|poster|typography|lettering|advertis|social media|packaging|infographic|signage/.test(n+' '+c)) d='graphic';
  else if (/product|industrial|furniture|toy designer|appliance|sports equipment|ceramic|pottery|wood carving|metal engraving|glass art/.test(n+' '+c)) d='product';
  else d='creative';

  const library = {
    space: {
      field:'spatial design', purpose:'turns site, building or room requirements into drawings that communicate space, circulation, scale, materials and human use.',
      output:'site or room plans, elevations, sections, perspective views, material boards and presentation drawings',
      skills:['Measured observation and site analysis','Plan, elevation and section drawing','Scale, proportion and dimensional accuracy','One-, two- and three-point perspective','Spatial circulation and human ergonomics','Material, light and environmental representation','Clear annotation and presentation'],
      tools:['Scale ruler, set squares and measuring tape','HB/2H pencils, fineliners, tracing paper and sketchbook','CAD or BIM software appropriate to the workplace','Perspective references, site photographs and material samples'],
      workflow:[['Read the brief and survey the place','Record the client needs, site limits, dimensions, orientation, access, users and relevant regulations. Separate confirmed measurements from assumptions.'],['Develop spatial alternatives','Draw bubble diagrams, adjacency studies and small plan thumbnails. Compare circulation, daylight, privacy, accessibility and usable area.'],['Construct plans and views','Set a scale and datum, draw walls and openings, then coordinate plans with elevations and sections. Check dimensions and alignment across views.'],['Resolve materials and details','Develop joinery, furniture, finishes, planting or façade details as appropriate to the role. Use line weights and hatching consistently.'],['Coordinate and present','Check drawing revisions, dimensions and consultant inputs. Present a legible set with a clear title, scale, north point and notes where needed.']],
      practice:'Design a small room, garden or building element for a stated user. Submit a measured plan, two elevations, one section and a perspective view.',
      pitfalls:['Drawing attractive perspectives before checking dimensions','Ignoring accessibility, circulation or site constraints','Using inconsistent scales, line weights or annotations']
    },
    technical: {
      field:'technical drafting and documentation', purpose:'converts engineering or construction requirements into precise, coordinated drawings that another professional can interpret and build from.',
      output:'dimensioned plans, orthographic views, sections, assembly details, schematics, schedules and revision-controlled drawing sheets',
      skills:['Orthographic projection and view selection','Dimensioning, tolerances and units','Sectioning, hatching and line conventions','Geometric construction and spatial reasoning','Reading specifications and technical symbols','CAD layers, blocks and drawing standards','Revision control and checking'],
      tools:['Engineering drawing board or CAD workstation','Scale ruler, compass, set squares and calipers as appropriate','CAD/BIM or discipline-specific drafting software','Applicable standards, symbol libraries and specification sheets'],
      workflow:[['Confirm the design input','Read the brief, sketches, specifications, units, standards and revision status. Identify missing dimensions before drafting.'],['Choose views and drawing scale','Select the views, sections and details needed to communicate the component or system without ambiguity.'],['Construct geometry accurately','Create orthographic views, centre lines, hidden details and section cuts. Keep related views aligned and consistent.'],['Add dimensions and annotations','Apply units, tolerances, symbols, notes and part references according to the relevant discipline standard.'],['Check and issue the drawing','Verify dimensions, clashes, line types, title block and revision history. Obtain the required technical review before issue.']],
      practice:'Create a fully dimensioned orthographic drawing of a simple component or small system, including one section view and a parts or notes list.',
      pitfalls:['Guessing missing dimensions','Mixing units or dimension styles','Issuing drawings without revision and cross-view checks']
    },
    fashion: {
      field:'fashion and textile design', purpose:'communicates garment or fabric ideas through silhouette, proportion, surface, construction and material behaviour.',
      output:'fashion figures, garment flats, front-and-back views, colourways, textile repeats, trim details and specification sheets',
      skills:['Fashion figure proportion and gesture','Garment silhouette and drape observation','Front, back and side technical flats','Fabric texture, folds and weight','Seam, dart, pleat and closure representation','Colourway and print development','Clear construction callouts'],
      tools:['Fashion croquis and marker or pencil paper','Graphite, fineliners, markers, watercolour or digital brushes','Fabric swatches, trims, rulers and tracing paper','Vector or raster illustration software when required'],
      workflow:[['Research the wearer and brief','Define the user, occasion, climate, function, price level and design references. Study relevant fabrics and existing garment construction.'],['Explore silhouette and proportion','Draw quick fashion figures and multiple garment silhouettes. Test volume, balance, length and movement before choosing a direction.'],['Develop the garment or pattern idea','Draw front and back flats, seams, openings, darts, pleats and key construction features. For textiles, create motif and repeat tests.'],['Render fabric and colour','Show fabric weight through fold direction, edge behaviour, texture and highlights. Prepare consistent colourways and print placement.'],['Prepare the design handoff','Label materials, trims, construction details and measurements as required. Review the design for wearability and production feasibility.']],
      practice:'Create a mini collection of three coordinated looks with front/back flats, one rendered fashion illustration and fabric/colour swatches.',
      pitfalls:['Drawing fabric as if every material drapes the same','Showing only the front view when construction needs more information','Prioritising decoration over comfort and function']
    },
    jewellery: {
      field:'jewellery and accessory design', purpose:'communicates wearable objects with convincing proportion, gemstone placement, material finish, construction and manufacturable details.',
      output:'design sketches, front/side/top views, stone layouts, setting details, metal and finish callouts, presentation renderings',
      skills:['Symmetry and precise geometric layout','Perspective and elliptical forms','Gemstone shape, facet and setting depiction','Metal reflection and surface rendering','Scale and wearability judgement','Clasp, hinge and joining details','Material and finish communication'],
      tools:['Fine pencils, technical pens, compass and precision rulers','Ellipse templates, tracing paper and layout grids','Colour pencils, markers or digital rendering tools','Gemstone, metal and setting reference samples'],
      workflow:[['Define the wearer and purpose','Confirm item type, size, budget, style, comfort and intended materials. Research relevant forms and manufacturing limits.'],['Explore shape and proportion','Sketch several silhouettes and check symmetry, scale and how the object sits on the body.'],['Resolve construction','Draw useful views and specify stones, settings, prongs, bezels, links, clasps and joining points.'],['Render materials','Use controlled highlights, dark reflections and facet planes to distinguish polished metal, matte finishes and gemstones.'],['Prepare a maker-ready sheet','Add dimensions, stone sizes, material notes and enlarged details. Check that the design can be worn and assembled.']],
      practice:'Design one ring or pendant with three concept sketches, a rendered hero view, side view and enlarged setting detail.',
      pitfalls:['Ignoring scale and comfort','Using random highlights that do not describe the metal form','Designing settings without considering how stones are secured']
    },
    character: {
      field:'character art and visual storytelling', purpose:'creates readable characters, creatures, props or sequences that communicate personality, action, story and visual continuity.',
      output:'silhouette explorations, character turnarounds, expression sheets, poses, storyboards, environment or prop concepts',
      skills:['Silhouette readability and shape language','Gesture, anatomy and dynamic posing','Character proportion and model consistency','Expression, acting and visual storytelling','Perspective and staging','Value grouping, colour scripting and design hierarchy','Clean presentation sheets'],
      tools:['Thumbnail sketchbook and gesture timer','Graphite, brush pens, markers or digital drawing tablet','Photo and anatomy reference used ethically','Storyboard or illustration software when appropriate'],
      workflow:[['Understand the story and audience','Identify the character or scene purpose, personality, world, emotional beat and production constraints.'],['Explore silhouettes and thumbnails','Create many small options. Test shape language, scale and readability at thumbnail size before adding detail.'],['Build form and action','Use gesture lines, simple volumes, anatomy and perspective to establish pose, weight and camera view.'],['Design details and continuity','Choose costume, surface, props, expressions and colour/value groups. Keep proportions and key identifiers consistent across views.'],['Present for production','Prepare clean turnarounds, pose or storyboard sheets with labels, camera direction and notes that collaborators can follow.']],
      practice:'Create one original character: 20 silhouettes, 5 pose studies, a front/side/back turnaround and a six-panel action sequence.',
      pitfalls:['Adding detail before the silhouette reads','Changing proportions between views','Using stiff poses without clear line of action']
    },
    fineart: {
      field:'fine art and observational drawing', purpose:'uses direct observation, personal interpretation and control of medium to create expressive or representational artwork.',
      output:'studies, finished drawings or paintings, tonal/value plans, colour studies, series work and exhibition-ready originals',
      skills:['Accurate observation and visual comparison','Gesture, contour and proportion','Light direction and tonal structure','Edges, mark-making and surface texture','Colour mixing and temperature','Composition and focal hierarchy','Personal interpretation and series development'],
      tools:['Sketchbook and suitable paper or canvas','Graphite, charcoal, erasers, blending tools or chosen paint medium','Brushes, palette, water containers and surface supports','Still-life, figure or landscape references and safe studio setup'],
      workflow:[['Observe and compose','Choose a subject, viewpoint and format. Make small composition studies and identify the main light source and focal area.'],['Measure the large shapes','Compare angles, heights, widths and negative spaces. Block in the biggest forms before small features.'],['Establish value or colour masses','Group lights, midtones and darks. In colour work, establish large temperature relationships before local detail.'],['Develop form and surface','Use directional marks, edges, layering and medium-specific techniques to describe volume, texture and atmosphere.'],['Edit and finish','Step back, compare the work with the subject and adjust hierarchy, edges and contrast. Protect and document the finished piece appropriately.']],
      practice:'Complete a five-study series of the same subject using different compositions, value ranges or media; include one resolved final work.',
      pitfalls:['Drawing symbols instead of observing the subject','Over-blending every edge','Adding detail before composition and value are working']
    },
    illustration: {
      field:'professional illustration and visual explanation', purpose:'makes a subject understandable or engaging for a specific audience, balancing visual accuracy, clarity and communication.',
      output:'annotated illustrations, editorial images, diagrams, plates, sequential visuals, publication-ready artwork and labelled detail views',
      skills:['Research and subject accuracy','Visual simplification without losing meaning','Contour, shape and proportion','Perspective or anatomical structure as relevant','Labelling, hierarchy and composition','Media control and reproducible colour','Audience-aware visual communication'],
      tools:['Reference library and subject-specific source material','Pencils, fineliners, lightbox or drawing tablet','Vector or raster illustration software','Grid, callout and typography tools for labelled work'],
      workflow:[['Research and verify','Define the audience and learning or communication goal. Gather trustworthy references and note which features must be accurate.'],['Plan the visual explanation','Choose the viewpoint, scale, sequence and labels. Sketch thumbnails to make the key information easy to understand.'],['Construct the subject','Build the subject from measured shapes, anatomy, geometry or perspective appropriate to the topic.'],['Clarify and annotate','Refine contours, textures and important structures. Add labels, arrows, scale bars or legends only where they improve understanding.'],['Review for accuracy and clarity','Check facts with appropriate references or subject experts. Test legibility at final size and prepare the correct file format.']],
      practice:'Create a one-page illustrated explainer on a subject you can research, with a main image, three detail callouts and a clear legend.',
      pitfalls:['Decorative detail that hides the important information','Unverified scientific or historical claims','Labels that are too small or disconnected from the subject']
    },
    decorative: {
      field:'decorative and ornamental design', purpose:'develops repeatable, balanced motifs and surface compositions for body art, lettering, rituals, objects or decorative applications.',
      output:'motif sheets, pattern grids, placement designs, line-art templates, lettering studies and finished ornamental compositions',
      skills:['Rhythm, repetition and visual balance','Symmetry, radial and modular construction','Line confidence and controlled taper','Negative-space planning','Motif variation and border design','Placement and scale adaptation','Clean transfer-ready artwork'],
      tools:['Smooth practice paper and tracing paper','Fine liners, brush pens, pencils and erasers','Compass, ruler, grid and stencil tools as appropriate','Skin-safe professional materials only for services performed by trained practitioners'],
      workflow:[['Define placement and purpose','Confirm the surface, size, audience, cultural context and practical constraints. Research motifs respectfully.'],['Build a layout grid','Set centre lines, axes, borders or repeat units. Check spacing and negative space before filling the design.'],['Develop motif variations','Draw the main motif, then create supporting leaves, dots, lines, flourishes or geometric elements.'],['Refine line and balance','Control line weight, spacing and symmetry. Simplify crowded areas so the pattern remains readable.'],['Prepare final artwork','Create a clean, correctly scaled design and test it on paper or a mock-up before any real application.']],
      practice:'Design a complete ornamental panel using a central motif, two borders and a balanced repeat; show the construction grid and final clean line art.',
      pitfalls:['Copying culturally significant motifs without understanding context','Crowding every gap with decoration','Using unsafe materials or applying body art without proper training and hygiene']
    },
    threeD: {
      field:'3D modeling and visualization', purpose:'translates reference and design intent into digital forms that can be inspected, rendered, animated or prepared for production.',
      output:'blockout models, sculpted forms, topology, UV layouts, material studies, lighting tests and final renders',
      skills:['Form analysis and proportion','Primary-to-secondary shape development','Topology and clean geometry','Sculpting and surface detail','UVs, materials and texture mapping','Lighting, camera and composition','File organisation and export settings'],
      tools:['Computer suitable for the chosen 3D software','3D modeling/sculpting and rendering application','Mouse or pen tablet and reference board','Model sheets, orthographic references and texture sources'],
      workflow:[['Gather reference and set scale','Collect front, side and detail references. Decide the model purpose, target platform and required level of detail.'],['Block out primary volumes','Use simple primitives to establish silhouette, proportions and major masses. Check the model from multiple views.'],['Refine structure and topology','Develop secondary forms and suitable edge flow. Keep geometry appropriate for rendering, animation or fabrication.'],['Add materials and lighting','Create UVs or procedural materials as needed. Test roughness, colour, scale and light direction with simple renders.'],['Render and deliver','Set camera, resolution and output format. Check geometry, textures, naming and file dependencies before delivery.']],
      practice:'Model a simple object from three reference views; submit a blockout, refined model, material test and three-angle render.',
      pitfalls:['Detailing before proportions are correct','Ignoring topology or intended use','Using dramatic lighting to hide modeling problems']
    },
    vehicle: {
      field:'transportation and vehicle design', purpose:'communicates vehicle form, ergonomics, packaging and surface character while balancing visual identity with real-world constraints.',
      output:'vehicle thumbnails, side/front/rear views, perspective renderings, package layouts, colour-and-trim boards and detail studies',
      skills:['Vehicle proportion and stance','Perspective and ellipse construction','Form flow and surface highlights','Wheel, cabin and component packaging','Ergonomic and visibility awareness','Colour, material and finish presentation','Design iteration and critique'],
      tools:['Large sketch paper, markers and pencils','Ellipse guides, rulers and perspective grids','Digital sketch/render software when useful','Vehicle photography, package diagrams and material samples'],
      workflow:[['Define the vehicle brief','Identify users, purpose, environment, size class, performance needs and design constraints.'],['Explore stance and silhouette','Draw side-view thumbnails. Establish wheelbase, overhangs, cabin volume, ground clearance and visual balance.'],['Build perspective views','Use perspective guides to construct wheels, glazing and major body volumes. Check that all views describe one coherent vehicle.'],['Develop surfaces and details','Refine character lines, lamps, openings, aero features and material breaks. Use highlights to explain surface curvature.'],['Present the proposal','Prepare consistent views, colour/material options and key details. Explain how the concept responds to the brief.']],
      practice:'Create a new mobility concept with 20 side silhouettes, one selected three-quarter view, side/front/rear orthographic views and a colour-and-trim board.',
      pitfalls:['Drawing wheels with inconsistent perspective','Ignoring occupant space and visibility','Adding styling lines that do not support the main volume']
    },
    graphic: {
      field:'graphic design and visual communication', purpose:'organises type, image, colour and information so a message is recognisable, readable and appropriate to its audience and medium.',
      output:'identity sketches, logo systems, layouts, posters, social graphics, packaging artwork and production-ready files',
      skills:['Thumbnailing and visual hierarchy','Typography, spacing and lettering','Grid systems and composition','Colour contrast and accessibility','Vector shape construction','Image selection and art direction','Print and digital file preparation'],
      tools:['Sketchbook, tracing paper and layout grid','Pencils, markers and typography references','Vector and raster design software','Brand brief, audience research and production specifications'],
      workflow:[['Clarify the communication goal','Identify audience, message, tone, platform, dimensions and required deliverables.'],['Explore concepts on paper','Create multiple thumbnail layouts or marks. Test hierarchy and recognisability before polishing.'],['Build the visual system','Choose type, grid, colour and image direction. Establish consistent spacing and alignment rules.'],['Refine and test','Check legibility at small and large sizes, contrast, reproduction and how the design works across formats.'],['Prepare final files','Package editable source files and export correct print or screen formats with fonts, links and bleed settings as required.']],
      practice:'Create a small identity project: 20 logo thumbnails, one refined mark, a type-and-colour system and three real-world applications.',
      pitfalls:['Using too many typefaces or effects','Ignoring contrast and small-size legibility','Designing one mock-up without testing other formats']
    },
    product: {
      field:'product and industrial design', purpose:'develops useful physical objects by communicating form, function, ergonomics, materials, assembly and manufacturing intent.',
      output:'concept sketches, orthographic views, exploded diagrams, ergonomic studies, CMF boards, prototypes and presentation renders',
      skills:['Product proportion and form language','Perspective and isometric drawing','Exploded and assembly views','Human factors and ergonomics','Material and manufacturing awareness','CMF (colour, material, finish) communication','Prototype testing and iteration'],
      tools:['Sketchbook, pencils, markers and fineliners','Rulers, ellipse guides and measuring tools','CAD or 3D modeling software as appropriate','Product references, material samples and simple prototyping supplies'],
      workflow:[['Study the user and use case','Observe how the product is held, operated, stored, cleaned or maintained. Define the problem and constraints.'],['Explore form and interaction','Draw alternative silhouettes, grip zones, controls and opening methods. Compare usability, not just appearance.'],['Construct views and details','Create perspective and orthographic drawings. Add sections or exploded views to explain internal parts and assembly.'],['Resolve materials and manufacture','Select plausible materials, finishes, wall thicknesses, joints and production methods for the intended product.'],['Prototype and communicate','Build or mock up a test version, record feedback and revise. Present dimensions, material choices and key features clearly.']],
      practice:'Redesign an everyday object for a specific user. Submit sketches, three views, an exploded diagram and a simple physical or digital prototype.',
      pitfalls:['Styling before understanding the user problem','Ignoring assembly, cleaning or repair','Showing a beautiful render without explaining function']
    },
    creative: {
      field:'specialist creative practice', purpose:'uses drawing as a practical tool to explore, develop and communicate ideas within a defined professional specialism.',
      output:'research sketches, concept alternatives, refined drawings, annotated studies and a portfolio case study',
      skills:['Observation and visual research','Shape, proportion and composition','Medium-specific mark-making','Subject-specific construction','Reference evaluation and accuracy','Iteration and critique','Professional presentation'],
      tools:['Sketchbook and suitable drawing paper','Pencils, fineliners, eraser and relevant colour media','Digital drawing tools where appropriate','Subject-specific references, samples and measuring tools'],
      workflow:[['Understand the brief','Identify the subject, audience, intended use and constraints. Collect references relevant to this specific role.'],['Explore alternatives','Make quick sketches to test composition, shape, viewpoint and visual approach.'],['Construct the drawing','Establish proportions and major forms before refining details. Use guides or measurements where accuracy matters.'],['Apply specialist technique','Use the medium, conventions and surface treatment expected in this professional field.'],['Review and present','Check clarity, accuracy and finish. Record the process and present the final work with useful context.']],
      practice:'Create a focused portfolio study that demonstrates research, at least three concept options, a refined final drawing and a short explanation of decisions.',
      pitfalls:['Using a generic drawing method without adapting it to the brief','Skipping reference research','Failing to show process or explain design decisions']
    }
  };
  const p = library[d];
  const roleDescription = `${name} is a specialist role in ${cat.title}. The work focuses on ${p.purpose} A professional may work from a client brief, a design team’s direction, direct observation or research, depending on the project and workplace.`;
  const roleTasks = {
    space:['Interpret client, site and user requirements','Develop spatial concepts and test layouts','Prepare coordinated views and communicate dimensions','Revise drawings after technical and client feedback'],
    technical:['Interpret specifications and engineering inputs','Prepare accurate views, details and dimensions','Coordinate drawing information with related disciplines','Check revisions and issue controlled documents'],
    fashion:['Research users, trends, function and materials','Develop silhouettes, prints or garment details','Communicate construction and material choices','Revise designs with sampling or production feedback'],
    jewellery:['Develop wearable concepts and proportion studies','Specify stones, metals, settings and finishes','Communicate construction details to makers','Check comfort, scale and feasibility'],
    character:['Develop visual concepts for a story or product','Create readable poses, designs or sequences','Maintain consistency across views and scenes','Revise work with director or team feedback'],
    fineart:['Research and select subjects or themes','Develop studies and compositions','Create original work using a chosen medium','Document, exhibit or present finished work'],
    illustration:['Research and verify subject information','Plan clear visual explanations for an audience','Create accurate and engaging artwork','Prepare labelled or publication-ready files'],
    decorative:['Research motifs and placement requirements','Construct balanced ornamental layouts','Refine line quality and repeat structure','Prepare clean artwork or transfer templates'],
    threeD:['Interpret references and technical requirements','Build and refine digital geometry','Create materials, lighting and presentation','Organise and deliver model and render files'],
    vehicle:['Interpret mobility needs and package constraints','Explore vehicle stance and silhouette','Develop coherent views and surface language','Present colour, trim and concept rationale'],
    graphic:['Understand audience, message and medium','Explore layouts, marks and typographic directions','Build and test a consistent visual system','Prepare production-ready assets'],
    product:['Research user needs and product function','Explore form, interaction and ergonomics','Communicate construction and materials','Prototype, test and refine the proposal'],
    creative:['Research the subject and intended outcome','Explore visual alternatives and composition','Create specialist drawings and refinements','Present the work with process evidence']
  };
  const tasks = roleTasks[d];
  const imageTags = {
    space:'architecture,architectural,interior,building,design',
    technical:'technical,drafting,engineering,blueprint,mechanical,drawing',
    fashion:'fashion,clothing,garment,fashion,design,illustration',
    jewellery:'jewelry,jewellery,gemstone,ring,ornament,design',
    character:'character,animation,concept,illustration,storyboard,art',
    fineart:'pencil,drawing,painting,artist,sketchbook,art',
    illustration:'scientific,botanical,medical,illustration,drawing,art',
    decorative:'mandala,ornamental,pattern,calligraphy,henna,design',
    threeD:'3d,modeling,sculpture,render,3d,design',
    vehicle:'automotive,car,vehicle,transportation,design,sketch',
    graphic:'graphic,poster,typography,branding,design,layout',
    product:'industrial,product,prototype,furniture,design,sketch',
    creative:'drawing,sketch,creative,artist,design,studio'
  };
  const query = `${name.toLowerCase().replace(/[^a-z0-9 ]/g,' ')} ${cat.title.toLowerCase().replace(/&/g,' ')}`.replace(/\s+/g,' ').trim();
  const lock = hash(name + '|' + cat.id);
  const photo = `https://loremflickr.com/1200/800/${encodeURIComponent((imageTags[d]+' '+query).replace(/\s+/g,','))}?lock=${lock}`;
  const image2 = `https://loremflickr.com/900/650/${encodeURIComponent((imageTags[d]+' process,studio,tools').replace(/\s+/g,','))}?lock=${lock+101}`;
  const image3 = `https://loremflickr.com/900/650/${encodeURIComponent((imageTags[d]+' sketch,design,detail').replace(/\s+/g,','))}?lock=${lock+211}`;
  const process = p.workflow.map((step,i)=>`<div class="step"><b>${i+1}</b><div><h3>${esc(step[0])}</h3><p>${esc(step[1])}</p></div></div>`).join('');
  const related = cat.careers.filter(x=>x!==name).slice(0,6);
  root.innerHTML = `
    <div class="breadcrumbs"><a href="index.html">Home</a> / <a href="category.html?id=${encodeURIComponent(cat.id)}">${esc(cat.title)}</a> / ${esc(name)}</div>
    <section class="career-hero" style="--career-image:url('${photo}')"><div class="career-hero-content"><span class="pill">${esc(cat.title)}</span><h1>${esc(name)}</h1><p>${esc(roleDescription)}</p><span class="pill">CAREER PROFILE · ${esc(p.field.toUpperCase())}</span></div></section>
    <div class="career-layout"><div class="career-main">
      <section class="content-card" id="overview"><h2><span>01</span> What does a ${esc(name)} do?</h2><p>${esc(roleDescription)}</p><p><b>Typical professional outputs:</b> ${esc(p.output)}.</p><h3>Typical responsibilities</h3><ul>${tasks.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>
      <section class="content-card" id="skills"><h2><span>02</span> Career-specific drawing skills</h2><p>These skills are selected for the work of a ${esc(name)} rather than a generic drawing course.</p><div class="skill-chips">${p.skills.map(x=>`<span>${esc(x)}</span>`).join('')}</div><h3>What professional quality looks like</h3><p>A strong portfolio demonstrates clear intent, accurate subject handling, controlled technique and the ability to communicate decisions to the people who will use the work.</p></section>
      <section class="content-card" id="workflow"><h2><span>03</span> How the work is done — step by step</h2><p>This workflow is specific to ${esc(name)} projects. Adapt it to the brief, workplace and local professional standards.</p><div class="steps">${process}</div></section>
      <section class="content-card" id="visual-reference"><h2><span>04</span> Career-related photo references</h2><p>Study the subject, tools and visual language shown in these references. Use them to understand the field, then create original work of your own.</p><div class="gallery career-gallery"><figure><img src="${photo}" alt="${esc(name)} related visual reference" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/900x650/211d27/f1d9a8?text=${encodeURIComponent(name)}'"><figcaption>${esc(name)} — field reference</figcaption></figure><figure><img src="${image2}" alt="${esc(name)} tools and working process" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/900x650/211d27/f1d9a8?text=Tools+and+process'"><figcaption>Tools and working process</figcaption></figure><figure><img src="${image3}" alt="${esc(name)} sketch and design detail" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/900x650/211d27/f1d9a8?text=Sketch+and+detail'"><figcaption>Sketch and detail study</figcaption></figure></div><p><small>Images are fetched from an external photo service and require an internet connection. For a permanent production gallery, replace them with original or properly licensed career-specific photographs.</small></p></section>
      <section class="content-card" id="tools"><h2><span>05</span> Tools and materials</h2><ul>${p.tools.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>
      <section class="content-card" id="good-practice"><h2><span>06</span> Good practice — do and avoid</h2><div class="do-dont"><article><h3>✓ Do this</h3><ul><li>Begin with a clear brief and relevant references.</li><li>Check the core structure before adding fine detail.</li><li>Keep dated iterations and use critique to improve.</li><li>Respect copyright, cultural context and professional safety.</li></ul></article><article><h3>× Avoid this</h3><ul>${p.pitfalls.map(x=>`<li>${esc(x)}</li>`).join('')}<li>Presenting copied reference artwork as your own original work.</li></ul></article></div></section>
      <section class="content-card" id="practice"><h2><span>07</span> Practice project for this career</h2><p>${esc(p.practice)}</p><h3>Portfolio evidence to keep</h3><ul><li>Research and reference notes</li><li>Early thumbnails and rejected alternatives</li><li>Construction or process stages</li><li>Final drawing with a short explanation of decisions</li></ul></section>
      <section class="content-card" id="roadmap"><h2><span>08</span> Learning roadmap</h2><div class="steps"><div class="step"><b>1</b><div><h3>Foundation</h3><p>Practise line control, shape, proportion, observation and basic composition relevant to this field.</p></div></div><div class="step"><b>2</b><div><h3>Specialist studies</h3><p>Complete focused exercises in ${esc(p.skills.slice(0,3).join(', ').toLowerCase())}.</p></div></div><div class="step"><b>3</b><div><h3>Guided projects</h3><p>Repeat the workflow with small briefs and ask a teacher, mentor or peer to critique the results.</p></div></div><div class="step"><b>4</b><div><h3>Portfolio development</h3><p>Build three to five well-documented projects that show process, accuracy and final presentation.</p></div></div><div class="step"><b>5</b><div><h3>Professional readiness</h3><p>Study the software, standards, qualifications or workplace expectations used in your chosen market.</p></div></div></div></section>
      <section class="content-card"><h2><span>09</span> Career opportunities</h2><p>Possible workplaces include specialist studios, design consultancies, production teams, agencies, publishers, manufacturers, educational organisations or independent freelance practice, depending on the specialism. Job titles and entry requirements vary by country and employer.</p></section>
    </div><aside class="career-sidebar"><div class="content-card"><h3>On this page</h3><a href="#overview">Career overview</a><a href="#skills">Drawing skills</a><a href="#workflow">Work process</a><a href="#visual-reference">Photo references</a><a href="#tools">Tools & materials</a><a href="#good-practice">Do & avoid</a><a href="#practice">Practice project</a><a href="#roadmap">Learning roadmap</a></div><div class="content-card"><h3>More careers in this category</h3>${related.map(x=>`<a href="career.html?id=${encodeURIComponent(slug(x))}&category=${encodeURIComponent(cat.id)}">${esc(x)} ↗</a>`).join('')}</div></aside></div>`;
})();