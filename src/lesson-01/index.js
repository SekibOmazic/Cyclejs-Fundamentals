// Logic
Rx.Observable.timer(0, 1000) // 0--1--2--3--4--5--6--
  .map(i => `Seconds elapsed ${i}`)

  // Effects
  .subscribe(text => {
    const container = document.querySelector('#app');
    container.textContent = text;
  });