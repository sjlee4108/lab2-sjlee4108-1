var active_index = 0;
var sections = [];
var question_len = 0;
var resultData = {weights:[]};

//create quiz section based on data
function addSections(data) {
    console.log(data)
    data.forEach(function(item, index){
        console.log(index);
        var section = $("<section><article></article><div id = 'buttonContainer'><input class = 'leftButton' type = 'button' value = 'Prev'/><span>Choose an option :)</span><input class = 'rightButton' type = 'button' value = 'Next'/></div></section>")
        section.appendTo($("main > div"));
        var article = section.children("article");
        $("<h2>"+item.question+"</h2>").appendTo(article);
        var cardGrid = $("<div class = 'answerContainer'></div>");
        cardGrid.appendTo(article)


        let weight = [];
        item.answers.forEach(function(item, i){
            //create answer card
            var cardContainer = $("<div class = 'cardContainer'><input type = 'radio' name = 'question"+index+"' value = '"+i+"' id = 'answer"+index+"-"+i+"'/><label for = 'answer"+index+"-"+i+"' class = 'card'></label></div>")
            if (item.img_url != ""){
                $("<img src = '"+item.img_url+"'alt = '' ></img><h4>"+item.text+"</h4>").appendTo(cardContainer.children("label"));
            }else{
                $("<h3>"+item.text+"</h3>").appendTo(cardContainer.children("label"));
            }
            cardContainer.appendTo(cardGrid)

            //save answer weights to resultData
            weight.push(item.outcome);
        })
        resultData.weights.push(weight);

    })
    console.log(resultData.weights)
}

//computing result based on choices array
function computeResult(choices){
    var resultWeight;
    choices.forEach(function(item, i){
        if (i == 0){
            resultWeight = resultData.weights[i][parseInt(item)];
        }else{
            resultWeight = resultWeight.map(function (num, idx) {
                return num + resultData.weights[i][parseInt(item)][idx];
            })
        }
        console.log(resultWeight);
    });
    return resultWeight;
}

//adding result section frame
function addResultSection(){
    let result = $("<section id = 'resultSection'><h2>You are . . . .</h2><div id = 'resultContent'><img src = '' alt = 'resultimg'><div>Result text</div></section>")
    result.appendTo($("main > div"));
}

//read data from data.json
$.getJSON("data.json", function(data) {

    //save result data
    resultData.outcomes = data.outcomes;

    //create contents
    $("h1").html(data.title);
    addSections(data.questions);
    addResultSection();
    question_len = data.questions.length;

    //set up right buttons
    var buttonR = $(".rightButton");
    buttonR.each(function(i){
        if (i == data.questions.length-1){
            $(this).prop("value", "Done"); 
        }
        $(this).on("click", function() {
            //check if answer is selected
            if (!$("input[name='question"+i+"']:checked").val()) {
                $("#buttonContainer span").css('opacity', 1);
                return false;
            }
            $("#buttonContainer span").css('opacity', 0);
            
            //compute result if done button
            if (i == data.questions.length-1){
                $("#resultContent").addClass("fadeInClass");
                var choices = $("input[type='radio']:checked").map(function(i, radio) {
                    return $(radio).val();
                }).toArray();
                let computedWeight = computeResult(choices);
                let maxIndex = computedWeight.indexOf(Math.max.apply(Math, computedWeight));
                $("#resultContent img").attr('src', resultData.outcomes["outcome"+String(maxIndex+1)]["img"]) 
                $("#resultContent div").html('<span>'+resultData.outcomes["outcome"+String(maxIndex+1)]["title"]+'</span>'+resultData.outcomes["outcome"+String(maxIndex+1)]["description"]+'<a href="">RETAKE</a>');           
            }

            //slide transition
            var curr = $("section").eq(i);
            curr.slideToggle(1200);
            active_index = active_index + 1;
            
            //cup water
            $("#movingLiquid").css('height', 'calc('+String(100*active_index/(question_len))+'% - 2em)')

            // water falling animation
            $("#liquid").css('height', '100%');
            setTimeout(function(){ 
                $("#empty").css('height', '100%');
            }, 500);
            setTimeout(function(){ 
                $("#liquid").css('transition', '0.1s');
                $("#empty").css('transition', '0.1s');
                $("#liquid").css('height', '0');
            }, 1000);
            setTimeout(function(){ 
                $("#empty").css('height', '0');
            }, 1100);
            setTimeout(function(){ 
                $("#liquid").css('transition', '0.5s');
                $("#empty").css('transition', '0.5s');
            }, 1200);
        })
    });

    //set up left buttons
    var buttonL = $(".leftButton");
    console.log(buttonR)
    buttonL.each(function(i){
        if (i == 0){
            $(this).prop('disabled', true);
            $(this).css('z-index', -1);
        }else{
            $(this).on("click", function() {
                //slide to previous
                var prev = $("section").eq(i-1);
                prev.slideToggle(1200);
                active_index = active_index - 1;

                //adjust water height
                $("#movingLiquid").css('height', 'calc('+String(100*active_index/(question_len))+'% - 2em)')
            })    
        }
    });
});

//starting quiz
var button = document.getElementById("startButton");
button.addEventListener ("click", function() {
    document.getElementById("startButton").remove();
    var element = $("header");
    element.toggleClass('shrinkHeader');
});


