document.addEventListener('DOMContentLoaded', function() {
    const imageUploads = [
        document.getElementById('backgroundUpload'),
        document.getElementById('profileUpload'),
        document.getElementById('imageUpload2'),
        document.getElementById('imageUpload3'),
        document.getElementById('imageUpload4')
    ];
    const previews = [
        document.getElementById('backgroundPreview'),
        document.getElementById('profilePreview'),
        document.getElementById('preview2'),
        document.getElementById('preview3'),
        document.getElementById('preview4')
    ];
    const textAreas = document.querySelectorAll('.text-area textarea');
    const confirmButton = document.getElementById('confirmButton');
    const imageContainer = document.getElementById('imageContainer');
    const uploadSection = document.getElementById('uploadSection');
    const backButton = document.getElementById('backButton');
    const container = document.querySelector('.container');

    // 添加圖片預覽功能
    imageUploads.forEach((upload, index) => {
        upload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    previews[index].innerHTML = '';
                    previews[index].appendChild(img);
                }
                reader.readAsDataURL(file);
            }
        });
    });

    function getRandomTransition() {
        const transitions = ['fade', 'slide-left', 'slide-right', 'zoom-in', 'rotate'];
        return transitions[Math.floor(Math.random() * transitions.length)];
    }

    function generateProfessionalColor() {
        const hues = [200, 210, 220, 230]; // 藍色系
        const hue = hues[Math.floor(Math.random() * hues.length)];
        const saturation = Math.floor(Math.random() * 20) + 30; // 30-50%
        const lightness = Math.floor(Math.random() * 20) + 70; // 70-90%
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    confirmButton.addEventListener('click', function() {
        const transition = getRandomTransition();
        container.classList.add(transition);
        
        setTimeout(() => {
            imageContainer.innerHTML = '';
            const professionalColor = generateProfessionalColor();
            imageContainer.style.backgroundColor = professionalColor;

            // 創建 TOP 區塊
            const topSection = document.createElement('div');
            topSection.classList.add('top-section');
            
            const backgroundImg = document.createElement('img');
            backgroundImg.src = previews[0].querySelector('img').src;
            backgroundImg.classList.add('background-image');
            topSection.appendChild(backgroundImg);

            const profileImg = document.createElement('img');
            profileImg.src = previews[1].querySelector('img').src;
            profileImg.classList.add('profile-image');
            topSection.appendChild(profileImg);

            imageContainer.appendChild(topSection);

            // 處理其他圖片和文字
            for (let i = 2; i <= 4; i++) {
                const section = document.createElement('div');
                section.classList.add('content-section');

                const uploadedImage = previews[i].querySelector('img');
                if (uploadedImage) {
                    const img = document.createElement('img');
                    img.src = uploadedImage.src;
                    img.classList.add('uploaded-image');
                    section.appendChild(img);
                } else {
                    // 如果沒有上傳圖片，添加一個佔位符
                    const placeholder = document.createElement('div');
                    placeholder.classList.add('uploaded-image');
                    section.appendChild(placeholder);
                }

                const textArea = textAreas[i-2];
                const p = document.createElement('p');
                p.textContent = textArea.value.trim() || '';
                section.appendChild(p);

                imageContainer.appendChild(section);
            }

            uploadSection.style.display = 'none';
            imageContainer.style.display = 'block';
            backButton.style.display = 'block';
            container.classList.remove(transition);
        }, 500);
    });

    backButton.addEventListener('click', function() {
        const transition = getRandomTransition();
        container.classList.add(transition);
        
        setTimeout(() => {
            uploadSection.style.display = 'block';
            backButton.style.display = 'none';
            imageContainer.style.display = 'none';
            imageContainer.innerHTML = '';
            container.classList.remove(transition);
        }, 500);
    });
});