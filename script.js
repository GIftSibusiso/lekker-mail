function openPopup(popupId) {
            document.getElementById(popupId).style.display = 'flex';
        }
    
        function closePopup(popupId) {
            document.getElementById(popupId).style.display = 'none';
        }
 
        document.addEventListener('DOMContentLoaded', () => {
            const counterSpan = document.querySelector('.counter');
            let count = 0;
            const target = 10000;
            const duration = 500; // Animation duration in milliseconds
            const interval = duration / target; // Interval between increments

            function updateCounter() {
                if (count <= target) {
                    counterSpan.textContent = count.toLocaleString();
                    count++;
                    setTimeout(updateCounter, interval);
                } else {
                    counterSpan.textContent = target.toLocaleString(); // Ensure the final number is correct
                }
            }

            updateCounter(); // Start the animation
        });

        // Contact form submission
        document.getElementById("contactForm").addEventListener("submit", function(event) {
            event.preventDefault();
            document.getElementsByClassName("submit-text")[0].style.display = "none";
            document.getElementsByClassName("send-data")[0].style.display = "block";
            
            const form = event.target;
            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            };
            
            fetch("/v1/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": "SibusisoNkabindeAPIKEYYoullneverget"
                },
                body: JSON.stringify({
                    "recipient-email": "nkabinde17sibusiso@gmail.com",
                    "display-name": "Lekker Mail Alert",
                    "subject": "You have a new interest",
                    "content": `
                    <html>
                        <head>
                            <style>
                                body {
                                    color: #222526;
                                }
                                .hor-line {
                                    height: 2px;
                                    background-color: #d55a19;
                                }

                                h2 {
                                    color: #00DF81;
                                    text-align: center;
                                }
                            </style>
                        </head>
                        <body>
                            <h2>New interest alert</h2>
                            <div class='hor-line'></div>
                            <p>Name: ${formData.name}</p>
                            <p>Email: ${formData.email}</p>
                            <p>Message: ${formData.message}</p>
                        </body>
                    </html>
                    `,
                    "html-content": true
                })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementsByClassName("submit-text")[0].style.display = "block";
                document.getElementsByClassName("send-data")[0].style.display = "none";
                document.getElementsByClassName("success-popup")[0].style.display = "block";
                form.reset();

                setTimeout(() => {
                    document.getElementsByClassName("success-popup")[0].style.display = "none";
                }, 5000)
            })
            .catch(error => {
                document.getElementsByClassName("submit-text")[0].style.display = "block";
                document.getElementsByClassName("send-data")[0].style.display = "none";
                document.getElementsByClassName("failed-popup")[0].style.display = "block";

                setTimeout(() => {
                    document.getElementsByClassName("failed-popup")[0].style.display = "none";
                }, 5000)
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
            const menuBtn = document.getElementById('menuBtn');
            const mobileMenuItems = document.querySelector('.mobile-menu-items');
            const menuLinks = mobileMenuItems.querySelectorAll('a'); // Select all <a> tags within the menu
        
            menuBtn.addEventListener('click', function() {
                if (mobileMenuItems.style.display === 'block') {
                    mobileMenuItems.style.display = 'none';
                } else {
                    mobileMenuItems.style.display = 'block';
                }
            });
        
            menuLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    mobileMenuItems.style.display = 'none'; // Hide the menu when a link is clicked
                });
            });
        });