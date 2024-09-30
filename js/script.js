const hamburgerMenu = document.querySelector('.hamburger-menu');
const body = document.body;

// navbar muncul dan hilang
hamburgerMenu.addEventListener('click', function () {
    const navigationBar = document.querySelector('header ul');
    navigationBar.classList.toggle('ul-active');

    const menuNavigationBar = document.querySelectorAll('header ul li');
    menuNavigationBar.forEach(function (menu) {
        menu.addEventListener('click', function () {
            navigationBar.classList.remove('ul-active')
        })
    })

})

// efek scroll smooth
// navbar
document.querySelectorAll('.home a').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        })
    })
})
// swipe up

// animation show image certificate
const spanCertificate = document.querySelectorAll('.icon-eye');
const overlayCertificate = document.querySelectorAll('.overlay-image-certificate');
const fieldOverlayCertificate = document.querySelectorAll('.field-overlay-certificate')
const buttonCloseOverlay = document.querySelectorAll('.overlay-image-certificate button');
const slideBeforeCertificate = document.querySelectorAll('.slide-before-image-certificate')
const slideAfterCertificate = document.querySelectorAll('.slide-after-image-certificate');
const imageCertificate = document.querySelectorAll('.img-certificate');

spanCertificate.forEach(function (e, i) {
    e.addEventListener('click', function () {
        overlayCertificate[i].style.transform = 'scale(1)';
    });
})

buttonCloseOverlay.forEach(function (e, i) {
    e.addEventListener('click', function () {
        overlayCertificate[i].style.transform = 'scale(0)';
    });
})

for (let i = 0; i < slideAfterCertificate.length; i++) {
    slideAfterCertificate[i].addEventListener('click', function () {
        overlayCertificate[i].style.transform = 'scale(0)';
        overlayCertificate[i + 1].style.transform = 'scale(1)';
    })
}

for (let i = 0; i < slideBeforeCertificate.length; i++) {
    slideBeforeCertificate[i].addEventListener('click', function () {
        overlayCertificate[i].style.transform = 'scale(0)';
        overlayCertificate[i - 1].style.transform = 'scale(1)';
    })
}

// ANIMATION SECTION SKILL
const fieldSkill = document.querySelectorAll('.field-image-skill');
for (let i = 0; i < fieldSkill.length; i++) {
    if (i % 2 === 0) {
        // Index genap
        fieldSkill[i].setAttribute('data-aos', 'flip-right');
    }
    if (i % 2 === 1) {
        // Index ganjil
        fieldSkill[i].setAttribute('data-aos', 'flip-left');
    }
    if (window.innerWidth > 768) {
        if (i == 0) {
            fieldSkill[i].setAttribute('data-aos-duration', '300');
        }
        else {
            fieldSkill[i].setAttribute('data-aos-delay', `${i * 300}`);
        }
    }
}

// ALERT SECTION PROJECT
const linkToProject = document.querySelectorAll('.link-to-project');
linkToProject.forEach(function (project) {
    project.addEventListener('click', function (e) {
        e.preventDefault();

        let atributLinkProject = project.getAttribute('href');

        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "This action will bring you to project",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, go there"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = atributLinkProject;
            }
        });
    })
})

// ANIMATION SECTION PROJECT
const fieldProject = document.querySelectorAll('.field-project');
for (let i = 0; i < fieldProject.length; i++) {
    if (window.innerWidth > 768) {
        fieldProject[i].setAttribute('data-aos-duration', '1000');
        if (i % 2 === 0) {
            fieldProject[i].setAttribute('data-aos', 'fade-up-right');
        }
        else {
            fieldProject[i].setAttribute('data-aos', 'fade-up-left');
        }
    }

    else {
        fieldProject[i].setAttribute('data-aos', 'fade-up');
        fieldProject[i].setAttribute('data-aos-duration', '700')
    }
};

// ANIMATION SECTION CONTACT
const formMessage = document.querySelector('.form-message');
if (window.innerWidth > 768) {
    const fieldMap = document.querySelector('.sosmed-and-maps');
    fieldMap.setAttribute('data-aos', 'fade-right');
    formMessage.setAttribute('data-aos', 'fade-left');
}
else {
    const sosmedAndMaps = document.querySelector('.sosmed-and-maps');
    sosmedAndMaps.setAttribute('data-aos', 'zoom-in-up');
    formMessage.setAttribute('data-aos', 'zoom-in-down');
}

// ALERT SECTION CONTACT dan Kirim Pesan ke Bot Telegram
const formContact = document.querySelector('.form-message');
formContact.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputName = document.querySelector('#name');
    const inputEmail = document.querySelector('#email');
    const inputMessage = document.querySelector('#message');

    if (inputName.value == '' || inputEmail.value == '' || inputMessage.value == '') {
        Swal.fire({
            icon: "error",
            title: "Form Validation",
            text: "Please fill in the form correctly"
        });
    } else {
        // Data yang akan dikirim ke Telegram
        const message = `Haii Aldyy\nSeseorang baru saja mengirim anda pesan\nName\t\t\t\t\t\t\t: ${inputName.value}\nEmail\t\t\t\t\t\t\t: ${inputEmail.value}\nMessage\t: ${inputMessage.value}`;

        // Token API Bot Telegram dan ID Chat
        const telegramToken = '7387826039:AAGR6GjoVPi7MOCu8jJMG6p2FlvWXINUwBg'; // Ganti dengan Token API bot Telegram
        const chatId = '-4526152800'; // Ganti dengan ID Chat Telegram Anda

        // URL untuk mengirimkan pesan ke Telegram
        const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

        // Mengirim pesan ke Telegram
        fetch(telegramUrl)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    Swal.fire({
                        title: "Thank You! Your message has been sent.",
                        color: 'black'
                    });
                } else {
                    Swal.fire({
                        icon: "E",
                        title: "Failed to send message",
                        text: "An error occurred while sending the message."
                    });
                }
            });

        // Mengosongkan input
        inputName.value = '';
        inputEmail.value = '';
        inputMessage.value = '';
    }
})

AOS.init({
    once: false
})
