var np = {}; // Notepad 主程序对象

np.config = {
    'appContainer': '#notepad'
};

np.fontFamily = 'Arial'; // 默认字体
np.fontStype = '常规';  // 默认字体样式
np.fontSize = '16';    // 默认字体大小：16pt

np.fontHandler = function (e) {
    np.fontFamily = e.family;
    np.fontStype = e.style;
    np.fontSize = e.size;
    $editor.setFont(e);
};

$(function () {
    $menubar.show(np.menuData);
    $editor.show({
        posHandler: function (row, col) {
        },
        contentHandler: function (isEmpty) {
            $menubar.enabled(1, 6, isEmpty);
        }
    });
    $editor.setFont({
        family: np.fontFamily,
        style: np.fontStype,
        size: np.fontSize
    });

    var $app = $('body');

    $app.click(function () {
        $menubar.hideMenu();
    });
});