var $menubar = (function () {
    var $bar = $('<div class="notepad-menubar"></div>');
    var menuData,   //菜单数据
        menus = []; //以及菜单下的数据
    var num = -1;

    // 初始化菜单
    function init() {
        // 一级菜单
        var $titles = $('<ul class="menu-title"></ul>');
        for (var i = 0; i < menuData.length; i++) {
            var $title = $('<li class="title"></li>');
            $title.html(menuData[i].title);
            $title.attr('data-id', i);
            $titles.append($title);

            $title.click(function (e) {
                var i = Number(this.dataset.id);
                if (num === -1) {
                    menus[i].css({ display: 'inline-block' });
                    num = i;
                }
                else if (num !== i) {
                    menus[num].css({ display: 'none' });
                    menus[i].css({ display: 'inline-block' });
                    num = i;
                }
                else {
                    menus[num].css({ display: 'none' });
                    num = -1;
                }
                e.stopPropagation();
            });

            $title.hover(function () {
                if (num !== -1) {
                    var i = Number(this.dataset.id);
                    menus[num].css({ display: 'none' });
                    menus[i].css({ display: 'inline-block' });
                    num = i;
                }
            });
        }
        $bar.append($titles);

        // 二级菜单
        for (var i = 0; i < menuData.length; i++) {
            var $menus = $('<ul class="menus"></ul>'),
                items = menuData[i].menuItems;
            for (var j = 0; j < items.length; j++) {
                if (items[j].title === 'hr') {
                    var $hr = $('<li class="menu-hr"></li>');
                    $menus.append($hr);
                    continue;
                }

                var $menu = $('<li class="menu-item"></li>');
                $menu.html(items[j].title);
                $menu.attr('data-x', i);
                $menu.attr('data-y', j);

                if (items[j].shortcut !== '') {
                    var $shorcut = $('<span class="shortcut"></span>');
                    $shorcut.html(items[j].shortcut);
                    $menu.append($shorcut);
                }

                if (!items[j].enabled) $menu.addClass('disabled');
                $menus.append($menu);

                $menu.click(function (e) {
                    e.stopPropagation();
                    if ($(this).hasClass('disabled')) return;
                    var i = this.dataset.x, j = this.dataset.y;
                    menus[i].css({ display: 'none' });
                    num = -1;

                    menuData[i].menuItems[j].handler();
                });
            }

            $menus.css({
                width: menuData[i].width,
                left: menuData[i].left,
                display: 'none'
            });

            $bar.append($menus);
            menus.push($menus);
        }
        $('body').append($bar);
    }

    function hideMenu() {
        if (num === -1) return;
        menus[num].css({ display: 'none' });
        num = -1;
    }

    function show(data) {
        menuData = data;
        init();
    }

    return {
        show: show,
        hideMenu: hideMenu
    };
}());