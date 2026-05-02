// Language Management
function initLanguage() {
    const savedLang = localStorage.getItem('arIncenseLang') || 'ar';
    setLanguage(savedLang);
}

function toggleLanguage() {
    const html = document.documentElement;
    const newLang = html.lang === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
}

function setLanguage(lang) {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('arIncenseLang', lang);
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('arIncenseTheme') || 'dark';
    setTheme(savedTheme);
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function setTheme(theme) {
    const html = document.documentElement;
    if (theme === 'light') {
        html.setAttribute('data-theme', 'light');
    } else {
        html.removeAttribute('data-theme');
    }
    localStorage.setItem('arIncenseTheme', theme);
}

// AI Chatbot Widget Injection
function injectChatbot() {
    const chatbotHTML = `
    <div class="chatbot-widget">
        <div class="chatbot-window" id="chatbotWindow">
            <div class="chatbot-header">
                <span><span class="ar">المساعد الذكي</span><span class="en">AI Assistant</span></span>
                <button class="chatbot-close" onclick="toggleChat()">×</button>
            </div>
            <div class="chatbot-body" id="chatbotBody">
                <div class="chat-msg chat-bot">
                    <span class="ar">مرحباً بك في بخور AR! أنا مرشدك العطري الذكي. كيف يمكنني مساعدتك في العثور على عطرك المميز اليوم؟</span>
                    <span class="en">Welcome to AR Incense! I am your AI scent guide. How can I help you find your signature fragrance today?</span>
                </div>
            </div>
            <div class="chatbot-input">
                <input type="text" id="chatInput" placeholder="...">
                <button onclick="sendChat()"><span class="ar">إرسال</span><span class="en">Send</span></button>
            </div>
        </div>
        <button class="chatbot-btn" onclick="toggleChat()">
            <img src="file:///C:/Users/DELL/.gemini/antigravity/brain/9aa77564-5ab5-425c-9813-e8d67de1e13e/hero_incense_1777647108279.png" alt="Chat">
        </button>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}

function toggleChat() {
    const chatWin = document.getElementById('chatbotWindow');
    chatWin.style.display = chatWin.style.display === 'flex' ? 'none' : 'flex';
}

function sendChat() {
    const input = document.getElementById('chatInput');
    const body = document.getElementById('chatbotBody');
    if (input.value.trim() === '') return;

    // User message
    body.innerHTML += `<div class="chat-msg chat-user">${input.value}</div>`;
    
    // Bot response (Simulated)
    const isAr = document.documentElement.lang === 'ar';
    const response = isAr ? 'شكراً لتواصلك معنا! سيقوم أحد خبرائنا بالرد عليك قريباً.' : 'Thank you! One of our fragrance experts will assist you shortly.';
    
    setTimeout(() => {
        body.innerHTML += `<div class="chat-msg chat-bot">${response}</div>`;
        body.scrollTop = body.scrollHeight;
    }, 1000);

    input.value = '';
    body.scrollTop = body.scrollHeight;
}

// Scent Quiz Logic (Only runs if quiz exists on page)
let currentQuestion = 1;
const quizAnswers = [];

function startQuiz() {
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-q1').style.display = 'block';
}

function answerQuiz(q, answer) {
    quizAnswers.push(answer);
    document.getElementById(`quiz-q${q}`).style.display = 'none';
    
    if (q < 3) {
        document.getElementById(`quiz-q${q+1}`).style.display = 'block';
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    document.getElementById('quiz-result').style.display = 'block';
    // Dummy logic: if they pick traditional/strong, give Bakhoor, else Oud etc.
    // For simplicity, we just recommend Signature Oud Oil.
    const resultImg = document.getElementById('quiz-result-img');
    const resultTitleAr = document.getElementById('quiz-result-title-ar');
    const resultTitleEn = document.getElementById('quiz-result-title-en');

    if (quizAnswers.includes('mood-relax') || quizAnswers.includes('scent-woody')) {
        resultImg.src = 'file:///C:/Users/DELL/.gemini/antigravity/brain/9aa77564-5ab5-425c-9813-e8d67de1e13e/product_bakhoor_1777646682781.png';
        resultTitleAr.textContent = 'رقائق بخور ملكية';
        resultTitleEn.textContent = 'Royal Bakhoor Chips';
    } else {
        resultImg.src = 'file:///C:/Users/DELL/.gemini/antigravity/brain/9aa77564-5ab5-425c-9813-e8d67de1e13e/product_oud_1777646800019.png';
        resultTitleAr.textContent = 'زيت العود الفاخر';
        resultTitleEn.textContent = 'Signature Oud Oil';
    }
}

function restartQuiz() {
    quizAnswers.length = 0;
    currentQuestion = 1;
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-intro').style.display = 'block';
}

// Scroll Animation Logic
document.addEventListener("DOMContentLoaded", function() {
    initLanguage();
    initTheme();
    injectChatbot();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.observe(element);
    });
});
