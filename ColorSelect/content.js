(function() {
  // 創建顏色預覽框
  var preview = document.createElement('div');
  preview.style.position = 'fixed';
  preview.style.top = '10px';
  preview.style.left = '10px';
  preview.style.padding = '10px';
  preview.style.background = '#fff';
  preview.style.border = '1px solid #ccc';
  preview.style.borderRadius = '5px';
  preview.style.zIndex = '9999';
  preview.style.display = 'none';

  // 將預覽框添加到頁面
  document.body.appendChild(preview);

  // 使用 EyeDropper API 直接開始選擇顏色
  if (window.EyeDropper) {
    const eyeDropper = new EyeDropper();
    eyeDropper.open().then(result => {
      handleColorSelection(result.sRGBHex);
    }).catch(e => {
      console.error('EyeDropper 錯誤:', e);
    });
  } else {
    console.error('此瀏覽器不支持 EyeDropper API');
    alert('抱歉，您的瀏覽器不支持顏色選擇功能。請嘗試使用最新版本的 Chrome 瀏覽器。');
  }

  function handleColorSelection(color) {
    preview.style.display = 'block';
    preview.innerHTML = '<div style="width: 50px; height: 50px; background-color: ' + color + ';"></div>' +
                        '<p style="margin: 5px 0;">顏色碼: ' + color + '</p>';
    
    // 複製顏色碼到剪貼簿
    navigator.clipboard.writeText(color).then(function() {
      console.log('顏色碼已複製到剪貼簿');
    }, function(err) {
      console.error('無法複製顏色碼: ', err);
    });

    // 3秒後隱藏預覽框
    setTimeout(function() {
      preview.style.display = 'none';
    }, 3000);
  }
})();