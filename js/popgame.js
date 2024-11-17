// 懒加载图片
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// 社交分享功能
function shareToTwitter() {
    const text = encodeURIComponent('来看看这个超棒的游戏网站！');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareToYouTube() {
    window.open('https://www.youtube.com/yourchannel', '_blank');
}

function shareToBluesky() {
    // Bluesky的分享实现（具体实现取决于Bluesky的API）
    const text = encodeURIComponent('发现了一个很棒的游戏网站！');
    const url = encodeURIComponent(window.location.href);
    // 这里需要根据Bluesky的具体API来实现
    console.log('分享到Bluesky功能待实现');
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 轮播图逻辑
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// 自动轮播
setInterval(nextSlide, 5000);

// 倒计时逻辑
function updateCountdown() {
    const countdowns = document.querySelectorAll('.countdown');
    countdowns.forEach(countdown => {
        let endTime = new Date(countdown.getAttribute('data-end-time'));
        let now = new Date();
        let diff = endTime - now;
        if (diff <= 0) {
            countdown.textContent = 'EXPIRED';
            return;
        } else {
            let hours = Math.floor(diff / 3600000);
            let minutes = Math.floor((diff % 3600000) / 60000);
            let seconds = Math.floor((diff % 60000) / 1000);
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    if (hours < 0) {
                        hours = 23;
                    }
                }
            }
            
            countdown.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    });
}

setInterval(updateCountdown, 1000);