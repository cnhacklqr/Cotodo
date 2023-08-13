const fs = require('fs');

var $ = mdui.$;
var inst = new mdui.Tab('#tab');
var inst = new mdui.Dialog('#dialog');

function new_todo_item(title, Tab) {
    // method
    $('#new_item').on('click', function () {
        inst.open();
    });
    var todo_item_code = ` 
            <div id="todo_${todo_item_num}_item">
                <br>
                <div class="mdui-container mdui-color-theme mdui-hoverable mdui-ripple">
                    <div class="mdui-row">
                        <p class="mdui-col-xs-10" style="font-size: 18px;">${title}</p>
                        <div class="mdui-col" style="position: absolute;top: 10px;right: 10px;">
                            <a class="mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple" style="position: absolute;top: 5px;right: 10px;" onclick="done_todo(this.id);" id="todo_${todo_item_num}_item_done">
                                <i class="mdui-icon material-icons" style="position: absolute;top: 15px;right: 10px;">done</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            `
    var name = ("#todo_", todo_item_num, "_end");
    var tab_html = document.getElementById(Tab).innerHTML;
    document.getElementById(Tab).innerHTML = tab_html + todo_item_code;
    todo_item_num++;
}

// 完成todo
function done_todo(todo_item_id) {
    console.log(todo_item_id);
    var name = todo_item_id.substring(0, 11);
    console.log(name);
    var item_div = document.getElementById(name);
    item_div.remove();
}

function write_long_term_todo(title, is_primary) {
    if (is_primary) {
        fs.appendFile("todo/long_term_primary.todo", (title + "\n"), (err) => {
            if (err) throw err;
            console.log("The file was saved!");
        });
    } else {
        fs.appendFile("todo/long_term_minor.todo", (title + "\n"), (err) => {
            if (err) throw err;
            console.log("The file was saved!");
        });
    }
}

function write_short_term_todo(title, is_primary) {
    if (is_primary) {
        fs.appendFile("todo/short_term_primary.todo", (title + "\n"), (err) => {
            if (err) throw err;
            console.log("The file was saved!");
        });
    } else {
        fs.appendFile("todo/short_term_minor.todo", (title + "\n"), (err) => {
            if (err) throw err;
            console.log("The file was saved!");
        });
    }
}

function readlines(file_address) {
    var file = [];
    var lines_num = 0;
    try {
        // read contents of the file
        const data = fs.readFileSync(file_address, 'UTF-8');

        // split the contents by new line
        const lines = data.split(/\r?\n/);
        // print all lines
        lines.forEach((line) => {
            file[lines_num] = line;
            lines_num = lines_num + 1;
            console.log(line);
        });
    } catch (err) {
        console.error(err);
    }
    return file;
}

function read_todo_list() {
    var short_term_primary = readlines("todo/short_term_primary.todo");
    var short_term_minor = readlines("todo/short_term_minor.todo");
    var long_term_primary = readlines("todo/long_term_primary.todo");
    var long_term_minor = readlines("todo/long_term_minor.todo");
    // TODO:读取Todo文件，并将内容输出到对应位置
}

$('#open').on('click', function () {
    inst.open();
});

$('#dialog').on('confirm.mdui.dialog', function () {
    item_title_var = document.getElementById('item_title').value;
    if (item_title_var == "") {
        mdui.snackbar({
            message: '请输入标题'
        });
        return;
    }
    value_long = document.getElementById("is_long").checked;
    console.log(value_long);
    value_primary = document.getElementById("is_primary").checked;
    console.log(value_primary);

    if ((!value_long) && (value_primary)) {
        new_todo_item(item_title_var, "tab1");
        write_short_term_todo(item_title_var, value_primary);
    }
    if ((!value_long) && (!value_primary)) {
        new_todo_item(item_title_var, "tab2");
        write_short_term_todo(item_title_var, value_primary);
    }
    if (value_long && value_primary) {
        new_todo_item(item_title_var, "tab3");
        write_long_term_todo(item_title_var, value_primary);
    }
    if ((value_long) && (!value_primary)) {
        new_todo_item(item_title_var, "tab4");
        write_long_term_todo(item_title_var, value_primary);
    }
});