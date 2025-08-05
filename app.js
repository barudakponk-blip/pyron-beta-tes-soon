// Data for borrow and lend fire cards (with fire themed names and descriptions)
const fireBorrowItems = [
    {
        title: "Inferno Blaze",
        desc: "Borrow this blazing flame to empower your projects with intense heat and light.",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a1eaf1ff-d084-40dc-9a27-ea117c07aa0f.png",
        alt: "A bright orange inferno blaze artistic flame with strong glowing fire effect"
    },
    {
        title: "Crimson Ember",
        desc: "Gentle yet persistent, this ember brings steady warmth to your ideas.",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d27ab2aa-27d4-43ff-809c-3e11fc999927.png",
        alt: "Artistic crimson glowing ember with flickering red-orange fire sparks"
    },
    {
        title: "Solar Flare",
        desc: "Borrow the power of the sun’s flare - intense and unstoppable energy.",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5541e43d-4af5-407d-807b-325692e40905.png",
        alt: "Bright golden yellow solar flare flame with glowing heat patterns"
    },
];

const fireLendItems = [
    {
        title: "Azure Flame",
        desc: "Lend this mystical blue fire that burns cold yet fiercely loyal.",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1c1ccfed-106f-4a8e-b46e-e56665f5ab68.png",
        alt: "Cool blue azure mystical fire with glowing edges and smoke"
    },
    {
        title: "Emberheart",
        desc: "A glowing ember of passion to lend warmth and spark creativity.",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c7434724-a06d-4e5a-ab93-b48a0a663316.png",
        alt: "Glowing ember heart-shaped fire image with radiant orange-red hues"
    },
    {
        title: "Frostfire",
        desc: "A rare blend of ice and flame lending cold energy that burns with a cool touch.",
        img: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4b2e40a6-970f-424a-a1e4-fda71515702e.png",
        alt: "Combination frost and fire flame image with blue and white fire mix"
    }
];

// Elements
const authDiv = document.getElementById('auth');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const appDiv = document.getElementById('app');
const contentDiv = document.getElementById('content');
const btnBorrow = document.getElementById('btn-borrow');
const btnLend = Cument.getElementById('btn-lend');
const btnLogout = document.getElementById('btn-logout');

// Switch login/register views
document.getElementById('show-register').addEventListener('click', () => {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});
document.getElementById('show-login').addEventListener('click', () => {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// Simple fake user storage (localStorage)
function fakeRegister(username, email, password) {
    if (localStorage.getItem('pyron-user')) return false; // simple single user only
    localStorage.setItem('pyron-user', JSON.stringify({ username, email, password }));
    return true;
}
function fakeLogin(username, password) {
    const user = JSON.parse(localStorage.getItem('pyron-user'));
    if (user && user.username === username && user.password === password) return true;
    return false;
}
function isLoggedIn() {
    return !!localStorage.getItem('pyron-user');
}

// Render fire cards
function renderCards(items) {
    contentDiv.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'fire-container shadow-lg';

        const imgDiv = document.createElement('div');
        imgDiv.className = 'card-image mb-4';
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.alt;
        img.className = 'rounded-lg w-full h-auto object-cover select-none';
        img.onerror = function() {
            this.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5377d30b-55da-44db-bc6f-7eee16dfb3ea.png';
        };
        imgDiv.appendChild(img);

        const title = document.createElement('h3');
        title.className = 'fire-title';
        title.textContent = item.title;

        const desc = document.createElement('p');
        desc.className = 'fire-description';
        desc.textContent = item.desc;

        card.appendChild(imgDiv);
        card.appendChild(title);
        card.appendChild(desc);
        contentDiv.appendChild(card);
    });
}

// Handle login
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = loginForm['login-username'].value.trim();
    const password = loginForm['login-password'].value;
    if (fakeLogin(username, password)) {
        showApp();
    } else {
        alert('Invalid username or password.');
    }
});

// Handle register
registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = registerForm['register-username'].value.trim();
    const email = registerForm['register-email'].value.trim();
    const password = registerForm['register-password'].value;
    if (fakeRegister(username, email, password)) {
        alert('Registration successful! Please login.');
        registerForm.reset();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    } else {
        alert('A user is already registered in this demo.');
    }
});

// Show main app interface after login
function showApp() {
    authDiv.classList.add('hidden');
    appDiv.classList.remove('hidden');
    renderCards(fireBorrowItems);
    highlightButton(btnBorrow);
}

// Highlight button styles
function highlightButton(btn) {
    [btnBorrow, btnLend].forEach(b => b.classList.remove('glow-blue'));
    btn.classList.add('glow-blue');
}

btnBorrow.addEventListener('click', () => {
    renderCards(fireBorrowItems);
    highlightButton(btnBorrow);
});
btnLend.addEventListener('click', () => {
    renderCards(fireLendItems);
    highlightButton(btnLend);
});
btnLogout.addEventListener('click', () => {
    localStorage.removeItem('pyron-user');
    appDiv.classList.add('hidden');
    authDiv.classList.remove('hidden');
    loginForm.reset();
    registerForm.reset();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    highlightButton(btnBorrow);
});

// On load, check logged in state
window.onload = () => {
    if (isLoggedIn()) {
        showApp();
    }
};