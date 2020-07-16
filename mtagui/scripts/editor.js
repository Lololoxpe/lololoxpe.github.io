/*
 Name:  Jaiquon Smith aka Jaysds1
 --[[-------------------------------------------------
 Notes:
 
 > This code is using a relative image filepath. This will only work as long as the location it is from always exists, and the resource it is part of is running.
 To ensure it does not break, it is highly encouraged to move images into your local resource and reference them there.
 --]]-------------------------------------------------
 
 
 GUIEditor = {
 tab = {},
 progressbar = {},
 edit = {},
 label = {},
 window = {},
 checkbox = {},
 memo = {},
 scrollpane = {},
 staticimage = {},
 tabpanel = {},
 radiobutton = {},
 button = {},
 gridlist = {},
 scrollbar = {},
 combobox = {}
 }
 addEventHandler("onClientResourceStart", resourceRoot,
 function()
 local screenW, screenH = guiGetScreenSize()
 GUIEditor.window[1] = guiCreateWindow((screenW - 721) / 2, (screenH - 391) / 2, 721, 391, "", false)
 guiWindowSetSizable(GUIEditor.window[1], false)
 
 
 guiSetProperty(GUIEditor.button[1], "NormalTextColour", "FFAAAAAA")
 GUIEditor.memo[1] = guiCreateMemo(144, 29, 109, 26, "", false, GUIEditor.window[1])
 GUIEditor.label[1] = guiCreateLabel(280, 30, 131, 25, "Default", false, GUIEditor.window[1])
 GUIEditor.checkbox[1] = guiCreateCheckBox(420, 26, 55, 29, "Default", false, false, GUIEditor.window[1])
 GUIEditor.edit[1] = guiCreateEdit(540, 25, 65, 30, "", false, GUIEditor.window[1])
 GUIEditor.progressbar[1] = guiCreateProgressBar(622, 20, 71, 35, false, GUIEditor.window[1])
 guiProgressBarSetProgress(GUIEditor.progressbar[1], 50)
 GUIEditor.radiobutton[1] = guiCreateRadioButton(20, 75, 97, 48, "Default", false, GUIEditor.window[1])
 GUIEditor.gridlist[1] = guiCreateGridList(149, 89, 94, 24, false, GUIEditor.window[1])
 GUIEditor.tabpanel[1] = guiCreateTabPanel(276, 92, 135, 134, false, GUIEditor.window[1])
 
 GUIEditor.tab[1] = guiCreateTab("Tab", GUIEditor.tabpanel[1])
 
 GUIEditor.staticimage[1] = guiCreateStaticImage(420, 85, 65, 40, ":guieditor/client/colorpicker/palette.png", false, GUIEditor.window[1])
 GUIEditor.scrollbar[1] = guiCreateScrollBar(528, 86, 77, 29, true, false, GUIEditor.window[1])
 GUIEditor.scrollbar[2] = guiCreateScrollBar(620, 90, 31, 135, false, false, GUIEditor.window[1])
 guiScrollBarSetScrollPosition(GUIEditor.scrollbar[2], 100.0)
 GUIEditor.scrollpane[1] = guiCreateScrollPane(279, 253, 132, 96, false, GUIEditor.window[1])
 GUIEditor.combobox[1] = guiCreateComboBox(30, 251, 223, 83, "", false, GUIEditor.window[1])    
 end
 )
 */
/*{
 }; */

var status, srcElement, menu = {},
        Editor = {
            tab: [],
            progressbar: [],
            edit: [],
            label: [],
            window: [],
            checkbox: [],
            memo: [],
            scrollpane: [],
            staticimage: [],
            tabpanel: [],
            radiobutton: [],
            button: [],
            gridlist: [],
            scrollbar: [],
            combobox: []
        }; //Element Storage

window.onload = function () {
    var l = document.getElementById('loader'); //Get loader
    l.style.display = 'block'; //Show loader

    window.body = document.getElementById('canvas'); //Get window canvas
    status = new Status('Right click to start!'); //Instructions


    //Create menu-ready interactions
    menu['body'] = new Menu(0, 0);
    menu['create'] = new Menu(0, 0);
    menu['move'] = new Menu(0, 0);
    menu['resize'] = new Menu(0, 0);
    menu['position'] = new Menu(0, 0);
    menu['dimension'] = new Menu(0, 0);
    //Start Organizing the body first
    menu['body'].setSize(150, 325);
    //Create menu interaction
    var create = menu['body'].addItem('Create');
    create.onmouseover = function () { //Show Creation Menu
        hideMenu('create');
        showMenu('create', 1);
    };
    //Move menu interaction
    var move = menu['body'].addItem('Move');
    move.onclick = function () {
        body.addEventListener('mousemove', _moveXY);
        srcElement.onclick = function () {
            body.removeEventListener('mousemove', _moveXY);
        };
        hideAll();
    };
    move.onmouseover = function () { //Show Moving Menu
        hideMenu('move');
        showMenu('move', 1.5);
    };
    //Resize menu interaction
    var resize = menu['body'].addItem('Resize');
    resize.onclick = function () { //Resize Width and Height
        body.addEventListener('mousemove', _resizeWH);
        srcElement.onclick = function () {
            body.removeEventListener('mousemove', _resizeWH);
        };
        hideAll();
    };
    resize.onmouseover = function () { //Show Resizing Menu
        hideMenu('resize');
        showMenu('resize', 2);
    };
    //Text Selection
    var text = menu['body'].addItem('Set Text');
    text.onclick = function () { //Set Selected Element Text
        var newText = prompt('Set New Text');
        var gui = getGuiByElement(srcElement);
        if (!gui)
            return status.setText('');
        gui.setText(newText);
        hideAll();
    };
    //Set color
    var color = menu['body'].addItem('Set Color');
    color.onclick = function () {
        var newColor = prompt('Enter A Color Name');
        srcElement.style.color = newColor + '';
        hideAll();
    };
    var alpha = menu['body'].addItem('Alpha');
    alpha.onclick = function () { //Show Alpha-ing Menu
        var newAlpha = prompt('Enter a value between 0-100');
        var gui = getGuiByElement(srcElement);
        gui.setAlpha(newAlpha);
        hideAll();
    };
    //menu['body'].addItem('Variable:');
    //menu['body'].addItem('');
    //menu['body'].addItem('Output Type:');
    var movable = menu['body'].addItem('Set Movable');
    movable.onclick = function () { //Show Movable Menu
        if (this.getItemText() === 'Set UnMovable') {
            srcElement.dataset.movable = 'false';
            movable.setItemText('Set Movable');
        } else {
            srcElement.dataset.movable = 'true';
            movable.setItemText('Set UnMovable');
        }
        hideAll();
    };
    var size = menu['body'].addItem('Set Sizable');
    size.onclick = function () { //Show Sizing Menu
        if (size.getItemText() === 'Set UnSizable') {
            srcElement.dataset.sizable = 'false';
            movable.setItemText('Set Sizable');
        } else {
            srcElement.dataset.sizable = 'true';
            movable.setItemText('Set UnSizable');
        }
        hideAll();
    };
    var position = menu['body'].addItem('Set Position Code');
    position.onmouseover = function () { //Show Positioning Menu
        hideMenu('position');
        showMenu('position', 7);
    };
    var dimension = menu['body'].addItem('Dimensions');
    dimension.onmouseover = function () { //Show Dimensioning Menu
        hideMenu('dimension');
        showMenu('dimension', 7.5);
    };
    //menu['body'].addItem('Properties');
    var back = menu['body'].addItem('Move To Back');
    back.onclick = function (e) { //Move Selected Element Back
        if (e.target !== back)
            return;
        var gui = getGuiByElement(srcElement);
        if (!gui)
            return status.setText('');
        gui.moveToBack();
        hideAll();
    };
    //var copy = menu['body'].addItem('Copy');
    //menu['body'].addItem('Parent Menu');
    var del = menu['body'].addItem('Delete');
    del.onclick = function (e) { //Delete Selected Element
        if (e.target !== del)
            return;
        var gui = getGuiByElement(srcElement);
        if (!gui)
            return status.setText("Could not delete element");
        gui.destroy();
        hideAll();
    };
    //Cancel out the menu
    var cancel = menu['body'].addItem('Cancel');
    cancel.onclick = function () {
        hideAll();
    };
    //Output Code
    var outputCode = menu['body'].addItem('Output');
    outputCode.onclick = function () {
        var output = window.open('output.html', '', '', false);
        output.onload = (function () {
            var _document = this.document;
            var memo = _document.getElementById('output');
            memo.innerHTML = 'GUIEditor = {\n\twindow = {},\n\t';
            for (var ele in Editor) {
                if (Editor[ele].length !== 0) {
                    memo.innerHTML += ele + ' = {},\n\t';
                }
            }
            memo.innerHTML += '}\n\n\GUIEditor.window[0] = guiCreateWindow('+
                    window.screenLeft+','+
                    window.screenTop+','+
                    window.innerWidth+','+
                    window.innerHeight+',\'\',false)\n';
            for (var ele in Editor) {
                if (Editor[ele].length !== 0) {
                    for (var i = 0; i < Editor[ele].length; i++) {
                        var gui = Editor[ele][i];
                        
                        var tmp = '';
                        switch (ele) {
                            /*tab: [],
                             scrollpane: [],
                             tabpanel: [],
                             scrollbar: [],*/
                            case 'button':
                                var pos = gui.getPosition(),
                                        size = gui.getSize(),
                                        val = gui.getText();
                                tmp += 'GUIEditor.'+ele+'['+i+'] = guiCreateButton(' + pos.x + ', ' + pos.y + ', ' + size.width + ', ' + size.height + ', "' + val + '", false, GUIEditor.window[0])';
                                break;
                            case 'memo':
                                tmpArray = elements['memo'];
                                break;
                            case 'label':
                                tmpArray = elements['label'];
                                break;
                            case 'checkbox':
                                tmpArray = elements['checkbox'];
                                break;
                            case 'edit':
                                tmpArray = elements['editbox'];
                                break;
                            case 'progressbar':
                                tmpArray = elements['progressbar'];
                                break;
                            case 'radiobutton':
                                tmpArray = elements['radiobutton'];
                                break;
                            case 'gridlist':
                                tmpArray = elements['gridlist'];
                                break;
                            case 'staticimage':
                                tmpArray = elements['staticimage'];
                                break;
                            case 'combobox':
                                tmpArray = elements['combobox'];
                                break;
                        }
                        memo.innerHTML += tmp + '\n\t';
                    }
                }
            }
        });
    };
    //Create item Menu
    menu['create'].setItemText(0, "Create Item");
    menu['create'].setSize(150, 230);
    var button = menu['create'].addItem('Button');
    button.onclick = function (e) { //Create Button
        if (e.target !== button)
            return;
        var pos = menu['body'].getPosition();
        Editor['button'].push(new Button(pos.x, pos.y, 100, 100, '', false));
        hideAll();
    };
    var memo = menu['create'].addItem('Memo');
    memo.onclick = function (e) { //Create Memo
        if (e.target !== memo)
            return;
        var pos = menu['body'].getPosition();
        Editor['memo'].push(new Memo(pos.x, pos.y, 100, 100, '', false));
        hideAll();
    };
    var label = menu['create'].addItem('Label');
    label.onclick = function (e) { //Create Label
        if (e.target !== label)
            return;
        var pos = menu['body'].getPosition();
        Editor['label'].push(new Label(pos.x, pos.y, 100, 100, '', false));
        hideAll();
    };
    var checkbox = menu['create'].addItem('Checkbox');
    checkbox.onclick = function (e) { //Create CheckBox
        if (e.target !== checkbox)
            return;
        var pos = menu['body'].getPosition();
        Editor['checkbox'].push(new CheckBox(pos.x, pos.y, 100, 100, '', false));
        hideAll();
    };
    var edit = menu['create'].addItem('Edit box');
    edit.onclick = function (e) { //Create Edit
        if (e.target !== edit)
            return;
        var pos = menu['body'].getPosition();
        Editor['edit'].push(new Edit(pos.x, pos.y, 100, 50, '', false));
        hideAll();
    };
    var progress = menu['create'].addItem('Progress Bar');
    progress.onclick = function (e) { //Create ProgressBar
        if (e.target !== progress)
            return;
        var pos = menu['body'].getPosition();
        Editor['progressbar'].push(new ProgressBar(pos.x, pos.y, 100, 50, false));
        hideAll();
    };
    var radio = menu['create'].addItem('Radio Button');
    radio.onclick = function (e) { //Create RadioButton
        if (e.target !== radio)
            return;
        var pos = menu['body'].getPosition();
        Editor['radiobutton'].push(new RadioButton(pos.x, pos.y, 100, 100, '', false));
        hideAll();
    };
    var gridlist = menu['create'].addItem('Gridlist');
    gridlist.onclick = function (e) { //Create Gridlist
        if (e.target !== gridlist)
            return;
        var pos = menu['body'].getPosition();
        hideAll();
    };
    var tabpanel = menu['create'].addItem('Tab Panel');
    tabpanel.onclick = function (e) { //Create TabPanel
        if (e.target !== tabpanel)
            return;
        var pos = menu['body'].getPosition();
        hideAll();
    };
    var image = menu['create'].addItem('Image');
    image.onclick = function (e) { //Create Image
        if (e.target !== image)
            return;
        var pos = menu['body'].getPosition();
        Editor['staticimage'].push(new StaticImage(pos.x, pos.y, 100, 100, '', false));
        hideAll();
    };
    var scrollbar = menu['create'].addItem('Scrollbar');
    scrollbar.onclick = function (e) { //Create ScrollBar
        if (e.target !== scrollbar)
            return;
        var pos = menu['body'].getPosition();
        Editor['scrollbar'].push(new ScrollBar());
        hideAll();
    };
    var scrollpane = menu['create'].addItem('Scrollpane');
    scrollpane.onclick = function (e) { //Create ScrollPane
        if (e.target !== scrollpane)
            return;
        var pos = menu['body'].getPosition();
        Editor['scrollpane'].push(new ScrollPane(pos.x, pos.y));
        hideAll();
    };
    var combobox = menu['create'].addItem('Combobox');
    combobox.onclick = function (e) { //Create ComboBox
        if (e.target !== combobox)
            return;
        var pos = menu['body'].getPosition();
        Editor['combobox'].push(new ComboBox(pos.x, pos.y, 100, 100, '', false));
        hideAll();
    };
    //Movement Memu
    menu['move'].setItemText(0, 'Movement');
    var moveX = menu['move'].addItem('Move X');
    moveX.onclick = function () {
        body.addEventListener('mousemove', _moveX);
        srcElement.onclick = function () {
            body.removeEventListener('mousemove', _moveX);
        };
        hideAll();
    };
    var moveY = menu['move'].addItem('Move Y');
    moveY.onclick = function () {
        body.addEventListener('mousemove', _moveY);
        srcElement.onclick = function () {
            body.removeEventListener('mousemove', _moveY);
        };
        hideAll();
    };
    //Resizement Menu
    menu['resize'].setItemText(0, 'Resize');
    var resizeWidth = menu['resize'].addItem('Resize Width');
    resizeWidth.onclick = function () {
        body.addEventListener('mousemove', _resizeWidth);
        srcElement.onclick = function () {
            body.removeEventListener('mousemove', _resizeWidth);
        };
        hideAll();
    };
    var resizeHeight = menu['resize'].addItem('Resize Height');
    resizeHeight.onclick = function () {
        body.addEventListener('mousemove', _resizeHeight);
        srcElement.onclick = function () {
            body.removeEventListener('mousemove', _resizeHeight);
        };
        hideAll();
    };
    var parentWidth = menu['resize'].addItem('Fit Parent Width');
    parentWidth.onclick = function (e) {
        var gui = getGuiByElement(srcElement);
        var size = gui.getSize();
        gui.setSize(window.innerWidth, size.height);
        hideAll();
    };
    var parentHeight = menu['resize'].addItem('Fit Parent Height');
    parentHeight.onclick = function (e) {
        var gui = getGuiByElement(srcElement);
        var size = gui.getSize();
        gui.setSize(size.width, window.innerHeight);
        hideAll();
    };
    //Positioning Menu
    menu['position'].setItemText(0, 'Positioning');
    var center = menu['position'].addItem('Center');
    center.onclick = function () {
        var gui = getGuiByElement(srcElement);
        var size = gui.getSize();
        //Find Window center
        var wSize = {width: window.innerWidth, height: window.innerHeight};
        var wCenter = {x: wSize.width / 2, y: wSize.height / 2};
        gui.setPosition(wCenter.x - size.width / 2, wCenter.y - size.height / 2);
        hideAll();
    };
    var snapRight = menu['position'].addItem('Snap Right');
    snapRight.onclick = function () {
        var gui = getGuiByElement(srcElement);
        var position = gui.getPosition();
        var size = gui.getSize();
        gui.setPosition(window.innerWidth - size.width, position.y);
        hideAll();
    };
    var snapLeft = menu['position'].addItem('Snap Left');
    snapLeft.onclick = function () {
        var gui = getGuiByElement(srcElement);
        var position = gui.getPosition();
        gui.setPosition(0, position.y);
        hideAll();
    };
    //Dimension Menu
    menu['dimension'].setItemText(0, 'Dimensions');
    var setX = menu['dimension'].addItem('Set X: ');
    setX.onclick = function () {
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition();
        var newX = prompt('Enter new X position');
        gui.setPosition(newX, pos.y);
        hideAll();
    };
    var setY = menu['dimension'].addItem('Set Y: ');
    setY.onclick = function () {
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition();
        var newY = prompt('Enter new Y position');
        gui.setPosition(pos.x, newY);
        hideAll();
    };
    var setWidth = menu['dimension'].addItem('Set Width: ');
    setWidth.onclick = function () {
        var gui = getGuiByElement(srcElement);
        var size = gui.getSize();
        var newW = prompt('Enter new Width size');
        gui.setSize(newW, size.height);
        hideAll();
    };
    var setHeight = menu['dimension'].addItem('Set Height: ');
    setHeight.onclick = function () {
        var gui = getGuiByElement(srcElement);
        var size = gui.getSize();
        var newH = prompt('Enter new Height size');
        gui.setSize(size.width, newH);
        hideAll();
    };
    //Main window configuration
    body.oncontextmenu = function (e) { //Create custom context menu
        if (e.target.className !== 'rightclick' && e.target.className !== 'option')
            menu['body'].show(e.clientX, e.clientY);
        if (e.target === body) { //Check if body is target
            srcElement = body; //Set selected element
            menu['body'].setItemText(0, 'Window'); //Change 'body' menu Title
        }
        e.preventDefault(); //Ignore original context menu
    };
    //Hide menu(s)
    body.onclick = function (e) {
        if (e.target.className !== 'rightclick' && e.target.className !== 'option')
            for (var m in menu)
                menu[m].hide();
    };
    body.onmouseover = function (e) {
        if (e.target.className !== 'rightclick' && e.target.className !== 'option')
            for (var m in menu)
                if (m !== 'body')
                    menu[m].hide();
    };
    //Custom Menu Functions
    hideMenu = function (leave) {
        for (var m in menu)
            if (m !== 'body' && m !== leave)
                menu[m].hide();
    };
    showMenu = function (show, plusy) {
        var pos = menu['body'].getPosition();
        menu[show].show(pos.x + 150, pos.y + (plusy * 20));
    };
    hideAll = function () {
        hideMenu('body'); //Hide every other menu
        menu['body'].hide(); //Hide the body menu afterwards
    };
    //Event Functions
    function _moveX(e) {
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition();
        gui.setPosition(e.clientX, pos.y);
    }
    function _moveY(e) {
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition();
        gui.setPosition(pos.x, e.clientY);
    }
    function _moveXY(e) {
        var gui = getGuiByElement(srcElement);
        gui.setPosition(e.clientX, e.clientY);
    }
    function _resizeWidth(e) {
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition();
        var size = gui.getSize();
        gui.setSize(e.clientX + 1 - pos.x, size.height);
    }
    function _resizeHeight(e) {
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition();
        var size = gui.getSize();
        gui.setSize(size.width, e.clientY + 1 - pos.y);
    }
    function _resizeWH(e) {
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition();
        gui.setSize(e.clientX + 1 - pos.x, e.clientY + 1 - pos.y);
    }

    l.style.display = 'none'; //Stop loader
};