/* ===================================================================
 * Epitome - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : ''   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    var ssPreloader = function() {
        
        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');
        
        });
    };


   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var ssMenuOnScrolldown = function() {
        
        var hdr = $('.s-header'),
            hdrTop = $('.s-header').offset().top;

        $WIN.on('scroll', function() {

            if ($WIN.scrollTop() > hdrTop) {
                hdr.addClass('sticky');
            }
            else {
                hdr.removeClass('sticky');
            }

        });
    };


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    var ssMobileMenu = function() {

        var toggleButton = $('.header-menu-toggle'),
            nav = $('.header-nav-wrap');

        toggleButton.on('click', function(event){
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function() {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle(); 
            }
        });

    };

   /* Highlight the current section in the navigation bar
    * ------------------------------------------------------ */
    var ssWaypoints = function() {

        var sections = $(".target-section"),
            navigation_links = $(".header-main-nav li a");

        sections.waypoint( {

            handler: function(direction) {

                var active_section;

                active_section = $('section#' + this.element.id);

                if (direction === "up") active_section = active_section.prevAll(".target-section").first();

                var active_link = $('.header-main-nav li a[href="#' + active_section.attr("id") + '"]');

                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");

            },

            offset: '25%'

        });
        
    };


   /* Masonry
    * ---------------------------------------------------- */ 
    var ssMasonryFolio = function () {
        
        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });

    };


   /* photoswipe
    * ----------------------------------------------------- */
    var ssPhotoswipe = function() {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

        // get items
        $folioItems.each( function(i) {

            var $folio = $(this),
                $thumbLink =  $folio.find('.thumb-link'),
                $title = $folio.find('.item-folio__title'),
                $caption = $folio.find('.item-folio__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width  = $size[0],
                $height = $size[1];
        
            var item = {
                src  : $href,
                w    : $width,
                h    : $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        // bind click event
        $folioItems.each(function(i) {

            $(this).find('.thumb-link').on('click', function(e) {
                e.preventDefault();
                var options = {
                    index: i,
                    showHideOpacity: true
                }

                // initialize PhotoSwipe
                var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });
    };


   /* slick slider
    * ------------------------------------------------------ */
    var ssSlickSlider = function() {
        
        $('.testimonials__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            fade: true,
            cssEase: 'linear'
        });
    };


   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* Alert Boxes
    * ------------------------------------------------------ */
    var ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };


   /* Animate On Scroll
    * ------------------------------------------------------ */
    var ssAOS = function() {
        
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };


   /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {

        ssPreloader();
        ssMenuOnScrolldown();
        ssMobileMenu();
        ssWaypoints();
        ssMasonryFolio();
        ssPhotoswipe();
        ssSlickSlider();
        ssSmoothScroll();
        ssAlertBoxes();
        ssAOS();

    })();

})(jQuery);

// DSA Auto-Update System
class DSAUpdater {
    constructor() {
        this.gfgProfileUrl = 'https://www.geeksforgeeks.org/user/gauravs992l/';
        this.striverProfileUrl = 'https://takeuforward.org/profile/Gaurav_sahu_';
        this.updateInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        // API endpoints (you'll need to set these up)
        this.gfgApiEndpoint = 'http://localhost:3000/api/gfg-stats'; // Local development
        this.striverApiEndpoint = 'http://localhost:3000/api/striver-progress'; // Local development
        this.combinedApiEndpoint = 'http://localhost:3000/api/dsa-combined'; // Local development
        
        // Fallback data file (you can host this on GitHub and update it)
        this.fallbackDataUrl = 'https://raw.githubusercontent.com/yourusername/yourrepo/main/dsa-data.json';
        
        this.init();
    }

    async init() {
        // Load cached data first
        const cachedData = this.loadCachedData();
        if (cachedData && !this.shouldUpdate()) {
            this.updatePortfolio(cachedData);
        } else {
            // Fetch fresh data
            await this.updateDSAData();
        }

        // Set up periodic updates
        setInterval(() => {
            this.updateDSAData();
        }, this.updateInterval);
    }

    async updateDSAData() {
        try {
            console.log('🔄 Fetching fresh DSA data...');
            
            // Try to fetch from your backend API first
            let freshData = await this.fetchFromBackend();
            
            if (!freshData) {
                // Fallback to GitHub-hosted JSON file
                freshData = await this.fetchFromGitHub();
            }
            
            if (!freshData) {
                // Final fallback to cached data
                const cachedData = this.loadCachedData();
                if (cachedData) {
                    this.updatePortfolio(cachedData);
                    console.log('📋 Using cached DSA data');
                    return;
                }
            }
            
            if (freshData) {
                // Update portfolio with real data
                this.updatePortfolio(freshData);
                // Cache the new data
                this.cacheData(freshData);
                console.log('✅ DSA data updated successfully:', freshData);
            }
        } catch (error) {
            console.error('❌ Error updating DSA data:', error);
            // Fallback to cached data
            const cachedData = this.loadCachedData();
            if (cachedData) {
                this.updatePortfolio(cachedData);
            }
        }
    }

    async fetchFromBackend() {
        try {
            // Try to fetch combined DSA data from your backend
            const response = await fetch(this.combinedApiEndpoint);
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Backend API data fetched successfully');
                return data;
            } else {
                console.log('⚠️ Backend API returned error:', response.status);
            }
        } catch (error) {
            console.log('⚠️ Backend API not available, trying GitHub fallback...');
        }
        return null;
    }

    async fetchFromGitHub() {
        try {
            const response = await fetch(this.fallbackDataUrl);
            if (response.ok) {
                const data = await response.json();
                console.log('✅ GitHub fallback data fetched successfully');
                return data;
            }
        } catch (error) {
            console.log('⚠️ GitHub fallback not available, using cached data...');
        }
        return null;
    }

    // Legacy method - keeping for backward compatibility
    async fetchGFGData() {
        return this.fetchFromBackend() || this.fetchFromGitHub();
    }

    updatePortfolio(data) {
        if (!data) return;

        // Update problem counts
        this.updateElement('total-problems', data.totalProblems);
        this.updateElement('easy-problems', data.easyProblems);
        this.updateElement('medium-problems', data.mediumProblems);
        this.updateElement('hard-problems', data.hardProblems);
        this.updateElement('coding-score', data.codingScore);
        
        // Update difficulty counts in the bars
        this.updateElement('easy-count', data.easyProblems);
        this.updateElement('medium-count', data.mediumProblems);
        this.updateElement('hard-count', data.hardProblems);

        // Update difficulty breakdown bars
        this.updateDifficultyBars(data);

        // Update category cards with real data
        this.updateCategoryCards(data.categories);

        // Update last updated timestamp
        if (data.lastUpdated) {
            const lastUpdated = new Date(data.lastUpdated).toLocaleDateString();
            this.updateElement('last-updated', lastUpdated);
        }

        // Update additional info if available
        if (data.currentStreak !== undefined) {
            this.updateElement('current-streak', data.currentStreak);
        }
        
        if (data.primaryLanguage) {
            this.updateElement('primary-language', data.primaryLanguage);
        }

        // Update recent problems if available
        if (data.recentProblems && data.recentProblems.length > 0) {
            this.updateRecentProblems(data.recentProblems);
        }
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    updateDifficultyBars(data) {
        const total = data.totalProblems;
        if (total === 0) return;

        const easyPercent = (data.easyProblems / total) * 100;
        const mediumPercent = (data.mediumProblems / total) * 100;
        const hardPercent = (data.hardProblems / total) * 100;

        // Update easy progress bar
        const easyBar = document.querySelector('.progress-fill.easy');
        if (easyBar) {
            easyBar.style.width = `${easyPercent}%`;
        }

        // Update medium progress bar
        const mediumBar = document.querySelector('.progress-fill.medium');
        if (mediumBar) {
            mediumBar.style.width = `${mediumPercent}%`;
        }

        // Update hard progress bar
        const hardBar = document.querySelector('.progress-fill.hard');
        if (hardBar) {
            hardBar.style.width = `${hardPercent}%`;
        }
    }

    updateCategoryCards(categories) {
        if (!categories) return;

        // Update existing category cards with real data
        if (categories['Arrays & Strings'] !== undefined) {
            this.updateElement('arrays-strings-count', `${categories['Arrays & Strings']} Problems`);
            this.updateElement('arrays-strings-desc', `Array manipulation, string operations, and basic algorithms. Currently solved ${categories['Arrays & Strings']} problems.`);
        }
        
        if (categories['Linked Lists'] !== undefined) {
            this.updateElement('linked-lists-count', `${categories['Linked Lists']} Problems`);
            this.updateElement('linked-lists-desc', `Linked list operations, traversal, and problem-solving techniques. Currently solved ${categories['Linked Lists']} problems.`);
        }
        
        if (categories['Trees & Graphs'] !== undefined) {
            this.updateElement('trees-graphs-count', `${categories['Trees & Graphs']} Problems`);
            this.updateElement('trees-graphs-desc', `Tree and graph traversal algorithms, data structures. Currently solved ${categories['Trees & Graphs']} problems.`);
        }
        
        if (categories['Dynamic Programming'] !== undefined) {
            this.updateElement('dp-count', `${categories['Dynamic Programming']} Problems`);
            this.updateElement('dp-desc', `Dynamic programming concepts and problem-solving approaches. Currently solved ${categories['Dynamic Programming']} problems.`);
        }
        
        if (categories['Greedy Algorithms'] !== undefined) {
            // Add a new card for Greedy if it doesn't exist
            this.addGreedyCard(categories['Greedy Algorithms']);
        }
        
        if (categories['Stack & Queue'] !== undefined) {
            // Add a new card for Stack & Queue if it doesn't exist
            this.addStackQueueCard(categories['Stack & Queue']);
        }
    }

    addGreedyCard(count) {
        const categoryCards = document.querySelector('.category-cards');
        if (!categoryCards) return;
        
        // Check if greedy card already exists
        if (document.getElementById('greedy-count')) return;
        
        const greedyCard = document.createElement('div');
        greedyCard.className = 'category-card';
        greedyCard.innerHTML = `
            <div class="category-card__icon">
                <i class="fas fa-rocket"></i>
            </div>
            <div class="category-card__content">
                <h4>Greedy Algorithms</h4>
                <span class="problem-count" id="greedy-count">${count} Problems</span>
                <p id="greedy-desc">Greedy approach problems and optimization techniques. Currently solved ${count} problems.</p>
            </div>
        `;
        
        categoryCards.appendChild(greedyCard);
    }

    addStackQueueCard(count) {
        const categoryCards = document.querySelector('.category-cards');
        if (!categoryCards) return;
        
        // Check if stack-queue card already exists
        if (document.getElementById('stack-queue-count')) return;
        
        const stackQueueCard = document.createElement('div');
        stackQueueCard.className = 'category-card';
        stackQueueCard.innerHTML = `
            <div class="category-card__icon">
                <i class="fas fa-layer-group"></i>
            </div>
            <div class="category-card__content">
                <h4>Stack & Queue</h4>
                <span class="problem-count" id="stack-queue-count">${count} Problems</span>
                <p id="stack-queue-desc">Stack and queue data structures and applications. Currently solved ${count} problems.</p>
            </div>
        `;
        
        categoryCards.appendChild(stackQueueCard);
    }

    updateRecentProblems(problems) {
        // You can add this to your HTML to display recent problems
        const recentProblemsContainer = document.getElementById('recent-problems');
        if (recentProblemsContainer && problems.length > 0) {
            const problemsList = problems.map(problem => `<li>${problem}</li>`).join('');
            recentProblemsContainer.innerHTML = `<ul>${problemsList}</ul>`;
        }
    }

    cacheData(data) {
        const cacheData = {
            data: data,
            timestamp: Date.now()
        };
        localStorage.setItem('dsaData', JSON.stringify(cacheData));
    }

    loadCachedData() {
        try {
            const cached = localStorage.getItem('dsaData');
            if (cached) {
                const parsed = JSON.parse(cached);
                return parsed.data || parsed; // Handle both old and new format
            }
        } catch (error) {
            console.error('❌ Error loading cached data:', error);
        }
        return null;
    }

    shouldUpdate() {
        const cached = this.loadCachedData();
        if (!cached) return true;
        
        const now = Date.now();
        const age = now - cached.timestamp;
        return age > this.updateInterval;
    }

    // Method to manually update data (useful for testing or manual updates)
    manualUpdate(newData) {
        if (newData) {
            this.updatePortfolio(newData);
            this.cacheData(newData);
            console.log('✅ Manual update completed:', newData);
        }
    }

    // Method to refresh data immediately
    async refreshNow() {
        console.log('🔄 Manual refresh requested...');
        await this.updateDSAData();
    }

    // Method to force refresh from backend
    async forceBackendRefresh() {
        try {
            console.log('🔄 Force refreshing from backend...');
            const response = await fetch('http://localhost:3000/api/refresh-gfg', {
                method: 'POST'
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('✅ Backend refresh successful:', result);
                // Update portfolio with fresh data
                await this.updateDSAData();
            } else {
                console.error('❌ Backend refresh failed');
            }
        } catch (error) {
            console.error('❌ Error forcing backend refresh:', error);
        }
    }
}

// Initialize DSA Updater when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the DSA updater
    window.dsaUpdater = new DSAUpdater();
    
    // Add refresh button functionality
    const refreshBtn = document.getElementById('refresh-dsa');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', async function() {
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            this.disabled = true;
            
            try {
                // Try to force refresh from backend first
                await window.dsaUpdater.forceBackendRefresh();
                
                // Show success state briefly
                this.innerHTML = '<i class="fas fa-check"></i> Updated!';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Data';
                    this.disabled = false;
                }, 2000);
            } catch (error) {
                console.error('Refresh failed:', error);
                this.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Data';
                    this.disabled = false;
                }, 2000);
            }
        });
    }
    
    // Add manual update functionality for testing
    console.log('🚀 DSA Updater initialized successfully!');
    console.log('📊 You can manually update data using:');
    console.log('   window.dsaUpdater.manualUpdate(newData)');
    console.log('🔄 Or refresh immediately using:');
    console.log('   window.dsaUpdater.refreshNow()');
    console.log('🔥 Or force backend refresh using:');
    console.log('   window.dsaUpdater.forceBackendRefresh()');
    console.log('🌐 Backend endpoints:');
    console.log('   - GFG Stats: http://localhost:3000/api/gfg-stats');
    console.log('   - Combined: http://localhost:3000/api/dsa-combined');
    console.log('   - Health: http://localhost:3000/health');
    console.log('   - ScrapingBee Status: http://localhost:3000/api/scrapingbee-status');
});

// Certificate Modal Functions
function openCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// CV Modal Functions
function openCVModal() {
    const modal = document.getElementById('cvModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeCVModal() {
    const modal = document.getElementById('cvModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// CV Download Function
function downloadCV() {
    try {
        // First, check if the file exists
        const filePath = 'images/gaurav-cv.pdf';
        
        // Create a link element
        const link = document.createElement('a');
        
        // Set the PDF file path
        link.href = filePath;
        
        // Set the download attribute with filename
        link.download = 'Gaurav_Sahu_CV.pdf';
        
        // Set the target to _blank to ensure download
        link.target = '_blank';
        
        // Add click event to handle errors
        // link.onclick = function(e) {
        //     // Check if file exists by trying to fetch it
        //     fetch(filePath)
        //         .then(response => {
        //             if (!response.ok) {
        //                 throw new Error('File not found');
        //             }
        //             // File exists, proceed with download
        //             return response.blob();
        //         })
        //         .then(blob => {
        //             // Create object URL for download
        //             const url = window.URL.createObjectURL(blob);
        //             link.href = url;
        //             link.click();
        //             window.URL.revokeObjectURL(url);
        //             showDownloadMessage('CV downloaded successfully!');
        //         })
        //         .catch(error => {
        //             console.error('Download error:', error);
        //             showDownloadMessage('CV file not found. Please ensure gaurav-cv.pdf is in the images folder.', 'error');
        //         });
            
        //     e.preventDefault();
        // };
        
        // Append to body and click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    } catch (error) {
        // Show error message if download fails
        showDownloadMessage('Download failed. Please try again.', 'error');
        console.error('Download error:', error);
    }
}

// Show download success message
function showDownloadMessage(message, type = 'success') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `download-message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to body
    document.body.appendChild(messageDiv);
    
    // Show message
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 100);
    
    // Hide and remove message after 3 seconds
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// EmailJS Contact Form Function
function sendEmail(event) {
    event.preventDefault();
    
    // Get form data
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    
    // Get form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showEmailMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showEmailMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        // Fallback: Show instructions to user
        showEmailMessage('EmailJS not configured. Please contact me directly at gauravsahu891@gmail.com', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // Prepare email data
    const templateParams = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        time: new Date().toLocaleString()
    };
    
    // Send email using EmailJS
    emailjs.send('service_9f3rw4g', 'template_rr42m7y', templateParams)
        .then(function(response) {
            // Success
            showEmailMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, function(error) {
            // Error
            console.error('EmailJS Error:', error);
            showEmailMessage('Failed to send message. Please try again or contact me directly.', 'error');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

// Show email message
function showEmailMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `email-message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to body
    document.body.appendChild(messageDiv);
    
    // Show message
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 100);
    
    // Hide and remove message after 4 seconds
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 4000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const certificateModal = document.getElementById('certificateModal');
    const cvModal = document.getElementById('cvModal');
    
    if (event.target === certificateModal) {
        closeCertificateModal();
    }
    
    if (event.target === cvModal) {
        closeCVModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCertificateModal();
        closeCVModal();
    }
});