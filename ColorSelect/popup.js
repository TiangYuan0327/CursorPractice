document.addEventListener('DOMContentLoaded', function() {
  var colorPicker = document.getElementById('colorPicker');
  var selectedColor = document.getElementById('selectedColor');

  colorPicker.addEventListener('change', function() {
    var color = colorPicker.value;
    selectedColor.textContent = '選擇的顏色: ' + color;
    selectedColor.style.backgroundColor = color;
    selectedColor.style.color = getContrastColor(color);
  });

  function getContrastColor(hexcolor) {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
  }
});