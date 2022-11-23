let btnActive = document.querySelectorAll(".btn-active");
let leftButton = document.querySelectorAll(".convert .buttons-convert button");
let rightButton = document.querySelectorAll(".convRight .buttons-convert button");
let inpLeft = document.querySelector(".convert input");
let inpRight = document.querySelector(".convRight input");
let myLeftVal = document.querySelector(".leftVal");
let leftCurVal = document.querySelector(".leftVal");
const url = "https://api.exchangerate.host/latest";
const inputConvRight = document.querySelector(".convRight input");
const inputConvert = document.querySelector(".convert input");
let rightCurVal = document.querySelector(".rightVal");
let warnTextRight = document.querySelector(".convert .warn-text");
let warnTextLeft = document.querySelector(".convRight .warn-text");
let  Left_Val, Right_Val, curr_1 = "RUB", curr_2="USD";

async function getApi(e) {
  window.addEventListener("offline", () => {
    throw alert("No internet connection");
  });

  const respLeft = await fetch(
    `${url}?base=${curr_1}&symbols=${curr_2}`
  );
  const respRight = await fetch(
    `${url}?base=${curr_2}&symbols=${curr_1}`
  );
  const left_data = await respLeft.json();
  const right_data = await respRight.json();
  Left_Val = await Object.values(left_data.rates)[0];
  Right_Val = await Object.values(right_data.rates)[0];
  showCurr();
  if (e == "right-buttons") {
    if (inpRight.value != "") {
      inpRight.value = Number(
        (inpLeft.value.replace(/\s+/g, "") * Left_Val).toFixed(6)
      );
      myNewFunction(inpRight);
    } else {
      inpRight.value = "";
    }
  }
  if (e == "left-buttons") {
    if (inpLeft.value != "") {
      inpLeft.value = Number(
        (inpRight.value.replace(/\s+/g, "") * Right_Val).toFixed(6)
      );
      myFunction(inpLeft);
    } else {
      inpLeft.value = "";
    }
  }
  convert(e);
}

getApi().catch((error) => alert("something wrong"));

//Show Currency

function showCurr(e) {
  rightCurVal.textContent = `1 ${curr_2} = ${Right_Val} ${curr_1}`;
  leftCurVal.textContent = `1 ${curr_1} = ${Left_Val} ${curr_2}`;
}

function convert(e) {
  inpLeft.addEventListener("keyup", (e) => {
    if(e.target.value[0].includes(".")){
      e.target.value = e.target.value.replace(".", "")
    }
    if (e.target.value == "") {
      inpRight.value = "";
    } else if (e.target.value.includes(",")) {
      e.target.value = e.target.value.replace(",", ".")
    } else {
      inpRight.value = +(
        e.target.value.replace(/\s+/g, "") * Left_Val
      ).toFixed(6);
      myNewFunction(inpRight);
    }
  });

  inpRight.addEventListener("keyup", (e) => {
    if(e.target.value[0].includes(".")){
      e.target.value = e.target.value.replace(".", "")
    }
    if (e.target.value == "") {
      inpLeft.value = "";
    } else if (e.target.value.includes(",")) {
      e.target.value = e.target.value.replace(",", ".");
    } else {
      inpLeft.value = +(
        e.target.value.replace(/\s+/g, "") * Right_Val
      ).toFixed(6);
      myFunction(inpLeft);
    }
  });
}

btnActive.forEach((item, index) => {
  if (index == 0) {
    curr_1 = item.value;
  }
  if (index == 1) {
    curr_2 = item.value;
  }
});

// Btn Select and get value 

inputConvert.addEventListener("input", (e) => {
  e.target.value = e.target.value.split(",").join(".");
});
inputConvRight.addEventListener("input", (e) => {
  e.target.value = e.target.value.split(",").join(".");
});

function myCurrSelFuncLeft() {
  leftButton.forEach((element, index) => {
    leftButton[index].addEventListener("click", function () {
      let leftcurrent = document.querySelectorAll(
        ".convert .buttons-convert .btn-active"
      );
      leftcurrent[0].className = leftcurrent[0].className.replace(
        " btn-active",
        ""
      );
      this.className += " btn-active";
      curr_1 = element.value;
      console.log(curr_1);
      getApi(this.parentElement.classList[1]);
    });
  });
}
myCurrSelFuncLeft();

function myCurrSelFuncRight() {
  rightButton.forEach((element, index) => {
    rightButton[index].addEventListener("click", function () {
      let rightcurrent = document.querySelectorAll(
        ".convRight .buttons-convert .btn-active"
      );
      rightcurrent[0].className = rightcurrent[0].className.replace(
        " btn-active",
        ""
      );
      this.className += " btn-active";
      curr_2 = element.value;
      console.log(curr_2);
      getApi(this.parentElement.classList[1]);
    });
  });
}
myCurrSelFuncRight();

// Menu bar

let hamNav = document.querySelector(".spanNav");
let menu = document.querySelector(".myNav");

hamNav.addEventListener("click", () => {
  hamNav.classList.toggle("active");
  menu.classList.toggle("active");
});

function myFunction(inp) {
  var numberMask = IMask(inp, {
    mask: Number,
    scale: 6,
    signed: false,
    thousandsSeparator: " ",
    padFractionalZeros: false,
    normalizeZeros: true,
    radix: ".",
    mapToRadix: ["."],
  });
}

myFunction(inputConvert);
function myNewFunction(inp) {
  var numberMask = IMask(inp, {
    mask: Number,
    scale: 6,
    signed: false,
    thousandsSeparator: " ",
    padFractionalZeros: false,
    normalizeZeros: true,
    radix: ".",
    mapToRadix: ["."],
  });
}

myNewFunction(inputConvRight);
