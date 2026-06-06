const STORAGE_KEY = "sky-audio-market-intel-v1";

const SEGMENTS = ["Organiser", "Venue", "Event Agency", "Hotel"];
const STAGES = ["Identified", "Need Intro", "Contacted", "Met", "Presented", "Connected"];
const EVENT_STATUSES = ["Watchlist", "Target", "Contacted", "Proposal", "Won", "Passed"];
const APP_YEAR = 2026;
let deferredInstallPrompt = null;

const seedContacts = [
  { priority: "A", segment: "Organiser", company: "IFP Qatar", contactName: "Hayat Bayan", role: "Commercial & Operations Director", email: "hayat.bayan@ifpqatar.com", phone: "+974 44 329900 ext 612", source: "https://hospitalityqatar.com/contact-us; https://projectqatar.com/Book%20Your%20Space%20-219", package: "Gala Dinner Signature / Conference Standard / custom expo", estimatedValue: "150000-350000", reason: "Controls Project Qatar, Hospitality Qatar, Food Qatar and broad exhibitor network", confidence: "High", action: "Send organizer partnership email and request meeting for Q3/Q4 event support", notes: "Highest priority organizer relationship; one contact can open multiple exhibitions." },
  { priority: "A", segment: "Organiser", company: "IFP Group", contactName: "Rawad Raad", role: "International Sales Manager", email: "is@ifpexpo.com", phone: "+961 1 511977 ext 177", source: "https://food-qatar.com/book-your-space; https://projectqatar.com/Book%20Your%20Space%20-219", package: "Conference Standard / custom expo", estimatedValue: "80000-250000", reason: "International exhibitor and sponsor access across IFP portfolio", confidence: "High", action: "Approach for exhibitor add-on AV and international sponsor support", notes: "Use as route to exhibitors, sponsors and country pavilions." },
  { priority: "A", segment: "Organiser", company: "IFP Qatar", contactName: "IFP Qatar Team", role: "General organizer route", email: "info@ifpqatar.com", phone: "+974 44329900", source: "https://hospitalityqatar.com/contact-us", package: "Conference Standard / custom expo", estimatedValue: "80000-250000", reason: "Fast route into multiple events even if named lead is unavailable", confidence: "High", action: "Send capability deck and request correct production/procurement contact", notes: "Use general route if direct lead does not respond." },
  { priority: "A", segment: "Venue", company: "DECC", contactName: "DECC Team", role: "General / organizer route", email: "info@decc.qa", phone: "+974 40331111", source: "https://www.decc.qa/contact/", package: "Conference Standard / Gala Dinner Signature / custom expo", estimatedValue: "60000-250000", reason: "Venue operator for largest concentration of public exhibitions", confidence: "High", action: "Request vendor registration and preferred supplier requirements", notes: "Critical venue relationship for exhibition calendar." },
  { priority: "A", segment: "Venue", company: "QNCC", contactName: "QNCC Sales", role: "Venue sales", email: "sales@qncc.qa", phone: "+974 44707183", source: "https://www.qncc.qa/contact-us", package: "Gala Dinner Signature / Conference Standard", estimatedValue: "60000-250000", reason: "Conference and entertainment venue with direct booking route", confidence: "High", action: "Ask for supplier registration and upcoming event production overflow needs", notes: "Strong route for conferences, cultural events and high-capacity shows." },
  { priority: "A", segment: "Venue", company: "Katara", contactName: "Katara Events", role: "Events team", email: "events@katara.net", phone: "+974 44080050 / 0978", source: "https://kataraculturalvillage.blogspot.com/p/contact-us.html; https://www.katara.net/en/contact-us", package: "Outdoor / Poolside Event / Gala Dinner Signature", estimatedValue: "50000-180000", reason: "Cultural venue with recurring public and private programs", confidence: "High", action: "Request meeting with events team and pitch outdoor activation packages", notes: "Best for cultural, public, outdoor and brand events." },
  { priority: "A", segment: "Venue", company: "Old Doha Port", contactName: "Old Doha Port Events", role: "Events team", email: "events@odp.qa", phone: "+974 55273308", source: "https://odp.qa/contact-us", package: "Outdoor / Poolside Event / Gala Dinner Signature", estimatedValue: "50000-180000", reason: "Strong experiential and waterfront event potential", confidence: "High", action: "Pitch outdoor activation, waterfront events and sponsor/VIP hospitality support", notes: "Strong fit for destination events, festivals and lifestyle activations." },
  { priority: "A", segment: "Venue", company: "Qatar Museums / QC+", contactName: "QC+ Venue Sales", role: "Venue sales", email: "eventsales@qm.org.qa", phone: "+974 44525178", source: "https://qcplus.qa/venue-contact-form", package: "Conference Standard / Gala Dinner Signature", estimatedValue: "40000-160000", reason: "Qatar Museums commercial venue route", confidence: "High", action: "Send venue partnership proposal and request available event calendar", notes: "Good for premium cultural venues, brand dinners and design events." },
  { priority: "A", segment: "Venue", company: "Qatar Museums", contactName: "QM Events Team", role: "Commercial venue hire", email: "QMEventsTeam@qm.org.qa", phone: "+974 44028888", source: "https://qm.org.qa/en/contact-us/", package: "Gala Dinner Signature / Conference Standard", estimatedValue: "50000-200000", reason: "Institutional events and venue rentals", confidence: "High", action: "Request event hire supplier requirements and venue technical audit meeting", notes: "Potential for institutional, cultural and sponsor-led events." },
  { priority: "A", segment: "Venue", company: "Lusail International Circuit", contactName: "Lusail Circuit Team", role: "Circuit contact", email: "info@lcsc.qa", phone: "+974 44459555", source: "https://www.circuitlosail.com/the-club?page=contact-us; https://tickets.lcsc.qa/content?lang=en", package: "Outdoor / Poolside Event / custom hospitality", estimatedValue: "150000-400000", reason: "F1 hospitality and motorsport activation route", confidence: "Medium", action: "Pitch hospitality pavilion, sponsor activation and event support around motorsport calendar", notes: "High-value but likely needs early vendor registration and approvals." },
  { priority: "A", segment: "Organiser", company: "Qatar Event Show", contactName: "QES Team", role: "Organizer route", email: "info@qatareventshow.com", phone: "+974 50067407", source: "https://qatareventshow.com/contact", package: "Conference Standard / Gala Dinner Signature / custom expo", estimatedValue: "100000-220000", reason: "Direct path into event industry show and exhibitor network", confidence: "High", action: "Contact organizer to become supplier and consider exhibiting Sky Audio", notes: "Strategic account because attendees are event decision makers." },
  { priority: "A", segment: "Organiser", company: "Mangusteen", contactName: "Aziz Louksah", role: "Organizer contact", email: "aziz@mangusteen.com", phone: "+974 40022360", source: "https://qatareventshow.com/contact", package: "Conference Standard / custom expo", estimatedValue: "80000-180000", reason: "Named public contact linked to Qatar Event Show", confidence: "Medium", action: "Send concise partnership pitch referencing Qatar Event Show", notes: "Verify role/current involvement before sending detailed proposal." },
  { priority: "A", segment: "Event Agency", company: "Apex Events", contactName: "Apex Events Team", role: "Events team", email: "events@apexqatar.com", phone: "+974 33834548", source: "https://apexqatar.com/contact-us/", package: "Conference Standard / Gala Dinner Signature", estimatedValue: "25000-120000", reason: "Corporate event channel with repeat local execution needs", confidence: "High", action: "Pitch overflow production support and fast local AVL execution", notes: "Agency channel; position as white-label technical production partner." },
  { priority: "A", segment: "Event Agency", company: "Just us & Otto", contactName: "General Contact", role: "Agency contact", email: "info@justusandotto.com", phone: "+974 44317036", source: "https://www.justusandotto.com/contact", package: "Conference Standard / Gala Dinner Signature", estimatedValue: "25000-120000", reason: "Strong press conference and corporate launch profile", confidence: "High", action: "Send agency partner deck and request production manager contact", notes: "Good fit for corporate launches, press events and brand activations." },
  { priority: "A", segment: "Event Agency", company: "Red Pepper Events", contactName: "Admin Team", role: "Agency contact", email: "admin@redpepperqa.com", phone: "+974 33119957", source: "https://redpepperqa.com/contact-us/", package: "Conference Standard / Gala Dinner Signature", estimatedValue: "25000-100000", reason: "Corporate and promotional events channel", confidence: "High", action: "Send capability email and request project/production lead", notes: "Use general/admin route plus production email below." },
  { priority: "A", segment: "Event Agency", company: "Red Pepper Events", contactName: "Production Team", role: "Production contact", email: "prod@redpepperqa.com", phone: "+974 40176223", source: "https://redpepperqa.com/contact-us/", package: "Conference Standard / Outdoor / Poolside Event", estimatedValue: "25000-100000", reason: "Production-side entry point for subcontract AV", confidence: "High", action: "Pitch equipment, crew and last-minute production support", notes: "Better technical buyer than general inbox." },
  { priority: "A", segment: "Event Agency", company: "Expotale", contactName: "General Contact", role: "Agency contact", email: "info@expotale.com", phone: "+974 50518899", source: "https://expotale.com/contact-us/", package: "Conference Standard / Gala Dinner Signature", estimatedValue: "25000-100000", reason: "Events and exhibition management channel", confidence: "High", action: "Approach for exhibition/event AV subcontract opportunities", notes: "Good fit for expo add-ons and organizer support." },
  { priority: "A", segment: "Event Agency", company: "QVision", contactName: "Hytham El-Samak", role: "Events Services", email: "hytham@qatarvision.com", phone: "+974 44476660", source: "https://www.bizmideast.com/QA/qvision-productions-qatar-vision_3s-4447-6660", package: "Gala Dinner Signature / custom production", estimatedValue: "40000-150000", reason: "Large events history and potential overflow/partner route", confidence: "Medium", action: "Approach as local production support or overflow partner", notes: "Potential competitor; position carefully as collaboration/overflow." },
  { priority: "A", segment: "Event Agency", company: "Mass Production", contactName: "General Contact", role: "Agency contact", email: "info@massprome.com", phone: "+974 33888509", source: "https://massprome.com/", package: "Conference Standard / custom expo", estimatedValue: "30000-120000", reason: "Exhibition and build-up channel", confidence: "High", action: "Pitch AV packages for stands, conferences and launch areas", notes: "Good partner for exhibition stand and show-floor opportunities." },
  { priority: "A", segment: "Hotel", company: "Sheraton Grand Doha Resort & Convention Hotel", contactName: "Mohannad Barqawi", role: "Director of Sales", email: "mohannad.barqawi@sheraton.com", phone: "44854458 / 66869242", source: "https://www.qatarchamber.com/hotel-partners/entry/10071/?letter=s; https://www.marriott.com/en-us/hotels/dohsi-sheraton-grand-doha-resort-and-convention-hotel/events/", package: "Gala Dinner Signature", estimatedValue: "17500-120000", reason: "Named direct sales leader at major convention hotel", confidence: "High", action: "Send hotel packages deck and request preferred supplier/exclusivity discussion", notes: "Top hotel target for annual exclusivity and convention work." },
  { priority: "A", segment: "Hotel", company: "Pullman Doha West Bay", contactName: "Reservations / Sales Route", role: "Hotel route", email: "reservations.pullmandoha@accor.com", phone: "+974 40094000", source: "https://www.pullman-doha-westbay.com/the-hotel/contact-us/; https://pullman.accor.com/en/hotels/doha/8112/meetings.html", package: "Conference Standard", estimatedValue: "8500-60000", reason: "Strong business-hotel fit for recurring conferences", confidence: "High", action: "Pitch Conference Standard and monthly service discussion option", notes: "Good fit for repeat meeting and business event packages." },
  { priority: "A", segment: "Hotel", company: "Mandarin Oriental Doha", contactName: "Sales Conferences & Events", role: "Events team", email: "modoh-sales@mohg.com", phone: "+974 40088888", source: "https://www.mandarinoriental.com/en/doha/msheireb/contact-us", package: "Gala Dinner Signature / Conference Standard", estimatedValue: "17500-90000", reason: "Premium executive meetings and dinners", confidence: "High", action: "Send premium-friendly hotel proposal and request site audit", notes: "Strong executive and luxury positioning fit." },
  { priority: "A", segment: "Hotel", company: "The Ned Doha", contactName: "General Enquiries", role: "Hotel route", email: "enquiries.doha@thened.com", phone: "+974 44061111", source: "https://www.thened.com/doha/contact", package: "Lounge / DJ Nights / Gala Dinner Signature", estimatedValue: "2500-80000", reason: "High-fit for F&B activations rooftop events and launches", confidence: "High", action: "Pitch lounge/DJ nights, launches and rooftop event production", notes: "Strong fit for lifestyle and F&B recurring work." },
  { priority: "A", segment: "Hotel", company: "Fairmont Doha", contactName: "Hotel route", role: "General contact", email: "info.doha@fairmont.com", phone: "+974 40307200", source: "https://www.fairmont.com/en/hotels/doha/fairmont-doha/location-contact.html", package: "Gala Dinner Signature / Conference Standard", estimatedValue: "17500-100000", reason: "Katara Towers flagship venue", confidence: "High", action: "Pitch premium hotel partnership and annual exclusivity option", notes: "Flagship luxury account." },
  { priority: "A", segment: "Hotel", company: "Banyan Tree Doha", contactName: "General contact", role: "Hotel route", email: "info-doha@banyantree.com", phone: "+974 44103333", source: "https://www.banyantree.com/qatar/doha", package: "Gala Dinner Signature / Conference Standard", estimatedValue: "17500-90000", reason: "Premium social and business events", confidence: "High", action: "Pitch gala, corporate and design-led event packages", notes: "Good premium social and corporate account." },
  { priority: "A", segment: "Hotel", company: "Hilton Doha", contactName: "Hotel route", role: "Main inbox", email: "info@hiltondoha.com", phone: "+974 44233333", source: "https://www.hilton.com/en/hotels/dohhdhi-hilton-doha/events/; https://qatar.arablocal.com/business/view/hilton-doha", package: "Conference Standard / Gala Dinner Signature", estimatedValue: "8500-90000", reason: "Ballroom and meeting inventory", confidence: "Medium", action: "Phone-verify events/sales contact and send packages deck", notes: "Verify correct events inbox before sending." },
  { priority: "A", segment: "Hotel", company: "Hilton Doha The Pearl", contactName: "Sales route", role: "Events team", email: "sales.DOHPR@hilton.com", phone: "+974 44924801", source: "https://www.youtube.com/watch?v=DJTxubw6rys; https://www.hilton.com/en/hotels/dohprhi-hilton-doha-the-pearl/", package: "Outdoor / Poolside Event / Lounge DJ Nights", estimatedValue: "4900-70000", reason: "Strong fit for poolside and F&B activations", confidence: "Medium", action: "Pitch outdoor/poolside package and F&B lounge activation support", notes: "Good recurring F&B and poolside account." },
  { priority: "A", segment: "Hotel", company: "The Ritz-Carlton Doha", contactName: "Hotel route", role: "General route", email: "info.rc.doha@ritzcarlton.com", phone: "+974 44848000", source: "https://www.qatarchamber.com/hotel-partners/entry/26715/?sort%5B18%5D=desc; https://www.ritzcarlton.com/en/hotels/dohrz-the-ritz-carlton-doha/overview/", package: "Gala Dinner Signature", estimatedValue: "17500-120000", reason: "Premium ballroom and luxury audience", confidence: "Medium", action: "Phone-verify events contact then send executive hotel proposal", notes: "Premium target; approach through relationship and reference work." },
  { priority: "A", segment: "Venue", company: "Qatar Tourism / Business Events", contactName: "Business events route", role: "Public route", email: "", phone: "", source: "https://www.qatartourism.com/en/business-events; https://www.qatartourism.com/en/business-events/calendar-of-business-events", package: "Conference Standard / custom venue support", estimatedValue: "50000-200000", reason: "Strategic umbrella route for business-event leads", confidence: "Medium", action: "Use website route and LinkedIn to identify business events team", notes: "Important influence route, but contact enrichment required." },
  { priority: "B", segment: "Event Agency", company: "Top Events", contactName: "General Contact", role: "Agency route", email: "", phone: "+974 44770255", source: "https://www.topevents.qa/contact", package: "Conference Standard / Gala Dinner Signature", estimatedValue: "25000-100000", reason: "Strong exhibition and corporate events fit", confidence: "Medium", action: "Call to identify production manager, then send agency deck", notes: "Phone-first target due to missing public email." },
  { priority: "B", segment: "Event Agency", company: "Guidance Events", contactName: "Public contact", role: "Agency route", email: "", phone: "+974 70117445", source: "https://guidanceqatar.com/contact-us/", package: "Conference Standard / Outdoor / Poolside Event", estimatedValue: "20000-80000", reason: "Supplemental local agency channel", confidence: "Medium", action: "Phone/WhatsApp contact and request production buyer email", notes: "Secondary agency target." },
  { priority: "B", segment: "Event Agency", company: "Spirit Events", contactName: "Public contact", role: "Agency route", email: "", phone: "", source: "https://spiritevents.qa/", package: "Conference Standard / Gala Dinner Signature", estimatedValue: "20000-80000", reason: "Corporate event agency", confidence: "Medium", action: "Use website form and LinkedIn to identify event director", notes: "Requires contact enrichment." },
  { priority: "B", segment: "Event Agency", company: "Dot Vision", contactName: "General Office", role: "Agency route", email: "", phone: "+974 44808181", source: "https://dotvisiongroup.com/contact-us/", package: "Conference Standard / custom AV", estimatedValue: "25000-100000", reason: "Event display/branding/AV crossover", confidence: "Medium", action: "Call to explore overflow production cooperation", notes: "Potential partner/competitor channel." },
  { priority: "B", segment: "Event Agency", company: "Dot Vision", contactName: "Kamel Makarem", role: "Founder / Director", email: "", phone: "+974 55888929", source: "https://dotvisiongroup.com/contact-us/", package: "Conference Standard / custom AV", estimatedValue: "25000-100000", reason: "Named founder reference in public business pages", confidence: "Low", action: "Verify current role before outreach", notes: "Use cautiously; verify before adding to CRM campaign." },
  { priority: "B", segment: "Event Agency", company: "Quein Conference and Event Organization", contactName: "Public contact", role: "Agency route", email: "", phone: "", source: "https://queinevents.com/", package: "Conference Standard / Gala Dinner Signature", estimatedValue: "20000-80000", reason: "Conference and occasion planner", confidence: "Medium", action: "Use website contact form and LinkedIn enrichment", notes: "Good conference/event planner lead but needs verification." },
  { priority: "B", segment: "Hotel", company: "St. Regis Doha", contactName: "Amal Mansouri", role: "Senior Sales Manager", email: "", phone: "33009222", source: "https://www.qatarchamber.com/hotel-partners/entry/176289/", package: "Gala Dinner Signature", estimatedValue: "17500-120000", reason: "Named seller at flagship luxury hotel", confidence: "Medium", action: "Call first, then send hotel proposal to confirmed email", notes: "Email not public in extracted result; verify." },
  { priority: "B", segment: "Hotel", company: "Steigenberger Hotel Doha", contactName: "Ahmed Eissa", role: "Sales Manager", email: "", phone: "+974 40201647 ext 1646 / +974 55368035", source: "https://www.qatarchamber.com/hotel-partners/entry/176285/", package: "Conference Standard / Gala Dinner Signature", estimatedValue: "8500-70000", reason: "Named sales contact at business hotel", confidence: "Medium", action: "Call to introduce packages and request meeting", notes: "Good mid-market hotel account." },
  { priority: "B", segment: "Hotel", company: "Wyndham Doha West Bay", contactName: "Ramy Aboushetia", role: "Assistant Sales Manager", email: "", phone: "66840380", source: "https://www.qatarchamber.com/hotel-partners/entry/176284/", package: "Conference Standard", estimatedValue: "8500-60000", reason: "Named city-business-hotel seller", confidence: "Medium", action: "Call first and pitch recurring meeting/conference support", notes: "Good business meeting package fit." },
  { priority: "B", segment: "Hotel", company: "Crowne Plaza Doha - The Business Park", contactName: "Mohammed Al Batayneh", role: "Senior Sales Manager", email: "", phone: "55623648", source: "https://www.qatarchamber.com/hotel-partners/entry/7121/?letter=h", package: "Meeting Lite / Conference Standard", estimatedValue: "3000-50000", reason: "Excellent fit for recurring conference packages", confidence: "Medium", action: "Use IHG testimonial and pitch hotel package deck", notes: "Strong past relationship angle if already in Sky Audio portfolio." },
  { priority: "B", segment: "Hotel", company: "InterContinental Doha", contactName: "Youssef Nader", role: "Assistant Director of Sales", email: "", phone: "44844996 / 55575336", source: "https://www.qatarchamber.com/hotel-partners/entry/9898/?pagenum=3; https://doha.intercontinental.com/", package: "Gala Dinner Signature / Outdoor / Poolside Event", estimatedValue: "17500-100000", reason: "Beachfront premium events and banquets", confidence: "Medium", action: "Call and pitch beachfront/poolside events plus gala support", notes: "Premium venue with outdoor and ballroom opportunity." },
  { priority: "B", segment: "Hotel", company: "InterContinental Doha The City", contactName: "Ahmed Salah", role: "Sales Manager", email: "", phone: "401587155 / 70218816", source: "https://qatarvenues.com/intercontinental-doha-the-city/", package: "Conference Standard / Gala Dinner Signature", estimatedValue: "8500-90000", reason: "Corporate city location with meeting demand", confidence: "Medium", action: "Phone verify correct event sales contact", notes: "Good corporate events location." },
  { priority: "B", segment: "Hotel", company: "The Plaza LXR Hotel by Hilton Doha", contactName: "Maged Ibrahim", role: "Sales lead", email: "", phone: "verify", source: "https://www.qatarchamber.com/hotel-partners/", package: "Gala Dinner Signature", estimatedValue: "17500-90000", reason: "Named high-end hotel seller through Qatar Chamber", confidence: "Low", action: "Verify contact and current role before outreach", notes: "Needs phone/email verification before campaign." },
  { priority: "B", segment: "Hotel", company: "Andaz Doha", contactName: "Hotel route", role: "Main line", email: "", phone: "+974 44521234", source: "https://www.hyatt.com/andaz/en-US/dohaz-andaz-dohaz; https://doha.andazhotels.cn/contact.html", package: "Lounge / DJ Nights / Conference Standard", estimatedValue: "2500-70000", reason: "Lifestyle venue for launches and social events", confidence: "Medium", action: "Call for events/F&B contact, then pitch lounge and launch packages", notes: "Good for lifestyle/F&B events." },
  { priority: "B", segment: "Hotel", company: "Le Royal Meridien Place Vendome Lusail", contactName: "Hotel route", role: "Main line", email: "", phone: "+974 41416060", source: "https://www.marriott.com/en-us/hotels/dohmd-le-royal-meridien-place-vendome-lusail/events/", package: "Conference Standard / Gala Dinner Signature", estimatedValue: "8500-80000", reason: "Lusail luxury retail/hotel crossover", confidence: "Medium", action: "Call events team and pitch retail/hotel event activations", notes: "Good Lusail retail and hotel crossover opportunity." },
  { priority: "B", segment: "Hotel", company: "Waldorf Astoria Doha Lusail", contactName: "Reservations route", role: "Hotel route", email: "Reservations.Lusail@waldorfastoria.com", phone: "+974 44565656", source: "https://www.hilton.com/en/hotels/dohqtwa-waldorf-astoria-doha-lusail/; https://newindoha.com/endless-summer-adventures-await-at-waldorf-astoria-doha-lusail/", package: "Gala Dinner Signature / Outdoor / Poolside Event", estimatedValue: "17500-120000", reason: "Resort and premium hospitality target", confidence: "Medium", action: "Request events sales contact and pitch resort/poolside package", notes: "High-value resort target; email may route to reservations first." },
  { priority: "B", segment: "Venue", company: "M7 / Msheireb", contactName: "M7 Team", role: "Venue route", email: "contact@m7.org.qa", phone: "verify", source: "https://m7.org.qa/en/contact-us/; https://qcplus.qa/m7", package: "Conference Standard / Gala Dinner Signature", estimatedValue: "30000-120000", reason: "Creative and design-led venue activity", confidence: "Medium", action: "Pitch creative event and design-led technical support", notes: "Good fit for brand launches, design events and panels." },
  { priority: "B", segment: "Organiser", company: "Doha Forum", contactName: "Forum route", role: "EOI / participation route", email: "", phone: "", source: "https://dohaforum.org/; https://dohaforum.org/expression-of-interest", package: "Conference Standard / custom forum support", estimatedValue: "120000-300000", reason: "High-level forum and ancillary receptions", confidence: "Medium", action: "Identify secretariat/procurement/venue contacts and pitch interpretation/streaming/support", notes: "High-value but likely formal procurement route." },
  { priority: "B", segment: "Organiser", company: "Formula 1 Qatar GP", contactName: "Hospitality / venue route", role: "Public route", email: "", phone: "", source: "https://tickets.lcsc.qa/content?lang=en; https://www.circuitlosail.com/the-club?page=contact-us", package: "Outdoor / Poolside Event / custom hospitality", estimatedValue: "150000-400000", reason: "High-value hospitality and sponsor activation ecosystem", confidence: "Medium", action: "Approach Lusail Circuit, hotels and sponsors for hospitality support", notes: "Indirect route through sponsors, hotels and agency partners may work better than direct race production." }
].map((contact, index) => ({
  id: `contact-${index + 1}`,
  stage: "Identified",
  introducer: blankIntroducer(),
  ...contact
}));

const seedEvents = [
  { name: "Qatar Outlet Exhibition", start: "2026-06-05", end: "2026-06-09", venue: "DECC", organizer: "Public organizer not clearly disclosed", scale: "Major consumer shopping exhibition", scope: "PA, promo stage, LED signage, retail brand activations, DJs", outreach: "DECC + organizer + participating brands", opportunity: "QAR 40k-120k" },
  { name: "Project Qatar 2026", start: "2026-06-09", end: "2026-06-11", venue: "DECC", organizer: "IFP Qatar", scale: "200 exhibitors, 15,000 unique visitors, 14,000 sqm", scope: "Opening ceremony, conference stage, LED, truss, exhibitor upsell, translation/streaming", outreach: "Direct to IFP Qatar", opportunity: "QAR 150k-350k" },
  { name: "Qatar Smart Manufacturing 2026", start: "2026-06-09", end: "2026-06-11", venue: "DECC", organizer: "IFP Group", scale: "Industry exhibition + conference/workshops", scope: "Summit stage, panel AV, LED, networking areas", outreach: "Direct to organizer; piggyback via Project Qatar/IFP relationship", opportunity: "QAR 80k-180k" },
  { name: "Qatar Toy Festival", start: "2026-07-01", end: "2026-08-31", venue: "DECC", organizer: "Public calendar / venue listing", scale: "Consumer/family traffic event", scope: "Activation zones, kids-stage AVL, LED, timing systems", outreach: "DECC + festival organizer + sponsors", opportunity: "QAR 50k-120k" },
  { name: "Doha Summer Trade Fair", start: "2026-07-01", end: "2026-08-31", venue: "DECC", organizer: "Public calendar / venue listing", scale: "Consumer trade/shopping traffic", scope: "LED signage, promo PA, MC/DJ support, brand zones", outreach: "DECC + organizer + exhibitors", opportunity: "QAR 40k-100k" },
  { name: "Doha Jewellery & Watches Exhibition", start: "2026-08-28", end: "2026-10-03", venue: "DECC", organizer: "Public calendar / venue listing", scale: "Premium luxury retail audience", scope: "VIP lounge AV, brand launch moments, LED, premium lighting", outreach: "Organizer + luxury exhibitors + hotel after-events", opportunity: "QAR 60k-180k" },
  { name: "Qatar Event Show 2026", start: "2026-09-01", end: "2026-09-03", venue: "DECC", organizer: "Mangusteen", scale: "50+ exhibitors, 5,000+ delegates", scope: "Full show AV, conference stages, exhibitor showcases, networking zones", outreach: "Direct to Mangusteen/QES; also exhibit Sky Audio", opportunity: "QAR 100k-220k" },
  { name: "Halal Expo 2026", start: "2026-09-07", end: "2026-09-09", venue: "DECC", organizer: "Public calendar / venue listing", scale: "Trade and consumer crossover", scope: "Conference AV, exhibitor add-ons, LED, signage", outreach: "DECC + organizer verification + sponsors", opportunity: "QAR 60k-140k" },
  { name: "John Legend Live in Qatar", start: "2026-09-10", end: "2026-09-10", venue: "QNCC", organizer: "Visit Qatar", scale: "Premium one-night concert", scope: "Concert reinforcement, VIP hospitality zones, after-party, sponsor activations", outreach: "Promoter/venue/VIP hospitality partners", opportunity: "QAR 50k-150k" },
  { name: "Hospitality Qatar 2026", start: "2026-10-12", end: "2026-10-14", venue: "DECC", organizer: "IFP Qatar", scale: "150 exhibitors, 12,000 visitors (2025 highlights)", scope: "Exhibition + workshops + chef demos + hotelier networking", outreach: "Direct to IFP; secondary route via exhibitors and hotel groups", opportunity: "QAR 120k-250k" },
  { name: "Food Qatar 2026", start: "2026-10-12", end: "2026-10-14", venue: "DECC", organizer: "IFP Qatar", scale: "Thousands of food-trade buyers; powered by Hospitality Qatar", scope: "Demo kitchens, conference AV, exhibitor LED, product launch moments", outreach: "Direct to IFP; secondary route via food brands", opportunity: "QAR 80k-180k" },
  { name: "Robotech26", start: "2026-10-27", end: "2026-10-29", venue: "QNCC", organizer: "Official QNCC event listing", scale: "Tech/robotics expo audience", scope: "Stage demos, LED displays, conference sessions, expo floor AV", outreach: "Direct to QNCC / organizer", opportunity: "QAR 100k-250k" },
  { name: "Mughal-E-Azam: The Musical", start: "2026-11-06", end: "2026-11-07", venue: "QNCC Al Mayassa Theatre", organizer: "Ticketed production", scale: "Two-night theater audience", scope: "Backline support, side-event AV, hospitality, sponsor lounges", outreach: "Venue + local promoter + hotel after-events", opportunity: "QAR 35k-90k" },
  { name: "Hans Zimmer Live", start: "2026-11-06", end: "2026-11-06", venue: "Stadium 974 Precinct", organizer: "Visit Qatar", scale: "Stadium-scale premium concert", scope: "Ancillary-delay towers/local support, VIP zones, hospitality activations", outreach: "Visit Qatar/promoter + sponsorship partners + after-parties", opportunity: "QAR 80k-200k" },
  { name: "Shakira Live in Doha", start: "2026-11-18", end: "2026-11-18", venue: "Stadium 974", organizer: "Visit Qatar", scale: "Stadium-scale premium concert", scope: "Ancillary AV, hospitality zones, VIP receptions, sponsor activations", outreach: "Visit Qatar/promoter + hotel/brand after-events", opportunity: "QAR 100k-250k" },
  { name: "Formula 1 Qatar Airways Qatar Grand Prix 2026", start: "2026-11-27", end: "2026-11-29", venue: "Lusail International Circuit", organizer: "Lusail Circuit / F1 event sales portal", scale: "Global sports + hospitality audience", scope: "Hospitality pavilions, sponsor zones, fan engagement, VIP dinners, backline", outreach: "Lusail Circuit + hospitality sponsors + hotels", opportunity: "QAR 150k-400k" },
  { name: "Doha Forum 2026", start: "2026-12-05", end: "2026-12-06", venue: "Doha", organizer: "Doha Forum", scale: "Global policy and business leaders", scope: "Main plenary, breakouts, interpretation, streaming, VIP receptions", outreach: "Forum secretariat + venue + official receptions", opportunity: "QAR 120k-300k" },
  { name: "Qatar Medicare 2026", start: "2026-12-14", end: "2026-12-16", venue: "DECC", organizer: "IFP Qatar", scale: "Healthcare and medical trade exhibition + conference", scope: "Conference AV, expo floor LED, panel sessions, sponsor zones", outreach: "Direct to IFP Qatar", opportunity: "QAR 90k-200k" },
  { name: "Qatar Beauty & Wellcare 2026", start: "2026-12-14", end: "2026-12-16", venue: "DECC", organizer: "Public DECC listing", scale: "Beauty/wellness B2B + consumer crossover", scope: "Demo stage, influencer zones, LED, DJ/PA, launch lighting", outreach: "DECC + organizer verification + brands", opportunity: "QAR 60k-150k" },
  { name: "Qatar Economic Forum 2026", start: "2026-12-31", end: "2026-12-31", venue: "Doha", organizer: "Bloomberg / MOCI / Forum organizers", scale: "Rescheduled; high-value watchlist", scope: "Broadcast-grade plenary, streaming, VIP hospitality", outreach: "Track for later date release", opportunity: "TBD", status: "Watchlist" }
].map((event, index) => ({
  id: `event-${index + 1}`,
  status: event.status || "Target",
  ...event
}));

let state = loadState();
let activeView = "dashboard";
let activeContactDrill = null;
let activeEventDrill = null;

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  hydrateSelects();
  bindEvents();
  render();

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
});

function blankIntroducer() {
  return { company: "", segment: "Organiser", contactName: "", role: "", email: "", phone: "" };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.contacts) && Array.isArray(saved.events)) {
      return saved;
    }
  } catch (error) {
    console.warn("Could not load saved data", error);
  }
  return getSeedState();
}

function getSeedState() {
  return structuredCloneSafe({ contacts: seedContacts, events: seedEvents });
}

function structuredCloneSafe(valueToClone) {
  if (window.structuredClone) {
    return window.structuredClone(valueToClone);
  }
  return JSON.parse(JSON.stringify(valueToClone));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function bindElements() {
  [
    "view-title", "kpiGrid", "stageChart", "monthChart", "segmentList", "upcomingEvents",
    "introducerQueue", "eventsGrid", "directoryGrid", "eventSearch", "eventStatusFilter",
    "eventDrillNotice", "contactDrillNotice", "detailModal", "detailTitle", "detailContent",
    "detailEdit", "detailClose",
    "contactSearch", "segmentFilter", "stageFilter", "contactForm", "eventForm",
    "contactFormTitle", "eventFormTitle", "clearContactForm", "clearEventForm", "deleteContact",
    "deleteEvent", "exportData", "importData", "resetData", "installApp", "addEventFromEvents",
    "addContactFromDirectory"
  ].forEach((id) => {
    els[toCamel(id)] = document.getElementById(id);
  });
}

function toCamel(id) {
  return id.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function hydrateSelects() {
  setOptions(document.getElementById("segment"), SEGMENTS);
  setOptions(document.getElementById("introSegment"), SEGMENTS);
  setOptions(document.getElementById("stage"), STAGES);
  setOptions(document.getElementById("eventStatus"), EVENT_STATUSES);
  setOptions(els.segmentFilter, ["All segments", ...SEGMENTS]);
  setOptions(els.stageFilter, ["All stages", ...STAGES]);
  setOptions(els.eventStatusFilter, ["All statuses", ...EVENT_STATUSES]);
}

function setOptions(select, options) {
  select.innerHTML = options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("");
}

function bindEvents() {
  document.querySelectorAll(".nav-link").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  [els.eventSearch, els.eventStatusFilter].forEach((input) => {
    input.addEventListener("input", () => {
      activeEventDrill = null;
      render();
    });
  });

  [els.contactSearch, els.segmentFilter, els.stageFilter].forEach((input) => {
    input.addEventListener("input", () => {
      activeContactDrill = null;
      render();
    });
  });

  els.addEventFromEvents.addEventListener("click", () => {
    clearEventForm();
    switchView("manage");
    document.getElementById("eventName").focus();
  });

  els.addContactFromDirectory.addEventListener("click", () => {
    clearContactForm();
    switchView("manage");
    document.getElementById("company").focus();
  });

  els.clearContactForm.addEventListener("click", clearContactForm);
  els.clearEventForm.addEventListener("click", clearEventForm);
  els.contactForm.addEventListener("submit", saveContactFromForm);
  els.eventForm.addEventListener("submit", saveEventFromForm);
  els.deleteContact.addEventListener("click", deleteCurrentContact);
  els.deleteEvent.addEventListener("click", deleteCurrentEvent);
  els.exportData.addEventListener("click", exportData);
  els.importData.addEventListener("change", importData);
  els.resetData.addEventListener("click", resetData);
  els.installApp.addEventListener("click", installApp);
  els.detailClose.addEventListener("click", closeEventDetail);
  els.detailEdit.addEventListener("click", () => {
    const eventId = els.detailEdit.dataset.editEvent;
    if (!eventId) return;
    closeEventDetail();
    loadEventForm(eventId);
    switchView("manage");
  });
  document.addEventListener("click", handleDrillClick);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeEventDetail();
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    els.installApp.classList.remove("hidden");
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    els.installApp.classList.add("hidden");
  });
}

function handleDrillClick(event) {
  if (event.target.closest("[data-close-modal]")) {
    closeEventDetail();
    return;
  }

  const clearDrill = event.target.closest("[data-clear-drill]");
  if (clearDrill) {
    if (clearDrill.dataset.clearDrill === "events") {
      activeEventDrill = null;
      clearEventControls();
    } else {
      activeContactDrill = null;
      clearContactControls();
    }
    render();
    return;
  }

  const dashboardDrill = event.target.closest("[data-dashboard-drill]");
  if (dashboardDrill) {
    const type = dashboardDrill.dataset.dashboardDrill;
    if (type === "contacts-all") {
      drillContacts({ label: "All contacts" });
    }
    if (type === "priority-a") {
      drillContacts({ label: "Priority A contacts", priority: "A" });
    }
    if (type === "events-remaining") {
      drillEvents({ label: `Remaining ${APP_YEAR} events`, remaining: true });
    }
    if (type === "contacts-connected") {
      drillContacts({ label: "Connected contacts", stage: "Connected" });
    }
    return;
  }

  const stageDrill = event.target.closest("[data-drill-stage]");
  if (stageDrill) {
    drillContacts({ label: `${stageDrill.dataset.drillStage} contacts`, stage: stageDrill.dataset.drillStage });
    return;
  }

  const segmentDrill = event.target.closest("[data-drill-segment]");
  if (segmentDrill) {
    drillContacts({ label: `${segmentDrill.dataset.drillSegment} contacts`, segment: segmentDrill.dataset.drillSegment });
    return;
  }

  const monthDrill = event.target.closest("[data-drill-month]");
  if (monthDrill) {
    drillEvents({
      label: `${monthDrill.dataset.monthLabel} events`,
      monthIndex: Number(monthDrill.dataset.drillMonth)
    });
    return;
  }

  const contactDrill = event.target.closest("[data-open-contact-detail]");
  if (contactDrill) {
    const contact = state.contacts.find((item) => item.id === contactDrill.dataset.openContactDetail);
    drillContacts({ label: contact ? contact.company : "Contact details", id: contactDrill.dataset.openContactDetail });
    return;
  }

  const eventDrill = event.target.closest("[data-open-event-detail]");
  if (eventDrill && !event.target.closest("[data-edit-event]")) {
    if (activeView !== "events") {
      activeEventDrill = null;
      clearEventControls();
      switchView("events");
    }
    openEventDetail(eventDrill.dataset.openEventDetail);
  }
}

function drillContacts(drill) {
  activeContactDrill = drill;
  clearContactControls();
  if (drill.segment) els.segmentFilter.value = drill.segment;
  if (drill.stage) els.stageFilter.value = drill.stage;
  switchView("directory");
}

function drillEvents(drill) {
  activeEventDrill = drill;
  clearEventControls();
  switchView("events");
}

function clearContactControls() {
  els.contactSearch.value = "";
  els.segmentFilter.value = "All segments";
  els.stageFilter.value = "All stages";
}

function clearEventControls() {
  els.eventSearch.value = "";
  els.eventStatusFilter.value = "All statuses";
}

function switchView(view) {
  activeView = view;
  document.querySelectorAll(".nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("active", section.id === `${view}-view`);
  });
  els.viewTitle.textContent = view === "directory" ? "Directory" : titleCase(view);
  render();
}

function render() {
  renderDashboard();
  renderEvents();
  renderDirectory();
}

function renderDashboard() {
  const contacts = state.contacts;
  const events = state.events;
  const remainingEvents = getRemainingEvents(events);
  const introNeeded = contacts.filter((contact) => contact.stage === "Need Intro" || !hasIntroducer(contact)).length;
  const connected = contacts.filter((contact) => contact.stage === "Connected").length;
  const priorityA = contacts.filter((contact) => contact.priority === "A").length;

  els.kpiGrid.innerHTML = [
    kpi("Total Contacts", contacts.length, "All seeded as Identified until updated", "contacts-all"),
    kpi("Priority A", priorityA, "Highest-ready targets", "priority-a"),
    kpi("Remaining Events", remainingEvents.length, `Calendar year ${APP_YEAR}`, "events-remaining"),
    kpi("Connected", connected, `${introNeeded} need warm-path details`, "contacts-connected")
  ].join("");

  renderStageChart(contacts);
  renderMonthChart(remainingEvents);
  renderSegmentList(contacts);
  renderUpcomingEvents(remainingEvents);
  renderIntroducerQueue(contacts);
}

function kpi(label, value, note, drill) {
  return `
    <button class="kpi drill-card" data-dashboard-drill="${escapeHtml(drill)}" type="button">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(note)}</span>
    </button>
  `;
}

function renderStageChart(contacts) {
  const max = Math.max(1, ...STAGES.map((stage) => contacts.filter((contact) => contact.stage === stage).length));
  els.stageChart.innerHTML = STAGES.map((stage) => {
    const count = contacts.filter((contact) => contact.stage === stage).length;
    const width = Math.max(2, Math.round((count / max) * 100));
    return `
      <button class="stage-row" data-drill-stage="${escapeHtml(stage)}" type="button">
        <span>${escapeHtml(stage)}</span>
        <div class="bar-track" aria-label="${escapeHtml(stage)} ${count}">
          <div class="bar-fill" style="width:${width}%"></div>
        </div>
        <strong>${count}</strong>
      </button>
    `;
  }).join("");
}

function renderMonthChart(events) {
  const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const counts = months.map((_, offset) => {
    const monthIndex = offset + 5;
    return events.filter((event) => {
      const date = parseDate(event.start);
      return date && date.getFullYear() === APP_YEAR && date.getMonth() === monthIndex;
    }).length;
  });
  const max = Math.max(1, ...counts);
  els.monthChart.innerHTML = months.map((month, index) => {
    const height = Math.max(8, Math.round((counts[index] / max) * 170));
    return `
      <button class="month-bar" data-drill-month="${index + 5}" data-month-label="${escapeHtml(month)}" title="${counts[index]} events" type="button">
        <strong>${counts[index]}</strong>
        <div class="month-bar-fill" style="height:${height}px"></div>
        <small>${month}</small>
      </button>
    `;
  }).join("");
}

function renderSegmentList(contacts) {
  els.segmentList.innerHTML = SEGMENTS.map((segment) => {
    const segmentContacts = contacts.filter((contact) => contact.segment === segment);
    const connected = segmentContacts.filter((contact) => contact.stage === "Connected").length;
    return `
      <button class="segment-item" data-drill-segment="${escapeHtml(segment)}" type="button">
        <div>
          <strong>${escapeHtml(segment)}</strong>
          <small>${connected} connected</small>
        </div>
        <span class="pill">${segmentContacts.length}</span>
      </button>
    `;
  }).join("");
}

function renderUpcomingEvents(events) {
  const upcoming = [...events]
    .sort((a, b) => parseDate(a.start) - parseDate(b.start))
    .slice(0, 6);
  els.upcomingEvents.innerHTML = upcoming.length ? upcoming.map((event) => `
    <button class="compact-item as-button" type="button" data-open-event-detail="${escapeHtml(event.id)}">
      <span>
        <strong>${escapeHtml(event.name)}</strong>
        <small>${formatDateRange(event)} - ${escapeHtml(event.venue || "Venue TBD")}</small>
      </span>
      <span class="pill gray">${escapeHtml(event.opportunity || "TBD")}</span>
    </button>
  `).join("") : emptyState("No upcoming events in the current view.");
  bindInlineEditButtons();
}

function renderIntroducerQueue(contacts) {
  const queue = contacts
    .filter((contact) => contact.stage === "Need Intro" || !hasIntroducer(contact))
    .slice(0, 6);
  els.introducerQueue.innerHTML = queue.length ? queue.map((contact) => `
    <button class="compact-item as-button" type="button" data-open-contact-detail="${escapeHtml(contact.id)}">
      <span>
        <strong>${escapeHtml(contact.company)}</strong>
        <small>${escapeHtml(contact.contactName || "Lead contact")} - ${escapeHtml(contact.segment)}</small>
      </span>
      <span class="pill gray">${escapeHtml(contact.stage)}</span>
    </button>
  `).join("") : emptyState("Introducer details are complete.");
  bindInlineEditButtons();
}

function renderEvents() {
  const term = els.eventSearch.value.trim().toLowerCase();
  const status = els.eventStatusFilter.value;
  const events = state.events
    .filter((event) => status === "All statuses" || event.status === status)
    .filter((event) => !activeEventDrill?.remaining || getRemainingEvents([event]).length > 0)
    .filter((event) => activeEventDrill?.monthIndex === undefined || getEventMonth(event) === activeEventDrill.monthIndex)
    .filter((event) => searchable(event, ["name", "venue", "organizer", "scope", "outreach"]).includes(term))
    .sort((a, b) => parseDate(a.start) - parseDate(b.start));

  renderEventDrillNotice(events.length);
  els.eventsGrid.innerHTML = events.length ? events.map(eventCard).join("") : emptyState("No events match this filter.");
  bindInlineEditButtons();
}

function eventCard(event) {
  return `
    <article class="event-card" data-open-event-detail="${escapeHtml(event.id)}">
      <div class="card-header">
        <div>
          <h3>${escapeHtml(event.name)}</h3>
          <p>${formatDateRange(event)} - ${escapeHtml(event.venue || "Venue TBD")}</p>
        </div>
        <div class="topbar-actions">
          <span class="pill">${escapeHtml(event.status || "Target")}</span>
          <button class="icon-button" type="button" data-edit-event="${escapeHtml(event.id)}" aria-label="Edit ${escapeHtml(event.name)}">
            <span class="icon-pencil" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      <p class="note-text">${escapeHtml(event.scale || "")}</p>
      <div class="meta-grid">
        <div class="meta-box"><span>Organizer</span><strong>${escapeHtml(event.organizer || "TBD")}</strong></div>
        <div class="meta-box"><span>AV scope</span><strong>${escapeHtml(event.scope || "TBD")}</strong></div>
        <div class="meta-box"><span>Opportunity</span><strong>${escapeHtml(event.opportunity || "TBD")}</strong></div>
      </div>
      <div class="contact-actions">
        <span class="meta-line">${escapeHtml(event.outreach || "")}</span>
      </div>
    </article>
  `;
}

function renderEventDrillNotice(count) {
  if (!activeEventDrill) {
    els.eventDrillNotice.classList.add("hidden");
    els.eventDrillNotice.innerHTML = "";
    return;
  }
  els.eventDrillNotice.classList.remove("hidden");
  els.eventDrillNotice.innerHTML = `
    <div>${escapeHtml(activeEventDrill.label)} <span>${count} shown</span></div>
    <button class="mini-button" type="button" data-clear-drill="events">Clear</button>
  `;
}

function renderContactDrillNotice(count) {
  if (!activeContactDrill) {
    els.contactDrillNotice.classList.add("hidden");
    els.contactDrillNotice.innerHTML = "";
    return;
  }
  els.contactDrillNotice.classList.remove("hidden");
  els.contactDrillNotice.innerHTML = `
    <div>${escapeHtml(activeContactDrill.label)} <span>${count} shown</span></div>
    <button class="mini-button" type="button" data-clear-drill="contacts">Clear</button>
  `;
}

function openEventDetail(id) {
  const event = state.events.find((item) => item.id === id);
  if (!event) return;
  els.detailTitle.textContent = event.name;
  els.detailEdit.dataset.editEvent = event.id;
  els.detailContent.innerHTML = [
    detailRow("Date", formatDateRange(event)),
    detailRow("Venue", event.venue || "Venue TBD"),
    detailRow("Organizer", event.organizer || "TBD"),
    detailRow("Status", event.status || "Target"),
    detailRow("Opportunity", event.opportunity || "TBD"),
    detailRow("Public scale", event.scale || "TBD"),
    detailRow("Likely AV scope", event.scope || "TBD"),
    detailRow("Best outreach", event.outreach || "TBD")
  ].join("");
  els.detailModal.classList.remove("hidden");
}

function closeEventDetail() {
  if (!els.detailModal) return;
  els.detailModal.classList.add("hidden");
  els.detailEdit.dataset.editEvent = "";
}

function detailRow(label, valueToShow) {
  return `
    <div class="detail-row">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(valueToShow)}</strong>
    </div>
  `;
}

function renderDirectory() {
  const term = els.contactSearch.value.trim().toLowerCase();
  const segment = els.segmentFilter.value;
  const stage = els.stageFilter.value;
  const contacts = state.contacts
    .filter((contact) => segment === "All segments" || contact.segment === segment)
    .filter((contact) => stage === "All stages" || contact.stage === stage)
    .filter((contact) => !activeContactDrill?.id || contact.id === activeContactDrill.id)
    .filter((contact) => !activeContactDrill?.priority || contact.priority === activeContactDrill.priority)
    .filter((contact) => !activeContactDrill?.needsIntro || contact.stage === "Need Intro" || !hasIntroducer(contact))
    .filter((contact) => searchable(contact, ["company", "contactName", "role", "email", "phone", "notes", "action"]).includes(term))
    .sort((a, b) => `${a.segment}${a.company}`.localeCompare(`${b.segment}${b.company}`));

  renderContactDrillNotice(contacts.length);
  els.directoryGrid.innerHTML = contacts.length ? contacts.map(contactCard).join("") : emptyState("No contacts match this filter.");
  bindInlineEditButtons();
  bindStageSelectors();
}

function contactCard(contact) {
  const intro = contact.introducer || blankIntroducer();
  return `
    <article class="contact-card">
      <div class="card-header">
        <div>
          <h3>${escapeHtml(contact.company)}</h3>
          <p>${escapeHtml(contact.segment)} - Priority ${escapeHtml(contact.priority || "B")}</p>
        </div>
        <span class="pill ${contact.priority === "A" ? "priority-a" : "gray"}">${escapeHtml(contact.stage || "Identified")}</span>
      </div>

      <div class="contact-body">
        <section class="contact-section">
          <h4>Lead Contact</h4>
          <p class="meta-line"><strong>${escapeHtml(contact.contactName || "Not set")}</strong></p>
          <p class="meta-line">${escapeHtml(contact.role || "Role not set")}</p>
          <p class="meta-line">${escapeHtml(contact.email || "Email not set")}</p>
          <p class="meta-line">${escapeHtml(contact.phone || "Mobile not set")}</p>
        </section>
        <section class="contact-section">
          <h4>Introducer</h4>
          <p class="meta-line"><strong>${escapeHtml(intro.contactName || "Not set")}</strong></p>
          <p class="meta-line">${escapeHtml(intro.company || "Company not set")} - ${escapeHtml(intro.segment || "Segment not set")}</p>
          <p class="meta-line">${escapeHtml(intro.role || "Role not set")}</p>
          <p class="meta-line">${escapeHtml(intro.email || "Email not set")}</p>
          <p class="meta-line">${escapeHtml(intro.phone || "Mobile not set")}</p>
        </section>
      </div>

      <div class="meta-grid">
        <div class="meta-box"><span>Package</span><strong>${escapeHtml(contact.package || "TBD")}</strong></div>
        <div class="meta-box"><span>Value</span><strong>${escapeHtml(contact.estimatedValue || "TBD")}</strong></div>
        <div class="meta-box"><span>Next action</span><strong>${escapeHtml(contact.action || "TBD")}</strong></div>
      </div>

      <div class="contact-actions">
        <select class="stage-select" data-stage-contact="${escapeHtml(contact.id)}" aria-label="Stage for ${escapeHtml(contact.company)}">
          ${STAGES.map((stage) => `<option value="${escapeHtml(stage)}" ${stage === contact.stage ? "selected" : ""}>${escapeHtml(stage)}</option>`).join("")}
        </select>
        <button class="mini-button" type="button" data-edit-contact="${escapeHtml(contact.id)}">Edit</button>
      </div>
    </article>
  `;
}

function bindStageSelectors() {
  document.querySelectorAll("[data-stage-contact]").forEach((select) => {
    select.addEventListener("change", () => {
      const contact = state.contacts.find((item) => item.id === select.dataset.stageContact);
      if (!contact) return;
      contact.stage = select.value;
      saveState();
      render();
    });
  });
}

function bindInlineEditButtons() {
  document.querySelectorAll("[data-edit-contact]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      loadContactForm(button.dataset.editContact);
      switchView("manage");
    });
  });
  document.querySelectorAll("[data-edit-event]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      loadEventForm(button.dataset.editEvent);
      switchView("manage");
    });
  });
}

function saveContactFromForm(event) {
  event.preventDefault();
  const id = document.getElementById("contactId").value || makeId("contact");
  const existingIndex = state.contacts.findIndex((contact) => contact.id === id);
  const contact = {
    id,
    company: value("company"),
    segment: value("segment"),
    contactName: value("contactName"),
    role: value("role"),
    email: value("email"),
    phone: value("phone"),
    priority: value("priority"),
    stage: value("stage"),
    estimatedValue: value("estimatedValue"),
    package: value("package"),
    source: value("source"),
    action: value("action"),
    notes: value("notes"),
    introducer: {
      company: value("introCompany"),
      segment: value("introSegment"),
      contactName: value("introName"),
      role: value("introRole"),
      email: value("introEmail"),
      phone: value("introPhone")
    }
  };

  if (existingIndex >= 0) {
    state.contacts[existingIndex] = contact;
  } else {
    state.contacts.unshift(contact);
  }
  saveState();
  clearContactForm();
  activeContactDrill = null;
  clearContactControls();
  switchView("directory");
}

function saveEventFromForm(event) {
  event.preventDefault();
  const id = document.getElementById("eventId").value || makeId("event");
  const existingIndex = state.events.findIndex((item) => item.id === id);
  const eventRecord = {
    id,
    name: value("eventName"),
    start: value("eventStart"),
    end: value("eventEnd") || value("eventStart"),
    venue: value("eventVenue"),
    organizer: value("eventOrganizer"),
    opportunity: value("eventOpportunity"),
    status: value("eventStatus"),
    scale: value("eventScale"),
    scope: value("eventScope"),
    outreach: value("eventOutreach")
  };

  if (existingIndex >= 0) {
    state.events[existingIndex] = eventRecord;
  } else {
    state.events.unshift(eventRecord);
  }
  saveState();
  clearEventForm();
  activeEventDrill = null;
  clearEventControls();
  switchView("events");
}

function loadContactForm(id) {
  const contact = state.contacts.find((item) => item.id === id);
  if (!contact) return;
  const intro = contact.introducer || blankIntroducer();
  setValue("contactId", contact.id);
  setValue("company", contact.company);
  setValue("segment", contact.segment);
  setValue("contactName", contact.contactName);
  setValue("role", contact.role);
  setValue("email", contact.email);
  setValue("phone", contact.phone);
  setValue("priority", contact.priority || "B");
  setValue("stage", contact.stage || "Identified");
  setValue("estimatedValue", contact.estimatedValue);
  setValue("package", contact.package);
  setValue("source", contact.source);
  setValue("action", contact.action);
  setValue("notes", contact.notes);
  setValue("introCompany", intro.company);
  setValue("introSegment", intro.segment || "Organiser");
  setValue("introName", intro.contactName);
  setValue("introRole", intro.role);
  setValue("introEmail", intro.email);
  setValue("introPhone", intro.phone);
  els.contactFormTitle.textContent = "Edit Contact";
}

function loadEventForm(id) {
  const event = state.events.find((item) => item.id === id);
  if (!event) return;
  setValue("eventId", event.id);
  setValue("eventName", event.name);
  setValue("eventStart", event.start);
  setValue("eventEnd", event.end);
  setValue("eventVenue", event.venue);
  setValue("eventOrganizer", event.organizer);
  setValue("eventOpportunity", event.opportunity);
  setValue("eventStatus", event.status || "Target");
  setValue("eventScale", event.scale);
  setValue("eventScope", event.scope);
  setValue("eventOutreach", event.outreach);
  els.eventFormTitle.textContent = "Edit Event";
}

function clearContactForm() {
  els.contactForm.reset();
  setValue("contactId", "");
  setValue("segment", "Organiser");
  setValue("introSegment", "Organiser");
  setValue("stage", "Identified");
  setValue("priority", "A");
  els.contactFormTitle.textContent = "Add Contact";
}

function clearEventForm() {
  els.eventForm.reset();
  setValue("eventId", "");
  setValue("eventStatus", "Target");
  els.eventFormTitle.textContent = "Add Event";
}

function deleteCurrentContact() {
  const id = document.getElementById("contactId").value;
  if (!id) return;
  if (!confirm("Delete this contact?")) return;
  state.contacts = state.contacts.filter((contact) => contact.id !== id);
  activeContactDrill = null;
  clearContactControls();
  saveState();
  clearContactForm();
  switchView("directory");
}

function deleteCurrentEvent() {
  const id = document.getElementById("eventId").value;
  if (!id) return;
  if (!confirm("Delete this event?")) return;
  state.events = state.events.filter((event) => event.id !== id);
  activeEventDrill = null;
  clearEventControls();
  saveState();
  clearEventForm();
  switchView("events");
}

function exportData() {
  const payload = JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `sky-audio-market-intel-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!Array.isArray(imported.contacts) || !Array.isArray(imported.events)) {
        throw new Error("Invalid file");
      }
      state = {
        contacts: imported.contacts.map(normalizeContact),
        events: imported.events.map(normalizeEvent)
      };
      activeContactDrill = null;
      activeEventDrill = null;
      clearContactControls();
      clearEventControls();
      saveState();
      render();
      alert("Market intel data imported.");
    } catch (error) {
      alert("This file could not be imported.");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function resetData() {
  if (!confirm("Reset to the original seeded contacts and events?")) return;
  state = getSeedState();
  activeContactDrill = null;
  activeEventDrill = null;
  clearContactControls();
  clearEventControls();
  saveState();
  clearContactForm();
  clearEventForm();
  render();
}

async function installApp() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  els.installApp.classList.add("hidden");
}

function normalizeContact(contact) {
  return {
    id: contact.id || makeId("contact"),
    priority: contact.priority || "B",
    segment: SEGMENTS.includes(contact.segment) ? contact.segment : "Organiser",
    company: contact.company || "",
    contactName: contact.contactName || "",
    role: contact.role || "",
    email: contact.email || "",
    phone: contact.phone || "",
    stage: STAGES.includes(contact.stage) ? contact.stage : "Identified",
    estimatedValue: contact.estimatedValue || "",
    package: contact.package || "",
    source: contact.source || "",
    action: contact.action || "",
    notes: contact.notes || "",
    introducer: { ...blankIntroducer(), ...(contact.introducer || {}) }
  };
}

function normalizeEvent(event) {
  return {
    id: event.id || makeId("event"),
    name: event.name || "",
    start: event.start || "",
    end: event.end || event.start || "",
    venue: event.venue || "",
    organizer: event.organizer || "",
    opportunity: event.opportunity || "",
    status: EVENT_STATUSES.includes(event.status) ? event.status : "Target",
    scale: event.scale || "",
    scope: event.scope || "",
    outreach: event.outreach || ""
  };
}

function value(id) {
  return document.getElementById(id).value.trim();
}

function setValue(id, valueToSet) {
  document.getElementById(id).value = valueToSet || "";
}

function makeId(prefix) {
  if (window.crypto && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function searchable(item, fields) {
  return fields.map((field) => item[field] || "").join(" ").toLowerCase();
}

function hasIntroducer(contact) {
  const intro = contact.introducer || {};
  return Boolean(intro.company || intro.contactName || intro.email || intro.phone);
}

function getRemainingEvents(events) {
  const today = startOfDay(new Date());
  return events.filter((event) => {
    const start = parseDate(event.start);
    const end = parseDate(event.end || event.start);
    if (!start) return false;
    if (start.getFullYear() !== APP_YEAR) return false;
    if (today.getFullYear() !== APP_YEAR) return true;
    return (end || start) >= today;
  });
}

function parseDate(valueToParse) {
  if (!valueToParse) return null;
  const date = new Date(`${valueToParse}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getEventMonth(event) {
  const date = parseDate(event.start);
  return date ? date.getMonth() : null;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDateRange(event) {
  const start = parseDate(event.start);
  const end = parseDate(event.end);
  if (!start) return "Date TBD";
  const dateOptions = { day: "numeric", month: "short", year: "numeric" };
  if (!end || event.start === event.end) return start.toLocaleDateString(undefined, dateOptions);
  return `${start.toLocaleDateString(undefined, dateOptions)} - ${end.toLocaleDateString(undefined, dateOptions)}`;
}

function titleCase(valueToTitle) {
  return valueToTitle.charAt(0).toUpperCase() + valueToTitle.slice(1);
}

function emptyState(message) {
  return `<div class="empty-state">${escapeHtml(message)}</div>`;
}

function escapeHtml(valueToEscape) {
  return String(valueToEscape ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
