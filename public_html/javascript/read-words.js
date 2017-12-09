// Stole from stackover
// TODO : Fix.
var queryParams;
(window.onpopstate = function () {
    var match,
    pl     = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    query  = window.location.search.substring(1);
    
    queryParams = {};
    while (match = search.exec(query))
    queryParams[decode(match[1])] = decode(match[2]);
  })();

var readWords = new Array();
if (queryParams["grade"] === "1") {
  readWords = firstReadWords;
} else if (queryParams["grade"] === "k") {
  readWords = kReadWords;
}

var color = ["red", "blue", "green", "purple", "cyan", "pink", "orange"];

//** ********************************************************************* **//

var current_category_index = 0;
var current_word_index = 0;

$(document).ready(function () {
	$('#next').on('click', handler_next_word);
});

function get_random_integer (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function in_array(array, value) {
    for(var i=0;i<array.length;i++) {
      if (array[i] === value)
        return true;
    }
    return false;
}

function populate_randoms(length) {
  var ret = new Array();
  for (var i = 0;i < length; i++) {
    while(1) {
      index = get_random_integer(0,length-1);
      if (!in_array(ret, index)) {
        ret[i] = index;
        break;
      }
    }
  }
  return ret;
}

function handler_next_word() {

  if (current_category_index == 0 && current_word_index == 0) {
    $("#next").html("Next Word");
  }
  if (wordOrder[current_category_index][current_word_index] == undefined) {
    current_category_index++;
    current_word_index = 0;
  }
  if (readWords[categoryOrder[current_category_index]] == undefined) {
    current_category_index = 0;
    current_word_index = 0;
    $("#next").html("Start Over");
    return;
  }
  if (current_word_index < readWords[categoryOrder[current_category_index]].length) {
    $("#read-word p").html(readWords[categoryOrder[current_category_index]][wordOrder[current_category_index][current_word_index++]]);
    $("#read-word p").css("color", color[get_random_integer(0,color.length-1)]);
  }
}

var categoryOrder = populate_randoms(readWords.length);
var wordOrder = new Array();
for (var i = 0;i < readWords.length; i++) {
  wordOrder[i] = populate_randoms(readWords[i].length);
}
