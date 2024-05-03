export const imageToSvg=()=>{
    document.querySelectorAll("img.fn__svg").forEach((el) => {
        const imgID = el.getAttribute("id");
        const imgClass = el.getAttribute("class");
        const imgURL = el.getAttribute("src");
    
        fetch(imgURL)
          .then((data) => data.text())
          .then((response) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, "text/html");
            let svg = xmlDoc.querySelector("svg");
    
            if (typeof imgID !== "undefined") {
              svg.setAttribute("id", imgID);
            }
    
            if (typeof imgClass !== "undefined") {
              svg.setAttribute("class", imgClass + " replaced-svg");
            }
    
            svg.removeAttribute("xmlns:a");
            if (el.parentNode) {
              el.parentNode.replaceChild(svg, el);
            }
          });
      });
}

export const animationText = () => {
  const fn_animated_text = document.querySelectorAll(".fn__animated_text");
  fn_animated_text.forEach((text) => {
    let letters = text.innerHTML.split(""),
      time = text.getAttribute("wait"),
      speed = text.getAttribute("speed");
    if (!time) {
      time = 0;
    }
    if (!speed) {
      speed = 4;
    }
    speed = speed / 100;
    text.innerHTML = "<em>321...</em>";
    text.classList.add("ready");
    if (typeof window !== "undefined") {
      require("waypoints/lib/noframework.waypoints.min.js");
      var waypoint = new Waypoint({
        element: text,
        handler: function () {
          if (!text.classList.contains("stop")) {
            text.classList.add("stop");
            setTimeout(() => {
              text.innerHTML = "";
              letters.forEach((i, e) => {
                var span = document.createElement("span");
                span.textContent = i;
                span.style.animationDelay = e * speed + "s";
                text.append(span);
              });
            }, time);
          }
        },

        offset: "90%",
      });
    }
  });
};
