const startBtn = document.querySelector(".start-btn");
const result = document.querySelector(".result-container");
const again = document.querySelector("#again");
const aiContainer = document.querySelector(".ai-container");
const showContainer = document.querySelector(".show-container");
const draw = document.querySelector(".draw");
const hold = document.querySelector(".hold");

//making blackjack object;
const blackjack = {
  deck: [],
  values: ["1,2,3,4,5,6,7,8,9,10,j,q,k"],
  suits: ["kupa", "maça", "karo", "sinek"],
  computerSum: 0,
  playerSum: 0,
  makeDeck() {
    const { suits, values, deck } = this;
    for (let value of values[0].split(",")) {
      for (let suit of suits) {
        deck.push({
          value,
          suit,
        });
      }
    }
    return deck;
  },
  drawCard(place) {
    let card = this.deck.pop();
    let cardImg = document.createElement("img");
    cardImg.src = `Images/${card.suit} ${card.value}.png`;
    cardImg.setAttribute("alt", card.value);
    return place.appendChild(cardImg);
  },
  shuffle() {
    const { deck } = this;
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  },
  conclusion() {
    let cards = document.querySelectorAll("img");
    let { computerSum, playerSum } = this;
    cards.forEach((img) => {
      if (aiContainer.contains(img)) {
        const cardValue = img.getAttribute("alt");
        let message = "";
        if (["k", "q", "j"].includes(cardValue)) {
          computerSum += 10;
        } else if (
          (computerSum < 13 && ["1"].includes(cardValue)) ||
          ["k", "q", "j"].includes(cardValue)
        ) {
          computerSum += 11;
        } else {
          computerSum += Number(cardValue);
        }
      } else {
        const cardValue = img.getAttribute("alt");
        if (["k", "q", "j", "10"].includes(cardValue)) {
          playerSum += 10;
        } else {
          playerSum += Number(cardValue);
        }
      }
    });
    if (computerSum < 15 && showContainer.children.length >= 2) {
        this.drawCard(aiContainer);
        let newCard = aiContainer.lastElementChild
        computerSum += +newCard.getAttribute("alt");
    }
    console.log(computerSum);
    if (playerSum === 21) {
      message = `!! Winner Winner Chicken Dinner !!`;
      result.innerHTML = `
        <div class="messages">
            <h2>${message}</h2>
            <h2>Another Round?</h2>
        </div>
    `;
    } else if (computerSum === 21) {
      message = `Computer won with BlackJack, you lost!`;
      result.innerHTML = `
        <div class="messages">
            <h2>${message}</h2>
            <h2>Wanna try again?</h2>
        </div>
    `;
    } else if (computerSum > 21) {
        message = `Table past 21 with ${computerSum}, you Won!`;
        result.innerHTML = `
            <div class="messages">
                <h2>${message}</h2>
                <h2>Wanna try again?</h2>
            </div>
      `;
    } else if (playerSum < computerSum) {
      message = `You are below Table(${computerSum}) with ${playerSum}, you can draw new card or you lose?`;
      result.innerHTML = `
          <div class="messages">
              <h2>${message}</h2>
              <h2>Wanna try again?</h2>
          </div>
    `;
    } else if (playerSum > 21) {
      message = `You past 21 with ${playerSum}, you lost!`;
      result.innerHTML = `
          <div class="messages">
              <h2>${message}</h2>
              <h2>Wanna try again?</h2>
          </div>
    `;
    }
    result.classList.remove("hidden");
  },
};

blackjack.makeDeck();
blackjack.shuffle();

again.addEventListener("click", (e) => {
  e.preventDefault();
  location.reload();
});

draw.addEventListener("click", () => {
  blackjack.drawCard(showContainer);
  blackjack.conclusion();
});
startBtn.addEventListener("click", () => {
    if(aiContainer.children.length === 0){
        blackjack.drawCard(aiContainer);
        blackjack.drawCard(aiContainer);
    }
  blackjack.conclusion();
});

hold.addEventListener("click", () => {
  blackjack.conclusion();
});
