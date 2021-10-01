# Lab2: Buzzfeed for drink

*This webpage is a buzzfeed quiz for type of drinks. It asks random questions and provide a drink type based on your answers.*

[deployed url](https://dartmouth-cs52-21s.github.io/lab2-sjlee4108/)

## What Worked Well

* I was able to get transitions and animation to work. It was tricky to get some animations to work on js, but I was able to find a way around it.
* I was able to get a good structure of quiz sections that work for both text only and with image. 


## What Didn't

* Resizing based on window size was very tricky. Since I have a small side animation, it was hard to preserve the ratio when resizing. 
* Quiz contents were quite tricky. It is quite hard to get a reasonable answer for some cases. 

## Extra Credit

For the extra credit, I did both options.

1. JS option: I created data.json, which includes title, questions, answers, answer weights and outcomes. I used a weight system to calculate the result. So, for every answer, there is a list of weight associated with each outcome. The number takes a range of -0.5 to 1 and the result is computed by computing sum of points for each outcome and taking the one with highest score. Weights can be changed in JSON file.
2.  Styling Options: For styling, I made them in to slides, and users can see one question at a time. I also structured it so that user has to answer the question to move on. Also, I added small animation on the right which shows the progress of the quiz. The water in the cup fills up as questions are answered. The page also supports mobile web by getting rid of the progress animation and full-screening the question section. Transitions are used to move slides and hover cards. 

## Screenshots

This image shows how the page shows a message at the bottom when next button is clicked without an answer.

![ScreenShot]('./screenshots/alert.png')

This image shows progress bar that I made with animation.

![ScreenShot]('./screenshots/progress.png')

