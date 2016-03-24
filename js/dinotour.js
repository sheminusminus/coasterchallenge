var tour =  {
    id: "dinotour",
    steps: [
      {
        target: "Layer_1",
        title: "Welcome to the Coaster Challenge!",
        content: "Hey there! Here's some info we can discuss together.",
        placement: "left",
        arrowOffset: 0,
        xOffset: 100,
        yOffset: 40
      },
      {
        target: document.querySelector("#bubble2"),
        title: "Where to Begin?",
        content: "Not sure exactly, because I don't know how to write copy!",
        placement: "right",
        delay: 1000,
        xOffset: 50
      },
      {
        target: document.querySelector("#bubble3"),
        placement: "left",
        title: "But even so...",
        content: "This should be a pretty fun ride-along.",
        delay: 1000,
        xOffset: -50
      },
      {
        target: document.querySelector("#bubble4"),
        placement: "top",
        title: "And if we get lost...",
        content: "The next thing will point the way?",
        delay: 1000
      },
      {
        target: document.querySelector("#bubble5"),
        placement: "top",
        title: "Nailed it!",
        content: "'Cause we're in this together, man.",
        yOffset: -60,
        delay: 1000
      }
    ],
    showPrevButton: true,
    scrollTopMargin: 100,
    bubbleWidth: 180
  };
  
  window.addEventListener('load', function() {
		hopscotch.endTour([true]);
		hopscotch.startTour(tour);
  });

