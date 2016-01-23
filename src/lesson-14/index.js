const {div, input, label, h2, makeDOMDriver} = CycleDOM;

// DOM read effect: detect slider change
// recalculate BMI
// DOM write effect: display BMI

function main(sources) {
  const changeWeight$ = sources.DOM.select('.weight').events('input')
    .map(ev => ev.target.value);
  const changeHeight$ = sources.DOM.select('.height').events('input')
    .map(ev => ev.target.value);

  const state$ = Rx.Observable.combineLatest(
    changeWeight$.startWith(70),
    changeHeight$.startWith(170),
    (weight, height) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters * heightMeters));
      return {bmi, weight, height};
    }
  );

  return {
    DOM: state$.map(state =>
      div([
        div([
          label('Weight: ' + state.weight + 'kg'),
          input('.weight', {type: 'range', min: 40, max: 150, value: state.weight})
        ]),
        div([
          label('Height: ' + state.height + 'cm'),
          input('.height', {type: 'range', min: 140, max: 220, value: state.height})
        ]),
        h2('BMI is ' + state.bmi)
      ])
    )
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
}

Cycle.run(main, drivers);
