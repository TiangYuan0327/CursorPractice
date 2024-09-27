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

    // 移除所有的 change 和 input 事件監聽器，因為我們不再需要檢查輸入
    
    confirmButton.addEventListener('click', function() {
        container.classList.add('slide-out');
        setTimeout(() => {
            uploadSection.style.display = 'none';
            backButton.style.display = 'block';
            imageContainer.innerHTML = '';
            container.classList.remove('slide-out');
            container.classList.add('slide-in');
            generateContent();
        }, 500);
    });

    backButton.addEventListener('click', function() {
        container.classList.add('slide-out');
        setTimeout(() => {
            uploadSection.style.display = 'block';
            backButton.style.display = 'none';
            imageContainer.innerHTML = '';
            container.classList.remove('slide-out');
            container.classList.add('slide-in');
        }, 500);
    });

    function generateContent() {
        // 設置背景圖片或生成隨機背景
        if (imageUploads[0].files.length > 0) {
            const backgroundFile = imageUploads[0].files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                imageContainer.style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(backgroundFile);
        } else {
            // 生成隨機背景
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            imageContainer.style.backgroundColor = "#" + randomColor;
        }

        const contentGrid = document.createElement('div');
        contentGrid.className = 'content-grid';
        imageContainer.appendChild(contentGrid);

        // 生成其他內容
        for (let i = 1; i < 4; i++) {
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'image-wrapper';

            if (imageUploads[i].files.length > 0) {
                const file = imageUploads[i].files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = `上傳的圖片${i}`;
                    imgWrapper.appendChild(img);
                };
                reader.readAsDataURL(file);
            }

            const textWrapper = document.createElement('div');
            textWrapper.className = 'content-text';
            textWrapper.textContent = textAreas[i-1].value || '';

            contentGrid.appendChild(imgWrapper);
            contentGrid.appendChild(textWrapper);
        }
    }
});