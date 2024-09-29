document.addEventListener('DOMContentLoaded', function() {
    const imageUploads = [
        document.getElementById('imageUpload1'),
        document.getElementById('imageUpload2'),
        document.getElementById('imageUpload3'),
        document.getElementById('imageUpload4')
    ];
    const textAreas = document.querySelectorAll('.text-area textarea');
    const confirmButton = document.getElementById('confirmButton');
    const imageContainer = document.getElementById('imageContainer');
    const uploadSection = document.getElementById('uploadSection');
    const backButton = document.getElementById('backButton');
    const container = document.querySelector('.container');

    function getRandomTransition() {
        const transitions = ['fade', 'slide-left', 'slide-right', 'zoom-in', 'rotate'];
        return transitions[Math.floor(Math.random() * transitions.length)];
    }

    function generateWarmColor() {
        const hue = Math.floor(Math.random() * 60) + 0; // 0-60 for red to yellow
        const saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
        const lightness = Math.floor(Math.random() * 20) + 70; // 70-90%
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    confirmButton.addEventListener('click', function() {
        const transition = getRandomTransition();
        container.classList.add(transition);
        
        setTimeout(() => {
            imageContainer.innerHTML = '';
            const warmColor = generateWarmColor();
            imageContainer.style.backgroundColor = warmColor;

            // 處理主要圖片（imageUpload1）
            const mainImage = document.createElement('img');
            mainImage.src = imageUploads[0].files[0] ? URL.createObjectURL(imageUploads[0].files[0]) : '';
            mainImage.classList.add('main-image');
            imageContainer.appendChild(mainImage);

            // 處理其他圖片和文字
            for (let i = 1; i <= 3; i++) {
                const section = document.createElement('div');
                section.classList.add('content-section');

                const uploadedImage = imageUploads[i].files[0];
                if (uploadedImage) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(uploadedImage);
                    img.classList.add('uploaded-image');
                    section.appendChild(img);
                } else {
                    // 如果沒有上傳圖片，添加一個佔位符
                    const placeholder = document.createElement('div');
                    placeholder.classList.add('uploaded-image');
                    section.appendChild(placeholder);
                }

                const textArea = textAreas[i-1];
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

    // 移除未使用的 generateContent 函數
});