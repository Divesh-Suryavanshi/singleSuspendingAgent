const mortar = document.querySelector(".mortar");
const pestle = document.querySelector(".pestle");
const water = document.querySelector(".water");
const beaker = document.querySelector(".beakers > div:first-child");
const cylinders = document.querySelector(".measuring-cylinder");

const btnShake = document.querySelector(".shake");

const sediments = document.querySelector(`.sediment-agent`);

sediments.addEventListener("click", moveSediments);

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

// sediment.addEventListener("click", () => {
//   const sedimentCords = sediment.getBoundingClientRect();
//   // console.log(sedimentCords);
//   const mortarCords = mortar.getBoundingClientRect();

//   sediment.animate(
//     [
//       {},
//       {
//         transform: `translate(${
//           mortarCords.right + 25 - sedimentCords.right
//         }px,${mortarCords.top + 5 - sedimentCords.top}px)`,

//         width: "50px",
//         opacity: "70%",
//       },
//     ],
//     {
//       duration: 1000,
//       fill: "forwards",
//       // iterations: Infinity,
//     }
//   );
// });

pestle.addEventListener("click", movePestle, {
  once: true,
});

function movePestle() {
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
    shake();
    function shake() {
      const vessel = document.querySelector(".pestle");

      vessel.style.animation = "none";
      //   var liquid = document.getElementById("liquid");
      var duration = 1000; // Duration of the shake animation in milliseconds
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;

        // Calculate the horizontal position of the vessel based on the progress
        var x = Math.sin(progress / 20) * 10;

        // vessel.style.transform = "translateX(" + x + "px)";
        vessel.style.transform =
          "translateX(" + x + "px) rotate(" + x + "deg) !important";

        if (progress < duration) {
          // Continue the animation until the duration is reached
          window.requestAnimationFrame(step);
        } else {
          // Animation completed, reset the vessel position
          // vessel.style.transform = "translateX(0)";

          vessel.style.transform = "translateX(0) rotate(0) !important";
        }
      }
      // Start the animation
      window.requestAnimationFrame(step);
    }
  };
}

// shake pestle function
// btnShake.addEventListener("click", pestleshake);

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

// function pestleshake() {
//   const pestle = document.querySelector(".pestle");

//   pestle.style.animation = "none";
//   //   var liquid = document.getElementById("liquid");
//   var duration = 1000; // Duration of the shake animation in milliseconds
//   var start = null;

//   function step(timestamp) {
//     if (!start) start = timestamp;
//     var progress = timestamp - start;

//     // Calculate the horizontal position of the pestle based on the progress
//     var x = Math.sin(progress / 20) * 10;

//     // pestle.style.transform = "translateX(" + x + "px)";
//     pestle.style.transform =
//       "translateX(" + x + "px) rotate(" + x + "deg) !important";

//     if (progress < duration) {
//       // Continue the animation until the duration is reached
//       window.requestAnimationFrame(step);
//     } else {
//       // Animation completed, reset the pestle position
//       // pestle.style.transform = "translateX(0)";

//       pestle.style.transform = "translateX(0) rotate(0) !important";
//     }
//   }
//   // Start the animation
//   window.requestAnimationFrame(step);
// }

water.addEventListener("click", pourWater, { once: true });

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

beaker.addEventListener("click", moveBeaker, { once: true });

function moveBeaker() {
  const beakerCords = beaker.getBoundingClientRect();
  const mortarCords = mortar.getBoundingClientRect();

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
  );
  // pourMortar after empty beaker comes near to mortar along with pestle moving aside and after pouring return mortar back to its initial position
}

let beakerLevel = -100;
mortar.addEventListener("click", pourMortar);

function pourMortar() {
  beakerLevel += 20;
  const mortarCords = mortar.getBoundingClientRect();
  const beakerCords = beaker.getBoundingClientRect();

  sediments.style.display = "none";

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
    const sediment = document.querySelector(".beaker > .sediment");
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
        transform: `translate(0, ${beakerCords.top - mortarCords.bottom}px)`,
      },
      {
        transform: `translate(${beakerCords.right - mortarCords.left}px, ${
          beakerCords.top - mortarCords.bottom
        }px)`,
      },
      {
        transform: `translate(${beakerCords.right - mortarCords.left - 20}px, ${
          beakerCords.top - mortarCords.bottom
        }px) rotate(-45deg)`,
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
          // console.log(cylinderCords.left - beakerCords.right);
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
                }px,${cylinderCords.top - beakerCords.bottom}px) rotate(45deg)`,
                composite: "accumulate",
              },
              {
                transform: `translate(${
                  cylinderCords.left - beakerCords.right
                }px,${cylinderCords.top - beakerCords.bottom}px) rotate(45deg)`,
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
          );

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
