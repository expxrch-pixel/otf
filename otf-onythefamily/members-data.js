/**
 * OTF — onythefamily | Central Data Management & Storage Layer
 * Handles LocalStorage caching, preset roster, settings, and optional Firebase integration.
 */

const OTF_STORAGE_KEYS = {
  MEMBERS: 'otf_members_v2',
  SETTINGS: 'otf_settings_v2',
  AUDIO_STATE: 'otf_audio_state_v2'
};

const DEFAULT_SETTINGS = {
  brandShort: "OTF",
  brandName: "onythefamily",
  tagline: "PRIVATE COMMUNITY",
  motto: "LOYALTY OVER ROYALTY",
  submotto: "FAMILY FIRST • RESPECT EARNED • NEVER DIVIDED",
  heroDescription: "พื้นที่ส่วนตัวสำหรับสมาชิกกลุ่ม OTF (onythefamily) ครอบครัวที่ยืนหยัดด้วยความจริงใจและความภักดี ร่วมสร้างตำนานบทใหม่ไปด้วยกัน",
  themeColor: "#ffffff", // Pure White
  accentCore: "#e4e4e7", // Platinum Silver
  accentSupport: "#a1a1aa", // Steel Grey
  accentMember: "#71717a", // Muted Zinc
  adminPin: "1688", // Default Security Access PIN
  rankNames: {
    owner: "OWNER",
    core: "LEADER",
    bigsupport: "BIGSUPPORT",
    member: "MEMBERS"
  },
  weatherEffect: "embers", // "embers", "snow", "rain", "off"
  bgBrightness: 80,
  bgMediaUrl: "", // optional custom background video or image
  musicTracks: [
    {
      title: "Took Her to the O",
      artist: "King Von (OTF Clan Theme)",
      url: "king-von-took-her-to-the-o.mp3"
    },
    {
      title: "OTF Anthem — Midnight Ambience",
      artist: "onythefamily Beats",
      url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=trap-future-bass-royalty-free-music-113540.mp3"
    },
    {
      title: "Loyalty & Honor — Drill Instrumental",
      artist: "Dark Street Chill",
      url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=hip-hop-rock-beats-118000.mp3"
    }
  ]
};

const DEFAULT_MEMBERS = [
  {
    id: "otf_owner_1",
    name: "OTF • BOSS ZERØ",
    role: "owner",
    customRoleTitle: "FOUNDER & OWNER",
    alias: "ZERØ",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    cover: "otf-banner-wave.jpg",
    status: "online",
    quote: "ครอบครัวไม่ได้วัดกันที่สายเลือด แต่วัดกันที่ความภักดีและวันที่ไม่มีใคร",
    bio: "ผู้ก่อตั้งและผู้นำสูงสุดของ ONYTHEFAMILY ดูแลทิศทางและการตัดสินใจหลักของกลุ่ม อยู่เคียงข้างทุกคนในครอบครัวเสมอ",
    house: "OTF — onythefamily",
    joinDate: "2024-01-01",
    facebook: "https://facebook.com",
    discord: "zero#0001",
    steam: "https://steamcommunity.com",
    order: 1
  },
  {
    id: "otf_core_1",
    name: "OTF • VANDAL",
    role: "core",
    customRoleTitle: "HEAD COMMANDER",
    alias: "VDL",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    status: "online",
    quote: "คำสั่งชัดเจน การกระทำเด็ดขาด ไม่มีคำว่าถอยหลังในครอบครัวเรา",
    bio: "ผู้คุมทัพหลักและวางแผนยุทธวิธีของ OTF ดูแลความเรียบร้อยและกำลังพล",
    house: "OTF — onythefamily",
    joinDate: "2024-02-15",
    facebook: "https://facebook.com",
    discord: "vandal#0002",
    steam: "https://steamcommunity.com",
    order: 2
  },
  {
    id: "otf_core_2",
    name: "OTF • SCARLETT",
    role: "core",
    customRoleTitle: "CO-LEADER",
    alias: "RED QUEEN",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80",
    status: "away",
    quote: "ความสง่างามที่แฝงด้วยความเฉียบขาด",
    bio: "ร่วมดูแลการบริหารภายในกลุ่ม จัดการสมาชิกรุ่นใหม่ และประสานงานภายนอก",
    house: "OTF — onythefamily",
    joinDate: "2024-03-01",
    facebook: "https://facebook.com",
    discord: "scarlett#0003",
    steam: "https://steamcommunity.com",
    order: 3
  },
  {
    id: "otf_core_3",
    name: "OTF • GHOST",
    role: "core",
    customRoleTitle: "SPECIAL OPS",
    alias: "PHANTOM",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    status: "online",
    quote: "เงียบเชียบ รวดเร็ว และจบงานก่อนที่ใครจะรู้ตัว",
    bio: "หน่วยสังเกตการณ์และซัพพอร์ตงานสำคัญ ไม่ค่อยพูดแต่ทำงานเต็มร้อย",
    house: "OTF — onythefamily",
    joinDate: "2024-04-10",
    facebook: "https://facebook.com",
    discord: "ghost#0004",
    steam: "https://steamcommunity.com",
    order: 4
  },
  {
    id: "otf_sup_1",
    name: "OTF • TITAN",
    role: "bigsupport",
    customRoleTitle: "CHIEF TREASURER & SUPPORT",
    alias: "BANKER",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    status: "online",
    quote: "พร้อมสนับสนุนทุกก้าวเดินของพี่น้องในบ้าน OTF",
    bio: "ผู้สนับสนุนหลักด้านทรัพยากร คลังคลังอาวุธและงบประมาณกลาง",
    house: "OTF — onythefamily",
    joinDate: "2024-05-01",
    facebook: "https://facebook.com",
    discord: "titan#0005",
    steam: "https://steamcommunity.com",
    order: 5
  },
  {
    id: "otf_sup_2",
    name: "OTF • ARES",
    role: "bigsupport",
    customRoleTitle: "OFFICER & SPONSOR",
    alias: "WARLOCK",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    status: "dnd",
    quote: "มีปัญหาโทรหาผม หน้าบ้านเราต้องปลอดภัยเสมอ",
    bio: "ซัพพอร์ตแนวหน้าและดูแลน้องใหม่ในครอบครัวให้พร้อมลุยทุกสถานการณ์",
    house: "OTF — onythefamily",
    joinDate: "2024-05-15",
    facebook: "https://facebook.com",
    discord: "ares#0006",
    steam: "https://steamcommunity.com",
    order: 6
  },
  {
    id: "otf_mem_1",
    name: "OTF • KAIZEN",
    role: "member",
    customRoleTitle: "MAIN GUNNER",
    alias: "KZ",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    status: "online",
    quote: "ลุยไหนลุยกัน เชื่อใจพวกพ้องเสมอ",
    bio: "พลปืนแนวหน้า มีความแม่นยำและใจถึง เป็นกำลังสำคัญในทุกไฟต์",
    house: "OTF — onythefamily",
    joinDate: "2024-06-01",
    facebook: "https://facebook.com",
    discord: "kaizen#0007",
    steam: "https://steamcommunity.com",
    order: 7
  },
  {
    id: "otf_mem_2",
    name: "OTF • RAVEN",
    role: "member",
    customRoleTitle: "RECON SCOUT",
    alias: "DARKWING",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
    status: "offline",
    quote: "มองเห็นทุกอย่างก่อนที่ศัตรูจะขยับตัว",
    bio: "สายสเกาท์หาข่าวกรอง คล่องตัว รวดเร็ว และรายงานสถานการณ์ตลอดเวลา",
    house: "OTF — onythefamily",
    joinDate: "2024-06-10",
    facebook: "https://facebook.com",
    discord: "raven#0008",
    steam: "https://steamcommunity.com",
    order: 8
  },
  {
    id: "otf_mem_3",
    name: "OTF • NITRO",
    role: "member",
    customRoleTitle: "GETAWAY DRIVER",
    alias: "SPEEDY",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    status: "online",
    quote: "ไม่มีถนนเส้นไหนที่ OTF ขับผ่านไม่ได้",
    bio: "นักขับระดับเซียน เชี่ยวชาญทุกเส้นทางในเมือง พาทีมรอดปลอดภัยทุกสถานการณ์",
    house: "OTF — onythefamily",
    joinDate: "2024-07-01",
    facebook: "https://facebook.com",
    discord: "nitro#0009",
    steam: "https://steamcommunity.com",
    order: 9
  },
  {
    id: "otf_mem_4",
    name: "OTF • BLITZ",
    role: "member",
    customRoleTitle: "VANGUARD",
    alias: "FLASH",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    status: "away",
    quote: "เมื่อสัญญาณดังขึ้น เราเข้าชาร์จพร้อมกัน",
    bio: "สายบุกทะลวง จังหวะเข้าทำเด็ดขาด พร้อมปกป้องพี่น้องข้างหลังเสมอ",
    house: "OTF — onythefamily",
    joinDate: "2024-07-15",
    facebook: "https://facebook.com",
    discord: "blitz#0010",
    steam: "https://steamcommunity.com",
    order: 10
  }
];

// Firebase Firestore Cloud Sync Support (Like tataros168)
let firestoreDb = null;
let firebaseInitialized = false;

function initFirebase() {
  const cfg = (window.OTF_DATA && typeof window.OTF_DATA.getFirebaseConfig === 'function')
    ? window.OTF_DATA.getFirebaseConfig()
    : (window.OTF_FIREBASE_CONFIG || {});

  if (!cfg || !cfg.apiKey || !cfg.projectId || !window.firebase) {
    return null;
  }
  if (!firebaseInitialized) {
    if (!firebase.apps.length) {
      try {
        firebase.initializeApp(cfg);
        firestoreDb = firebase.firestore();
        firebaseInitialized = true;
        console.log("🔥 Firebase Firestore connected successfully for OTF!");
        setupFirebaseRealtimeListeners();
      } catch (e) {
        console.warn("Firebase initialization failed:", e);
      }
    } else {
      firestoreDb = firebase.firestore();
      firebaseInitialized = true;
    }
  }
  return firestoreDb;
}

function setupFirebaseRealtimeListeners() {
  if (!firestoreDb) return;

  // Realtime Members Listener
  firestoreDb.collection("otf_members").orderBy("order", "asc").onSnapshot(snapshot => {
    if (!snapshot.empty) {
      const liveMembers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      localStorage.setItem(OTF_STORAGE_KEYS.MEMBERS, JSON.stringify(liveMembers));
      window.dispatchEvent(new CustomEvent('otf:members_updated', { detail: liveMembers }));
    }
  }, err => console.warn("Firestore members listener error:", err));

  // Realtime Settings Listener
  firestoreDb.collection("otf_config").doc("settings").onSnapshot(doc => {
    if (doc.exists) {
      const liveSettings = { ...DEFAULT_SETTINGS, ...doc.data() };
      localStorage.setItem(OTF_STORAGE_KEYS.SETTINGS, JSON.stringify(liveSettings));
      window.dispatchEvent(new CustomEvent('otf:settings_updated', { detail: liveSettings }));
    }
  }, err => console.warn("Firestore settings listener error:", err));
}

if (typeof window !== 'undefined') {
  setTimeout(initFirebase, 250);
}

window.OTF_DATA = {
  getSettings() {
    try {
      const stored = localStorage.getItem(OTF_STORAGE_KEYS.SETTINGS);
      if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    } catch (e) {
      console.warn("Error reading settings from localStorage:", e);
    }
    return { ...DEFAULT_SETTINGS };
  },

  saveSettings(newSettings) {
    const merged = { ...this.getSettings(), ...newSettings };
    try {
      localStorage.setItem(OTF_STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent('otf:settings_updated', { detail: merged }));
    } catch (e) {
      console.error("Error saving settings:", e);
    }
    const db = initFirebase();
    if (db) {
      db.collection("otf_config").doc("settings").set(merged, { merge: true }).catch(() => {});
    }
    return merged;
  },

  getMembers() {
    try {
      const stored = localStorage.getItem(OTF_STORAGE_KEYS.MEMBERS);
      if (stored) {
        let parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          let upgraded = false;
          parsed = parsed.map(m => {
            if (m.cover && (m.cover.includes('photo-1618005182384') || m.cover === '')) {
              upgraded = true;
              return { ...m, cover: "otf-banner-wave.jpg" };
            }
            return m;
          });
          if (upgraded) {
            this.saveMembers(parsed);
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Error reading members from localStorage:", e);
    }
    // Return default initialized members and cache them
    this.saveMembers(DEFAULT_MEMBERS);
    return [...DEFAULT_MEMBERS];
  },

  saveMembers(members) {
    try {
      localStorage.setItem(OTF_STORAGE_KEYS.MEMBERS, JSON.stringify(members));
      window.dispatchEvent(new CustomEvent('otf:members_updated', { detail: members }));
    } catch (e) {
      console.error("Error saving members:", e);
    }
    const db = initFirebase();
    if (db) {
      const batch = db.batch();
      members.forEach((m, idx) => {
        const docRef = db.collection("otf_members").doc(m.id || ("member_" + idx));
        batch.set(docRef, { ...m, order: idx + 1 }, { merge: true });
      });
      batch.commit().catch(err => console.warn("Firestore batch save error:", err));
    }
    return members;
  },

  addMember(memberData) {
    const list = this.getMembers();
    const newMember = {
      id: 'otf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      order: list.length + 1,
      name: memberData.name || "OTF • MEMBER",
      role: memberData.role || "member",
      customRoleTitle: memberData.customRoleTitle || "",
      alias: memberData.alias || "",
      avatar: memberData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
      cover: memberData.cover || "otf-banner-wave.jpg",
      status: memberData.status || "online",
      quote: memberData.quote || "",
      bio: memberData.bio || "",
      house: memberData.house || "OTF — onythefamily",
      joinDate: memberData.joinDate || new Date().toISOString().split('T')[0],
      facebook: memberData.facebook || "",
      discord: memberData.discord || "",
      steam: memberData.steam || ""
    };
    list.push(newMember);
    this.saveMembers(list);
    return newMember;
  },

  updateMember(id, updatedFields) {
    const list = this.getMembers();
    const index = list.findIndex(m => m.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updatedFields };
    this.saveMembers(list);
    return list[index];
  },

  deleteMember(id) {
    let list = this.getMembers();
    list = list.filter(m => m.id !== id);
    this.saveMembers(list);
    const db = initFirebase();
    if (db) {
      db.collection("otf_members").doc(id).delete().catch(() => {});
    }
    return list;
  },

  resetToDefault() {
    this.saveMembers(DEFAULT_MEMBERS);
    this.saveSettings(DEFAULT_SETTINGS);
    return { members: DEFAULT_MEMBERS, settings: DEFAULT_SETTINGS };
  },

  getTracks() {
    const s = this.getSettings();
    let tracks = (Array.isArray(s.musicTracks) && s.musicTracks.length > 0)
      ? s.musicTracks
      : [...DEFAULT_SETTINGS.musicTracks];

    // Ensure King Von track is in the list
    if (!tracks.some(t => t.url && t.url.includes('king-von'))) {
      tracks.unshift(DEFAULT_SETTINGS.musicTracks[0]);
      s.musicTracks = tracks;
      this.saveSettings(s);
    }
    return tracks;
  },

  async saveLocalAudioFile(file, customTitle, customArtist) {
    try {
      const trackId = 'otf_audio_' + Date.now();
      const title = customTitle || file.name.replace(/\.[^/.]+$/, "");
      const artist = customArtist || "King Von (Custom Upload)";

      // Store in IndexedDB for reliable offline browser playback without size limits
      const db = await this.openAudioDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction('tracks', 'readwrite');
        const store = tx.objectStore('tracks');
        store.put({ id: trackId, blob: file, title, artist, date: Date.now() });
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });

      const s = this.getSettings();
      const tracks = [...this.getTracks()];
      const newTrack = {
        id: trackId,
        title: title,
        artist: artist,
        isLocal: true,
        url: `idb://${trackId}`
      };
      tracks.unshift(newTrack); // Make default track
      s.musicTracks = tracks;
      this.saveSettings(s);
      return { success: true, track: newTrack };
    } catch (e) {
      console.error("Error saving local audio file:", e);
      return { success: false, error: e.message };
    }
  },

  openAudioDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('OTF_Audio_DB', 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('tracks')) {
          db.createObjectStore('tracks', { keyPath: 'id' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async getLocalAudioUrl(trackId) {
    try {
      const db = await this.openAudioDB();
      return new Promise((resolve) => {
        const tx = db.transaction('tracks', 'readonly');
        const store = tx.objectStore('tracks');
        const req = store.get(trackId);
        req.onsuccess = () => {
          if (req.result && req.result.blob) {
            resolve(URL.createObjectURL(req.result.blob));
          } else {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
      });
    } catch (e) {
      return null;
    }
  },

  addTrack(track) {
    const s = this.getSettings();
    const tracks = [...this.getTracks()];
    tracks.push({
      title: track.title || "เพลงประจำตระกูล OTF",
      artist: track.artist || "onythefamily Beats",
      url: track.url
    });
    s.musicTracks = tracks;
    this.saveSettings(s);
    return tracks;
  },

  deleteTrack(index) {
    const s = this.getSettings();
    let tracks = this.getTracks().filter((_, i) => i !== index);
    if (tracks.length === 0) {
      tracks = [...DEFAULT_SETTINGS.musicTracks];
    }
    s.musicTracks = tracks;
    this.saveSettings(s);
    return tracks;
  },

  setDefaultTrack(index) {
    const s = this.getSettings();
    const tracks = [...this.getTracks()];
    if (index >= 0 && index < tracks.length) {
      const selected = tracks.splice(index, 1)[0];
      tracks.unshift(selected); // Put first as default
      s.musicTracks = tracks;
      this.saveSettings(s);
    }
    return tracks;
  },

  exportJSON() {
    return JSON.stringify({
      version: "1.0",
      exportedAt: new Date().toISOString(),
      settings: this.getSettings(),
      members: this.getMembers()
    }, null, 2);
  },

  getFirebaseConfig() {
    try {
      const stored = localStorage.getItem('otf_firebase_config_v1');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return window.OTF_FIREBASE_CONFIG || {};
  },

  saveFirebaseConfig(cfg) {
    localStorage.setItem('otf_firebase_config_v1', JSON.stringify(cfg));
    window.OTF_FIREBASE_CONFIG = cfg;
    initFirebase();
  },

  isFirebaseConnected() {
    return !!(firestoreDb || (window.OTF_FIREBASE_CONFIG && window.OTF_FIREBASE_CONFIG.apiKey && window.OTF_FIREBASE_CONFIG.projectId));
  },

  generateUpdatedMembersDataFile() {
    const currentMembers = this.getMembers();
    const currentSettings = this.getSettings();
    const settingsStr = JSON.stringify(currentSettings, null, 2);
    const membersStr = JSON.stringify(currentMembers, null, 2);

    return `/**
 * OTF — onythefamily | Central Data Management & Storage Layer
 * Generated for Vercel Static Hosting (Synchronized Roster & Settings)
 * Exported at: ${new Date().toISOString()}
 */

const OTF_STORAGE_KEYS = {
  MEMBERS: 'otf_members_v2',
  SETTINGS: 'otf_settings_v2',
  AUDIO_STATE: 'otf_audio_state_v2'
};

const DEFAULT_SETTINGS = ${settingsStr};

const DEFAULT_MEMBERS = ${membersStr};

// Firebase Firestore Cloud Sync Support (Like tataros168)
let firestoreDb = null;
let firebaseInitialized = false;

function initFirebase() {
  const cfg = (window.OTF_DATA && typeof window.OTF_DATA.getFirebaseConfig === 'function')
    ? window.OTF_DATA.getFirebaseConfig()
    : (window.OTF_FIREBASE_CONFIG || {});

  if (!cfg || !cfg.apiKey || !cfg.projectId || !window.firebase) {
    return null;
  }
  if (!firebaseInitialized) {
    if (!firebase.apps.length) {
      try {
        firebase.initializeApp(cfg);
        firestoreDb = firebase.firestore();
        firebaseInitialized = true;
        console.log("🔥 Firebase Firestore connected successfully for OTF!");
        setupFirebaseRealtimeListeners();
      } catch (e) {
        console.warn("Firebase initialization failed:", e);
      }
    } else {
      firestoreDb = firebase.firestore();
      firebaseInitialized = true;
    }
  }
  return firestoreDb;
}

function setupFirebaseRealtimeListeners() {
  if (!firestoreDb) return;

  firestoreDb.collection("otf_members").orderBy("order", "asc").onSnapshot(snapshot => {
    if (!snapshot.empty) {
      const liveMembers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      localStorage.setItem(OTF_STORAGE_KEYS.MEMBERS, JSON.stringify(liveMembers));
      window.dispatchEvent(new CustomEvent('otf:members_updated', { detail: liveMembers }));
    }
  }, err => console.warn("Firestore members listener error:", err));

  firestoreDb.collection("otf_config").doc("settings").onSnapshot(doc => {
    if (doc.exists) {
      const liveSettings = { ...DEFAULT_SETTINGS, ...doc.data() };
      localStorage.setItem(OTF_STORAGE_KEYS.SETTINGS, JSON.stringify(liveSettings));
      window.dispatchEvent(new CustomEvent('otf:settings_updated', { detail: liveSettings }));
    }
  }, err => console.warn("Firestore settings listener error:", err));
}

if (typeof window !== 'undefined') {
  setTimeout(initFirebase, 250);
}

window.OTF_DATA = {
  getSettings() {
    try {
      const stored = localStorage.getItem(OTF_STORAGE_KEYS.SETTINGS);
      if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    } catch (e) {
      console.warn("Error reading settings from localStorage:", e);
    }
    return { ...DEFAULT_SETTINGS };
  },

  saveSettings(newSettings) {
    const merged = { ...this.getSettings(), ...newSettings };
    try {
      localStorage.setItem(OTF_STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent('otf:settings_updated', { detail: merged }));
    } catch (e) {
      console.error("Error saving settings:", e);
    }
    const db = initFirebase();
    if (db) {
      db.collection("otf_config").doc("settings").set(merged, { merge: true }).catch(() => {});
    }
    return merged;
  },

  getMembers() {
    try {
      const stored = localStorage.getItem(OTF_STORAGE_KEYS.MEMBERS);
      if (stored) {
        let parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Error reading members from localStorage:", e);
    }
    return [...DEFAULT_MEMBERS];
  },

  saveMembers(members) {
    try {
      localStorage.setItem(OTF_STORAGE_KEYS.MEMBERS, JSON.stringify(members));
      window.dispatchEvent(new CustomEvent('otf:members_updated', { detail: members }));
    } catch (e) {
      console.error("Error saving members:", e);
    }
    const db = initFirebase();
    if (db) {
      const batch = db.batch();
      members.forEach((m, idx) => {
        const docRef = db.collection("otf_members").doc(m.id || ("member_" + idx));
        batch.set(docRef, { ...m, order: idx + 1 }, { merge: true });
      });
      batch.commit().catch(() => {});
    }
    return members;
  },

  addMember(memberData) {
    const list = this.getMembers();
    const newMember = {
      id: 'otf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      order: list.length + 1,
      name: memberData.name || "OTF • MEMBER",
      role: memberData.role || "member",
      customRoleTitle: memberData.customRoleTitle || "",
      alias: memberData.alias || "",
      avatar: memberData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
      cover: memberData.cover || "otf-banner-wave.jpg",
      status: memberData.status || "online",
      quote: memberData.quote || "",
      bio: memberData.bio || "",
      house: memberData.house || "OTF — onythefamily",
      joinDate: memberData.joinDate || new Date().toISOString().split('T')[0],
      facebook: memberData.facebook || "",
      discord: memberData.discord || "",
      steam: memberData.steam || ""
    };
    list.push(newMember);
    this.saveMembers(list);
    return newMember;
  },

  updateMember(id, updatedFields) {
    const list = this.getMembers();
    const index = list.findIndex(m => m.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updatedFields };
    this.saveMembers(list);
    return list[index];
  },

  deleteMember(id) {
    let list = this.getMembers();
    list = list.filter(m => m.id !== id);
    this.saveMembers(list);
    const db = initFirebase();
    if (db) {
      db.collection("otf_members").doc(id).delete().catch(() => {});
    }
    return list;
  },

  resetToDefault() {
    this.saveMembers(DEFAULT_MEMBERS);
    this.saveSettings(DEFAULT_SETTINGS);
    return { members: DEFAULT_MEMBERS, settings: DEFAULT_SETTINGS };
  },

  getTracks() {
    const s = this.getSettings();
    let tracks = (Array.isArray(s.musicTracks) && s.musicTracks.length > 0)
      ? s.musicTracks
      : [...DEFAULT_SETTINGS.musicTracks];
    if (!tracks.some(t => t.url && t.url.includes('king-von'))) {
      tracks.unshift(DEFAULT_SETTINGS.musicTracks[0]);
      s.musicTracks = tracks;
      this.saveSettings(s);
    }
    return tracks;
  },

  addTrack(track) {
    const s = this.getSettings();
    const tracks = [...this.getTracks()];
    tracks.push({
      title: track.title || "เพลงประจำตระกูล OTF",
      artist: track.artist || "onythefamily Beats",
      url: track.url
    });
    s.musicTracks = tracks;
    this.saveSettings(s);
    return tracks;
  },

  deleteTrack(index) {
    const s = this.getSettings();
    let tracks = this.getTracks().filter((_, i) => i !== index);
    if (tracks.length === 0) {
      tracks = [...DEFAULT_SETTINGS.musicTracks];
    }
    s.musicTracks = tracks;
    this.saveSettings(s);
    return tracks;
  },

  setDefaultTrack(index) {
    const s = this.getSettings();
    const tracks = [...this.getTracks()];
    if (index >= 0 && index < tracks.length) {
      const selected = tracks.splice(index, 1)[0];
      tracks.unshift(selected);
      s.musicTracks = tracks;
      this.saveSettings(s);
    }
    return tracks;
  },

  getFirebaseConfig() {
    try {
      const stored = localStorage.getItem('otf_firebase_config_v1');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return window.OTF_FIREBASE_CONFIG || {};
  },

  saveFirebaseConfig(cfg) {
    localStorage.setItem('otf_firebase_config_v1', JSON.stringify(cfg));
    window.OTF_FIREBASE_CONFIG = cfg;
    initFirebase();
  },

  isFirebaseConnected() {
    return !!(firestoreDb || (window.OTF_FIREBASE_CONFIG && window.OTF_FIREBASE_CONFIG.apiKey && window.OTF_FIREBASE_CONFIG.projectId));
  },

  exportJSON() {
    return JSON.stringify({
      version: "1.0",
      exportedAt: new Date().toISOString(),
      settings: this.getSettings(),
      members: this.getMembers()
    }, null, 2);
  },

  importJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.members && Array.isArray(data.members)) {
        this.saveMembers(data.members);
      }
      if (data.settings && typeof data.settings === 'object') {
        this.saveSettings(data.settings);
      }
      return { success: true, count: (data.members || []).length };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};
`;
  },

  importJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.members && Array.isArray(data.members)) {
        this.saveMembers(data.members);
      }
      if (data.settings && typeof data.settings === 'object') {
        this.saveSettings(data.settings);
      }
      return { success: true, count: (data.members || []).length };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};
