var my_id = 'PKEzKWv_FktMm2mGPjwd0Q';
var my_data;

function add_div(key, obj) {
    var div = document.createElement('div');
    div.innerHTML = obj['user_name'];
    div.id =key;
    div.onclick = function() {
        onUserSelect(key, obj);
    };
    document.getElementById('user_list').appendChild(div);

}

function onUserSelect(key, data) {
    //update UI
    console.log("onUserSelect");
    user_id = key;
    var bar_element = document.getElementById("svg_bar");
    bar_element.parentNode.removeChild(bar_element);
    var category_element = document.getElementById("svg_category");
    category_element.parentNode.removeChild(category_element);
    updateUI(my_data, data);
}

function updateUI(my_data, user_data) {
    console.log("updateUI");
    var my_reviews = my_data['reviews'];
    var my_name = my_data['user_name'];
    var user_reviews = user_data['reviews'];
    var user_name = user_data['user_name'];

    n_user_reviews = [];
    for (var i =0; i < my_reviews.length; i++) {
        for (var j = 0; j < user_reviews.length; j++) {
            if (my_reviews[i]['business_id'] === user_reviews[j]['business_id']) {
                b = {};
                b["business"] = my_reviews[i]['name'];
                b[my_name] = my_reviews[i]['review_star'];
                b[user_name] = user_reviews[j]['review_star'];
                b["id"] = my_reviews[i]['business_id'];
                b["latitude"] = my_reviews[i]['latitude'];
                b["longitude"] = my_reviews[i]['longitude'];
                b["star"] = my_reviews[i]['star'];
                if (n_user_reviews.length > 30) {
                    break;
                }
                n_user_reviews.push(b);
                break;
            }
        }
    }

    var bar_svg = d3.select("#bar");
    var groupBar = GroupBar()
        .my_name(my_name)
        .user_name(user_name)
        .width(800)
        .height(400);

    bar_svg
        .datum(n_user_reviews)
        .call(groupBar);

    var svg = d3.select("#category");
    var category = Category()
        .width(400)
        .height(400);
    svg
        .datum(user_data)
        .call(category);
}

function sortProperties(obj)
{
    // convert object into array
    var sortable=[];
    for(var key in obj)
        if(obj.hasOwnProperty(key))
            sortable.push([key, obj[key]]); // each item is an array in format [key, value]

    // sort items by value
    sortable.sort(function(a, b)
    {
        return b[1]['sim']-a[1]['sim']; // compare numbers
    });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

function userFilter() {
    var x = document.getElementById("slidebar").value;
    console.log("filter : " + x);
    var myNode = document.getElementById("user_list");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    for(var key in sortedUser) {
        if (key == 0) //my data
            continue;
        var com_biz_num = sortedUser[key][1][['common_biz_num']];
        if (x > com_biz_num) {
            //add in the list
            add_div(sortedUser[key][0], sortedUser[key][1]);
        }
    }
}

function addRangeBar() {
    var range_element = document.getElementById("slide_container");

    var x = document.createElement("INPUT");
    x.id = "slidebar";
    x.setAttribute("class", "slider");
    x.setAttribute("type", "range");
    x.setAttribute("min", "5");
    x.setAttribute("max", "30");
    x.setAttribute("value", "30");
    range_element.appendChild(x);

    var y = document.createElement("INPUT");
    y.setAttribute("type", "button");
    y.setAttribute("class", "button");
    y.innerHTML = "click";
    y.onclick = function () {
        userFilter();
    };
    range_element.appendChild(y);
}

var data = d3.json("./data/reviews.json", function(error, data) {
    sortedUser = sortProperties(data);
    for(var key in sortedUser) {
        if (key == 0) //my data
            continue;
        add_div(sortedUser[key][0], sortedUser[key][1]);
    }
    addRangeBar();
    user_id = sortedUser[1][0];
    my_data = data[my_id];
    user_data = data[user_id];
    updateUI(my_data, user_data);
});


