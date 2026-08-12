// 全域文字分類定義
export const BRIGHT_RUNES = new Set(["撼", "契", "洛", "赫", "炯", "凡", "叱", "旭", "榮", "穆", "仄", "沌", "斯", "迪", "熙", "仝", "瓦"]);
export const AGILE_RUNES = new Set(["勒", "奧", "劮", "輝", "卍", "爚", "燮", "璿", "坦", "婭"]);

// 👑 管理者 Email 白名單（只有列表中的 Email 登入後才具備修改權限）
const ADMIN_EMAILS = new Set([
    "fkl0421@gmail.com", // 👈 請填入你自己的 Google 信箱
    // "friend_email@gmail.com"     // 若要給朋友權限，可以多加幾行
]);

// 1. 引入 Firebase SDK (v10 ES Module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Firebase 設定檔
const firebaseConfig = {
  apiKey: "AIzaSyDlRUGx2hKgVEQbaRP7HlVzCpwbZ0HqxrA",
  authDomain: "lineage-rune-tracker.firebaseapp.com",
  projectId: "lineage-rune-tracker",
  storageBucket: "lineage-rune-tracker.firebasestorage.app",
  messagingSenderId: "272484955642",
  appId: "1:272484955642:web:17bff62dfcd6664b67e043",
  measurementId: "G-Y9BFYZ17KE"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// 檢查當前用戶是否為管理者
function checkIsAdmin() {
    if (!auth.currentUser || !auth.currentUser.email) return false;
    return ADMIN_EMAILS.has(auth.currentUser.email.toLowerCase());
}

// 跨頁面 Firebase 價格資料管理
export const PriceStorage = {
    getHistoryAsync: async function() {
        try {
            const q = query(collection(db, "rune_prices"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            const history = [];
            querySnapshot.forEach((docSnap) => {
                history.push({ id: docSnap.id, ...docSnap.data() });
            });
            return history;
        } catch (error) {
            console.error("讀取價格資料失敗:", error);
            return [];
        }
    },

    getLatestPricesAsync: async function() {
        const history = await this.getHistoryAsync();
        const latestMap = {};
        history.forEach(item => {
            if (!latestMap[item.name] || new Date(item.date) >= new Date(latestMap[item.name].date)) {
                latestMap[item.name] = { price: Number(item.price), date: item.date };
            }
        });
        return latestMap;
    },

    addRecordAsync: async function(name, date, price) {
        if (!checkIsAdmin()) throw new Error("權限不足！你的帳號不在管理者白名單內。");
        const docRef = await addDoc(collection(db, "rune_prices"), {
            name: name,
            date: date,
            price: Number(price),
            createdBy: auth.currentUser.email,
            createdAt: new Date().toISOString()
        });
        return docRef.id;
    },

    deleteRecordAsync: async function(docId) {
        if (!checkIsAdmin()) throw new Error("權限不足！你的帳號不在管理者白名單內。");
        await deleteDoc(doc(db, "rune_prices", docId));
    }
};

// Auth 權限模組
export const Auth = {
    loginWithGoogle: async function() {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return { success: true, user: result.user };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    logout: async function() {
        await signOut(auth);
        window.location.reload();
    },

    isLoggedIn: function() {
        return !!auth.currentUser;
    },

    isAdmin: function() {
        return checkIsAdmin();
    },

    getUser: function() {
        return auth.currentUser ? {
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        } : null;
    },

    onAuthReady: function(callback) {
        onAuthStateChanged(auth, callback);
    }
};