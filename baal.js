var requiresUpdate = false;

function apply() {
    var finalPath = document.getElementsByClassName('final-path');
    if (finalPath.length == 0 || !finalPath[0].innerText.match(/\.faced$/) ) {
        return ;
    }

    var lines = document.getElementsByClassName('js-file-line');
    var i;
    var in_comment = false;
    for (i = 0; i < lines.length; i++) {
        if (lines[i].classList.contains('baal-highlight')) {
            continue;
        }
        var html = lines[i].innerHTML;
        if (in_comment) {
            html = '<span class="pl-c">' + html + '</span>';
            if (html.match(/[#*]\//)) {
                in_comment = false;
            }
        } else {
            html = html.replace(/((?:entity|namespace|service|includes|\+=|required|\!|nullable|\?|of)\s*)((?:[A-Z]\w+)(?:\.[A-Z]\w+)*)/g, '$1<span class="pl-en">$2</span>');
            html = html.replace(/(^|\W)(namespace|import|abstract|entity|service|includes|required|nullable|list|@|of|dictionary|hash|map|accepts|returns|as)(?=$|\W)/g, '$1<span class="pl-k">$2</span>');
                        html = html.replace(/([!?@%]|\+=|&lt;=|=&gt;)/g, '<span class="pl-k">$1</span>');
            html = html.replace(/(^|\W)(bool(?:ean)|int(?:eger|8|16|32|64)?|sbyte|byte|short|long|float(?:32|64)?|double|real|number|decimal(?:32|64)?|numeric|money|date(?:time)?|time(?:stamp)|str(?:ing)?|bin(?:ary)?)(?=$|\W)/g, '$1<span class="pl-c1">$2</span>');
            if (html.match(/\/[#*]/)) {
                html = html.replace(/(\/[#*].*)/g, '<span class="pl-c">$1</span>');
                if (!html.match(/[#*]\//)) {
                    in_comment = true;
                }
            }
        }
        lines[i].innerHTML = html;
        lines[i].classList.add('baal-highlight');
    }
}

function maybeApply() {
    if (!requiresUpdate) return;
    apply();
    requiresUpdate = false;
}

document.addEventListener('DOMNodeInserted', function() {
    requiresUpdate = true;
});
setInterval(maybeApply, 100);
