const mortar = document.querySelector(".mortar");
const pestle = document.querySelector(".pestle");
const water = document.querySelector(".water");
const beakers = document.querySelector(".beakers");
const cylinders = document.querySelector(".measuring-cylinder");

// const btnShake = document.querySelector(".shake");
// const btnReset = document.querySelector(".reset");

const sediments = document.querySelector(`.sediment-agent`);

// accordian
function toggleAccordion(element) {
  const content = element.nextElementSibling;
  content.style.display = content.style.display === "block" ? "none" : "block";
}

function startAnimation() {
  sediments.style.visibility = "visible";
  sediments.addEventListener("click", moveSediments);
  pestle.addEventListener("click", movePestle, {
    once: true,
  });
  water.addEventListener("click", pourWater, { once: true });
  beakers.addEventListener("click", moveBeaker, { once: true });
}

// btnReset.addEventListener("click", startAndResetAnimation);

startAnimation();

// sediments.addEventListener("click", moveSediments);

// array to keep track of sediments which have been used up
let sedimentsUsed = [];

function moveSediments({ target: sedimentAgent }) {
  // stop execution of the function if sediment is already used
  if (sedimentsUsed.includes(sedimentAgent)) {
    return;
  }

  sedimentsUsed.push(sedimentAgent);

  const sedimentCords = sedimentAgent.getBoundingClientRect();
  // console.log(sedimentCords);
  const mortarCords = mortar.getBoundingClientRect();

  sedimentAgent.animate(
    [
      {},
      {
        transform: `translate(${
          mortarCords.right + 25 - sedimentCords.right
        }px,${mortarCords.top + 5 - sedimentCords.top}px)`,

        width: "50px",
        opacity: "70%",
      },
    ],
    {
      duration: 1000,
      fill: "forwards",
      // iterations: Infinity,
    }
  );
}

// pestle.addEventListener("click", movePestle, {
//   once: true,
// });

function movePestle() {
  const mortar = document.querySelector(".mortar");
  const pestle = document.querySelector(".pestle");

  const pestleCords = pestle.getBoundingClientRect();
  const mortarCords = mortar.getBoundingClientRect();
  //   const row1 = document.querySelector(`.sediment-agent > row1:nth-child(${count})`);

  pestle.animate(
    [
      {},
      {
        transform: `translate(${mortarCords.left - pestleCords.left}px,${
          mortarCords.top - pestleCords.bottom
        }px) rotate(-50deg)`,
      },
      {
        transform: `translate(${mortarCords.left - pestleCords.left}px,${
          mortarCords.top + 20 - pestleCords.bottom
        }px) rotate(-50deg)`,
      },
      // // {
      //   transform: `translate(${pestleCords.left - mortarCords.right}px,${
      //     mortarCords.top + 20 - pestleCords.bottom
      //   }px) rotate(-50deg)`,
      // },
    ],
    {
      duration: 1000,
      fill: "forwards",
    }
  ).onfinish = () => {
    pestle.addEventListener("mousedown", shakePestle);

    function shakePestle() {
      const shakes = 5;
      const shakeDistance = 10;
      pestle.animate(
        [
          {},
          {
            transform: `translate(${mortarCords.left - pestleCords.left}px,${
              mortarCords.top + 20 - pestleCords.bottom
            }px) rotate(-63deg)`,
          },
          {
            transform: `translate(${mortarCords.left - pestleCords.left}px,${
              mortarCords.top + 20 - pestleCords.bottom
            }px) rotate(-37deg)`,
          },
          {},
        ],
        { duration: 500, iterations: 3 }
      );
    }

    // pestle.animate([{}, {}], {
    //   duration: 1000,
    // });

    // function shake() {
    //   const vessel = document.querySelector(".pestle");

    //   vessel.style.animation = "none";
    //   //   var liquid = document.getElementById("liquid");
    //   var duration = 1000; // Duration of the shake animation in milliseconds
    //   var start = null;

    //   function step(timestamp) {
    //     if (!start) start = timestamp;
    //     var progress = timestamp - start;

    //     // Calculate the horizontal position of the vessel based on the progress
    //     var x = Math.sin(progress / 20) * 10;

    //     // vessel.style.transform = "translateX(" + x + "px)";
    //     vessel.style.transform =
    //       "translateX(" + x + "px) rotate(" + x + "deg) !important";

    //     if (progress < duration) {
    //       // Continue the animation until the duration is reached
    //       window.requestAnimationFrame(step);
    //     } else {
    //       // Animation completed, reset the vessel position
    //       // vessel.style.transform = "translateX(0)";

    //       vessel.style.transform = "translateX(0) rotate(0) !important";
    //     }
    //   }
    //   // Start the animation
    //   window.requestAnimationFrame(step);
    // }
  };
}

// water.addEventListener("click", pourWater, { once: true });

function pourWater() {
  const mortarCords = mortar.getBoundingClientRect();
  const waterCords = water.getBoundingClientRect();

  water.animate(
    [
      {},
      {
        transform: `translate(${
          mortarCords.left + mortarCords.width - waterCords.left
        }px,-50px) `,
      },
    ],
    {
      duration: 1000,
      fill: "forwards",
    }
  ).onfinish = () => {
    let waterLevel = -30;
    water.addEventListener("click", pour);
    function pour() {
      waterLevel -= 5;
      water.animate(
        [
          {
            // transform: `translate(${
            //   mortarCords.left + mortarCords.width - waterCords.left
            // }px,-50px) rotate(-45deg)`,
          },
          {
            transform: `translate(${
              mortarCords.left + mortarCords.width - waterCords.left
            }px,-50px) rotate(-45deg)`,
          },
        ],
        {
          duration: 500,
          iterations: 2,
          direction: "alternate",
        }
      );
      water.querySelector(".sediment").animate(
        [
          {},
          {
            bottom: `${waterLevel}px`,
          },
        ],
        {
          duration: 1000,
          fill: "forwards",
        }
      );
    }
  };
}

// beakers.addEventListener("click", moveBeaker, { once: true });

function moveBeaker({ target: beaker }) {
  const mortar = document.querySelector(".mortar");
  const pestle = document.querySelector(".pestle");

  const beakerCords = beaker.getBoundingClientRect();
  const mortarCords = mortar.getBoundingClientRect();

  // move beaker closer to mortar
  beaker.animate(
    [
      {},
      {
        transform: `translate(${mortarCords.left - beakerCords.right - 30}px, ${
          mortarCords.bottom - beakerCords.bottom
        }px)`,
      },
    ],
    {
      duration: 1000,
      fill: "forwards",
    }
  ).onfinish = () => {
    let beakerLevel = -100;
    mortar.addEventListener("click", pourMortar, { once: true });

    function pourMortar() {
      beakerLevel += 20;
      const mortarCords = mortar.getBoundingClientRect();
      const beakerCords = beaker.getBoundingClientRect();

      // console.log(sedimentsUsed);
      sedimentsUsed.forEach((element) => (element.style.visibility = "hidden"));
      // sedimentsUsed[sedimentsUsed.length - 1].style.visibility = "hidden";

      pestle.animate(
        [
          {},
          {
            transform: `translate(0,0)`,
          },
        ],
        {
          duration: 1000,
          fill: "forwards",
        }
      ).onfinish = () => {
        // pestle.parentNode.replaceChild(newElement, pestle);

        // pestle.addEventListener;

        // console.log("error here", pestle.parentNode);
        // pestle.removeEventListener()
        const sediment = beaker.querySelector(".sediment");
        // sediment.style.animation = "fillBeaker 2s forwards";
        sediment.animate(
          [
            {},
            {
              bottom: `${beakerLevel}px`,
            },
          ],
          {
            duration: 2000,
            fill: "forwards",
          }
        );
        // sediment.style.animation = "fillBeaker 2s";
      };
      mortar.animate(
        [
          {},
          {
            transform: `translate(0, ${
              beakerCords.top - mortarCords.bottom
            }px)`,
          },
          {
            transform: `translate(${beakerCords.right - mortarCords.left}px, ${
              beakerCords.top - mortarCords.bottom
            }px)`,
          },
          {
            transform: `translate(${
              beakerCords.right - mortarCords.left - 20
            }px, ${beakerCords.top - mortarCords.bottom}px) rotate(-45deg)`,
          },
        ],
        {
          duration: 2000,
          // fill: "forwards",
          easing: "ease-in-out",
          iterations: 2,
          direction: "alternate",
        }
      ).onfinish = () => {
        pestle.addEventListener("click", movePestle);
        cylinders.addEventListener("click", moveCylinder, { once: true });
        function moveCylinder({ target: cylinder }) {
          cylinder = cylinder.closest("span");
          cylinder.animate(
            [
              {},
              {
                transform: `translate(${
                  cylinders.getBoundingClientRect().left -
                  cylinder.getBoundingClientRect().left -
                  200
                }px,50px)`,
              },
            ],
            {
              duration: 1000,
              fill: "forwards",
            }
          ).onfinish = function () {
            const beakerCords = beaker.getBoundingClientRect();
            const cylinderCords = cylinder.getBoundingClientRect();

            // move cylinder back to its position after being filled
            cylinder.addEventListener(
              "click",
              () => {
                cylinder.animate(
                  [
                    {},
                    {
                      transform: `translate(0,0)`,
                    },
                  ],
                  { duration: 1000, fill: "forwards" }
                );
              },
              { once: true }
            );

            beaker.addEventListener("click", pourBeaker, { once: true });
            function pourBeaker() {
              // move water beaker to its initial position of rest
              water.animate(
                [
                  {},
                  {
                    transform: "translate(0,0)",
                  },
                ],
                { duration: 1000, fill: "forwards" }
              );

              // move the beaker closer to cylinder and pour into it
              beaker.animate(
                [
                  {},
                  // { transform: `translate(0,0)` },
                  {
                    transform: `translate(${
                      cylinderCords.left - beakerCords.right
                    }px,${cylinderCords.top - beakerCords.bottom}px)`,
                    composite: "accumulate",
                  },
                  {
                    transform: `translate(${
                      cylinderCords.left - beakerCords.right
                    }px,${
                      cylinderCords.top - beakerCords.bottom
                    }px) rotate(45deg)`,
                    composite: "accumulate",
                  },
                  {
                    transform: `translate(${
                      cylinderCords.left - beakerCords.right
                    }px,${
                      cylinderCords.top - beakerCords.bottom
                    }px) rotate(45deg)`,
                    composite: "accumulate",
                  },
                  {
                    transform: `translate(0,0)`,
                  },
                ],
                {
                  duration: 4000,
                  fill: "forwards",
                  // composite: "accumulate",
                }
              ).onfinish = () => {
                beaker.style.visibility = "hidden";
                beakers.addEventListener("click", moveBeaker, { once: true });

                var oldPestle = document.querySelector(".pestle");
                var newPestle = oldPestle.cloneNode();

                oldPestle.replaceWith(newPestle);

                newPestle.addEventListener("click", movePestle, { once: true });

                // const newPestle = document.querySelector(".pestle");
                // console.log(newPestle);
                // newPestle.addEventListener("click", movePestle, {
                //   once: true,
                // });
              };

              beaker.firstChild.animate(
                [
                  {},
                  {
                    bottom: "-100px",
                  },
                ],
                {
                  duration: 1000,
                  fill: "forwards",
                  delay: 1000,
                }
              );
              cylinder.querySelector(".sediment").animate(
                [
                  {},
                  {
                    bottom: "-100px",
                  },
                ],
                {
                  duration: 1000,
                  fill: "forwards",
                  delay: 1500,
                }
              );
            }
          };

          // beaker.animate(
          //   [
          //     {},
          //     {
          //       transform: `translate(0,${}px)`,
          //     },
          //   ],
          //   {
          //     duration: 1000,
          //     fill: "forwards",
          //   }
          // );
        }
      };
    }
  };
  // pourMortar after empty beaker comes near to mortar along with pestle moving aside and after pouring return mortar back to its initial position
}
