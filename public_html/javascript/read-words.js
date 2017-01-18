var readWords = new Array();

// General One
readWords[0] = ["I", "like", "and", "the", "see"];
// Number group 1 (1 through 5)
readWords[1] = ["one", "two", "three", "four", "five"];
// Number group 2 (6 through 10)
readWords[2] = ["six", "seven", "eight", "nine", "ten"];
// Color group 1
readWords[3] = ["orange", "black", "brown", "white", "pink"];
// Color Group 2
readWords[4] = ["red", "yellow", "blue", "green", "purple"];
// General Two
readWords[5] = ["to", "come", "my", "with", "we"];
readWords[6] = ["my", "you", "what", "are", "now"];
readWords[7] = ["is", "how", "of", "so", "many"];
readWords[8] = ["where", "this", "find", "from", "came"];

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
